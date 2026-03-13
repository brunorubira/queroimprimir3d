"use client";

import { Shield, Bell, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Configurações</h1>
        <p className="text-slate-400 mt-1">Gerencie suas preferências de conta e notificações.</p>
      </div>

      <div className="grid gap-6">
        <SettingItem 
          title="Notificações" 
          description="Controle como você recebe alertas sobre orçamentos e mensagens."
          icon={<Bell className="w-5 h-5 text-primary" />}
        />
        <SettingItem 
          title="Privacidade" 
          description="Gerencie quem pode ver seu perfil e visibilidade no marketplace."
          icon={<Shield className="w-5 h-5 text-indigo-400" />}
        />
        <SettingItem 
          title="Pagamentos" 
          description="Adicione ou remova métodos de pagamento para facilitar seus pedidos."
          icon={<CreditCard className="w-5 h-5 text-emerald-400" />}
        />
        <SettingItem 
          title="Segurança" 
          description="Alterar senha, habilitar 2FA e gerenciar sessões ativas."
          icon={<Lock className="w-5 h-5 text-amber-400" />}
        />
      </div>
    </div>
  );
}

function SettingItem({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="pro-card p-6 bg-slate-900/20 border-slate-800 flex items-center justify-between gap-6 hover:border-slate-700 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-white tracking-wide">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-slate-500 group-hover:text-primary transition-colors">
        Gerenciar
      </Button>
    </div>
  );
}
