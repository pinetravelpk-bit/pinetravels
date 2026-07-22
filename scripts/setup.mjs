#!/usr/bin/env node
/**
 * Pine Travel — database setup
 *
 *   npm run setup
 *
 * Ye script:
 *  1. Saari tables banati hai (agar pehle se na hon)
 *  2. lib/data.js aur lib/hotels.js ka maujooda content database me daal deti hai
 *  3. Admin user banati hai (.env ke ADMIN_EMAIL / ADMIN_PASSWORD se)
 *
 * Dobara chalane se maujooda content overwrite NAHI hota.
 * Sab kuch reset karna ho to:  npm run setup -- --force
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const force = process.argv.includes("--force");

/* ── .env padho (bina kisi package ke) ───────────────────── */
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(root, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      let v = m[2].trim().replace(/^["']|["']$/g, "");
      if (!(m[1] in process.env)) process.env[m[1]] = v;
    }
  }
}
loadEnv();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

const need = ["DB_HOST", "DB_NAME", "DB_USER"];
const missing = need.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`\n  Missing in .env: ${missing.join(", ")}`);
  console.error("  .env.example dekh kar .env bana lein, phir dobara chalayein.\n");
  process.exit(1);
}

const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  multipleStatements: true,
  charset: "utf8mb4",
});

console.log("\n  Pine Travel — database setup");
console.log("  ────────────────────────────");
console.log(`  Connected: ${process.env.DB_USER}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

/* ── 1. Tables ───────────────────────────────────────────── */
const sql = fs.readFileSync(path.join(root, "lib", "schema.sql"), "utf8");
await conn.query(sql);
console.log("  ✓ Tables ready");

/* ── 2. Content seed ─────────────────────────────────────── */
const data = await import(pathToFileURL(path.join(root, "lib", "data.js")).href);
const { hotels } = await import(pathToFileURL(path.join(root, "lib", "hotels.js")).href);

const CONTENT_KEYS = [
  "site", "hero", "quickSearch", "services", "offers", "destinationRegions",
  "whyUs", "quote", "customize", "partners", "testimonials", "ratingBadge",
  "faqs", "counters", "footerLinks", "steps",
  "tourTypes", "travellerOptions", "guestOptions", "vehicles", "pickupCities", "durations",
];

if (force) {
  await conn.query("DELETE FROM content; DELETE FROM packages; DELETE FROM hotels; DELETE FROM posts;");
  console.log("  ! --force: purana content saaf kar diya");
}

let seeded = 0;
for (const key of CONTENT_KEYS) {
  if (data[key] === undefined) continue;
  const [r] = await conn.execute(
    "INSERT IGNORE INTO content (content_key, data) VALUES (?, ?)",
    [key, JSON.stringify(data[key])]
  );
  if (r.affectedRows) seeded++;
}
console.log(`  ✓ Content sections: ${seeded} added`);

async function seedList(rows, kind) {
  let n = 0;
  for (let i = 0; i < rows.length; i++) {
    const item = { ...rows[i] };
    const slug = item.slug || String(item.title || item.name || `item-${i}`)
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    delete item.slug;
    const [r] = await conn.execute(
      "INSERT IGNORE INTO packages (slug, kind, sort_order, data) VALUES (?, ?, ?, ?)",
      [slug, kind, i, JSON.stringify(item)]
    );
    if (r.affectedRows) n++;
  }
  return n;
}

const pk = await seedList(data.packages || [], "package");
const dl = await seedList(data.lastMinute || [], "deal");
const dt = await seedList(data.dayTrips || [], "daytrip");
console.log(`  ✓ Packages: ${pk} · Deals: ${dl} · Day trips: ${dt}`);

let hn = 0;
for (let i = 0; i < hotels.length; i++) {
  const h = { ...hotels[i] };
  const slug = h.slug;
  delete h.slug;
  const [r] = await conn.execute(
    "INSERT IGNORE INTO hotels (slug, sort_order, data) VALUES (?, ?, ?)",
    [slug, i, JSON.stringify(h)]
  );
  if (r.affectedRows) hn++;
}
console.log(`  ✓ Hotels: ${hn} added`);

let pn = 0;
const posts = data.inspirations || [];
for (let i = 0; i < posts.length; i++) {
  const p = { ...posts[i] };
  const slug = p.slug || String(p.title || `post-${i}`)
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 150);
  delete p.slug;
  const [r] = await conn.execute(
    "INSERT IGNORE INTO posts (slug, sort_order, data) VALUES (?, ?, ?)",
    [slug, i, JSON.stringify(p)]
  );
  if (r.affectedRows) pn++;
}
console.log(`  ✓ Blog posts: ${pn} added`);

/* ── 3. Admin user ───────────────────────────────────────── */
const email = process.env.ADMIN_EMAIL || "admin@pinetravels.com";
const password = process.env.ADMIN_PASSWORD || "";
const [users] = await conn.execute("SELECT id FROM users WHERE email = ?", [email]);

if (users.length) {
  console.log(`  · Admin already exists: ${email}`);
} else if (!password) {
  console.log("\n  ! ADMIN_PASSWORD .env me set nahi hai — admin user nahi bana.");
  console.log("    .env me ADMIN_PASSWORD daal kar dobara chalayein.");
} else if (password.length < 8) {
  console.log("\n  ! ADMIN_PASSWORD kam az kam 8 characters ka hona chahiye — admin user nahi bana.");
} else {
  await conn.execute(
    "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)",
    [email, process.env.ADMIN_NAME || "Admin", hashPassword(password)]
  );
  console.log(`  ✓ Admin user: ${email}`);
}

await conn.end();
console.log("\n  Ho gaya. Ab `npm run dev` chala kar /admin par login karein.\n");
