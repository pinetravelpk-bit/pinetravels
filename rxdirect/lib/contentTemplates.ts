import type { ServiceCategory } from "@/data/services";
import { services } from "@/data/services";
import type { City, Society } from "@/data/cities";
import { cities } from "@/data/cities";

type Locale = "en" | "ur";
type L = { en: string; ur: string };

function join(items: string[], locale: Locale) {
  if (items.length <= 1) return items[0] ?? "";
  if (locale === "ur") return items.slice(0, -1).join("، ") + " اور " + items[items.length - 1];
  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}

function seedIndex(seed: string, count: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % count;
}

/**
 * Rotates through several distinct title phrasings so pages targeting
 * different service+place pairs don't all read as the same template,
 * matching the different ways people actually search for staff.
 */
export function variedServiceTitle(serviceNameEn: string, placeEn: string, seedKey: string) {
  const svc = serviceNameEn;
  const svcLower = svc.toLowerCase();
  const templates = [
    `Hire ${svc} in ${placeEn} | Verified & Background-Checked`,
    `${svc} in ${placeEn} | Trusted, Background-Checked Staff`,
    `Best ${svc} Service in ${placeEn}`,
    `Looking for ${svcLower} in ${placeEn}? Verified Candidates Ready`,
    `${placeEn} ${svc} Agency | Background-Checked & Ready in 24 Hours`,
    `${svc} Near Me in ${placeEn}`,
    `${svc} Required in ${placeEn}? Verified Staff Available Now`,
  ];
  return templates[seedIndex(seedKey, templates.length)];
}

export function cityProcessParagraph(city: City): L {
  return {
    en: `Hiring any category of staff in ${city.name.en}, whether it's a cook, driver, cleaner or nanny, follows the same simple process. Message us on WhatsApp with your society or sector, the role you need and your schedule, and our local ${city.name.en} team sends a shortlist of pre-vetted candidates within a few hours. You interview each one directly and confirm the person who fits, usually within 24 to 48 hours of your first message, and there's no fee until a placement is actually confirmed.`,
    ur: `${city.name.ur} میں کسی بھی قسم کے عملے کی خدمات حاصل کرنا، چاہے وہ باورچی ہو، ڈرائیور ہو، صفائی کرنے والا ہو یا آیا، ایک ہی آسان طریقے سے ہوتا ہے۔ اپنی سوسائٹی یا سیکٹر، درکار کردار اور شیڈول کے ساتھ واٹس ایپ پر پیغام بھیجیں، اور ہماری مقامی ${city.name.ur} ٹیم چند گھنٹوں کے اندر پہلے سے جانچے گئے امیدواروں کی فہرست بھیجتی ہے۔ آپ ہر ایک سے براہ راست انٹرویو لیتے ہیں اور موزوں شخص کی تصدیق کرتے ہیں، عام طور پر پہلے پیغام کے 24 سے 48 گھنٹوں کے اندر، اور جب تک تقرری کی تصدیق نہیں ہوتی کوئی فیس نہیں لی جاتی۔`,
  };
}

export function cityAudienceParagraph(city: City): L {
  const societyNames = city.societies.slice(0, 3).map((s) => s.name.en);
  const societyNamesUr = city.societies.slice(0, 3).map((s) => s.name.ur);
  return {
    en: `Clients across ${city.name.en}, from established families in ${join(
      societyNames,
      "en"
    )} to corporate households that need a full team of staff, all go through the same background-check standard. We match on household size, budget and the specific area you live in, since staff who already know ${city.name.en}'s traffic patterns, gate procedures and local shops tend to settle in faster than someone brought in from outside the city.`,
    ur: `${city.name.ur} بھر کے کلائنٹس، ${join(
      societyNamesUr,
      "ur"
    )} کے مستحکم خاندانوں سے لے کر عملے کی مکمل ٹیم کی ضرورت رکھنے والے کارپوریٹ گھرانوں تک، سب ایک ہی پس منظر کی جانچ کے معیار سے گزرتے ہیں۔ ہم گھرانے کے سائز، بجٹ اور آپ کے مخصوص علاقے کی بنیاد پر مماثلت کرتے ہیں، کیونکہ ایسا عملہ جو پہلے سے ${city.name.ur} کے ٹریفک کے انداز، گیٹ کے طریقہ کار اور مقامی دکانوں سے واقف ہو، شہر سے باہر سے لائے گئے کسی فرد کے مقابلے میں زیادہ جلدی ہم آہنگ ہو جاتا ہے۔`,
  };
}

export function cityServicesParagraph(city: City): L {
  const names = services.map((s) => s.name.en);
  const namesUr = services.map((s) => s.name.ur);
  return {
    en: `Households and businesses in ${city.name.en} can request any category we place: ${join(
      names,
      "en"
    )}. Each category has its own vetting steps beyond the standard CNIC and reference checks, a driver's road test and license check, a cook's practical cooking interview, an electrician's tool and safety check, so the verification always matches the actual work involved.`,
    ur: `${city.name.ur} کے گھرانے اور کاروبار ہماری کسی بھی کیٹیگری کی درخواست کر سکتے ہیں: ${join(
      namesUr,
      "ur"
    )}۔ ہر کیٹیگری کے معیاری شناختی کارڈ اور حوالہ جات کی جانچ سے آگے اپنے مخصوص تصدیقی مراحل ہیں، ڈرائیور کا روڈ ٹیسٹ اور لائسنس چیک، باورچی کا عملی کھانا پکانے کا انٹرویو، الیکٹریشن کا اوزار اور حفاظتی جانچ، تاکہ تصدیق ہمیشہ اصل کام سے مطابقت رکھے۔`,
  };
}

