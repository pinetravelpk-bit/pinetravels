// ─────────────────────────────────────────────────────────────
// Structured data (JSON-LD) — the backbone of both classic SEO and
// generative-AI answer-engine optimization. Every builder returns a
// plain object; <JsonLd> serializes it into a script tag.
// ─────────────────────────────────────────────────────────────
import { site, services } from "./site";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Data is authored by us in lib/site.js — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization / agency — the anchor node everything else references.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    foundingDate: String(site.foundingYear),
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image`,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/icon.svg`,
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    knowsAbout: [
      "Video animation",
      "Motion graphics",
      "Graphic design",
      "Brand identity",
      "Creative marketing",
      "Performance marketing",
      "Influencer marketing",
      "Social media marketing",
      "Web design and development",
      "SEO",
    ],
    sameAs: Object.values(site.socials),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone,
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital marketing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: `${site.url}/services/${s.slug}`,
        },
      })),
    },
  };
}

// WebSite node with a SearchAction (helps engines understand site search).
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

// A single service page.
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: { "@type": "BusinessAudience", audienceType: "Brands and businesses" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema({ path, name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${site.url}${path}`,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    url: `${site.url}/insights/${post.slug}`,
  };
}
