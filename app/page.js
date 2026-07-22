import Hero from "../components/Hero";
import { Offers, FeaturedDestinations } from "../components/Discover";
import { WhyUs, QuoteBanner, CustomizePackage, Partners, Counters, InquiryBand } from "../components/Bands";
import { PopularPackages, LastMinuteDeals, OneDayTrips } from "../components/PackageSections";
import { Inspirations, Testimonials, FAQ } from "../components/Stories";
import Services from "../components/Services";
import CTA from "../components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Offers />
      <FeaturedDestinations />
      <WhyUs />
      <PopularPackages />
      <QuoteBanner />
      <LastMinuteDeals />
      <CustomizePackage />
      <Partners />
      <OneDayTrips />
      <Services />
      <Inspirations />
      <Testimonials />
      <FAQ />
      <Counters />
      <InquiryBand />
      <CTA />
    </>
  );
}
