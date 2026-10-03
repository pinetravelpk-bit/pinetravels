import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/services", {
  title: "Domestic Staff Services",
  description:
    "Browse all domestic staff categories offered by RX Direct, cooks, drivers, maids, cleaners, security guards, office boys, nannies and gardeners, verified across Pakistan.",
  alternates: { canonical: canonicalUrl("/services") },
});

export default function ServicesPage() {
  return (
    <>
      <PageFaqSchema route="/services" />
      <ServicesPageClient article={<PageArticle page={getPageContent("/services")} />} />
    </>
  );
}
