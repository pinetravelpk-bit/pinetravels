// Content layer.
// Pehle database dekhta hai; wahan kuch na mile (ya DB set na ho) to
// lib/data.js aur lib/hotels.js ki files se content de deta hai.
// Is liye site bina database ke bhi bilkul theek chalti hai.

import { query, queryOne, parseJSON, dbConfigured } from "./db";
import * as fileData from "./data";
import { hotels as fileHotels } from "./hotels";

export const CONTENT_KEYS = [
  "site", "hero", "quickSearch", "services", "offers", "destinationRegions",
  "whyUs", "quote", "customize", "partners", "testimonials", "ratingBadge",
  "faqs", "counters", "footerLinks", "steps",
  "tourTypes", "travellerOptions", "guestOptions", "vehicles", "pickupCities", "durations",
];

const noStore = { cache: "no-store" };

/** Ek content key laao (site, hero, offers, …). */
export async function getContent(key) {
  if (dbConfigured()) {
    const row = await queryOne("SELECT data FROM content WHERE content_key = ? LIMIT 1", [key]);
    if (row) {
      const parsed = parseJSON(row.data, null);
      if (parsed !== null) return parsed;
    }
  }
  return fileData[key] ?? null;
}

/** Kayi keys aik saath. */
export async function getContentMany(keys) {
  const out = {};
  if (dbConfigured()) {
    const placeholders = keys.map(() => "?").join(",");
    const rows = await query(
      `SELECT content_key, data FROM content WHERE content_key IN (${placeholders})`,
      keys
    );
    if (rows) {
      for (const r of rows) {
        const parsed = parseJSON(r.data, null);
        if (parsed !== null) out[r.content_key] = parsed;
      }
    }
  }
  for (const k of keys) if (!(k in out)) out[k] = fileData[k] ?? null;
  return out;
}

export async function setContent(key, data) {
  await query(
    `INSERT INTO content (content_key, data) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [key, JSON.stringify(data)],
    { soft: false }
  );
  return true;
}

/* ── Packages / deals / day trips ──────────────────────────── */

const FILE_BY_KIND = {
  package: "packages",
  deal: "lastMinute",
  daytrip: "dayTrips",
};

export async function getPackages(kind = "package") {
  if (dbConfigured()) {
    const rows = await query(
      "SELECT slug, data FROM packages WHERE kind = ? AND published = 1 ORDER BY sort_order ASC, id ASC",
      [kind]
    );
    if (rows && rows.length) {
      return rows.map((r) => ({ slug: r.slug, ...parseJSON(r.data, {}) }));
    }
  }
  return fileData[FILE_BY_KIND[kind]] ?? [];
}

/* ── Hotels ────────────────────────────────────────────────── */

export async function getHotels() {
  if (dbConfigured()) {
    const rows = await query(
      "SELECT slug, data FROM hotels WHERE published = 1 ORDER BY sort_order ASC, id ASC"
    );
    if (rows && rows.length) {
      return rows.map((r) => ({ ...parseJSON(r.data, {}), slug: r.slug }));
    }
  }
  return fileHotels;
}

export async function getHotelBySlug(slug) {
  const all = await getHotels();
  return all.find((h) => h.slug === slug) || null;
}

/* ── Blog / inspirations ───────────────────────────────────── */

export async function getPosts() {
  if (dbConfigured()) {
    const rows = await query(
      "SELECT slug, data FROM posts WHERE published = 1 ORDER BY sort_order ASC, id ASC"
    );
    if (rows && rows.length) {
      return rows.map((r) => ({ ...parseJSON(r.data, {}), slug: r.slug }));
    }
  }
  return fileData.inspirations ?? [];
}

/* ── Enquiries ─────────────────────────────────────────────── */

export async function saveEnquiry(e) {
  return query(
    `INSERT INTO enquiries (type, name, phone, email, subject, message, payload)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      e.type || "contact",
      e.name || "",
      e.phone || "",
      e.email || "",
      e.subject || "",
      e.message || "",
      e.payload ? JSON.stringify(e.payload) : null,
    ],
    { soft: false }
  );
}

export async function listEnquiries({ limit = 100, status } = {}) {
  const lim = Math.min(Number(limit) || 100, 500);
  if (status) {
    return (await query(
      `SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC LIMIT ${lim}`,
      [status]
    )) || [];
  }
  return (await query(`SELECT * FROM enquiries ORDER BY created_at DESC LIMIT ${lim}`)) || [];
}

/* ── Media ─────────────────────────────────────────────────── */

export async function listMedia(kind) {
  if (kind) {
    return (await query(
      "SELECT * FROM media WHERE kind = ? ORDER BY created_at DESC LIMIT 200", [kind]
    )) || [];
  }
  return (await query("SELECT * FROM media ORDER BY created_at DESC LIMIT 200")) || [];
}

export async function recordMedia(m) {
  return query(
    "INSERT INTO media (filename, url, mime, size_bytes, kind) VALUES (?, ?, ?, ?, ?)",
    [m.filename, m.url, m.mime || "", m.size || 0, m.kind || "image"],
    { soft: false }
  );
}
