import romanData from "./roman-data.json";
import type { Locale } from "@/lib/i18nRoutes";

// Plain module (not "use client"), so server pages can use pick() too.
const romanText = romanData as Record<string, string>;
const toRoman = (s: string) => romanText[s] ?? s;

type Localized<T> = { en: T; ur: T; roman?: T };

/** Picks a data field ({ en, ur }) for the locale. Roman Urdu uses the
 *  field's own `roman` value, else the translation of its English text in
 *  roman-data.json, else the English text. */
export function pick<T extends string | readonly string[]>(value: Localized<T>, locale: Locale): T;
export function pick<T extends string | readonly string[]>(value: Localized<T> | undefined, locale: Locale): T | undefined;
export function pick<T extends string | readonly string[]>(value: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  if (locale !== "roman") return value[locale];
  if (value.roman !== undefined) return value.roman;
  const en = value.en;
  return (typeof en === "string" ? toRoman(en) : (en as readonly string[]).map(toRoman)) as T;
}

