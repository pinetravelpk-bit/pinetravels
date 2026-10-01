import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Domestic Staff Services",
  description:
    "Browse all domestic staff categories offered by RX Direct, cooks, drivers, maids, cleaners, security guards, office boys, nannies and gardeners, verified across Pakistan.",
  alternates: { canonical: canonicalUrl("/services") },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
