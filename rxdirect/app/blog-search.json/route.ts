import { getAllPostsMeta } from "@/lib/markdown";

export const dynamic = "force-static";

// Every published post's card data, fetched by the blog search box the first
// time someone types, so the paginated blog pages stay small.
export function GET() {
  return Response.json(getAllPostsMeta());
}