export function societyServicesParagraph(city: City, society: Society): L {
  const names = services.map((s) => s.name.en);
  const namesUr = services.map((s) => s.name.ur);
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  return {
    en: `Households in ${place} can request any category we place: ${join(
      names,
      "en"
    )}. Whichever category you need, verification is matched to the actual work involved rather than a single generic check for every role.`,
    ur: `${placeUr} کے گھرانے ہماری کسی بھی کیٹیگری کی درخواست کر سکتے ہیں: ${join(
      namesUr,
      "ur"
    )}۔ آپ کو جو بھی کیٹیگری درکار ہو، تصدیق ہر کردار کے لیے ایک ہی عمومی جانچ کے بجائے اصل کام سے مطابقت رکھتی ہے۔`,
  };
}

export function serviceOverviewCitiesParagraph(service: ServiceCategory): L {
  const names = cities.map((c) => c.name.en);
  const namesUr = cities.map((c) => c.name.ur);
  return {
    en: `We currently place ${service.name.en.toLowerCase()} in ${join(
      names,
      "en"
    )}, with a local team in each city who already knows the area's housing societies, sectors and typical commute patterns. If you're outside these cities, message us anyway, we can often still arrange coverage depending on the location.`,
    ur: `ہم فی الحال ${namesUr.length > 1 ? join(namesUr, "ur") : namesUr[0]} میں ${service.name.ur} تعینات کرتے ہیں، ہر شہر میں ایک مقامی ٹیم کے ساتھ جو پہلے سے اس علاقے کی ہاؤسنگ سوسائٹیز، سیکٹرز اور معمول کی آمدورفت کے انداز سے واقف ہے۔ اگر آپ ان شہروں سے باہر ہیں تو بھی پیغام بھیجیں، ہم اکثر مقام کے مطابق احاطہ کرنے کا انتظام کر سکتے ہیں۔`,
  };
}

export function cityTrustParagraph(city: City): L {
  return {
    en: `Every candidate we shortlist in ${city.name.en}, regardless of role, goes through CNIC and address verification, reference checks with previous employers, and an in-person interview before we ever introduce them to a client. That standard doesn't change based on which society or sector you're in, a household near the older, established parts of ${city.name.en} gets the same vetting as one in a newer development. If a placement isn't the right fit, we arrange a free replacement within 6 months of placement, and there's no charge to search until you're satisfied with the result.`,
    ur: `${city.name.ur} میں ہم جو بھی امیدوار منتخب کرتے ہیں، کردار سے قطع نظر، کلائنٹ سے متعارف کرانے سے پہلے شناختی کارڈ اور پتے کی تصدیق، سابقہ آجروں سے حوالہ جات کی جانچ، اور ذاتی انٹرویو سے گزرتا ہے۔ یہ معیار اس بات سے تبدیل نہیں ہوتا کہ آپ کس سوسائٹی یا سیکٹر میں ہیں، ${city.name.ur} کے پرانے، مستحکم علاقوں کے قریب گھرانے کو بھی وہی جانچ ملتی ہے جو نئی ڈویلپمنٹ میں گھرانے کو ملتی ہے۔ اگر تقرری موزوں ثابت نہ ہو تو ہم ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں، اور جب تک آپ نتیجے سے مطمئن نہ ہوں تلاش کے لیے کوئی چارج نہیں۔`,
  };
}

export function societyTrustParagraph(city: City, society: Society): L {
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  return {
    en: `Every candidate we shortlist for ${place}, regardless of role, goes through CNIC and address verification, reference checks with previous employers, and an in-person interview before we ever introduce them to a client. If a placement isn't the right fit, we arrange a free replacement within 6 months of placement, and there's no charge to search until you're satisfied with the result.`,
    ur: `${placeUr} کے لیے ہم جو بھی امیدوار منتخب کرتے ہیں، کردار سے قطع نظر، کلائنٹ سے متعارف کرانے سے پہلے شناختی کارڈ اور پتے کی تصدیق، سابقہ آجروں سے حوالہ جات کی جانچ، اور ذاتی انٹرویو سے گزرتا ہے۔ اگر تقرری موزوں ثابت نہ ہو تو ہم ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں، اور جب تک آپ نتیجے سے مطمئن نہ ہوں تلاش کے لیے کوئی چارج نہیں۔`,
  };
}

