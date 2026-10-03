"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface MegaItem {
  href: string;
  title: string;
  desc?: string;
  icon: LucideIcon;
}

export interface MegaColumn {
  heading: string;
  items: MegaItem[];
}

// Mega menu built from columns of icon links plus a highlighted call-to-action
// card. Used for "For Businesses" and "About Us"; Services and Locations have
// their own richer menus.
export default function LinkMegaMenu({
  columns,
  feature,
  onNavigate,
  align = "center",
}: {
  columns: MegaColumn[];
  feature: { eyebrow: string; title: string; text: string; href: string; cta: string };
  onNavigate: () => void;
  align?: "center" | "right";
}) {
  return (
    <div
      className={`absolute top-full z-50 mt-2 flex w-[720px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl ${
        align === "right" ? "right-0 rtl:left-0 rtl:right-auto" : "left-1/2 -translate-x-1/2"
      }`}
    >
      <div className={`grid flex-1 gap-2 p-4 ${columns.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {columns.map((col) => (
          <div key={col.heading}>
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{col.heading}</p>
            {col.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-brand-50"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">{item.title}</span>
                  {item.desc && <span className="line-clamp-2 block text-xs text-gray-500">{item.desc}</span>}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-56 shrink-0 flex-col justify-between bg-navy p-5 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-300">{feature.eyebrow}</p>
          <p className="mt-2 text-lg font-extrabold leading-snug">{feature.title}</p>
          <p className="mt-2 text-sm text-brand-100">{feature.text}</p>
        </div>
        <Link href={feature.href} onClick={onNavigate} className="btn-primary mt-5 w-full">
          {feature.cta}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
