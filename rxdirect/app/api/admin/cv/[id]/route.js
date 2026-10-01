import { readCv } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const cv = await readCv(params.id).catch(() => null);
  if (!cv) return new Response("Not found", { status: 404 });
  return new Response(cv.data, {
    headers: {
      "Content-Type": cv.type,
      "Content-Disposition": `attachment; filename="${cv.filename.replace(/[^\w.\- ]/g, "_")}"`,
    },
  });
}
