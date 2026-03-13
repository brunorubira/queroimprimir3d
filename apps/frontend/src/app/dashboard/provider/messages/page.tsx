"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MessageSquare, Search, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getToken, getUser } from "@/lib/auth";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
}

interface Conversation {
  id: string;
  participants: { user: { id: string; name: string } }[];
  messages: { content: string }[];
}

export default function ProviderMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getUser();

  const fetchConversations = useCallback(async () => {
    const token = getToken();
    if (!token) { window.location.href = "/auth/login"; return; }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setConversations(data);
      if (!activeConv && data.length > 0) setActiveConv(data[0].id);
    }
    setLoading(false);
  }, [activeConv]);

  const fetchMessages = useCallback(async (convId: string) => {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${convId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages || []);
    }
  }, []);

  useEffect(() => { fetchConversations(); }, []);
  useEffect(() => { if (activeConv) fetchMessages(activeConv); }, [activeConv, fetchMessages]);
  useEffect(() => {
    if (!activeConv) return;
    const interval = setInterval(() => fetchMessages(activeConv), 3000);
    return () => clearInterval(interval);
  }, [activeConv, fetchMessages]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!messageInput.trim() || !activeConv || sending) return;
    setSending(true);
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ conversationId: activeConv, content: messageInput.trim() }),
    });
    if (res.ok) {
      setMessageInput("");
      await fetchMessages(activeConv);
    }
    setSending(false);
  };

  const getInterlocutor = (conv: Conversation) =>
    conv.participants.find(p => p.user.id !== currentUser?.id)?.user?.name || "Cliente";

  const filteredConvs = conversations.filter(c =>
    getInterlocutor(c).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeConvData = conversations.find(c => c.id === activeConv);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      <div className="w-80 flex flex-col gap-4">
        <div>
          <div className="technical-label mb-2">Canal de Negociação</div>
          <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">
            Central de <span className="gradient-text-pro">Mensagens</span>
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-xs">
            Converse diretamente com clientes para fechar acordos.
          </p>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filtrar clientes..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-none font-mono text-sm outline-none focus:border-primary transition-all text-slate-300 placeholder:text-slate-600"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredConvs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 font-mono text-xs uppercase tracking-widest">
              Nenhum canal ativo. Inicie uma conversa em um lead.
            </div>
          ) : (
            filteredConvs.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={cn(
                  "w-full p-4 rounded-none border text-left transition-all group relative overflow-hidden",
                  activeConv === conv.id
                    ? "bg-slate-900/80 border-primary/50 text-white"
                    : "bg-slate-900/20 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40"
                )}
              >
                {activeConv === conv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-none border flex items-center justify-center shrink-0 transition-colors",
                    activeConv === conv.id ? "bg-primary/10 border-primary/30 text-primary" : "bg-slate-950 border-slate-800 text-slate-500"
                  )}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold font-outfit uppercase tracking-tight truncate text-sm">{getInterlocutor(conv)}</div>
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

      <div className="flex-1 pro-card bg-slate-950/50 border-slate-800 flex flex-col relative overflow-hidden backdrop-blur-md">
        {activeConv && activeConvData ? (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
            <div className="p-4 border-b border-slate-800/80 flex items-center gap-4 bg-slate-900/40 relative z-10">
              <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold font-outfit text-white uppercase tracking-tight block">{getInterlocutor(activeConvData)}</span>
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse block" /> Conexão Estável
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 relative z-10">
              <div className="flex justify-center mb-4">
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500 border border-slate-800/50 bg-slate-900/50 px-4 py-1.5">
                  Início da conversa
                </span>
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Nenhuma mensagem ainda. Inicie a conversa.</p>
                </div>
              ) : (
                messages.map(msg => {
                  const isMine = msg.sender.id === currentUser?.id;
                  return (
                    <div key={msg.id} className={cn("flex gap-3", isMine ? "flex-row-reverse" : "flex-row")}>
                      <div className={cn(
                        "w-8 h-8 rounded-none border flex items-center justify-center shrink-0",
                        isMine ? "bg-primary/20 border-primary/30 text-primary" : "bg-slate-900 border-slate-800 text-slate-400"
                      )}>
                        <User className="w-4 h-4" />
                      </div>
                      <div className={cn("max-w-[70%] space-y-1", isMine ? "items-end" : "items-start")}>
                        <div className={cn(
                          "px-4 py-3 font-mono text-sm leading-relaxed",
                          isMine ? "bg-primary/20 border border-primary/30 text-white" : "bg-slate-900 border border-slate-800 text-slate-300"
                        )}>
                          {msg.content}
                        </div>
                        <div className={cn("text-[9px] font-mono text-slate-600 px-1", isMine ? "text-right" : "text-left")}>
                          {msg.sender.name} · {new Date(msg.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 relative z-10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Transmitir mensagem... (Enter para enviar)"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-none px-4 py-3 font-mono text-sm outline-none focus:border-primary transition-all text-slate-300 placeholder:text-slate-600 focus:bg-slate-900/80"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !messageInput.trim()}
                  className="w-12 h-[46px] bg-primary text-primary-foreground rounded-none flex items-center justify-center hover:bg-primary/90 transition-all border border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
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
                Selecione um cliente à esquerda ou inicie uma conversa em um lead para negociar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
