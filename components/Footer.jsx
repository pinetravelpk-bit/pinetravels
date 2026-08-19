import Link from "next/link";
import { Instagram, Linkedin, Youtube, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { LogoMark } from "./Logo";
import { site, footerLinks } from "../lib/site";

const socialIcons = [
  { href: site.socials.instagram, Icon: Instagram, label: "Instagram" },
  { href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: site.socials.youtube, Icon: Youtube, label: "YouTube" },
  { href: site.socials.x, Icon: Twitter, label: "X" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden grad-ink text-brand-100/70">
      {/* soft glow */}
      <div className="aurora -left-40 -top-40 h-96 w-96 bg-brand-600/40" aria-hidden="true" />
      <div className="aurora -right-32 top-10 h-80 w-80 bg-azure-500/30" aria-hidden="true" />

      <div className="container-x relative py-16 lg:py-20">
        {/* CTA strip */}
        <div className="mb-14 grid gap-6 rounded-xl3 grad-border-dark p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Got a brand worth clicking on?
            </h2>
            <p className="mt-2 max-w-xl text-brand-100/70">
              Tell us where you want to grow. We'll come back with ideas — and a plan to make them perform.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="btn-primary">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/work" className="btn-outline-light">
              See our work
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-[20px] font-extrabold tracking-tight text-white">
                Inventive<span className="grad-text">Clicks</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A creative digital marketing agency turning attention into growth — video, design,
              campaigns and creators, under one roof.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socialIcons.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-display text-sm font-bold uppercase tracking-eyebrow text-white/90">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-eyebrow text-white/90">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Mail className="h-4 w-4 text-brand-300" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 text-brand-300" /> {site.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <span>
                  {site.address.city}, {site.address.region} · {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-brand-100/50">
            Crafted with intent — {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
