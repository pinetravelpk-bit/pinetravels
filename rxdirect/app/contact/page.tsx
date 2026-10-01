import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RX Direct to hire verified domestic staff in Islamabad, Rawalpindi, Lahore or Karachi. WhatsApp, call or send us a message.",
  alternates: { canonical: canonicalUrl("/contact") },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
