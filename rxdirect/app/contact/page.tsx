import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/contact", {
  title: "Contact Us",
  description:
    "Get in touch with RX Direct to hire verified domestic staff in Islamabad, Rawalpindi, Lahore or Karachi. WhatsApp, call or send us a message.",
  alternates: { canonical: canonicalUrl("/contact") },
});

export default function ContactPage() {
  return (
    <>
      <PageFaqSchema route="/contact" />
      <ContactPageClient />
      <PageArticle page={getPageContent("/contact")} />
    </>
  );
}
