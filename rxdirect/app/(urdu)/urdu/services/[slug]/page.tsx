import { servicePage } from "@/lib/localizedPages";

// Next reads these exports statically, so they are declared as functions here.
const page = servicePage("ur");

export function generateStaticParams() {
  return page.generateStaticParams();
}

export function generateMetadata(props: { params: { slug: string } }) {
  return page.generateMetadata(props);
}

export default function Page(props: { params: { slug: string } }) {
  return page.Page(props);
}
