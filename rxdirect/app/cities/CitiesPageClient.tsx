"use client";

import type { ReactNode } from "react";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import CityCard from "@/components/CityCard";
import CTABanner from "@/components/CTABanner";

export default function CitiesPageClient({ article }: { article?: ReactNode } = {}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={t("citiesPage.title")} subtitle={t("citiesPage.subtitle")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <CityCard key={c.slug} city={c} />
          ))}
        </div>
      </div>
      {article}

      <CTABanner />
    </>
  );
}
