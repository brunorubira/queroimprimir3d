"use client";

import { BarChart3, Users, FileText, CheckCircle2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-outfit text-5xl font-black tracking-tighter gradient-text">Visão Geral Admin</h1>
          <p className="text-muted-foreground mt-3 font-medium text-lg">Métricas e performance global da plataforma</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Usuários Totais" value="1.280" icon={<Users className="w-5 h-5" />} trend="+12%" />
        <StatCard title="Solicitações" value="342" icon={<FileText className="w-5 h-5" />} trend="+5%" />
        <StatCard title="Hubs Verificados" value="98" icon={<CheckCircle2 className="w-5 h-5" />} trend="+8%" />
        <StatCard title="Receita Bruta" value="R$ 12.4K" icon={<BarChart3 className="w-5 h-5" />} trend="+24%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
          <h3 className="font-outfit text-2xl font-bold mb-8">Solicitações Recentes</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">ST</div>
                  <div>
                    <div className="font-bold text-sm">Peça Automotiva STL</div>
                    <div className="text-xs text-muted-foreground font-medium">Há 10 minutos por João Silva</div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground group-hover/item:text-white cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
          <h3 className="font-outfit text-2xl font-bold mb-8">Verificações Pendentes</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">P</div>
                  <div>
                    <div className="font-bold text-sm">3D Master Lab</div>
                    <div className="text-xs text-muted-foreground font-medium italic">CNPJ: 12.345.678/0001-00</div>
                  </div>
                </div>
                <Button size="sm" className="rounded-xl px-5 font-bold">Analisar</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="glass-card p-8 rounded-[2rem] hover:border-primary/30 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="text-green-500 text-[10px] font-black bg-green-500/10 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-500/20">{trend}</div>
      </div>
      <div className="text-4xl font-outfit font-black tracking-tighter mb-2">{value}</div>
      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</div>
    </div>
  );
}
