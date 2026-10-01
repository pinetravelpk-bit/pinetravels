"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPostMeta } from "@/lib/types";
import { useTranslation } from "@/i18n/LanguageContext";
import { formatDate } from "@/lib/date";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const { t } = useTranslation();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span>
            {post.readingTime} {t("common.minRead")}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-bold text-gray-900">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          {t("common.readMore")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
