import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import StaffRegisterClient from "./StaffRegisterClient";

export const metadata: Metadata = {
  title: "Staff Verification: Get Your RX Direct Verified ID",
  description:
    "Cooks, drivers, maids, nurses, guards and other domestic staff: register with RX Direct, upload your CNIC and police certificate, and get a Verified ID that helps you get placed faster.",
  alternates: { canonical: canonicalUrl("/staff/register") },
};

export default function StaffRegisterPage() {
  return <StaffRegisterClient />;
}
