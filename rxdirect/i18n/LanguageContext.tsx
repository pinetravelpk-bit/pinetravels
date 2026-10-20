"use client";

import { createContext, useContext, ReactNode } from "react";
import en from "./en.json";
import ur from "./ur.json";
import roman from "./roman.json";
import type { Locale } from "@/lib/i18nRoutes";

export type { Locale };
// Re-exported so client components can import everything from one place.
export { pick } from "./pick";

const dictionaries: Record<Locale, Record<string, unknown>> = { en, ur, roman };

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// The language comes from the URL (/, /urdu, /roman-urdu): each root layout
// passes its own locale, so every page is rendered in its language up front.
export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ locale, dir: locale === "ur" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function useTranslation() {
  const { locale } = useLanguage();

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const value = getNested(dictionaries[locale], key);
    const enValue = getNested(dictionaries.en, key);
    let str = typeof value === "string" ? value : typeof enValue === "string" ? enValue : key;
    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };

  return { t, locale };
}
