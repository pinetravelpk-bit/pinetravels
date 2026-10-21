import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import FAQsPageClient from "./FAQsPageClient";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import { getPageContent, mergedFaqs, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/faqs", {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about hiring verified domestic staff through RX Direct, placement time, pricing, verification process, replacement guarantee and more.",
  alternates: { canonical: canonicalUrl("/faqs") },
});

export default function FAQsPage() {
  return (
    <>
      <JsonLd
        data={faqPageSchema(
          mergedFaqs("/faqs", faqs.map((f) => ({ question: f.question.en, answer: f.answer.en })))
        )}
      />
      <FAQsPageClient article={<PageArticle page={getPageContent("/faqs")} />} />
    </>
  );
}
