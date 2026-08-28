import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { vessels } from "@/content/fleet";

export function FleetPreview() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="left" className="relative aspect-4/3 overflow-hidden rounded-lg">
          <Image src="/images/fleet-preview.svg" alt="Собственный флот Njord Group" fill className="object-cover" />
        </Reveal>
        <Reveal direction="right">
          <SectionHeading overline="Наш флот" title="Собственный флот — наша главная гарантия" />
          <p className="mt-4 text-ink-700">
            Мы не зависим от свободных мест на чужих судах: два собственных сухогруза закрывают
            регулярные рейсы на маршруте Азия — Европа — Россия.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {vessels.map((vessel) => (
              <div key={vessel.slug} className="rounded-lg border border-ink-100 p-5">
                <h3 className="text-h3">{vessel.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{vessel.summary}</p>
              </div>
            ))}
          </div>
          <Button href="/fleet" variant="secondary" className="mt-8">
            Весь флот
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
