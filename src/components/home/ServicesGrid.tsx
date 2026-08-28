import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, type RevealDirection } from "@/components/shared/Reveal";
import { serviceNavItems } from "@/content/nav";

// Чередование по колонкам 3-колоночной сетки: 1-я — слева, 2-я — справа, 3-я — снизу.
const columnDirections: RevealDirection[] = ["left", "right", "up"];

export function ServicesGrid() {
  return (
    <Section>
      <SectionHeading
        overline="Услуги"
        title="Полный цикл логистики под одним договором"
        className="mb-12"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceNavItems.map((item, index) => (
          <Reveal key={item.slug} delay={(index % 3) * 80} direction={columnDirections[index % 3]}>
            <Link
              href={`/services/${item.slug}`}
              className="group flex h-full flex-col rounded-lg border border-ink-100 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-njord-300 hover:shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-njord-50 text-njord-600">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-h3 mt-5">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-500">{item.description}</p>
              <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-njord-600">
                Подробнее
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={80} direction={columnDirections[serviceNavItems.length % 3]}>
          <div className="flex h-full flex-col justify-between rounded-lg bg-njord-900 p-7 text-white">
            <div>
              <h3 className="text-h3">Не нашли нужное?</h3>
              <p className="mt-2 text-sm text-njord-100">
                Соберём индивидуальное решение под ваш груз и маршрут.
              </p>
            </div>
            <Link
              href="/contacts"
              className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-white hover:text-aqua-300"
            >
              Оставить заявку
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
