"use client";

import { MessageCircle, ListChecks, Users2, CheckCircle2, IdCard, UserCheck, Handshake, Briefcase } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";

export default function HowItWorksPageClient() {
  const { t } = useTranslation();

  const clientSteps = [
    { icon: MessageCircle, titleKey: "home.how1Title", descKey: "home.how1Desc" },
    { icon: ListChecks, titleKey: "home.how2Title", descKey: "home.how2Desc" },
    { icon: Users2, titleKey: "home.how3Title", descKey: "home.how3Desc" },
    { icon: CheckCircle2, titleKey: "home.how4Title", descKey: "home.how4Desc" },
  ];

  const staffSteps = [
    { icon: IdCard, descKey: "howItWorksPage.staffStep1" },
    { icon: UserCheck, descKey: "howItWorksPage.staffStep2" },
    { icon: Handshake, descKey: "howItWorksPage.staffStep3" },
    { icon: Briefcase, descKey: "howItWorksPage.staffStep4" },
  ];

  return (
    <>
      <section className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading
          title={t("howItWorksPage.title")}
          subtitle={t("howItWorksPage.subtitle")}
        />
      </section>

      <section className="pb-16">
        <div className="container-px mx-auto max-w-8xl">
          <h2 className="text-center text-xl font-extrabold text-gray-900 sm:text-2xl">
            {t("howItWorksPage.clientTitle")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {clientSteps.map((step, i) => (
              <div key={step.titleKey} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-sm">
                  <step.icon className="h-7 w-7" />
                </div>
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-gray-900">{t(step.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50">
        <div className="container-px mx-auto max-w-8xl">
          <h2 className="text-center text-xl font-extrabold text-gray-900 sm:text-2xl">
            {t("howItWorksPage.staffTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-gray-600">
            {t("howItWorksPage.staffIntro")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {staffSteps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-600 shadow-md">
                  <step.icon className="h-7 w-7" />
                </div>
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-700">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
