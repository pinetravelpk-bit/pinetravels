import type { ReactNode } from "react";
import "@/app/globals.css";
import { inter, poppins, notoNastaliq } from "@/app/fonts";
import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Locale } from "@/lib/i18nRoutes";
import { HTML_LANG } from "@/lib/i18nRoutes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

const GA_ID = "G-L8M3D1L9PB";
// Google Ads account; the lead form conversion event is in lib/analytics.ts.
const ADS_ID = "AW-18304128353";

// The <html> document shared by the three root layouts: English (app/(site)),
// Urdu script (app/(urdu)/urdu) and Roman Urdu (app/(roman)/roman-urdu). Each
// passes its locale, so lang and dir are right in the static HTML itself.
export default function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={HTML_LANG[locale]} dir={locale === "ur" ? "rtl" : "ltr"}>
      <head>
        {/* Google tag (gtag.js), placed first in <head> as Google asks. One tag per page. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
  gtag('config', '${ADS_ID}');`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${notoNastaliq.variable} antialiased`}>
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <LanguageProvider locale={locale}>
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
