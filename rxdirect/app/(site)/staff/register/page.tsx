import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import StaffRegisterClient from "./StaffRegisterClient";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/staff/register", {
  title: "Staff Verification: Get Your RX Direct Verified ID",
  description:
    "Cooks, drivers, maids, nurses, guards and other domestic staff: register with RX Direct, upload your CNIC and police certificate, and get a Verified ID that helps you get placed faster.",
  alternates: { canonical: canonicalUrl("/staff/register") },
});

export default function StaffRegisterPage() {
  return (
    <>
      <PageFaqSchema route="/staff/register" />
      <StaffRegisterClient />
      <PageArticle page={getPageContent("/staff/register")} />
    </>
  );
}
