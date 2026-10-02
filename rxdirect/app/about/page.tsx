import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About Us | Certified & SECP-Registered Company",
  description:
    "RX Direct is a certified, SECP-registered company and Pakistan's growing network for trusted, verified domestic staffing, cooks, drivers, helpers, cleaners, guards and more, placed across major cities.",
  alternates: { canonical: canonicalUrl("/about") },
});

export default function AboutPage() {
  return (
    <>
      <PageFaqSchema route="/about" />
      <AboutPageClient article={<PageArticle page={getPageContent("/about")} />} />
    </>
  );
}
