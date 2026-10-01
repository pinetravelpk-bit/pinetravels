import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const image = post.ogImage || post.featuredImage;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title,
      description,
      images: [image],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          image: `${business.siteUrl}${post.featuredImage}`,
          url: `${business.siteUrl}/blog/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: post.title, url: `${business.siteUrl}/blog/${post.slug}` },
        ])}
      />
      <BlogPostClient post={post} />
    </>
  );
}
