"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Rocket, Zap } from "lucide-react";

export default function BoostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Aumente sua Visibilidade</h1>
        <p className="text-muted-foreground mt-2">Destaque seu perfil e receba mais leads qualificados</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        <div className="glass p-8 rounded-3xl space-y-6 relative border-primary/20 bg-primary/5">
          <div className="absolute -top-4 right-8">
            <Badge className="bg-primary text-white px-4 py-1">RECOMENDADO</Badge>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Rocket className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Plano Impulso</h2>
            <p className="text-muted-foreground">Ideal para hubs que querem dominar a região</p>
          </div>
          <ul className="space-y-4">
            <BenefitItem text="Destaque ouro nos resultados de busca" />
            <BenefitItem text="Notificações prioritárias de novos leads" />
            <BenefitItem text="Selo de Verificado no perfil" />
            <BenefitItem text="Exibição em primeiro lugar para sua tecnologia" />
          </ul>
          <div className="pt-6">
            <div className="text-4xl font-bold mb-6">R$ 89,90 <span className="text-sm font-normal text-muted-foreground">/mês</span></div>
            <Button className="w-full py-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">Ativar Agora</Button>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white">
              <Zap className="w-7 h-7 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Impulso Flash</h2>
              <p className="text-muted-foreground">Destaque imediato por 7 dias</p>
            </div>
            <ul className="space-y-4">
              <BenefitItem text="Destaque prata em buscas locais" />
              <BenefitItem text="Acesso a leads antigos reabertos" />
              <BenefitItem text="Selo temporário de destaque" />
            </ul>
          </div>
          <div className="pt-6">
            <div className="text-4xl font-bold mb-6">R$ 29,90 <span className="text-sm font-normal text-muted-foreground">/7 dias</span></div>
            <Button variant="outline" className="w-full py-6 rounded-2xl text-lg font-bold glass">Contratar Flash</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-muted-foreground">
      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <Check className="w-3 h-3" />
      </div>
      {text}
    </li>
  );
}
