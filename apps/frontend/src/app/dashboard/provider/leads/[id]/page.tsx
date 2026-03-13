"use client";

import { useEffect, useState } from "react";
import { SubmitProposalForm } from "@/components/proposals/SubmitProposalForm";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Printer, ArrowLeft, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, getUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [startingConversation, setStartingConversation] = useState(false);
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      const token = getToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setRequest(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [params.id, router]);

  const handleStartConversation = async () => {
    const token = getToken();
    const currentUser = getUser();
    if (!token || !currentUser) {
      router.push("/auth/login");
      return;
    }

    setStartingConversation(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userIds: [currentUser.id, request?.clientId].filter(Boolean) }),
      });

      if (res.ok) {
        router.push("/dashboard/provider/messages");
      }
    } catch (e) {
      console.error(e);
    }
    setStartingConversation(false);
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
        Lead não encontrado ou indisponível.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Link href="/dashboard/provider" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold uppercase tracking-widest font-mono text-[10px]">Voltar ao Marketplace</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Detalhes do Lead</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
            ID: {request.id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleStartConversation}
            disabled={startingConversation}
            variant="outline"
            className="rounded-none font-mono text-[10px] font-bold uppercase tracking-widest border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex flex-col md:flex-row items-center gap-2 h-auto py-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden md:inline">{startingConversation ? "Abrindo..." : "Contatar Cliente"}</span>
          </Button>
          <Badge className="bg-primary/20 text-primary border-none text-sm px-4 py-1 rounded-none font-mono uppercase tracking-widest">{request.status}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 technical-label">
                <Clock className="w-3.5 h-3.5" />
                Criado {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true, locale: ptBR })}
              </div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{request.title}</h2>
              <p className="text-slate-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 flex items-center gap-3">
                <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-mono text-slate-300">Endereço não informado (Em breve)</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Printer className="text-primary w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-mono text-slate-300">Material Opcional</span>
              </div>
            </div>

            {request.attachments?.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2 text-white uppercase text-sm tracking-widest font-mono">
                  <FileText className="w-4 h-4 text-primary" /> Arquivos Anexos
                </h4>
                {request.attachments.map((file: any) => (
                  <div key={file.id} className="p-4 bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-primary/50 transition-colors">
                    <span className="text-sm font-mono text-slate-300 truncate">{file.filename || file.url.split('/').pop()}</span>
                    <button className="text-primary text-xs font-bold font-mono uppercase tracking-widest">Baixar</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <SubmitProposalForm requestId={request.id} />
        </div>

        <div className="space-y-8">
          <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6">
            <h3 className="font-bold font-mono uppercase tracking-widest text-slate-500 text-xs">Informações do Cliente</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                {request.client?.name?.charAt(0) || "C"}
              </div>
              <div>
                <div className="font-bold text-white">{request.client?.name || "Cliente Confirmado"}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">Conta Verificada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
