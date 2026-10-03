"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import { whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/LanguageContext";

// Desktop: floating WhatsApp button. Phones: a fixed bottom bar with
// Hire Staff and WhatsApp (the call icon stays in the header).
export default function StickyWhatsApp() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const onHirePage = pathname === "/hire-staff";
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 lg:flex"
        aria-label={t("common.whatsappUs")}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>{t("common.whatsappUs")}</span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_16px_rgba(11,31,77,0.08)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/hire-staff"
            aria-current={onHirePage ? "page" : undefined}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-3 text-sm font-bold text-white active:bg-brand-700"
          >
            <UserPlus className="h-5 w-5" />
            {t("redesign.hireStaff")}
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-bold text-white active:bg-[#1ebe5b]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
