// Central place for real business details.
// TODO: swap the PLACEHOLDER values before going live.
import settings from "@/content/settings/business.json";

// whatsapp_number, whatsapp_message, and the social URLs below are editable
// by a non-technical admin via /admin (Site Settings), they live in
// content/settings/business.json rather than here. Everything else on this
// page is a code-level constant, edited by hand.
const phoneRaw = settings.whatsapp_number.replace(/\D/g, "");

// rxdirect.pk is self-canonical: every page's canonical tag points back at
// its own rxdirect.pk URL. No other domain (dsp.originlabs.pk, staffly.pk,
// or anything else) is declared as a canonical target.
export const canonicalOrigin = "https://rxdirect.pk";

export function canonicalUrl(path: string): string {
  const normalized = path === "" ? "/" : path;
  return `${canonicalOrigin}${normalized}`;
}

export const business = {
  name: "RX Direct",
  legalName: "RX Direct Domestic Staffing Services",
  tagline: {
    en: "Trusted Domestic Staff, Delivered to Your Door",
    ur: "قابلِ اعتماد گھریلو عملہ، آپ کے دروازے تک",
  },
  phoneDisplay: settings.whatsapp_number,
  phoneRaw, // digits only, derived from whatsapp_number, used for wa.me and tel: links
  email: "info@rxdirect.pk", // PLACEHOLDER, replace with real inbox
  whatsappMessage: settings.whatsapp_message,
  address: {
    en: "Office No. 4, 2nd Floor, Al-Bilal Plaza, Chandni Chowk, Rawalpindi, Pakistan",
    ur: "دفتر نمبر 4، دوسری منزل، البلال پلازہ، چاندنی چوک، راولپنڈی، پاکستان",
  },
  social: {
    facebook: settings.facebook_url,
    instagram: settings.instagram_url,
    linkedin: settings.linkedin_url,
    youtube: settings.youtube_url,
    tiktok: settings.tiktok_url,
  },
  foundedYear: 2018,
  siteUrl: "https://rxdirect.pk",
  secp: {
    legalName: "RX Direct (SMC-Private) Limited",
    cuin: "0347436",
    incorporationDate: "24 July 2026",
    registrar: "Securities and Exchange Commission of Pakistan (SECP)",
    verifyUrl: "https://leap.secp.gov.pk/#/verify-company-info/0347436",
    certificateUrl: "/documents/secp-incorporation-certificate.pdf",
  },
  labour: {
    legalName: "M/S RX Direct",
    certificateType: "Form \"C\" Registration Certificate",
    registrationNumber: "2026013000941",
    registrationDate: "27 July 2026",
    validTill: "26 July 2028",
    issuingAuthority: "Directorate of Labour Welfare, Rawalpindi, Government of the Punjab",
    law: "The Punjab Shops and Establishments Ordinance, 1969",
    establishmentAddress: "2nd Floor, Al-Bilal Plaza, Murree Road, Rawalpindi, Tehsil & District Rawalpindi",
    certificateUrl: "/documents/labour-registration-certificate.pdf",
  },
  pessi: {
    legalName: "M/S RX Direct",
    certificateType: "PESSI Registration Certificate",
    registrationNumber: "2026070024",
    registrationDate: "27 July 2026",
    issuingAuthority: "Punjab Employees Social Security Institution (PESSI), Government of the Punjab",
    law: "Provincial Employees Social Security Ordinance, 1965",
    establishmentAddress: "2nd Floor, Al-Bilal Plaza, Murree Road, Rawalpindi, Tehsil & District Rawalpindi",
    certificateUrl: "/documents/pessi-registration-certificate.pdf",
  },
  fbr: {
    legalName: "RX Direct (SMC-Private) Limited",
    certificateType: "Taxpayer Registration Certificate (NTN)",
    ntn: "J499217",
    registrationDate: "24 July 2026",
    issuingAuthority: "Federal Board of Revenue (FBR), Government of Pakistan, RTO Rawalpindi",
    law: "Section 181C of the Income Tax Ordinance, 2001",
    establishmentAddress: "2nd Floor, Al-Bilal Plaza, Chandni Chowk, Rawalpindi, Pakistan",
    certificateUrl: "/documents/fbr-registration-certificate.pdf",
  },
} as const;

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message || business.whatsappMessage);
  return `https://wa.me/${business.phoneRaw}?text=${text}`;
}

export function telLink() {
  return `tel:+${business.phoneRaw}`;
}
