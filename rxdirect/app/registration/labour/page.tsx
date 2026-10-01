import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";
import { business, canonicalUrl } from "@/data/business";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Labour Department Registration | Certified & Verified Company",
  description:
    "RX Direct is registered with the Directorate of Labour Welfare, Government of the Punjab under the Punjab Shops and Establishments Ordinance, 1969. View our registration number and download the certificate.",
  alternates: { canonical: canonicalUrl("/registration/labour") },
};

export default function LabourRegistrationPage() {
  const { labour } = business;

  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Registration & Authenticity", url: `${business.siteUrl}/registration` },
          { name: "Labour Department Registration", url: `${business.siteUrl}/registration/labour` },
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
        / <span className="text-gray-700">Labour Department Registration</span>
      </nav>
      <div className="mt-4 flex items-center gap-2 text-brand-600">
        <ShieldCheck className="h-6 w-6" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Certified, Verified &amp; Registered
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Labour Department Registration</h1>
      <p className="mt-2 text-sm text-gray-500">
        {business.name} is a legally registered establishment under Punjab labour law.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Name</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.legalName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Certificate Type</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.certificateType}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registration Number</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.registrationNumber}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registration Date</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.registrationDate}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Valid Till</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.validTill}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Issuing Authority</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.issuingAuthority}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Registered Under</dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.law}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Registered Establishment Address
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-900">{labour.establishmentAddress}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <a
          href={labour.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
        >
          <FileText className="h-4 w-4" />
          View Labour Registration Certificate (PDF)
        </a>
      </div>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <h2>What is a Labour Department registration?</h2>
        <p>
          Under the Punjab Shops and Establishments Ordinance, 1969, every commercial establishment
          operating in Punjab, including staffing and employment agencies like {business.name}, must
          register with the Directorate of Labour Welfare in the district where it operates. This
          registration confirms the business is formally recorded with the provincial labour
          authorities and is subject to the labour standards, working-hours and employment conditions
          set out in the Ordinance.
        </p>
        <p>
          {business.name} holds Registration No. {labour.registrationNumber}, issued by the{" "}
          {labour.issuingAuthority} for the establishment at {labour.establishmentAddress}, valid
          from {labour.registrationDate} to {labour.validTill}. This is separate from, and in
          addition to, our{" "}
          <Link href="/registration">SECP company registration</Link> and our{" "}
          <Link href="/registration/pessi">PESSI social security registration</Link>.
        </p>
        <h2>Why this matters</h2>
        <p>
          A valid labour registration means {business.name} operates as a recognized establishment
          under Punjab law, not an informal or unregistered operator, and is accountable to the
          Labour Department for how it treats its staff and clients. You can view the certificate
          above at any time, or see our full registration overview on the{" "}
          <Link href="/registration">Registration &amp; Authenticity page</Link>.
        </p>
      </div>
    </div>
  );
}
