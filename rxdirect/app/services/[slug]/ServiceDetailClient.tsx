"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ChevronRight, ArrowRight, MapPin } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { getSalaryForService } from "@/data/salaries";
import { whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import {
  serviceOverviewProcessParagraph,
  serviceOverviewAudienceParagraph,
  serviceOverviewCitiesParagraph,
  serviceOverviewTrustParagraph,
  serviceOverviewFaqs,
} from "@/lib/contentTemplates";

export default function ServiceDetailClient({ service, article }: { service: ServiceCategory; article?: ReactNode }) {
  const { t, locale } = useTranslation();
  const salary = getSalaryForService(service.slug);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const process = serviceOverviewProcessParagraph(service);
  const audience = serviceOverviewAudienceParagraph(service);
  const citiesParagraph = serviceOverviewCitiesParagraph(service);
  const trust = serviceOverviewTrustParagraph(service);
  const faqs = serviceOverviewFaqs(service);

  return (
    <>
      <section className="border-b border-gray-100 bg-brand-50/50">
        <div className="container-px mx-auto max-w-8xl py-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href="/services" className="hover:text-brand-600">{t("nav.services")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <span className="font-medium text-gray-700">{service.name[locale]}</span>
          </nav>
        </div>
      </section>

      <section className="section-py container-px mx-auto grid max-w-8xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-balance text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {service.name[locale]}
          </h1>
          <p className="mt-4 text-balance text-lg text-gray-600">{service.shortDesc[locale]}</p>
          {salary && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              {salary.amount
                ? `PKR ${salary.amount.toLocaleString("en-US")}/${salary.unit === "month" ? (locale === "ur" ? "ماہ" : "mo") : ""}`
                : locale === "ur"
                  ? "فی کام قیمت"
                  : "Priced per job"}
              <span className="text-xs font-normal text-brand-600">{salary.note[locale]}</span>
            </div>
          )}
          <p className="mt-5 leading-relaxed text-gray-600">{service.intro[locale]}</p>
          <a
            href={whatsappLink(`Hi RX Direct, I need to hire ${service.name.en}.`)}
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
            src={service.image}
            alt={service.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto grid max-w-8xl grid-cols-1 gap-10 lg:grid-cols-2">
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
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl space-y-5">
        <p className="leading-relaxed text-gray-600">{audience[locale]}</p>
        <p className="leading-relaxed text-gray-600">{process[locale]}</p>
        <p className="leading-relaxed text-gray-600">{citiesParagraph[locale]}</p>
        <p className="leading-relaxed text-gray-600">{trust[locale]}</p>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading
          title={t("servicesPage.availableCities")}
          subtitle={t("servicesPage.availableCitiesSubtitle", { service: service.name[locale] })}
          center={false}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${service.slug}/${c.slug}`}
              className="group relative flex h-32 flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={c.image}
                alt={c.imageAlt[locale]}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-3.5">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <MapPin className="h-3.5 w-3.5" />
                  {c.name[locale]}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeading title={t("servicesPage.relatedServices")} center={false} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="flex-1 text-sm font-semibold text-gray-900">
                  {s.name[locale]}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-4xl">
        <SectionHeading
          title={t("servicesPage.faqTitle", {
            service: service.name[locale],
            place: locale === "ur" ? "پاکستان" : "Pakistan",
          })}
        />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {article}

      <CTABanner
        title={t("servicesPage.detailCtaTitle", { service: service.name[locale] })}
        subtitle={t("servicesPage.detailCtaSubtitle")}
        buttonLabel={t("common.requestStaff")}
      />
    </>
  );
}
