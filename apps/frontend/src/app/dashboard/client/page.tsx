"use client";

import { useEffect, useState } from "react";
import { Box, PlusCircle, LayoutGrid, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getToken } from "@/lib/auth";

interface Request {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  proposals: any[];
}

export default function ClientDashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/my`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'secondary';
      case 'MATCHING': return 'default';
      case 'CLOSED': return 'success';
      case 'CANCELLED': return 'destructive';
      default: return 'outline';
    }
  };

  const stats = {
    waiting: requests.filter(r => r.status === 'OPEN').length,
    inProgress: requests.filter(r => r.status === 'MATCHING').length,
    completed: requests.filter(r => r.status === 'CLOSED').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="technical-label mb-2">
            Status: Autenticado // Rótulo: Cliente
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">
            Sistema de <span className="gradient-text-pro">Orçamentos</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">Painel de controle para solicitações de manufatura 3D.</p>
        </div>
        <Link href="/dashboard/client/requests/new">
          <Button className="flex items-center gap-2 rounded-none font-mono uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="w-4 h-4" />
            Nova Solicitação
          </Button>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Aguardando Orçamento" value={stats.waiting.toString()} icon={<Clock className="w-4 h-4" />} />
        <StatCard label="Em Produção" value={stats.inProgress.toString()} icon={<LayoutGrid className="w-4 h-4" />} />
        <StatCard label="Finalizados" value={stats.completed.toString()} icon={<CheckCircle2 className="w-4 h-4" />} />
      </div>

      {requests.length === 0 ? (
        <div className="pro-card p-12 text-center space-y-6 max-w-4xl mx-auto mt-8 bg-slate-900/40 border-slate-800">
          <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mx-auto">
            <Box className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-mono text-white uppercase tracking-tight">Nenhum Pedido Ativo</h2>
            <p className="text-slate-400 max-w-md mx-auto font-mono text-sm leading-relaxed">
              Inicie um novo projeto enviando seu modelo 3D para nossa rede de especialistas parceiros.
            </p>
          </div>
          
          <Link href="/dashboard/client/requests/new" className="inline-block pt-4">
            <Button size="lg" className="px-10 h-12 rounded-none font-mono uppercase tracking-widest text-sm bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
              Criar Solicitação
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="technical-label">
            Registro de Protocolos
          </div>
          <div className="grid gap-4">
            {requests.map((request) => (
              <Link key={request.id} href={`/dashboard/client/requests/${request.id}`}>
                <div className="pro-card p-6 bg-slate-900/20 border-slate-800 hover:border-primary/50 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-105">
                        <Box className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                          {request.title}
                        </h3>
                        <p className="text-sm font-mono text-slate-400 line-clamp-1 max-w-xl">{request.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                      <div className="text-right hidden md:block border-r border-slate-800 pr-6">
                        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Orçamentos</p>
                        <p className="text-base font-mono font-medium text-slate-300">{request.proposals.length}</p>
                      </div>
                      <Badge variant={getStatusColor(request.status) as any} className="h-7 px-3 rounded-none font-mono text-xs uppercase tracking-wider">
                        {request.status}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="pro-card border-slate-800 bg-slate-900/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/50 pb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{label}</span>
          <div className="text-primary/70">{icon}</div>
        </div>
        <div className="text-4xl font-mono text-white tracking-tight">{value}</div>
      </div>
    </div>
  );
}
