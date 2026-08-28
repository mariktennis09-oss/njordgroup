import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Tag } from "@/components/shared/Tag";
import { routes } from "@/content/routes";

export function RoutesMap() {
  return (
    <Section tone="muted">
      <SectionHeading overline="География" title="Направления" className="mb-12" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal direction="left">
          <svg viewBox="0 0 480 300" className="w-full text-njord-300" role="img" aria-label="Схема маршрутов Азия — Европа — Россия">
            <rect x="0" y="0" width="480" height="300" rx="16" fill="var(--color-njord-50)" />
            <path d="M60 220 Q160 60 260 140 T420 80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="60" cy="220" r="7" fill="var(--color-njord-600)" />
            <circle cx="260" cy="140" r="7" fill="var(--color-aqua-600)" />
            <circle cx="420" cy="80" r="7" fill="var(--color-njord-600)" />
            <text x="40" y="248" fontSize="13" fill="var(--color-ink-700)">Азия</text>
            <text x="235" y="168" fontSize="13" fill="var(--color-ink-700)">Россия</text>
            <text x="390" y="60" fontSize="13" fill="var(--color-ink-700)">Европа</text>
          </svg>
        </Reveal>

        <Reveal direction="right">
          <ul className="flex flex-col gap-4">
            {routes.map((route) => (
              <li
                key={`${route.from}-${route.to}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink-100 bg-white p-5"
              >
                <span className="flex items-center gap-2 font-semibold text-ink-900">
                  {route.from}
                  <ArrowRight className="h-4 w-4 text-njord-600" aria-hidden />
                  {route.to}
                </span>
                <div className="flex items-center gap-2">
                  <Tag>{route.transport}</Tag>
                  <span className="text-sm text-ink-500">{route.transitTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
