"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const loginSchema = zod.object({
  email: zod.string().email("E-mail inválido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Credenciais inválidas");
      }

      const responseData = await res.json();
      localStorage.setItem("access_token", responseData.access_token);
      localStorage.setItem("user", JSON.stringify(responseData.user));

      if (responseData.user.role === "PROVIDER") {
        router.push("/dashboard/provider");
      } else {
        router.push("/dashboard/client");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] pro-flex-center px-4">
      <div className="w-full max-w-md p-8 pro-card bg-slate-900/50 space-y-8">

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">Bem-vindo de volta</h2>
        <p className="text-slate-400 mt-2 text-sm">Acesse sua conta QueroImprimir3D</p>
        {errorMsg && <p className="text-red-500 text-sm mt-4">{errorMsg}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">E-mail</label>
          <input
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            placeholder="exemplo@gmail.com"
          />
          {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">Senha</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message as string}</p>}
        </div>

        <Button type="submit" className="w-full h-11 text-sm font-bold" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar na Conta"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Não tem uma conta? <Link href="/auth/register" className="text-primary hover:underline font-semibold">Crie uma agora</Link>
      </p>
    </div>
    </div>
  );
}