export function serviceOverviewTrustParagraph(service: ServiceCategory): L {
  return {
    en: `Every ${service.name.en.toLowerCase()} candidate we shortlist goes through the same ${service.checks.en.length}-step verification process, regardless of which city you're hiring in. That includes CNIC and address verification, reference checks with previous employers, and an in-person interview before we ever introduce them to a client. If a placement isn't the right fit, we arrange a free replacement within 6 months of placement, and there's no charge to search until you're satisfied with the result.`,
    ur: `ہم جو بھی ${service.name.ur} امیدوار منتخب کرتے ہیں وہ اسی ${service.checks.ur.length}-مرحلہ تصدیقی عمل سے گزرتا ہے، چاہے آپ کسی بھی شہر میں تقرری کر رہے ہوں۔ اس میں شناختی کارڈ اور پتے کی تصدیق، سابقہ آجروں سے حوالہ جات کی جانچ، اور ذاتی انٹرویو شامل ہے۔ اگر تقرری موزوں ثابت نہ ہو تو ہم ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں، اور جب تک آپ نتیجے سے مطمئن نہ ہوں تلاش کے لیے کوئی چارج نہیں۔`,
  };
}

export function cityFaqs(city: City): { question: L; answer: L }[] {
  return [
    {
      question: {
        en: `How quickly can I hire domestic staff in ${city.name.en}?`,
        ur: `میں ${city.name.ur} میں گھریلو عملہ کتنی جلدی حاصل کر سکتا ہوں؟`,
      },
      answer: {
        en: `Most requests in ${city.name.en} are matched with a shortlist within a few hours, and a confirmed placement within 24 to 48 hours.`,
        ur: `${city.name.ur} میں زیادہ تر درخواستوں کے لیے چند گھنٹوں کے اندر فہرست فراہم کر دی جاتی ہے، اور 24 سے 48 گھنٹوں کے اندر تقرری کی تصدیق ہو جاتی ہے۔`,
      },
    },
    {
      question: {
        en: `Do you cover every housing society in ${city.name.en}?`,
        ur: `کیا آپ ${city.name.ur} کی ہر ہاؤسنگ سوسائٹی کا احاطہ کرتے ہیں؟`,
      },
      answer: {
        en: `We actively place staff across ${city.name.en}'s ${city.societies.length} major housing societies and sectors, and can usually arrange coverage for nearby areas too.`,
        ur: `ہم ${city.name.ur} کی ${city.societies.length} بڑی ہاؤسنگ سوسائٹیز اور سیکٹرز میں فعال طور پر عملہ تعینات کرتے ہیں، اور عام طور پر قریبی علاقوں کا احاطہ بھی کر سکتے ہیں۔`,
      },
    },
    {
      question: {
        en: `Can I request a female candidate for staff in ${city.name.en}?`,
        ur: `کیا میں ${city.name.ur} میں عملے کے لیے خاتون امیدوار کی درخواست کر سکتا ہوں؟`,
      },
      answer: {
        en: `Yes, just mention your gender preference when you message us and our ${city.name.en} team will shortlist accordingly, we place both male and female candidates depending on what the household needs.`,
        ur: `جی ہاں، پیغام بھیجتے وقت اپنی صنفی ترجیح بتائیں اور ہماری ${city.name.ur} ٹیم اسی کے مطابق فہرست تیار کرے گی، ہم گھرانے کی ضرورت کے مطابق مرد اور خاتون دونوں امیدوار فراہم کرتے ہیں۔`,
      },
    },
    {
      question: {
        en: `What if the staff member placed in ${city.name.en} isn't a good fit?`,
        ur: `اگر ${city.name.ur} میں تعینات عملہ رکن مناسب ثابت نہ ہو تو کیا ہوگا؟`,
      },
      answer: {
        en: `We arrange a free replacement within 6 months of placement, no extra charges.`,
        ur: `ہم ضمانتی مدت کے اندر مفت متبادل کا انتظام کرتے ہیں، کوئی اضافی چارجز نہیں۔`,
      },
    },
  ];
}

export function societyProcessParagraph(city: City, society: Society): L {
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  return {
    en: `Hiring any category of staff in ${place}, whether it's a cook, driver, cleaner or nanny, follows the same simple process. Message us on WhatsApp with the role you need and your schedule, and our local team, already familiar with ${society.name.en}'s entry procedures, sends a shortlist of pre-vetted candidates within a few hours. Most households complete the whole process within 24 to 48 hours, and there's no fee until a placement is actually confirmed.`,
    ur: `${placeUr} میں کسی بھی قسم کے عملے کی خدمات حاصل کرنا، چاہے وہ باورچی ہو، ڈرائیور ہو، صفائی کرنے والا ہو یا آیا، ایک ہی آسان طریقے سے ہوتا ہے۔ درکار کردار اور شیڈول کے ساتھ واٹس ایپ پر پیغام بھیجیں، اور ہماری مقامی ٹیم، جو پہلے سے ${society.name.ur} کے داخلے کے طریقہ کار سے واقف ہے، چند گھنٹوں کے اندر پہلے سے جانچے گئے امیدواروں کی فہرست بھیجتی ہے۔ زیادہ تر گھرانے پورا عمل 24 سے 48 گھنٹوں کے اندر مکمل کر لیتے ہیں، اور جب تک تقرری کی تصدیق نہیں ہوتی کوئی فیس نہیں لی جاتی۔`,
  };
}

