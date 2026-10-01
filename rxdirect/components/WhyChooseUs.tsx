"use client";

import { ShieldCheck, Zap, RefreshCcw, BadgeDollarSign } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const items = [
    { icon: ShieldCheck, titleKey: "home.why1Title", descKey: "home.why1Desc" },
    { icon: Zap, titleKey: "home.why2Title", descKey: "home.why2Desc" },
    { icon: RefreshCcw, titleKey: "home.why3Title", descKey: "home.why3Desc" },
    { icon: BadgeDollarSign, titleKey: "home.why4Title", descKey: "home.why4Desc" },
  ];

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-8xl">
        <SectionHeading center={false} title={t("home.whyTitle")} subtitle={t("home.whySubtitle")} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.titleKey} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-navy">{t(item.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
