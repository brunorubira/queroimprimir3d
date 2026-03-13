"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Search, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  participants: any[];
  messages: any[];
}

export default function ClientMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    // Real test user ID from database
    const userId = "de396c29-8ae9-48ec-80e6-78a97c817dbd"; 
    
    fetch(`http://localhost:3001/conversations?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        if (data.length > 0) setActiveTab(data[0].id);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Sidebar List */}
      <div className="w-80 flex flex-col gap-4">
        <div>
          <div className="technical-label mb-2">Protocolo de Comunicação</div>
          <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">Central de <span className="gradient-text-pro">Mensagens</span></h1>
          <p className="text-slate-400 mt-2 font-mono text-xs">Canal direto de negociação com a rede de manufatura.</p>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
          <input 
            type="text" 
            placeholder="Filtrar conexões..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-none font-mono text-sm outline-none focus:border-primary focus:bg-slate-900 transition-all text-slate-300 placeholder:text-slate-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-slate-500 font-mono text-xs uppercase tracking-widest">Nenhum canal ativo.</div>
          ) : (
            conversations.map((conv) => (
              <button 
                key={conv.id}
                onClick={() => setActiveTab(conv.id)}
                className={cn(
                  "w-full p-4 rounded-none border text-left transition-all group relative overflow-hidden",
                  activeTab === conv.id 
                    ? "bg-slate-900/80 border-primary/50 text-white" 
                    : "bg-slate-900/20 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40"
                )}
              >
                {activeTab === conv.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-none border flex items-center justify-center shrink-0 transition-colors",
                    activeTab === conv.id ? "bg-primary/10 border-primary/30 text-primary" : "bg-slate-950 border-slate-800 text-slate-500 group-hover:text-slate-400 group-hover:border-slate-700"
                  )}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold font-outfit uppercase tracking-tight truncate text-sm">
                      {conv.participants[0]?.user?.name || "NÓ DESCONHECIDO"}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 truncate mt-1">
                      {conv.messages[0]?.content || "Aguardando transmissão..."}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 pro-card bg-slate-950/50 border-slate-800 flex flex-col relative overflow-hidden backdrop-blur-md">
        {activeTab ? (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
            <div className="p-4 border-b border-slate-800/80 flex items-center gap-4 bg-slate-900/40 relative z-10">
              <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold font-outfit text-white uppercase tracking-tight block">Hub Parceiro Identificado</span>
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse block" /> Conexão Estável
                </span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-center mb-8">
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500 border border-slate-800/50 bg-slate-900/50 px-4 py-1.5 rounded-none">
                  Sessão Iniciada: Hoje
                </span>
              </div>
              {/* Messages would go here */}
              <div className="text-center py-20">
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Aguardando dados de telemetria e mensagens...</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 relative z-10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Transmitir mensagem..." 
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-none px-4 py-3 font-mono text-sm outline-none focus:border-primary transition-all text-slate-300 placeholder:text-slate-600 focus:bg-slate-900/80"
                />
                <button className="w-12 h-[46px] bg-primary text-primary-foreground rounded-none flex items-center justify-center hover:bg-primary/90 transition-all border border-primary">
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
              </div>
              <div className="mt-2 text-right">
                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Criptografia Ponta a Ponta Ativa</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6 relative z-10">
            <div className="w-24 h-24 rounded-none border border-slate-800 bg-slate-900/30 flex items-center justify-center text-slate-700">
              <MessageSquare className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-outfit font-bold text-white uppercase tracking-tight">Canal de Comunicação</h2>
              <p className="text-slate-500 font-mono text-xs max-w-sm mx-auto leading-relaxed">
                Selecione um hub parceiro no terminal à esquerda para iniciar a negociação de parâmetros e valores de produção.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
