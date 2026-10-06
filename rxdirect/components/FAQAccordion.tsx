"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/faqs";
import { useTranslation } from "@/i18n/LanguageContext";

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const { locale } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-gray-900 sm:text-base">
                {item.question[locale]}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                {item.answer[locale]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
