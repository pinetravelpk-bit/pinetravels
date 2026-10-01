// API server for the RX Direct VPS. No dependencies; data is stored as JSON
// files (plus uploaded documents) in DATA_DIR. nginx serves the static site and
// proxies /api/ and /.netlify/functions/ to this server.
//
//   ADMIN_PASSWORD=... DATA_DIR=/var/lib/rxdirect/data node server/api.mjs
//
// Public:
//   /.netlify/functions/*        old Netlify URLs: contact leads, blog comments
//   GET  /api/jobs               open jobs           GET /api/jobs/:id
//   POST /api/jobs/:id/apply     job application (+ CV)   (id "general" = no specific job)
//   POST /api/staff/register     staff verification application (+ documents)
//   POST /api/staff/status       { ref, phone } -> verification progress
//   GET  /api/team               team profiles      GET /api/files/public/:name  team photos
// Admin (Authorization: Bearer <ADMIN_PASSWORD>):
//   /api/admin/summary, /api/admin/staff[/:id], /api/admin/jobs[/:id],
//   /api/admin/applications[/:id], /api/admin/team[/:id], /api/admin/files/:name
import http from "node:http";
import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createReadStream, existsSync, mkdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const PORT = Number(process.env.PORT || 3101);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), "data");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const MAX_JSON = 64 * 1024;
const MAX_UPLOAD = 30 * 1024 * 1024; // whole multipart request
const MAX_FILE = 6 * 1024 * 1024; // each uploaded file

const PRIVATE_DIR = join(DATA_DIR, "uploads", "private"); // CNICs, CVs, certificates: admin only
const PUBLIC_DIR = join(DATA_DIR, "uploads", "public"); // team photos
for (const dir of [DATA_DIR, PRIVATE_DIR, PUBLIC_DIR]) mkdirSync(dir, { recursive: true });

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
// Writes go through one queue, so two requests arriving together can't
// overwrite each other's changes.
let queue = Promise.resolve();
const locked = (fn) => {
  const run = queue.then(fn);
  queue = run.catch(() => {});
  return run;
};
const update = (name, fallback, fn) =>
  locked(() => {
    const data = load(name, fallback);
    const result = fn(data);
    save(name, data);
    return result;
  });

// ---------- http helpers ----------
const SECURITY_HEADERS = { "x-content-type-options": "nosniff", "cache-control": "no-store" };
const json = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json", ...SECURITY_HEADERS });
  res.end(JSON.stringify(body));
};
const text = (res, status, body) => {
  res.writeHead(status, { "content-type": "text/plain; charset=utf-8", ...SECURITY_HEADERS });
  res.end(body);
};
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const fail = (status, message) => {
  throw new HttpError(status, message);
};

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new HttpError(413, "Upload too large. Please send smaller files."));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// JSON, urlencoded or multipart. Files come back as Blob-like File objects.
async function parseBody(req, limit = MAX_JSON) {
  const raw = await readBody(req, limit);
  const type = req.headers["content-type"] || "";
  if (type.includes("application/json")) {
    try {
      return JSON.parse(raw.toString("utf8") || "{}");
    } catch {
      fail(400, "Invalid JSON");
    }
  }
  const request = new Request("http://local/", { method: "POST", headers: { "content-type": type }, body: raw });
  const form = await request.formData();
  const out = {};
  for (const [key, value] of form.entries()) {
    if (key in out) out[key] = [].concat(out[key], value);
    else out[key] = value;
  }
  return out;
}

const str = (obj, key, max = 200) => {
  const v = obj?.[key];
  return typeof v === "string" ? v.trim().slice(0, max) : typeof v === "number" ? String(v) : "";
};
const digits = (s) => String(s || "").replace(/\D/g, "");

function clientIp(req) {
  return String(req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
}

// Simple in-memory rate limit: `max` hits per `windowMs` per IP and bucket.
const hits = new Map();
function rateLimit(req, bucket, max, windowMs) {
  const key = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= max) fail(429, "Too many requests. Please try again later.");
  recent.push(now);
  hits.set(key, recent);
}
setInterval(() => hits.clear(), 6 * 60 * 60 * 1000).unref();

