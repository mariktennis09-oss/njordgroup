import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { vessels } from "@/content/fleet";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Флот",
  description: "Собственный флот Njord Group: технические характеристики судов «Тикси» и «РЭО Константа».",
  alternates: { canonical: "/fleet" },
  openGraph: { url: absoluteUrl("/fleet") },
};

export default function FleetPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Флот" }]} />
        <h1 className="text-h1 mt-6">Флот</h1>
        <p className="text-lead mt-4 max-w-2xl text-ink-700">
          Собственные суда закрывают регулярные рейсы на маршруте Азия — Европа — Россия без
          зависимости от свободных мест на чужом тоннаже.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {vessels.map((vessel) => (
            <Link
              key={vessel.slug}
              href={`/fleet/${vessel.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white transition-colors hover:border-njord-300"
            >
              <div className="relative aspect-video">
                <Image src={vessel.image} alt={vessel.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-overline text-njord-600">{vessel.type}</span>
                <h2 className="text-h3 mt-2">{vessel.name}</h2>
                <p className="mt-2 text-sm text-ink-500">{vessel.summary}</p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-njord-600">
                  Технические характеристики
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
