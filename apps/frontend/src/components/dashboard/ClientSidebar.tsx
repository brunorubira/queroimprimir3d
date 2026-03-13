"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Box, LayoutDashboard, MessageSquare, PlusCircle, Settings, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
  { label: "Nova Solicitação", href: "/dashboard/client/requests/new", icon: PlusCircle },
  { label: "Meus Pedidos", href: "/dashboard/client/orders", icon: Box },
  { label: "Mensagens", href: "/dashboard/client/messages", icon: MessageSquare },
];

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground">
            Q
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight">QueroImprimir3D</span>
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
          href="/dashboard/client/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === "/dashboard/client/profile" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
          )}
        >
          <User className="w-4 h-4" />
          Perfil
        </Link>
        <Link
          href="/dashboard/client/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Link>
      </div>
    </div>
  );
}

