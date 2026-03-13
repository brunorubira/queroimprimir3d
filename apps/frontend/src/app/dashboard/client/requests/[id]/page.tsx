/* eslint-disable */
"use client";

import { useEffect, useState, use } from "react";
import { Box, Clock, LayoutGrid, CheckCircle2, ChevronLeft, MessageSquare, User, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getToken } from "@/lib/auth";

interface Attachment {
  id: string;
  url: string;
  filename: string;
}

interface Proposal {
  id: string;
  price: number;
  deliveryTime: number;
  description: string;
  provider: {
    user: {
      name: string;
    }
  }
}

interface Request {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  attachments: Attachment[];
  proposals: Proposal[];
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then(data => {
        setRequest(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAcceptProposal = async (proposalId: string) => {
    if (!confirm("Tem certeza que deseja aceitar este orçamento? Isso gerará um pedido oficial.")) return;
    
    setIsAccepting(proposalId);
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/${proposalId}/accept`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        alert("Proposta aceita com sucesso! O pedido foi gerado.");
        // Reload page to reflect new status (CLOSED)
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao aceitar proposta.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao aceitar proposta.");
    } finally {
      setIsAccepting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'secondary';
      case 'MATCHING': return 'default';
      case 'CLOSED': return 'success';
      case 'CANCELLED': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Solicitação não encontrada</h2>
        <Link href="/dashboard/client">
          <Button variant="outline">Voltar ao Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/client">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white -ml-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="technical-label mb-2">Detalhes da Especificação</div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">{request.title}</h1>
              <Badge variant={getStatusColor(request.status) as any} className="mt-1 h-7 px-4 rounded-none font-mono text-[10px] uppercase tracking-widest shrink-0">
                STATUS: {request.status}
              </Badge>
            </div>
            <div className="pro-card p-6 bg-slate-900/20 border-slate-800">
              <p className="text-slate-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {request.attachments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-outfit font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Arquivos do Projeto (CAD/STL)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {request.attachments.map((file) => (
                  <div key={file.id} className="pro-card p-4 bg-slate-900/40 border-slate-800 flex items-center gap-3 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
                    <div className="w-10 h-10 bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                       <FileText className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-mono font-bold text-white truncate">{file.filename}</p>
                      <Link href={file.url} target="_blank" className="text-[10px] font-mono text-primary uppercase tracking-widest hover:underline mt-1 block">
                        Fazer Download
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proposals Section */}
          <div className="space-y-6 pt-8 border-t border-slate-800/50">
            <h2 className="text-lg font-outfit font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Printer className="w-5 h-5 text-primary" />
              Propostas Recebidas ({request.proposals.length})
            </h2>
            
            {request.proposals.length === 0 ? (
              <div className="pro-card p-8 text-center bg-slate-900/20 border-slate-800">
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Aguardando orçamentos de hubs parceiros...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {request.proposals.map((proposal) => (
                  <div key={proposal.id} className="pro-card p-0 bg-slate-900/30 border-slate-800 hover:border-primary/50 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
                    
                    <div className="p-6 pb-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-105">
                            <User className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold font-outfit text-white uppercase tracking-tight group-hover:text-primary transition-colors">{proposal.provider.user.name}</h3>
                              <Badge variant="outline" className="h-5 px-1.5 rounded-none font-mono text-[8px] uppercase tracking-widest border-primary/30 text-primary">HOMOLOGADO</Badge>
                            </div>
                            <p className="text-[12px] font-mono text-slate-400 leading-relaxed pt-2">{proposal.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between border-t border-slate-800/50 bg-slate-950/50">
                      <div className="flex flex-1 divide-x divide-slate-800/50">
                        <div className="flex-1 p-4 md:px-6">
                          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Custo Estimado</p>
                          <p className="text-xl font-mono font-bold text-primary">R$ {proposal.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="flex-1 p-4 md:px-6">
                          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Tempo de Produção</p>
                          <p className="text-sm font-mono font-bold text-white mt-2">{proposal.deliveryTime} dias úteis</p>
                        </div>
                      </div>
                      <div className="p-4 md:p-0 md:pr-4">
                        {request.status === 'OPEN' ? (
                          <Button 
                            onClick={() => handleAcceptProposal(proposal.id)}
                            disabled={isAccepting !== null}
                            className="w-full md:w-auto h-12 px-8 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all"
                          >
                            {isAccepting === proposal.id ? "Aprovando..." : "Autorizar Manufatura"}
                          </Button>
                        ) : (
                          <div className="w-full md:w-auto h-12 px-8 flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-800">
                            Negociação Encerrada
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="pro-card p-6 bg-slate-900/40 border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
            <div className="technical-label mb-6">Metadados do Projeto</div>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Data de Criação</span>
                <span className="text-sm font-mono text-white">{new Date(request.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Propostas Ativas</span>
                <span className="text-sm font-mono text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-none animate-pulse block" />
                  {request.proposals.length} propostas recebidas
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-8 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Solicitar Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
