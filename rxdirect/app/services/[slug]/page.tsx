import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { serviceOverviewFaqs } from "@/lib/contentTemplates";
import ServiceDetailClient from "./ServiceDetailClient";
import PageArticle from "@/components/PageArticle";
import { getPageContent, mergedFaqs, pageMetadata } from "@/lib/pageContent";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const title = `Hire ${service.name.en} in Islamabad, Rawalpindi & Pakistan`;
  const description = `${service.shortDesc.en} Background-verified and available across Islamabad, Rawalpindi, Lahore and Karachi.`;

  return pageMetadata(`/services/${service.slug}`, {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/services/${service.slug}`) },
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
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema(
          service.name.en,
          service.shortDesc.en,
          `${business.siteUrl}/services/${service.slug}`
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Services", url: `${business.siteUrl}/services` },
          { name: service.name.en, url: `${business.siteUrl}/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          mergedFaqs(`/services/${service.slug}`, serviceOverviewFaqs(service).map((f) => ({ question: f.question.en, answer: f.answer.en })))
        )}
      />
      <ServiceDetailClient service={service} article={<PageArticle page={getPageContent(`/services/${service.slug}`)} />} />
    </>
  );
}