function isAdmin(req) {
  if (!ADMIN_PASSWORD) return false;
  const header = req.headers.authorization || "";
  const given = Buffer.from(header.replace(/^Bearer\s+/i, ""));
  const expected = Buffer.from(ADMIN_PASSWORD);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
// Slow down password guessing: after 10 wrong passwords in 15 minutes an IP is
// locked out of the admin API (even with the right password) until the window passes.
const ADMIN_FAIL_MAX = 10;
const ADMIN_FAIL_WINDOW = 15 * 60 * 1000;
function requireAdmin(req) {
  const key = `admin-fail:${clientIp(req)}`;
  const recent = (hits.get(key) || []).filter((t) => Date.now() - t < ADMIN_FAIL_WINDOW);
  if (recent.length >= ADMIN_FAIL_MAX) fail(429, "Too many wrong passwords. Try again in 15 minutes.");
  if (isAdmin(req)) return;
  recent.push(Date.now());
  hits.set(key, recent);
  fail(401, "Unauthorized");
}

// ---------- uploads ----------
// The file's first bytes decide its type, never the name the browser sent.
const SIGNATURES = [
  { ext: "pdf", type: "application/pdf", test: (b) => b.subarray(0, 4).toString("latin1") === "%PDF" },
  { ext: "jpg", type: "image/jpeg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "png", type: "image/png", test: (b) => b.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])) },
  { ext: "webp", type: "image/webp", test: (b) => b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP" },
  { ext: "docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", test: (b, name) => b[0] === 0x50 && b[1] === 0x4b && /\.docx$/i.test(name) },
  { ext: "doc", type: "application/msword", test: (b) => b.subarray(0, 4).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0])) },
];
const TYPE_BY_EXT = Object.fromEntries(SIGNATURES.map((s) => [s.ext, s.type]));
const IMAGE_EXTS = ["jpg", "png", "webp"];

async function storeFile(file, { dir, allow, label }) {
  if (!file || typeof file === "string" || !file.size) return null;
  if (file.size > MAX_FILE) fail(400, `${label} is larger than 6 MB.`);
  const buf = Buffer.from(await file.arrayBuffer());
  const sig = SIGNATURES.find((s) => allow.includes(s.ext) && s.test(buf, file.name || ""));
  if (!sig) fail(400, `${label} must be ${allow.map((e) => e.toUpperCase()).join(", ")}.`);
  const name = `${randomUUID()}.${sig.ext}`;
  writeFileSync(join(dir, name), buf);
  return { file: name, name: String(file.name || name).slice(0, 120), type: sig.type, size: buf.length };
}
function removeFile(dir, stored) {
  if (!stored?.file) return;
  try {
    unlinkSync(join(dir, basename(stored.file)));
  } catch {}
}
function sendFile(res, dir, name, download) {
  const safe = basename(name);
  const full = join(dir, safe);
  if (!/^[0-9a-f-]{36}\.[a-z]+$/.test(safe) || !existsSync(full)) return text(res, 404, "Not found");
  const ext = safe.split(".").pop();
  res.writeHead(200, {
    "content-type": TYPE_BY_EXT[ext] || "application/octet-stream",
    "content-length": statSync(full).size,
    "x-content-type-options": "nosniff",
    "content-security-policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
    "cache-control": dir === PUBLIC_DIR ? "public, max-age=86400" : "private, no-store",
    ...(download ? { "content-disposition": `attachment; filename="${safe}"` } : {}),
  });
  createReadStream(full).pipe(res);
}

// ---------- domain ----------
const STAFF_CHECKS = ["cnic", "address", "police", "references", "medical", "interview", "skills"];
const STAFF_STATUSES = ["pending", "in_review", "verified", "rejected", "suspended"];
const APP_STATUSES = ["new", "shortlisted", "interview", "hired", "rejected"];
const JOB_TYPES = ["full-time", "part-time", "live-in", "live-out", "contract"];

const now = () => new Date().toISOString();
const ref = (prefix) => `${prefix}-${randomBytes(4).toString("hex").toUpperCase().slice(0, 6)}`;
const lines = (v) =>
  (Array.isArray(v) ? v : String(v || "").split("\n"))
    .map((s) => String(s).trim())
    .filter(Boolean)
    .slice(0, 20)
    .map((s) => s.slice(0, 200));

