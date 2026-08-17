"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./visuals/Logo";
import { nav, site } from "../lib/data";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-smooth ${
          scrolled ? "border-b border-line bg-ink-900/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container flex items-center justify-between gap-6 py-3.5">
          <Link href="/" aria-label="InventiveClicks home" className="shrink-0">
            <Logo size={34} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? "text-brand" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="group relative">
                  <button
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? "text-brand" : "text-cream/80 group-hover:text-cream"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-300 ease-smooth group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                    <div className="w-72 overflow-hidden rounded-2xl border border-line bg-ink-800/95 p-2 shadow-soft backdrop-blur-xl">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="group/i flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70 transition-transform group-hover/i:scale-150" />
                          <span>
                            <span className="block text-sm font-semibold text-cream">{c.label}</span>
                            {c.desc && <span className="block text-xs text-muted">{c.desc}</span>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="btn-primary hidden text-sm sm:inline-flex"
            >
              Start a project
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-cream lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-ink-900/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="container flex flex-col gap-1 py-6">
              {nav.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className="border-b border-line py-1"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-3 text-lg font-semibold ${
                      isActive(pathname, item.href) ? "text-brand" : "text-cream"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-1 pb-3 pl-1">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="py-1.5 text-sm text-muted hover:text-cream">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <Link href="/contact" className="btn-primary mt-5 w-full">
                Start a project
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </Link>
              <div className="mt-6 flex flex-col gap-1 text-sm text-muted">
                <a href={`mailto:${site.email}`} className="hover:text-cream">
                  {site.email}
                </a>
                <a href={site.phoneHref} className="hover:text-cream">
                  {site.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
