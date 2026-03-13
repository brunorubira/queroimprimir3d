"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const onSubmit = (data: any) => {
    console.log(data);
    router.push(data.role === "PROVIDER" ? "/dashboard/provider" : "/dashboard/client");
  };

  return (
    <div className="min-h-[80vh] pro-flex-center px-4 py-12">
      <div className="w-full max-w-md p-8 pro-card bg-slate-900/50 space-y-8">

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">Criar sua conta</h2>
        <p className="text-slate-400 mt-2 text-sm">Junte-se à maior rede de impressão 3D</p>
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

        <Button type="submit" className="w-full h-11 text-sm font-bold pt-1">
          Criar Cadastro
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Já possui conta? <Link href="/auth/login" className="text-primary hover:underline font-semibold">Acessar agora</Link>
      </p>
    </div>
    </div>
  );
}


