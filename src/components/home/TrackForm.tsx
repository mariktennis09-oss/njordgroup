"use client";

import { useState } from "react";
import { trackingFormSchema } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { company } from "@/content/company";

export function TrackForm() {
  const [error, setError] = useState<string>();
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = trackingFormSchema.safeParse({ trackingNumber: value });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    window.open(company.portalUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Номер контейнера, B/L или заявки"
        widgetSize="widget"
        placeholder="Например, MSCU1234567"
        hint="Отслеживание груза доступно в личном кабинете"
        error={error}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" size="lg" className="w-full">
        Отследить
      </Button>
    </form>
  );
}
