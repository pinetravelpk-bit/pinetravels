"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronsRight,
  Home,
  Info,
  LayoutGrid,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { serviceGroups } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { business, telLink, whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

interface SubLink {
  href: string;
  label: string;
  external?: boolean;
}
interface Tab {
  key: string;
  href: string;
  label: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
  links: SubLink[];
}

const TOP_SERVICES = ["cooks", "maids", "drivers", "babysitters-nannies", "nurses", "security-guards", "office-boys", "cleaners"];

// Normalise "/about/" and "/about" so active states match either form.
const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export default function Navbar() {
  const { t, locale } = useTranslation();
  const pathname = clean(usePathname() || "/");
  const [preview, setPreview] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<string | null>(null);

  useEffect(() => {
    setPreview(null);
    setMobileOpen(false);
  }, [pathname]);

  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name[locale] ?? slug;
  const group = (slug: string) => serviceGroups.find((g) => g.slug === slug);

  const tabs: Tab[] = [
    {
      key: "home",
      href: "/",
      label: t("nav.home"),
      icon: Home,
      match: (p) => p === "/",
      links: [
        { href: "/how-it-works", label: t("nav.howItWorks") },
        { href: "/pricing", label: t("pricingPage.title") },
        { href: "/registration", label: t("redesign.commitmentTitle") },
        { href: "/blog", label: t("nav.blog") },
        { href: "/faqs", label: t("nav.faqs") },
      ],
    },
    {
      key: "services",
      href: "/services",
      label: t("nav.services"),
      icon: LayoutGrid,
      match: (p) => p.startsWith("/services") && !p.startsWith("/services/category/office-security-staff"),
      links: [
        ...TOP_SERVICES.map((slug) => ({ href: `/services/${slug}`, label: serviceName(slug) })),
        ...serviceGroups
          .filter((g) => g.slug !== "office-security-staff")
          .map((g) => ({ href: `/services/category/${g.slug}`, label: g.name[locale] })),
        { href: "/services", label: t("nav.viewAllServices") },
      ],
    },
    {
      key: "business",
      href: "/services/category/office-security-staff",
      label: t("redesign.forBusinesses"),
      icon: Building2,
      match: (p) => p.startsWith("/services/category/office-security-staff"),
      links: [
        { href: "/services/category/office-security-staff", label: group("office-security-staff")?.name[locale] ?? "Office & Security Staff" },
        { href: "/services/office-boys", label: serviceName("office-boys") },
        { href: "/services/security-guards", label: serviceName("security-guards") },
        { href: "/services/drivers", label: serviceName("drivers") },
        { href: "/pricing", label: t("pricingPage.title") },
        { href: "/contact", label: t("redesign.hireStaff") },
      ],
    },
    {
      key: "locations",
      href: "/cities",
      label: t("redesign.locations"),
      icon: MapPin,
      match: (p) => p.startsWith("/cities"),
      links: [...cities.map((c) => ({ href: `/cities/${c.slug}`, label: c.name[locale] })), { href: "/cities", label: t("nav.viewAllCities") }],
    },
    {
      key: "jobs",
      href: "/jobs",
      label: t("menu.jobs"),
      icon: Briefcase,
      match: (p) => p.startsWith("/jobs"),
      links: [
        { href: "/jobs", label: t("menu.latestJobs") },
        { href: "/jobs#apply", label: t("menu.applyNow") },
        { href: "/staff/register", label: t("menu.registerStaff") },
        { href: "/staff/status", label: t("menu.checkStatus") },
      ],
    },
    {
      key: "verification",
      href: "/staff/register",
      label: t("menu.verification"),
      icon: BadgeCheck,
      match: (p) => p.startsWith("/staff"),
      links: [
        { href: "/staff/register", label: t("menu.registerStaff") },
        { href: "/staff/status", label: t("menu.checkStatus") },
        { href: "/how-it-works", label: t("menu.process") },
        { href: "/registration", label: t("redesign.commitmentTitle") },
      ],
    },
    {
      key: "about",
      href: "/about",
      label: t("redesign.aboutUs"),
      icon: Info,
      match: (p) => ["/about", "/team", "/how-it-works", "/registration", "/blog", "/faqs", "/pricing", "/privacy", "/terms"].some((x) => p === x || p.startsWith(x + "/")),
      links: [
        { href: "/about", label: t("nav.about") },
        { href: "/team", label: t("menu.team") },
        { href: "/how-it-works", label: t("nav.howItWorks") },
        { href: "/registration", label: t("redesign.commitmentTitle") },
        { href: "/blog", label: t("nav.blog") },
        { href: "/faqs", label: t("nav.faqs") },
      ],
    },
    {
      key: "contact",
      href: "/contact",
      label: t("nav.contact"),
      icon: PhoneCall,
      match: (p) => p === "/contact",
      links: [
        { href: "/contact", label: t("nav.contact") },
        { href: whatsappLink(), label: `WhatsApp ${business.phoneDisplay}`, external: true },
        { href: telLink(), label: `${t("redesign.callUs")} ${business.phoneDisplay}`, external: true },
      ],
    },
  ];

  const activeTab = tabs.find((tab) => tab.match(pathname)) ?? tabs[0];
  const shownTab = tabs.find((tab) => tab.key === preview) ?? activeTab;
  const isActiveLink = (href: string) => clean(href.split("#")[0]) === pathname;

  const subLink = (l: SubLink, className: string, activeClass: string) =>
    l.external ? (
      <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className}>
        {l.label}
      </a>
    ) : (
      <Link key={l.href} href={l.href} className={`${className} ${isActiveLink(l.href) ? activeClass : ""}`}>
        {l.label}
      </Link>
    );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_10px_rgba(11,31,77,0.08)]">
      {/* Row 1: brand bar */}
      <div className="border-b border-gray-100">
        <div className="container-px mx-auto flex h-16 max-w-8xl items-center justify-between gap-4 lg:h-[70px]">
          <Logo className="h-9 w-auto lg:h-11" />
          <div className="hidden items-center gap-5 lg:flex">
            <Link href="/registration" className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-brand-700">
              <ShieldCheck className="h-4 w-4 text-brand-600" />
              {t("redesign.topBar")}
            </Link>
            <a href={telLink()} className="flex items-center gap-2 text-sm font-bold text-navy hover:text-brand-700">
              <Phone className="h-4 w-4 text-brand-600" />
              <span dir="ltr">{business.phoneDisplay}</span>
            </a>
            <LanguageSwitcher />
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t("redesign.hireStaff")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <a href={telLink()} aria-label={t("redesign.callUs")} className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 hover:bg-brand-50">
              <Phone className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rows 2 + 3: the double menu (desktop) */}
      <nav className="hidden lg:block" onMouseLeave={() => setPreview(null)} aria-label="Main">
        <div className="bg-gradient-to-b from-white to-slate-100">
          <div className="container-px mx-auto flex max-w-8xl items-end gap-1 pt-2.5 xl:gap-2">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab.key;
              const isShown = tab.key === shownTab.key;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  onMouseEnter={() => setPreview(tab.key)}
                  onFocus={() => setPreview(tab.key)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-t-lg px-2.5 text-[11.5px] font-bold uppercase tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all xl:gap-2 xl:px-4 xl:text-[13px] ${
                    isShown
                      ? "bg-navy pb-3 pt-3"
                      : "mb-1.5 rounded-b-lg bg-gradient-to-b from-brand-500 to-brand-700 py-2.5 hover:from-brand-400 hover:to-brand-600"
                  } ${isActive && !isShown ? "ring-2 ring-navy/40" : ""}`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="bg-navy">
          <div className="container-px mx-auto flex min-h-[46px] max-w-8xl flex-wrap items-center gap-x-1 gap-y-1 py-1.5">
            <ChevronsRight className="me-2 h-5 w-5 text-brand-300 rtl:rotate-180" aria-hidden />
            {shownTab.links.map((l) =>
              subLink(
                l,
                "rounded-md px-3 py-1.5 text-[13px] font-semibold uppercase tracking-wide text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                "bg-black/60 text-white shadow-inner"
              )
            )}
          </div>
        </div>
      </nav>

      {/* Mobile: the same tabs as an accordion */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 bg-white pb-6 lg:hidden">
          {tabs.map((tab) => {
            const open = mobileTab === tab.key;
            return (
              <div key={tab.key} className="border-b border-gray-100">
                <div className="flex items-center">
                  <Link
                    href={tab.href}
                    className={`flex flex-1 items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide ${
                      tab.key === activeTab.key ? "text-brand-700" : "text-navy"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${tab.key === activeTab.key ? "bg-navy" : "bg-brand-600"}`}>
                      <tab.icon className="h-4 w-4" />
                    </span>
                    {tab.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileTab(open ? null : tab.key)}
                    aria-label={`${tab.label} menu`}
                    aria-expanded={open}
                    className="flex h-12 w-12 items-center justify-center text-gray-500"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {open && (
                  <div className="flex flex-wrap gap-2 bg-navy px-4 py-3">
                    {tab.links.map((l) =>
                      subLink(l, "rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white", "bg-black/60")
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <LanguageSwitcher />
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
              {t("redesign.hireStaff")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
