import "@fontsource-variable/syne";
import "@fontsource-variable/manrope";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ui/ScrollProgress";
import { site } from "../lib/data";

export const metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Creative Digital Marketing Agency`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital marketing agency",
    "SEO agency",
    "PPC agency",
    "paid media",
    "social media marketing",
    "web design",
    "creative agency",
    "InventiveClicks",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} — Creative Digital Marketing Agency`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Creative Digital Marketing Agency`,
    description: site.description,
  },
};

export const viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
