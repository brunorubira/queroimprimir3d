"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { getToken } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const requestSchema = zod.object({
  title: zod.string().min(5, "Título muito curto"),
  description: zod.string().min(20, "Forneça mais detalhes sobre o projeto"),
  // Mock file field for now
  fileMockUrl: zod.string().optional(),
});

export default function NewRequestPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: { title: "", description: "", fileMockUrl: "" },
  });

  const onSubmit = async (data: any) => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    setStatus("submitting");
    try {
      const payload = {
        title: data.title,
        description: data.description + (fileName ? `\n[Anexo: ${fileName}]` : ""),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => router.push("/dashboard/client"), 2000);
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link href="/dashboard/client" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold uppercase tracking-widest font-mono text-[10px]">Voltar aos Pedidos</span>
      </Link>

      <div>
        <div className="technical-label mb-2">Protocolo de Requisição // Nova Demanda</div>
        <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">
          Nova <span className="gradient-text-pro">Solicitação</span>
        </h1>
        <p className="text-slate-400 mt-2 font-mono text-sm leading-relaxed">
          Detalhe as especificações do seu projeto. Quanto mais informações, melhores serão as propostas.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
          
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Título do Projeto
            </label>
            <input
              {...register("title")}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none"
              placeholder="Ex: Peça de reposição automotiva resina SLA"
            />
            {errors.title && <p className="text-[10px] text-red-500 font-mono">{errors.title.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Descrição do Projeto e Requisitos
            </label>
            <textarea
              {...register("description")}
              rows={6}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none resize-none"
              placeholder="Descreva o material desejado, cor, nível de acabamento, e tolerância dimensional..."
            />
            {errors.description && <p className="text-[10px] text-red-500 font-mono">{errors.description.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Arquivo 3D (Opcional - Simulado)
            </label>
            <div className="relative group">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
              <div className="w-full border-2 border-dashed border-slate-800 bg-slate-950/50 p-8 flex flex-col items-center justify-center gap-4 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                {fileName ? (
                  <>
                    <div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-center font-mono">
                      <p className="text-sm font-bold text-white uppercase">{fileName}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Clique para trocar o arquivo</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-center font-mono space-y-1">
                      <p className="text-sm font-bold text-slate-300 uppercase">Anexar STL / OBJ</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Arraste ou clique para enviar (Max 50MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end">
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs mr-auto">
              <AlertCircle className="w-4 h-4" /> Erro ao salvar solicitação.
            </div>
          )}
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-500 font-mono text-xs mr-auto">
              <CheckCircle2 className="w-4 h-4" /> Solicitação criada! Redirecionando...
            </div>
          )}
          <Button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="h-12 px-8 rounded-none font-mono text-xs font-bold uppercase tracking-widest min-w-[200px]"
          >
            {status === "submitting" ? "Transmitindo..." : "Enviar Solicitação"}
          </Button>
        </div>
      </form>
    </div>
  );
}
