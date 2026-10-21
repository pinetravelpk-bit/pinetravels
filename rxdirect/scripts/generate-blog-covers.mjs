// Builds a designed cover image (1200x630 SVG) for every blog post into
// public/images/blog-covers/<slug>.svg. Runs before every dev/build, so new
// posts get a cover automatically. The design comes from the post itself:
// its type (data/blogKinds.json) sets the colour and label, its first service
// sets the icon, its city and title are written on the cover.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import matter from "gray-matter";
import * as Icons from "lucide-react";

const root = process.cwd();
const BLOG_DIR = join(root, "content/blog");
const OUT_DIR = join(root, "public/images/blog-covers");
const kinds = JSON.parse(readFileSync(join(root, "data/blogKinds.json"), "utf8")).kinds;

const SERVICE_ICON = {
  cooks: "ChefHat", chefs: "ChefHat", drivers: "Car", maids: "Users", helpers: "Users", cleaners: "Sparkles",
  "security-guards": "ShieldCheck", "office-boys": "Briefcase", "babysitters-nannies": "Baby", gardeners: "Trees",
  nurses: "Stethoscope", caretakers: "HeartHandshake", couples: "UsersRound", batman: "UserCog",
  electricians: "Zap", plumbers: "Wrench", carpenters: "Hammer", painters: "PaintRoller",
};
const SERVICE_NAME = {
  cooks: "Cooks", chefs: "Chefs", drivers: "Drivers", maids: "Maids", helpers: "Helpers", cleaners: "Cleaners",
  "security-guards": "Security Guards", "office-boys": "Office Boys", "babysitters-nannies": "Nannies", gardeners: "Gardeners",
  nurses: "Nurses", caretakers: "Caretakers", couples: "Domestic Couples", batman: "Personal Attendants",
  electricians: "Electricians", plumbers: "Plumbers", carpenters: "Carpenters", painters: "Painters",
};
const CITY_NAME = {
  islamabad: "Islamabad", rawalpindi: "Rawalpindi", lahore: "Lahore", karachi: "Karachi",
  faisalabad: "Faisalabad", multan: "Multan", peshawar: "Peshawar", gujranwala: "Gujranwala",
};
// Second icon on each cover, chosen by post type.
const KIND_ICON = {
  "become-verified": "BadgeCheck", cost: "Banknote", verify: "ShieldCheck", "red-flags": "TriangleAlert",
  interview: "ClipboardList", "first-30": "CalendarDays", ramadan: "Moon", wedding: "PartyPopper",
  livein: "House", "why-agency": "Handshake", hire: "UserCheck", service: "BadgeCheck", guide: "BookOpen",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function icon(name, size, color, strokeWidth = 1.75) {
  const Cmp = Icons[name] || Icons.BadgeCheck;
  return renderToStaticMarkup(createElement(Cmp, { size, color, strokeWidth, absoluteStrokeWidth: false }))
    .replace(/ class="[^"]*"/, "")
    .replace(/ aria-hidden="true"/, "");
}

export function kindFor(slug) {
  return kinds.find((k) => new RegExp(k.match).test(slug)) || kinds[kinds.length - 1];
}

// SVG has no text wrapping, so wrap by an estimated character width.
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,:;–-]*\S*$/, "") + "…";
    return kept;
  }
  return lines;
}

