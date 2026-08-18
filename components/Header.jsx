"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "../lib/site";

const socials = [
  { href: site.socials.instagram, Icon: Instagram, label: "Instagram" },
  { href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: site.socials.youtube, Icon: Youtube, label: "YouTube" },
  { href: site.socials.x, Icon: Twitter, label: "X" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Top utility bar ── */}
      <div
        className={`overflow-hidden bg-ink text-white/80 transition-[max-height,opacity] duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container-x flex h-11 items-center justify-between gap-4 text-[13px]">
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand-300" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-2 hover:text-white sm:inline-flex">
              <Mail className="h-3.5 w-3.5 text-brand-300" /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/70 transition-colors hover:text-white">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? "border-b border-brand-900/5 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(23,1,44,0.3)]"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
                  isActive(item.href) ? "text-brand-700" : "text-ink hover:text-brand-700"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full grad-brand" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="btn-primary text-sm">
              Work with us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/10 bg-white text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`overflow-hidden border-t border-brand-900/5 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 font-body text-base font-semibold ${
                  isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-cloud"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-2 w-full">
              Work with us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
