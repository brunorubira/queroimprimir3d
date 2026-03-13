import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth";
import { CheckCircle2, AlertCircle } from "lucide-react";

const proposalSchema = zod.object({
  price: zod.string().min(1, "O preço é obrigatório"),
  deliveryDays: zod.string().min(1, "O prazo é obrigatório"),
  description: zod.string().min(10, "Descreva sua proposta (min 10 caracteres)"),
});

export function SubmitProposalForm({ requestId }: { requestId: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(proposalSchema),
  });

  const onSubmit = async (data: any) => {
    const token = getToken();
    if (!token) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        requestId,
        price: parseFloat(data.price),
        deliveryDays: parseInt(data.deliveryDays, 10),
        description: data.description,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Erro ao enviar proposta");
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("Erro de rede ao enviar proposta");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="pro-card p-12 bg-slate-900/40 border-slate-800 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 border border-primary/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-mono uppercase tracking-tight text-white">Proposta Enviada!</h2>
        <p className="text-slate-400 font-mono text-sm max-w-sm mx-auto">
          O cliente foi notificado e irá analisar seu orçamento. Você receberá uma notificação se ele aceitar.
        </p>
      </div>
    );
  }

  return (
    <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight text-white mb-6">
        <span className="gradient-text-pro">Enviar</span> Proposta
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Preço Estimado (R$)
            </label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none"
              placeholder="0.00"
            />
            {errors.price && <p className="text-[10px] font-mono text-red-500">{errors.price.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Prazo de Produção (Dias)
            </label>
            <input
              {...register("deliveryDays")}
              type="number"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none"
              placeholder="7"
            />
            {errors.deliveryDays && <p className="text-[10px] font-mono text-red-500">{errors.deliveryDays.message as string}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
            Escopo e Justificativa do Orçamento
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-primary outline-none transition-all resize-none font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none"
            placeholder="Explique sua escolha de material, preenchimento (infill), tolerância e tempo de máquina estimado..."
          />
          {errors.description && <p className="text-[10px] font-mono text-red-500">{errors.description.message as string}</p>}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={status === "submitting"}
          className="w-full h-14 rounded-none font-mono text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {status === "submitting" ? "Enviando Proposta..." : "Submeter Proposta Oficial"}
        </Button>
      </form>
    </div>
  );
}
