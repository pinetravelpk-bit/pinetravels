"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href) ? "text-brand-600" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Link href="/employers" className="btn-primary">Hire Staff</Link>
        </div>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 font-medium ${isActive(item.href) ? "text-brand-600" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/employers" onClick={() => setOpen(false)} className="btn-primary mt-2">Hire Staff</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
