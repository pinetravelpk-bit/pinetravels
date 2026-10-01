"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Home, Building2, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { serviceGroups } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { business, telLink, whatsappLink } from "@/data/business";
import Logo from "@/components/Logo";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { WhatsAppIcon } from "@/components/icons";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import CitiesMegaMenu from "@/components/CitiesMegaMenu";

const groupIcon = { "household-staff": Home, "office-security-staff": Building2 } as const;

export default function Navbar() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [mobileOpenCitySlug, setMobileOpenCitySlug] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setServicesOpen(false);
    setCitiesOpen(false);
    setMenuOpen(null);
    setMobileOpen(false);
    setMobileOpenCitySlug(null);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setCitiesOpen(false);
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Every page the old top menu linked to is still one click away, grouped
  // under the redesign's "For Businesses" and "About Us" dropdowns.
  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name[locale] ?? slug;
  const officeGroup = serviceGroups.find((g) => g.slug === "office-security-staff");
  const businessLinks = [
    { href: "/services/category/office-security-staff", label: officeGroup?.name[locale] ?? "Office & Security Staff" },
    { href: "/services/office-boys", label: serviceName("office-boys") },
    { href: "/services/security-guards", label: serviceName("security-guards") },
    { href: "/services/drivers", label: serviceName("drivers") },
    { href: "/pricing", label: t("pricingPage.title") },
    { href: "/registration", label: t("redesign.commitmentTitle") },
  ];

  const aboutLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/faqs", label: t("nav.faqs") },
    { href: "/jobs", label: t("jobsPage.title") },
  ];

  const navLinks = [...businessLinks.slice(4), ...aboutLinks, { href: "/contact", label: t("nav.contact") }];

  const linkClass =
    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-brand-600";

  const dropdown = (key: string, label: string, links: { href: string; label: string }[]) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setMenuOpen((v) => (v === key ? null : key));
          setServicesOpen(false);
          setCitiesOpen(false);
        }}
        className={linkClass}
        aria-expanded={menuOpen === key}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen === key ? "rotate-180" : ""}`} />
      </button>
      {menuOpen === key && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl rtl:left-auto rtl:right-0">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(null)}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-navy text-white">
        <div className="container-px mx-auto flex h-9 max-w-8xl items-center justify-between text-xs font-medium">
          <Link href="/registration" className="flex items-center gap-2 hover:text-brand-200">
            <ShieldCheck className="h-4 w-4" />
            {t("redesign.topBar")}
          </Link>
          <a href={telLink()} className="flex items-center gap-2 hover:text-brand-200">
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("redesign.callUs")}</span>
            <span dir="ltr">{business.phoneDisplay}</span>
          </a>
        </div>
      </div>
      <nav className="container-px mx-auto flex h-16 max-w-8xl items-center justify-between lg:h-[76px]">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setServicesOpen((v) => !v);
                setCitiesOpen(false);
                setMenuOpen(null);
              }}
              className={linkClass}
              aria-expanded={servicesOpen}
            >
              {t("nav.services")}
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && <ServicesMegaMenu onNavigate={() => setServicesOpen(false)} />}
          </div>

          {dropdown("business", t("redesign.forBusinesses"), businessLinks)}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCitiesOpen((v) => !v);
                setServicesOpen(false);
                setMenuOpen(null);
              }}
              className={linkClass}
              aria-expanded={citiesOpen}
            >
              {t("redesign.locations")}
              <ChevronDown className={`h-4 w-4 transition-transform ${citiesOpen ? "rotate-180" : ""}`} />
            </button>
            {citiesOpen && <CitiesMegaMenu onNavigate={() => setCitiesOpen(false)} />}
          </div>

          {dropdown("about", t("redesign.aboutUs"), aboutLinks)}

          <Link href="/contact" className={linkClass}>
            {t("nav.contact")}
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {t("redesign.hireStaff")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-50 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-6.25rem)] overflow-y-auto border-t border-gray-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t("nav.home")}
            </Link>

            {/* Services: L1 toggle reveals both groups fully expanded (only 8 services total) */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t("nav.services")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="ml-2 flex flex-col gap-3 border-l-2 border-brand-100 pl-3">
                {serviceGroups.map((g) => {
                  const Icon = groupIcon[g.slug as keyof typeof groupIcon] ?? Home;
                  const groupServices = services.filter((s) =>
                    g.serviceSlugs.includes(s.slug)
                  );
                  return (
                    <div key={g.slug}>
                      <Link
                        href={`/services/category/${g.slug}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-brand-600"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {g.name[locale]}
                      </Link>
                      <div className="flex flex-col gap-0.5">
                        {groupServices.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                          >
                            {s.name[locale]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <Link
                  href="/services"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-gray-50"
                >
                  {t("nav.viewAllServices")}
                </Link>
              </div>
            )}

            {/* Cities: L1 toggle reveals city list; each city expands (L2) to show its societies */}
            <button
              type="button"
              onClick={() => setMobileCitiesOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t("redesign.locations")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileCitiesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileCitiesOpen && (
              <div className="ml-2 flex flex-col gap-0.5 border-l-2 border-brand-100 pl-3">
                {cities.map((c) => {
                  const isOpen = mobileOpenCitySlug === c.slug;
                  return (
                    <div key={c.slug}>
                      <div className="flex items-center">
                        <Link
                          href={`/cities/${c.slug}`}
                          className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                        >
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {c.name[locale]}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Toggle ${c.name.en} societies`}
                          onClick={() =>
                            setMobileOpenCitySlug(isOpen ? null : c.slug)
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-brand-600"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      {isOpen && (
                        <div className="ml-4 flex flex-col gap-0.5 border-l-2 border-gray-100 pl-3">
                          {c.societies.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/cities/${c.slug}/${s.slug}`}
                              className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-brand-600"
                            >
                              {s.name[locale]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  href="/cities"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-gray-50"
                >
                  {t("nav.viewAllCities")}
                </Link>
              </div>
            )}

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <LanguageSwitcher />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("redesign.hireStaff")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
