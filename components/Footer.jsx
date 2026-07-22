import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { site, footerLinks } from "../lib/data";
import { PineRidge } from "./Scenery";

export default function Footer() {
  return (
    <footer className="grad-pine relative mt-4 text-cream/80">
      <PineRidge className="absolute -top-[1px] left-0 h-6 w-full" color="#04340d" />
      <div className="contour absolute inset-0 opacity-50" />

      <div className="container-x relative grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-cream">
              <img src="/images/pine-travel-logo.png" alt="Pine Travel" className="h-10 w-10 object-contain" />
            </span>
            <span className="font-display text-xl font-extrabold text-cream">PINE TRAVEL</span>
          </div>
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-cream/70">
            A Rawalpindi-based travel company crafting tours, weddings and getaways across the
            mountains and forests of Northern Pakistan.
          </p>
          <ul className="mt-6 space-y-3 text-[14px]">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pine-200" />
              <span className="text-cream/70">{site.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-pine-200" />
              <a href={site.phoneHref} className="text-cream/70 hover:text-white">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 shrink-0 text-pine-200" />
              <a href={site.whatsappHref} className="text-cream/70 hover:text-white">WhatsApp us</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-pine-200" />
              <a href={"mailto:" + site.email} className="text-cream/70 hover:text-white">{site.email}</a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Facebook, href: site.social.facebook, label: "Facebook" },
              { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
              { Icon: Youtube, href: site.social.youtube, label: "YouTube" },
              { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-cream hover:bg-cream hover:text-pine-800">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream">Top Destinations</h4>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {footerLinks.topDestinations.map((l) => (
              <li key={l}><Link href="/#packages" className="text-cream/70 transition-colors hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream">Popular Search</h4>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {footerLinks.popularSearch.map((l) => (
              <li key={l}><Link href="/#packages" className="text-cream/70 transition-colors hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream">Resources</h4>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {footerLinks.resources.map((l) => (
              <li key={l.label}><Link href={l.href} className="text-cream/70 transition-colors hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Pine Travel — {site.domain}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link href="/" className="hover:text-white">Privacy</Link>
            <Link href="/" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
