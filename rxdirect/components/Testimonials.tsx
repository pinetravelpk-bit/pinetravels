"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

export default function Testimonials() {
  const { t, locale } = useTranslation();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-8xl">
        <SectionHeading
          title={t("home.testimonialsTitle")}
          subtitle={t("home.testimonialsSubtitle")}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
            >
              <Quote className="h-6 w-6 text-brand-300" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                &ldquo;{item.quote[locale]}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.role[locale]} &middot; {item.city[locale]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
