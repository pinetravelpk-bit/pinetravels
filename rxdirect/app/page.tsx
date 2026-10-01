import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/markdown";
import HomeClient from "./HomeClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  const posts = getAllPostsMeta();
  return <HomeClient posts={posts} />;
}
