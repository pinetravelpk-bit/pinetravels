// Always format with an explicit locale (never `undefined`) so the output is
// identical on the server (build time) and every client, using the runtime's
// default locale causes React hydration mismatches when it differs between
// the build machine and a visitor's browser.
export function formatDate(
  dateStr: string,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
) {
  return new Date(dateStr).toLocaleDateString("en-GB", opts);
}
