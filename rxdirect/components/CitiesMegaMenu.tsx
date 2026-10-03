"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";

export default function CitiesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { t, locale } = useTranslation();
  const [activeCity, setActiveCity] = useState(cities[0].slug);
  const city = cities.find((c) => c.slug === activeCity) ?? cities[0];

  return (
    <div className="absolute left-1/2 top-full z-50 mt-2 flex w-[620px] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      <div className="w-52 shrink-0 border-r border-gray-100 bg-gray-50/60 p-3">
        <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t("nav.citiesTagline")}
        </p>
        {cities.map((c) => {
          const isActive = c.slug === activeCity;
          return (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
              onMouseEnter={() => setActiveCity(c.slug)}
              onFocus={() => setActiveCity(c.slug)}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "bg-white text-brand-700 shadow-sm" : "text-gray-600 hover:bg-white/70"
              }`}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              {c.name[locale]}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 p-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t("citiesPage.societiesSubtitle", { city: city.name[locale] })}
        </p>
        <div className="grid grid-cols-2 gap-1">
          {city.societies.map((s) => (
            <Link
              key={s.slug}
              href={`/cities/${city.slug}/${s.slug}`}
              onClick={onNavigate}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700"
            >
              {s.name[locale]}
            </Link>
          ))}
        </div>
        <Link
          href={`/cities/${city.slug}`}
          onClick={onNavigate}
          className="mt-3 block rounded-xl bg-gray-50 px-3 py-2.5 text-center text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {t("citiesPage.viewCityOverview", { city: city.name[locale] })}
        </Link>
      </div>
    </div>
  );
}
