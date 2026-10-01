import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { ContactForm } from "@/components/Forms";
import { site, whatsappLink } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappLink("Hi RxDirect!") },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Location", value: site.address },
    { icon: Clock, label: "Hours", value: site.hours },
  ];
  return (
    <>
      <PageBanner eyebrow="Contact" title="Get in touch" text="Questions about hiring or applying? We're happy to help." />
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <ul className="space-y-4">
            {items.map(({ icon: I, label, value, href }) => (
              <li key={label} className="card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><I className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm text-ink-soft">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold hover:text-brand-600" {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>{value}</a>
                  ) : (
                    <p className="font-semibold">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
