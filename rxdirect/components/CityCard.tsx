"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { City } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";

export default function CityCard({ city, compact = false }: { city: City; compact?: boolean }) {
  const { locale } = useTranslation();

  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`relative w-full overflow-hidden ${compact ? "h-36" : "h-48"}`}>
        <Image
          src={city.image}
          alt={city.imageAlt[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-700">
          {city.name[locale]}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
        </h3>
        {!compact && <p className="mt-1.5 line-clamp-2 text-sm text-gray-600">{city.shortDesc[locale]}</p>}
      </div>
    </Link>
  );
}
