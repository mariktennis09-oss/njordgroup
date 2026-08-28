import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SearchWidget } from "@/components/home/SearchWidget";
import { Button } from "@/components/ui/Button";
import { microFacts } from "@/content/company";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px]">
        <Image
          src="/images/hero-vessel.svg"
          alt="Сухогруз Njord Group в море"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,24,42,.75) 0%, rgba(4,24,42,.55) 40%, rgba(4,24,42,.85) 100%)",
          }}
        />

        <Container className="relative flex min-h-[560px] flex-col justify-center py-20 lg:min-h-[640px]">
          <div className="max-w-2xl">
            <p className="text-overline mb-4 text-aqua-300">NJORD GROUP</p>
            <h1 className="text-display text-white">
              Морская логистика с гарантией места на борту
            </h1>
            <p className="text-lead mt-6 text-njord-100">
              Собственный флот, прямые контакты и цифровая платформа. Считаем маршрут
              Азия — Европа — Россия за минуту, а не за дни.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#search-widget" size="lg">
                Найти рейс
              </Button>
              <Button href="/services" size="lg" variant="secondary-on-dark">
                Услуги
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-njord-100">
              {microFacts.map((fact, index) => (
                <span key={fact} className="flex items-center gap-4">
                  {index > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-njord-300" />}
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-20">
        <Container>
          <SearchWidget />
        </Container>
      </div>
    </section>
  );
}
