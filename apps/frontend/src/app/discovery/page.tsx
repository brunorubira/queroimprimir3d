"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/button";
import { MapPin, Printer, Star, ChevronRight, Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TECHNOLOGIES = ["FDM", "SLA", "SLS", "DLP"];
const MATERIALS = ["PLA", "ABS", "PETG", "Resina", "Nylon", "TPU"];

// Derive a stable list of technologies/materials for a hub based on its printers
function hubTechs(hub: any): string[] {
  if (hub.printers && hub.printers.length > 0) {
    return Array.from(new Set(hub.printers.map((p: any) => p.technology as string)));
  }
  return ["FDM"];
}

function hubMaterials(hub: any): string[] {
  // Materials come from printers.materials (array field) or fallback
  if (hub.printers && hub.printers.length > 0) {
    const mats: string[] = [];
    hub.printers.forEach((p: any) => {
      if (Array.isArray(p.materials)) mats.push(...p.materials);
    });
    if (mats.length > 0) return Array.from(new Set(mats));
  }
  return ["PLA", "ABS", "Nylon"];
}

function HubCard({ hub }: { hub: any }) {
  const technologies = hubTechs(hub);
  const materials = hubMaterials(hub);
  const hubName = hub.user?.name || "Hub QueroImprimir3D";
  const rating = hub.rating ? Number(hub.rating).toFixed(1) : "5.0";

  return (
    <div className="pro-card p-6 bg-slate-900/20 border-slate-800 hover:border-primary/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Hub Identifier */}
        <div className="flex flex-col items-center justify-center w-24 shrink-0 border-r border-slate-800/50 pr-6">
          <div className="w-16 h-16 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
            <Printer className="w-8 h-8" />
          </div>
          <Badge variant="default" className="rounded-none font-mono text-[9px] uppercase tracking-widest px-2">
            ONLINE
          </Badge>
        </div>

        {/* Hub Details */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                {hubName}
              </h3>
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 border border-slate-800">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-mono font-bold text-white">{rating}</span>
                <span className="text-[9px] font-mono text-slate-500">(Novo)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-mono uppercase tracking-widest">Brasil</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech: string) => (
              <span key={tech} className="text-[10px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest">
                {tech}
              </span>
            ))}
            {materials.slice(0, 4).map((mat: string) => (
              <span key={mat} className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none uppercase tracking-widest">
                {mat}
              </span>
            ))}
            {materials.length > 4 && (
              <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
                +{materials.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Column */}
        <div className="flex flex-col justify-between items-end border-l border-slate-800/50 pl-6 md:w-48 shrink-0">
          <div className="text-right">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">Custo Base</span>
            <span className="text-sm font-mono font-bold text-white">Sob Orçamento</span>
          </div>

          <Link href="/auth/login" className="w-full mt-4">
            <Button className="w-full h-10 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest bg-slate-800 text-white hover:bg-primary transition-all group-hover:bg-primary">
              Solicitar <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DiscoveryPage() {
  const [allHubs, setAllHubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active filters
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [materialFilters, setMaterialFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("relevancia");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers`)
      .then(res => res.ok ? res.json() : [])
      .catch(() => [])
      .then(data => {
        setAllHubs(data);
        setLoading(false);
      });
  }, []);

  const toggleFilter = (value: string, set: string[], setter: (v: string[]) => void) => {
    setter(set.includes(value) ? set.filter(v => v !== value) : [...set, value]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTechFilters([]);
    setMaterialFilters([]);
    setSortOrder("relevancia");
  };

  const hasActiveFilters = searchQuery || techFilters.length > 0 || materialFilters.length > 0;

  const filteredHubs = useMemo(() => {
    let result = [...allHubs];

    // Name search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(hub => (hub.user?.name || "").toLowerCase().includes(q));
    }

    // Technology filter
    if (techFilters.length > 0) {
      result = result.filter(hub => {
        const techs = hubTechs(hub);
        return techFilters.some(t => techs.includes(t));
      });
    }

    // Material filter
    if (materialFilters.length > 0) {
      result = result.filter(hub => {
        const mats = hubMaterials(hub).map(m => m.toLowerCase());
        return materialFilters.some(m => mats.some(hm => hm.includes(m.toLowerCase())));
      });
    }

    // Sorting
    if (sortOrder === "rating") {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (sortOrder === "recentes") {
      result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return result;
  }, [allHubs, searchQuery, techFilters, materialFilters, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1 relative pt-20">
        <BlueprintGrid />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 py-12">
          {/* Header */}
          <div className="mb-12 border-b border-slate-800/50 pb-8">
            <div className="technical-label mb-4">
              Módulo de Descoberta // Listagem de Nós de Manufatura
            </div>
            <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white tracking-tighter uppercase">
              Hubs de <span className="gradient-text-pro">Impressão</span>
            </h1>
            <p className="text-slate-400 mt-4 font-mono text-sm max-w-2xl leading-relaxed">
              Encontre o parceiro de manufatura ideal. Filtre por tecnologia, material e nome na rede distribuída de impressoras 3D.
            </p>

            {/* Search Bar */}
            <div className="mt-6 relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar hub por nome..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-primary outline-none font-mono text-sm text-slate-300 placeholder:text-slate-600 transition-colors rounded-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 shrink-0 space-y-6">
              <div className="pro-card p-6 bg-slate-900/40 border-slate-800">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800/50 pb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="font-bold text-white uppercase tracking-tight">Filtros</span>
                  </div>
                  {hasActiveFilters && (
                    <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded-full border border-primary/20">
                      {techFilters.length + materialFilters.length} ativos
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Technology Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Tecnologia</span>
                    <div className="space-y-2">
                      {TECHNOLOGIES.map(tech => (
                        <label key={tech} className="flex items-center gap-2 cursor-pointer group">
                          <div
                            onClick={() => toggleFilter(tech, techFilters, setTechFilters)}
                            className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${
                              techFilters.includes(tech) 
                                ? "bg-primary border-primary" 
                                : "bg-slate-900 border-slate-700 group-hover:border-slate-500"
                            }`}
                          >
                            {techFilters.includes(tech) && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={() => toggleFilter(tech, techFilters, setTechFilters)}
                            className={`text-sm font-mono transition-colors ${techFilters.includes(tech) ? "text-primary" : "text-slate-400 group-hover:text-slate-300"}`}
                          >
                            {tech}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Material Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Material</span>
                    <div className="space-y-2">
                      {MATERIALS.map(mat => (
                        <label key={mat} className="flex items-center gap-2 cursor-pointer group">
                          <div
                            onClick={() => toggleFilter(mat, materialFilters, setMaterialFilters)}
                            className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${
                              materialFilters.includes(mat) 
                                ? "bg-primary border-primary" 
                                : "bg-slate-900 border-slate-700 group-hover:border-slate-500"
                            }`}
                          >
                            {materialFilters.includes(mat) && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={() => toggleFilter(mat, materialFilters, setMaterialFilters)}
                            className={`text-sm font-mono transition-colors ${materialFilters.includes(mat) ? "text-primary" : "text-slate-400 group-hover:text-slate-300"}`}
                          >
                            {mat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full mt-8 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Limpar Filtros
                </Button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                  {loading ? "Carregando..." : `Mostrando ${filteredHubs.length} de ${allHubs.length} nós`}
                </span>
                
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-none px-3 py-1.5 text-xs font-mono text-slate-400 outline-none focus:border-primary cursor-pointer"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="rating">Melhor Avaliação</option>
                  <option value="recentes">Mais Recentes</option>
                </select>
              </div>

              <div className="grid gap-4">
                {loading ? (
                  <div className="pro-card p-12 text-center bg-slate-900/20 border-slate-800">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Conectando à rede...</p>
                  </div>
                ) : filteredHubs.length === 0 ? (
                  <div className="pro-card p-12 text-center bg-slate-900/20 border-slate-800">
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">
                      {hasActiveFilters ? "Nenhum hub encontrado com estes filtros." : "Nenhum nó de manufatura encontrado no momento."}
                    </p>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-primary text-xs font-mono hover:underline mt-2">
                        Limpar filtros →
                      </button>
                    )}
                  </div>
                ) : (
                  filteredHubs.map((hub: any) => (
                    <HubCard key={hub.id} hub={hub} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
