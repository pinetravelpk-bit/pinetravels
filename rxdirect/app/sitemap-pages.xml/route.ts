import { getStaticPageEntries, toSitemapXml } from "@/lib/sitemapEntries";

export const dynamic = "force-static";

export function GET() {
  const xml = toSitemapXml(getStaticPageEntries(), new Date().toISOString());
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
