import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { cities, getSocietyBySlug } from "@/data/cities";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { serviceSocietyFaqs, variedServiceTitle } from "@/lib/contentTemplates";
import ServiceSocietyDetailClient from "./ServiceSocietyDetailClient";

export function generateStaticParams() {
  return services.flatMap((s) =>
    cities.flatMap((c) =>
      c.societies.map((soc) => ({ slug: s.slug, city: c.slug, society: soc.slug }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; city: string; society: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  const result = getSocietyBySlug(params.city, params.society);
  if (!service || !result) return {};
  const { city, society } = result;

  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;

  const title = variedServiceTitle(service.name.en, place, `${service.slug}-${city.slug}-${society.slug}`);
  const description = `${service.shortDesc.en} Available in ${place}, background-verified and ready to start within 24 hours.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/services/${service.slug}/${city.slug}/${society.slug}`),
    },
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

export default function ServiceSocietyDetailPage({
  params,
}: {
  params: { slug: string; city: string; society: string };
}) {
  const service = getServiceBySlug(params.slug);
  const result = getSocietyBySlug(params.city, params.society);
  if (!service || !result) notFound();
  const { city, society } = result;

  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;

  return (
    <>
      <JsonLd
        data={serviceSchema(
          service.name.en,
          `${service.shortDesc.en} Available in ${place}.`,
          `${business.siteUrl}/services/${service.slug}/${city.slug}/${society.slug}`,
          place
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
          {
            name: society.name.en,
            url: `${business.siteUrl}/services/${service.slug}/${city.slug}/${society.slug}`,
          },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          serviceSocietyFaqs(service, city, society).map((f) => ({
            question: f.question.en,
            answer: f.answer.en,
          }))
        )}
      />
      <ServiceSocietyDetailClient service={service} city={city} society={society} />
    </>
  );
}
