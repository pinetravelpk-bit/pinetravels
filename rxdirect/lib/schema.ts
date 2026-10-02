import { business, canonicalOrigin } from "@/data/business";
import { cities } from "@/data/cities";

// canonicalOrigin is rxdirect.pk itself (self-canonical, see data/business.ts),
// so the LocalBusiness/WebSite `url` here matches the site's own domain.

const allCityNames = cities.map((c) => c.name.en);

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    legalName: business.legalName,
    description: business.tagline.en,
    telephone: `+${business.phoneRaw}`,
    email: business.email,
    url: canonicalOrigin,
    logo: `${canonicalOrigin}/brand/rxdirect-logo-full.png`,
    image: `${canonicalOrigin}/brand/icon-square-512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.en,
      addressCountry: "PK",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "SECP CUIN",
        value: business.secp.cuin,
      },
      {
        "@type": "PropertyValue",
        propertyID: "Labour Department Registration No.",
        value: business.labour.registrationNumber,
      },
      {
        "@type": "PropertyValue",
        propertyID: "PESSI Registration No.",
        value: business.pessi.registrationNumber,
      },
      {
        "@type": "PropertyValue",
        propertyID: "FBR NTN",
        value: business.fbr.ntn,
      },
    ],
    areaServed: allCityNames,
    sameAs: [
      business.social.facebook,
      business.social.instagram,
      business.social.linkedin,
    ].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: canonicalOrigin,
    inLanguage: ["en", "ur"],
  };
}

export function serviceSchema(
  name: string,
  description: string,
  url: string,
  areaServed: string | string[] = allCityNames
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: `+${business.phoneRaw}`,
    },
    areaServed,
    url,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    datePublished: opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.author,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
    },
  };
}
