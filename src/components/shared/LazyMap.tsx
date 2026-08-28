"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Карта Яндекса грузится только по клику: iframe тянет сторонний скрипт,
 * которому нечего делать в первом рендере страницы (см. требования к
 * производительности — Lighthouse ≥ 90 на мобильном).
 */
export function LazyMap({ query, label }: { query: string; label: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(query)}&z=16`}
        title={`Карта: ${label}`}
        loading="lazy"
        allowFullScreen
        className="h-full w-full rounded-lg border-0"
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-ink-100 bg-njord-50 p-8 text-center">
      <MapPin className="h-8 w-8 text-njord-600" aria-hidden />
      <div>
        <p className="font-semibold text-ink-900">{label}</p>
        <p className="mt-1 text-sm text-ink-500">{query}</p>
      </div>
      <Button variant="secondary" onClick={() => setIsLoaded(true)}>
        Показать карту
      </Button>
    </div>
  );
}
