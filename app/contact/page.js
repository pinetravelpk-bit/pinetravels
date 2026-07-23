import PageBanner from "../../components/PageBanner";
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Pine Travel — call, WhatsApp or send an enquiry for tours, hotels, destination weddings and vehicle rentals across Northern Pakistan. Based in Saddar, Rawalpindi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact us"
        title="Tell us where you want to go"
        intro="Fill in a few details and we'll get back with an itinerary and a quote. Prefer to talk? Call or WhatsApp us any time."
      />
      <ContactForm />
    </>
  );
}
