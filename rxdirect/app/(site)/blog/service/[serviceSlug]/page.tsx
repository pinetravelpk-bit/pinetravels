import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { getPostsByService, getAllServiceSlugsWithPosts } from "@/lib/markdown";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import BlogArchiveClient from "@/components/BlogArchiveClient";

export function generateStaticParams() {
  return getAllServiceSlugsWithPosts().map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: { serviceSlug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) return {};
  const title = `${service.name.en} Blog | Hiring Guides Across Pakistan`;
  const description = `City-by-city hiring guides for ${service.name.en.toLowerCase()} across Pakistan, verification, pricing expectations and local tips.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/blog/service/${service.slug}`) },
  };
}

export default function BlogServiceArchivePage({
  params,
}: {
  params: { serviceSlug: string };
}) {
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) notFound();
  const posts = getPostsByService(params.serviceSlug);
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: service.name.en, url: `${business.siteUrl}/blog/service/${service.slug}` },
        ])}
      />
      <BlogArchiveClient
        title={`${service.name.en} Blog`}
        subtitle={`Hiring guides for ${service.name.en.toLowerCase()} across every city we serve.`}
        crumbLabel={service.name.en}
        posts={posts}
      />
    </>
  );
}
