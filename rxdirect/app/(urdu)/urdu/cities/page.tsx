import { staticPage } from "@/lib/localizedPages";

const page = staticPage("/cities", "ur");
export const metadata = page.metadata;
export default function Page() {
  return page.Page();
}
