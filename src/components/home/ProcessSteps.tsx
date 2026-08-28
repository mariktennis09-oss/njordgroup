import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const steps = [
  { title: "Поиск рейса", description: "Указываете маршрут и параметры груза — подбираем рейс и ставку." },
  { title: "Бронирование", description: "Фиксируем место на судне и сроки в договоре." },
  { title: "Оформление документов", description: "Готовим коносамент, декларацию и сопроводительные документы." },
  { title: "Доставка и отслеживание", description: "Груз идёт по маршруту, статус виден в личном кабинете." },
];

export function ProcessSteps() {
  return (
    <Section tone="muted">
      <SectionHeading overline="Как мы работаем" title="От заявки до выдачи груза" className="mb-12" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 80}>
            <div className="relative flex flex-col gap-3">
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-6 top-6 hidden h-px w-full bg-ink-300 lg:block"
                />
              )}
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-njord-600 text-base font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-h3">{step.title}</h3>
              <p className="text-sm text-ink-700">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
