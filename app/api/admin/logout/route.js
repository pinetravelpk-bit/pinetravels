import { NextResponse } from "next/server";
import { sessionCookie } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  const res = NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  res.cookies.set(sessionCookie.name, "", { ...sessionCookie.options, maxAge: 0 });
  return res;
}
