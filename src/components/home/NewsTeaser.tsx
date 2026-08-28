import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { news } from "@/content/news";
import { formatDate } from "@/lib/format";

export function NewsTeaser() {
  if (news.length === 0) return null;

  return (
    <Section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading overline="Новости" title="Что нового" />
        <Link href="/news" className="text-sm font-semibold text-njord-600 hover:text-njord-700">
          Все новости →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {news.slice(0, 3).map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="flex flex-col rounded-lg border border-ink-100 p-6 transition-colors duration-150 hover:border-njord-300"
          >
            <div className="flex items-center gap-3">
              <Badge tone="njord">{item.category}</Badge>
              <span className="text-xs text-ink-500">{formatDate(item.date)}</span>
            </div>
            <h3 className="text-h3 mt-4">{item.title}</h3>
            <p className="mt-2 text-sm text-ink-500">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
