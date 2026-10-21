import { staticPage } from "@/lib/localizedPages";

const page = staticPage("/about", "roman");
export const metadata = page.metadata;
export default function Page() {
  return page.Page();
}
