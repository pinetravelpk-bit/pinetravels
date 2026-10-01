import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceGroups, getServiceGroupBySlug } from "@/data/serviceGroups";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import GroupDetailClient from "./GroupDetailClient";

export function generateStaticParams() {
  return serviceGroups.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { group: string };
}): Promise<Metadata> {
  const group = getServiceGroupBySlug(params.group);
  if (!group) return {};

  const title = `Hire ${group.name.en} in Pakistan`;
  const description = `${group.shortDesc.en} Background-verified and available across Islamabad, Rawalpindi, Lahore, Karachi and more.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/services/category/${group.slug}`) },
  };
}

export default function GroupDetailPage({
  params,
}: {
  params: { group: string };
}) {
  const group = getServiceGroupBySlug(params.group);
  if (!group) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Services", url: `${business.siteUrl}/services` },
          { name: group.name.en, url: `${business.siteUrl}/services/category/${group.slug}` },
        ])}
      />
      <GroupDetailClient group={group} />
    </>
  );
}
