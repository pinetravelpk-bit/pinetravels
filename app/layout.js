import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { site, SITE_URL } from "../lib/data";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pine Travel — Northern Pakistan Tours, Weddings & Travel Services",
    template: "%s | Pine Travel",
  },
  description:
    "Pine Travel is a Rawalpindi-based travel agency offering group, family, customized and corporate tours across Northern Pakistan, plus destination weddings, hotel booking, rent-a-car and rent-a-jeep, guest houses and local guides.",
  keywords: [
    "Pine Travel", "Northern Pakistan tours", "Hunza tour packages", "Skardu tours",
    "destination wedding Pakistan", "rent a jeep Fairy Meadows", "Naran Kaghan tours",
    "Rawalpindi travel agency", "hotel booking Hunza",
  ],
  openGraph: {
    title: "Pine Travel — Journeys through the north, done right.",
    description: "Group, family, customized & corporate tours, destination weddings, hotels, rentals and guides across Northern Pakistan.",
    url: SITE_URL,
    siteName: "Pine Travel",
    type: "website",
    locale: "en_PK",
    // TODO: proper 1200×630 branded share image (public/og-image.jpg). Logo is a stopgap.
    images: [{ url: "/images/pine-travel-logo.png", width: 512, height: 512, alt: "Pine Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pine Travel — Northern Pakistan Tours & Weddings",
    description: "Curated tours, destination weddings and travel services across the mountains of Northern Pakistan.",
    images: ["/images/pine-travel-logo.png"],
  },
  icons: { icon: "/images/pine-travel-logo.png", apple: "/images/pine-travel-logo.png" },
};

// ── Site-wide business identity (Organization / TravelAgency) ──
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/pine-travel-logo.png`,
  image: `${SITE_URL}/images/pine-travel-logo.png`,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saddar",
    addressLocality: "Rawalpindi",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: "Northern Pakistan",
  sameAs: Object.values(site.social).filter((u) => u && !/^https?:\/\/(www\.)?(facebook|instagram|youtube|linkedin)\.com\/?$/.test(u)),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const viewport = { themeColor: "#005902" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
