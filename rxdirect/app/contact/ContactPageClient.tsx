"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { business, telLink, whatsappLink } from "@/data/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";
import { WhatsAppIcon } from "@/components/icons";
import { trackLeadConversion } from "@/lib/analytics";
import SectionHeading from "@/components/SectionHeading";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPageClient() {
  const { t, locale } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("source", "Contact page");
    data.set("sourceUrl", "/contact");

    try {
      const res = await fetch("/.netlify/functions/submit-lead", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        trackLeadConversion();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-py container-px mx-auto max-w-8xl">
      <SectionHeading title={t("contactPage.title")} subtitle={t("contactPage.subtitle")} />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-brand-600" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {t("contactPage.formSuccessTitle")}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-gray-600">
                {t("contactPage.formSuccessDesc")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {t("contactPage.formName")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {t("contactPage.formPhone")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {t("contactPage.formCity")}
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.name.en}>
                      {c.name[locale]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {t("contactPage.formService")}
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.name.en}>
                      {s.name[locale]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {t("contactPage.formMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? "..." : t("contactPage.formSubmit")}
                </button>
                {status === "error" && (
                  <p className="mt-3 text-sm text-red-600">
                    Something went wrong, please message us on WhatsApp instead.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">{t("contactPage.contactInfoTitle")}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-brand-600">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={telLink()} className="flex items-center gap-3 text-gray-700 hover:text-brand-600">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Phone className="h-4 w-4" />
                  </span>
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-gray-700 hover:text-brand-600">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Mail className="h-4 w-4" />
                  </span>
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <MapPin className="h-4 w-4" />
                </span>
                {business.address[locale]}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
              <Clock className="h-4 w-4 text-brand-600" />
              {t("contactPage.officeHours")}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{t("contactPage.officeHoursValue")}</p>
          </div>

          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-center text-sm text-gray-400">
            <span className="flex flex-col items-center gap-2">
              <MapPin className="h-6 w-6" />
              {business.address[locale]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
