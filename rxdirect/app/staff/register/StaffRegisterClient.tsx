"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiPostForm } from "@/lib/api";
import { ErrorNote, Field, FileField, FormCard, Honeypot, PageIntro, inputClass } from "@/components/FormKit";

export default function StaffRegisterClient() {
  const { t, locale } = useTranslation();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [doneRef, setDoneRef] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setSending(true);
    setError("");
    try {
      const res = await apiPostForm<{ ref: string }>("/api/staff/register", new FormData(formEl));
      setDoneRef(res.ref);
      formEl.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  }

  const steps = [0, 1, 2, 3].map((i) => t(`staffReg.steps.${i}`));

  return (
    <>
      <PageIntro eyebrow={t("staffReg.eyebrow")} title={t("staffReg.title")} subtitle={t("staffReg.subtitle")}>
        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
              <span className="text-sm text-gray-700">{s}</span>
            </li>
          ))}
        </ol>
      </PageIntro>

      <section className="container-px mx-auto max-w-4xl py-12">
        {doneRef ? (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h2 className="mt-4 text-2xl font-extrabold text-navy">{t("staffReg.success")}</h2>
            <p className="mt-3 text-gray-600">{t("staffReg.successRef")}</p>
            <p className="mt-1 font-mono text-3xl font-bold tracking-wider text-brand-700">{doneRef}</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">{t("staffReg.successNext")}</p>
            <Link href={`/staff/status?ref=${doneRef}`} className="btn-primary mt-6">
              {t("staffReg.checkStatus")}
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <Honeypot />
            <FormCard title={t("staffReg.personal")}>
              <Field label={t("staffReg.name")} required>
                <input name="name" required maxLength={120} autoComplete="name" className={inputClass} />
              </Field>
              <Field label={t("staffReg.fatherName")}>
                <input name="fatherName" maxLength={120} className={inputClass} />
              </Field>
              <Field label={t("staffReg.cnic")} hint={t("staffReg.cnicHint")} required>
                <input name="cnic" required inputMode="numeric" pattern="[0-9\- ]{13,17}" placeholder="37405-1234567-1" className={inputClass} />
              </Field>
              <Field label={t("staffReg.phone")} required>
                <input name="phone" type="tel" required inputMode="tel" placeholder="03xx xxxxxxx" autoComplete="tel" className={inputClass} />
              </Field>
              <Field label={t("staffReg.gender")}>
                <select name="gender" defaultValue="" className={inputClass}>
                  <option value="">{locale === "ur" ? "منتخب کریں" : "Select"}</option>
                  <option value="male">{t("staffReg.male")}</option>
                  <option value="female">{t("staffReg.female")}</option>
                </select>
              </Field>
              <Field label={t("staffReg.dob")}>
                <input name="dob" type="date" className={inputClass} />
              </Field>
              <Field label={t("staffReg.city")} required>
                <select name="city" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    {locale === "ur" ? "منتخب کریں" : "Select"}
                  </option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.name.en}>
                      {c.name[locale]}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </Field>
              <Field label={t("staffReg.address")}>
                <input name="address" maxLength={400} autoComplete="street-address" className={inputClass} />
              </Field>
            </FormCard>

            <FormCard title={t("staffReg.work")}>
              <Field label={t("staffReg.role")} required>
                <select name="role" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    {locale === "ur" ? "منتخب کریں" : "Select"}
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name[locale]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("staffReg.experience")}>
                <input name="experience" type="number" min={0} max={50} className={inputClass} />
              </Field>
              <Field label={t("staffReg.languages")}>
                <input name="languages" placeholder="Urdu, Punjabi, English" maxLength={200} className={inputClass} />
              </Field>
              <Field label={t("staffReg.availability")}>
                <select name="availability" defaultValue="" className={inputClass}>
                  <option value="">{locale === "ur" ? "منتخب کریں" : "Select"}</option>
                  <option value="live-in">{t("staffReg.live-in")}</option>
                  <option value="live-out">{t("staffReg.live-out")}</option>
                  <option value="either">{t("staffReg.either")}</option>
                </select>
              </Field>
              <Field label={t("staffReg.expectedSalary")}>
                <input name="expectedSalary" placeholder="PKR 35,000" maxLength={60} className={inputClass} />
              </Field>
              <Field label={t("staffReg.about")} wide>
                <textarea name="about" rows={3} maxLength={1500} className={inputClass} />
              </Field>
            </FormCard>

            <FormCard title={t("staffReg.references")} subtitle={t("staffReg.refHint")}>
              {[1, 2].map((n) => (
                <div key={n} className="space-y-3 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-bold text-navy">#{n}</p>
                  <input name={`ref${n}Name`} placeholder={t("staffReg.refName")} maxLength={120} className={inputClass} />
                  <input name={`ref${n}Phone`} type="tel" placeholder={t("staffReg.refPhone")} maxLength={40} className={inputClass} />
                  <input name={`ref${n}Relation`} placeholder={t("staffReg.refRelation")} maxLength={80} className={inputClass} />
                </div>
              ))}
            </FormCard>

            <FormCard title={t("staffReg.documents")} subtitle={t("staffReg.docHint")}>
              <FileField name="photo" label={t("staffReg.photo")} accept="image/*" />
              <FileField name="cnicFront" label={t("staffReg.cnicFront")} required />
              <FileField name="cnicBack" label={t("staffReg.cnicBack")} />
              <FileField name="police" label={t("staffReg.police")} />
              <FileField name="medical" label={t("staffReg.medical")} />
              <FileField name="other" label={t("staffReg.other")} accept="image/*,.pdf,.doc,.docx" />
            </FormCard>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600" />
                <span>
                  <ShieldCheck className="me-1 inline h-4 w-4 text-brand-600" />
                  {t("staffReg.consent")}
                </span>
              </label>
              <ErrorNote message={error} />
              <button type="submit" disabled={sending} className="btn-primary w-full py-3.5 text-base disabled:opacity-60 sm:w-auto">
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                {sending ? t("staffReg.sending") : t("staffReg.submit")}
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
