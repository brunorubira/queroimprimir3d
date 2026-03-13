/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, CheckCircle2, XCircle, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProviderProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = getToken();
        if (!token) return router.push("/login");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          setProposals(await response.json());
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'SENT':
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <span className="text-green-500 bg-green-500/10 px-2 py-1">Aceita (Pedido Gerado)</span>;
      case 'REJECTED': return <span className="text-red-500 bg-red-500/10 px-2 py-1">Recusada</span>;
      case 'SENT':
      default: return <span className="text-yellow-500 bg-yellow-500/10 px-2 py-1">Em Análise pelo Cliente</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <div className="technical-label mb-2">Painel do Prestador</div>
        <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">Minhas <span className="gradient-text-pro">Propostas</span></h1>
        <p className="text-slate-400 mt-2 font-mono text-sm max-w-xl">Acompanhe o status dos orçamentos que você enviou para os clientes da plataforma.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))
        ) : proposals.length > 0 ? (
          proposals.map((prop) => (
            <div key={prop.id} className="pro-card p-6 bg-slate-900/60 border-slate-800 hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(prop.status)}
                  <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide truncate max-w-xs md:max-w-md">
                    {prop.request?.title || "Projeto Removido"}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-slate-500">
                  <span>Oferecido: R$ {prop.price.toFixed(2)}</span>
                  <span>Prazo: {prop.deliveryDays} dias</span>
                  <span>Enviada {formatDistanceToNow(new Date(prop.createdAt), { addSuffix: true, locale: ptBR })}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="font-mono text-xs font-bold uppercase tracking-widest">
                  {getStatusText(prop.status)}
                </div>
                
                <Link 
                  href={`/dashboard/provider/requests/${prop.requestId}`}
                  className="w-10 h-10 ml-auto flex items-center justify-center bg-slate-950 border border-slate-800 hover:border-primary text-slate-400 hover:text-primary transition-all shrink-0"
                  title="Ver Projeto Original"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 bg-slate-900/20">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-primary opacity-50" />
            </div>
            <p className="font-mono text-slate-300 font-bold uppercase tracking-widest mb-2">Nenhuma proposta enviada</p>
            <p className="font-mono text-sm text-slate-500 max-w-sm mb-6">Você ainda não enviou nenhum orçamento para os projetos abertos.</p>
            <Link href="/dashboard/provider" className="px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
              Explorar Marketplace
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
