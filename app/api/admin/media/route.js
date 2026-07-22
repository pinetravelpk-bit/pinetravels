import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { currentUser } from "../../../../lib/auth";
import { recordMedia, listMedia } from "../../../../lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE = 8 * 1024 * 1024;   // 8 MB
const MAX_VIDEO = 60 * 1024 * 1024;  // 60 MB

function uploadDir() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
}

function safeName(original) {
  const ext = path.extname(original).toLowerCase().slice(0, 10);
  const base = path
    .basename(original, path.extname(original))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "file";
  return `${base}-${Date.now().toString(36)}${ext}`;
}

export async function GET(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const kind = request.nextUrl.searchParams.get("kind") || undefined;
  return NextResponse.json({ items: await listMedia(kind) });
}

export async function POST(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Upload padha nahi ja saka." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Koi file select nahi hui." }, { status: 400 });
  }

  const isImage = IMAGE_TYPES.includes(file.type);
  const isVideo = VIDEO_TYPES.includes(file.type);
  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "Sirf JPG, PNG, WEBP, GIF, SVG images ya MP4/WEBM videos allowed hain." },
      { status: 400 }
    );
  }

  const limit = isVideo ? MAX_VIDEO : MAX_IMAGE;
  if (file.size > limit) {
    return NextResponse.json(
      { error: `File bohat bari hai. Limit: ${Math.round(limit / 1024 / 1024)} MB.` },
      { status: 400 }
    );
  }

  const dir = uploadDir();
  const filename = safeName(file.name || (isVideo ? "video.mp4" : "image.jpg"));

  try {
    await fs.mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(dir, filename), buffer);
  } catch (err) {
    return NextResponse.json(
      { error: "File save nahi hui: " + (err.code || err.message) },
      { status: 500 }
    );
  }

  const url = `/uploads/${filename}`;
  const kind = isVideo ? "video" : "image";
  try {
    await recordMedia({ filename, url, mime: file.type, size: file.size, kind });
  } catch {
    // File save ho gayi hai; sirf database record nahi bana.
  }

  return NextResponse.json({ ok: true, url, filename, kind, size: file.size });
}
