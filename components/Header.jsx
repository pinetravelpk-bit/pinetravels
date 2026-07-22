"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { site } from "../lib/data";

const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Hotels", href: "/hotels" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/#packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-pine-800 text-cream/85 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[12.5px]">
          <span className="tracking-wide">Northern Pakistan tours, weddings &amp; travel services</span>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </a>
            <a href={site.whatsappHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className={`border-b transition-all duration-300 ${scrolled ? "border-pine-600/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80" : "border-transparent bg-cream"}`}>
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Pine Travel home">
            <img src="/images/pine-travel-logo.png" alt="Pine Travel" width={44} height={44} className="h-11 w-11 object-contain" />
            <span className="font-display text-lg font-extrabold leading-none tracking-tight">
              <span className="text-pine-600">PINE</span> <span className="text-maroon-600">TRAVEL</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <Link key={n.label} href={n.href} className="font-body text-[14.5px] font-medium text-ink-soft transition-colors hover:text-pine-700">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-primary hidden sm:inline-flex">Plan a Trip</Link>
            <button type="button" onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pine-600/20 text-pine-800 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[68px] z-40 bg-cream/98 backdrop-blur lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-6">
            {nav.map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-display text-lg font-semibold text-ink hover:bg-pine-50">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4">Plan a Trip</Link>
            <div className="mt-6 flex flex-col gap-2 px-4 text-sm text-ink-soft">
              <a href={site.phoneHref} className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-pine-600" /> {site.phone}</a>
              <a href={site.whatsappHref} className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4 text-pine-600" /> WhatsApp us</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
