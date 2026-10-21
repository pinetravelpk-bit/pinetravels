import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { mergedFaqs } from "@/lib/pageContent";

// FAQPage JSON-LD for a route's content-file questions, merged with any the
// page already has, so each page carries a single FAQPage block.
export default function PageFaqSchema({ route, existing = [] }: { route: string; existing?: { question: string; answer: string }[] }) {
  const items = mergedFaqs(route, existing);
  return items.length ? <JsonLd data={faqPageSchema(items)} /> : null;
}
