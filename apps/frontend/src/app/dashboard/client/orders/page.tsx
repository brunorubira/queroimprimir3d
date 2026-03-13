"use client";

import { useEffect, useState } from "react";
import { Box, Clock, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  status: string;
  createdAt: string;
  request: {
    title: string;
    description: string;
  };
  proposal: {
    price: number;
    provider: {
      user: {
        name: string;
      };
    };
  };
}

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CREATED': return 'secondary';
      case 'IN_PROGRESS': return 'default';
      case 'COMPLETED': return 'success';
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Meus Pedidos</h1>
        <p className="text-slate-400 mt-1">Acompanhe o status das suas impressões 3D.</p>
      </div>

      {orders.length === 0 ? (
        <div className="pro-card p-12 text-center space-y-4 bg-slate-900/40 border border-slate-800">
          <div className="w-16 h-16 rounded bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Box className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Nenhum pedido encontrado</h2>
            <p className="text-slate-400">Você ainda não tem pedidos ativos.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="pro-card p-6 bg-slate-900/20 border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Box className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                      {order.request.title}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>Hub: <span className="text-slate-200">{order.proposal.provider.user.name}</span></span>
                      <span>•</span>
                      <span>Preço: <span className="text-slate-200">R$ {order.proposal.price.toFixed(2)}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data</p>
                    <p className="text-sm font-medium text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={getStatusColor(order.status) as any} className="h-7 px-3">
                    {order.status}
                  </Badge>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
