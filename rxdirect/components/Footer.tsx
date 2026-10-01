"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { serviceGroups } from "@/data/serviceGroups";
import { business, telLink, whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import Logo from "@/components/Logo";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TiktokIcon,
} from "@/components/icons";

const socialLinks = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
] as const;

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-navy">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-gray-600">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-brand-600">
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { t, locale } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-px mx-auto max-w-8xl py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="h-12 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">{t("footer.description")}</p>
            <div className="mt-5 flex gap-2.5">
              {socialLinks.map(({ key, label, Icon }) =>
                business.social[key] ? (
                  <a
                    key={key}
                    href={business.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null
              )}
            </div>
            <Link
              href="/registration"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              SECP-Registered &amp; Certified &middot; CUIN {business.secp.cuin}
            </Link>
          </div>

          <Column title={t("nav.services")}>
            {services.slice(0, 8).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.name[locale]}
              </FooterLink>
            ))}
            <FooterLink href="/services">{t("nav.viewAllServices")}</FooterLink>
          </Column>

          <Column title={t("redesign.forBusinesses")}>
            {serviceGroups.map((g) => (
              <FooterLink key={g.slug} href={`/services/category/${g.slug}`}>
                {g.name[locale]}
              </FooterLink>
            ))}
            <FooterLink href="/pricing">{t("pricingPage.title")}</FooterLink>
          </Column>

          <Column title={t("redesign.locations")}>
            {cities.map((c) => (
              <FooterLink key={c.slug} href={`/cities/${c.slug}`}>
                {c.name[locale]}
              </FooterLink>
            ))}
          </Column>

          <Column title={t("redesign.aboutUs")}>
            <FooterLink href="/about">{t("nav.about")}</FooterLink>
            <FooterLink href="/how-it-works">{t("nav.howItWorks")}</FooterLink>
            <FooterLink href="/registration">{t("redesign.commitmentTitle")}</FooterLink>
            <FooterLink href="/blog">{t("nav.blog")}</FooterLink>
            <FooterLink href="/faqs">{t("nav.faqs")}</FooterLink>
            <FooterLink href="/contact">{t("nav.contact")}</FooterLink>
          </Column>

          <div className="col-span-2 md:col-span-1">
            <Column title={t("redesign.lookingForWork")}>
              <li>
                <Link href="/jobs" className="link-arrow">
                  {t("redesign.applyForJobs")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </li>
            </Column>
            <h3 className="mt-6 text-sm font-bold text-navy">{t("footer.getInTouch")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-600">
                  <WhatsAppIcon className="h-4 w-4 shrink-0" /> <span dir="ltr">{business.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={telLink()} className="flex items-center gap-2 hover:text-brand-600">
                  <Phone className="h-4 w-4 shrink-0" /> <span dir="ltr">{business.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-2 break-all hover:text-brand-600">
                  <Mail className="h-4 w-4 shrink-0" /> {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {business.address[locale]}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-5">
        <div className="container-px mx-auto flex max-w-8xl flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p suppressHydrationWarning>
            &copy; {year} {business.name}. {t("footer.rightsReserved")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/registration" className="hover:text-brand-600">
              SECP Registered
            </Link>
            <Link href="/privacy" className="hover:text-brand-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
