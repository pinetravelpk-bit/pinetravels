import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/motion";
import { site } from "../lib/data";

export default function CTA({
  title = "Let's turn your clicks into compounding growth",
  text = "Tell us where you want to go. We'll show you the fastest, most profitable way to get there — with a plan you can actually take to your board.",
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink-800 px-6 py-16 md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 mesh" />
          <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-violet/20 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="eyebrow mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Ready when you are
            </span>
            <h2 className="text-3xl font-bold balance sm:text-4xl md:text-[3.25rem] md:leading-[1.03]">{title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{text}</p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
                <ArrowUpRight size={17} strokeWidth={2.25} />
              </Link>
              <a href={site.phoneHref} className="btn-ghost" >
                Book a call
              </a>
            </div>
            <p className="mt-6 text-sm text-faint">
              Prefer email?{" "}
              <a href={`mailto:${site.email}`} className="text-cream underline-offset-4 hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
