"use client";

import { useState } from "react";
import { SubmitProposalForm } from "@/components/proposals/SubmitProposalForm";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Printer, ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, getUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function LeadDetailsPage() {
  const router = useRouter();
  const [startingConversation, setStartingConversation] = useState(false);

  // NOTE: This is a static placeholder page. In a real implementation,
  // the page would receive the lead ID from params and fetch the real request data.
  // The clientId below would come from the request data.
  const CLIENT_PLACEHOLDER_ID = ""; // would be populated from the actual request

  const handleStartConversation = async () => {
    const token = getToken();
    const currentUser = getUser();
    if (!token || !currentUser) {
      router.push("/auth/login");
      return;
    }

    setStartingConversation(true);
    try {
      // In a real request, we'd use the actual client's userId from the request data
      // For now we demonstrate the flow with the current user
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userIds: [currentUser.id, CLIENT_PLACEHOLDER_ID].filter(Boolean) }),
      });

      if (res.ok) {
        router.push("/dashboard/provider/messages");
      }
    } catch (e) {
      console.error(e);
    }
    setStartingConversation(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Link href="/dashboard/provider" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold uppercase tracking-widest font-mono text-[10px]">Voltar ao Marketplace</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Detalhes do Lead</h1>
          <p className="text-muted-foreground mt-2">ID: #RE-4059</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleStartConversation}
            disabled={startingConversation}
            variant="outline"
            className="rounded-none font-mono text-[10px] font-bold uppercase tracking-widest border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            {startingConversation ? "Abrindo..." : "Contatar Cliente"}
          </Button>
          <Badge className="bg-primary/20 text-primary border-none text-sm px-4 py-1">EM ABERTO</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Engrenagem Industrial de Nylon</h2>
              <p className="text-muted-foreground leading-relaxed">
                Preciso de uma engrenagem resistente para substituição em máquina têxtil. 
                O material deve suportar alta temperatura e atrito. Já tenho o arquivo STL pronto.
                O acabamento deve ser o mais liso possível.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <MapPin className="text-primary w-5 h-5" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Printer className="text-primary w-5 h-5" />
                <span className="text-sm">FDM / Nylon CF</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <FileText className="w-4 h-4" /> Arquivos Anexos
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-sm truncate">engrenagem_v2_final.stl</span>
                <button className="text-primary text-xs font-bold">Baixar</button>
              </div>
            </div>
          </div>
          
          <SubmitProposalForm />
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="font-bold">Cliente</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">JS</div>
              <div>
                <div className="font-bold">João Silva</div>
                <div className="text-xs text-muted-foreground">5 pedidos realizados</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
