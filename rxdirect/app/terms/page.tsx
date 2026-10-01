import type { Metadata } from "next";
import { business, canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use RX Direct to hire verified domestic staff across Pakistan.",
  alternates: { canonical: canonicalUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="prose prose-gray mt-8 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <p>
          These terms govern your use of {business.siteUrl} and RX Direct&apos;s staff
          placement services. By contacting us or engaging our services, you agree to
          these terms.
        </p>

        <h2>Our service</h2>
        <p>
          {business.name} places background-verified domestic and office staff, cooks, drivers, maids/helpers, cleaners, security guards, office boys,
          nannies and gardeners, for clients across the cities listed on our{" "}
          <a href="/cities">Cities</a> page. Our verification process is described on
          our <a href="/how-it-works">How It Works</a> page.
        </p>

        <h2>Client responsibilities</h2>
        <ul>
          <li>Provide accurate information about your staffing requirements, location and household or office details.</li>
          <li>Interview and approve any candidate before they begin work, placement is not final until you&apos;ve confirmed a candidate is suitable.</li>
          <li>Treat placed staff fairly and in line with applicable Pakistani labour standards.</li>
          <li>Communicate any issues with a placement promptly so we can address them.</li>
        </ul>

        <h2>Trial periods and replacement</h2>
        <p>
          Where a trial period or replacement guarantee applies to your placement, its
          specific terms will be confirmed with you directly at the time of booking, as
          arrangements can vary by role and city. See our{" "}
          <a href="/faqs">FAQs</a> for general guidance.
        </p>

        <h2>Payments</h2>
        <p>
          Placement fees and staff salaries are agreed directly with you before a
          placement is confirmed. We do not charge hidden fees beyond what&apos;s agreed in
          writing or over WhatsApp before placement.
        </p>

        <h2>No guarantee of specific outcomes</h2>
        <p>
          While we screen every candidate through CNIC verification, reference checks
          and interviews, we cannot guarantee the future conduct of any individual we
          place. We encourage clients to conduct their own reasonable diligence during
          the trial period and to report any concerns immediately.
        </p>

        <h2>Website use</h2>
        <p>
          Content on this site, including blog posts, service descriptions and
          city/society guides, is provided for general informational purposes. Blog
          comments are moderated and must not contain spam, abusive content, or false
          information.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by applicable law, {business.name} is not liable for
          indirect or consequential losses arising from a staff placement, beyond
          arranging a suitable replacement under our replacement policy where
          applicable.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of Pakistan.</p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The &quot;Last updated&quot; date above
          reflects the most recent revision.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms? Reach us via{" "}
          <a href="/contact">our contact page</a>.
        </p>
      </div>
    </div>
  );
}
