import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { cityFaqs } from "@/lib/contentTemplates";
import CityDetailClient from "./CityDetailClient";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};

  const title = `Hire Domestic Staff in ${city.name.en} | Cooks, Drivers, Maids & More`;
  const description = `${city.shortDesc.en} Cooks, drivers, maids, cleaners, guards and office boys, background-verified and ready to work in ${city.name.en}.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/cities/${city.slug}`) },
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

export default function CityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Cities", url: `${business.siteUrl}/cities` },
          { name: city.name.en, url: `${business.siteUrl}/cities/${city.slug}` },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          cityFaqs(city).map((f) => ({ question: f.question.en, answer: f.answer.en }))
        )}
      />
      <CityDetailClient city={city} />
    </>
  );
}
