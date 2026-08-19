import Hero from "../components/home/Hero";
import Clients from "../components/home/Clients";
import Services from "../components/home/Services";
import About from "../components/home/About";
import Process from "../components/home/Process";
import Work from "../components/home/Work";
import MarqueeText from "../components/home/MarqueeText";
import Testimonials from "../components/home/Testimonials";
import Pricing from "../components/home/Pricing";
import FAQ from "../components/home/FAQ";
import Insights from "../components/home/Insights";
import { JsonLd, webPageSchema, faqSchema } from "../lib/seo";
import { faqs } from "../lib/site";

export const metadata = {
  title: "Creative Digital Marketing Agency — Video, Design, Influence",
  description:
    "InventiveClicks is a creative digital marketing agency. We craft video animation, graphic design, creative marketing campaigns and influencer marketing that turn attention into measurable growth.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", name: "InventiveClicks — Creative Digital Marketing Agency", description: metadata.description })} />
      <JsonLd data={faqSchema(faqs)} />

      <Hero />
      <Clients />
      <Services />
      <About />
      <Process />
      <Work />
      <MarqueeText />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Insights />
    </>
  );
}
