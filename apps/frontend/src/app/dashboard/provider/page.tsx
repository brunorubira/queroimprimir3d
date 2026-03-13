"use client";

import { BarChart3, Box, Printer, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="technical-label mb-2">
            Status: Autenticado // Rótulo: Hub de Manufatura
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">
            Painel de <span className="gradient-text-pro">Operações</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">Métricas e performance da sua célula de produção 3D.</p>
        </div>
        <div className="flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-none">
          <span className="flex h-2 w-2 rounded-none bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">Terminal Online</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Leads Disponíveis" value="12" icon={<Zap className="w-4 h-4" />} trend="+3 hoje" />
        <StatCard title="Pedidos Ativos" value="0" icon={<Box className="w-4 h-4" />} trend="Estável" />
        <StatCard title="Impressoras" value="2" icon={<Printer className="w-4 h-4" />} trend="Online" />
        <StatCard title="Ganhos (Mês)" value="R$ 0,00" icon={<BarChart3 className="w-4 h-4" />} trend="Ciclo Atual" />
      </div>

      {/* Main Modules */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="pro-card p-8 bg-slate-900/40 border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
          <div className="technical-label mb-6">Módulo: Captação</div>
          <h3 className="text-xl font-bold font-outfit text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
             <TrendingUp className="text-primary w-5 h-5" />
             Leads Recomendados
          </h3>
          <div className="text-center py-12 space-y-4">
            <p className="text-slate-400 text-sm font-mono leading-relaxed">Nenhum projeto compatível com seu setup tecnológico no momento.</p>
            <Link href="/dashboard/provider/leads">
              <Button variant="outline" className="h-10 text-[10px] font-mono font-bold uppercase tracking-widest px-8 rounded-none border-slate-700 hover:bg-slate-800 mt-4 transition-all">Ver Feed Completo</Button>
            </Link>
          </div>
        </div>

        <div className="pro-card p-8 bg-slate-900/40 border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
          <div className="technical-label mb-6">Módulo: Execução</div>
          <h3 className="text-xl font-bold font-outfit text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
             <Box className="text-primary w-5 h-5" />
             Fila de Produção
          </h3>
          <div className="text-center py-12 space-y-4">
            <p className="text-slate-400 text-sm font-mono leading-relaxed">Volume de produção ocioso. Capte novos projetos para iniciar impressões.</p>
            <Link href="/dashboard/provider/leads">
              <Button className="h-10 text-[10px] font-mono font-bold uppercase tracking-widest px-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 mt-4 transition-all">Inspecionar Radar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="pro-card p-6 border border-slate-800 bg-slate-900/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-4">
        <div className="w-10 h-10 rounded-none bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
          {icon}
        </div>
        <div className="text-[9px] font-bold text-primary font-mono bg-primary/10 px-2 py-1 rounded-none border border-primary/20 uppercase tracking-widest">{trend}</div>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight mb-2 font-mono">{value}</div>
      <div className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">{title}</div>
    </div>
  );
}

