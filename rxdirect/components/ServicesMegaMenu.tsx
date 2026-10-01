"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2 } from "lucide-react";
import { serviceGroups } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";
import { ServiceIcon } from "@/components/icons";

const groupIcon = { "household-staff": Home, "office-security-staff": Building2 } as const;

export default function ServicesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { t, locale } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(serviceGroups[0].slug);
  const group = serviceGroups.find((g) => g.slug === activeGroup) ?? serviceGroups[0];
  const groupServices = services.filter((s) => group.serviceSlugs.includes(s.slug));

  return (
    <div className="absolute left-1/2 top-full z-50 mt-2 flex w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      <div className="w-56 shrink-0 border-r border-gray-100 bg-gray-50/60 p-3">
        <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t("nav.servicesTagline")}
        </p>
        {serviceGroups.map((g) => {
          const Icon = groupIcon[g.slug as keyof typeof groupIcon] ?? Home;
          const isActive = g.slug === activeGroup;
          return (
            <Link
              key={g.slug}
              href={`/services/category/${g.slug}`}
              onMouseEnter={() => setActiveGroup(g.slug)}
              onFocus={() => setActiveGroup(g.slug)}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "bg-white text-brand-700 shadow-sm" : "text-gray-600 hover:bg-white/70"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {g.name[locale]}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-1">
          {groupServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={onNavigate}
              className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-brand-50"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  {s.name[locale]}
                </span>
                <span className="line-clamp-1 block text-xs text-gray-500">
                  {s.shortDesc[locale]}
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          onClick={onNavigate}
          className="mt-3 block rounded-xl bg-gray-50 px-3 py-2.5 text-center text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {t("nav.viewAllServices")}
        </Link>
      </div>
    </div>
  );
}