export function societyAudienceParagraph(city: City, society: Society): L {
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  return {
    en: `Households in ${place} request staff for a range of reasons: growing families who need consistent daily help, working couples who need reliable coverage while they're at the office, and property owners who want a candidate already familiar with the area rather than someone new to it. We match based on the specific schedule, language preference and household size you describe, which is why most placements in ${place} last well beyond the initial trial period.`,
    ur: `${placeUr} کے گھرانے مختلف وجوہات کی بنا پر عملے کی درخواست کرتے ہیں: بڑھتے ہوئے خاندان جنہیں مستقل روزانہ مدد درکار ہے، کام کرنے والے جوڑے جنہیں دفتر میں ہونے کے دوران قابلِ اعتماد کوریج چاہیے، اور جائیداد کے مالکان جو کسی نئے فرد کے بجائے علاقے سے پہلے سے واقف امیدوار چاہتے ہیں۔ ہم آپ کے بتائے گئے مخصوص شیڈول، زبان کی ترجیح اور گھرانے کے سائز کی بنیاد پر مماثلت کرتے ہیں، یہی وجہ ہے کہ ${placeUr} میں زیادہ تر تقرریاں آزمائشی مدت سے کہیں آگے تک قائم رہتی ہیں۔`,
  };
}

export function societyFaqs(city: City, society: Society): { question: L; answer: L }[] {
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  return [
    {
      question: {
        en: `How fast can I hire staff in ${society.name.en}?`,
        ur: `میں ${society.name.ur} میں عملہ کتنی جلدی حاصل کر سکتا ہوں؟`,
      },
      answer: {
        en: `Most requests from ${place} are matched within 24 hours, since our local team already places staff in this area and knows its entry and security procedures.`,
        ur: `${placeUr} سے موصول ہونے والی زیادہ تر درخواستیں 24 گھنٹوں کے اندر پوری کی جاتی ہیں، کیونکہ ہماری مقامی ٹیم پہلے ہی اس علاقے میں عملہ تعینات کرتی ہے۔`,
      },
    },
    {
      question: {
        en: `Are candidates placed in ${society.name.en} background-checked?`,
        ur: `کیا ${society.name.ur} میں تعینات امیدواروں کی پس منظر جانچ کی جاتی ہے؟`,
      },
      answer: {
        en: `Yes, every candidate is CNIC-verified, reference-checked and interviewed in person before being shortlisted for ${society.name.en} households.`,
        ur: `جی ہاں، ${society.name.ur} کے گھرانوں کے لیے منتخب کیے جانے سے پہلے ہر امیدوار کی شناختی کارڈ تصدیق، حوالہ جات کی جانچ اور ذاتی انٹرویو کیا جاتا ہے۔`,
      },
    },
    {
      question: {
        en: `Can I request a female candidate for staff in ${society.name.en}?`,
        ur: `کیا میں ${society.name.ur} میں عملے کے لیے خاتون امیدوار کی درخواست کر سکتا ہوں؟`,
      },
      answer: {
        en: `Yes, just mention your gender preference when you message us and we'll shortlist accordingly for ${place}.`,
        ur: `جی ہاں، پیغام بھیجتے وقت اپنی صنفی ترجیح بتائیں اور ہم ${placeUr} کے لیے اسی کے مطابق فہرست تیار کریں گے۔`,
      },
    },
    {
      question: {
        en: `What if the staff member placed in ${society.name.en} isn't a good fit?`,
        ur: `اگر ${society.name.ur} میں تعینات عملہ رکن مناسب ثابت نہ ہو تو کیا ہوگا؟`,
      },
      answer: {
        en: `We arrange a free replacement within 6 months of placement, no extra charges, no long wait.`,
        ur: `ہم ضمانتی مدت کے اندر مفت متبادل کا انتظام کرتے ہیں، کوئی اضافی چارجز نہیں، کوئی طویل انتظار نہیں۔`,
      },
    },
  ];
}

export function serviceOverviewProcessParagraph(service: ServiceCategory): L {
  return {
    en: `Hiring ${service.name.en.toLowerCase()} through RX Direct follows the same straightforward process in every city we serve. Message us on WhatsApp with your city, schedule and household requirements, and our local team sends a shortlist of two or three pre-vetted candidates, usually within a few hours. You interview each one directly, ask about their previous placements, and confirm who fits best, most clients complete the whole process within 24 to 48 hours, and there's no fee until you actually confirm a placement.`,
    ur: `آر ایکس ڈائریکٹ کے ذریعے ${service.name.ur} کی خدمات حاصل کرنا ہمارے ہر شہر میں ایک ہی سیدھے طریقے سے ہوتا ہے۔ اپنے شہر، شیڈول اور گھریلو ضروریات کے ساتھ واٹس ایپ پر پیغام بھیجیں، اور ہماری مقامی ٹیم چند گھنٹوں کے اندر دو یا تین پہلے سے جانچے گئے امیدواروں کی فہرست بھیجتی ہے۔ آپ ہر ایک سے براہ راست انٹرویو لیتے ہیں، ان کی سابقہ تقرریوں کے بارے میں پوچھتے ہیں، اور موزوں ترین شخص کی تصدیق کرتے ہیں، زیادہ تر کلائنٹس پورا عمل 24 سے 48 گھنٹوں کے اندر مکمل کر لیتے ہیں، اور جب تک تقرری کی تصدیق نہیں ہوتی کوئی فیس نہیں لی جاتی۔`,
  };
}

