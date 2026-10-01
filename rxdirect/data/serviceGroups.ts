export interface ServiceGroup {
  slug: string;
  name: { en: string; ur: string };
  shortDesc: { en: string; ur: string };
  serviceSlugs: string[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "household-staff",
    name: { en: "Household Staff", ur: "گھریلو عملہ" },
    shortDesc: {
      en: "Cooks, chefs, maids, helpers, cleaners, nannies, gardeners, batmen and domestic couples for your home.",
      ur: "آپ کے گھر کے لیے باورچی، شیف، ملازمہ، ہیلپرز، صفائی کا عملہ، آیا، مالی، بیٹ مین اور گھریلو جوڑے۔",
    },
    serviceSlugs: [
      "cooks",
      "chefs",
      "maids",
      "helpers",
      "cleaners",
      "babysitters-nannies",
      "gardeners",
      "couples",
      "batman",
    ],
  },
  {
    slug: "office-security-staff",
    name: { en: "Office & Security Staff", ur: "دفتری و سیکیورٹی عملہ" },
    shortDesc: {
      en: "Drivers, security guards and office boys for homes and businesses.",
      ur: "گھروں اور کاروباروں کے لیے ڈرائیورز، سیکیورٹی گارڈز اور آفس بوائے۔",
    },
    serviceSlugs: ["drivers", "security-guards", "office-boys"],
  },
  {
    slug: "care-staff",
    name: { en: "Nursing & Care Staff", ur: "نرسنگ و نگہداشت عملہ" },
    shortDesc: {
      en: "Home nurses and companion caretakers for elderly or unwell family members.",
      ur: "بزرگ یا بیمار خاندان کے افراد کے لیے ہوم نرسیں اور ہمراہی نگہداشت کار۔",
    },
    serviceSlugs: ["nurses", "caretakers"],
  },
  {
    slug: "home-repair-trade-staff",
    name: { en: "Home Repair & Trade Staff", ur: "گھریلو مرمت و ہنر مند عملہ" },
    shortDesc: {
      en: "Licensed electricians, plumbers, carpenters and painters for repairs, installations and projects.",
      ur: "مرمت، تنصیب اور منصوبوں کے لیے تجربہ کار الیکٹریشن، پلمبر، بڑھئی اور پینٹر۔",
    },
    serviceSlugs: ["electricians", "plumbers", "carpenters", "painters"],
  },
];

export function getServiceGroupBySlug(slug: string) {
  return serviceGroups.find((g) => g.slug === slug);
}

export function getGroupForService(serviceSlug: string) {
  return serviceGroups.find((g) => g.serviceSlugs.includes(serviceSlug));
}
