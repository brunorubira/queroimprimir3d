/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter, useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Send, Image as ImageIcon, Box } from "lucide-react";
import Link from "next/link";

const proposalSchema = zod.object({
  price: zod.string().min(1, "O preço é obrigatório"),
  deliveryDays: zod.string().min(1, "O prazo é obrigatório"),
  description: zod.string().min(10, "Detalhe como você vai executar o projeto"),
});

export default function ProviderRequestDetailPage() {
  const [request, setRequest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;

  const { register, handleSubmit, formState: { isLoading: isSubmitting, errors } } = useForm({
    resolver: zodResolver(proposalSchema),
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = getToken();
        if (!token) return router.push("/login");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${requestId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          setRequest(await response.json());
        } else {
          router.push("/dashboard/provider");
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [requestId, router]);

  const onSubmit = async (data: any) => {
    try {
      const token = getToken();
      if (!token) return;

      const payload = {
        requestId,
        price: parseFloat(data.price),
        deliveryDays: parseInt(data.deliveryDays, 10),
        description: data.description,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Proposta enviada com sucesso!");
        router.push("/dashboard/provider");
      } else {
        const err = await response.json();
        alert(err.message || "Erro ao enviar proposta.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto h-96 flex items-center justify-center font-mono text-primary animate-pulse uppercase tracking-widest">Carregando Especificações...</div>;
  }

  if (!request) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/dashboard/provider" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
        <ChevronLeft className="w-4 h-4" /> Voltar ao Marketplace
      </Link>

      <div className="pro-card p-10 bg-slate-900/40 border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6 border-b border-slate-800/50 pb-6">
          <div>
            <div className="technical-label mb-3 inline-flex">Protocolo: #{request.id.split('-')[0]}</div>
            <h1 className="text-3xl font-outfit font-bold text-white uppercase">{request.title}</h1>
            <p className="text-slate-500 font-mono text-xs mt-2 flex gap-4">
              <span>Cliente: {request.client?.name || 'Anônimo'}</span>
              <span>•</span>
              <span>Postado: {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true, locale: ptBR })}</span>
            </p>
          </div>
          <div className="px-4 py-2 border border-primary/20 bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-widest rounded-none">
            {request.status}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações do Projeto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Box className="w-4 h-4 text-primary" />
                Especificações
              </h3>
              <p className="text-slate-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
            </div>

            {request.attachments && request.attachments.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Imagens de Referência
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {request.attachments.map((file: any) => (
                    <a 
                      key={file.id} 
                      href={file.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block group relative aspect-square border border-slate-800 bg-slate-950 overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={file.url} alt={file.filename} className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <span className="bg-black/80 px-3 py-1 text-white font-mono text-xs uppercase tracking-widest">Ampliar</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Área de Proposta */}
          <div className="bg-slate-950 border border-slate-800 p-6 relative">
             <div className="absolute -top-3 left-6 px-2 bg-slate-950 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">
               Formulário de Orçamento
             </div>
             
             {request.status !== 'OPEN' ? (
               <div className="h-full flex flex-col items-center justify-center min-h-[300px] text-center">
                 <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                   <Box className="w-6 h-6" />
                 </div>
                 <p className="font-mono text-sm text-slate-400 max-w-xs">Nenhum orçamento pendente. Este projeto já foi fechado ou cancelado.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Preço (R$)</label>
                     <input
                       type="number"
                       step="0.01"
                       {...register("price")}
                       className="w-full px-4 py-3 rounded-none bg-slate-900 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600"
                       placeholder="Ex: 150.00"
                     />
                     {errors.price && <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest ml-1">{errors.price.message as string}</p>}
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Prazo (Dias)</label>
                     <input
                       type="number"
                       {...register("deliveryDays")}
                       className="w-full px-4 py-3 rounded-none bg-slate-900 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600"
                       placeholder="Ex: 5"
                     />
                     {errors.deliveryDays && <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest ml-1">{errors.deliveryDays.message as string}</p>}
                   </div>
                 </div>
 
                 <div className="space-y-2">
                   <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 ml-1">Mensagem ao Cliente</label>
                   <textarea
                     rows={4}
                     {...register("description")}
                     className="w-full px-4 py-3 rounded-none bg-slate-900 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 resize-none"
                     placeholder="Explique qual material vai usar, a qualidade da impressão, etc..."
                   />
                   {errors.description && <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest ml-1">{errors.description.message as string}</p>}
                 </div>
 
                 <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-none font-mono text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                   {isSubmitting ? "Enviando..." : "Enviar Orçamento"}
                   <Send className="w-4 h-4" />
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
