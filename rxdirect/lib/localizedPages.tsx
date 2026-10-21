// The Urdu (/urdu) and Roman Urdu (/roman-urdu) versions of the main pages.
// They render the same page components as the English pages, in the locale
// set by their root layout, without the long English articles. The page files
// under app/(urdu)/urdu and app/(roman)/roman-urdu only re-export from here.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/data/business";
import { services, getServiceBySlug } from "@/data/services";
import { cities, getCityBySlug } from "@/data/cities";
import { getAllPostsMeta } from "@/lib/markdown";
import { HTML_LANG, languageAlternates, localePath } from "@/lib/i18nRoutes";
import { pick } from "@/i18n/pick";
import { LOCALIZED_META, cityMeta, serviceMeta } from "@/i18n/pageMeta";
import HomeClient from "@/app/(site)/HomeClient";
import HireStaffClient from "@/app/(site)/hire-staff/HireStaffClient";
import ServicesPageClient from "@/app/(site)/services/ServicesPageClient";
import ServiceDetailClient from "@/app/(site)/services/[slug]/ServiceDetailClient";
import CitiesPageClient from "@/app/(site)/cities/CitiesPageClient";
import CityDetailClient from "@/app/(site)/cities/[slug]/CityDetailClient";
import ContactPageClient from "@/app/(site)/contact/ContactPageClient";
import AboutPageClient from "@/app/(site)/about/AboutPageClient";
import HowItWorksPageClient from "@/app/(site)/how-it-works/HowItWorksPageClient";
import FAQsPageClient from "@/app/(site)/faqs/FAQsPageClient";
import JobsPageClient from "@/app/(site)/jobs/JobsPageClient";
import PricingPageClient from "@/app/(site)/pricing/PricingPageClient";

export type UrduLocale = "ur" | "roman";

const OG_LOCALE: Record<UrduLocale, string> = { ur: "ur_PK", roman: "ur_PK" };

export function localizedMetadata(route: string, locale: UrduLocale, meta: { title: string; description: string }, image?: string): Metadata {
  const url = canonicalUrl(localePath(route, locale));
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url, languages: languageAlternates(route) },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url,
      locale: OG_LOCALE[locale],
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, ...(image ? { images: [image] } : {}) },
    other: { "content-language": HTML_LANG[locale] },
  };
}

const staticMeta = (route: string, locale: UrduLocale) => localizedMetadata(route, locale, LOCALIZED_META[route][locale]);

/** Pages without route params: metadata and component by English route. */
export function staticPage(route: string, locale: UrduLocale) {
  const metadata = staticMeta(route, locale);
  const components: Record<string, () => JSX.Element> = {
    "/": () => <HomeClient posts={getAllPostsMeta()} />,
    "/hire-staff": () => <HireStaffClient />,
    "/services": () => <ServicesPageClient />,
    "/cities": () => <CitiesPageClient />,
    "/contact": () => <ContactPageClient />,
    "/about": () => <AboutPageClient />,
    "/how-it-works": () => <HowItWorksPageClient />,
    "/faqs": () => <FAQsPageClient />,
    "/jobs": () => <JobsPageClient />,
    "/pricing": () => <PricingPageClient />,
  };
  return { metadata, Page: components[route] };
}

export function servicePage(locale: UrduLocale) {
  return {
    generateStaticParams: () => services.map((s) => ({ slug: s.slug })),
    generateMetadata: ({ params }: { params: { slug: string } }): Metadata => {
      const s = getServiceBySlug(params.slug);
      if (!s) return {};
      return localizedMetadata(`/services/${s.slug}`, locale, serviceMeta(pick(s.name, locale), pick(s.shortDesc, locale), locale), s.image);
    },
    Page: ({ params }: { params: { slug: string } }) => {
      const s = getServiceBySlug(params.slug);
      if (!s) notFound();
      return <ServiceDetailClient service={s} />;
    },
  };
}

export function cityPage(locale: UrduLocale) {
  return {
    generateStaticParams: () => cities.map((c) => ({ slug: c.slug })),
    generateMetadata: ({ params }: { params: { slug: string } }): Metadata => {
      const c = getCityBySlug(params.slug);
      if (!c) return {};
      return localizedMetadata(`/cities/${c.slug}`, locale, cityMeta(pick(c.name, locale), pick(c.shortDesc, locale), locale), c.image);
    },
    Page: ({ params }: { params: { slug: string } }) => {
      const c = getCityBySlug(params.slug);
      if (!c) notFound();
      return <CityDetailClient city={c} />;
    },
  };
}
