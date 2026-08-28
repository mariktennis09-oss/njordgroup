import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { news, getNewsBySlug } from "@/content/news";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/content/seo";

type NewsPageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsPageParams): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: { url: absoluteUrl(`/news/${item.slug}`) },
  };
}

export default async function NewsDetailPage({ params }: NewsPageParams) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Новости", href: "/news" }, { label: item.title }]}
      />
      <article className="mx-auto mt-8 max-w-2xl">
        <div className="flex items-center gap-3">
          <Badge tone="njord">{item.category}</Badge>
          <span className="text-sm text-ink-500">{formatDate(item.date)}</span>
        </div>
        <h1 className="text-h1 mt-4">{item.title}</h1>
        <div className="mt-6 flex flex-col gap-4 text-ink-700">
          {item.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Container>
  );
}
