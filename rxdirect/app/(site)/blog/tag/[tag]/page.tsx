import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTagSlug, getAllTagsWithSlugs } from "@/lib/markdown";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import BlogArchiveClient from "@/components/BlogArchiveClient";

export function generateStaticParams() {
  return getAllTagsWithSlugs().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const match = getAllTagsWithSlugs().find((t) => t.slug === params.tag);
  if (!match) return {};
  const title = `${match.tag} Blog`;
  const description = `Articles tagged "${match.tag}", domestic staffing guides and local tips from RX Direct.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/blog/tag/${params.tag}`) },
  };
}

export default function BlogTagArchivePage({
  params,
}: {
  params: { tag: string };
}) {
  const match = getAllTagsWithSlugs().find((t) => t.slug === params.tag);
  if (!match) notFound();
  const posts = getPostsByTagSlug(params.tag);
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: match.tag, url: `${business.siteUrl}/blog/tag/${params.tag}` },
        ])}
      />
      <BlogArchiveClient
        title={`Tag: ${match.tag}`}
        crumbLabel={match.tag}
        posts={posts}
      />
    </>
  );
}
