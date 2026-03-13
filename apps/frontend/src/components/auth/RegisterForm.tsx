"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { setAuth } from "@/lib/auth";

const registerSchema = zod.object({
  name: zod.string().min(2, "Nome muito curto"),
  email: zod.string().email("E-mail inválido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: zod.enum(["CLIENT", "PROVIDER"]),
});

export function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CLIENT" }
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure role is handled by backend if the endpoint supports it (here we keep the demo simple)
        body: JSON.stringify({ email: data.email, password: data.password, name: data.name, role: data.role }),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar cadastro");
      }

      // Automatically login after registration
      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (loginRes.ok) {
        const responseData = await loginRes.json();
        setAuth(responseData.access_token, responseData.user);
        router.push(data.role === "PROVIDER" ? "/dashboard/provider" : "/dashboard/client");
      } else {
         router.push("/auth/login");
      }

    } catch (err: any) {
       setErrorMsg(err.message || "Erro desconhecido");
    } finally {
       setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] pro-flex-center px-4 py-12">
      <div className="w-full max-w-md p-8 pro-card bg-slate-900/50 space-y-8 relative">

      <Link href="/" className="absolute left-6 top-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-semibold sr-only">Voltar</span>
      </Link>

      <div className="text-center pt-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Criar sua conta</h2>
        <p className="text-slate-400 mt-2 text-sm">Junte-se à maior rede de impressão 3D</p>
        {errorMsg && <p className="text-red-500 text-sm mt-4">{errorMsg}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">Nome Completo</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            placeholder="Nome Sobrenome"
          />
          {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">E-mail</label>
          <input
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            placeholder="seu@email.com"
          />
          {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">Senha</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message as string}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200 ml-1">Tipo de Perfil</label>
          <select 
            {...register("role")}
            className="w-full px-4 py-2.5 rounded-md bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="CLIENT" className="bg-slate-900">Quero contratar serviços</option>
            <option value="PROVIDER" className="bg-slate-900">Quero oferecer serviços (Hub)</option>
          </select>
        </div>

        <Button type="submit" className="w-full h-11 text-sm font-bold pt-1" disabled={isLoading}>
          {isLoading ? "Criando Conta..." : "Criar Cadastro"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Já possui conta? <Link href="/auth/login" className="text-primary hover:underline font-semibold">Acessar agora</Link>
      </p>
    </div>
    </div>
  );
}


