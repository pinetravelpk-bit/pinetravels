"use client";

import { MessageCircle, ListChecks, Users2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { icon: MessageCircle, titleKey: "home.how1Title", descKey: "home.how1Desc" },
    { icon: ListChecks, titleKey: "home.how2Title", descKey: "home.how2Desc" },
    { icon: Users2, titleKey: "home.how3Title", descKey: "home.how3Desc" },
    { icon: CheckCircle2, titleKey: "home.how4Title", descKey: "home.how4Desc" },
  ];

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-8xl">
        <SectionHeading center={false} eyebrow={t("redesign.howEyebrow")} title={t("home.howTitle")} subtitle={t("home.howSubtitle")} />
        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.titleKey} className="relative flex gap-4">
              {i < steps.length - 1 && (
                <span className="absolute left-14 right-0 top-5 hidden h-px bg-brand-200 lg:block rtl:left-0 rtl:right-14" aria-hidden />
              )}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <div className="pt-1">
                <step.icon className="h-7 w-7 text-navy" />
                <h3 className="mt-3 text-base font-bold text-navy">{t(step.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t(step.descKey)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
