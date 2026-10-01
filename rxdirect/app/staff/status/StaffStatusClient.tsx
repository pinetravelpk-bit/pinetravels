"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";
import { services } from "@/data/services";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiPostJson } from "@/lib/api";
import { ErrorNote, Field, PageIntro, inputClass } from "@/components/FormKit";

interface Status {
  ref: string;
  verifiedId: string | null;
  name: string;
  role: string;
  status: string;
  checks: Record<string, "pending" | "passed" | "failed">;
  updatedAt: string;
}

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  in_review: "bg-amber-100 text-amber-800",
  verified: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
  suspended: "bg-red-100 text-red-700",
};

export default function StaffStatusClient() {
  const { t, locale } = useTranslation();
  const [refValue, setRefValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Status | null>(null);

  // Prefill the reference when arriving from the registration success screen.
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("ref");
    if (r) setRefValue(r);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(await apiPostJson<Status>("/api/staff/status", { ref: refValue, phone: form.get("phone") }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  const roleName = (slug: string) => services.find((s) => s.slug === slug)?.name[locale] ?? slug;

  return (
    <>
      <PageIntro eyebrow={t("staffStatus.eyebrow")} title={t("staffStatus.title")} subtitle={t("staffStatus.subtitle")} />
      <section className="container-px mx-auto max-w-3xl py-12">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6">
          <Field label={t("staffStatus.ref")} required>
            <input value={refValue} onChange={(e) => setRefValue(e.target.value.toUpperCase())} required placeholder="RXA-1A2B3C" className={`${inputClass} font-mono`} />
          </Field>
          <Field label={t("staffStatus.phone")} required>
            <input name="phone" type="tel" required inputMode="tel" placeholder="03xx xxxxxxx" className={inputClass} />
          </Field>
          <button type="submit" disabled={loading} className="btn-primary h-[42px] disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? t("staffStatus.checking") : t("staffStatus.submit")}
          </button>
        </form>

        <div className="mt-4">
          <ErrorNote message={error} />
        </div>

        {result && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-navy">{result.name}</p>
                <p className="text-sm text-gray-500">
                  {roleName(result.role)} · <span className="font-mono">{result.ref}</span>
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLE[result.status] ?? STATUS_STYLE.pending}`}>
                {t(`staffStatus.statuses.${result.status}`)}
              </span>
            </div>

            {result.verifiedId && (
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-green-50 p-4">
                <BadgeCheck className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-800">{t("staffStatus.verifiedId")}</p>
                  <p className="font-mono text-xl font-bold text-green-900">{result.verifiedId}</p>
                </div>
              </div>
            )}

            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {Object.entries(result.checks).map(([key, state]) => (
                <li key={key} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5 text-sm">
                  <span className="font-medium text-gray-800">{t(`staffStatus.checks.${key}`)}</span>
                  <span
                    className={`flex items-center gap-1.5 font-semibold ${
                      state === "passed" ? "text-green-700" : state === "failed" ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {state === "passed" ? <CheckCircle2 className="h-4 w-4" /> : state === "failed" ? <XCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    {t(`staffStatus.checkStates.${state}`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              {t("staffStatus.updated")}: {new Date(result.updatedAt).toLocaleString(locale === "ur" ? "ur-PK" : "en-PK")}
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          {t("staffStatus.notRegistered")}{" "}
          <Link href="/staff/register" className="font-semibold text-brand-700 underline">
            {t("staffStatus.register")}
          </Link>
        </p>
      </section>
    </>
  );
}
