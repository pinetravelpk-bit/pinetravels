import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPage, getBlogPageCount, getAllCitySlugsWithPosts, getAllServiceSlugsWithPosts } from "@/lib/markdown";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import BlogPageClient from "../../BlogPageClient";
import { canonicalUrl } from "@/data/business";

// Page 1 is /blog itself; these are pages 2 onwards.
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: getBlogPageCount() - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  const n = Number(params.page);
  return {
    title: `Blog, page ${n}`,
    description: `Page ${n} of RX Direct's guides and news about hiring and working as domestic staff in Pakistan, newest articles first.`,
    alternates: { canonical: canonicalUrl(`/blog/page/${n}`) },
  };
}

export default function BlogListPage({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const pageCount = getBlogPageCount();
  if (!Number.isInteger(page) || page < 2 || page > pageCount) notFound();
  const browseCities = cities.filter((c) => getAllCitySlugsWithPosts().includes(c.slug));
  const browseServices = services.filter((s) => getAllServiceSlugsWithPosts().includes(s.slug));
  return (
    <BlogPageClient
      posts={getBlogPage(page)}
      page={page}
      pageCount={pageCount}
      browseCities={browseCities}
      browseServices={browseServices}
    />
  );
}
