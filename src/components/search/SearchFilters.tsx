"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { DateField } from "@/components/ui/DateField";
import { Combobox } from "@/components/ui/Combobox";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { voyageSearchSchema } from "@/lib/validation";
import { originPorts, destinationPorts, containerTypeOptions } from "@/content/ports";

type FormInput = z.input<typeof voyageSearchSchema>;
type FormOutput = z.output<typeof voyageSearchSchema>;

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(voyageSearchSchema),
    defaultValues: {
      departureDate: searchParams.get("departureDate") ?? "",
      containerType: (searchParams.get("containerType") as FormInput["containerType"]) ?? "40HC",
    },
  });

  function onSubmit(values: FormOutput) {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-ink-100 bg-white p-5 lg:sticky lg:top-24"
    >
      <h2 className="text-h3">Параметры поиска</h2>
      <DateField label="Дата отгрузки*" error={errors.departureDate?.message} {...register("departureDate")} />
      <Controller
        control={control}
        name="originPort"
        render={({ field }) => (
          <Combobox
            label="Порт отправления*"
            options={originPorts}
            defaultValue={searchParams.get("originPort") ?? undefined}
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
            label="Порт назначения*"
            options={destinationPorts}
            defaultValue={searchParams.get("destinationPort") ?? undefined}
            error={errors.destinationPort?.message}
            onChange={field.onChange}
          />
        )}
      />
      <Select
        label="Тип контейнера*"
        options={containerTypeOptions}
        error={errors.containerType?.message}
        {...register("containerType")}
      />
      <Button type="submit" className="mt-2 w-full">
        Найти рейсы
      </Button>
    </form>
  );
}
