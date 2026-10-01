"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { BadgeCheck, Banknote, Briefcase, CheckCircle2, ChevronDown, Clock, Loader2, MapPin } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiGet, apiPostForm, type Job } from "@/lib/api";
import { ErrorNote, Field, FileField, Honeypot, inputClass } from "@/components/FormKit";

export default function JobsBoard() {
  const { t, locale } = useTranslation();
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [applyFor, setApplyFor] = useState("general");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [doneRef, setDoneRef] = useState("");

  useEffect(() => {
    apiGet<Job[]>("/api/jobs")
      .then(setJobs)
      .catch(() => {
        setJobs([]);
        setLoadError(true);
      });
  }, []);

  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name[locale] ?? slug;
  const categories = useMemo(() => Array.from(new Set((jobs ?? []).map((j) => j.category).filter(Boolean))), [jobs]);
  const shown = (jobs ?? []).filter((j) => filter === "all" || j.category === filter);
  const typeLabel = (type: string) => t(`jobsBoard.types.${type}`);
  const date = (iso: string) => new Date(iso).toLocaleDateString(locale === "ur" ? "ur-PK" : "en-PK", { day: "numeric", month: "short" });

  function startApply(id: string) {
    setApplyFor(id);
    setDoneRef("");
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget; // React clears currentTarget after the await
    setSending(true);
    setError("");
    try {
      const res = await apiPostForm<{ ref: string }>(`/api/jobs/${encodeURIComponent(applyFor)}/apply`, new FormData(formEl));
      setDoneRef(res.ref);
      formEl.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-8xl">
          {/* category filter */}
          {categories.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {["all", ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    filter === c ? "bg-navy text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                  }`}
                >
                  {c === "all" ? t("jobsBoard.all") : serviceName(c)}
                </button>
              ))}
            </div>
          )}

          {jobs === null ? (
            <p className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" /> {t("jobsBoard.loading")}
            </p>
          ) : shown.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600">
              {loadError ? t("jobsBoard.error") : t("jobsBoard.none")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {shown.map((job) => {
                const open = openId === job.id;
                return (
                  <article key={job.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-navy">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                          {job.city && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-brand-600" />
                              {job.city}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-brand-600" />
                            {typeLabel(job.type)}
                          </span>
                          {job.category && (
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 text-brand-600" />
                              {serviceName(job.category)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-gray-400">
                        {t("jobsBoard.posted")} {date(job.createdAt)}
                      </span>
                    </div>
                    {job.salary && (
                      <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-sm font-semibold text-green-800">
                        <Banknote className="h-4 w-4" />
                        {job.salary}
                      </p>
                    )}
                    {open && (
                      <div className="mt-4 space-y-3 text-sm text-gray-700">
                        {job.description && <p className="whitespace-pre-line leading-relaxed">{job.description}</p>}
                        {job.requirements.length > 0 && (
                          <div>
                            <p className="font-semibold text-navy">{t("jobsBoard.requirements")}</p>
                            <ul className="mt-2 space-y-1.5">
                              {job.requirements.map((r) => (
                                <li key={r} className="flex gap-2">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                      <button type="button" onClick={() => startApply(job.id)} className="btn-primary py-2.5">
                        {t("jobsBoard.apply")}
                      </button>
                      {(job.description || job.requirements.length > 0) && (
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : job.id)}
                          className="flex items-center gap-1 text-sm font-semibold text-brand-700"
                          aria-expanded={open}
                        >
                          {t("common.learnMore")}
                          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* apply form */}
      <section id="apply" className="scroll-mt-40 bg-brand-50 py-14">
        <div className="container-px mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">{t("jobsBoard.applyTitle")}</h2>
          {doneRef ? (
            <div className="mt-6 rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h3 className="mt-3 text-xl font-bold text-navy">{t("jobsBoard.success")}</h3>
              <p className="mt-2 text-gray-600">
                {t("jobsBoard.successRef")} <strong className="font-mono text-navy">{doneRef}</strong>
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">{t("jobsBoard.successNext")}</p>
              <Link href="/staff/register" className="btn-primary mt-5">
                <BadgeCheck className="h-4 w-4" />
                {t("jobsBoard.verifyCta")}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
              <Honeypot />
              <Field label={t("jobsBoard.applyingFor")} wide>
                <select value={applyFor} onChange={(e) => setApplyFor(e.target.value)} className={inputClass}>
                  <option value="general">{t("jobsBoard.applyGeneral")}</option>
                  {(jobs ?? []).map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                      {j.city ? ` — ${j.city}` : ""}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("jobsBoard.name")} required>
                <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
              </Field>
              <Field label={t("jobsBoard.phone")} required>
                <input name="phone" type="tel" required inputMode="tel" placeholder="03xx xxxxxxx" autoComplete="tel" className={inputClass} />
              </Field>
              <Field label={t("jobsBoard.role")}>
                <select name="role" className={inputClass} defaultValue="">
                  <option value="">—</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name[locale]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("jobsBoard.city")}>
                <select name="city" className={inputClass} defaultValue="">
                  <option value="">—</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.name.en}>
                      {c.name[locale]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("jobsBoard.experience")}>
                <input name="experience" type="number" min={0} max={50} className={inputClass} />
              </Field>
              <Field label={t("jobsBoard.cnic")}>
                <input name="cnic" inputMode="numeric" placeholder="37405-1234567-1" className={inputClass} />
              </Field>
              <Field label={t("jobsBoard.message")} wide>
                <textarea name="message" rows={3} maxLength={2000} className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <FileField name="cv" label={t("jobsBoard.cv")} hint={t("jobsBoard.cvHint")} accept=".pdf,.doc,.docx,image/*" />
              </div>
              <div className="space-y-3 sm:col-span-2">
                <ErrorNote message={error} />
                <button type="submit" disabled={sending} className="btn-primary w-full py-3.5 text-base disabled:opacity-60 sm:w-auto">
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {sending ? t("jobsBoard.sending") : t("jobsBoard.submit")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