export function serviceOverviewAudienceParagraph(service: ServiceCategory): L {
  return {
    en: `Families and businesses request a ${service.name.en.toLowerCase().replace(/s$/, "")} for a range of reasons: growing households that need consistent daily help, working couples who need reliable coverage during office hours, and businesses that need a dependable, background-checked hire rather than an unknown candidate. Whatever the reason, we match based on the specific schedule, language preference and household size you describe, not a generic profile, so most placements last well beyond the initial trial period.`,
    ur: `خاندان اور کاروبار مختلف وجوہات کی بنا پر ${service.name.ur} کی خدمات کی درخواست کرتے ہیں: بڑھتے ہوئے گھرانے جنہیں مستقل روزانہ مدد درکار ہے، کام کرنے والے جوڑے جنہیں دفتری اوقات میں قابلِ اعتماد کوریج چاہیے، اور کاروبار جنہیں کسی نامعلوم امیدوار کے بجائے ایک قابلِ بھروسہ، پس منظر کی جانچ شدہ تقرری چاہیے۔ وجہ کچھ بھی ہو، ہم آپ کے بتائے گئے مخصوص شیڈول، زبان کی ترجیح اور گھرانے کے سائز کی بنیاد پر مماثلت کرتے ہیں، یہی وجہ ہے کہ زیادہ تر تقرریاں آزمائشی مدت سے کہیں آگے تک قائم رہتی ہیں۔`,
  };
}

export function serviceOverviewFaqs(service: ServiceCategory): { question: L; answer: L }[] {
  const svcEn = service.name.en;
  const svcUr = service.name.ur;
  return [
    {
      question: {
        en: `How much does it cost to hire ${svcEn.toLowerCase()}?`,
        ur: `${svcUr} کی خدمات حاصل کرنے کی لاگت کیا ہے؟`,
      },
      answer: {
        en: `Pricing depends on experience level, city and whether the role is live-in or live-out. Message us on WhatsApp with your requirements and we'll share a clear quote before you commit to anything.`,
        ur: `قیمت تجربے کی سطح، شہر اور یہ کہ کردار لِیو اِن ہے یا لِیو آؤٹ، اس پر منحصر ہے۔ اپنی ضروریات کے ساتھ واٹس ایپ پر پیغام بھیجیں اور ہم عزم کرنے سے پہلے واضح قیمت فراہم کریں گے۔`,
      },
    },
    {
      question: {
        en: `Which cities do you offer ${svcEn.toLowerCase()} in?`,
        ur: `آپ کن شہروں میں ${svcUr} فراہم کرتے ہیں؟`,
      },
      answer: {
        en: `We place ${svcEn.toLowerCase()} across all major cities we serve, with dedicated local teams who already know each city's societies and sectors.`,
        ur: `ہم اپنے تمام بڑے شہروں میں ${svcUr} تعینات کرتے ہیں، مقامی ٹیموں کے ساتھ جو پہلے سے ہر شہر کی سوسائٹیز اور سیکٹرز سے واقف ہیں۔`,
      },
    },
    {
      question: {
        en: `Can I request a female candidate for ${svcEn.toLowerCase()}?`,
        ur: `کیا میں ${svcUr} کے لیے خاتون امیدوار کی درخواست کر سکتا ہوں؟`,
      },
      answer: {
        en: `Yes, just mention your gender preference when you message us and we'll shortlist accordingly, we place both male and female candidates depending on what the household needs.`,
        ur: `جی ہاں، پیغام بھیجتے وقت اپنی صنفی ترجیح بتائیں اور ہم اسی کے مطابق فہرست تیار کریں گے، ہم گھرانے کی ضرورت کے مطابق مرد اور خاتون دونوں امیدوار فراہم کرتے ہیں۔`,
      },
    },
    {
      question: {
        en: `Are your ${svcEn.toLowerCase()} candidates background-checked?`,
        ur: `کیا آپ کے ${svcUr} امیدواروں کی پس منظر جانچ کی جاتی ہے؟`,
      },
      answer: {
        en: `Yes, every candidate goes through CNIC and address verification, reference checks with previous employers, and an in-person interview before being shortlisted.`,
        ur: `جی ہاں، ہر امیدوار کو منتخب کیے جانے سے پہلے شناختی کارڈ اور پتے کی تصدیق، سابقہ آجروں سے حوالہ جات کی جانچ، اور ذاتی طور پر انٹرویو سے گزارا جاتا ہے۔`,
      },
    },
    {
      question: {
        en: `Can I get a replacement if the ${svcEn.toLowerCase()} isn't a good fit?`,
        ur: `اگر ${svcUr} مناسب ثابت نہ ہو تو کیا مجھے متبادل مل سکتا ہے؟`,
      },
      answer: {
        en: `Yes, we offer a free replacement within 6 months of placement for every placement, no extra fees.`,
        ur: `جی ہاں، ہم ہر تقرری کے لیے ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں، کوئی اضافی فیس نہیں۔`,
      },
    },
  ];
}

