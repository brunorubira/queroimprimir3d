"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronRight, ShoppingBag, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const ORDER_STATUS_LABEL: Record<string, string> = {
  CREATED: "Em Andamento",
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

export default function ClientOrdersPage() {
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
        <div className="technical-label mb-2">Pipeline Ativo</div>
        <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">
          Meus <span className="gradient-text-pro">Pedidos</span>
        </h1>
        <p className="text-slate-400 mt-2 font-mono text-sm">Acompanhamento dos serviços de impressão contratados.</p>
      </div>

      {orders.length === 0 ? (
        <div className="pro-card p-12 text-center space-y-6 max-w-xl mx-auto mt-8 bg-slate-900/40 border-slate-800 border-dashed">
          <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold font-mono text-white uppercase tracking-tight">Nenhum Pedido Ativo</h2>
            <p className="text-slate-400 max-w-sm mx-auto font-mono text-sm leading-relaxed">
              Aceite um orçamento de uma solicitação para iniciar um pedido.
            </p>
          </div>
          <Link href="/dashboard/client" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-white transition-colors uppercase tracking-widest">
            Ver minhas solicitações →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="pro-card p-6 bg-slate-900/20 border-slate-800 hover:border-primary/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                      {order.request?.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <p className="text-sm font-mono text-slate-400">
                        Hub: <span className="text-slate-300">{order.proposal?.provider?.user?.name || "Parceiro"}</span>
                      </p>
                      <p className="text-sm font-mono text-slate-400">
                        Valor: <span className="text-primary font-bold">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.proposal?.price || 0)}</span>
                      </p>
                      <p className="text-sm font-mono text-slate-400">
                        Prazo: <span className="text-slate-300">{order.proposal?.deliveryDays} dias</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Criado</p>
                    <p className="text-xs font-mono text-slate-400">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                  <Badge variant={ORDER_STATUS_VARIANT[order.status] as any} className="rounded-none font-mono text-xs uppercase tracking-wider px-3 h-7">
                    {ORDER_STATUS_LABEL[order.status] || order.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
