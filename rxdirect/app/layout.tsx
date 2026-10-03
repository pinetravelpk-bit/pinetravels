import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { business, canonicalOrigin } from "@/data/business";

// Self-hosted font files (app/fonts/) instead of next/font/google, this keeps
// `npm run build` fully offline and not dependent on fonts.googleapis.com being
// reachable at build time.
const inter = localFont({
  src: "./fonts/Inter-Regular.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Poppins-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const notoNastaliq = localFont({
  src: "./fonts/NotoNastaliqUrdu-Regular.woff2",
  weight: "400 700",
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${inter.variable} ${poppins.variable} ${notoNastaliq.variable} antialiased`}
      >
        {/* Google Analytics (GA4), afterInteractive so it never blocks first
            paint/LCP; still fires well before a user could navigate away. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51YPC4GHHX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-51YPC4GHHX');`}
        </Script>
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* keeps the footer clear of the phone bottom bar */}
          <div className="h-[72px] lg:hidden" aria-hidden="true" />
          <StickyWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