export function serviceCityIntroParagraph(service: ServiceCategory, city: City): L {
  const societyNames = city.societies.slice(0, 4).map((s) => s.name.en);
  const societyNamesUr = city.societies.slice(0, 4).map((s) => s.name.ur);
  return {
    en: `${service.intro.en} In ${city.name.en}, our local team places ${service.name.en.toLowerCase()} across ${city.societies.length} major housing societies and sectors, including ${join(
      societyNames,
      "en"
    )}, so wherever you live in ${city.name.en}, a verified candidate is never far away.`,
    ur: `${service.intro.ur} ${city.name.ur} میں، ہماری مقامی ٹیم ${city.societies.length} بڑی ہاؤسنگ سوسائٹیز اور سیکٹرز میں ${service.name.ur} تعینات کرتی ہے, بشمول ${join(
      societyNamesUr,
      "ur"
    )}, تاکہ ${city.name.ur} میں آپ جہاں بھی رہائش پذیر ہوں، تصدیق شدہ امیدوار ہمیشہ قریب دستیاب ہو۔`,
  };
}

export function serviceSocietyIntroParagraph(
  service: ServiceCategory,
  city: City,
  society: Society
): L {
  const others = city.societies.filter((s) => s.slug !== society.slug).slice(0, 3);
  const othersEn = others.map((s) => s.name.en);
  const othersUr = others.map((s) => s.name.ur);
  return {
    en: `${service.intro.en} We already have vetted ${service.name.en.toLowerCase()} familiar with ${society.name.en}'s day-to-day routines, and the same local team also covers nearby ${city.name.en} areas such as ${join(
      othersEn,
      "en"
    )}, so a trial replacement or a second staff member for a neighbouring household is just as quick to arrange.`,
    ur: `${service.intro.ur} ہمارے پاس پہلے سے ایسے تصدیق شدہ ${service.name.ur} موجود ہیں جو ${society.name.ur} کے روزمرہ معمولات سے واقف ہیں، اور یہی مقامی ٹیم ${city.name.ur} کے قریبی علاقوں جیسے ${join(
      othersUr,
      "ur"
    )} کا بھی احاطہ کرتی ہے, اس لیے آزمائشی تبدیلی یا پڑوسی گھرانے کے لیے دوسرا عملہ رکن بھی اتنی ہی تیزی سے فراہم کیا جا سکتا ہے۔`,
  };
}

export function trustParagraph(service: ServiceCategory, placeEn: string, placeUr: string): L {
  return {
    en: `Every ${service.name.en.toLowerCase().replace(/s$/, "")} candidate we shortlist for ${placeEn} goes through the same ${service.checks.en.length}-step verification process used nationwide, so hiring in ${placeEn} never means a lower standard than our other cities. If a placement isn't the right fit, we arrange a free replacement within 6 months of placement, and there's no charge to search until you're satisfied.`,
    ur: `${placeUr} کے لیے ہم جو بھی امیدوار منتخب کرتے ہیں وہ اسی ${service.checks.ur.length}-مرحلہ تصدیقی عمل سے گزرتا ہے جو ملک بھر میں استعمال ہوتا ہے, اس لیے ${placeUr} میں تقرری کبھی بھی ہمارے دیگر شہروں سے کم معیار کی نہیں ہوتی۔ اگر تقرری مناسب ثابت نہ ہو تو ہم ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں، اور جب تک آپ مطمئن نہ ہوں تلاش کے لیے کوئی چارج نہیں۔`,
  };
}

export function processParagraph(service: ServiceCategory, placeEn: string, placeUr: string): L {
  return {
    en: `Hiring a ${service.name.en.toLowerCase()} in ${placeEn} works the same simple way regardless of household size: message us on WhatsApp with your schedule and requirements, and within a few hours our local team sends a shortlist of two or three pre-vetted candidates already familiar with ${placeEn}. You interview each one directly, ask about their previous placements, and confirm the person who fits best. Most households in ${placeEn} complete the whole process, from first message to a staff member starting work, within 24 to 48 hours, and there's no fee until you actually confirm a placement.`,
    ur: `${placeUr} میں ${service.name.ur} کی خدمات حاصل کرنا گھرانے کے سائز سے قطع نظر ایک ہی آسان طریقے سے ہوتا ہے: اپنے شیڈول اور ضروریات کے ساتھ واٹس ایپ پر پیغام بھیجیں، اور چند گھنٹوں کے اندر ہماری مقامی ٹیم ${placeUr} سے پہلے سے واقف دو یا تین پہلے سے جانچے گئے امیدواروں کی فہرست بھیجتی ہے۔ آپ ہر ایک سے براہ راست انٹرویو لیتے ہیں، ان کی سابقہ تقرریوں کے بارے میں پوچھتے ہیں، اور موزوں ترین شخص کی تصدیق کرتے ہیں۔ ${placeUr} میں زیادہ تر گھرانے پورا عمل، پہلے پیغام سے لے کر عملے کے کام شروع کرنے تک، 24 سے 48 گھنٹوں کے اندر مکمل کر لیتے ہیں، اور جب تک آپ تقرری کی تصدیق نہیں کرتے کوئی فیس نہیں لی جاتی۔`,
  };
}

