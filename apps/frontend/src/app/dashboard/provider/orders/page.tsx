"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Box, CheckCircle2, Clock, Package } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-123",
    title: "Engrenagem Industrial",
    client: "João Silva",
    status: "IN_PROGRESS",
    deadline: "15/03/2026",
    value: "R$ 180,00",
  },
  {
    id: "ORD-124",
    title: "Action Figure 15cm",
    client: "Maria Souza",
    status: "COMPLETED",
    deadline: "10/03/2026",
    value: "R$ 450,00",
  }
];

export default function ProviderOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Meus Pedidos</h1>
        <p className="text-muted-foreground mt-2">Acompanhe e gerencie a produção dos seus serviços</p>
      </div>

      <div className="grid gap-6">
        {mockOrders.map((order) => (
          <div key={order.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Package className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{order.title}</h3>
                  <Badge className={cn(
                    "border-none",
                    order.status === 'COMPLETED' ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {order.status === 'COMPLETED' ? 'Concluído' : 'Em Produção'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  ID: #{order.id} • Cliente: <span className="text-white font-medium">{order.client}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Valor</div>
                  <div className="font-bold">{order.value}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Prazo</div>
                  <div className="font-bold flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    {order.deadline}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl glass px-6">Ver Chat</Button>
                <Button className="rounded-xl px-6">Atualizar Status</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
