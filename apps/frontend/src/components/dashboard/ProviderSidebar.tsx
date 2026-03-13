"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Box, LayoutDashboard, MessageSquare, Printer, Settings, User, Zap, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
  { label: "Novas Oportunidades", href: "/dashboard/provider/leads", icon: Zap },
  { label: "Meus Pedidos", href: "/dashboard/provider/orders", icon: Box },
  { label: "Impressoras", href: "/dashboard/provider/printers", icon: Printer },
  { label: "Mensagens", href: "/dashboard/provider/messages", icon: MessageSquare },
];

export function ProviderSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground">
            H
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight">Hub QueroImprimir</span>
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

      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link
          href="/dashboard/provider/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === "/dashboard/provider/profile" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
          )}
        >
          <User className="w-4 h-4" />
          Perfil do Hub
        </Link>
        <Link
          href="/dashboard/provider/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-4"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}

