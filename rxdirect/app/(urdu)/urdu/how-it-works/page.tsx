import { staticPage } from "@/lib/localizedPages";

const page = staticPage("/how-it-works", "ur");
export const metadata = page.metadata;
export default function Page() {
  return page.Page();
}
