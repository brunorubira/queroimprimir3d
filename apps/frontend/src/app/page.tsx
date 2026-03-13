import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Box, Printer, Shield, Zap, ChevronRight, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Aesthetic Anchor: Blueprint Background */}
        <BlueprintGrid />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 pro-container">
          <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
            <div className="technical-label justify-center">
              <Activity className="w-3 h-3 animate-pulse" />
              Rede de Impressão: Conectada
            </div>
            
            <h1 className="text-5xl md:text-8xl font-outfit font-bold tracking-tighter text-white leading-[0.9] uppercase overflow-hidden">
              Encontre Sua <br />
              <span className="gradient-text-pro">Impressora 3D</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 text-balance font-mono max-w-2xl mx-auto border-l border-primary/30 pl-6 py-2">
              Conectamos você aos melhores donos de impressoras 3D do Brasil. Envie seu arquivo, receba orçamentos e fabrique suas peças com especialistas locais.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-64 h-14 text-sm font-mono uppercase tracking-widest group bg-primary hover:bg-primary/90 text-primary-foreground rounded-none transition-all duration-300">
                  Solicitar Orçamento
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/discovery" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-64 h-14 text-sm font-mono uppercase tracking-widest rounded-none border-slate-800 hover:bg-slate-900 transition-all duration-300">
                  Ver Profissionais
                </Button>
              </Link>
            </div>
          </div>
        </section>


        {/* Features Grid */}
        <section className="relative z-10 py-24 border-y border-slate-900/50 bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="technical-label mb-12">
              Como funciona o ecossistema
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-900 border border-slate-900">
              <FeatureCard 
                icon={<Zap className="w-5 h-5" />}
                title="Especialistas Locais"
                code="HUB_LOCAL_PRO"
                description="Conecte-se com donos de impressoras qualificados e experientes em todo o mercado nacional."
              />
              <FeatureCard 
                icon={<Shield className="w-5 h-5" />}
                title="Pagamento Seguro"
                code="SEC_PAY_FLOW"
                description="Seu dinheiro fica protegido até que você confirme o recebimento e a qualidade da peça."
              />
              <FeatureCard 
                icon={<Box className="w-5 h-5" />}
                title="Envio Facilitado"
                code="LOG_DELIVERY"
                description="Do arquivo à sua porta. Organize a entrega diretamente com o prestador escolhido."
              />
              <FeatureCard 
                icon={<Printer className="w-5 h-5" />}
                title="Materiais Diversos"
                code="MAT_CAT_V1"
                description="Do PLA biodegradável a resinas de alta tecnologia e polímeros industriais."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-900/50 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="technical-label">
            &copy; 2026 QueroImprimir3D // RASTRO_PLATAFORMA: Q3D-BR
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
            <Link href="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-primary transition-colors">Segurança do Hub</Link>
            <Link href="#" className="hover:text-primary transition-colors">Suporte</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, code }: { icon: React.ReactNode, title: string, description: string, code: string }) {
  return (
    <div className="pro-card p-10 space-y-6 bg-slate-950 border-none!">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 flex items-center justify-center text-primary/80 border border-primary/20">
          {icon}
        </div>
        <span className="font-mono text-[9px] text-slate-700 tracking-tighter">{code}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-slate-400 font-mono text-[12px] leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-1 h-3 bg-slate-900" />
        ))}
      </div>
    </div>
  );
}
