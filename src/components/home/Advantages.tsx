import { Anchor, ShieldCheck, LaptopMinimal, Headset } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const items = [
  {
    icon: Anchor,
    title: "Гарантия мест",
    description: "Собственные суда и прямые контракты — вы не остаётесь на берегу в пик сезона.",
  },
  {
    icon: ShieldCheck,
    title: "Честная цена",
    description: "Фиксированные ставки без скрытых надбавок, расчёт по формуле, а не «по запросу».",
  },
  {
    icon: LaptopMinimal,
    title: "Цифровой сервис",
    description: "Поиск рейса, бронирование и документы в личном кабинете.",
  },
  {
    icon: Headset,
    title: "Поддержка 24/7",
    description: "Персональный менеджер и статус груза в любое время.",
  },
];

export function Advantages() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <SectionHeading overline="Почему Njord" title="Что стоит за обещаниями" tone="on-dark" className="mb-12" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div>
              <item.icon className="h-8 w-8 text-aqua-300" aria-hidden />
              <h3 className="text-h3 mt-4 text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-njord-100">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