export function audienceParagraph(service: ServiceCategory, placeEn: string, placeUr: string): L {
  return {
    en: `Households and businesses in ${placeEn} request a ${service.name.en.toLowerCase().replace(/s$/, "")} for a range of reasons: growing families who need consistent daily help, working couples who need reliable coverage while they're at the office, and property owners who want a trained local candidate rather than someone unfamiliar with the area. Whatever the reason, we match based on the specific schedule, language preference and household size you describe, not a generic profile, which is why most placements in ${placeEn} last well beyond the initial trial period.`,
    ur: `${placeUr} کے گھرانے اور کاروبار مختلف وجوہات کی بنا پر ${service.name.ur} کی خدمات کی درخواست کرتے ہیں: بڑھتے ہوئے خاندان جنہیں مستقل روزانہ مدد درکار ہے، کام کرنے والے جوڑے جنہیں دفتر میں ہونے کے دوران قابلِ اعتماد کوریج چاہیے، اور جائیداد کے مالکان جو کسی اجنبی کے بجائے علاقے سے واقف تربیت یافتہ مقامی امیدوار چاہتے ہیں۔ وجہ کچھ بھی ہو، ہم آپ کے بتائے گئے مخصوص شیڈول، زبان کی ترجیح اور گھرانے کے سائز کی بنیاد پر مماثلت کرتے ہیں، نہ کہ کسی عمومی پروفائل پر، یہی وجہ ہے کہ ${placeUr} میں زیادہ تر تقرریاں آزمائشی مدت سے کہیں آگے تک قائم رہتی ہیں۔`,
  };
}

export function serviceCityFaqs(service: ServiceCategory, city: City): { question: L; answer: L }[] {
  const svcEn = service.name.en;
  const svcUr = service.name.ur;
  return [
    {
      question: {
        en: `How much does it cost to hire ${svcEn.toLowerCase()} in ${city.name.en}?`,
        ur: `${city.name.ur} میں ${svcUr} کی خدمات حاصل کرنے کی لاگت کیا ہے؟`,
      },
      answer: {
        en: `Pricing depends on experience level and whether the role is live-in or live-out. Message us on WhatsApp with your requirements in ${city.name.en} and we'll share a clear quote before you commit to anything.`,
        ur: `قیمت تجربے کی سطح اور یہ کہ کردار لِیو اِن ہے یا لِیو آؤٹ، اس پر منحصر ہے۔ ${city.name.ur} میں اپنی ضروریات کے ساتھ واٹس ایپ پر پیغام بھیجیں اور ہم عزم کرنے سے پہلے واضح قیمت فراہم کریں گے۔`,
      },
    },
    {
      question: {
        en: `How quickly can I get a ${svcEn.toLowerCase()} in ${city.name.en}?`,
        ur: `مجھے ${city.name.ur} میں ${svcUr} کتنی جلدی مل سکتا ہے؟`,
      },
      answer: {
        en: `Most ${city.name.en} requests are matched within 24 hours, since we already have an active local team and shortlisted candidates vetted across the city's societies.`,
        ur: `${city.name.ur} کی زیادہ تر درخواستیں 24 گھنٹوں کے اندر پوری کر دی جاتی ہیں، کیونکہ ہماری پہلے سے ایک فعال مقامی ٹیم اور شہر کی سوسائٹیز میں تصدیق شدہ امیدوار موجود ہیں۔`,
      },
    },
    {
      question: {
        en: `Can I request a female candidate for ${svcEn.toLowerCase()} in ${city.name.en}?`,
        ur: `کیا میں ${city.name.ur} میں ${svcUr} کے لیے خاتون امیدوار کی درخواست کر سکتا ہوں؟`,
      },
      answer: {
        en: `Yes, just mention your gender preference when you message us and our ${city.name.en} team will shortlist accordingly.`,
        ur: `جی ہاں، پیغام بھیجتے وقت اپنی صنفی ترجیح بتائیں اور ہماری ${city.name.ur} ٹیم اسی کے مطابق فہرست تیار کرے گی۔`,
      },
    },
    {
      question: {
        en: `Are your ${svcEn.toLowerCase()} candidates in ${city.name.en} background-checked?`,
        ur: `کیا ${city.name.ur} میں آپ کے ${svcUr} امیدواروں کی پس منظر جانچ کی جاتی ہے؟`,
      },
      answer: {
        en: `Yes, every candidate goes through CNIC and address verification, reference checks with previous employers, and an in-person interview before being shortlisted for ${city.name.en} households.`,
        ur: `جی ہاں, ہر امیدوار کو ${city.name.ur} کے گھرانوں کے لیے منتخب کیے جانے سے پہلے شناختی کارڈ اور پتے کی تصدیق، سابقہ آجروں سے حوالہ جات کی جانچ، اور ذاتی طور پر انٹرویو سے گزارا جاتا ہے۔`,
      },
    },
    {
      question: {
        en: `Can I get a replacement if the ${svcEn.toLowerCase()} in ${city.name.en} isn't a good fit?`,
        ur: `اگر ${city.name.ur} میں ${svcUr} مناسب ثابت نہ ہو تو کیا مجھے متبادل مل سکتا ہے؟`,
      },
      answer: {
        en: `Yes, we offer a free replacement within 6 months of placement for every placement in ${city.name.en}, no extra fees.`,
        ur: `جی ہاں، ہم ${city.name.ur} میں ہر تقرری کے لیے ضمانتی مدت کے اندر مفت متبادل فراہم کرتے ہیں, کوئی اضافی فیس نہیں۔`,
      },
    },
  ];
}