// Small deterministic variation per post so neighbouring cards don't look identical.
function hash(s) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function cover({ slug, title, services = [], cities = [] }) {
  const kind = kindFor(slug);
  const accent = kind.color;
  const svc = services.find((s) => SERVICE_ICON[s]);
  const city = cities.map((c) => CITY_NAME[c]).filter(Boolean);
  const h = hash(slug);
  const blobX = 860 + (h % 120);
  const blobY = 120 + ((h >> 8) % 140);

  const clean = title.replace(/\s*[|–—-]\s*RX Direct\s*$/i, "").replace(/\s+by RX Direct$/i, "");
  const long = clean.length > 70;
  const fontSize = long ? 46 : clean.length > 44 ? 54 : 62;
  const lines = wrap(clean, long ? 26 : clean.length > 44 ? 22 : 19, 4);
  const lineH = Math.round(fontSize * 1.18);
  // First baseline sits just under the category label; short titles get a
  // little extra room so they don't float at the top.
  const titleTop = 150 + Math.round(fontSize * 0.9) + (lines.length <= 2 ? 40 : lines.length === 3 ? 18 : 0);

  const pills = [city.slice(0, 2).join(" · "), svc ? SERVICE_NAME[svc] : ""].filter(Boolean);
  let pillX = 72;
  const pillSvg = pills
    .map((p, i) => {
      const w = p.length * 11.5 + 56;
      const x = pillX;
      pillX += w + 12;
      const ic = i === 0 && city.length ? "MapPin" : SERVICE_ICON[svc] || "BadgeCheck";
      return `<g transform="translate(${x} 470)"><rect width="${w}" height="44" rx="22" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.22"/>
        <g transform="translate(16 11)">${icon(ic, 22, "#bfd3ff", 2)}</g>
        <text x="46" y="29" font-size="19" font-weight="600" fill="#ffffff">${esc(p)}</text></g>`;
    })
    .join("");

  const mainIcon = svc ? SERVICE_ICON[svc] : KIND_ICON[kind.key] || "BadgeCheck";
  const badgeIcon = KIND_ICON[kind.key] || "BadgeCheck";
  const labelW = kind.label.en.length * 12.2 + 48;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Poppins, 'Segoe UI', Inter, Arial, Helvetica, sans-serif">
  <title>${esc(clean)}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1f4d"/><stop offset="0.65" stop-color="#10285f"/><stop offset="1" stop-color="#1a40b5"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.75"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#ffffff" fill-opacity="0.07"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <circle cx="${blobX}" cy="${blobY}" r="330" fill="url(#glow)"/>
  <rect x="0" y="0" width="12" height="630" fill="${accent}"/>

  <!-- illustration -->
  <g transform="translate(905 315)">
    <circle r="168" fill="#ffffff" fill-opacity="0.06"/>
    <circle r="132" fill="#ffffff"/>
    <circle r="132" fill="none" stroke="${accent}" stroke-width="10" stroke-dasharray="40 18" opacity="0.9"/>
    <g transform="translate(-62 -62)">${icon(mainIcon, 124, "#0b1f4d", 1.6)}</g>
    <g transform="translate(78 78)"><circle r="44" fill="${accent}" stroke="#ffffff" stroke-width="6"/><g transform="translate(-24 -24)">${icon(badgeIcon, 48, "#ffffff", 2)}</g></g>
  </g>

  <!-- category -->
  <g transform="translate(72 72)"><rect width="${labelW}" height="42" rx="21" fill="${accent}"/>
    <text x="24" y="28" font-size="18" font-weight="700" letter-spacing="1.5" fill="#ffffff">${esc(kind.label.en.toUpperCase())}</text></g>

  <!-- title -->
  <g font-weight="800" fill="#ffffff" font-size="${fontSize}" letter-spacing="-1">
    ${lines.map((l, i) => `<text x="72" y="${Math.round(titleTop + i * lineH)}">${esc(l)}</text>`).join("\n    ")}
  </g>

  ${pillSvg}

  <!-- brand -->
  <g transform="translate(72 548)">
    <text x="0" y="40" font-size="40" font-weight="800" fill="#ffffff" letter-spacing="-1">RX</text>
    <path d="M44 46 L66 10 L74 10 L52 46 Z" fill="#60a5fa"/>
    <text x="78" y="38" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="1">DIRECT</text>
  </g>
  <text x="1128" y="590" text-anchor="end" font-size="20" font-weight="600" fill="#bfd3ff">rxdirect.pk · Verified Domestic Staff</text>
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });
let n = 0;
for (const file of readdirSync(BLOG_DIR)) {
  if (!file.endsWith(".md")) continue;
  const slug = file.replace(/\.md$/, "");
  const { data } = matter(readFileSync(join(BLOG_DIR, file), "utf8"));
  writeFileSync(join(OUT_DIR, `${slug}.svg`), cover({ slug, title: data.title || slug, services: data.services, cities: data.cities }));
  n++;
}
console.log(`blog covers: ${n} generated`);
