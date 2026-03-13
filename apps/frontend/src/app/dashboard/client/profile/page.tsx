"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, MapPin, Camera, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real test user ID from database
    const userId = "de396c29-8ae9-48ec-80e6-78a97c817dbd"; 
    
    fetch(`http://localhost:3001/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
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

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Usuário não encontrado</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-700 overflow-hidden relative">
              <User className="w-16 h-16" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2 pb-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">{user.name}</h1>
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 h-6">
                {user.role}
              </Badge>
            </div>
            <p className="text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2 mb-1">
          <Edit2 className="w-4 h-4" />
          Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {/* Left Column - Stats & Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="pro-card p-6 bg-slate-900/20 border-slate-800 space-y-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Informações da Conta
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Membro desde</p>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Localização</p>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  São Paulo, SP
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</p>
                <Badge variant="success" className="mt-1">Ativo</Badge>
              </div>
            </div>
          </div>

          <div className="pro-card p-6 bg-slate-900/20 border-slate-800 space-y-4">
            <h3 className="font-bold text-white">Segurança</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mantenha sua conta segura habilitando autenticação em duas etapas e usando senhas fortes.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs h-9">Alterar Senha</Button>
          </div>
        </div>

        {/* Right Column - Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="pro-card p-8 bg-slate-900/40 border-slate-800 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-700">
              <Shield className="w-8 h-8 opacity-20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Histórico de Atividade</h3>
              <p className="text-slate-400 text-sm max-w-sm">
                Aqui você poderá visualizar suas últimas ações, logins recentes e atualizações de segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
