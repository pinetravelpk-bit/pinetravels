import { getServiceEntries, sitemapResponse } from "@/lib/sitemapEntries";

export const dynamic = "force-static";

export function GET() {
  return sitemapResponse(getServiceEntries());
}
