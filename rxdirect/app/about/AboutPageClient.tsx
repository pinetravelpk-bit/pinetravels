"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Eye, HeartHandshake, Clock, BadgeCheck } from "lucide-react";
import { business } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";

export default function AboutPageClient() {
  const { t } = useTranslation();

  const values = [
    { icon: ShieldCheck, titleKey: "about.value1Title", descKey: "about.value1Desc" },
    { icon: Eye, titleKey: "about.value2Title", descKey: "about.value2Desc" },
    { icon: HeartHandshake, titleKey: "about.value3Title", descKey: "about.value3Desc" },
    { icon: Clock, titleKey: "about.value4Title", descKey: "about.value4Desc" },
  ];

  return (
    <>
      <section className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} />
      </section>

      <section className="container-px mx-auto grid max-w-8xl grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/images/about/team.webp"
            alt="RX Direct team coordinating staff placements"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{t("about.storyTitle")}</h2>
          <p className="mt-4 leading-relaxed text-gray-600">{t("about.story1")}</p>
          <p className="mt-4 leading-relaxed text-gray-600">
            {t("about.story2", { year: business.foundedYear })}
          </p>
        </div>
      </section>

      <section className="section-py bg-brand-700">
        <div className="container-px mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide text-brand-100">
            {t("about.missionTitle")}
          </h2>
          <p className="mt-4 text-balance text-2xl font-extrabold text-white sm:text-3xl">
            {t("about.missionText")}
          </p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-8xl pb-16">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-100 bg-brand-50/60 p-8 text-center sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t("about.registeredBadge")}
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900">{t("about.registeredTitle")}</h2>
          <p className="max-w-2xl leading-relaxed text-gray-600">{t("about.registeredText")}</p>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
          >
            <BadgeCheck className="h-4 w-4" />
            {t("about.registeredCta")}
          </Link>
        </div>
      </section>

      <section className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={t("about.valuesTitle")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.titleKey} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-gray-900">{t(v.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(v.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-8xl pb-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="eyebrow">{t("teamPage.eyebrow")}</p>
            <p className="mt-2 text-xl font-extrabold text-navy">{t("teamPage.title")}</p>
          </div>
          <Link href="/team" className="btn-primary">
            {t("menu.team")}
          </Link>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
