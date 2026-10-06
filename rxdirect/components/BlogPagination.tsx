"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export const blogPageHref = (page: number) => (page <= 1 ? "/blog" : `/blog/page/${page}`);

// First, last and the pages around the current one, with gaps as null.
function pageList(current: number, total: number): (number | null)[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(null);
    out.push(p);
  });
  return out;
}

export default function BlogPagination({ page, pageCount }: { page: number; pageCount: number }) {
  const { t } = useTranslation();
  if (pageCount <= 1) return null;

  const base =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors";
  const idle = `${base} border border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:text-brand-700`;

  return (
    <nav aria-label={t("blogPage.pagination")} className="mt-12 flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <Link href={blogPageHref(page - 1)} rel="prev" className={idle}>
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            <span className="hidden sm:inline">{t("blogPage.previous")}</span>
          </Link>
        )}
        {pageList(page, pageCount).map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className="px-1 text-gray-400">
              …
            </span>
          ) : p === page ? (
            <span key={p} aria-current="page" className={`${base} bg-brand-600 text-white`}>
              {p}
            </span>
          ) : (
            <Link key={p} href={blogPageHref(p)} className={idle}>
              {p}
            </Link>
          )
        )}
        {page < pageCount && (
          <Link href={blogPageHref(page + 1)} rel="next" className={idle}>
            <span className="hidden sm:inline">{t("blogPage.next")}</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        )}
      </div>
      <p className="text-xs text-gray-500">
        {t("blogPage.pageOf", { page: String(page), total: String(pageCount) })}
      </p>
    </nav>
  );
}
