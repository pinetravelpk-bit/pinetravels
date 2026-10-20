import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import TeamClient from "./TeamClient";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/team", {
  title: "Our Team",
  description: "Meet the RX Direct team: recruiters, verification officers and account managers placing verified domestic staff across Pakistan.",
  alternates: { canonical: canonicalUrl("/team") },
});

export default function TeamPage() {
  return (
    <>
      <PageFaqSchema route="/team" />
      <TeamClient article={<PageArticle page={getPageContent("/team")} />} />
    </>
  );
}
