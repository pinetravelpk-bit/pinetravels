import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { site } from "../lib/site";
import { JsonLd, organizationSchema, websiteSchema } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "InventiveClicks — Creative Digital Marketing Agency",
    template: "%s | InventiveClicks",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital marketing agency",
    "video animation agency",
    "motion graphics",
    "graphic design agency",
    "creative marketing",
    "influencer marketing agency",
    "social media marketing",
    "UGC content",
    "performance marketing",
    "brand identity design",
    "InventiveClicks",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "InventiveClicks — Ideas that click.",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InventiveClicks — Creative Digital Marketing Agency",
    description: site.description,
    creator: "@inventiveclicks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#0D0821",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Ensure scroll-reveal content is visible when JS is disabled. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
