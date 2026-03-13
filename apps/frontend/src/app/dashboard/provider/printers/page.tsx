"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Printer as PrinterIcon, Trash2 } from "lucide-react";

const mockPrinters = [
  { id: "1", model: "Creality Ender 3 S1", technology: "FDM", status: "Active", volume: "220x220x270mm" },
  { id: "2", model: "Anycubic Photon Mono X", technology: "SLA", status: "Active", volume: "192x120x245mm" },
];

export default function PrintersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="technical-label mb-2">Painel de Equipamentos</div>
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tighter uppercase">Minha <span className="gradient-text-pro">Frota 3D</span></h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">Gerencie seu parque de máquinas de manufatura aditiva.</p>
        </div>
        <Button className="h-10 px-6 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-2">
          <Plus className="w-4 h-4" />
          REGISTRAR MÁQUINA
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrinters.map((printer) => (
          <div key={printer.id} className="pro-card p-0 bg-slate-900/30 border-slate-800 hover:border-primary/50 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                  <PrinterIcon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none animate-pulse">
                  {printer.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-outfit text-white uppercase tracking-tight group-hover:text-primary transition-colors">{printer.model}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none uppercase tracking-widest">{printer.technology}</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Volume</span>
                    <span className="font-mono text-white">{printer.volume}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-t border-slate-800/50">
              <button className="flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                Configurar
              </button>
              <div className="w-px bg-slate-800/50" />
              <button className="flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-3 h-3" /> Excluir
              </button>
            </div>
          </div>
        ))}

        <button className="pro-card border-dashed border-slate-800 bg-slate-900/10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-slate-900/40 transition-all text-slate-500 hover:text-primary group min-h-[300px]">
          <div className="w-12 h-12 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Acoplar Equipamento</span>
        </button>
      </div>
    </div>
  );
}
