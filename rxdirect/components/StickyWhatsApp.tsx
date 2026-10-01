"use client";

import { whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/LanguageContext";

export default function StickyWhatsApp() {
  const { t } = useTranslation();
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      aria-label={t("common.whatsappUs")}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">{t("common.whatsappUs")}</span>
    </a>
  );
}
