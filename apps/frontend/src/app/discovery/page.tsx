import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/button";
import { MapPin, Printer, Star, Box, ChevronRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

async function getProviders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
}

export default async function DiscoveryPage() {
  const hubs = await getProviders();

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
              Encontre o parceiro de manufatura ideal para o seu projeto. Filtre por tecnologia, material e localização na nossa rede distribuída de impressoras 3D.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 shrink-0 space-y-6">
              <div className="pro-card p-6 bg-slate-900/40 border-slate-800">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-800/50 pb-4">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white uppercase tracking-tight">Filtros</span>
                </div>

                <div className="space-y-6">
                  {/* Technology Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Tecnologia</span>
                    <div className="space-y-2">
                      {["FDM", "SLA", "SLS", "DLP"].map(tech => (
                        <label key={tech} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded-none border-slate-700 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-slate-950" />
                          <span className="text-sm font-mono text-slate-400 group-hover:text-slate-300 transition-colors">{tech}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Material Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Material</span>
                    <div className="space-y-2">
                      {["PLA", "ABS", "PETG", "Resina", "Nylon", "TPU"].map(mat => (
                        <label key={mat} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded-none border-slate-700 bg-slate-900 text-primary focus:ring-primary focus:ring-offset-slate-950" />
                          <span className="text-sm font-mono text-slate-400 group-hover:text-slate-300 transition-colors">{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8 rounded-none font-mono text-[10px] font-bold uppercase tracking-widest bg-slate-800 text-slate-300 hover:bg-slate-700">
                  Limpar Filtros
                </Button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                  Mostrando {hubs.length} nós disponíveis
                </span>
                
                <select className="bg-slate-900 border border-slate-800 rounded-none px-3 py-1.5 text-xs font-mono text-slate-400 outline-none focus:border-primary">
                  <option>Relevância</option>
                  <option>Melhor Avaliação</option>
                  <option>Mais Projetos</option>
                </select>
              </div>

              <div className="grid gap-4">
                {hubs.length === 0 ? (
                  <div className="pro-card p-12 text-center bg-slate-900/20 border-slate-800">
                     <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                       Nenhum nó de manufatura encontrado no momento.
                     </p>
                  </div>
                ) : (
                  hubs.map((hub: any) => (
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

function HubCard({ hub }: { hub: any }) {
  const technologies = hub.printers ? Array.from(new Set(hub.printers.map((p: any) => p.technology))) : ["FDM", "SLA"];
  const isOnline = hub.user?.name ? "ONLINE" : "OCUPADO";
  const hubName = hub.user?.name || "Hub QueroImprimir3D";
  const rating = hub.rating || 5.0;
  const location = "Acesso Global";

  return (
    <div className="pro-card p-6 bg-slate-900/20 border-slate-800 hover:border-primary/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Hub Identifier */}
        <div className="flex flex-col items-center justify-center w-24 shrink-0 border-r border-slate-800/50 pr-6">
          <div className="w-16 h-16 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
            <Printer className="w-8 h-8" />
          </div>
          <Badge variant={isOnline === "ONLINE" ? "default" : "secondary"} className="rounded-none font-mono text-[9px] uppercase tracking-widest px-2">
            {isOnline}
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
              <span className="text-xs font-mono uppercase tracking-widest">{location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech: any) => (
              <span key={tech} className="text-[10px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none uppercase tracking-widest">
                {tech}
              </span>
            ))}
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none uppercase tracking-widest">
              Nylon
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none uppercase tracking-widest">
              PLA
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none uppercase tracking-widest">
              ABS
            </span>
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
