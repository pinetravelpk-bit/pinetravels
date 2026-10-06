import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import type { Metadata } from "next";
import keywordMap from "@/data/pageKeywords.json";
import { canonicalUrl } from "@/data/business";

// Long-form page copy lives in content/pages, one Markdown file per route:
//   /                        -> content/pages/home.md
//   /services/cooks          -> content/pages/services/cooks.md
//   /services/cooks/lahore   -> content/pages/services/cooks/lahore.md
// Front matter: title, description (meta), answer (short direct answer shown
// at the top), updated (YYYY-MM-DD) and faqs [{ q, a }]. Target keywords for
// each route are in data/pageKeywords.json (from the keyword sheet).

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export interface PageFaq {
  q: string;
  a: string;
}

export interface PageContent {
  route: string;
  title?: string;
  description?: string;
  answer?: string;
  updated: string;
  html: string;
  headings: { id: string; text: string }[];
  faqs: PageFaq[];
  keywords: string[];
  words: number;
}

function fileFor(route: string): string {
  const rel = route === "/" ? "home" : route.replace(/^\//, "");
  return path.join(PAGES_DIR, `${rel}.md`);
}

function withHeadingIds(htmlIn: string) {
  const headings: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const out = htmlIn.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').trim();
    let id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

const cache = new Map<string, PageContent | null>();

export function getPageContent(route: string): PageContent | null {
  if (cache.has(route)) return cache.get(route)!;
  const file = fileFor(route);
  if (!fs.existsSync(file)) {
    cache.set(route, null);
    return null;
  }
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const rendered = remark().use(gfm).use(html, { sanitize: false }).processSync(content).toString();
  const { html: body, headings } = withHeadingIds(rendered);
  const updated = data.updated ? new Date(data.updated).toISOString().slice(0, 10) : "2026-10-02";
  const page: PageContent = {
    route,
    title: data.title,
    description: data.description,
    answer: data.answer,
    updated,
    html: body,
    headings,
    faqs: (data.faqs as PageFaq[] | undefined) ?? [],
    keywords: (keywordMap as Record<string, { keywords: string[] }>)[route]?.keywords ?? [],
    words: content.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length,
  };
  cache.set(route, page);
  return page;
}

/**
 * Metadata for a page: the content file's title/description win, the page's
 * own values are the fallback. Canonical, Open Graph and Twitter stay in sync.
 */
export function pageMetadata(route: string, fallback: Metadata = {}): Metadata {
  const page = getPageContent(route);
  const title = page?.title ?? (fallback.title as string | undefined);
  const description = page?.description ?? fallback.description ?? undefined;
  const images = (fallback.openGraph?.images as string[] | undefined) ?? undefined;
  return {
    ...fallback,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    ...(page?.keywords.length ? { keywords: page.keywords } : {}),
    alternates: { canonical: canonicalUrl(route), ...(fallback.alternates ?? {}) },
    openGraph: { ...(fallback.openGraph ?? {}), ...(title ? { title } : {}), ...(description ? { description } : {}), url: canonicalUrl(route), ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", ...(fallback.twitter ?? {}), ...(title ? { title } : {}), ...(description ? { description } : {}) },
  };
}

/** FAQ items for JSON-LD: the page's own FAQs plus the content file's, without duplicates. */
export function mergedFaqs(route: string, existing: { question: string; answer: string }[] = []) {
  const page = getPageContent(route);
  const seen = new Set(existing.map((f) => f.question.toLowerCase()));
  const extra = (page?.faqs ?? []).filter((f) => !seen.has(f.q.toLowerCase())).map((f) => ({ question: f.q, answer: f.a }));
  return [...existing, ...extra];
}
