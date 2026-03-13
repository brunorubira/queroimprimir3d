/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, Filter, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProviderDashboardPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        // We assume the backend allows querying status via Query string
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests?status=OPEN`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="technical-label mb-2">Painel de Oportunidades</div>
          <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">Market<span className="gradient-text-pro">place</span></h1>
          <p className="text-slate-400 mt-2 font-mono text-sm max-w-xl">Encontre projetos de clientes que encaixam com suas tecnologias e faça propostas orçamentárias de modelagem e impressão 3D.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-primary outline-none font-mono text-sm text-slate-300 placeholder:text-slate-600 rounded-none h-10"
            />
          </div>
          <button className="h-10 px-4 flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-400 hover:text-white transition-all font-mono text-xs uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="pro-card h-64 bg-slate-900/40 border-slate-800 animate-pulse relative overflow-hidden">
               <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-800 to-slate-700" />
            </div>
          ))
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="pro-card bg-slate-900/60 border-slate-800 group hover:border-primary/50 transition-all flex flex-col relative overflow-hidden">
              {/* Decorative top line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="technical-label flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Buscando Prestador
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale: ptBR })}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide line-clamp-2 mb-2 group-hover:text-primary transition-colors">{req.title}</h3>
                
                <p className="text-sm font-mono text-slate-400 line-clamp-3 mb-6 flex-1 relative">
                  {req.description}
                  {/* Subtle fade out for long text */}
                  <span className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5" title="Imagens de Referência Anexadas">
                      <ImageIcon className="w-3.5 h-3.5" />
                      {req.attachments?.length || 0}
                    </span>
                    <span>Propostas: {req.proposals?.length || 0}</span>
                  </div>
                  <Link 
                    href={`/dashboard/provider/requests/${req.id}`}
                    className="font-mono text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2"
                  >
                    Ver Projeto <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 bg-slate-900/20">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-primary opacity-50" />
            </div>
            <p className="font-mono text-slate-300 font-bold uppercase tracking-widest mb-2">Nenhum projeto disponível no momento</p>
            <p className="font-mono text-sm text-slate-500 max-w-sm">Fique atento, clientes estão sempre publicando novas ideias.</p>
          </div>
        )}
      </div>
    </div>
  );
}
