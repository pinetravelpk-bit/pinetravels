"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/types";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export default function BlogArchiveClient({
  title,
  subtitle,
  crumbLabel,
  posts,
}: {
  title: string;
  subtitle?: string;
  crumbLabel: string;
  posts: BlogPostMeta[];
}) {
  const { t } = useTranslation();

  return (
    <>
      <section className="border-b border-gray-100 bg-brand-50/50">
        <div className="container-px mx-auto max-w-8xl py-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <Link href="/blog" className="hover:text-brand-600">{t("nav.blog")}</Link>
            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            <span className="font-medium text-gray-700">{crumbLabel}</span>
          </nav>
        </div>
      </section>
      <div className="section-py container-px mx-auto max-w-8xl">
        <SectionHeading title={title} subtitle={subtitle} center={false} />
        {posts.length === 0 ? (
          <p className="mt-12 text-gray-500">{t("blogPage.noPosts")}</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
