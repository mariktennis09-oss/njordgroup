import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/shared/LeadForm";
import { services, getServiceBySlug } from "@/content/services";
import { company } from "@/content/company";
import { siteConfig, absoluteUrl } from "@/content/seo";

type ServicePageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} — Njord Group`;
  const description = service.intro[0].slice(0, 160);

  return {
    title: service.title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description, url: absoluteUrl(`/services/${service.slug}`) },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro[0],
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: "RU",
    url: absoluteUrl(`/services/${service.slug}`),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Услуги", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 2, name: service.title, item: absoluteUrl(`/services/${service.slug}`) },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="relative isolate overflow-hidden">
        <Image src={service.heroImage} alt="" fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,24,42,.8) 0%, rgba(4,24,42,.6) 50%, rgba(4,24,42,.88) 100%)",
          }}
        />
        <Container className="relative flex min-h-[360px] flex-col justify-center gap-6 py-16">
          <Breadcrumbs
            tone="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services" },
              { label: service.navTitle },
            ]}
          />
          <div className="max-w-2xl">
            <h1 className="text-h1 text-white">{service.title}</h1>
            <p className="text-lead mt-4 text-njord-100">{service.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contacts" size="lg">
              Оставить заявку
            </Button>
            <Button href={company.phonePrimaryHref} size="lg" variant="secondary-on-dark">
              Позвонить
            </Button>
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title="Что это" />
            <div className="mt-4 flex flex-col gap-4 text-ink-700">
              {service.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="h-fit rounded-lg border border-ink-100 bg-njord-50 p-6">
            <h3 className="text-h3">Ключевые параметры</h3>
            <dl className="mt-4 flex flex-col gap-4">
              {service.keyParams.map((param) => (
                <div key={param.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">{param.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink-900">{param.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Кому подходит" className="mb-10" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {service.audiences.map((audience) => (
            <div key={audience.title} className="rounded-lg border border-ink-100 bg-white p-6">
              <h3 className="text-h3">{audience.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{audience.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Что входит в услугу" className="mb-10" />
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {service.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-aqua-600" aria-hidden />
              <span className="text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Как проходит работа" className="mb-10" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((step, index) => (
            <div key={step.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-njord-600 text-base font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-h3 mt-4">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <FaqAccordion items={service.faq} name={`faq-${service.slug}`} />
      </Section>

      {relatedServices.length > 0 && (
        <Section tone="muted">
          <SectionHeading title="Смежные услуги" className="mb-10" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <Reveal key={related.slug} direction="up">
                <Link
                  href={`/services/${related.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-ink-100 bg-white p-6 transition-colors hover:border-njord-300"
                >
                  <h3 className="text-h3">{related.navTitle}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-500">{related.tagline}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-njord-600">
                    Подробнее
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone="dark">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h2 text-white">Обсудим ваш груз?</h2>
            <p className="mt-4 text-njord-100">
              Оставьте заявку — рассчитаем маршрут и стоимость по услуге «{service.navTitle.toLowerCase()}» в течение
              рабочего дня.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 sm:p-8">
            <LeadForm variant="sidebar" />
          </div>
        </div>
      </Section>
    </>
  );
}
