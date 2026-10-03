"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Info,
  ListChecks,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { serviceGroups } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { business, telLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import CitiesMegaMenu from "@/components/CitiesMegaMenu";
import LinkMegaMenu, { type MegaColumn } from "@/components/LinkMegaMenu";

type MenuKey = "services" | "business" | "locations" | "about";

// Normalise "/about/" and "/about" so active states match either form.
const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export default function Navbar() {
  const { t, locale } = useTranslation();
  const pathname = clean(usePathname() || "/");
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name[locale] ?? slug;
  const officeGroup = serviceGroups.find((g) => g.slug === "office-security-staff");

  // Upper line: every page that isn't one of the four mega menus.
  const pageLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/jobs", label: t("menu.jobs") },
    { href: "/staff/register", label: t("menu.verification") },
    { href: "/staff/status", label: t("menu.checkStatus") },
    { href: "/team", label: t("menu.team") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/faqs", label: t("nav.faqs") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const businessColumns: MegaColumn[] = [
    {
      heading: officeGroup?.name[locale] ?? "Office & Security Staff",
      items: [
        { href: "/services/category/office-security-staff", title: officeGroup?.name[locale] ?? "Office & Security Staff", desc: t("menu.officeDesc"), icon: Building2 },
        { href: "/services/office-boys", title: serviceName("office-boys"), desc: services.find((s) => s.slug === "office-boys")?.shortDesc[locale], icon: Briefcase },
        { href: "/services/security-guards", title: serviceName("security-guards"), desc: services.find((s) => s.slug === "security-guards")?.shortDesc[locale], icon: ShieldCheck },
        { href: "/services/drivers", title: serviceName("drivers"), desc: services.find((s) => s.slug === "drivers")?.shortDesc[locale], icon: Car },
      ],
    },
    {
      heading: t("menu.forEmployers"),
      items: [
        { href: "/pricing", title: t("pricingPage.title"), desc: t("menu.pricingDesc"), icon: BadgeDollarSign },
        { href: "/registration", title: t("redesign.commitmentTitle"), desc: t("menu.regDesc"), icon: ClipboardCheck },
        { href: "/how-it-works", title: t("nav.howItWorks"), desc: t("menu.howDesc"), icon: ListChecks },
        { href: "/staff/register", title: t("menu.verification"), desc: t("menu.verifyDesc"), icon: BadgeCheck },
      ],
    },
  ];

  const aboutColumns: MegaColumn[] = [
    {
      heading: t("menu.company"),
      items: [
        { href: "/about", title: t("nav.about"), desc: t("menu.aboutDesc"), icon: Info },
        { href: "/team", title: t("menu.team"), desc: t("menu.teamDesc"), icon: Users },
        { href: "/how-it-works", title: t("nav.howItWorks"), desc: t("menu.howDesc"), icon: ListChecks },
        { href: "/registration", title: t("redesign.commitmentTitle"), desc: t("menu.regDesc"), icon: ClipboardCheck },
      ],
    },
    {
      heading: t("menu.resources"),
      items: [
        { href: "/blog", title: t("nav.blog"), desc: t("menu.blogDesc"), icon: BookOpen },
        { href: "/faqs", title: t("nav.faqs"), desc: t("menu.faqsDesc"), icon: CircleHelp },
        { href: "/pricing", title: t("pricingPage.title"), desc: t("menu.pricingDesc"), icon: BadgeDollarSign },
        { href: "/jobs", title: t("menu.jobs"), desc: t("menu.jobsDesc"), icon: Briefcase },
      ],
    },
  ];

  const mainMenus: { key: MenuKey; label: string; href: string; active: boolean }[] = [
    { key: "services", label: t("nav.services"), href: "/services", active: pathname.startsWith("/services") && !pathname.startsWith("/services/category/office-security-staff") },
    { key: "business", label: t("redesign.forBusinesses"), href: "/services/category/office-security-staff", active: ["/services/category/office-security-staff", "/pricing"].includes(pathname) },
    { key: "locations", label: t("redesign.locations"), href: "/cities", active: pathname.startsWith("/cities") },
    { key: "about", label: t("redesign.aboutUs"), href: "/about", active: ["/about", "/team", "/how-it-works", "/registration"].some((p) => pathname === p || pathname.startsWith(p + "/")) },
  ];

  const close = () => setOpen(null);
  // Hover opens on desktop pointers; a short delay stops the menu flickering
  // shut while the mouse travels from the button into the panel.
  const hoverOpen = (key: MenuKey) => {
    clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hoverClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const panel = (key: MenuKey) => {
    if (key === "services") return <ServicesMegaMenu onNavigate={close} />;
    if (key === "locations") return <CitiesMegaMenu onNavigate={close} />;
    if (key === "business")
      return (
        <LinkMegaMenu
          columns={businessColumns}
          onNavigate={close}
          feature={{ eyebrow: t("menu.bizFeatureEyebrow"), title: t("menu.bizFeatureTitle"), text: t("menu.bizFeatureText"), href: "/contact", cta: t("menu.requestStaff") }}
        />
      );
    return (
      <LinkMegaMenu
        columns={aboutColumns}
        onNavigate={close}
        align="right"
        feature={{ eyebrow: t("menu.aboutFeatureEyebrow"), title: t("menu.aboutFeatureTitle"), text: t("menu.aboutFeatureText"), href: "/how-it-works", cta: t("menu.seeProcess") }}
      />
    );
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white shadow-[0_2px_10px_rgba(11,31,77,0.08)]">
      {/* Upper line: all other pages */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="container-px mx-auto flex h-10 max-w-8xl items-center justify-between gap-4">
          <nav className="flex items-center gap-0.5" aria-label="Pages">
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-2.5 py-1 text-[13px] font-medium transition-colors xl:px-3 ${
                  isActive(l.href) ? "bg-white/15 text-white" : "text-brand-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-[13px]">
            <Link href="/registration" className="hidden items-center gap-1.5 text-brand-100 hover:text-white xl:flex">
              <ShieldCheck className="h-4 w-4" />
              {t("redesign.topBar")}
            </Link>
            <a href={telLink()} className="flex items-center gap-1.5 font-semibold hover:text-brand-200">
              <Phone className="h-3.5 w-3.5" />
              <span dir="ltr">{business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main line: logo, the four mega menus, actions */}
      <div className="container-px mx-auto flex h-16 max-w-8xl items-center justify-between gap-4 lg:h-[74px]">
        <Logo className="h-9 w-auto lg:h-11" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainMenus.map((m) => (
            <div key={m.key} className="relative" onMouseEnter={() => hoverOpen(m.key)} onMouseLeave={hoverClose}>
              <button
                type="button"
                onClick={() => setOpen((v) => (v === m.key ? null : m.key))}
                aria-expanded={open === m.key}
                className={`flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-[15px] font-semibold transition-colors ${
                  open === m.key || m.active ? "bg-brand-50 text-brand-700" : "text-gray-800 hover:text-brand-700"
                }`}
              >
                {m.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${open === m.key ? "rotate-180" : ""}`} />
              </button>
              {open === m.key && panel(m.key)}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href="/hire-staff" className="btn-primary">
            {t("redesign.hireStaff")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
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

      {/* Mobile */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 bg-white pb-6 lg:hidden">
          {mainMenus.map((m) => {
            const expanded = mobileSection === m.key;
            const links =
              m.key === "services"
                ? [...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name[locale] })), ...serviceGroups.map((g) => ({ href: `/services/category/${g.slug}`, label: g.name[locale] })), { href: "/services", label: t("nav.viewAllServices") }]
                : m.key === "locations"
                ? [...cities.map((c) => ({ href: `/cities/${c.slug}`, label: c.name[locale] })), { href: "/cities", label: t("nav.viewAllCities") }]
                : (m.key === "business" ? businessColumns : aboutColumns).flatMap((c) => c.items.map((i) => ({ href: i.href, label: i.title })));
            return (
              <div key={m.key} className="border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setMobileSection(expanded ? null : m.key)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-[15px] font-bold text-navy"
                >
                  {m.label}
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && (
                  <div className="grid grid-cols-2 gap-1 bg-brand-50/60 px-3 pb-3">
                    {Array.from(new Map(links.map((l) => [l.href, l])).values()).map((l) => (
                      <Link key={l.href} href={l.href} className="rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-white hover:text-brand-700">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex flex-wrap gap-2 bg-navy px-4 py-4">
            {pageLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-md px-3 py-1.5 text-sm font-medium ${isActive(l.href) ? "bg-white/20 text-white" : "bg-white/10 text-brand-100"}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <LanguageSwitcher />
            <Link href="/hire-staff" className="btn-primary flex-1">
              {t("redesign.hireStaff")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
