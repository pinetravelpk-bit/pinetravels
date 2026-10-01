import type { Metadata } from "next";
import CitiesPageClient from "./CitiesPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Cities We Serve",
  description:
    "RX Direct places verified domestic staff across Islamabad, Rawalpindi, Lahore and Karachi, with dedicated local teams in every city.",
  alternates: { canonical: canonicalUrl("/cities") },
};

export default function CitiesPage() {
  return <CitiesPageClient />;
}
