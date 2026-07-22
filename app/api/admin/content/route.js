import { NextResponse } from "next/server";
import { currentUser } from "../../../../lib/auth";
import { setContent, getContent, CONTENT_KEYS } from "../../../../lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const key = request.nextUrl.searchParams.get("key");
  if (!CONTENT_KEYS.includes(key)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }
  return NextResponse.json({ key, data: await getContent(key) });
}

export async function PUT(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { key, data } = body || {};
  if (!CONTENT_KEYS.includes(key)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }
  if (data === undefined) {
    return NextResponse.json({ error: "No data supplied" }, { status: 400 });
  }

  try {
    await setContent(key, data);
    return NextResponse.json({ ok: true, key });
  } catch (err) {
    return NextResponse.json(
      { error: "Save nahi hua: " + (err.code || err.message) },
      { status: 500 }
    );
  }
}
