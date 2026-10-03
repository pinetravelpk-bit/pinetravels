import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import StaffStatusClient from "./StaffStatusClient";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/staff/status", {
  title: "Check Your Verification Status",
  description: "Check the progress of your RX Direct staff verification with your reference number and phone.",
  alternates: { canonical: canonicalUrl("/staff/status") },
});

export default function StaffStatusPage() {
  return (
    <>
      <PageFaqSchema route="/staff/status" />
      <StaffStatusClient />
      <PageArticle page={getPageContent("/staff/status")} />
    </>
  );
}
