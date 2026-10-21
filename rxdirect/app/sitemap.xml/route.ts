import { business } from "@/data/business";
import { SITEMAPS, latestLastmod } from "@/lib/sitemapEntries";

export const dynamic = "force-static";

// Sitemap index: one entry per child sitemap, dated by its newest page.
export function GET() {
  const base = business.siteUrl;
  const entries = SITEMAPS.map(
    ({ file, entries }) => `  <sitemap>\n    <loc>${base}/${file}</loc>\n    <lastmod>${latestLastmod(entries())}</lastmod>\n  </sitemap>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
