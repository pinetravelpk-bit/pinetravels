import { CheckCircle2 } from "lucide-react";
import Icon from "@/components/Icon";
import PageBanner from "@/components/PageBanner";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/site";

export const metadata = { title: "Services" };

const models = [
  { title: "Permanent placement", text: "We source, screen and shortlist; you hire directly onto your payroll." },
  { title: "Contract & temporary", text: "Fixed-term staff on our contract for projects, leave cover or seasonal peaks." },
  { title: "Shift & locum cover", text: "Short-notice cover for nights, weekends and emergencies." },
  { title: "Team setup", text: "Complete staffing for a new branch, ward or facility, from pharmacist to front desk." },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner eyebrow="Services" title="Healthcare staffing, built around your needs" text="Whatever the role and however long you need it, we have a hiring model that fits." />
      <section className="py-20">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <SectionHead eyebrow="Hiring models" title="Choose how you hire" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {models.map((m) => (
              <div key={m.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-500" />
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-ink-soft">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
