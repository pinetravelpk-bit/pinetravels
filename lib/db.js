// MySQL connection layer for Pine Travel.
// Hostinger Business plan ka "Managed MySQL" isi ke sath chalta hai.
// Agar database configure na ho to site files (lib/data.js) se chalti rehti hai.

import mysql from "mysql2/promise";

let pool = null;
let warned = false;

export function dbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);
}

export function getPool() {
  if (!dbConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_POOL || 5),
      charset: "utf8mb4",
    });
  }
  return pool;
}

/** Run a query. Returns [] (or null) instead of throwing if the DB is down. */
export async function query(sql, params = [], { soft = true } = {}) {
  const p = getPool();
  if (!p) return soft ? null : Promise.reject(new Error("Database not configured"));
  try {
    const [rows] = await p.execute(sql, params);
    return rows;
  } catch (err) {
    if (!soft) throw err;
    if (!warned) {
      warned = true;
      console.warn("[db] query failed, falling back to file content:", err.code || err.message);
    }
    return null;
  }
}

export async function queryOne(sql, params = [], opts) {
  const rows = await query(sql, params, opts);
  return rows && rows.length ? rows[0] : null;
}

/** Quick health check used by the admin dashboard. */
export async function dbHealth() {
  if (!dbConfigured()) return { ok: false, reason: "not-configured" };
  try {
    const p = getPool();
    const [rows] = await p.execute("SELECT 1 AS ok");
    return { ok: rows[0].ok === 1 };
  } catch (err) {
    return { ok: false, reason: err.code || err.message };
  }
}

/** MySQL JSON columns come back parsed on some drivers and as text on others. */
export function parseJSON(value, fallback = null) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
