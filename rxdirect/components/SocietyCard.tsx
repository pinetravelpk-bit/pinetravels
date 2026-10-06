"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Society } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";

export default function SocietyCard({
  citySlug,
  society,
}: {
  citySlug: string;
  society: Society;
}) {
  const { t, locale } = useTranslation();

  return (
    <Link
      href={`/cities/${citySlug}/${society.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <MapPin className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-base font-bold text-gray-900">{society.name[locale]}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-600">
        {society.shortDesc[locale]}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        {t("common.learnMore")}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </span>
    </Link>
  );
}
