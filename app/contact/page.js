import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";
import Reveal from "../../components/Reveal";
import { site } from "../../lib/site";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../lib/seo";

export const metadata = {
  title: "Contact — Start a Project With InventiveClicks",
  description:
    "Tell us where you want to grow. Get in touch with InventiveClicks for video animation, graphic design, creative marketing and influencer marketing. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: site.whatsappHref },
  { icon: MapPin, label: "Studio", value: `${site.address.city}, ${site.address.region}, ${site.address.country}` },
];

const steps = [
  { n: "1", t: "We reply within a day", d: "A real strategist reads your brief and responds — usually within one business day." },
  { n: "2", t: "A quick discovery call", d: "20–30 minutes to understand your goals, audience and where you want to grow." },
  { n: "3", t: "A tailored proposal", d: "Clear scope, timeline and price. No obligation, no fine print." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/contact", name: "Contact InventiveClicks", description: metadata.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/contact`,
          name: "Contact InventiveClicks",
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <PageHero
        eyebrow="Contact"
        title="Let's make something worth"
        accent="clicking on."
        lead="Tell us about your brand and where you want to grow. Whether it's one video or a full-funnel program, we'll come back with ideas and a plan."
        crumbs={[{ name: "Contact" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: details */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {details.map(({ icon: I, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <I className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-eyebrow text-ink-faint">{label}</p>
                        <p className="mt-0.5 font-body text-[15px] font-semibold text-ink">{value}</p>
                      </div>
                    </>
                  );
                  return href ? (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="card card-hover flex items-center gap-3.5 p-5">
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className="card flex items-center gap-3.5 p-5">{inner}</div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card p-7">
                <div className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Clock className="h-4 w-4 text-brand-600" /> What happens next
                </div>
                <ol className="mt-5 space-y-5">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full grad-brand font-display text-sm font-bold text-white">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-display text-base font-bold text-ink">{s.t}</p>
                        <p className="mt-0.5 text-sm text-ink-muted">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
