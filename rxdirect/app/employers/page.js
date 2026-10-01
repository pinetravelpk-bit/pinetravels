import { CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { EmployerForm } from "@/components/Forms";
import { steps } from "@/lib/site";

export const metadata = { title: "For Employers", description: "Request pharmacists, nurses, doctors and allied health staff." };

const promises = [
  "Licences and degrees verified before shortlisting",
  "Shortlist within 48 hours for most roles",
  "Free replacement during probation",
  "One account manager for all your requirements",
];

export default function EmployersPage() {
  return (
    <>
      <PageBanner eyebrow="For employers" title="Tell us who you need. We'll find them." text="Hospitals, clinics, pharmacies, labs and home-care providers trust RxDirect for reliable, verified staff." />
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">How it works</h2>
            <ol className="mt-6 space-y-5">
              {steps.employers.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-3 rounded-2xl bg-brand-50 p-6">
              {promises.map((p) => (
                <li key={p} className="flex gap-3 text-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />{p}</li>
              ))}
            </ul>
          </div>
          <EmployerForm />
        </div>
      </section>
    </>
  );
}
