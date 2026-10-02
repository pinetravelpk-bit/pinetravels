import type { Metadata } from "next";
import HowItWorksPageClient from "./HowItWorksPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/how-it-works", {
  title: "How It Works",
  description:
    "See how RX Direct places verified domestic staff, from your first WhatsApp message to your new staff member's first day. Also covers how job seekers can join our roster.",
  alternates: { canonical: canonicalUrl("/how-it-works") },
});

export default function HowItWorksPage() {
  return (
    <>
      <PageFaqSchema route="/how-it-works" />
      <HowItWorksPageClient article={<PageArticle page={getPageContent("/how-it-works")} />} />
    </>
  );
}
