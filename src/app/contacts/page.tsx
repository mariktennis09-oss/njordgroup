import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactCard } from "@/components/shared/ContactCard";
import { LeadForm } from "@/components/shared/LeadForm";
import { LazyMap } from "@/components/shared/LazyMap";
import { offices } from "@/content/company";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Офисы Njord Group в Калининграде и Санкт-Петербурге. Телефоны, email, форма заявки.",
  alternates: { canonical: "/contacts" },
  openGraph: { url: absoluteUrl("/contacts") },
};

export default function ContactsPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
        <h1 className="text-h1 mt-6">Контакты</h1>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            {offices.map((office) => (
              <ContactCard key={office.city} office={office} />
            ))}
          </div>

          <div className="rounded-lg border border-ink-100 bg-white p-6 sm:p-8">
            <h2 className="text-h3">Оставить заявку</h2>
            <p className="mt-2 text-sm text-ink-500">Ответим в течение рабочего дня.</p>
            <LeadForm variant="inline" className="mt-6" />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="pt-0 lg:pt-0">
        <h2 className="text-h2 mb-8">На карте</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offices.map((office) => (
            <div key={office.city} className="aspect-4/3">
              <LazyMap label={office.city} query={`${office.city}, ${office.address}`} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
