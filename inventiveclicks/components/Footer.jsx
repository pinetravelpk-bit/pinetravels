import Link from "next/link";
import Logo from "./visuals/Logo";
import NewsletterForm from "./ui/NewsletterForm";
import { site, footer } from "../lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-900">
      <div className="pointer-events-none absolute inset-0 mesh opacity-60" />
      <div className="container relative pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo size={36} />
            <p className="mt-5 text-sm leading-relaxed text-muted">{footer.blurb}</p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                Growth notes, monthly
              </p>
              <NewsletterForm />
            </div>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] text-sm font-semibold text-cream/80 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line py-7 text-sm text-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/contact" className="hover:text-cream">
              Contact
            </Link>
            <span className="hover:text-cream cursor-default">Privacy</span>
            <span className="hover:text-cream cursor-default">Terms</span>
            <span className="text-faint">{site.hours}</span>
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <div className="marquee-mask">
          <p className="whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(245,246,239,0.07)]">
            InventiveClicks
          </p>
        </div>
      </div>
    </footer>
  );
}
