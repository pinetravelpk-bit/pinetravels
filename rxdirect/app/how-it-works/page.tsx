import type { Metadata } from "next";
import HowItWorksPageClient from "./HowItWorksPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how RX Direct places verified domestic staff, from your first WhatsApp message to your new staff member's first day. Also covers how job seekers can join our roster.",
  alternates: { canonical: canonicalUrl("/how-it-works") },
};

export default function HowItWorksPage() {
  return <HowItWorksPageClient />;
}
