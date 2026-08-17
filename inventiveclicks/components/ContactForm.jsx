"use client";

import { useState } from "react";
import { Send, Check, ArrowRight } from "lucide-react";

const BUDGETS = ["Under $3k / mo", "$3k – $6k / mo", "$6k – $12k / mo", "$12k+ / mo"];
const SERVICES = ["SEO", "Paid Media / PPC", "Social Media", "Web & CRO", "Branding", "Not sure yet"];

const field =
  "w-full rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-cream placeholder:text-faint transition-colors focus:border-brand/60 focus:outline-none";
const label = "mb-2 block text-xs font-semibold uppercase tracking-wide text-cream/80";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: BUDGETS[1], service: SERVICES[0], message: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    // No backend in this theme — confirm locally. Wire to your API/CRM here.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-brand/40 bg-brand/[0.06] p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-ink-900">
          <Check size={30} strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-cream">Thanks, {form.name.split(" ")[0] || "there"}!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Your message is on its way. A strategist will be in touch within one business day.
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost mt-7">
          Send another
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-ink-800/60 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Full name*
          </label>
          <input id="name" required value={form.name} onChange={update("name")} className={field} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Work email*
          </label>
          <input id="email" type="email" required value={form.email} onChange={update("email")} className={field} placeholder="jane@company.com" />
        </div>
        <div>
          <label className={label} htmlFor="company">
            Company
          </label>
          <input id="company" value={form.company} onChange={update("company")} className={field} placeholder="Company Inc." />
        </div>
        <div>
          <label className={label} htmlFor="budget">
            Monthly budget
          </label>
          <select id="budget" value={form.budget} onChange={update("budget")} className={field}>
            {BUDGETS.map((b) => (
              <option key={b} className="bg-ink-800">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="service">
            What do you need help with?
          </label>
          <select id="service" value={form.service} onChange={update("service")} className={field}>
            {SERVICES.map((s) => (
              <option key={s} className="bg-ink-800">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="message">
            Tell us about your goals
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={update("message")}
            className={`${field} resize-none`}
            placeholder="Where do you want to be in 12 months?"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send message
        <Send size={16} />
      </button>
      <p className="mt-4 text-xs text-faint">
        By submitting you agree to be contacted about your enquiry. We&apos;ll never share your details.
      </p>
    </form>
  );
}
