import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { news } from "@/content/news";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости Njord Group: сервисы, инфраструктура, маршруты.",
  alternates: { canonical: "/news" },
  openGraph: { url: absoluteUrl("/news") },
};

export default function NewsIndexPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Новости" }]} />
        <h1 className="text-h1 mt-6">Новости</h1>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="flex flex-col rounded-lg border border-ink-100 p-6 transition-colors hover:border-njord-300"
            >
              <div className="flex items-center gap-3">
                <Badge tone="njord">{item.category}</Badge>
                <span className="text-xs text-ink-500">{formatDate(item.date)}</span>
              </div>
              <h2 className="text-h3 mt-4">{item.title}</h2>
              <p className="mt-2 text-sm text-ink-500">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
