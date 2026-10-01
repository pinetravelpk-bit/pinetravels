import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="py-16">
      <div className="container-x">
        <div className="grid gap-6 rounded-3xl bg-gradient-to-br from-brand-600 to-navy-800 p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Need staff, or looking for your next role?</h2>
            <p className="mt-3 max-w-xl text-white/80">Tell us what you need and our team will get back to you within one working day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/employers" className="btn bg-white text-ink hover:bg-slate-100">Hire Staff</Link>
            <Link href="/apply" className="btn border border-white/40 text-white hover:bg-white/10">Submit CV</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
