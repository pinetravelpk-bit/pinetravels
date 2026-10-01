import type { Metadata } from "next";
import { business, canonicalUrl } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RX Direct collects, uses and protects your information when you contact us or use our domestic staffing services.",
  alternates: { canonical: canonicalUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="prose prose-gray mt-8 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600">
        <p>
          {business.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides verified domestic staffing
          services across Pakistan. This policy explains what information we collect
          when you contact us or use {business.siteUrl}, and how we use it.
        </p>

        <h2>Information we collect</h2>
        <p>When you reach out to us, via WhatsApp, our contact form, or a blog comment, we may collect:</p>
        <ul>
          <li>Your name and phone number (or WhatsApp contact details)</li>
          <li>Your city, area, and the type of staff you&apos;re looking to hire</li>
          <li>Any details you share about your requirements</li>
          <li>Standard website analytics (pages visited, general location, device type) via Google Analytics</li>
        </ul>

        <h2>How we use your information</h2>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Match you with suitable, verified candidates</li>
          <li>Contact you about your request and coordinate placement</li>
          <li>Improve our website and services based on aggregate usage patterns</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>Candidate information</h2>
        <p>
          For staff we place, we collect and verify identity documents (CNIC), reference
          contacts, and relevant background information as part of our screening process,
          described on our{" "}
          <a href="/how-it-works">How It Works</a> page. This information is used solely
          for verification and placement purposes.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use our site. This may set
          cookies in your browser. You can disable cookies in your browser settings at
          any time.
        </p>

        <h2>Blog comments</h2>
        <p>
          Comments submitted on our blog are held for review before being published.
          Only your name (or a name you choose to provide) and comment text are shown
          publicly, your contact details are never displayed.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain contact and placement information for as long as reasonably needed
          to provide our services and meet any applicable legal requirements, after
          which it is deleted or anonymized.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to update or delete the information we hold about you at any
          time by contacting us via WhatsApp or the details on our{" "}
          <a href="/contact">Contact</a> page.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &quot;Last updated&quot; date above
          reflects the most recent revision.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Reach us via{" "}
          <a href="/contact">our contact page</a>.
        </p>
      </div>
    </div>
  );
}
