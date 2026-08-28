"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Loader2 } from "lucide-react";
import { Combobox } from "@/components/ui/Combobox";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Toast } from "@/components/ui/Toast";
import { quoteFormSchema } from "@/lib/validation";
import { formatPhoneInput } from "@/lib/format";
import { submitLead } from "@/lib/api/lead";
import { originPorts, destinationPorts, containerTypeOptions } from "@/content/ports";

type FormInput = z.input<typeof quoteFormSchema>;
type FormOutput = z.output<typeof quoteFormSchema>;

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      originPort: "",
      destinationPort: "",
      cargoType: "",
      phone: "+7",
      website: "",
    },
  });

  async function onSubmit(values: FormOutput) {
    const result = await submitLead({ formVariant: "quote", ...values });
    if (result.ok) {
      setStatus("success");
      reset({ originPort: "", destinationPort: "", cargoType: "", phone: "+7", website: "" });
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <Toast tone="success">Заявка отправлена, менеджер свяжется в течение 15 минут.</Toast>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {status === "error" && <Toast tone="error">Не удалось отправить заявку. Попробуйте ещё раз.</Toast>}

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="originPort"
          render={({ field }) => (
            <Combobox
              label="Откуда"
              options={originPorts}
              widgetSize="widget"
              error={errors.originPort?.message}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="destinationPort"
          render={({ field }) => (
            <Combobox
              label="Куда"
              options={destinationPorts}
              widgetSize="widget"
              error={errors.destinationPort?.message}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Тип груза"
          widgetSize="widget"
          options={containerTypeOptions}
          placeholder="Выберите тип"
          error={errors.cargoType?.message}
          {...register("cargoType")}
        />
        <Input
          label="Вес, кг"
          type="number"
          inputMode="numeric"
          widgetSize="widget"
          error={errors.weightKg?.message}
          {...register("weightKg")}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <Input
            label="Телефон*"
            inputMode="tel"
            widgetSize="widget"
            placeholder="+7 (___) ___-__-__"
            error={errors.phone?.message}
            value={field.value}
            onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
            onBlur={field.onBlur}
          />
        )}
      />

      <Checkbox
        error={errors.consent?.message}
        {...register("consent")}
        label={
          <>
            Согласен на обработку персональных данных согласно{" "}
            <a href="/legal/privacy" className="text-njord-600 underline underline-offset-2">
              политике конфиденциальности
            </a>
          </>
        }
      />

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Получить расчёт
      </Button>
    </form>
  );
}
