import type { Metadata } from "next";
import Image from "next/image";
import { Anchor, LaptopMinimal, Waypoints } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { generalFaq } from "@/content/faq";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Njord Group — логистический партнёр на маршруте Азия — Европа — Россия: собственный флот, цифровая платформа, прямые контракты с FESCO.",
  alternates: { canonical: "/about" },
  openGraph: { url: absoluteUrl("/about") },
};

const pillars = [
  {
    icon: Anchor,
    title: "Собственный флот",
    description: "Два сухогруза закрывают регулярные рейсы без зависимости от свободных мест на чужом тоннаже.",
  },
  {
    icon: LaptopMinimal,
    title: "Цифровая платформа",
    description: "Поиск рейса, бронирование, документы и статус груза — в одном личном кабинете.",
  },
  {
    icon: Waypoints,
    title: "Мультимодальность",
    description: "Море, ж/д, авто и авиа собираются в один маршрут под один договор и одного менеджера.",
  },
];

const timeline = [
  { year: "Флот", text: "Собственные суда «Тикси» и «РЭО Константа» обеспечивают регулярные рейсы на ключевых направлениях." },
  { year: "Партнёрство", text: "Прямые контракты с FESCO закрывают дополнительный тоннаж в пик сезона." },
  { year: "Цифровизация", text: "Запущен личный кабинет: поиск рейсов, бронирование, документы, отслеживание груза." },
];

export default function AboutPage() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <Image src="/images/about-hero.svg" alt="" fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,24,42,.8) 0%, rgba(4,24,42,.55) 50%, rgba(4,24,42,.88) 100%)",
          }}
        />
        <Container className="relative flex min-h-[360px] flex-col justify-center gap-6 py-16">
          <Breadcrumbs tone="dark" items={[{ label: "Главная", href: "/" }, { label: "О компании" }]} />
          <div className="max-w-2xl">
            <p className="text-overline mb-4 text-aqua-300">О КОМПАНИИ</p>
            <h1 className="text-h1 text-white">Интеллектуальный логистический партнёр</h1>
            <p className="text-lead mt-4 text-njord-100">
              Njord Group соединяет Азию, Европу и Россию собственным флотом, прямыми контрактами
              и цифровой платформой — без посредников между вами и грузом.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-njord-50 text-njord-600">
                <pillar.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="text-h3 mt-4">{pillar.title}</h2>
              <p className="mt-2 text-sm text-ink-700">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="text-h2 mb-10">Как мы к этому пришли</h2>
        <div className="flex flex-col gap-6">
          {timeline.map((item) => (
            <div key={item.year} className="grid grid-cols-1 gap-2 border-b border-ink-100 pb-6 sm:grid-cols-[160px_1fr]">
              <span className="text-h3 text-njord-600">{item.year}</span>
              <p className="text-ink-700">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-lg border border-ink-100 bg-white p-8 sm:p-10">
          <h2 className="text-h3">Партнёрство с FESCO</h2>
          <p className="mt-3 max-w-2xl text-ink-700">
            Прямые контракты с FESCO дают доступ к дополнительному тоннажу и портовой
            инфраструктуре в пик сезона, когда собственного флота недостаточно для всех заявок.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <FaqAccordion items={generalFaq} name="faq-about" />
      </Section>

      <Section tone="brand" className="py-14 lg:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-h2 text-white">Обсудим вашу логистику?</h2>
          <Button href="/contacts" variant="primary-on-dark" size="lg">
            Связаться с нами
          </Button>
        </div>
      </Section>
    </>
  );
}
