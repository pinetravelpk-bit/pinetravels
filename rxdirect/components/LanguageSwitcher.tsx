"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold ${
        className ?? ""
      }`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en"
            ? "bg-brand-600 text-white"
            : "text-gray-600 hover:text-brand-600"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ur")}
        className={`rounded-full px-2.5 py-1 transition-colors font-urdu ${
          locale === "ur"
            ? "bg-brand-600 text-white"
            : "text-gray-600 hover:text-brand-600"
        }`}
        aria-pressed={locale === "ur"}
      >
        اردو
      </button>
    </div>
  );
}
