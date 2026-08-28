import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Advantages } from "@/components/home/Advantages";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { FleetPreview } from "@/components/home/FleetPreview";
import { RoutesMap } from "@/components/home/RoutesMap";
import { NewsTeaser } from "@/components/home/NewsTeaser";
import { CtaBand } from "@/components/home/CtaBand";
import { siteConfig } from "@/content/seo";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesGrid />
      <Advantages />
      <ProcessSteps />
      <FleetPreview />
      <RoutesMap />
      <NewsTeaser />
      <CtaBand />
    </>
  );
}
