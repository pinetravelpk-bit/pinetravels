import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, BadgeCheck, ExternalLink, ArrowRight, HeartHandshake, Receipt } from "lucide-react";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import PageArticle from "@/components/PageArticle";
import PageFaqSchema from "@/components/PageFaqSchema";
import { getPageContent, pageMetadata } from "@/lib/pageContent";

export const metadata: Metadata = pageMetadata("/registration", {
  title: "SECP Registration & Authenticity | Certified & Verified Company",
  description:
    "RX Direct is a certified, SECP-registered and verified company in Pakistan. View our official CUIN, verify our registration on SECP eServices, and download our incorporation certificate.",
  alternates: { canonical: canonicalUrl("/registration") },
});

export default function RegistrationPage() {
  const { secp } = business;

  return (
    <>
    <PageFaqSchema route="/registration" />
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "SECP Registration & Authenticity", url: `${business.siteUrl}/registration` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>{" "}
        / <span className="text-gray-700">Registration &amp; Authenticity</span>
      </nav>
      <div className="mt-4 flex items-center gap-2 text-brand-600">
        <ShieldCheck className="h-6 w-6" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Certified, Verified &amp; Registered
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-extrabold text-gray-900">SECP Registration &amp; Authenticity</h1>
      <p className="mt-2 text-sm text-gray-500">
        {business.name} operates as a legally incorporated company in Pakistan.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Name</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{secp.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              CUIN (Registration Number)
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{secp.cuin}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Date of Incorporation</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{secp.incorporationDate}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Regulator</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{secp.registrar}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={secp.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
        >
          <FileText className="h-4 w-4" />
          View Incorporation Certificate (PDF)
        </a>
        <a
          href={secp.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
        >
          <BadgeCheck className="h-4 w-4" />
          Verify on SECP eServices
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <h2>Why this matters</h2>
        <p>
          {business.name} is incorporated as {secp.legalName} under Section 16 of the Companies
          Act, 2017, and holds Corporate Unique Identification No. (CUIN) {secp.cuin} with the{" "}
          {secp.registrar}. This means we are a legally recognized company, not an unregistered
          operator, and are accountable under Pakistani corporate law for the staffing services we
          provide.
        </p>
        <p>
          You can independently confirm this registration at any time on SECP&apos;s official
          verification portal by searching CUIN {secp.cuin}, or by downloading our incorporation
          certificate above.
        </p>
      </div>

      <h2 className="mt-14 text-xl font-extrabold text-gray-900">Our Other Registrations</h2>
      <p className="mt-2 text-gray-600">
        Beyond SECP incorporation, {business.name} is registered with the FBR and with Punjab&apos;s
        labour and social security authorities too.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/registration/fbr"
          className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Receipt className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block text-base font-bold text-gray-900">FBR Tax Registration (NTN)</span>
            <span className="mt-1 block text-sm text-gray-600">
              Registered taxpayer with the Federal Board of Revenue, holding a valid National Tax
              Number.
            </span>
          </span>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/registration/labour"
          className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <FileText className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block text-base font-bold text-gray-900">
              Labour Department Registration
            </span>
            <span className="mt-1 block text-sm text-gray-600">
              Registered with the Directorate of Labour Welfare under the Punjab Shops and
              Establishments Ordinance, 1969.
            </span>
          </span>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/registration/pessi"
          className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block text-base font-bold text-gray-900">PESSI Registration</span>
            <span className="mt-1 block text-sm text-gray-600">
              Registered with the Punjab Employees Social Security Institution for staff social
              security coverage.
            </span>
          </span>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <p>
          Learn more about who we are on our <Link href="/about">About page</Link>, see how we
          vet and place staff on our <Link href="/how-it-works">How It Works page</Link>, or{" "}
          <Link href="/contact">get in touch</Link> if you have questions about our registration.
        </p>
      </div>
    </div>
    <PageArticle page={getPageContent("/registration")} />
    </>
  );
}
