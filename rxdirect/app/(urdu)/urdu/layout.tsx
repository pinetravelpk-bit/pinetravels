import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { business } from "@/data/business";

// Root layout for the Urdu pages (/urdu/...).
export const metadata: Metadata = {
  verification: { google: "lgTWnBUdznVt5iMTLsRqx6z08jrZkE1Vg6TbGY7DX9A" },
  metadataBase: new URL(business.siteUrl),
  title: { default: business.name, template: `%s | ${business.name}` },
};

export default function UrduLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="ur">{children}</RootShell>;
}
