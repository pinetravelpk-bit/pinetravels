import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/data/cities";
import { getPostsByCity, getAllCitySlugsWithPosts } from "@/lib/markdown";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import BlogArchiveClient from "@/components/BlogArchiveClient";

export function generateStaticParams() {
  return getAllCitySlugsWithPosts().map((citySlug) => ({ citySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: { citySlug: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.citySlug);
  if (!city) return {};
  const title = `${city.name.en} Blog | Domestic Staffing Guides & Tips`;
  const description = `Hiring guides, service guides and local tips for domestic staff in ${city.name.en}, cooks, drivers, helpers, cleaners, guards and more.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/blog/city/${city.slug}`) },
  };
}

export default function BlogCityArchivePage({
  params,
}: {
  params: { citySlug: string };
}) {
  const city = getCityBySlug(params.citySlug);
  if (!city) notFound();
  const posts = getPostsByCity(params.citySlug);
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: city.name.en, url: `${business.siteUrl}/blog/city/${city.slug}` },
        ])}
      />
      <BlogArchiveClient
        title={`${city.name.en} Blog`}
        subtitle={`Domestic staffing guides and local tips for ${city.name.en}.`}
        crumbLabel={city.name.en}
        posts={posts}
      />
    </>
  );
}