function publicJob(j) {
  const { id, title, category, city, type, salary, description, requirements, createdAt } = j;
  return { id, title, category, city, type, salary, description, requirements, createdAt };
}
function jobFromBody(body, existing = {}) {
  const job = {
    ...existing,
    title: str(body, "title", 120) || existing.title,
    category: str(body, "category", 60) || existing.category || "",
    city: str(body, "city", 80) || existing.city || "",
    type: JOB_TYPES.includes(body.type) ? body.type : existing.type || "full-time",
    salary: "salary" in body ? str(body, "salary", 80) : existing.salary || "",
    description: "description" in body ? str(body, "description", 4000) : existing.description || "",
    requirements: "requirements" in body ? lines(body.requirements) : existing.requirements || [],
    status: body.status === "closed" ? "closed" : body.status === "open" ? "open" : existing.status || "open",
    updatedAt: now(),
  };
  if (!job.title) fail(400, "Job title is required.");
  return job;
}

function staffSummary(s) {
  const { id, ref: r, verifiedId, name, phone, city, role, status, createdAt, updatedAt, docs } = s;
  const passed = STAFF_CHECKS.filter((c) => s.checks?.[c]?.status === "passed").length;
  return { id, ref: r, verifiedId, name, phone, city, role, status, createdAt, updatedAt, photo: docs?.photo || null, progress: `${passed}/${STAFF_CHECKS.length}` };
}
function nextVerifiedId(list) {
  const year = new Date().getFullYear();
  const prefix = `RXD-${year}-`;
  const max = list
    .map((s) => s.verifiedId)
    .filter((v) => v?.startsWith(prefix))
    .reduce((m, v) => Math.max(m, Number(v.slice(prefix.length)) || 0), 0);
  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}

