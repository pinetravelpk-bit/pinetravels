"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Clock, MapPin, Phone, RefreshCcw, ShieldCheck, Building2 } from "lucide-react";
import BlogHireForm from "@/components/BlogHireForm";
import { business, telLink } from "@/data/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";

// /hire-staff: the page behind every "Hire Staff" button. Service and city can be
// pre-filled with ?service=cooks&city=lahore (slugs).
export default function HireStaffClient() {
  const { t, locale } = useTranslation();
  const [prefill, setPrefill] = useState<{ service: string[]; city: string[]; key: string }>({ service: [], city: [], key: "blank" });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = q.get("service") ?? "";
    const city = (q.get("city") ?? "").toLowerCase();
    const s = services.some((x) => x.slug === service) ? [service] : [];
    const c = cities.some((x) => x.slug === city) ? [city] : [];
    if (s.length || c.length) setPrefill({ service: s, city: c, key: `${s[0] ?? ""}-${c[0] ?? ""}` });
  }, []);

  const steps = [t("hirePage.step1"), t("hirePage.step2"), t("hirePage.step3"), t("hirePage.step4")];
  const why = [
    { icon: Building2, text: t("hirePage.why1") },
    { icon: ShieldCheck, text: t("hirePage.why2") },
    { icon: RefreshCcw, text: t("hirePage.why3") },
    { icon: BadgeCheck, text: t("hirePage.why4") },
  ];

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-px mx-auto max-w-8xl py-12 text-center lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">{t("hirePage.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t("hirePage.title")}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">{t("hirePage.subtitle")}</p>
        </div>
      </section>

      <section className="container-px mx-auto -mt-6 max-w-8xl pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BlogHireForm
              key={prefill.key}
              serviceSlugs={prefill.service}
              citySlugs={prefill.city}
              source="Hire Staff page"
              sourceUrl="/hire-staff"
            />
          </div>

          <aside className="space-y-6 lg:col-span-2 lg:pt-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-navy">{t("hirePage.howTitle")}</h2>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                    <span className="text-sm text-gray-700">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-navy">{t("hirePage.whyTitle")}</h2>
              <ul className="mt-4 space-y-3">
                {why.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-50 p-6">
              <h2 className="text-lg font-extrabold text-navy">{t("hirePage.officeTitle")}</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {business.address[locale]}
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <a href={telLink()} className="font-semibold text-brand-700" dir="ltr">
                    {business.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {t("hirePage.hours")}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
