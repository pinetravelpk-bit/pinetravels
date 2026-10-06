"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/types";
import type { City } from "@/data/cities";
import type { ServiceCategory } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import BlogSearch from "@/components/BlogSearch";
import BlogPagination from "@/components/BlogPagination";

export default function BlogPageClient({
  posts,
  page,
  pageCount,
  browseCities,
  browseServices,
}: {
  posts: BlogPostMeta[]; // this page's posts, newest first
  page: number;
  pageCount: number;
  browseCities: City[];
  browseServices: ServiceCategory[];
}) {
  const { t, locale } = useTranslation();
  const [searchResults, setSearchResults] = useState<BlogPostMeta[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const visiblePosts = searchResults ?? posts;

  return (
    <div className="section-py container-px mx-auto max-w-8xl">
      <SectionHeading title={t("blogPage.title")} subtitle={t("blogPage.subtitle")} />

      <BlogSearch
        onFilter={(filtered, query) => {
          setSearchResults(filtered);
          setSearchQuery(query);
        }}
      />

      {searchResults === null && (browseCities.length > 0 || browseServices.length > 0) && (
        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {browseCities.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t("blogPage.browseByCity")}
              </span>
              {browseCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/city/${c.slug}`}
                  className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  {c.name[locale]}
                </Link>
              ))}
            </div>
          )}
          {browseServices.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t("blogPage.browseByService")}
              </span>
              {browseServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/blog/service/${s.slug}`}
                  className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  {s.name[locale]}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-gray-500">{t("blogPage.noPosts")}</p>
      ) : visiblePosts.length === 0 ? (
        <p className="mt-12 text-center text-gray-500">
          {t("blogPage.searchNoResults", { query: searchQuery })}
        </p>
      ) : (
        <>
          {searchResults !== null && (
            <p className="mt-8 text-center text-sm text-gray-500">
              {t("blogPage.searchResultsCount", {
                count: String(visiblePosts.length),
                query: searchQuery,
              })}
            </p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          {searchResults === null && <BlogPagination page={page} pageCount={pageCount} />}
        </>
      )}
    </div>
  );
}
