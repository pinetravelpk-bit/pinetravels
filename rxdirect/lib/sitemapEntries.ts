import { services } from "@/data/services";
import { serviceGroups } from "@/data/serviceGroups";
import { cities } from "@/data/cities";
import { getAllPostsMeta, getAllTagsWithSlugsAndCount } from "@/lib/markdown";
import { slugifyTag } from "@/lib/slug";
import { business } from "@/data/business";
import type { BlogPostMeta } from "@/lib/types";
import { getPageContent } from "@/lib/pageContent";

// Sitemaps are rebuilt on every deploy (and the VPS auto-deploys every new
// commit), so a new post, city or service shows up automatically.
//
// lastmod is a real content date, never "now": Google ignores lastmod on
// sites where every URL claims to change on every build.
//   - blog posts: the post's `updated` (if set) or `date` front matter
//   - hubs and archives: the newest post that belongs to them, or
//   - SITE_UPDATED for pages built purely from site data/design.
// Bump SITE_UPDATED when the shared page content or layout changes.
export const SITE_UPDATED = "2026-10-02";

export interface SitemapImage {
  loc: string;
  title?: string;
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  images?: SitemapImage[];
}

const base = business.siteUrl;

function url(path: string): string {
  const full = `${base}${path}`;
  return full.length > base.length && full.endsWith("/") ? full.slice(0, -1) : full;
}

