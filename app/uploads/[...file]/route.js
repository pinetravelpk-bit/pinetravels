import fs from "node:fs/promises";
import path from "node:path";

// Admin-uploaded media (images/videos) is written to the uploads dir at
// runtime. `next start` only serves /public files that existed at BUILD time,
// so runtime uploads 404 unless we stream them ourselves. This also supports
// an external UPLOAD_DIR (e.g. Hostinger persistent storage outside the app).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function uploadDir() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
}

const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".avif": "image/avif", ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime",
};

export async function GET(_request, { params }) {
  const { file: segs = [] } = await params;
  // sanitize each segment — block traversal and path separators
  const clean = segs.map((s) => String(s).replace(/[^a-zA-Z0-9._-]/g, ""));
  const base = path.resolve(uploadDir());
  const target = path.resolve(base, ...clean);
  if (target !== base && !target.startsWith(base + path.sep)) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const data = await fs.readFile(target);
    const ext = path.extname(target).toLowerCase();
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
