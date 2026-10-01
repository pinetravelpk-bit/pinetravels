"use client";

import { IdCard, UserCheck, Handshake, Briefcase, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";

export default function JobsPageClient() {
  const { t } = useTranslation();

  const steps = [
    { icon: IdCard, descKey: "howItWorksPage.staffStep1" },
    { icon: UserCheck, descKey: "howItWorksPage.staffStep2" },
    { icon: Handshake, descKey: "howItWorksPage.staffStep3" },
    { icon: Briefcase, descKey: "howItWorksPage.staffStep4" },
  ];

  const requirements = [
    t("jobsPage.requirement1"),
    t("jobsPage.requirement2"),
    t("jobsPage.requirement3"),
  ];

  return (
    <>
      <section className="section-py container-px mx-auto max-w-3xl">
        <SectionHeading title={t("jobsPage.title")} subtitle={t("jobsPage.subtitle")} />
        <p className="mt-8 leading-relaxed text-gray-600">{t("jobsPage.intro")}</p>

        <h2 className="mt-12 text-center text-xl font-extrabold text-gray-900">
          {t("jobsPage.howTitle")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.descKey} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-sm">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">{t(step.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">{t("jobsPage.requirementsTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 rounded-3xl bg-brand-700 p-8 text-center sm:p-10">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            {t("jobsPage.ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-brand-50/90">
            {t("jobsPage.ctaSubtitle")}
          </p>
          <a
            href={whatsappLink("Hi RX Direct, I'd like to apply to join your staff roster.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-sm transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("common.whatsappUs")}
          </a>
        </div>
      </section>
    </>
  );
}
