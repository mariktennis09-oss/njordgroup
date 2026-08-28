import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Skeleton } from "@/components/ui/Skeleton";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Поиск рейсов",
  description: "Поиск морских рейсов по направлению, дате отгрузки и типу контейнера.",
  alternates: { canonical: "/search" },
  openGraph: { url: absoluteUrl("/search") },
};

export default function SearchPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Поиск рейсов" }]} />
      <h1 className="text-h1 mt-6 mb-8">Поиск рейсов</h1>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <SearchFilters />
          <SearchResults />
        </div>
      </Suspense>
    </Section>
  );
}
