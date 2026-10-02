import type { Metadata } from "next";
import CitiesPageClient from "./CitiesPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/cities", {
  title: "Cities We Serve",
  description:
    "RX Direct places verified domestic staff across Islamabad, Rawalpindi, Lahore and Karachi, with dedicated local teams in every city.",
  alternates: { canonical: canonicalUrl("/cities") },
});

export default function CitiesPage() {
  return (
    <>
      <PageFaqSchema route="/cities" />
      <CitiesPageClient article={<PageArticle page={getPageContent("/cities")} />} />
    </>
  );
}
