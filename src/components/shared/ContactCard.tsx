import { Building2, Phone, MessageCircle, MapPin } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/ui/Badge";
import type { OfficeInfo } from "@/content/company";

export function ContactCard({ office }: { office: OfficeInfo }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-njord-50 text-njord-600">
            <Building2 className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="text-h3">{office.city}</h3>
        </div>
        {office.isHeadquarters && <Badge tone="njord">Головной офис</Badge>}
      </div>
      <p className="text-sm text-ink-700">{office.address}</p>
      <div className="flex flex-col gap-2 text-sm">
        <a href={office.phoneHref} className="flex items-center gap-2 text-ink-900 hover:text-njord-600">
          <Phone className="h-4 w-4 text-njord-600" aria-hidden />
          {office.phone}
        </a>
        {office.extra && (
          <a
            href={office.extra.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-900 hover:text-njord-600"
          >
            <MessageCircle className="h-4 w-4 text-njord-600" aria-hidden />
            {office.extra.label}: {office.extra.value}
          </a>
        )}
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent(`${office.city}, ${office.address}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-ink-900 hover:text-njord-600"
        >
          <MapPin className="h-4 w-4 text-njord-600" aria-hidden />
          Открыть на карте
        </a>
      </div>
    </Card>
  );
}
