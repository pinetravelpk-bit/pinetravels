import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import PricingPageClient from "./PricingPageClient";
import { canonicalUrl } from "@/data/business";

const faqs = [
  {
    question: "How much does it cost to hire domestic staff through RX Direct?",
    answer:
      "Pricing depends on the staff type, city and whether the arrangement is full-time, part-time or live-in. Message us on WhatsApp with your requirements and we'll share a clear, no-obligation quote before you commit to anything.",
  },
  {
    question: "Is there a fee just to see candidates or get a shortlist?",
    answer:
      "No. Browsing candidates and requesting a shortlist is free, there's no obligation and no fee until you confirm a placement.",
  },
  {
    question: "Do prices differ between cities?",
    answer:
      "Yes, slightly, rates can vary by city and by how in-demand a particular role is in that area. We'll always confirm the exact rate for your city and requirements before you commit.",
  },
  {
    question: "What's included if a placement doesn't work out?",
    answer:
      "Every placement includes a 6-month replacement guarantee from the date of placement, if it's not the right fit, we arrange a suitable replacement at no extra placement fee.",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "How pricing works for RX Direct's domestic staff and home repair services, cooks, drivers, maids, nurses, electricians and more, with transparent quotes and no hidden charges.",
  alternates: { canonical: canonicalUrl("/pricing") },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <PricingPageClient />
    </>
  );
}