const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${base}${path}`);

// Front matter dates arrive as strings or Date objects; normalise to YYYY-MM-DD.
function day(value: unknown): string | null {
  if (!value) return null;
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

const maxDate = (...dates: (string | null | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort().at(-1) ?? SITE_UPDATED;

// The long-form copy in content/pages carries its own "updated" date.
const contentDate = (route: string) => getPageContent(route)?.updated ?? null;

let postsCache: BlogPostMeta[] | null = null;
const posts = () => (postsCache ??= getAllPostsMeta());
const postDate = (p: BlogPostMeta) => day((p as BlogPostMeta & { updated?: string }).updated) ?? day(p.date) ?? SITE_UPDATED;
const newest = (list: BlogPostMeta[]) => (list.length ? maxDate(...list.map(postDate)) : null);

export function getStaticPageEntries(): SitemapEntry[] {
  const latestPost = newest(posts());
  const page = (path: string, priority: number, changeFrequency: SitemapEntry["changeFrequency"] = "monthly", lastmod = SITE_UPDATED): SitemapEntry => ({
    url: url(path),
    lastmod: maxDate(lastmod, contentDate(path || "/")),
    changeFrequency,
    priority,
  });
  return [
    { ...page("", 1, "weekly", maxDate(SITE_UPDATED, latestPost)), images: [{ loc: abs("/images/home/hero.webp"), title: "RX Direct verified domestic staff" }] },
    page("/services", 0.9, "weekly"),
    page("/cities", 0.9, "weekly"),
    page("/blog", 0.8, "daily", maxDate(SITE_UPDATED, latestPost)),
    page("/about", 0.7),
    page("/how-it-works", 0.7),
    page("/pricing", 0.8),
    page("/faqs", 0.7),
    page("/contact", 0.8),
    page("/jobs", 0.8, "daily"),
    page("/staff/register", 0.7),
    page("/staff/status", 0.5),
    page("/team", 0.6),
    page("/registration", 0.7),
    page("/registration/labour", 0.5, "yearly"),
    page("/registration/pessi", 0.5, "yearly"),
    page("/registration/fbr", 0.5, "yearly"),
    page("/privacy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
    ...serviceGroups.map((g) => page(`/services/category/${g.slug}`, 0.7)),
  ];
}

export function getServiceEntries(): SitemapEntry[] {
  const forService = (slug: string) => posts().filter((p) => p.services?.includes(slug));
  const entries: SitemapEntry[] = [];
  for (const svc of services) {
    const svcPosts = forService(svc.slug);
    entries.push({
      url: url(`/services/${svc.slug}`),
      lastmod: maxDate(SITE_UPDATED, newest(svcPosts), contentDate(`/services/${svc.slug}`)),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [{ loc: abs(svc.image), title: `${svc.name.en} | RX Direct` }],
    });
    for (const c of cities) {
      const cityPosts = svcPosts.filter((p) => p.cities?.includes(c.slug));
      entries.push({ url: url(`/services/${svc.slug}/${c.slug}`), lastmod: maxDate(SITE_UPDATED, newest(cityPosts), contentDate(`/services/${svc.slug}/${c.slug}`)), changeFrequency: "monthly", priority: 0.7 });
      for (const s of c.societies) {
        const socPosts = cityPosts.filter((p) => p.society === s.slug);
        entries.push({ url: url(`/services/${svc.slug}/${c.slug}/${s.slug}`), lastmod: maxDate(SITE_UPDATED, newest(socPosts)), changeFrequency: "monthly", priority: 0.5 });
      }
    }
  }
  return entries;
}

export function getCityEntries(): SitemapEntry[] {
  return cities.flatMap((c) => {
    const cityPosts = posts().filter((p) => p.cities?.includes(c.slug));
    return [
      {
        url: url(`/cities/${c.slug}`),
        lastmod: maxDate(SITE_UPDATED, newest(cityPosts), contentDate(`/cities/${c.slug}`)),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: [{ loc: abs(c.image), title: `Domestic staff in ${c.name.en}` }],
      },
      ...c.societies.map((s) => ({
        url: url(`/cities/${c.slug}/${s.slug}`),
        lastmod: maxDate(SITE_UPDATED, newest(cityPosts.filter((p) => p.society === s.slug))),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  });
}

export function getBlogPostEntries(): SitemapEntry[] {
  return posts()
    .slice()
    .sort((a, b) => postDate(b).localeCompare(postDate(a)))
    .map((p) => {
      const images: SitemapImage[] = [{ loc: abs(p.featuredImage), title: p.title }];
      if (p.photo && p.photo !== p.featuredImage) images.push({ loc: abs(p.ogImage || p.photo), title: p.title });
      return {
        url: url(`/blog/${p.slug}`),
        lastmod: postDate(p),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        images,
      };
    });
}

/**
 * Archive/taxonomy pages (city, service, society and tag listings). Tags
 * used by only one post are left out: a one-post tag archive is thin,
 * near-duplicate content of that post. The page still exists and is linked.
 */
export function getBlogArchiveEntries(): SitemapEntry[] {
  const all = posts();
  const archive = (path: string, list: BlogPostMeta[], priority: number): SitemapEntry => ({
    url: url(path),
    lastmod: newest(list) ?? SITE_UPDATED,
    changeFrequency: "weekly",
    priority,
  });
  const citySlugs = Array.from(new Set(all.flatMap((p) => p.cities ?? [])));
  const serviceSlugs = Array.from(new Set(all.flatMap((p) => p.services ?? [])));
  const societySlugs = Array.from(new Set(all.map((p) => p.society).filter((s): s is string => Boolean(s))));
  return [
    ...citySlugs.map((s) => archive(`/blog/city/${s}`, all.filter((p) => p.cities?.includes(s)), 0.5)),
    ...serviceSlugs.map((s) => archive(`/blog/service/${s}`, all.filter((p) => p.services?.includes(s)), 0.5)),
    ...societySlugs.map((s) => archive(`/blog/society/${s}`, all.filter((p) => p.society === s), 0.4)),
    ...getAllTagsWithSlugsAndCount()
      .filter((t) => t.count >= 2)
      .map(({ slug }) => archive(`/blog/tag/${slug}`, all.filter((p) => p.tags.some((t) => slugifyTag(t) === slug)), 0.3)),
  ];
}

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function toSitemapXml(entries: SitemapEntry[]): string {
  const hasImages = entries.some((e) => e.images?.length);
  const urls = entries
    .map((e) => {
      const images = (e.images ?? [])
        .map((i) => `    <image:image>\n      <image:loc>${xmlEscape(i.loc)}</image:loc>${i.title ? `\n      <image:title>${xmlEscape(i.title)}</image:title>` : ""}\n    </image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${xmlEscape(e.url)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>${images ? `\n${images}` : ""}\n  </url>`;
    })
    .join("\n");
  const ns = `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ""}`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${ns}>\n${urls}\n</urlset>\n`;
}

// The newest lastmod in a child sitemap, for the sitemap index.
export const latestLastmod = (entries: SitemapEntry[]) => maxDate(...entries.map((e) => e.lastmod));

export const SITEMAPS: { file: string; entries: () => SitemapEntry[] }[] = [
  { file: "sitemap-pages.xml", entries: getStaticPageEntries },
  { file: "sitemap-services.xml", entries: getServiceEntries },
  { file: "sitemap-cities.xml", entries: getCityEntries },
  { file: "sitemap-blog.xml", entries: getBlogPostEntries },
  { file: "sitemap-blog-archives.xml", entries: getBlogArchiveEntries },
];

export function sitemapResponse(entries: SitemapEntry[]): Response {
  return new Response(toSitemapXml(entries), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
