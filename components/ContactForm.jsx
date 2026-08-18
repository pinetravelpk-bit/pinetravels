"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { site, services } from "../lib/site";

const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: services[0].name,
    budget: budgets[0],
    message: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend required: compose a prefilled email to the agency inbox.
    const subject = `New project enquiry — ${form.service}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full grad-brand text-white shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink">Thanks — your draft is ready!</h3>
        <p className="max-w-sm text-ink-muted">
          We've opened your email app with the details prefilled. Hit send and we'll reply within one
          business day. Prefer to chat now?
        </p>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-azure">
          Message us on WhatsApp <ArrowUpRight className="h-4 w-4" />
        </a>
        <button type="button" onClick={() => setSent(false)} className="text-sm font-semibold text-brand-700 hover:underline">
          Edit your details
        </button>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-7 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-ink">Your name *</label>
          <input id="name" required value={form.name} onChange={update("name")} className={field} placeholder="Alex Rivera" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-ink">Work email *</label>
          <input id="email" type="email" required value={form.email} onChange={update("email")} className={field} placeholder="alex@brand.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-semibold text-ink">Company</label>
          <input id="company" value={form.company} onChange={update("company")} className={field} placeholder="Brand Inc." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-sm font-semibold text-ink">What do you need?</label>
          <select id="service" value={form.service} onChange={update("service")} className={field}>
            {services.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
            <option>Multiple / not sure</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-ink">Budget range</label>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setForm((f) => ({ ...f, budget: b }))}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                form.budget === b ? "grad-brand text-white" : "border border-ink/10 bg-white text-ink-muted hover:border-brand-300"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-ink">Tell us about your project *</label>
        <textarea id="message" required rows={4} value={form.message} onChange={update("message")} className={`${field} resize-none`} placeholder="What are you trying to grow, and by when?" />
      </div>

      <button type="submit" className="btn-primary mt-1 w-full">
        Send enquiry <Send className="h-4 w-4" />
      </button>
      <p className="text-center text-xs text-ink-faint">
        We'll reply within one business day. No spam, ever.
      </p>
    </form>
  );
}
