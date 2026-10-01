import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import StaffStatusClient from "./StaffStatusClient";

export const metadata: Metadata = {
  title: "Check Your Verification Status",
  description: "Check the progress of your RX Direct staff verification with your reference number and phone.",
  alternates: { canonical: canonicalUrl("/staff/status") },
  robots: { index: false },
};

export default function StaffStatusPage() {
  return <StaffStatusClient />;
}
