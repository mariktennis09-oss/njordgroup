import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { vessels } from "@/content/fleet";
import { absoluteUrl } from "@/content/seo";

type VesselPageParams = { params: Promise<{ slug: string }> };

function getVessel(slug: string) {
  return vessels.find((vessel) => vessel.slug === slug);
}

export function generateStaticParams() {
  return vessels.map((vessel) => ({ slug: vessel.slug }));
}

export async function generateMetadata({ params }: VesselPageParams): Promise<Metadata> {
  const { slug } = await params;
  const vessel = getVessel(slug);
  if (!vessel) return {};

  return {
    title: vessel.name,
    description: vessel.description.slice(0, 160),
    alternates: { canonical: `/fleet/${vessel.slug}` },
    openGraph: { url: absoluteUrl(`/fleet/${vessel.slug}`) },
  };
}

export default async function VesselDetailPage({ params }: VesselPageParams) {
  const { slug } = await params;
  const vessel = getVessel(slug);
  if (!vessel) notFound();

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Флот", href: "/fleet" }, { label: vessel.name }]}
        />
      </Container>

      <Section className="pt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image src={vessel.image} alt={vessel.name} fill className="object-cover" priority />
          </div>
          <div>
            <span className="text-overline text-njord-600">{vessel.type}</span>
            <h1 className="text-h1 mt-2">{vessel.name}</h1>
            <p className="mt-4 text-ink-700">{vessel.description}</p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {vessel.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg border border-ink-100 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">{spec.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink-900">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <Button href="/contacts" size="lg" className="mt-8 w-full whitespace-normal sm:w-auto">
              Рассчитать перевозку на этом судне
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
