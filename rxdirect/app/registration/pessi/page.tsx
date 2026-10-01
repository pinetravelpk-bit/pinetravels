import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "PESSI Registration | Certified & Verified Company",
  description:
    "RX Direct is registered with the Punjab Employees Social Security Institution (PESSI), securing social security coverage for our staff. View our registration number and download the certificate.",
  alternates: { canonical: canonicalUrl("/registration/pessi") },
};

export default function PessiRegistrationPage() {
  const { pessi } = business;

  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Registration & Authenticity", url: `${business.siteUrl}/registration` },
          { name: "PESSI Registration", url: `${business.siteUrl}/registration/pessi` },
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
        / <span className="text-gray-700">PESSI Registration</span>
      </nav>
      <div className="mt-4 flex items-center gap-2 text-brand-600">
        <ShieldCheck className="h-6 w-6" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Certified, Verified &amp; Registered
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-extrabold text-gray-900">PESSI Registration</h1>
      <p className="mt-2 text-sm text-gray-500">
        {business.name} is registered with the Punjab Employees Social Security Institution.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Name</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Certificate Type</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.certificateType}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registration Number</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.registrationNumber}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registration Date</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.registrationDate}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Issuing Authority</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.issuingAuthority}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Under</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.law}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Registered Establishment Address
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{pessi.establishmentAddress}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <a
          href={pessi.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
        >
          <FileText className="h-4 w-4" />
          View PESSI Registration Certificate (PDF)
        </a>
      </div>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <h2>What is PESSI registration?</h2>
        <p>
          The Punjab Employees Social Security Institution (PESSI) is a Government of the Punjab
          body that provides social security coverage, including medical care and other benefits,
          to registered employees under the Provincial Employees Social Security Ordinance, 1965.
          Employers are required to register their establishment and contribute toward their staff&apos;s
          social security coverage. This is a direct, practical protection for the people we place,
          not just a compliance formality.
        </p>
        <p>
          {business.name} holds Registration No. {pessi.registrationNumber}, issued by the{" "}
          {pessi.issuingAuthority} for the establishment at {pessi.establishmentAddress}, registered
          on {pessi.registrationDate}. This sits alongside our{" "}
          <Link href="/registration">SECP company registration</Link> and our{" "}
          <Link href="/registration/labour">Labour Department registration</Link>.
        </p>
        <h2>Why this matters</h2>
        <p>
          PESSI registration means {business.name} contributes toward social security coverage for
          our registered staff, a meaningful signal of how we treat the people we place, not just
          our clients. You can view the certificate above at any time, or see our full registration
          overview on the <Link href="/registration">Registration &amp; Authenticity page</Link>.
        </p>
      </div>
    </div>
  );
}
