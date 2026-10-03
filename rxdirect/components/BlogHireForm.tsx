"use client";

import { useState, type FormEvent } from "react";
import { BadgeCheck, CheckCircle2, Loader2, Phone, ShieldCheck, RefreshCcw } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { business, telLink, whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import { WhatsAppIcon } from "@/components/icons";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

// Hire Staff form shown beside every blog post. It posts to the same lead
// endpoint as the contact page, so requests appear under Leads in /admin,
// with the post they came from noted in the message.
export default function BlogHireForm({
  postSlug,
  postTitle,
  serviceSlugs = [],
  citySlugs = [],
}: {
  postSlug: string;
  postTitle: string;
  serviceSlugs?: string[];
  citySlugs?: string[];
}) {
  const { t, locale } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const defaultService = serviceSlugs.find((s) => services.some((x) => x.slug === s)) ?? "";
  const defaultCity = cities.find((c) => citySlugs.includes(c.slug))?.name.en ?? "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const serviceSlug = String(data.get("service") || "");
    data.set("service", services.find((s) => s.slug === serviceSlug)?.name.en ?? serviceSlug);
    const note = String(data.get("message") || "").trim();
    data.set("message", `${note}${note ? "\n\n" : ""}(Sent from blog post: ${postTitle}, /blog/${postSlug})`);
    setStatus("sending");
    try {
      const res = await fetch("/.netlify/functions/submit-lead", { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      formEl.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="bg-navy px-5 py-4 text-white">
        <p className="text-lg font-extrabold">{t("blogForm.title")}</p>
        <p className="mt-1 text-sm text-brand-100">{t("blogForm.subtitle")}</p>
      </div>

      {status === "done" ? (
        <div className="p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
          <p className="mt-3 text-lg font-bold text-navy">{t("blogForm.success")}</p>
          <p className="mt-1 text-sm text-gray-600">{t("blogForm.successText")}</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-brand-700 underline">
            {t("blogForm.another")}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3 p-5">
          {/* Honeypot: hidden from people, ignored by the API when filled. */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy">{t("blogForm.name")} *</span>
            <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy">{t("blogForm.phone")} *</span>
            <input name="phone" type="tel" required inputMode="tel" placeholder="03xx xxxxxxx" autoComplete="tel" className={inputClass} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-navy">{t("blogForm.service")}</span>
              <select name="service" defaultValue={defaultService} className={inputClass}>
                <option value="">{t("blogForm.any")}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name[locale]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-navy">{t("blogForm.city")}</span>
              <select name="city" defaultValue={defaultCity} className={inputClass}>
                <option value="">{t("blogForm.any")}</option>
                {cities.map((c) => (
                  <option key={c.slug} value={c.name.en}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy">{t("blogForm.message")}</span>
            <textarea name="message" rows={3} maxLength={1500} placeholder={t("blogForm.messagePlaceholder")} className={inputClass} />
          </label>
          {status === "error" && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
              {t("blogForm.error")}
            </p>
          )}
          <button type="submit" disabled={status === "sending"} className="btn-primary w-full py-3 disabled:opacity-60">
            {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "sending" ? t("blogForm.sending") : t("blogForm.submit")}
          </button>
        </form>
      )}

      <div className="border-t border-gray-100 px-5 pb-5 pt-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">{t("blogForm.or")}</p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappLink(`Hi RX Direct, I read "${postTitle}" and need staff.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={telLink()} className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-navy hover:bg-gray-50">
            <Phone className="h-4 w-4" />
            {t("blogForm.call")}
          </a>
        </div>
        <p className="mt-2 text-center text-xs text-gray-500" dir="ltr">
          {business.phoneDisplay}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
            {t("blogForm.trust1")}
          </li>
          <li className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
            {t("blogForm.trust2")}
          </li>
          <li className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4 shrink-0 text-brand-600" />
            {t("blogForm.trust3")}
          </li>
        </ul>
      </div>
    </div>
  );
}
