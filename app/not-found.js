import Link from "next/link";
import { Home, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden grad-soft pt-[72px]">
      <div className="aurora -left-20 top-10 h-96 w-96 bg-brand-400/40" aria-hidden="true" />
      <div className="aurora right-0 top-0 h-80 w-80 bg-azure-400/30" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

      <div className="container-x relative flex flex-col items-center text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none grad-text-aurora sm:text-[10rem]">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          This link didn't quite click.
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-muted">
          The page you're after has moved or never existed. Let's get you back to something that works.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/services" className="btn-ghost">
            Explore services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
