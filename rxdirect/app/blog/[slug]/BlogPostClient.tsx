"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { useTranslation } from "@/i18n/LanguageContext";
import { slugifyTag } from "@/lib/slug";
import { formatDate } from "@/lib/date";
import { business } from "@/data/business";
import Comments from "@/components/Comments";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { t } = useTranslation();

  return (
    <article className="section-py container-px mx-auto max-w-3xl">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t("blogPage.backToBlog")}
      </Link>

      <h1 className="text-balance text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(post.date, { year: "numeric", month: "long", day: "numeric" })}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {post.author}
        </span>
        <span>
          {post.readingTime} {t("common.minRead")}
        </span>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div
        className="prose-rxdirect prose mt-10 max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:no-underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${slugifyTag(tag)}`}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <Comments
        pageId={post.slug}
        pageTitle={post.title}
        pageUrl={`${business.siteUrl}/blog/${post.slug}`}
      />
    </article>
  );
}
