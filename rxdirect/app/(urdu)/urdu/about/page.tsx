import { staticPage } from "@/lib/localizedPages";

const page = staticPage("/about", "ur");
export const metadata = page.metadata;
export default function Page() {
  return page.Page();
}
