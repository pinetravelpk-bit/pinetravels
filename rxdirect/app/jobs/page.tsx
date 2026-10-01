import type { Metadata } from "next";
import JobsPageClient from "./JobsPageClient";
import { canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Domestic Staff & Trade Jobs in Pakistan",
  description:
    "Looking for work as a cook, driver, helper, nurse, electrician, plumber, carpenter or painter? See how to apply and join the RX Direct roster.",
  alternates: { canonical: canonicalUrl("/jobs") },
};

export default function JobsPage() {
  return <JobsPageClient />;
}
