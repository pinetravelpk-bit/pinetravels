"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ServiceCard({ service }: { service: ServiceCategory }) {
  const { t, locale } = useTranslation();

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-navy">{service.name[locale]}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-600">{service.shortDesc[locale]}</p>
        <span className="link-arrow mt-4">
          {t("redesign.viewService")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
