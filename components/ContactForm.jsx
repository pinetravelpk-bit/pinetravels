"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Reveal from "./Reveal";
import { site, services } from "../lib/data";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0].title, people: "", dates: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Assalam-o-Alaikum Pine Travel!%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Service: ${form.service}%0A` +
      `Group size: ${form.people}%0A` +
      `Dates: ${form.dates}%0A` +
      `Details: ${form.message}`;
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink">Get in touch</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Pine Travel is based in Rawalpindi, with departures from Rawalpindi and Islamabad to
            all of Northern Pakistan.
          </p>
          <ul className="mt-8 space-y-5">
            {[
              { Icon: MapPin, label: "Office", value: site.address, href: null },
              { Icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
              { Icon: MessageCircle, label: "WhatsApp", value: "Message us", href: site.whatsappHref },
              { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
            ].map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pine-50 text-pine-700"><Icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-wider text-ink-faint">{label}</span>
                  {href ? (
                    <a href={href} className="font-display text-lg font-bold text-ink hover:text-pine-700">{value}</a>
                  ) : (
                    <span className="font-display text-lg font-bold text-ink">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="rounded-2xl border border-pine-600/10 bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Your name" value={form.name} onChange={set("name")} required />
              <Input label="Phone number" value={form.phone} onChange={set("phone")} required type="tel" />
              <div className="sm:col-span-2">
                <FieldLabel>Service</FieldLabel>
                <select value={form.service} onChange={set("service")} className="mt-1.5 w-full rounded-xl border border-pine-600/15 bg-cream px-4 py-3 text-[15px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20">
                  {services.map((s) => (<option key={s.slug}>{s.title}</option>))}
                </select>
              </div>
              <Input label="Group size" value={form.people} onChange={set("people")} placeholder="e.g. 6 adults" />
              <Input label="Preferred dates" value={form.dates} onChange={set("dates")} placeholder="e.g. Aug 12–17" />
              <div className="sm:col-span-2">
                <FieldLabel>Trip details</FieldLabel>
                <textarea value={form.message} onChange={set("message")} rows={4} placeholder="Where you'd like to go and anything special we should know." className="mt-1.5 w-full resize-none rounded-xl border border-pine-600/15 bg-cream px-4 py-3 text-[15px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20" />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto"><Send className="h-4 w-4" /> Send via WhatsApp</button>
            <p className="mt-3 text-[12.5px] text-ink-faint">This opens WhatsApp with your details pre-filled. You can also email us directly.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FieldLabel({ children }) {
  return <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-faint">{children}</label>;
}

function Input({ label, ...props }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input {...props} className="mt-1.5 w-full rounded-xl border border-pine-600/15 bg-cream px-4 py-3 text-[15px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20" />
    </div>
  );
}
