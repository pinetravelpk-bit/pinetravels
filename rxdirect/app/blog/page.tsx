import type { Metadata } from "next";
import { getAllPostsMeta, getAllCitySlugsWithPosts, getAllServiceSlugsWithPosts } from "@/lib/markdown";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import BlogPageClient from "./BlogPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/blog", {
  title: "Blog",
  description:
    "Tips, guides and news about hiring and working as domestic staff in Pakistan, cooks, drivers, helpers, cleaners, guards and more.",
  alternates: { canonical: canonicalUrl("/blog") },
});

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const browseCities = cities.filter((c) => getAllCitySlugsWithPosts().includes(c.slug));
  const browseServices = services.filter((s) => getAllServiceSlugsWithPosts().includes(s.slug));
  return (
    <>
      <PageFaqSchema route="/blog" />
      <BlogPageClient posts={posts} browseCities={browseCities} browseServices={browseServices} />
      <PageArticle page={getPageContent("/blog")} />
    </>
  );
}
