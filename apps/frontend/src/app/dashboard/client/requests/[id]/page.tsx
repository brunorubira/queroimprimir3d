import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserCircle2, Calendar, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientRequestDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchRequestData = async () => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      // Fetch Request Details
      const reqRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (reqRes.ok) {
        setRequest(await reqRes.json());
      }

      // Fetch Proposals
      const propRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/request/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (propRes.ok) {
        setProposals(await propRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, [params.id, router]);

  const handleAcceptProposal = async (proposalId: string) => {
    const token = getToken();
    if (!token) return;

    setAcceptingId(proposalId);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/accept-proposal/${proposalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        // Redirecionar para a nova tela de pedidos
        router.push("/dashboard/client/orders");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erro ao aceitar proposta.");
        setAcceptingId(null);
      }
    } catch (e) {
      setError("Erro de rede. Tente novamente.");
      setAcceptingId(null);
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
      <div className="text-center py-20 text-slate-400 font-mono">
        Solicitação não encontrada.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <Link href="/dashboard/client" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold uppercase tracking-widest font-mono text-[10px]">Voltar aos Pedidos</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text pb-1 uppercase tracking-tight">{request.title}</h1>
          <p className="text-slate-400 mt-2 font-mono text-xs max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
            ID: {request.id}
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary border-none px-4 py-1 rounded-none font-mono uppercase tracking-widest self-start md:self-auto">
          {request.status}
        </Badge>
      </div>

      <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-4">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Descrição do Projeto</h3>
        <p className="text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {request.description}
        </p>
      </div>

      <div className="space-y-6 pt-4">
        <div>
          <h2 className="text-xl font-bold font-outfit uppercase tracking-tight text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold">
              {proposals.length}
            </span>
            Propostas Recebidas
          </h2>
          <p className="text-slate-400 font-mono text-xs mt-2 uppercase tracking-widest">
            Analise os orçamentos e escolha o prestador ideal
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="pro-card p-12 text-center border-dashed border-slate-800 bg-slate-900/20">
            <p className="text-slate-400 font-mono text-sm">Nenhum orçamento recebido ainda. Os prestadores foram notificados e estão analisando seu projeto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((prop) => (
              <div key={prop.id} className="pro-card bg-slate-900/60 border-slate-800 flex flex-col hover:border-primary/50 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
                
                <div className="p-6 border-b border-slate-800/50 flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <UserCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase text-sm">{prop.provider?.user?.name || "Hub Parceiro"}</div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-primary" /> Conta Verificada
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Valor</div>
                      <div className="text-xl font-bold font-mono text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prop.price)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Prazo
                      </div>
                      <div className="text-lg font-bold font-mono text-white">
                        {prop.deliveryDays} dias
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Mensagem do Hub
                    </div>
                    <p className="text-sm font-mono text-slate-300 line-clamp-4 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>

                {error && acceptingId === prop.id && (
                  <div className="px-6 pb-2 text-red-500 text-xs font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                  </div>
                )}

                <div className="p-4 bg-slate-950/50 mt-auto border-t border-slate-800/50">
                  <Button 
                    onClick={() => handleAcceptProposal(prop.id)}
                    disabled={!!acceptingId || prop.status !== "SENT" || request.status !== "OPEN"}
                    className="w-full rounded-none font-mono text-xs font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                  >
                    {acceptingId === prop.id 
                      ? "Processando..." 
                      : prop.status === "ACCEPTED" 
                        ? "Proposta Aceita" 
                        : request.status !== "OPEN" 
                          ? "Solicitação Fechada" 
                          : "Aceitar Proposta"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
