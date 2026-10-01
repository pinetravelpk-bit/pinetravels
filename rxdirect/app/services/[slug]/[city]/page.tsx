import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { cities, getCityBySlug } from "@/data/cities";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { serviceCityFaqs, variedServiceTitle } from "@/lib/contentTemplates";
import ServiceCityDetailClient from "./ServiceCityDetailClient";

export function generateStaticParams() {
  return services.flatMap((s) =>
    cities.map((c) => ({ slug: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; city: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  const city = getCityBySlug(params.city);
  if (!service || !city) return {};

  const title = variedServiceTitle(service.name.en, city.name.en, `${service.slug}-${city.slug}`);
  const description = `${service.shortDesc.en} Serving all of ${city.name.en}, background-verified and available within 24 hours.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/services/${service.slug}/${city.slug}`) },
    openGraph: {
      title,
      description,
      images: [service.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default function ServiceCityDetailPage({
  params,
}: {
  params: { slug: string; city: string };
}) {
  const service = getServiceBySlug(params.slug);
  const city = getCityBySlug(params.city);
  if (!service || !city) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema(
          service.name.en,
          `${service.shortDesc.en} Serving all of ${city.name.en}.`,
          `${business.siteUrl}/services/${service.slug}/${city.slug}`,
          city.name.en
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Services", url: `${business.siteUrl}/services` },
          { name: service.name.en, url: `${business.siteUrl}/services/${service.slug}` },
          {
            name: city.name.en,
            url: `${business.siteUrl}/services/${service.slug}/${city.slug}`,
          },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          serviceCityFaqs(service, city).map((f) => ({
            question: f.question.en,
            answer: f.answer.en,
          }))
        )}
      />
      <ServiceCityDetailClient service={service} city={city} />
    </>
  );
}
