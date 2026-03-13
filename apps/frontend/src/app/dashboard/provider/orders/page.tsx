"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Printer, Package, User, Calendar, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const ORDER_STATUS_LABEL: Record<string, string> = {
  CREATED: "Aguardando Início",
  IN_PRODUCTION: "Em Produção",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

const ORDER_STATUS_VARIANT: Record<string, string> = {
  CREATED: "secondary",
  IN_PRODUCTION: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export default function ProviderOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      if (!token) { router.push("/auth/login"); return; }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setOrders(await res.json());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [router]);

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
        <div className="technical-label mb-2">Fila de Produção</div>
        <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">
          Pipeline de <span className="gradient-text-pro">Impressão</span>
        </h1>
        <p className="text-slate-400 mt-2 font-mono text-sm">Projetos contratados e aprovados para impressão no seu hub.</p>
      </div>

      {orders.length === 0 ? (
        <div className="pro-card p-12 text-center space-y-6 max-w-xl mx-auto mt-8 bg-slate-900/40 border-slate-800 border-dashed">
          <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mx-auto">
            <Printer className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold font-mono text-white uppercase tracking-tight">Nenhum Serviço Contratado</h2>
            <p className="text-slate-400 max-w-sm mx-auto font-mono text-sm leading-relaxed">
              Quando um cliente aceitar uma das suas propostas, o serviço aparecerá aqui.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="pro-card bg-slate-900/60 border-slate-800 hover:border-primary/50 transition-colors flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="p-5 border-b border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2 technical-label">
                  <Package className="w-3.5 h-3.5" />
                  Serviço Confirmado
                </div>
                <Badge variant={ORDER_STATUS_VARIANT[order.status] as any} className="rounded-none font-mono text-[10px] uppercase tracking-wider px-2 h-5">
                  {ORDER_STATUS_LABEL[order.status] || order.status}
                </Badge>
              </div>

              <div className="p-5 flex-1 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {order.request?.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 line-clamp-2 mt-1">
                    {order.request?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                    <User className="w-3.5 h-3.5 text-primary/70" />
                    <span>{order.request?.client?.name || "Cliente Anônimo"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5 text-primary/70" />
                    <span>Prazo: {order.proposal?.deliveryDays} dias úteis</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <DollarSign className="w-3.5 h-3.5 text-primary/70" />
                    <span className="text-primary font-bold text-sm">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.proposal?.price || 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 border-t border-slate-800/50 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Pedido criado {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ptBR })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
