"use client";

import type { ReactNode } from "react";
import { services } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export default function ServicesPageClient({ article }: { article?: ReactNode } = {}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={t("servicesPage.title")} subtitle={t("servicesPage.subtitle")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
      {article}

      <CTABanner />
    </>
  );
}
