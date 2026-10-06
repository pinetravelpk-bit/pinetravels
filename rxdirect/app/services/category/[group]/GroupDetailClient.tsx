"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ServiceGroup } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export default function GroupDetailClient({ group, article }: { group: ServiceGroup; article?: ReactNode }) {
  const { t, locale } = useTranslation();
  const groupServices = services.filter((s) => group.serviceSlugs.includes(s.slug));

  return (
    <>
      <section className="border-b border-gray-100 bg-brand-50/50">
        <div className="container-px mx-auto max-w-8xl py-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href="/services" className="hover:text-brand-600">{t("nav.services")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <span className="font-medium text-gray-700">{group.name[locale]}</span>
          </nav>
        </div>
      </section>

      <div className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={group.name[locale]} subtitle={group.shortDesc[locale]} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groupServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            {t("nav.viewAllServices")}
          </Link>
        </div>
      </div>
      {article}

      <CTABanner />
    </>
  );
}
