"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground">
            Q
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight">
            QueroImprimir<span className="text-primary italic">3D</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</Link>
          <Link href="#services" className="hover:text-white transition-colors">Serviços</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Preços</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-sm font-semibold">Entrar</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="text-sm font-semibold h-9">Criar Conta</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}


