import Link from "next/link";
import PageBanner from "../../components/PageBanner";
import Reveal from "../../components/Reveal";
import ServiceIcon from "../../components/ServiceIcon";
import CTA from "../../components/CTA";
import { services } from "../../lib/data";

export const metadata = {
  title: "Services",
  description:
    "Group, family, customized and corporate tours, Nikah & destination weddings, conferences, hotel booking, rent a car & jeep, guest houses and local guides across Northern Pakistan.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our services"
        title="Ten ways we take you north"
        intro="Whether you need a full managed tour or just a jeep for the day, here is everything Pine Travel can arrange for you."
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-pine-600/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pine-50 text-pine-700 transition-colors group-hover:bg-pine-600 group-hover:text-cream">
                  <ServiceIcon name={s.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h2>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{s.blurb}</p>
                <Link href={s.slug === "hotel-booking" ? "/hotels" : "/contact"} className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-maroon-600 underline-offset-4 hover:underline">
                  {s.slug === "hotel-booking" ? "Browse hotels →" : "Enquire about this →"}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
