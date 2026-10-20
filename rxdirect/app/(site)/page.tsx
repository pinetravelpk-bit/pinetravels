import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/markdown";
import HomeClient from "./HomeClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/", {
  alternates: { canonical: canonicalUrl("/") },
});

export default function Home() {
  const posts = getAllPostsMeta();
  return (
    <>
      <PageFaqSchema route="/" />
      <HomeClient posts={posts} article={<PageArticle page={getPageContent("/")} />} />
    </>
  );
}
