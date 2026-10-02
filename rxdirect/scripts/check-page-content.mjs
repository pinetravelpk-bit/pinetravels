// Checks content/pages against data/pageKeywords.json:
//   - every route in the keyword sheet has a content file
//   - the article body has at least 1500 words
//   - every target keyword appears (title, description, answer, body or FAQs)
//   - no long dashes and none of the stock phrases that make copy read as machine-written
// Usage: node scripts/check-page-content.mjs [--strict] [route-prefix]
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();
const keywords = JSON.parse(fs.readFileSync(path.join(root, "data/pageKeywords.json"), "utf8"));
const strict = process.argv.includes("--strict");
const prefix = process.argv.slice(2).find((a) => !a.startsWith("--"));

const BANNED = [
  "delve", "tapestry", "seamless", "seamlessly", "in today's fast-paced", "fast-paced world", "look no further",
  "game-changer", "game changer", "testament to", "in the realm", "embark", "unlock the", "elevate your",
  "navigate the complexities", "navigating the", "rest assured", "hassle-free", "a myriad", "plethora",
  "furthermore", "moreover", "in conclusion", "it's important to note", "it is important to note",
  "whether you're", "whether you are looking", "robust", "cutting-edge", "unparalleled", "ever-evolving",
  "landscape of", "holistic", "leverage", "synergy", "in summary", "dive into", "dive deep", "let's explore",
  "vibrant", "bustling", "nestled", "boasts", "second to none", "top-notch", "world-class", "one-stop",
];

let failures = 0;
const rows = [];
for (const [route, info] of Object.entries(keywords)) {
  if (prefix && !route.startsWith(prefix)) continue;
  const file = path.join(root, "content/pages", `${route === "/" ? "home" : route.slice(1)}.md`);
  if (!fs.existsSync(file)) {
    rows.push([route, "MISSING"]);
    failures++;
    continue;
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
  const faqText = (data.faqs ?? []).map((f) => `${f.q} ${f.a}`).join(" ");
  // Punctuation is ignored, as search engines do: "a cook near me, Islamabad" matches "cook near me Islamabad".
  const norm = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9&]+/g, " ").replace(/\s+/g, " ")} `;
  const haystack = norm(`${data.title} ${data.description} ${data.answer} ${content} ${faqText}`);
  const missing = info.keywords.filter((k) => !haystack.includes(norm(k)));
  const dashes = (raw.match(/[–—]/g) ?? []).length;
  const lower = raw.toLowerCase();
  const banned = BANNED.filter((b) => lower.includes(b));
  const problems = [];
  if (words < 1500) problems.push(`${words} words`);
  if (missing.length) problems.push(`missing keywords: ${missing.join(" | ")}`);
  if (dashes) problems.push(`${dashes} long dashes`);
  if (banned.length) problems.push(`stock phrases: ${banned.join(", ")}`);
  if (!data.title || !data.description) problems.push("no title/description");
  if (data.title && data.title.length > 65) problems.push(`title ${data.title.length} chars`);
  if (data.description && (data.description.length > 160 || data.description.length < 110)) problems.push(`description ${data.description.length} chars`);
  if ((data.faqs ?? []).length < 5) problems.push(`${(data.faqs ?? []).length} faqs`);
  if (problems.length) failures++;
  rows.push([route, problems.length ? problems.join("; ") : `ok (${words} words)`]);
}
for (const [r, s] of rows) if (!s.startsWith("ok") || process.argv.includes("--all")) console.log(`${r}: ${s}`);
console.log(`\n${rows.length - failures}/${rows.length} pages pass`);
if (strict && failures) process.exit(1);
