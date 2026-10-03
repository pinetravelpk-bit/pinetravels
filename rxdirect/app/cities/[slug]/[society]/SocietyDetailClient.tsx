"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { City, Society } from "@/data/cities";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import SocietyCard from "@/components/SocietyCard";
import FAQAccordion from "@/components/FAQAccordion";
import {
  societyProcessParagraph,
  societyAudienceParagraph,
  societyServicesParagraph,
  societyTrustParagraph,
  societyFaqs,
} from "@/lib/contentTemplates";

export default function SocietyDetailClient({
  city,
  society,
}: {
  city: City;
  society: Society;
}) {
  const { t, locale } = useTranslation();
  const otherSocieties = city.societies.filter((s) => s.slug !== society.slug);
  const process = societyProcessParagraph(city, society);
  const audience = societyAudienceParagraph(city, society);
  const servicesParagraph = societyServicesParagraph(city, society);
  const trust = societyTrustParagraph(city, society);
  const faqs = societyFaqs(city, society);

  return (
    <>
      <section className="border-b border-gray-100 bg-brand-50/50">
        <div className="container-px mx-auto max-w-8xl py-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href="/cities" className="hover:text-brand-600">{t("nav.cities")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href={`/cities/${city.slug}`} className="hover:text-brand-600">
              {city.name[locale]}
            </Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <span className="font-medium text-gray-700">{society.name[locale]}</span>
          </nav>
        </div>
      </section>

      <section className="relative">
        <div className="relative h-56 w-full sm:h-72">
          <Image
            src={city.image}
            alt={city.imageAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-px mx-auto -mt-16 max-w-8xl">
          <div className="relative rounded-3xl bg-white p-7 shadow-xl sm:p-10">
            <h1 className="flex items-center gap-2 text-balance text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
              <MapPin className="h-7 w-7 shrink-0 text-brand-600" />
              {t("citiesPage.aboutCity", { city: society.name[locale] })}
            </h1>
            <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
              {society.intro[locale]}
            </p>
            <a
              href={whatsappLink(
                `Hi RX Direct, I'm looking for domestic staff in ${society.name.en}, ${city.name.en}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t("common.requestStaff")}
            </a>
          </div>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl space-y-5">
        <p className="leading-relaxed text-gray-600">{audience[locale]}</p>
        <p className="leading-relaxed text-gray-600">{process[locale]}</p>
        <p className="leading-relaxed text-gray-600">{servicesParagraph[locale]}</p>
        <p className="leading-relaxed text-gray-600">{trust[locale]}</p>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeading
            title={t("citiesPage.servicesInCity", { city: society.name[locale] })}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}/${society.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="mt-3 text-sm font-bold text-gray-900">{s.name[locale]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {otherSocieties.length > 0 && (
        <section className="section-py container-px mx-auto max-w-8xl">
          <SectionHeading
            title={t("citiesPage.otherSocieties", { city: city.name[locale] })}
            center={false}
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherSocieties.map((s) => (
              <SocietyCard key={s.slug} citySlug={city.slug} society={s} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={`/cities/${city.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {t("citiesPage.viewCityOverview", { city: city.name[locale] })}
            </Link>
          </div>
        </section>
      )}

      <section className="section-py container-px mx-auto max-w-4xl">
        <SectionHeading title={t("citiesPage.faqTitle", { city: society.name[locale] })} />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner
        title={t("citiesPage.societyCtaTitle", { place: society.name[locale] })}
        subtitle={t("servicesPage.detailCtaSubtitle")}
        buttonLabel={t("common.requestStaff")}
      />
    </>
  );
}
