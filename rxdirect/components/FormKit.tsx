"use client";

import type { ReactNode } from "react";
import { Upload } from "lucide-react";

// Small shared building blocks for the public forms (jobs, staff verification).

export const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export function PageIntro({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-brand-50 via-white to-brand-100/50">
      <div className="container-px mx-auto max-w-8xl py-12 sm:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl rtl:leading-[1.6]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-balance text-base text-gray-600 sm:text-lg rtl:leading-loose">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function Field({ label, hint, required, children, wide }: { label: string; hint?: string; required?: boolean; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

export function FileField({ name, label, hint, required, accept = "image/*,.pdf" }: { name: string; label: string; hint?: string; required?: boolean; accept?: string }) {
  return (
    <label className="block cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/60 p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/40">
      <span className="flex items-center gap-2 text-sm font-semibold text-navy">
        <Upload className="h-4 w-4 text-brand-600" />
        {label}
        {required && <span className="text-red-600">*</span>}
      </span>
      <input type="file" name={name} accept={accept} required={required} className="mt-2 block w-full text-xs text-gray-600 file:me-3 file:rounded-md file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white" />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

export function FormCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

// Hidden field bots fill in and people never see; the API ignores those submissions.
export function Honeypot() {
  return <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />;
}

export function ErrorNote({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}
