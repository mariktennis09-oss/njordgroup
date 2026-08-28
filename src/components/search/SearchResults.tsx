"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Ship, CalendarRange, PackageSearch } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { searchVoyages } from "@/lib/api/voyages";
import type { Voyage } from "@/lib/mock/voyages";
import type { VoyageSearchValues } from "@/lib/validation";
import { formatDate, formatNumber } from "@/lib/format";
import { company } from "@/content/company";

export function SearchResults() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [voyages, setVoyages] = useState<Voyage[]>([]);
  const [isDemoData, setIsDemoData] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    const containerType = searchParams.get("containerType") ?? "40HC";

    searchVoyages({
      departureDate: searchParams.get("departureDate") ?? "",
      originPort: searchParams.get("originPort") ?? "",
      destinationPort: searchParams.get("destinationPort") ?? "",
      containerType: containerType as VoyageSearchValues["containerType"],
    })
      .then((result) => {
        if (cancelled) return;
        setVoyages(result.voyages);
        setIsDemoData(result.isDemoData);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <Toast tone="error">Не удалось загрузить рейсы. Попробуйте изменить параметры поиска.</Toast>;
  }

  if (voyages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-ink-100 bg-white px-6 py-16 text-center">
        <PackageSearch className="h-10 w-10 text-ink-300" aria-hidden />
        <p className="text-ink-700">По заданным параметрам рейсов не найдено.</p>
        <p className="text-sm text-ink-500">Измените параметры поиска или оставьте заявку — подберём рейс вручную.</p>
        <Button href="/contacts">Оставить заявку</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isDemoData && (
        <Toast tone="info">
          Показаны демонстрационные данные — подключение к реальному расписанию рейсов в разработке.
          Чтобы получить актуальную ставку, оставьте заявку.
        </Toast>
      )}

      {voyages.map((voyage) => (
        <div
          key={voyage.id}
          className="flex flex-col gap-4 rounded-lg border border-ink-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <Ship className="h-4 w-4 text-njord-600" aria-hidden />
              {voyage.vesselName}
              <Badge tone="neutral">{voyage.containerType}</Badge>
            </div>
            <div className="text-lg font-semibold text-ink-900">
              {voyage.originPort} → {voyage.destinationPort}
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <CalendarRange className="h-4 w-4" aria-hidden />
              Отход {formatDate(voyage.departureDate)} · приход {formatDate(voyage.arrivalDate)} · транзит{" "}
              {voyage.transitDays} сут.
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="text-xl font-bold text-njord-900">от ${formatNumber(voyage.rateUsd)}</span>
            <Button href={company.portalUrl} target="_blank">
              Забронировать
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
