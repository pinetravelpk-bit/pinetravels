import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import HireStaffClient from "./HireStaffClient";

const title = "Hire Staff | Request Verified Domestic Staff | RX Direct";
const description =
  "Request verified domestic staff in Pakistan: cooks, drivers, maids, nannies, guards and more. Send your requirement and get a checked shortlist within 24 to 48 hours.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: canonicalUrl("/hire-staff") },
  openGraph: { title, description, url: canonicalUrl("/hire-staff"), type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function HireStaffPage() {
  return <HireStaffClient />;
}