function teamFromBody(body, existing = {}) {
  const member = {
    ...existing,
    name: str(body, "name", 80) || existing.name,
    role: "role" in body ? str(body, "role", 80) : existing.role || "",
    bio: "bio" in body ? str(body, "bio", 1200) : existing.bio || "",
    phone: "phone" in body ? str(body, "phone", 40) : existing.phone || "",
    email: "email" in body ? str(body, "email", 120) : existing.email || "",
    linkedin: "linkedin" in body ? str(body, "linkedin", 300) : existing.linkedin || "",
    order: "order" in body ? Number(body.order) || 0 : existing.order || 0,
    visible: "visible" in body ? body.visible !== "false" && body.visible !== false : existing.visible ?? true,
    updatedAt: now(),
  };
  if (!member.name) fail(400, "Name is required.");
  if (member.linkedin && !/^https?:\/\//i.test(member.linkedin)) member.linkedin = `https://${member.linkedin}`;
  return member;
}
const publicTeam = ({ id, name, role, bio, photo, phone, email, linkedin, order }) => ({ id, name, role, bio, photo: photo?.file || null, phone, email, linkedin, order });

// ---------- routes ----------
const routes = [];
const route = (method, pattern, handler) => routes.push({ method, pattern, handler });

// --- legacy Netlify URLs (contact form + comments), behaviour unchanged ---
route("POST", /^\/\.netlify\/functions\/submit-lead$/, async (req, res) => {
  rateLimit(req, "lead", 20, 60 * 60 * 1000);
  const data = await parseBody(req);
  if (str(data, "company")) return json(res, 201, { ok: true }); // honeypot
  const lead = {
    id: randomUUID(),
    name: str(data, "name", 120),
    phone: str(data, "phone", 40),
    city: str(data, "city", 80),
    service: str(data, "service", 80),
    message: str(data, "message", 2000),
    createdAt: now(),
  };
  if (!lead.name || !lead.phone) fail(400, "Missing name or phone");
  await update("leads.json", [], (leads) => leads.push(lead));
  json(res, 201, { ok: true });
});
route("GET", /^\/\.netlify\/functions\/manage-leads$/, async (req, res) => {
  requireAdmin(req);
  json(res, 200, load("leads.json", []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
});
route("POST", /^\/\.netlify\/functions\/manage-leads$/, async (req, res) => {
  requireAdmin(req);
  const id = str(await parseBody(req), "id", 100);
  if (!id) fail(400, "Missing id");
  await update("leads.json", [], (leads) => leads.splice(0, leads.length, ...leads.filter((l) => l.id !== id)));
  json(res, 200, { ok: true });
});
route("GET", /^\/\.netlify\/functions\/list-comments$/, async (req, res, { url }) => {
  const pageId = (url.searchParams.get("pageId") || "").trim();
  if (!pageId) fail(400, "Missing pageId");
  const approved = (load("comments.json", {})[pageId] || [])
    .filter((c) => c.approved)
    .map(({ id, name, text: body, createdAt }) => ({ id, name, text: body, createdAt }))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  json(res, 200, approved);
});
route("POST", /^\/\.netlify\/functions\/submit-comment$/, async (req, res) => {
  rateLimit(req, "comment", 20, 60 * 60 * 1000);
  const body = await parseBody(req);
  if (str(body, "company")) return json(res, 201, { ok: true }); // honeypot
  const pageId = str(body, "pageId", 300);
  const comment = {
    id: randomUUID(),
    name: str(body, "name", 80) || "Anonymous",
    text: str(body, "text", 2000),
    createdAt: now(),
    approved: false,
    pageTitle: str(body, "pageTitle", 200),
  };
  if (!pageId || comment.text.length < 2) fail(400, "Missing pageId or text");
  await update("comments.json", {}, (all) => (all[pageId] = [...(all[pageId] || []), comment]));
  json(res, 201, { ok: true });
});
route("GET", /^\/\.netlify\/functions\/moderate-comments$/, async (req, res) => {
  requireAdmin(req);
  const all = [];
  for (const [pageId, list] of Object.entries(load("comments.json", {}))) for (const c of list) all.push({ ...c, pageId });
  all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  json(res, 200, all);
});
route("POST", /^\/\.netlify\/functions\/moderate-comments$/, async (req, res) => {
  requireAdmin(req);
  const body = await parseBody(req);
  const pageId = str(body, "pageId", 300);
  const id = str(body, "id", 100);
  const action = body.action === "approve" ? "approve" : body.action === "reject" ? "reject" : null;
  if (!pageId || !id || !action) fail(400, "Missing pageId, id or action");
  const found = await update("comments.json", {}, (all) => {
    if (!all[pageId]) return false;
    all[pageId] = action === "approve" ? all[pageId].map((c) => (c.id === id ? { ...c, approved: true } : c)) : all[pageId].filter((c) => c.id !== id);
    return true;
  });
  if (!found) fail(404, "Not found");
  json(res, 200, { ok: true });
});

// --- jobs (public) ---
route("GET", /^\/api\/jobs$/, async (req, res) => {
  const jobs = load("jobs.json", []).filter((j) => j.status === "open").sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  json(res, 200, jobs.map(publicJob));
});
route("GET", /^\/api\/jobs\/([\w-]+)$/, async (req, res, { params }) => {
  const job = load("jobs.json", []).find((j) => j.id === params[0] && j.status === "open");
  if (!job) fail(404, "This job is no longer open.");
  json(res, 200, publicJob(job));
});
route("POST", /^\/api\/jobs\/([\w-]+)\/apply$/, async (req, res, { params }) => {
  rateLimit(req, "apply", 10, 60 * 60 * 1000);
  const body = await parseBody(req, MAX_UPLOAD);
  if (str(body, "company")) return json(res, 201, { ok: true, ref: ref("RXJ") }); // honeypot
  const jobId = params[0];
  const job = jobId === "general" ? null : load("jobs.json", []).find((j) => j.id === jobId && j.status === "open");
  if (jobId !== "general" && !job) fail(404, "This job is no longer open.");
  const app = {
    id: randomUUID(),
    ref: ref("RXJ"),
    jobId,
    jobTitle: job?.title || "General application",
    name: str(body, "name", 120),
    phone: str(body, "phone", 40),
    cnic: str(body, "cnic", 20),
    city: str(body, "city", 80),
    role: str(body, "role", 60),
    experience: str(body, "experience", 60),
    message: str(body, "message", 2000),
    status: "new",
    notes: "",
    createdAt: now(),
  };
  if (!app.name || digits(app.phone).length < 10) fail(400, "Please enter your name and a valid phone number.");
  app.cv = await storeFile(body.cv, { dir: PRIVATE_DIR, allow: ["pdf", "doc", "docx", "jpg", "png", "webp"], label: "CV" });
  try {
    await update("applications.json", [], (list) => list.push(app));
  } catch (err) {
    removeFile(PRIVATE_DIR, app.cv);
    throw err;
  }
  json(res, 201, { ok: true, ref: app.ref });
});

// --- staff verification (public) ---
route("POST", /^\/api\/staff\/register$/, async (req, res) => {
  rateLimit(req, "staff-register", 5, 60 * 60 * 1000);
  const body = await parseBody(req, MAX_UPLOAD);
  if (str(body, "company")) return json(res, 201, { ok: true, ref: ref("RXA") }); // honeypot
  const cnic = digits(body.cnic);
  const staff = {
    id: randomUUID(),
    ref: ref("RXA"),
    verifiedId: null,
    name: str(body, "name", 120),
    fatherName: str(body, "fatherName", 120),
    cnic: cnic.length === 13 ? `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}` : "",
    phone: str(body, "phone", 40),
    gender: ["male", "female"].includes(body.gender) ? body.gender : "",
    dob: str(body, "dob", 20),
    city: str(body, "city", 80),
    address: str(body, "address", 400),
    role: str(body, "role", 60),
    experience: str(body, "experience", 60),
    languages: str(body, "languages", 200),
    availability: str(body, "availability", 60),
    expectedSalary: str(body, "expectedSalary", 60),
    references: [1, 2].map((n) => ({ name: str(body, `ref${n}Name`, 120), phone: str(body, `ref${n}Phone`, 40), relation: str(body, `ref${n}Relation`, 80) })).filter((r) => r.name || r.phone),
    about: str(body, "about", 1500),
    checks: Object.fromEntries(STAFF_CHECKS.map((c) => [c, { status: "pending", note: "", at: null }])),
    status: "pending",
    adminNotes: "",
    createdAt: now(),
    updatedAt: now(),
  };
  if (!staff.name || !staff.role || digits(staff.phone).length < 10) fail(400, "Please fill in your name, phone number and the work you do.");
  if (!staff.cnic) fail(400, "Please enter a valid 13-digit CNIC number.");
  if (load("staff.json", []).some((s) => s.cnic === staff.cnic && s.status !== "rejected"))
    fail(409, "An application with this CNIC already exists. Use “Check status” to see its progress.");
  const images = IMAGE_EXTS;
  const docsSpec = {
    photo: { allow: images, label: "Photo" },
    cnicFront: { allow: [...images, "pdf"], label: "CNIC front" },
    cnicBack: { allow: [...images, "pdf"], label: "CNIC back" },
    police: { allow: [...images, "pdf"], label: "Police certificate" },
    medical: { allow: [...images, "pdf"], label: "Medical certificate" },
    other: { allow: [...images, "pdf", "doc", "docx"], label: "Other document" },
  };
  if (!body.cnicFront?.size) fail(400, "Please upload a photo of the front of your CNIC.");
  staff.docs = {};
  try {
    for (const [key, spec] of Object.entries(docsSpec)) staff.docs[key] = await storeFile(body[key], { dir: PRIVATE_DIR, ...spec });
    await update("staff.json", [], (list) => list.push(staff));
  } catch (err) {
    // Don't leave half an application's documents lying around.
    for (const d of Object.values(staff.docs)) removeFile(PRIVATE_DIR, d);
    throw err;
  }
  json(res, 201, { ok: true, ref: staff.ref });
});
route("POST", /^\/api\/staff\/status$/, async (req, res) => {
  rateLimit(req, "staff-status", 30, 60 * 60 * 1000);
  const body = await parseBody(req);
  const r = str(body, "ref", 20).toUpperCase();
  const phone = digits(body.phone).slice(-10);
  const staff = load("staff.json", []).find((s) => (s.ref === r || s.verifiedId === r) && digits(s.phone).slice(-10) === phone);
  if (!staff || phone.length < 10) fail(404, "No application found with that reference and phone number.");
  json(res, 200, {
    ref: staff.ref,
    verifiedId: staff.verifiedId,
    name: staff.name,
    role: staff.role,
    status: staff.status,
    checks: Object.fromEntries(STAFF_CHECKS.map((c) => [c, staff.checks?.[c]?.status || "pending"])),
    updatedAt: staff.updatedAt,
  });
});

// --- team (public) ---
route("GET", /^\/api\/team$/, async (req, res) => {
  const team = load("team.json", []).filter((m) => m.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name));
  json(res, 200, team.map(publicTeam));
});
route("GET", /^\/api\/files\/public\/([\w.-]+)$/, async (req, res, { params }) => sendFile(res, PUBLIC_DIR, params[0], false));

// --- admin ---
route("GET", /^\/api\/admin\/summary$/, async (req, res) => {
  requireAdmin(req);
  const staff = load("staff.json", []);
  const apps = load("applications.json", []);
  const jobs = load("jobs.json", []);
  const comments = Object.values(load("comments.json", {})).flat();
  const count = (list, key) => list.reduce((acc, x) => ((acc[x[key]] = (acc[x[key]] || 0) + 1), acc), {});
  json(res, 200, {
    leads: load("leads.json", []).length,
    staff: { total: staff.length, ...count(staff, "status") },
    applications: { total: apps.length, ...count(apps, "status") },
    jobs: { total: jobs.length, ...count(jobs, "status") },
    team: load("team.json", []).length,
    comments: { total: comments.length, pending: comments.filter((c) => !c.approved).length },
  });
});
route("GET", /^\/api\/admin\/files\/([\w.-]+)$/, async (req, res, { params, url }) => {
  requireAdmin(req);
  sendFile(res, PRIVATE_DIR, params[0], url.searchParams.has("download"));
});

// staff
route("GET", /^\/api\/admin\/staff$/, async (req, res) => {
  requireAdmin(req);
  json(res, 200, load("staff.json", []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(staffSummary));
});
route("GET", /^\/api\/admin\/staff\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const staff = load("staff.json", []).find((s) => s.id === params[0]);
  if (!staff) fail(404, "Not found");
  json(res, 200, staff);
});
route("PATCH", /^\/api\/admin\/staff\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const body = await parseBody(req);
  const staff = await update("staff.json", [], (list) => {
    const s = list.find((x) => x.id === params[0]);
    if (!s) fail(404, "Not found");
    if (body.checks && typeof body.checks === "object") {
      for (const c of STAFF_CHECKS) {
        const incoming = body.checks[c];
        if (!incoming) continue;
        const status = ["pending", "passed", "failed"].includes(incoming.status) ? incoming.status : s.checks[c].status;
        s.checks[c] = { status, note: String(incoming.note ?? s.checks[c].note ?? "").slice(0, 500), at: now() };
      }
    }
    if ("adminNotes" in body) s.adminNotes = str(body, "adminNotes", 4000);
    for (const f of ["name", "fatherName", "phone", "city", "address", "role", "experience", "languages", "availability", "expectedSalary"])
      if (f in body) s[f] = str(body, f, 400);
    if (body.status && STAFF_STATUSES.includes(body.status) && body.status !== s.status) {
      if (body.status === "verified") {
        const failed = STAFF_CHECKS.filter((c) => s.checks[c].status === "failed");
        if (failed.length) fail(400, `Cannot verify: failed checks (${failed.join(", ")}).`);
        if (!s.verifiedId) s.verifiedId = nextVerifiedId(list);
        s.verifiedAt = now();
      }
      s.status = body.status;
    }
    s.updatedAt = now();
    return s;
  });
  json(res, 200, staff);
});
route("DELETE", /^\/api\/admin\/staff\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const removed = await update("staff.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    return list.splice(i, 1)[0];
  });
  for (const d of Object.values(removed.docs || {})) removeFile(PRIVATE_DIR, d);
  json(res, 200, { ok: true });
});

