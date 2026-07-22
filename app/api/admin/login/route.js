import { NextResponse } from "next/server";
import { queryOne } from "../../../../lib/db";
import { verifyPassword, createToken, sessionCookie } from "../../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email aur password dono zaroori hain." }, { status: 400 });
  }

  const user = await queryOne(
    "SELECT id, email, name, password_hash FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  // Same message for both cases so accounts can't be enumerated.
  const bad = () =>
    NextResponse.json({ error: "Email ya password ghalat hai." }, { status: 401 });

  if (!user) return bad();
  if (!verifyPassword(password, user.password_hash)) return bad();

  const token = createToken({ id: user.id, email: user.email, name: user.name });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie.name, token, sessionCookie.options);
  return res;
}
