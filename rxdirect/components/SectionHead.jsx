export default function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-ink-soft">{text}</p>}
    </div>
  );
}