export function serviceSocietyFaqs(
  service: ServiceCategory,
  city: City,
  society: Society
): { question: L; answer: L }[] {
  const svcEn = service.name.en;
  const svcUr = service.name.ur;
  const place = society.name.en.toLowerCase().includes(city.name.en.toLowerCase())
    ? society.name.en
    : `${society.name.en}, ${city.name.en}`;
  const placeUr = `${society.name.ur}، ${city.name.ur}`;
  const otherSocieties = city.societies.filter((s) => s.slug !== society.slug).slice(0, 2);

  const base = [
    {
      question: {
        en: `How fast can I hire ${svcEn.toLowerCase()} in ${society.name.en}?`,
        ur: `میں ${society.name.ur} میں ${svcUr} کتنی جلدی حاصل کر سکتا ہوں؟`,
      },
      answer: {
        en: `Most requests from ${place} are matched within 24 hours, our local team already places staff in this area and knows its entry/security procedures.`,
        ur: `${placeUr} سے موصول ہونے والی زیادہ تر درخواستیں 24 گھنٹوں کے اندر پوری کی جاتی ہیں, ہماری مقامی ٹیم پہلے ہی اس علاقے میں عملہ تعینات کرتی ہے اور اس کے داخلے/سیکیورٹی طریقہ کار سے واقف ہے۔`,
      },
    },
    {
      question: {
        en: `Can I request a female candidate for ${svcEn.toLowerCase()} in ${society.name.en}?`,
        ur: `کیا میں ${society.name.ur} میں ${svcUr} کے لیے خاتون امیدوار کی درخواست کر سکتا ہوں؟`,
      },
      answer: {
        en: `Yes, just mention your gender preference when you message us and we'll shortlist accordingly for ${place}.`,
        ur: `جی ہاں، پیغام بھیجتے وقت اپنی صنفی ترجیح بتائیں اور ہم ${placeUr} کے لیے اسی کے مطابق فہرست تیار کریں گے۔`,
      },
    },
    {
      question: {
        en: `Do you verify ${svcEn.toLowerCase()} candidates before placing them in ${society.name.en}?`,
        ur: `کیا آپ ${society.name.ur} میں تعینات کرنے سے پہلے ${svcUr} امیدواروں کی تصدیق کرتے ہیں؟`,
      },
      answer: {
        en: `Yes, every candidate is CNIC-verified, reference-checked and interviewed in person before being shortlisted for households in ${society.name.en}.`,
        ur: `جی ہاں، ${society.name.ur} کے گھرانوں کے لیے منتخب کیے جانے سے پہلے ہر امیدوار کی شناختی کارڈ تصدیق، حوالہ جات کی جانچ اور ذاتی انٹرویو کیا جاتا ہے۔`,
      },
    },
  ];

  if (otherSocieties.length > 0) {
    base.push({
      question: {
        en: `Do you also cover areas near ${society.name.en} in ${city.name.en}?`,
        ur: `کیا آپ ${city.name.ur} میں ${society.name.ur} کے قریبی علاقوں کا بھی احاطہ کرتے ہیں؟`,
      },
      answer: {
        en: `Yes, alongside ${society.name.en}, the same team also places ${svcEn.toLowerCase()} in ${join(
          otherSocieties.map((s) => s.name.en),
          "en"
        )}.`,
        ur: `جی ہاں، ${society.name.ur} کے ساتھ ساتھ، یہی ٹیم ${join(
          otherSocieties.map((s) => s.name.ur),
          "ur"
        )} میں بھی ${svcUr} تعینات کرتی ہے۔`,
      },
    });
  }

  base.push({
    question: {
      en: `What if the ${svcEn.toLowerCase()} placed in ${society.name.en} isn't a good fit?`,
      ur: `اگر ${society.name.ur} میں تعینات ${svcUr} مناسب ثابت نہ ہو تو کیا ہوگا؟`,
    },
    answer: {
      en: `We arrange a free replacement within 6 months of placement, no extra charges, no long wait.`,
      ur: `ہم ضمانتی مدت کے اندر مفت متبادل کا انتظام کرتے ہیں, کوئی اضافی چارجز نہیں، کوئی طویل انتظار نہیں۔`,
    },
  });

  return base;
}