// jobs
route("GET", /^\/api\/admin\/jobs$/, async (req, res) => {
  requireAdmin(req);
  const apps = load("applications.json", []);
  const jobs = load("jobs.json", []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  json(res, 200, jobs.map((j) => ({ ...j, applications: apps.filter((a) => a.jobId === j.id).length })));
});
route("POST", /^\/api\/admin\/jobs$/, async (req, res) => {
  requireAdmin(req);
  const job = { id: randomUUID(), ...jobFromBody(await parseBody(req)), createdAt: now() };
  await update("jobs.json", [], (list) => list.push(job));
  json(res, 201, job);
});
route("PATCH", /^\/api\/admin\/jobs\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const body = await parseBody(req);
  const job = await update("jobs.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    return (list[i] = jobFromBody(body, list[i]));
  });
  json(res, 200, job);
});
route("DELETE", /^\/api\/admin\/jobs\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  await update("jobs.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    list.splice(i, 1);
  });
  json(res, 200, { ok: true });
});

// applications
route("GET", /^\/api\/admin\/applications$/, async (req, res) => {
  requireAdmin(req);
  json(res, 200, load("applications.json", []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
});
route("PATCH", /^\/api\/admin\/applications\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const body = await parseBody(req);
  const app = await update("applications.json", [], (list) => {
    const a = list.find((x) => x.id === params[0]);
    if (!a) fail(404, "Not found");
    if (APP_STATUSES.includes(body.status)) a.status = body.status;
    if ("notes" in body) a.notes = str(body, "notes", 4000);
    a.updatedAt = now();
    return a;
  });
  json(res, 200, app);
});
route("DELETE", /^\/api\/admin\/applications\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const removed = await update("applications.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    return list.splice(i, 1)[0];
  });
  removeFile(PRIVATE_DIR, removed.cv);
  json(res, 200, { ok: true });
});

