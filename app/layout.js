import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://pinetravels.com"),
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
    url: "https://pinetravels.com",
    siteName: "Pine Travel",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pine Travel — Northern Pakistan Tours & Weddings",
    description: "Curated tours, destination weddings and travel services across the mountains of Northern Pakistan.",
  },
  icons: { icon: "/images/pine-travel-logo.png", apple: "/images/pine-travel-logo.png" },
};

export const viewport = { themeColor: "#005902" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
