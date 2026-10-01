"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { roles, jobs } from "@/lib/site";

function Field({ label, name, required, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-brand-600"> *</span>}</span>
      <input name={name} type={type} required={required} className="input" {...props} />
    </label>
  );
}

function Select({ label, name, required, options, defaultValue = "" }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-brand-600"> *</span>}</span>
      <select name={name} required={required} defaultValue={defaultValue} className="input">
        <option value="" disabled>Select…</option>
        {options.map((o) => {
          const [value, text] = Array.isArray(o) ? o : [o, o];
          return <option key={value} value={value}>{text}</option>;
        })}
      </select>
    </label>
  );
}

function TextArea({ label, name, required, rows = 4, placeholder }) {
  return (
    <label className="block sm:col-span-2">
      <span className="label">{label}{required && <span className="text-brand-600"> *</span>}</span>
      <textarea name={name} required={required} rows={rows} placeholder={placeholder} className="input" />
    </label>
  );
}

function FormShell({ type, submitLabel, successTitle, successText, children }) {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setState({ status: "sending", error: "" });
    try {
      const data = new FormData(formEl);
      data.set("type", type);
      const res = await fetch("/api/submit", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      formEl.reset();
      setState({ status: "done", error: "" });
    } catch (err) {
      setState({ status: "idle", error: err.message });
    }
  }

  if (state.status === "done") {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-brand-500" />
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">{successTitle}</h3>
        <p className="mt-2 max-w-md text-ink-soft">{successText}</p>
        <button className="btn-outline mt-6" onClick={() => setState({ status: "idle", error: "" })}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      {/* Honeypot for bots — hidden from people and screen readers. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state.error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{state.error}</p>}
      <button type="submit" disabled={state.status === "sending"} className="btn-primary mt-6 w-full sm:w-auto">
        {state.status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {state.status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

export function CandidateForm({ job = "" }) {
  return (
    <FormShell
      type="candidate"
      submitLabel="Submit application"
      successTitle="Application received"
      successText="Thank you! Our recruitment team will review your CV and contact you if there's a suitable match."
    >
      <Field label="Full name" name="name" required autoComplete="name" />
      <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" placeholder="03xx xxxxxxx" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Current city" name="city" autoComplete="address-level2" />
      <Select label="Role" name="role" required options={roles} />
      <Select
        label="Applying for"
        name="job"
        defaultValue={job}
        options={[["general", "General registration"], ...jobs.map((j) => [j.slug, `${j.title} — ${j.location}`])]}
      />
      <Field label="Years of experience" name="experience" type="number" min="0" max="50" />
      <Field label="Licence / registration no." name="licence" placeholder="PPC / PNMC / PMDC" />
      <label className="block sm:col-span-2">
        <span className="label">CV (PDF, DOC or DOCX, max 5 MB)</span>
        <input name="cv" type="file" accept=".pdf,.doc,.docx" className="input file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-700" />
      </label>
      <TextArea label="Anything else we should know?" name="message" rows={3} />
    </FormShell>
  );
}

export function EmployerForm() {
  return (
    <FormShell
      type="employer"
      submitLabel="Request staff"
      successTitle="Request received"
      successText="Thanks! An account manager will call you within one working day to discuss your requirement."
    >
      <Field label="Your name" name="name" required autoComplete="name" />
      <Field label="Hospital / pharmacy / organisation" name="organisation" required autoComplete="organization" />
      <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Select label="Role needed" name="role" required options={roles} />
      <Field label="Number of positions" name="positions" type="number" min="1" defaultValue="1" />
      <Field label="City" name="city" />
      <Field label="Required from" name="startDate" type="date" />
      <TextArea label="Requirement details" name="message" placeholder="Shift timings, experience, budget, permanent or temporary…" />
    </FormShell>
  );
}

export function ContactForm() {
  return (
    <FormShell
      type="contact"
      submitLabel="Send message"
      successTitle="Message sent"
      successText="Thanks for reaching out. We'll get back to you shortly."
    >
      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Subject" name="subject" />
      <TextArea label="Message" name="message" required rows={5} />
    </FormShell>
  );
}
