"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser } from "@/lib/auth";

export function ProtectedRoute({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode, 
  allowedRole?: string 
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
      router.push("/auth/login");
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      if (user.role === "PROVIDER") {
        router.push("/dashboard/provider");
      } else {
        router.push("/dashboard/client");
      }
      return;
    }

    setIsAuthorized(true);
  }, [router, allowedRole]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-sm tracking-widest uppercase">
        Verificando Autenticação...
      </div>
    );
  }

  return <>{children}</>;
}
