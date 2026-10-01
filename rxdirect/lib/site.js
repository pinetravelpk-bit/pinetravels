// All site content lives here. Edit this file to change contact details,
// services, jobs and testimonials — every page reads from it.

export const site = {
  name: "RxDirect",
  domain: "rxdirect.pk",
  tagline: "Healthcare & pharmacy staffing, done right.",
  description:
    "RxDirect connects hospitals, clinics and pharmacies across Pakistan with verified pharmacists, nurses, doctors and allied health professionals.",
  // TODO: replace with real contact details before launch.
  phone: "+92 300 0000000",
  whatsapp: "923000000000", // digits only, country code first
  email: "info@rxdirect.pk",
  address: "Pakistan",
  hours: "Mon – Sat, 9:00 am – 6:00 pm",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
  { href: "/employers", label: "For Employers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    icon: "Pill",
    title: "Pharmacy Staffing",
    text: "Licensed pharmacists, pharmacy technicians and counter assistants for retail chains, hospital pharmacies and distributors.",
  },
  {
    icon: "HeartPulse",
    title: "Nursing & Care",
    text: "Registered nurses, LHVs, midwives and caregivers for wards, ICUs, home care and elderly care.",
  },
  {
    icon: "Stethoscope",
    title: "Medical Officers",
    text: "MBBS doctors and specialists for OPDs, emergency cover, night shifts and locum positions.",
  },
  {
    icon: "FlaskConical",
    title: "Lab & Allied Health",
    text: "Lab technologists, radiographers, physiotherapists, OT and dialysis technicians.",
  },
  {
    icon: "ClipboardList",
    title: "Healthcare Admin",
    text: "Front desk, billing, medical records, store keepers and operations staff who understand healthcare.",
  },
  {
    icon: "Building2",
    title: "Permanent & Contract",
    text: "Permanent hires, fixed-term contracts, temporary cover and full team setups for new facilities.",
  },
];

export const steps = {
  employers: [
    { title: "Tell us the role", text: "Share the position, shift, location and budget — takes two minutes." },
    { title: "Get a shortlist", text: "We screen, verify licences and send you pre-interviewed candidates." },
    { title: "Hire with confidence", text: "Interview, select and onboard. We stay with you through probation." },
  ],
  candidates: [
    { title: "Send your CV", text: "Apply online for a listed job or register for future openings." },
    { title: "Meet our team", text: "A short call to understand your skills, licence and preferred location." },
    { title: "Start working", text: "We match you with verified employers and help you through the offer." },
  ],
};

export const stats = [
  { value: "500+", label: "Professionals placed" },
  { value: "120+", label: "Partner facilities" },
  { value: "48h", label: "Average shortlist time" },
  { value: "100%", label: "Licence verification" },
];

export const why = [
  { icon: "ShieldCheck", title: "Verified credentials", text: "Every PPC, PNMC and PMDC registration is checked before a CV reaches you." },
  { icon: "Timer", title: "Fast turnaround", text: "Urgent shift cover in hours, permanent shortlists in days — not weeks." },
  { icon: "Users", title: "Healthcare-only focus", text: "Our recruiters know the sector, so we ask the right questions." },
  { icon: "Handshake", title: "Replacement guarantee", text: "If a placement doesn't work out during probation, we replace at no cost." },
];

// Job listings. Add or remove objects to update /jobs. `slug` must be unique.
export const jobs = [
  {
    slug: "pharmacist-retail",
    title: "Pharmacist (Category A)",
    location: "Lahore",
    type: "Full-time",
    salary: "PKR 120k – 160k",
    summary: "Run dispensing and stock control for a busy retail pharmacy chain outlet. PPC registration required.",
  },
  {
    slug: "staff-nurse-icu",
    title: "Staff Nurse — ICU",
    location: "Islamabad",
    type: "Full-time",
    salary: "PKR 70k – 95k",
    summary: "Critical care nursing in a 200-bed private hospital. PNMC registration and 1+ year ICU experience.",
  },
  {
    slug: "medical-officer-er",
    title: "Medical Officer — Emergency",
    location: "Rawalpindi",
    type: "Shift-based",
    salary: "Per shift",
    summary: "Night and weekend ER cover. PMDC registration and BLS/ACLS preferred.",
  },
  {
    slug: "pharmacy-technician",
    title: "Pharmacy Technician",
    location: "Karachi",
    type: "Full-time",
    salary: "PKR 45k – 60k",
    summary: "Support hospital pharmacy dispensing, inventory and cold-chain handling.",
  },
  {
    slug: "lab-technologist",
    title: "Lab Technologist",
    location: "Faisalabad",
    type: "Full-time",
    salary: "PKR 55k – 75k",
    summary: "Haematology and chemistry bench work in an accredited diagnostic lab.",
  },
  {
    slug: "home-care-nurse",
    title: "Home Care Nurse",
    location: "Lahore / Islamabad",
    type: "Contract",
    salary: "Negotiable",
    summary: "Post-operative and elderly home care visits. Female candidates preferred for this role.",
  },
];

export const testimonials = [
  {
    quote: "We needed three pharmacists for a new branch in under two weeks. RxDirect sent verified candidates in four days.",
    name: "Operations Manager",
    org: "Retail pharmacy chain",
  },
  {
    quote: "Their nurses arrive briefed and ready. Shift cover used to be our biggest headache — not anymore.",
    name: "Nursing Superintendent",
    org: "Private hospital",
  },
  {
    quote: "They understood exactly what I was looking for and found me a hospital job close to home.",
    name: "Staff Nurse",
    org: "Placed via RxDirect",
  },
];

export const roles = [
  "Pharmacist",
  "Pharmacy Technician",
  "Pharmacy Assistant",
  "Staff Nurse",
  "LHV / Midwife",
  "Caregiver",
  "Medical Officer",
  "Specialist Doctor",
  "Lab Technologist",
  "Radiographer",
  "Physiotherapist",
  "Healthcare Admin",
  "Other",
];

export function whatsappLink(text = "") {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
