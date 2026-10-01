import { business } from "@/data/business";

export const dynamic = "force-static";

export function GET() {
  const base = business.siteUrl;
  const now = new Date().toISOString();

  const sitemaps = [
    "sitemap-pages.xml",
    "sitemap-services.xml",
    "sitemap-cities.xml",
    "sitemap-blog.xml",
    "sitemap-blog-archives.xml",
  ];

  const entries = sitemaps
    .map((s) => `  <sitemap>\n    <loc>${base}/${s}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
