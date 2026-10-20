// URL scheme for the three languages. English pages keep their URLs; the main
// pages also exist in Urdu script under /urdu and in Roman Urdu under
// /roman-urdu, e.g. /services/cooks, /urdu/services/cooks, /roman-urdu/services/cooks.
import { canonicalUrl } from "@/data/business";

export type Locale = "en" | "ur" | "roman";
export const LOCALES: Locale[] = ["en", "ur", "roman"];

export const LOCALE_PREFIX: Record<Locale, string> = { en: "", ur: "/urdu", roman: "/roman-urdu" };
// <html lang> and hreflang codes. Roman Urdu is Urdu written in Latin script.
export const HTML_LANG: Record<Locale, string> = { en: "en", ur: "ur", roman: "ur-Latn" };

// English routes that have Urdu and Roman Urdu versions.
const LOCALIZED: RegExp[] = [
  /^\/$/,
  /^\/hire-staff$/,
  /^\/services$/,
  /^\/services\/(?!category$)[a-z-]+$/,
  /^\/cities$/,
  /^\/cities\/[a-z-]+$/,
  /^\/contact$/,
  /^\/about$/,
  /^\/how-it-works$/,
  /^\/faqs$/,
  /^\/jobs$/,
  /^\/pricing$/,
];

export const isLocalized = (path: string) => LOCALIZED.some((r) => r.test(path));

/** Splits a pathname into its locale and the English route it shows. */
export function parseLocalePath(pathname: string): { locale: Locale; route: string } {
  for (const locale of ["ur", "roman"] as const) {
    const prefix = LOCALE_PREFIX[locale];
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return { locale, route: pathname.slice(prefix.length) || "/" };
    }
  }
  return { locale: "en", route: pathname || "/" };
}

/** The path of an English route in a locale (the route itself if it has no translation). */
export function localePath(route: string, locale: Locale): string {
  if (locale === "en" || !isLocalized(route)) return route;
  return LOCALE_PREFIX[locale] + (route === "/" ? "" : route);
}

/** Rewrites an internal href for the current locale, keeping query and hash. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  return localePath(m[1] || "/", locale) + m[2];
}

/** hreflang alternates for a localized English route, for Next metadata. */
export function languageAlternates(route: string) {
  if (!isLocalized(route)) return undefined;
  return {
    en: canonicalUrl(route),
    ur: canonicalUrl(localePath(route, "ur")),
    "ur-Latn": canonicalUrl(localePath(route, "roman")),
    "x-default": canonicalUrl(route),
  };
}
