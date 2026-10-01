import { services } from "@/data/services";
import { serviceGroups } from "@/data/serviceGroups";
import { cities } from "@/data/cities";
import {
  getPostSlugs,
  getAllCitySlugsWithPosts,
  getAllServiceSlugsWithPosts,
  getAllSocietySlugsWithPosts,
  getAllTagsWithSlugsAndCount,
} from "@/lib/markdown";
import { business } from "@/data/business";

export interface SitemapEntry {
  url: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const base = business.siteUrl;

function url(path: string): string {
  const full = `${base}${path}`;
  return full.length > base.length && full.endsWith("/") ? full.slice(0, -1) : full;
}

export function getStaticPageEntries(): SitemapEntry[] {
  return [
    { url: url(""), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/registration"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/registration/labour"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/registration/pessi"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/registration/fbr"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/services"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/cities"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/how-it-works"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/faqs"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/contact"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/pricing"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/jobs"), changeFrequency: "weekly", priority: 0.8 },
    ...serviceGroups.map((g) => ({
      url: url(`/services/category/${g.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

export function getServiceEntries(): SitemapEntry[] {
  const serviceRoutes = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceCityRoutes = services.flatMap((svc) =>
    cities.map((c) => ({
      url: url(`/services/${svc.slug}/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  );

  const serviceCitySocietyRoutes = services.flatMap((svc) =>
    cities.flatMap((c) =>
      c.societies.map((s) => ({
        url: url(`/services/${svc.slug}/${c.slug}/${s.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.55,
      }))
    )
  );

  return [...serviceRoutes, ...serviceCityRoutes, ...serviceCitySocietyRoutes];
}

export function getCityEntries(): SitemapEntry[] {
  const cityRoutes = cities.map((c) => ({
    url: url(`/cities/${c.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const societyRoutes = cities.flatMap((c) =>
    c.societies.map((s) => ({
      url: url(`/cities/${c.slug}/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...cityRoutes, ...societyRoutes];
}

export function getBlogPostEntries(): SitemapEntry[] {
  return getPostSlugs().map((slug) => ({
    url: url(`/blog/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
}

/**
 * Archive/taxonomy pages (city, service, society and tag listings). Tags
 * used by only one post are excluded, a one-post tag archive is thin,
 * near-duplicate content of that single post and isn't worth asserting
 * for indexing, the page still exists and is linked, it's just left out
 * of the sitemap so it doesn't compete for crawl/index priority.
 */
export function getBlogArchiveEntries(): SitemapEntry[] {
  const cityArchives = getAllCitySlugsWithPosts().map((slug) => ({
    url: url(`/blog/city/${slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const serviceArchives = getAllServiceSlugsWithPosts().map((slug) => ({
    url: url(`/blog/service/${slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const societyArchives = getAllSocietySlugsWithPosts().map((slug) => ({
    url: url(`/blog/society/${slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const tagArchives = getAllTagsWithSlugsAndCount()
    .filter((t) => t.count >= 2)
    .map(({ slug }) => ({
      url: url(`/blog/tag/${slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    }));

  return [...cityArchives, ...serviceArchives, ...societyArchives, ...tagArchives];
}

export function toSitemapXml(entries: SitemapEntry[], lastModified: string): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
