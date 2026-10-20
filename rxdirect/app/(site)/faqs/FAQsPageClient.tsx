"use client";

import type { ReactNode } from "react";
import { faqs } from "@/data/faqs";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import CTABanner from "@/components/CTABanner";

export default function FAQsPageClient({ article }: { article?: ReactNode } = {}) {
  const { t } = useTranslation();

  return (
    <>
      <section className="section-py container-px mx-auto max-w-3xl">
        <SectionHeading title={t("faqsPage.title")} subtitle={t("faqsPage.subtitle")} />
        <div className="mt-12">
          <FAQAccordion items={faqs} />
        </div>
      </section>
      {article}

      <CTABanner />
    </>
  );
}
