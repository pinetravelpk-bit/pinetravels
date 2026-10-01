export default function PageBanner({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow text-brand-500">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-slate-300">{text}</p>}
      </div>
    </section>
  );
}
