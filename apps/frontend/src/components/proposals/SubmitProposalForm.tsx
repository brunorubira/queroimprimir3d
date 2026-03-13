"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";

const proposalSchema = zod.object({
  price: zod.string().min(1, "O preço é obrigatório"),
  deliveryDays: zod.string().min(1, "O prazo é obrigatório"),
  description: zod.string().min(10, "Descreva sua proposta"),
});

export function SubmitProposalForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(proposalSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="glass p-8 rounded-3xl space-y-6">
      <h2 className="text-2xl font-bold">Enviar Proposta</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Preço (R$)</label>
            <input
              {...register("price")}
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
              placeholder="0.00"
            />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Prazo de Entrega (Dias)</label>
            <input
              {...register("deliveryDays")}
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
              placeholder="7"
            />
            {errors.deliveryDays && <p className="text-xs text-destructive">{errors.deliveryDays.message as string}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Detalhes da Proposta</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all resize-none"
            placeholder="Explique como será feito, material, acabamento..."
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message as string}</p>}
        </div>

        <Button type="submit" className="w-full py-6 rounded-xl text-lg font-bold">
          Enviar Orçamento
        </Button>
      </form>
    </div>
  );
}
