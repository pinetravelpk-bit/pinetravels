import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FBR Tax Registration (NTN) | Certified & Verified Company",
  description:
    "RX Direct is registered with the Federal Board of Revenue (FBR) and holds a valid National Tax Number (NTN). View our NTN and download the taxpayer registration certificate.",
  alternates: { canonical: canonicalUrl("/registration/fbr") },
};

export default function FbrRegistrationPage() {
  const { fbr } = business;

  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Registration & Authenticity", url: `${business.siteUrl}/registration` },
          { name: "FBR Tax Registration", url: `${business.siteUrl}/registration/fbr` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/registration" className="hover:text-brand-600">
          Registration &amp; Authenticity
        </Link>{" "}
        / <span className="text-gray-700">FBR Tax Registration</span>
      </nav>
      <div className="mt-4 flex items-center gap-2 text-brand-600">
        <ShieldCheck className="h-6 w-6" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Certified, Verified &amp; Registered
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-extrabold text-gray-900">FBR Tax Registration (NTN)</h1>
      <p className="mt-2 text-sm text-gray-500">
        {business.name} is a registered taxpayer with the Federal Board of Revenue.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Name</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Certificate Type</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.certificateType}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              National Tax Number (NTN)
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.ntn}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registration Date</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.registrationDate}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Issuing Authority</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.issuingAuthority}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Under</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.law}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Registered Establishment Address
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{fbr.establishmentAddress}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <a
          href={fbr.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
        >
          <FileText className="h-4 w-4" />
          View FBR Registration Certificate (PDF)
        </a>
      </div>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <h2>What is FBR tax registration?</h2>
        <p>
          Under Section 181C of the Income Tax Ordinance, 2001, every company operating in Pakistan
          must register with the Federal Board of Revenue (FBR) and hold a National Tax Number (NTN).
          This registration confirms the business is a recognized, tax-compliant taxpayer under
          Pakistani law, and the FBR Taxpayer Registration Certificate is the official document
          proving it.
        </p>
        <p>
          {business.name} holds NTN {fbr.ntn}, issued by the {fbr.issuingAuthority} for the
          registered address at {fbr.establishmentAddress} on {fbr.registrationDate}. This sits
          alongside our <Link href="/registration">SECP company registration</Link>,{" "}
          <Link href="/registration/labour">Labour Department registration</Link>, and{" "}
          <Link href="/registration/pessi">PESSI registration</Link>.
        </p>
        <h2>Why this matters</h2>
        <p>
          A valid FBR registration means {business.name} operates as a documented, tax-compliant
          company, not an informal or undocumented operator. You can view the certificate above at
          any time, or see our full registration overview on the{" "}
          <Link href="/registration">Registration &amp; Authenticity page</Link>.
        </p>
      </div>
    </div>
  );
}
