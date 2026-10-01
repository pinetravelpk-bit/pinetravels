"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, FileCheck2, HardHat, Users } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { faqs } from "@/data/faqs";
import type { BlogPostMeta } from "@/lib/types";
import { useTranslation } from "@/i18n/LanguageContext";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorksSection from "@/components/HowItWorksSection";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CityCard from "@/components/CityCard";
import BlogCard from "@/components/BlogCard";

// The six categories the redesign features on the home page. The rest are a
// click away via "View all services" and the Services menu.
const FEATURED_SERVICES = ["maids", "cooks", "drivers", "office-boys", "nurses", "security-guards"];

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  link,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading center={false} eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {link && (
        <Link href={link.href} className="link-arrow shrink-0 border-b-2 border-brand-600 pb-0.5">
          {link.label}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      )}
    </div>
  );
}

function HomeFAQs() {
  const { t, locale } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  const items = faqs.slice(0, 6);

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-8xl">
        <SectionHeader
          eyebrow={t("redesign.faqEyebrow")}
          title={t("redesign.faqTitle")}
          link={{ href: "/faqs", label: t("redesign.viewAllFaqs") }}
        />
        <div className="mt-10 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-navy sm:text-base">{item.question[locale]}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-navy transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{item.answer[locale]}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomeClient({ posts }: { posts: BlogPostMeta[] }) {
  const { t, locale } = useTranslation();
  const featuredServices = FEATURED_SERVICES.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );
  const featuredCities = cities.filter((c) => c.featured);
  const otherCities = cities.filter((c) => !c.featured);

  const registrations = [
    { href: "/registration", icon: FileText, title: t("redesign.secpTitle"), desc: t("redesign.secpDesc") },
    { href: "/registration/fbr", icon: FileCheck2, title: t("redesign.fbrTitle"), desc: t("redesign.fbrDesc") },
    { href: "/registration/labour", icon: HardHat, title: t("redesign.labourTitle"), desc: t("redesign.labourDesc") },
    { href: "/registration/pessi", icon: Users, title: t("redesign.pessiTitle"), desc: t("redesign.pessiDesc") },
  ];

  return (
    <>
      <Hero />

      <section className="bg-white pb-16 pt-10 sm:pb-20">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeader
            eyebrow={t("common.ourServices")}
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
            link={{ href: "/services", label: t("redesign.viewAllServices") }}
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-brand-50">
        <div className="container-px mx-auto max-w-8xl">
          <SectionHeading
            center={false}
            eyebrow={t("redesign.commitmentEyebrow")}
            title={t("redesign.commitmentTitle")}
            subtitle={t("redesign.commitmentSubtitle")}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {registrations.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex flex-col items-center rounded-xl border border-white bg-white px-6 py-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <r.icon className="h-12 w-12 text-brand-600" strokeWidth={1.5} />
                <h3 className="mt-5 text-base font-bold text-navy">{r.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />

      <section className="section-py bg-brand-50">
        <div className="container-px mx-auto max-w-8xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              center={false}
              eyebrow={t("redesign.locationsEyebrow")}
              title={t("redesign.locationsTitle")}
              subtitle={t("home.citiesSubtitle")}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              {otherCities.map((c, i) => (
                <span key={c.slug} className="flex items-center gap-3">
                  {i > 0 && <span className="text-gray-400">&middot;</span>}
                  <Link href={`/cities/${c.slug}`} className="font-medium text-brand-700 hover:underline">
                    {c.name[locale]}
                  </Link>
                </span>
              ))}
              <Link href="/cities" className="link-arrow ms-3 border-b-2 border-brand-600 pb-0.5">
                {t("redesign.exploreLocations")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCities.map((c) => (
              <CityCard key={c.slug} city={c} compact />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <Testimonials />

      <HomeFAQs />

      {posts.length > 0 && (
        <section className="section-py bg-gray-50">
          <div className="container-px mx-auto max-w-8xl">
            <SectionHeader
              eyebrow={t("nav.blog")}
              title={t("home.blogTitle")}
              subtitle={t("home.blogSubtitle")}
              link={{ href: "/blog", label: t("blogPage.title") }}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
