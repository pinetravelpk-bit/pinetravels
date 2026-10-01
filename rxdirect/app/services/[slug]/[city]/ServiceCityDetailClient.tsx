"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { services } from "@/data/services";
import type { City } from "@/data/cities";
import { cities } from "@/data/cities";
import { whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import {
  serviceCityIntroParagraph,
  trustParagraph,
  processParagraph,
  audienceParagraph,
  serviceCityFaqs,
} from "@/lib/contentTemplates";

export default function ServiceCityDetailClient({
  service,
  city,
}: {
  service: ServiceCategory;
  city: City;
}) {
  const { t, locale } = useTranslation();
  const otherCities = cities.filter((c) => c.slug !== city.slug);
  const introParagraph = serviceCityIntroParagraph(service, city);
  const trust = trustParagraph(service, city.name.en, city.name.ur);
  const process = processParagraph(service, city.name.en, city.name.ur);
  const audience = audienceParagraph(service, city.name.en, city.name.ur);
  const faqs = serviceCityFaqs(service, city);

  return (
    <>
      <section className="border-b border-gray-100 bg-brand-50/50">
        <div className="container-px mx-auto max-w-8xl py-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href="/services" className="hover:text-brand-600">{t("nav.services")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href={`/services/${service.slug}`} className="hover:text-brand-600">
              {service.name[locale]}
            </Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <span className="font-medium text-gray-700">{city.name[locale]}</span>
          </nav>
        </div>
      </section>

      <section className="section-py container-px mx-auto grid max-w-8xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-balance text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {service.name[locale]} in {city.name[locale]}
          </h1>
          <p className="mt-4 text-balance text-lg text-gray-600">{service.shortDesc[locale]}</p>
          <p className="mt-5 leading-relaxed text-gray-600">{city.intro[locale]}</p>
          <p className="mt-4 leading-relaxed text-gray-600">{introParagraph[locale]}</p>
          <a
            href={whatsappLink(
              `Hi RX Direct, I need to hire ${service.name.en} in ${city.name.en}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("common.requestStaff")}
          </a>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src={city.image}
            alt={city.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="section-py container-px mx-auto grid max-w-8xl grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <CheckCircle2 className="h-5 w-5 text-brand-600" />
            {t("servicesPage.keyBenefits")}
          </h2>
          <ul className="mt-5 space-y-3">
            {service.benefits[locale].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            {t("servicesPage.whatWeCheck")}
          </h2>
          <ul className="mt-5 space-y-3">
            {service.checks[locale].map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl space-y-5">
        <p className="leading-relaxed text-gray-600">{audience[locale]}</p>
        <p className="leading-relaxed text-gray-600">{process[locale]}</p>
        <p className="leading-relaxed text-gray-600">{trust[locale]}</p>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeading
            title={t("servicesPage.areasInCity", { city: city.name[locale] })}
            subtitle={t("servicesPage.areasInCitySubtitle", {
              city: city.name[locale],
              service: service.name[locale],
            })}
            center={false}
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {city.societies.map((society) => (
              <Link
                key={society.slug}
                href={`/services/${service.slug}/${city.slug}/${society.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-base font-bold text-gray-900">
                  {service.name[locale]} in {society.name[locale]}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-600">
                  {society.shortDesc[locale]}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {t("common.learnMore")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={t("servicesPage.otherServicesInCity", { city: city.name[locale] })} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="mt-3 text-sm font-bold text-gray-900">{s.name[locale]}</span>
              </Link>
            ))}
        </div>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeading title={t("servicesPage.otherCitiesForService", { service: service.name[locale] })} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${service.slug}/${c.slug}`}
                className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={c.image}
                  alt={c.imageAlt[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 p-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <MapPin className="h-4 w-4" />
                    {c.name[locale]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {t("servicesPage.title")}
            </Link>
            <Link
              href={`/cities/${city.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {t("citiesPage.viewCityOverview", { city: city.name[locale] })}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-4xl">
        <SectionHeading
          title={t("servicesPage.faqTitle", { service: service.name[locale], place: city.name[locale] })}
        />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner
        title={t("servicesPage.serviceCityCtaTitle", {
          service: service.name[locale],
          city: city.name[locale],
        })}
        subtitle={t("servicesPage.detailCtaSubtitle")}
        buttonLabel={t("common.requestStaff")}
      />
    </>
  );
}
