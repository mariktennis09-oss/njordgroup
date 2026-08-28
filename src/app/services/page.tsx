import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { serviceNavItems } from "@/content/nav";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Мультимодальные перевозки, таможенное оформление, авиаперевозка, поиск поставщиков, промышленные грузы, перевозки по России и складские услуги.",
  alternates: { canonical: "/services" },
  openGraph: { url: absoluteUrl("/services") },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} />
        <h1 className="text-h1 mt-6">Услуги</h1>
        <p className="text-lead mt-4 max-w-2xl text-ink-700">
          Полный цикл логистики под одним договором: от букирования рейса до таможенного
          оформления и доставки до склада получателя.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceNavItems.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group flex h-full flex-col rounded-lg border border-ink-100 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-njord-300 hover:shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-njord-50 text-njord-600">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="text-h3 mt-5">{item.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-500">{item.description}</p>
              <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-njord-600">
                Подробнее
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
