import type { Metadata } from "next";
import { canonicalUrl } from "@/data/business";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the RX Direct team: recruiters, verification officers and account managers placing verified domestic staff across Pakistan.",
  alternates: { canonical: canonicalUrl("/team") },
};

export default function TeamPage() {
  return <TeamClient />;
}
