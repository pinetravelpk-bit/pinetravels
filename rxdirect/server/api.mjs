// Small API server for the VPS. It replaces the old Netlify Functions at the
// same URLs (/.netlify/functions/...), so the static site keeps working
// unchanged: contact-form leads and moderated blog comments.
//
// No dependencies; data is stored as JSON files in DATA_DIR. nginx serves the
// static site and proxies /.netlify/functions/ to this server.
//
//   ADMIN_PASSWORD=... DATA_DIR=/var/lib/rxdirect node server/api.mjs
import http from "node:http";
import { randomUUID, timingSafeEqual } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PORT = Number(process.env.PORT || 3101);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), "data");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const MAX_BODY = 64 * 1024;

mkdirSync(DATA_DIR, { recursive: true });

// ---------- storage ----------
function load(name, fallback) {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, name), "utf8"));
  } catch {
    return fallback;
  }
}
function save(name, value) {
  const file = join(DATA_DIR, name);
  writeFileSync(file + ".tmp", JSON.stringify(value, null, 2));
  renameSync(file + ".tmp", file); // atomic replace
}
// Requests are handled one at a time per file through this queue, so two
// submissions arriving together can't overwrite each other.
let queue = Promise.resolve();
const locked = (fn) => (queue = queue.then(fn, fn));

// ---------- helpers ----------
const json = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
};
const text = (res, status, body) => {
  res.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
  res.end(body);
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("too large"));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// The contact form posts multipart/form-data or urlencoded; comments post JSON.
async function parseForm(req, raw) {
  const type = req.headers["content-type"] || "";
  if (type.includes("application/json")) return JSON.parse(raw.toString("utf8") || "{}");
  const request = new Request("http://local/", { method: "POST", headers: { "content-type": type }, body: raw });
  return Object.fromEntries((await request.formData()).entries());
}

const field = (obj, key, max) => String(obj?.[key] ?? "").trim().slice(0, max);

function isAdmin(req) {
  if (!ADMIN_PASSWORD) return false;
  const header = req.headers.authorization || "";
  const given = Buffer.from(header.replace(/^Bearer\s+/i, ""));
  const expected = Buffer.from(ADMIN_PASSWORD);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// ---------- handlers (same behaviour as the old Netlify functions) ----------
const handlers = {
  async "submit-lead"(req, res) {
    if (req.method !== "POST") return text(res, 405, "Method Not Allowed");
    const data = await parseForm(req, await readBody(req));
    if (field(data, "company", 200)) return json(res, 201, { ok: true }); // honeypot
    const lead = {
      id: randomUUID(),
      name: field(data, "name", 120),
      phone: field(data, "phone", 40),
      city: field(data, "city", 80),
      service: field(data, "service", 80),
      message: field(data, "message", 2000),
      createdAt: new Date().toISOString(),
    };
    if (!lead.name || !lead.phone) return text(res, 400, "Missing name or phone");
    await locked(() => save("leads.json", [...load("leads.json", []), lead]));
    return json(res, 201, { ok: true });
  },

  async "manage-leads"(req, res) {
    if (!isAdmin(req)) return text(res, 401, "Unauthorized");
    if (req.method === "GET") {
      const leads = load("leads.json", []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json(res, 200, leads);
    }
    if (req.method === "POST") {
      const id = field(await parseForm(req, await readBody(req)), "id", 100);
      if (!id) return text(res, 400, "Missing id");
      await locked(() => save("leads.json", load("leads.json", []).filter((l) => l.id !== id)));
      return json(res, 200, { ok: true });
    }
    return text(res, 405, "Method Not Allowed");
  },

  async "list-comments"(req, res, url) {
    if (req.method !== "GET") return text(res, 405, "Method Not Allowed");
    const pageId = (url.searchParams.get("pageId") || "").trim();
    if (!pageId) return text(res, 400, "Missing pageId");
    const approved = (load("comments.json", {})[pageId] || [])
      .filter((c) => c.approved)
      .map(({ id, name, text: body, createdAt }) => ({ id, name, text: body, createdAt }))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return json(res, 200, approved);
  },

  async "submit-comment"(req, res) {
    if (req.method !== "POST") return text(res, 405, "Method Not Allowed");
    const body = await parseForm(req, await readBody(req));
    if (field(body, "company", 200)) return json(res, 201, { ok: true }); // honeypot
    const pageId = field(body, "pageId", 300);
    const comment = {
      id: randomUUID(),
      name: field(body, "name", 80) || "Anonymous",
      text: field(body, "text", 2000),
      createdAt: new Date().toISOString(),
      approved: false,
      pageTitle: field(body, "pageTitle", 200),
    };
    if (!pageId || comment.text.length < 2) return text(res, 400, "Missing pageId or text");
    await locked(() => {
      const all = load("comments.json", {});
      all[pageId] = [...(all[pageId] || []), comment];
      save("comments.json", all);
    });
    return json(res, 201, { ok: true });
  },

  async "moderate-comments"(req, res) {
    if (!isAdmin(req)) return text(res, 401, "Unauthorized");
    if (req.method === "GET") {
      const all = [];
      for (const [pageId, list] of Object.entries(load("comments.json", {}))) {
        for (const c of list) all.push({ ...c, pageId });
      }
      all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json(res, 200, all);
    }
    if (req.method === "POST") {
      const body = await parseForm(req, await readBody(req));
      const pageId = field(body, "pageId", 300);
      const id = field(body, "id", 100);
      const action = body.action === "approve" ? "approve" : body.action === "reject" ? "reject" : null;
      if (!pageId || !id || !action) return text(res, 400, "Missing pageId, id or action");
      const found = await locked(() => {
        const all = load("comments.json", {});
        if (!all[pageId]) return false;
        all[pageId] =
          action === "approve"
            ? all[pageId].map((c) => (c.id === id ? { ...c, approved: true } : c))
            : all[pageId].filter((c) => c.id !== id);
        save("comments.json", all);
        return true;
      });
      return found ? json(res, 200, { ok: true }) : text(res, 404, "Not found");
    }
    return text(res, 405, "Method Not Allowed");
  },
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://local");
  const match = url.pathname.match(/^\/\.netlify\/functions\/([a-z-]+)\/?$/);
  const handler = match && handlers[match[1]];
  if (!handler) return text(res, 404, "Not found");
  try {
    await handler(req, res, url);
  } catch (err) {
    if (!res.headersSent) json(res, 400, { error: err instanceof Error ? err.message : String(err) });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`RX Direct API on http://${HOST}:${PORT} (data: ${DATA_DIR})`);
  if (!ADMIN_PASSWORD) console.log("ADMIN_PASSWORD not set: admin endpoints are disabled.");
});
