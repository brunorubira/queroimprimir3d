"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Upload, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


const requestSchema = zod.object({
  title: zod.string().min(5, "Título muito curto"),
  description: zod.string().min(20, "Descreva melhor o seu projeto"),
  material: zod.string().min(1, "Selecione um material"),
});

export default function NewRequestPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isLoading, errors } } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Não autenticado");
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Solicitação enviada com sucesso!");
        router.push("/dashboard/client");
      } else {
        alert("Erro ao enviar solicitação.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="technical-label mb-2">
          Protocolo: Criação de Solicitação
        </div>
        <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">Nova <span className="gradient-text-pro">Solicitação</span></h1>
        <p className="text-slate-400 mt-2 font-mono text-sm">Preencha as especificações técnicas para receber orçamentos da rede.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pro-card p-10 bg-slate-900/40 border-slate-800 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Título do Projeto</label>
          <input
            {...register("title")}
            className="w-full px-4 py-3 rounded-none bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 focus:bg-slate-900/50"
            placeholder="Ex: Protótipo de Engrenagem Robótica V2"
          />
          {errors.title && <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest ml-1">{errors.title.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Especificações Técnicas</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-4 py-3 rounded-none bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 resize-none focus:bg-slate-900/50"
            placeholder="Descreva as dimensões, finalidade e requisitos técnicos rigorosos..."
          />
          {errors.description && <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest ml-1">{errors.description.message as string}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Material Desejado</label>
            <div className="relative">
              <select
                {...register("material")}
                className="w-full px-4 py-3 rounded-none bg-slate-950 border border-slate-800 focus:border-primary outline-none transition-all font-mono text-slate-300 appearance-none cursor-pointer text-sm focus:bg-slate-900/50"
              >
                <option value="PLA" className="bg-slate-900">PLA [Biodegradável]</option>
                <option value="ABS" className="bg-slate-900">ABS [Industrial]</option>
                <option value="PETG" className="bg-slate-900">PETG [Resistente/Químico]</option>
                <option value="RESIN" className="bg-slate-900">Resina [Alta Definição]</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary w-4 h-4 opacity-70" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Malha 3D (.STL/.OBJ/.STEP)</label>
            <div className="relative h-[46px]">
              <div className="absolute inset-0 border border-dashed border-slate-800 rounded-none flex items-center justify-center gap-2 text-slate-500 hover:bg-slate-900/50 hover:border-primary hover:text-primary transition-all cursor-pointer group/upload bg-slate-950">
                <Upload className="w-4 h-4 group-hover/upload:scale-110 transition-transform" />
                <span className="font-mono font-bold text-[10px] uppercase tracking-widest">Selecionar Arquivo</span>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-none font-mono text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all mt-4">
          {isLoading ? "Processando..." : "Emitir Solicitação"}
        </Button>
      </form>
    </div>
  );
}

