import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { vessels } from "@/content/fleet";
import { news } from "@/content/news";
import { siteConfig } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/fleet",
    "/about",
    "/contacts",
    "/search",
    "/news",
    "/legal/privacy",
    "/legal/terms",
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  services.forEach((service) => {
    entries.push({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  vessels.forEach((vessel) => {
    entries.push({
      url: `${siteConfig.url}/fleet/${vessel.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  news.forEach((item) => {
    entries.push({
      url: `${siteConfig.url}/news/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  });

  return entries;
}
