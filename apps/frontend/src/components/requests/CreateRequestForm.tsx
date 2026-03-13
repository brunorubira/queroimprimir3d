"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const requestSchema = zod.object({
  title: zod.string().min(5, "Título muito curto"),
  description: zod.string().min(20, "Descreva melhor sua necessidade"),
  files: zod.any().optional(),
});

export function CreateRequestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Criar Nova Solicitação</h1>
        <p className="text-muted-foreground mt-2">Dê detalhes sobre seu projeto para receber orçamentos</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 glass p-8 rounded-3xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">O que você precisa?</label>
          <input
            {...register("title")}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
            placeholder="Ex: Protótipo de engrenagem industrial"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição Detalhada</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all resize-none"
            placeholder="Descreva dimensões, material preferido, acabamento e para que serve a peça..."
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Arquivos (STL, STEP, Fotos)</label>
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all cursor-pointer bg-white/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-medium">Clique para fazer upload</p>
              <p className="text-xs text-muted-foreground mt-1">ou arraste e solte os arquivos aqui</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto px-8 py-6 rounded-xl text-lg ml-auto flex">
          Publicar Solicitação
        </Button>
      </form>
    </div>
  );
}
