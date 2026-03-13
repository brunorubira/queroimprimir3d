"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, ShieldCheck, Users, Settings, LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "Visão Geral", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Usuários", href: "/dashboard/admin/users", icon: Users },
  { label: "Verificações", href: "/dashboard/admin/verifications", icon: ShieldCheck },
  { label: "Relatórios", href: "/dashboard/admin/reports", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground">
            A
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight">Painel Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-slate-900 text-primary border-r-2 border-primary" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link
          href="/auth/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Sair do Sistema
        </Link>
      </div>
    </div>
  );
}

