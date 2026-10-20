import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getSocietyBySlug } from "@/data/cities";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { societyFaqs } from "@/lib/contentTemplates";
import SocietyDetailClient from "./SocietyDetailClient";

export function generateStaticParams() {
  return cities.flatMap((c) =>
    c.societies.map((s) => ({ slug: c.slug, society: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; society: string };
}): Promise<Metadata> {
  const result = getSocietyBySlug(params.slug, params.society);
  if (!result) return {};
  const { city, society } = result;

  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const title = `Hire Domestic Staff in ${place} | Cooks, Drivers, Maids & More`;
  const description = `${society.shortDesc.en} Cooks, drivers, maids, cleaners, guards and office boys, background-verified and ready to work in ${society.name.en}, ${city.name.en}.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/cities/${city.slug}/${society.slug}`) },
    openGraph: {
      title,
      description,
      images: [city.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [city.image],
    },
  };
}

export default function SocietyDetailPage({
  params,
}: {
  params: { slug: string; society: string };
}) {
  const result = getSocietyBySlug(params.slug, params.society);
  if (!result) notFound();
  const { city, society } = result;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Cities", url: `${business.siteUrl}/cities` },
          { name: city.name.en, url: `${business.siteUrl}/cities/${city.slug}` },
          {
            name: society.name.en,
            url: `${business.siteUrl}/cities/${city.slug}/${society.slug}`,
          },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          societyFaqs(city, society).map((f) => ({ question: f.question.en, answer: f.answer.en }))
        )}
      />
      <SocietyDetailClient city={city} society={society} />
    </>
  );
}
