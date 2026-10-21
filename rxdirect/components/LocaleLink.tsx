"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { localizeHref } from "@/lib/i18nRoutes";

// next/link that keeps visitors in their language: on /urdu and /roman-urdu
// pages, links to pages that have a translation point at the translated URL.
export default function LocaleLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useLanguage();
  return <NextLink href={typeof href === "string" ? localizeHref(href, locale) : href} {...props} />;
}
