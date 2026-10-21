import { staticPage } from "@/lib/localizedPages";

const page = staticPage("/cities", "roman");
export const metadata = page.metadata;
export default function Page() {
  return page.Page();
}
