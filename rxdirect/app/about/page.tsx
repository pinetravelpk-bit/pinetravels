import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "About Us | Certified & SECP-Registered Company",
  description:
    "RX Direct is a certified, SECP-registered company and Pakistan's growing network for trusted, verified domestic staffing, cooks, drivers, helpers, cleaners, guards and more, placed across major cities.",
  alternates: { canonical: canonicalUrl("/about") },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
