"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Box, LayoutDashboard, MessageSquare, PlusCircle, Settings, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
  { label: "Novas Solicitações", href: "/dashboard/client/requests/new", icon: PlusCircle },
  { label: "Meus Pedidos", href: "/dashboard/client/orders", icon: Box },
  { label: "Mensagens", href: "/dashboard/client/messages", icon: MessageSquare },
  { label: "Perfil", href: "/dashboard/client/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">Q</div>
          <span className="font-bold text-lg tracking-tight">QueroImprimir3D</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
              pathname === item.href 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-muted-foreground group-hover:text-white")} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <Link
          href="/dashboard/client/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </div>
    </div>
  );
}
