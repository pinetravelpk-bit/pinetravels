import { getBlogPostEntries, toSitemapXml } from "@/lib/sitemapEntries";

export const dynamic = "force-static";

export function GET() {
  const xml = toSitemapXml(getBlogPostEntries(), new Date().toISOString());
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
