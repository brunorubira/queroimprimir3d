"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { getToken, getUser } from "@/lib/auth";
import { User, MapPin, Cpu, Plus, Trash2, CheckCircle2, AlertCircle, Printer } from "lucide-react";

const profileSchema = zod.object({
  bio: zod.string().optional(),
  location: zod.string().optional(),
});

const printerSchema = zod.object({
  model: zod.string().min(2, "Nome do modelo obrigatório"),
  technology: zod.string().min(2, "Tecnologia obrigatória"),
  buildVolume: zod.string().optional(),
});

interface PrinterData {
  id: string;
  model: string;
  technology: string;
  buildVolume?: string;
}

export default function ProviderProfilePage() {
  const [printers, setPrinters] = useState<PrinterData[]>([]);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [addingPrinter, setAddingPrinter] = useState(false);
  const user = getUser();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { bio: "", location: "" },
  });

  const printerForm = useForm({
    resolver: zodResolver(printerSchema),
    defaultValues: { model: "", technology: "FDM", buildVolume: "" },
  });

  useEffect(() => {
    const token = getToken();
    if (!token) { window.location.href = "/auth/login"; return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          reset({ bio: data.bio || "", location: data.location || "" });
          setPrinters(data.printers || []);
        }
      })
      .catch(console.error);
  }, [reset]);

  const onSaveProfile = async (data: any) => {
    const token = getToken();
    setSaveStatus("saving");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setSaveStatus(res.ok ? "success" : "error");
    } catch {
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const onAddPrinter = async (data: any) => {
    const token = getToken();
    setAddingPrinter(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers/me/printers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newPrinter = await res.json();
        setPrinters(prev => [...prev, newPrinter]);
        printerForm.reset({ model: "", technology: "FDM", buildVolume: "" });
      }
    } catch (e) { console.error(e); }
    setAddingPrinter(false);
  };

  const onRemovePrinter = async (printerId: string) => {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers/me/printers/${printerId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setPrinters(prev => prev.filter(p => p.id !== printerId));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="technical-label mb-2">Módulo de Identidade // Configuração do Nó</div>
        <h1 className="text-3xl font-outfit font-bold text-white tracking-tighter uppercase">
          Perfil do <span className="gradient-text-pro">Hub</span>
        </h1>
        <p className="text-slate-400 mt-2 font-mono text-sm">
          Configure as informações do seu hub de manufatura. Elas aparecem no marketplace público.
        </p>
      </div>

      {/* Basic Info Card */}
      <form onSubmit={handleSubmit(onSaveProfile)} className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 border-b border-slate-800/50 pb-4">
          <User className="w-4 h-4 text-primary" />
          <span className="font-bold text-white uppercase tracking-tight">Informações do Hub</span>
        </div>

        {/* Hub Identity */}
        <div className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800">
          <div className="w-16 h-16 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-white font-outfit text-lg uppercase tracking-tight">
              {user?.name || "Seu Hub"}
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{user?.email}</div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Sobre o Hub (Bio)</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full px-4 py-3 rounded-none bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600 resize-none"
            placeholder="Descreva seus equipamentos, especialidades e tempo de resposta..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <MapPin className="w-3 h-3 text-primary" /> Localização
          </label>
          <input
            {...register("location")}
            className="w-full px-4 py-3 rounded-none bg-slate-950 border border-slate-800 focus:border-primary outline-none transition-all font-mono text-sm text-slate-300 placeholder:text-slate-600"
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || saveStatus === "saving"}
            className="h-11 px-8 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest"
          >
            {saveStatus === "saving" ? "Salvando..." : "Salvar Perfil"}
          </Button>
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-green-500 font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" /> Perfil salvo com sucesso!
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs">
              <AlertCircle className="w-4 h-4" /> Erro ao salvar. Tente novamente.
            </div>
          )}
        </div>
      </form>

      {/* Printers Card */}
      <div className="pro-card p-8 bg-slate-900/40 border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800/50 pb-4">
          <Printer className="w-4 h-4 text-primary" />
          <span className="font-bold text-white uppercase tracking-tight">Impressoras Cadastradas</span>
          <span className="ml-auto text-[9px] font-mono text-slate-500 bg-slate-950 border border-slate-800 px-2 py-0.5">
            {printers.length} equipamentos
          </span>
        </div>

        {/* Existing Printers */}
        <div className="space-y-3">
          {printers.length === 0 ? (
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest text-center py-4">
              Nenhuma impressora cadastrada. Adicione abaixo.
            </p>
          ) : (
            printers.map(printer => (
              <div key={printer.id} className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 group">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm uppercase">{printer.model}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 uppercase">
                      {printer.technology}
                    </span>
                    {printer.buildVolume && (
                      <span className="text-[10px] font-mono text-slate-400">{printer.buildVolume}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onRemovePrinter(printer.id)}
                  className="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add Printer Form */}
        <form onSubmit={printerForm.handleSubmit(onAddPrinter)} className="border-t border-slate-800/50 pt-6 space-y-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Adicionar Impressora</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Modelo</label>
              <input
                {...printerForm.register("model")}
                className="w-full px-3 py-2 rounded-none bg-slate-950 border border-slate-800 focus:border-primary outline-none text-sm font-mono text-slate-300 placeholder:text-slate-600"
                placeholder="Ex: Ender 3 S1 Pro"
              />
              {printerForm.formState.errors.model && (
                <p className="text-[10px] text-red-500 font-mono">{printerForm.formState.errors.model.message as string}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tecnologia</label>
              <select
                {...printerForm.register("technology")}
                className="w-full px-3 py-2 rounded-none bg-slate-950 border border-slate-800 focus:border-primary outline-none text-sm font-mono text-slate-300 appearance-none cursor-pointer"
              >
                <option value="FDM">FDM</option>
                <option value="SLA">SLA</option>
                <option value="SLS">SLS</option>
                <option value="DLP">DLP</option>
                <option value="MSLA">MSLA</option>
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Volume de Impressão (opcional)</label>
              <input
                {...printerForm.register("buildVolume")}
                className="w-full px-3 py-2 rounded-none bg-slate-950 border border-slate-800 focus:border-primary outline-none text-sm font-mono text-slate-300 placeholder:text-slate-600"
                placeholder="Ex: 220x220x250mm"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={addingPrinter}
            variant="outline"
            className="h-10 px-6 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest border-slate-700 bg-slate-950 text-slate-300 hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {addingPrinter ? "Adicionando..." : "Adicionar Impressora"}
          </Button>
        </form>
      </div>
    </div>
  );
}
