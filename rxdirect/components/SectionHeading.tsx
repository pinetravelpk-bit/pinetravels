export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-balance text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-[2.25rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base text-gray-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
