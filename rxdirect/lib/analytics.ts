declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads "Submit lead form" conversion. Fired only after a lead form has
// been saved by the server, so page views are never counted as leads.
export function trackLeadConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-18304128353/zuUVCMqMvM0cEOGqi5hE",
    value: 1.0,
    currency: "PKR",
  });
}
