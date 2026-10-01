"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Phone, Users } from "lucide-react";
import { business, telLink, whatsappLink } from "@/data/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { WhatsAppIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/LanguageContext";
import { heroImage } from "@/data/siteImages";

const collageSlugs = ["cooks", "nurses", "drivers", "office-boys"];

export default function Hero() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");

  const collage = collageSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Every role+city pair already has its own page (/services/cooks/lahore),
  // so the search just routes to the most specific existing page.
  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (role && city) router.push(`/services/${role}/${city}`);
    else if (role) router.push(`/services/${role}`);
    else if (city) router.push(`/cities/${city}`);
    else router.push("/services");
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100/60">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="container-px relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-10 pb-28 pt-10 lg:grid-cols-[1fr_1fr] lg:pb-28 lg:pt-12">
        <div>
          <p className="eyebrow">{t("redesign.heroEyebrow")}</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight rtl:leading-[1.7] text-navy sm:text-5xl lg:text-[3.4rem]">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base text-gray-600 sm:text-lg rtl:leading-loose">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn-primary px-6 py-3.5">
              <Users className="h-5 w-5" />
              {t("redesign.findYourStaff")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-6 py-3.5">
              <WhatsAppIcon className="h-5 w-5" />
              {t("redesign.whatsappUs")}
            </a>
          </div>
          <a href={telLink()} className="mt-6 inline-flex items-center gap-3 text-lg font-bold text-navy hover:text-brand-600">
            <Phone className="h-5 w-5" />
            <span dir="ltr">{business.phoneDisplay}</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {collage.map((s, i) => (
              <div
                key={s.slug}
                className={`relative overflow-hidden shadow-lg ${
                  i === 0
                    ? "h-44 rounded-[1.75rem] rounded-tl-[4rem] sm:h-56 lg:h-60"
                    : i === 1
                    ? "mt-8 h-44 rounded-[1.75rem] rounded-tr-[4rem] sm:h-56 lg:h-60"
                    : i === 2
                    ? "-mt-8 h-44 rounded-[1.75rem] rounded-bl-[4rem] sm:h-56 lg:h-60"
                    : "h-44 rounded-[1.75rem] rounded-br-[4rem] sm:h-56 lg:h-60"
                }`}
              >
                <Image
                  src={i === 0 ? heroImage.src : s.image}
                  alt={i === 0 ? heroImage.alt : s.imageAlt[locale]}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-4 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-6 rtl:left-2 rtl:right-auto">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-extrabold leading-none text-navy">{t("home.heroStat1Value")}</p>
              <p className="mt-1 text-xs text-gray-600">{t("redesign.heroBadge")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search card overlapping the bottom of the hero */}
      <div className="container-px relative mx-auto -mt-20 max-w-6xl pb-6">
        <form
          onSubmit={onSearch}
          className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(11,31,77,0.35)] md:grid-cols-[1fr_1fr_auto] md:items-end md:p-6"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-navy">{t("redesign.whoDoYouNeed")}</span>
            <span className="relative block">
              <Users className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rtl:pl-4 rtl:pr-11"
              >
                <option value="">{t("redesign.selectRole")}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name[locale]}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-navy">{t("redesign.selectCity")}</span>
            <span className="relative block">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rtl:pl-4 rtl:pr-11"
              >
                <option value="">{t("redesign.selectCity")}</option>
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <button type="submit" className="btn-primary h-[46px] px-10 text-base">
            {t("redesign.findStaff")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </section>
  );
}
