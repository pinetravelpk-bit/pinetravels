import type { Metadata } from "next";
import Link from "@/components/LocaleLink";

// Copied to out/404.html after the build (package.json "postbuild"), which
// nginx serves for unknown URLs. With one root layout per language there is
// no site-wide not-found page, so this keeps the 404 inside the site design.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function PageNotFound() {
  return (
    <section className="section-py container-px mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">This page could not be found</h1>
      <p className="mt-4 text-gray-600">
        The link may be old or mistyped. You can go back to the home page or find staff below.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white">
          Home
        </Link>
        <Link href="/services" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-navy">
          Our services
        </Link>
        <Link href="/hire-staff" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-navy">
          Hire staff
        </Link>
      </div>
    </section>
  );
}
