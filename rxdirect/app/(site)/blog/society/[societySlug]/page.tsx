import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { getPostsBySociety, getAllSocietySlugsWithPosts } from "@/lib/markdown";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import BlogArchiveClient from "@/components/BlogArchiveClient";

function findSociety(societySlug: string) {
  for (const city of cities) {
    const society = city.societies.find((s) => s.slug === societySlug);
    if (society) return { city, society };
  }
  return null;
}

export function generateStaticParams() {
  return getAllSocietySlugsWithPosts().map((societySlug) => ({ societySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: { societySlug: string };
}): Promise<Metadata> {
  const found = findSociety(params.societySlug);
  if (!found) return {};
  const { city, society } = found;
  const title = `${society.name.en}, ${city.name.en} Blog | Domestic Staffing Guides`;
  const description = `Hiring guides and local tips for domestic staff in ${society.name.en}, ${city.name.en}.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/blog/society/${society.slug}`) },
  };
}

export default function BlogSocietyArchivePage({
  params,
}: {
  params: { societySlug: string };
}) {
  const found = findSociety(params.societySlug);
  if (!found) notFound();
  const { city, society } = found;
  const posts = getPostsBySociety(params.societySlug);
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: society.name.en, url: `${business.siteUrl}/blog/society/${society.slug}` },
        ])}
      />
      <BlogArchiveClient
        title={`${society.name.en} Blog`}
        subtitle={`Domestic staffing guides for ${society.name.en}, ${city.name.en}.`}
        crumbLabel={society.name.en}
        posts={posts}
      />
    </>
  );
}
