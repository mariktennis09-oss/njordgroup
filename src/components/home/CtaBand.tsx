import { Phone } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/Button";
import { company } from "@/content/company";

export function CtaBand() {
  return (
    <Section tone="brand" className="py-14 lg:py-16">
      <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-h2 text-white">Готовы рассчитать маршрут?</h2>
          <p className="mt-2 text-njord-100">Ответим на заявку в течение рабочего дня.</p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/contacts" variant="primary-on-dark" size="lg">
            Оставить заявку
          </Button>
          <a href={company.phonePrimaryHref} className="flex items-center gap-2 text-lg font-semibold text-white">
            <Phone className="h-5 w-5" aria-hidden />
            {company.phonePrimary}
          </a>
        </div>
      </div>
    </Section>
  );
}
