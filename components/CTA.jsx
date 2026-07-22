import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { MountainScene } from "./Scenery";
import { site } from "../lib/data";

export default function CTA() {
  return (
    <section className="relative overflow-hidden grad-pine py-20 text-cream sm:py-24">
      <MountainScene className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-30" />
      <div className="contour absolute inset-0" />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-[44px]">
            Let&apos;s plan your trip to the north
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-cream/80">
            Send us your dates and group size. You&apos;ll have a clear itinerary and an honest quote
            before you commit to anything.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={site.whatsappHref} className="btn-primary"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            <Link href="/contact" className="btn-light"><Phone className="h-4 w-4" /> Send an enquiry</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
