import Link from "next/link";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { MountainScene, PineMark } from "../Scenery";
import { priceFrom, formatPKR } from "../../lib/hotels";

export default function HotelHero({ hotel }) {
  return (
    <section className="relative overflow-hidden grad-pine text-cream">
      <div className="contour absolute inset-0" />
      <MountainScene className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-pine-800/70 via-pine-800/20 to-transparent" />
      <div className="container-x relative pb-28 pt-10 sm:pt-14">
        <Link href="/hotels" className="inline-flex items-center gap-1.5 text-[13px] text-cream/70 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All hotels
        </Link>
        <div className="mt-6 max-w-2xl">
          <span className="eyebrow text-pine-200">
            <PineMark className="h-3.5 w-3.5 text-pine-200" /> {hotel.region}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">{hotel.name}</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-cream/80 sm:text-lg">
            {hotel.tagline}. {hotel.short}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-pine-200" /> {hotel.location}</span>
            {hotel.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-current text-amber-300" />
                <span className="font-semibold">{hotel.rating}</span>
                {hotel.reviews ? <span className="text-cream/60">({hotel.reviews} reviews)</span> : null}
              </span>
            )}
            <span className="text-cream/70">From <span className="font-display text-lg font-extrabold text-cream">{formatPKR(priceFrom(hotel))}</span>/night</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="btn-primary">Book Now</a>
            <a href="#rooms" className="btn-light">View Rooms &amp; Cottages</a>
          </div>
        </div>
      </div>
    </section>
  );
}
