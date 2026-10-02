import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/privacy", {
  title: "Privacy Policy",
  description:
    "How RX Direct collects, uses and protects your information when you contact us or use our domestic staffing services.",
  alternates: { canonical: canonicalUrl("/privacy") },
});

export default function PrivacyPage() {
  return (
    <>
      <PageFaqSchema route="/privacy" />
      <div className="container-px mx-auto max-w-7xl pt-14 lg:pt-20">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">RX Direct (SMC-Private) Limited</p>
      </div>
      <PageArticle page={getPageContent("/privacy")} />
    </>
  );
}
