// Login aur session — Node ke built-in crypto se.
// Koi extra package nahi, is liye shared hosting par bina masle ke chalta hai.

import crypto from "crypto";

const COOKIE = "pt_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 din

function secret() {
  return process.env.AUTH_SECRET || "pine-travel-dev-secret-change-me";
}

/* ── Password ──────────────────────────────────────────────── */

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  try {
    const [scheme, salt, hash] = String(stored).split(":");
    if (scheme !== "scrypt" || !salt || !hash) return false;
    const test = crypto.scryptSync(password, salt, 64);
    const known = Buffer.from(hash, "hex");
    if (test.length !== known.length) return false;
    return crypto.timingSafeEqual(test, known);
  } catch {
    return false;
  }
}

/* ── Session token (signed, not encrypted) ─────────────────── */

function sign(data) {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

export function createToken(payload) {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + MAX_AGE })
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readToken(token) {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const sessionCookie = {
  name: COOKIE,
  maxAge: MAX_AGE,
  options: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
  },
};

/* ── Server-side helper ────────────────────────────────────── */

export async function currentUser() {
  const { cookies } = await import("next/headers");
  const store = await cookies();
  return readToken(store.get(COOKIE)?.value);
}
