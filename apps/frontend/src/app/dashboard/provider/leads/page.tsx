"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box, Clock, MapPin, Printer } from "lucide-react";

const mockLeads = [
  {
    id: "1",
    title: "Engrenagem Industrial de Nylon",
    description: "Preciso de uma engrenagem resistente para substituição em máquina têxtil. Desenho STL pronto.",
    budget: "R$ 150 - R$ 250",
    location: "São Paulo, SP",
    material: "Nylon / Carbon Fiber",
    postedAt: "Há 2 horas",
    technology: "FDM / SLS",
  },
  {
    id: "2",
    title: "Action Figure Colecionável",
    description: "Miniatura de 15cm com alto detalhamento. Requer resina de alta resolução.",
    budget: "Sob orçamento",
    location: "Curitiba, PR",
    material: "Resina Standard/Tough",
    postedAt: "Há 5 horas",
    technology: "SLA / DLP",
  }
];

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Novos Leads</h1>
        <p className="text-muted-foreground mt-2">Oportunidades compatíveis com suas impressoras e serviços</p>
      </div>

      <div className="grid gap-6">
        {mockLeads.map((lead) => (
          <div key={lead.id} className="glass p-6 rounded-3xl hover:border-primary/50 transition-all group relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{lead.title}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    {lead.technology}
                  </Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                  {lead.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {lead.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Printer className="w-4 h-4" />
                    {lead.material}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {lead.postedAt}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3 min-w-[150px]">
                <div className="text-lg font-bold text-white mb-2">{lead.budget}</div>
                <Button className="w-full md:w-auto px-8 rounded-xl">Ver Detalhes</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
