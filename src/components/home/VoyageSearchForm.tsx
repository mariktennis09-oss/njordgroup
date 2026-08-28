"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ChevronDown } from "lucide-react";
import { DateField } from "@/components/ui/DateField";
import { Combobox } from "@/components/ui/Combobox";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { voyageSearchSchema } from "@/lib/validation";
import { originPorts, destinationPorts, containerTypeOptions, ownerTypeOptions } from "@/content/ports";
import { cn } from "@/lib/utils";

type FormInput = z.input<typeof voyageSearchSchema>;
type FormOutput = z.output<typeof voyageSearchSchema>;

export function VoyageSearchForm() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(voyageSearchSchema),
    defaultValues: { containerType: "40HC" },
  });

  function onSubmit(values: FormOutput) {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DateField label="Дата отгрузки*" widgetSize="widget" error={errors.departureDate?.message} {...register("departureDate")} />
        <Controller
          control={control}
          name="originPort"
          render={({ field }) => (
            <Combobox label="Порт отправления*" options={originPorts} widgetSize="widget" error={errors.originPort?.message} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="destinationPort"
          render={({ field }) => (
            <Combobox label="Порт назначения*" options={destinationPorts} widgetSize="widget" error={errors.destinationPort?.message} onChange={field.onChange} />
          )}
        />
        <Select label="Тип контейнера*" widgetSize="widget" options={containerTypeOptions} error={errors.containerType?.message} {...register("containerType")} />
      </div>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-njord-600 hover:text-njord-700"
        aria-expanded={showMore}
      >
        Дополнительные параметры
        <ChevronDown className={cn("h-4 w-4 transition-transform", showMore && "rotate-180")} aria-hidden />
      </button>

      {showMore && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select label="Собственник" widgetSize="widget" options={ownerTypeOptions} placeholder="Не важно" {...register("ownerType")} />
          <Input label="Вес груза, кг" type="number" inputMode="numeric" widgetSize="widget" {...register("weightKg")} />
          <div className="flex items-end gap-2">
            <Input label="Код груза ТН ВЭД" widgetSize="widget" className="flex-1" {...register("hsCode")} />
            <div className="pb-3.5">
              <Tooltip text="Единая товарно-статистическая номенклатура грузов внешнеэкономической деятельности" />
            </div>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        Найти рейсы
      </Button>
    </form>
  );
}
