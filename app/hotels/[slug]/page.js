import { notFound } from "next/navigation";
import { hotels, getHotel } from "../../../lib/hotels";
import HotelHero from "../../../components/hotel/HotelHero";
import HotelBooking from "../../../components/hotel/HotelBooking";
import {
  HotelAbout, HotelFacilities, HotelExperience, HotelFeatures, HotelGallery, HotelOffer, HotelFeedback,
} from "../../../components/hotel/HotelSections";
import SectionHead from "../../../components/SectionHead";
import CTA from "../../../components/CTA";

export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }) {
  const hotel = getHotel(params.slug);
  if (!hotel) return { title: "Hotel not found" };
  return { title: `${hotel.name} — ${hotel.location}`, description: hotel.short };
}

export default function HotelDetailPage({ params }) {
  const hotel = getHotel(params.slug);
  if (!hotel) notFound();
  return (
    <>
      <HotelHero hotel={hotel} />
      <HotelAbout hotel={hotel} />
      <HotelFacilities hotel={hotel} />
      <HotelExperience hotel={hotel} />
      <section id="rooms" className="scroll-mt-24 py-20 sm:py-24">
        <div className="container-x">
          <SectionHead center eyebrow="Stay with us" title="Our Rooms & Suites" intro="Choose rooms, suites or a whole cottage — book several at once, for as many nights as you like." />
          <div id="booking" className="mt-12 scroll-mt-24">
            <HotelBooking hotel={hotel} />
          </div>
        </div>
      </section>
      <HotelFeatures hotel={hotel} />
      <HotelGallery hotel={hotel} />
      <HotelOffer hotel={hotel} />
      <HotelFeedback hotel={hotel} />
      <CTA />
    </>
  );
}
