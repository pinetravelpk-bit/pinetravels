import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { business, canonicalOrigin } from "@/data/business";

export const metadata: Metadata = {
  // Google Search Console ownership check (google-site-verification meta tag).
  verification: { google: "lgTWnBUdznVt5iMTLsRqx6z08jrZkE1Vg6TbGY7DX9A" },
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Certified & SECP-Registered Domestic Staffing in Pakistan`,
    template: `%s | ${business.name}`,
  },
  description:
    "RX Direct is a certified, SECP-registered company placing background-verified cooks, drivers, maids, cleaners, security guards and office boys across Islamabad, Rawalpindi, Lahore and Karachi. Fast, reliable, transparent domestic staffing.",
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} | Certified & SECP-Registered Domestic Staffing`,
    description:
      "Certified, SECP-registered company. Background-verified cooks, drivers, maids, cleaners, guards and office boys across Islamabad, Rawalpindi, Lahore and Karachi.",
    // og:url matches the self-referencing canonical (rxdirect.pk).
    url: canonicalOrigin,
    images: ["/images/home/hero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Verified Domestic Staff in Pakistan`,
    description:
      "Background-verified cooks, drivers, maids, cleaners, guards and office boys across major Pakistani cities.",
    images: ["/images/home/hero.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
