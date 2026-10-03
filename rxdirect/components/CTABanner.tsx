"use client";

import { Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/LanguageContext";

export default function CTABanner({
  title,
  subtitle,
  buttonLabel,
}: {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container-px relative mx-auto flex max-w-8xl flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div>
          <h2 className="text-balance text-2xl font-extrabold text-white sm:text-3xl">
            {title ?? t("redesign.ctaTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-balance text-brand-100">
            {subtitle ?? t("redesign.ctaSubtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={telLink()} className="btn-primary px-6 py-3.5">
            <Phone className="h-5 w-5" />
            <span>{t("redesign.callUs")}</span>
            <span dir="ltr">{business.phoneDisplay}</span>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {buttonLabel ?? `${t("redesign.whatsappUs")}`}
          </a>
        </div>
      </div>
    </section>
  );
}