// team
route("GET", /^\/api\/admin\/team$/, async (req, res) => {
  requireAdmin(req);
  json(res, 200, load("team.json", []).slice().sort((a, b) => (a.order || 0) - (b.order || 0)));
});
route("POST", /^\/api\/admin\/team$/, async (req, res) => {
  requireAdmin(req);
  const body = await parseBody(req, MAX_UPLOAD);
  const member = { id: randomUUID(), ...teamFromBody(body), createdAt: now() };
  member.photo = await storeFile(body.photo, { dir: PUBLIC_DIR, allow: IMAGE_EXTS, label: "Photo" });
  await update("team.json", [], (list) => list.push(member));
  json(res, 201, member);
});
route("PATCH", /^\/api\/admin\/team\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const body = await parseBody(req, MAX_UPLOAD);
  const photo = await storeFile(body.photo, { dir: PUBLIC_DIR, allow: IMAGE_EXTS, label: "Photo" });
  let oldPhoto = null;
  const member = await update("team.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    const next = teamFromBody(body, list[i]);
    if (photo || body.removePhoto === "true") {
      oldPhoto = list[i].photo;
      next.photo = photo;
    }
    return (list[i] = next);
  });
  removeFile(PUBLIC_DIR, oldPhoto);
  json(res, 200, member);
});
route("DELETE", /^\/api\/admin\/team\/([\w-]+)$/, async (req, res, { params }) => {
  requireAdmin(req);
  const removed = await update("team.json", [], (list) => {
    const i = list.findIndex((x) => x.id === params[0]);
    if (i < 0) fail(404, "Not found");
    return list.splice(i, 1)[0];
  });
  removeFile(PUBLIC_DIR, removed.photo);
  json(res, 200, { ok: true });
});

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://local");
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const candidates = routes.filter((r) => r.pattern.test(path));
  if (!candidates.length) return text(res, 404, "Not found");
  const r = candidates.find((c) => c.method === req.method);
  if (!r) return text(res, 405, "Method Not Allowed");
  try {
    await r.handler(req, res, { url, params: path.match(r.pattern).slice(1) });
  } catch (err) {
    if (res.headersSent) return res.destroy();
    if (err instanceof HttpError) {
      // Legacy endpoints answered errors as plain text; keep that for them.
      return path.startsWith("/.netlify/") ? text(res, err.status, err.message) : json(res, err.status, { error: err.message });
    }
    console.error(err);
    json(res, 500, { error: "Something went wrong. Please try again." });
  }
});
server.requestTimeout = 120_000;

server.listen(PORT, HOST, () => {
  console.log(`RX Direct API on http://${HOST}:${PORT} (data: ${DATA_DIR})`);
  if (!ADMIN_PASSWORD) console.log("ADMIN_PASSWORD not set: admin endpoints are disabled.");
});
