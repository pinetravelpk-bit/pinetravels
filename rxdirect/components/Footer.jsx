import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Logo from "./Logo";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">{site.description}</p>
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Pages</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>
            ))}
            <li><Link href="/apply" className="hover:text-white">Submit your CV</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.title}><Link href="/services" className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-brand-500" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-brand-500" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-brand-500" />{site.address}</li>
            <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-brand-500" />{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
