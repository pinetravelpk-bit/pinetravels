"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { isLocalized, localePath, LOCALE_PREFIX, parseLocalePath, type Locale } from "@/lib/i18nRoutes";

const OPTIONS: { locale: Locale; label: string; title: string; className?: string }[] = [
  { locale: "en", label: "EN", title: "English" },
  { locale: "ur", label: "اردو", title: "اردو", className: "font-urdu" },
  { locale: "roman", label: "Roman", title: "Roman Urdu" },
];

// Each language lives at its own URL, so the switcher links to the same page
// in the other language (or that language's home page when the page has no
// translation, e.g. a blog post).
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const { route } = parseLocalePath(usePathname() || "/");
  const hrefFor = (l: Locale) =>
    l === "en" ? route : isLocalized(route) ? localePath(route, l) : LOCALE_PREFIX[l];

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold ${className ?? ""}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((o) => (
        <Link
          key={o.locale}
          href={hrefFor(o.locale)}
          hrefLang={o.locale === "roman" ? "ur-Latn" : o.locale}
          title={o.title}
          aria-current={locale === o.locale ? "page" : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${o.className ?? ""} ${
            locale === o.locale ? "bg-brand-600 text-white" : "text-gray-600 hover:text-brand-600"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
