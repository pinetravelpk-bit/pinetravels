import { getServiceImageOverride } from "@/data/siteImages";

export type IconName =
  | "chef"
  | "driver"
  | "helper"
  | "cleaner"
  | "guard"
  | "officeBoy"
  | "nanny"
  | "gardener"
  | "nurse"
  | "caretaker"
  | "couple"
  | "electrician"
  | "plumber"
  | "carpenter"
  | "painter"
  | "batman";

export interface ServiceCategory {
  slug: string;
  icon: IconName;
  image: string;
  imageAlt: { en: string; ur: string };
  name: { en: string; ur: string };
  shortDesc: { en: string; ur: string };
  intro: { en: string; ur: string };
  benefits: { en: string[]; ur: string[] };
  checks: { en: string[]; ur: string[] };
}

const rawServices: ServiceCategory[] = [
  {
    slug: "cooks",
    icon: "chef",
    image: "/images/services/cooks.webp",
    imageAlt: {
      en: "Home cook preparing daily meals in a Pakistani kitchen",
      ur: "گھریلو باورچی پاکستانی باورچی خانے میں روزمرہ کھانا تیار کر رہا ہے",
    },
    name: { en: "Cooks", ur: "باورچی" },
    shortDesc: {
      en: "Home cooks for daily Pakistani, continental and family meals, on a monthly salary starting at PKR 35,000.",
      ur: "روزمرہ پاکستانی، کانٹیننٹل اور خاندانی کھانوں کے لیے گھریلو باورچی، ماہانہ تنخواہ 35,000 روپے سے شروع۔",
    },
    intro: {
      en: "A home cook handles your household's day-to-day meals, breakfast, lunch and dinner, prepared to your family's taste and dietary needs. RX Direct places experienced home cooks starting at PKR 35,000/month, background-checked and matched to your cuisine preferences, whether that's everyday desi cooking, continental dishes or diet-specific meals for elderly or unwell family members. Distinct from a professional chef, a home cook is the right fit for routine family meals rather than event catering or fine dining.",
      ur: "گھریلو باورچی آپ کے گھر کے روزمرہ کھانوں, ناشتہ، دوپہر اور رات کا کھانا, آپ کے خاندان کے ذائقے اور غذائی ضروریات کے مطابق تیار کرتا ہے۔ آر ایکس ڈائریکٹ 35,000 روپے ماہانہ سے شروع ہونے والے تجربہ کار گھریلو باورچی فراہم کرتا ہے، جو پس منظر کی جانچ کے ساتھ آپ کے کھانے کی ترجیحات سے میل کھاتے ہیں, چاہے وہ روزمرہ دیسی کھانا ہو، کانٹیننٹل ڈشز ہوں یا بزرگ یا بیمار افراد کے لیے مخصوص خوراک۔ پیشہ ور شیف کے برعکس، گھریلو باورچی معمول کے خاندانی کھانوں کے لیے موزوں ہے نہ کہ تقریبات کی کیٹرنگ یا فائن ڈائننگ کے لیے۔",
    },
    benefits: {
      en: [
        "Starting salary PKR 35,000/month, live-in or live-out",
        "Daily Pakistani, continental and family-style cooking",
        "Trial period before permanent hiring",
        "Hygiene and food-safety trained",
      ],
      ur: [
        "35,000 روپے ماہانہ سے شروع، لِیو اِن یا لِیو آؤٹ",
        "روزانہ پاکستانی، کانٹیننٹل اور خاندانی طرز کا کھانا",
        "مستقل تقرری سے پہلے آزمائشی مدت",
        "حفظانِ صحت اور فوڈ سیفٹی کی تربیت یافتہ",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer references",
        "In-person cooking skills interview",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات",
        "ذاتی طور پر کھانا پکانے کی مہارت کا انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "chefs",
    icon: "chef",
    image: "/images/services/cooks.webp",
    imageAlt: {
      en: "Professional chef preparing a meal for a household that entertains often",
      ur: "پیشہ ور شیف مہمان نوازی کرنے والے گھر کے لیے کھانا تیار کر رہا ہے",
    },
    name: { en: "Chefs", ur: "شیف" },
    shortDesc: {
      en: "Professional chefs for entertaining, events and elevated household dining, starting at PKR 50,000/month.",
      ur: "مہمان نوازی، تقریبات اور بلند معیار کے گھریلو کھانوں کے لیے پیشہ ور شیف، 50,000 روپے ماہانہ سے شروع۔",
    },
    intro: {
      en: "A professional chef brings a higher tier of culinary skill, ideal for households that entertain regularly, run a home-based catering setup, or simply want restaurant-quality meals every day. RX Direct places trained chefs starting at PKR 50,000/month with experience across Pakistani, continental, Chinese and fusion menus, multi-course planning and event-scale cooking. Every chef is interviewed, tested on practical skills and reference-checked before being shortlisted.",
      ur: "پیشہ ور شیف اعلیٰ درجے کی پکوان مہارت لاتا ہے، ان گھرانوں کے لیے مثالی جو باقاعدگی سے مہمان نوازی کرتے ہیں، گھر سے کیٹرنگ چلاتے ہیں، یا روزانہ ریستوران جیسے معیار کا کھانا چاہتے ہیں۔ آر ایکس ڈائریکٹ 50,000 روپے ماہانہ سے شروع ہونے والے تربیت یافتہ شیف فراہم کرتا ہے جو پاکستانی، کانٹیننٹل، چائنیز اور فیوژن مینیو، ملٹی کورس منصوبہ بندی اور تقریباتی سطح کے کھانا پکانے کا تجربہ رکھتے ہیں۔ ہر شیف کو منتخب کرنے سے پہلے انٹرویو، عملی مہارت کا امتحان اور حوالہ جات کی جانچ سے گزارا جاتا ہے۔",
    },
    benefits: {
      en: [
        "Starting salary PKR 50,000/month",
        "Experience with multi-course, event-scale and fusion menus",
        "Practical cooking skills test before shortlisting",
        "Suitable for households that entertain or host frequently",
      ],
      ur: [
        "50,000 روپے ماہانہ سے شروع",
        "ملٹی کورس، تقریباتی سطح اور فیوژن مینیو کا تجربہ",
        "منتخب ہونے سے پہلے عملی کھانا پکانے کی مہارت کا امتحان",
        "اکثر مہمان نوازی کرنے والے گھرانوں کے لیے موزوں",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer references",
        "Practical, in-person cooking skills test",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات",
        "عملی، ذاتی طور پر کھانا پکانے کی مہارت کا امتحان",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "drivers",
    icon: "driver",
    image: "/images/services/drivers.webp",
    imageAlt: {
      en: "Professional driver standing beside a car in Islamabad",
      ur: "پیشہ ور ڈرائیور اسلام آباد میں گاڑی کے ساتھ کھڑا ہے",
    },
    name: { en: "Drivers", ur: "ڈرائیورز" },
    shortDesc: {
      en: "Licensed, experienced family and corporate drivers who know the city routes.",
      ur: "لائسنس یافتہ اور تجربہ کار فیملی و کارپوریٹ ڈرائیورز جو شہر کے راستوں سے واقف ہیں۔",
    },
    intro: {
      en: "Our drivers hold valid licenses, have clean driving records and are familiar with local routes, traffic patterns and school-run schedules. Ideal for families needing daily school/office drop-offs or businesses needing dedicated corporate drivers.",
      ur: "ہمارے ڈرائیورز درست لائسنس رکھتے ہیں، ان کا ڈرائیونگ ریکارڈ صاف ہے اور وہ مقامی راستوں، ٹریفک کے انداز اور اسکول کے اوقات سے واقف ہیں۔ روزانہ اسکول/دفتر لانے لے جانے کی ضرورت رکھنے والے خاندانوں یا مخصوص کارپوریٹ ڈرائیور چاہنے والے کاروباروں کے لیے مثالی۔",
    },
    benefits: {
      en: [
        "Valid driving license verified",
        "Defensive driving experience",
        "Familiar with Islamabad & Rawalpindi routes",
        "Available for full-time or part-time schedules",
      ],
      ur: [
        "درست ڈرائیونگ لائسنس کی تصدیق شدہ",
        "محتاط ڈرائیونگ کا تجربہ",
        "اسلام آباد اور راولپنڈی کے راستوں سے واقفیت",
        "کل وقتی یا جز وقتی اوقات کے لیے دستیاب",
      ],
    },
    checks: {
      en: [
        "Driving license authenticity check",
        "Traffic violation history review",
        "CNIC & address verification",
        "Road test evaluation",
      ],
      ur: [
        "ڈرائیونگ لائسنس کی تصدیق",
        "ٹریفک خلاف ورزی کی تاریخ کا جائزہ",
        "شناختی کارڈ اور پتے کی تصدیق",
        "روڈ ٹیسٹ کا جائزہ",
      ],
    },
  },
  {
    slug: "maids",
    icon: "helper",
    image: "/images/services/helpers.webp",
    imageAlt: {
      en: "Maid organizing a living room in a Pakistani household",
      ur: "ملازمہ پاکستانی گھر میں بیٹھک کو ترتیب دے رہی ہے",
    },
    name: { en: "Maids", ur: "ملازمہ" },
    shortDesc: {
      en: "Full household maids for cleaning, laundry and daily upkeep, starting at PKR 40,000/month.",
      ur: "صفائی، کپڑے دھونے اور روزمرہ نگہداشت کے لیے مکمل گھریلو ملازمہ، 40,000 روپے ماہانہ سے شروع۔",
    },
    intro: {
      en: "A maid takes on the full spread of household upkeep, cleaning, laundry, ironing, bed-making and general tidying, so your home runs smoothly day to day. RX Direct places experienced maids starting at PKR 40,000/month, matched to your household's routine, language preference and live-in or live-out needs. Every maid is interviewed and reference-checked before being shortlisted, with a trial period before any long-term placement.",
      ur: "ملازمہ گھر کی مکمل دیکھ بھال, صفائی، کپڑے دھونا، استری، بستر بنانا اور عمومی ترتیب, سنبھالتی ہے تاکہ آپ کا گھر روزانہ ہموار طریقے سے چلے۔ آر ایکس ڈائریکٹ 40,000 روپے ماہانہ سے شروع ہونے والی تجربہ کار ملازمہ فراہم کرتا ہے، جو آپ کے گھر کے معمول، زبان کی ترجیح اور لِیو اِن یا لِیو آؤٹ ضروریات کے مطابق منتخب کی جاتی ہیں۔ ہر ملازمہ کو منتخب کرنے سے پہلے انٹرویو اور حوالہ جات کی جانچ سے گزارا جاتا ہے، طویل مدتی تقرری سے پہلے آزمائشی مدت کے ساتھ۔",
    },
    benefits: {
      en: [
        "Starting salary PKR 40,000/month",
        "Full household cleaning, laundry & upkeep",
        "Live-in or live-out options",
        "Matched to your household routine & language",
      ],
      ur: [
        "40,000 روپے ماہانہ سے شروع",
        "مکمل گھریلو صفائی، کپڑے دھونا اور دیکھ بھال",
        "لِیو اِن یا لِیو آؤٹ کے اختیارات",
        "آپ کے گھریلو معمول اور زبان کے مطابق انتخاب",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks from prior families",
        "Personal interview",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ خاندانوں سے حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "helpers",
    icon: "helper",
    image: "/images/services/helpers.webp",
    imageAlt: {
      en: "Kitchen helper assisting with household chores",
      ur: "کچن ہیلپر گھریلو کاموں میں مدد کر رہا ہے",
    },
    name: { en: "Helpers", ur: "ہیلپرز" },
    shortDesc: {
      en: "General & kitchen helpers for daily chores and support to your cook or maid, starting at PKR 25,000/month.",
      ur: "روزمرہ کاموں اور آپ کے باورچی یا ملازمہ کی مدد کے لیے عمومی اور کچن ہیلپرز، 25,000 روپے ماہانہ سے شروع۔",
    },
    intro: {
      en: "A helper supports the rest of your household staff or handles lighter daily chores on their own, dishwashing, kitchen prep, tidying, and running errands. Kitchen helpers specifically assist your cook with chopping, cleanup and prep work, ideal for busy households or when one cook alone can't keep up. RX Direct places helpers starting at PKR 25,000/month, background-checked and matched to your household's needs.",
      ur: "ہیلپر آپ کے باقی گھریلو عملے کی مدد کرتا ہے یا خود ہلکے روزمرہ کام سنبھالتا ہے, برتن دھونا، کچن کی تیاری، ترتیب دینا اور کام نبٹانا۔ کچن ہیلپر خاص طور پر آپ کے باورچی کی کاٹنے، صفائی اور تیاری کے کام میں مدد کرتا ہے، مصروف گھرانوں کے لیے مثالی یا جب اکیلا باورچی سنبھال نہ سکے۔ آر ایکس ڈائریکٹ 25,000 روپے ماہانہ سے شروع ہونے والے ہیلپرز فراہم کرتا ہے، پس منظر کی جانچ کے ساتھ آپ کے گھر کی ضروریات سے مطابقت رکھتے ہوئے۔",
    },
    benefits: {
      en: [
        "Starting salary PKR 25,000/month",
        "Kitchen prep, cleanup and general chore support",
        "Ideal alongside a cook, maid or larger household staff",
        "Live-in or live-out options",
      ],
      ur: [
        "25,000 روپے ماہانہ سے شروع",
        "کچن کی تیاری، صفائی اور عمومی کاموں میں مدد",
        "باورچی، ملازمہ یا بڑے گھریلو عملے کے ساتھ مثالی",
        "لِیو اِن یا لِیو آؤٹ کے اختیارات",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks from prior families",
        "Personal interview",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ خاندانوں سے حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "cleaners",
    icon: "cleaner",
    image: "/images/services/cleaners.webp",
    imageAlt: {
      en: "Cleaner wiping down a modern kitchen counter",
      ur: "صفائی کرنے والا جدید باورچی خانے کی سطح صاف کر رہا ہے",
    },
    name: { en: "Cleaners", ur: "صفائی کا عملہ" },
    shortDesc: {
      en: "Daily, weekly or deep-cleaning staff for homes, offices and short-term rentals.",
      ur: "گھروں، دفاتر اور مختصر مدتی کرائے کی جگہوں کے لیے روزانہ، ہفتہ وار یا گہری صفائی کا عملہ۔",
    },
    intro: {
      en: "Book flexible cleaning staff on a daily, weekly or one-time deep-cleaning basis. Popular with working families, offices and Airbnb/short-let hosts across Islamabad and Rawalpindi who need reliable, recurring cleaning support.",
      ur: "روزانہ، ہفتہ وار یا ایک بار گہری صفائی کی بنیاد پر لچکدار صفائی کا عملہ بک کریں۔ کام کرنے والے خاندانوں، دفاتر اور اسلام آباد و راولپنڈی میں مختصر مدتی کرائے کی جگہوں کے میزبانوں میں مقبول جنہیں قابلِ اعتماد اور تسلسل والی صفائی کی مدد درکار ہوتی ہے۔",
    },
    benefits: {
      en: [
        "Daily, weekly or one-time deep clean options",
        "Trained in modern cleaning equipment & products",
        "Available for homes, offices & short-lets",
        "Punctual, supervised scheduling",
      ],
      ur: [
        "روزانہ، ہفتہ وار یا ایک بار گہری صفائی کے اختیارات",
        "جدید صفائی کے آلات اور مصنوعات کی تربیت یافتہ",
        "گھروں، دفاتر اور مختصر مدتی جگہوں کے لیے دستیاب",
        "وقت کی پابندی اور زیرِ نگرانی شیڈولنگ",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks",
        "Personal interview",
        "Punctuality & reliability track record review",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
        "وقت کی پابندی اور بھروسے کے ریکارڈ کا جائزہ",
      ],
    },
  },
  {
    slug: "security-guards",
    icon: "guard",
    image: "/images/services/guards.webp",
    imageAlt: {
      en: "Security guard on duty at a residential gate",
      ur: "سیکیورٹی گارڈ رہائشی گیٹ پر ڈیوٹی پر موجود ہے",
    },
    name: { en: "Security Guards", ur: "سیکیورٹی گارڈز" },
    shortDesc: {
      en: "Trained, uniformed guards for homes, offices and gated communities.",
      ur: "گھروں، دفاتر اور محفوظ رہائشی کمیونٹیز کے لیے تربیت یافتہ اور یونیفارم میں گارڈز۔",
    },
    intro: {
      en: "Our security guards are trained in basic security protocols, access control and emergency response. Available for residential gates, office buildings, warehouses and gated communities on day, night or 24-hour shifts.",
      ur: "ہمارے سیکیورٹی گارڈز بنیادی سیکیورٹی طریقہ کار، رسائی کنٹرول اور ہنگامی ردعمل کی تربیت یافتہ ہیں۔ رہائشی گیٹس، دفتری عمارات، گوداموں اور محفوظ کمیونٹیز کے لیے دن، رات یا 24 گھنٹے کی شفٹوں پر دستیاب۔",
    },
    benefits: {
      en: [
        "Day, night & 24-hour shift options",
        "Uniformed and trained in basic security protocol",
        "Suitable for homes, offices & gated communities",
        "Physically fit, verified candidates",
      ],
      ur: [
        "دن، رات اور 24 گھنٹے کی شفٹ کے اختیارات",
        "یونیفارم میں اور بنیادی سیکیورٹی طریقہ کار کی تربیت یافتہ",
        "گھروں، دفاتر اور محفوظ کمیونٹیز کے لیے موزوں",
        "جسمانی طور پر فٹ اور تصدیق شدہ امیدوار",
      ],
    },
    checks: {
      en: [
        "CNIC & police character certificate",
        "Previous employer references",
        "Physical fitness check",
        "Basic security training verification",
      ],
      ur: [
        "شناختی کارڈ اور پولیس کریکٹر سرٹیفکیٹ",
        "سابقہ آجر کے حوالہ جات",
        "جسمانی فٹنس کی جانچ",
        "بنیادی سیکیورٹی تربیت کی تصدیق",
      ],
    },
  },
  {
    slug: "office-boys",
    icon: "officeBoy",
    image: "/images/services/office-boys.webp",
    imageAlt: {
      en: "Office boy serving tea in a corporate office setting",
      ur: "آفس بوائے دفتری ماحول میں چائے پیش کر رہا ہے",
    },
    name: { en: "Office Boys", ur: "آفس بوائے" },
    shortDesc: {
      en: "Reliable office support staff for pantry, errands and general office assistance.",
      ur: "پینٹری، کاموں اور عمومی دفتری معاونت کے لیے قابلِ اعتماد آفس معاون عملہ۔",
    },
    intro: {
      en: "Keep your office running smoothly with dependable office boys for pantry management, courier runs, filing support and general errands, placed and vetted for corporate offices, clinics and small businesses across major cities.",
      ur: "پینٹری کے انتظام، کوریئر کے کاموں، فائلنگ کی معاونت اور عمومی ذمہ داریوں کے لیے قابلِ اعتماد آفس بوائے کے ساتھ اپنے دفتر کو ہموار طریقے سے چلائیں, بڑے شہروں میں کارپوریٹ دفاتر، کلینکس اور چھوٹے کاروباروں کے لیے منتخب اور جانچے گئے۔",
    },
    benefits: {
      en: [
        "Punctual and presentable for corporate settings",
        "Trained in basic office etiquette",
        "Available full-time or part-time",
        "Suitable for offices, clinics & small businesses",
      ],
      ur: [
        "کارپوریٹ ماحول کے لیے وقت کے پابند اور خوش لباس",
        "بنیادی دفتری آداب کی تربیت یافتہ",
        "کل وقتی یا جز وقتی دستیاب",
        "دفاتر، کلینکس اور چھوٹے کاروباروں کے لیے موزوں",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer references",
        "Personal interview",
        "Punctuality track record review",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات",
        "ذاتی انٹرویو",
        "وقت کی پابندی کے ریکارڈ کا جائزہ",
      ],
    },
  },
  {
    slug: "babysitters-nannies",
    icon: "nanny",
    image: "/images/services/nannies.webp",
    imageAlt: {
      en: "Nanny caring for a young child at home",
      ur: "آیا گھر میں چھوٹے بچے کی دیکھ بھال کر رہی ہے",
    },
    name: { en: "Babysitters & Nannies", ur: "آیا و بے بی سٹر" },
    shortDesc: {
      en: "Caring, experienced nannies and babysitters for infants, toddlers and school-age kids.",
      ur: "شیرخوار، چھوٹے بچوں اور اسکول جانے والے بچوں کے لیے مہربان اور تجربہ کار آیا و بے بی سٹر۔",
    },
    intro: {
      en: "Our nannies and babysitters are experienced with newborns, toddlers and school-age children, and can support with feeding, homework, play and daily routines, whether you need full-time childcare or occasional evening babysitting.",
      ur: "ہماری آیا اور بے بی سٹرز نوزائیدہ بچوں، چھوٹے بچوں اور اسکول جانے والے بچوں کا تجربہ رکھتی ہیں، اور کھانا کھلانے، ہوم ورک، کھیل اور روزمرہ معمولات میں مدد کر سکتی ہیں, چاہے آپ کو کل وقتی چائلڈ کیئر درکار ہو یا کبھی کبھار شام کی بے بی سٹنگ۔",
    },
    benefits: {
      en: [
        "Experience with infants, toddlers & school-age kids",
        "First-aid awareness preferred",
        "Full-time, part-time or occasional booking",
        "Warm, patient, family-oriented candidates",
      ],
      ur: [
        "شیرخوار، چھوٹے اور اسکول جانے والے بچوں کا تجربہ",
        "ابتدائی طبی امداد کی آگاہی کو ترجیح",
        "کل وقتی، جز وقتی یا کبھی کبھار بکنگ",
        "مہربان، صابر اور خاندان دوست امیدوار",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks from prior families",
        "In-depth personal interview",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ خاندانوں سے حوالہ جات کی جانچ",
        "تفصیلی ذاتی انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "gardeners",
    icon: "gardener",
    image: "/images/services/gardeners.webp",
    imageAlt: {
      en: "Gardener trimming plants in a residential lawn",
      ur: "مالی رہائشی لان میں پودوں کی تراش خراش کر رہا ہے",
    },
    name: { en: "Gardeners", ur: "مالی" },
    shortDesc: {
      en: "Skilled gardeners (mali) for lawn care, plant maintenance and seasonal upkeep.",
      ur: "لان کی دیکھ بھال، پودوں کی نگہداشت اور موسمی خیال رکھنے کے لیے ماہر مالی۔",
    },
    intro: {
      en: "From routine lawn mowing to seasonal planting and landscaping upkeep, our gardeners keep residential and commercial outdoor spaces looking their best year-round, available on daily, weekly or visit-based schedules.",
      ur: "معمول کی گھاس کاٹنے سے لے کر موسمی پودے لگانے اور لینڈ اسکیپنگ کی دیکھ بھال تک، ہمارے مالی رہائشی اور تجارتی بیرونی جگہوں کو سال بھر بہترین رکھتے ہیں، جو روزانہ، ہفتہ وار یا وزٹ کی بنیاد پر دستیاب ہیں۔",
    },
    benefits: {
      en: [
        "Daily, weekly or visit-based scheduling",
        "Experience with lawns, seasonal plants & landscaping",
        "Own basic gardening tools",
        "Suitable for homes, offices & community spaces",
      ],
      ur: [
        "روزانہ، ہفتہ وار یا وزٹ کی بنیاد پر شیڈولنگ",
        "لان، موسمی پودوں اور لینڈ اسکیپنگ کا تجربہ",
        "بنیادی باغبانی کے آلات خود رکھتے ہیں",
        "گھروں، دفاتر اور کمیونٹی جگہوں کے لیے موزوں",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks",
        "Personal interview",
        "Skill assessment",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
        "مہارت کا جائزہ",
      ],
    },
  },
  {
    slug: "nurses",
    icon: "nurse",
    image: "/images/services/nurses.webp",
    imageAlt: {
      en: "Home care nurse assisting an elderly patient",
      ur: "ہوم کیئر نرس ایک بزرگ مریض کی مدد کر رہی ہے",
    },
    name: { en: "Nurses", ur: "نرسیں" },
    shortDesc: {
      en: "Qualified home nurses for post-surgery recovery, elderly care and ongoing medical support.",
      ur: "سرجری کے بعد کی دیکھ بھال، بزرگوں کی نگہداشت اور مسلسل طبی معاونت کے لیے قابل ہوم نرسیں۔",
    },
    intro: {
      en: "Whether you need round-the-clock nursing after a hospital discharge, ongoing support for a chronic condition, or elderly care at home, we place qualified nurses experienced in vitals monitoring, medication schedules, wound care and mobility assistance. Every placement is matched to the specific medical needs you describe.",
      ur: "چاہے آپ کو ہسپتال سے فارغ ہونے کے بعد چوبیس گھنٹے نرسنگ کی ضرورت ہو، کسی دائمی بیماری کے لیے مسلسل معاونت، یا گھر پر بزرگوں کی دیکھ بھال, ہم قابل نرسیں فراہم کرتے ہیں جو وائٹلز کی نگرانی، ادویات کے شیڈول، زخموں کی دیکھ بھال اور نقل و حرکت میں مدد کا تجربہ رکھتی ہیں۔ ہر تقرری آپ کی بیان کردہ مخصوص طبی ضروریات سے میل کھاتی ہے۔",
    },
    benefits: {
      en: [
        "Day, night or 24-hour shift coverage",
        "Experience with post-surgery and elderly care",
        "Comfortable with medication schedules and vitals monitoring",
        "Live-in or live-out arrangements available",
      ],
      ur: [
        "دن، رات یا چوبیس گھنٹے شفٹ کوریج",
        "سرجری کے بعد اور بزرگوں کی دیکھ بھال کا تجربہ",
        "ادویات کے شیڈول اور وائٹلز کی نگرانی میں ماہر",
        "لِیو اِن یا لِیو آؤٹ دونوں انتظامات دستیاب",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Nursing qualification verification",
        "Reference checks with previous employers",
        "In-person interview",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "نرسنگ قابلیت کی تصدیق",
        "سابقہ آجر کے حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
      ],
    },
  },
  {
    slug: "caretakers",
    icon: "caretaker",
    image: "/images/services/caretakers.webp",
    imageAlt: {
      en: "Caretaker assisting an elderly person at home",
      ur: "دیکھ بھال کرنے والا گھر میں ایک بزرگ شخص کی مدد کر رہا ہے",
    },
    name: { en: "Caretakers", ur: "نگہداشت کار" },
    shortDesc: {
      en: "Companion caretakers for elderly or unwell family members, daily support, mobility help and company.",
      ur: "بزرگ یا بیمار خاندان کے افراد کے لیے ہمراہی نگہداشت کار, روزانہ معاونت، نقل و حرکت میں مدد اور ساتھ۔",
    },
    intro: {
      en: "Not every situation needs a medical nurse, sometimes what a family needs most is a patient, reliable caretaker who can help an elderly or unwell family member with daily routines, mobility, meals and company. We match caretakers to your family member's specific needs and personality, not just a generic profile.",
      ur: "ہر صورتحال میں طبی نرس کی ضرورت نہیں ہوتی, کبھی کبھی خاندان کو سب سے زیادہ ایک صبر والے، قابلِ اعتماد نگہداشت کار کی ضرورت ہوتی ہے جو بزرگ یا بیمار خاندان کے فرد کی روزمرہ معمولات، نقل و حرکت، کھانوں اور ساتھ میں مدد کر سکے۔ ہم نگہداشت کاروں کو آپ کے خاندان کے فرد کی مخصوص ضروریات اور شخصیت سے میل کھاتے ہیں، نہ کہ محض ایک عمومی پروفائل سے۔",
    },
    benefits: {
      en: [
        "Daily companionship and routine support",
        "Mobility and daily-living assistance",
        "Live-in or day-shift arrangements",
        "Matched to your family member's specific needs",
      ],
      ur: [
        "روزانہ ساتھ اور معمولات میں معاونت",
        "نقل و حرکت اور روزمرہ زندگی میں مدد",
        "لِیو اِن یا دن کی شفٹ کے انتظامات",
        "آپ کے خاندان کے فرد کی مخصوص ضروریات سے مطابقت",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Reference checks with previous employers",
        "In-person interview",
        "Health screening",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات کی جانچ",
        "ذاتی انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "couples",
    icon: "couple",
    image: "/images/services/couples.webp",
    imageAlt: {
      en: "Domestic couple placed together in a household",
      ur: "ایک گھریلو جوڑا مل کر گھر میں تعینات",
    },
    name: { en: "Domestic Couples", ur: "گھریلو جوڑے" },
    shortDesc: {
      en: "Husband-and-wife staff pairs, typically cook plus helper or driver plus helper, placed together.",
      ur: "میاں بیوی پر مشتمل عملہ, عموماً باورچی اور ہیلپر یا ڈرائیور اور ہیلپر, ایک ساتھ تعینات۔",
    },
    intro: {
      en: "Many households prefer hiring a married couple together rather than two unrelated staff members, commonly a cook paired with a helper, or a driver paired with a helper, sharing live-in accommodation. Couples are verified and interviewed together, and we match their combined skills to your household's actual needs.",
      ur: "بہت سے گھرانے دو غیر متعلقہ عملے کے بجائے ایک شادی شدہ جوڑے کو اکٹھا رکھنا پسند کرتے ہیں, عموماً باورچی کے ساتھ ہیلپر، یا ڈرائیور کے ساتھ ہیلپر، جو رہائش بھی مشترکہ رکھتے ہیں۔ جوڑوں کی تصدیق اور انٹرویو اکٹھے کیا جاتا ہے، اور ہم ان کی مشترکہ مہارتوں کو آپ کے گھر کی حقیقی ضروریات سے ملاتے ہیں۔",
    },
    benefits: {
      en: [
        "Shared live-in accommodation, simpler for households to manage",
        "Common pairings: cook + helper, or driver + helper",
        "Both individuals verified and interviewed",
        "Continuity, a couple is less likely to leave together than two unrelated hires separately",
      ],
      ur: [
        "مشترکہ رہائش، گھرانوں کے لیے سنبھالنا آسان",
        "عام جوڑ: باورچی + ہیلپر، یا ڈرائیور + ہیلپر",
        "دونوں افراد کی تصدیق اور انٹرویو",
        "تسلسل, ایک جوڑے کے ایک ساتھ چھوڑنے کا امکان دو غیر متعلقہ ملازمین سے کم ہوتا ہے",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification for both individuals",
        "Reference checks with previous employers",
        "Joint interview",
        "Health screening",
      ],
      ur: [
        "دونوں افراد کی شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات کی جانچ",
        "مشترکہ انٹرویو",
        "صحت کی جانچ",
      ],
    },
  },
  {
    slug: "batman",
    icon: "batman",
    image: "/images/services/office-boys.webp",
    imageAlt: {
      en: "Personal attendant (batman) assisting with daily household tasks",
      ur: "ذاتی معاون (بیٹ مین) روزمرہ گھریلو کاموں میں مدد کر رہا ہے",
    },
    name: { en: "Batman (Personal Attendant)", ur: "بیٹ مین (ذاتی معاون)" },
    shortDesc: {
      en: "A dedicated personal attendant (batman/NCB) for daily errands, packing, scheduling and personal support, starting at PKR 35,000/month.",
      ur: "روزمرہ کاموں، سامان کی تیاری، شیڈولنگ اور ذاتی معاونت کے لیے مخصوص ذاتی معاون (بیٹ مین/این سی بی)، 35,000 روپے ماہانہ سے شروع۔",
    },
    intro: {
      en: "A batman, sometimes referred to as an NCB (non-combatant batman) in military and officer households, is a dedicated personal attendant who manages the day-to-day needs of the person they serve: laying out and caring for clothes, packing for travel, running errands, keeping personal spaces organized and assisting with schedules. It's a role common in officers' and executive households across Pakistan, distinct from a general household helper because the focus is on one individual's personal routine rather than the whole home. RX Direct places disciplined, reliable batmen starting at PKR 35,000/month, background-checked and reference-verified before placement.",
      ur: "بیٹ مین، جسے فوجی اور افسر گھرانوں میں کبھی کبھی این سی بی (نان کمبیٹنٹ بیٹ مین) کہا جاتا ہے، ایک مخصوص ذاتی معاون ہے جو اپنے آجر کی روزمرہ ضروریات سنبھالتا ہے: کپڑوں کی ترتیب و دیکھ بھال، سفر کے لیے سامان کی تیاری، کام نبٹانا، ذاتی جگہوں کو منظم رکھنا اور شیڈول میں مدد۔ یہ کردار پاکستان بھر کے افسروں اور ایگزیکٹو گھرانوں میں عام ہے، عمومی گھریلو ہیلپر سے مختلف کیونکہ توجہ پورے گھر کے بجائے ایک فرد کے ذاتی معمول پر مرکوز ہوتی ہے۔ آر ایکس ڈائریکٹ 35,000 روپے ماہانہ سے شروع ہونے والے نظم و ضبط والے، قابلِ اعتماد بیٹ مین فراہم کرتا ہے، تقرری سے پہلے پس منظر کی جانچ اور حوالہ جات کی تصدیق کے ساتھ۔",
    },
    benefits: {
      en: [
        "Starting salary PKR 35,000/month",
        "Dedicated one-on-one personal support, not shared household duties",
        "Experience with travel packing, errands and schedule management",
        "Disciplined, presentable and reliable candidates",
      ],
      ur: [
        "35,000 روپے ماہانہ سے شروع",
        "مخصوص ذاتی معاونت، مشترکہ گھریلو ذمہ داریوں کے بجائے",
        "سفر کی تیاری، کاموں اور شیڈول کے انتظام کا تجربہ",
        "نظم و ضبط، خوش لباس اور قابلِ اعتماد امیدوار",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer references",
        "Personal interview",
        "Background & character check",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر کے حوالہ جات",
        "ذاتی انٹرویو",
        "پس منظر اور کردار کی جانچ",
      ],
    },
  },
  {
    slug: "electricians",
    icon: "electrician",
    image: "/images/services/electricians.webp",
    imageAlt: {
      en: "Electrician repairing household wiring in Pakistan",
      ur: "پاکستان میں الیکٹریشن گھریلو وائرنگ کی مرمت کر رہا ہے",
    },
    name: { en: "Electricians", ur: "الیکٹریشن" },
    shortDesc: {
      en: "Licensed household and office electricians for wiring, repairs, installations and urgent fault fixes.",
      ur: "وائرنگ، مرمت، تنصیب اور فوری خرابی کے حل کے لیے تجربہ کار گھریلو اور دفتری الیکٹریشن۔",
    },
    intro: {
      en: "Whether you need a one-time repair, a full rewiring job, or an on-call electrician for recurring maintenance, RX Direct places experienced electricians who handle household and office wiring, fixture installation, breaker and fuse issues, and urgent fault fixes safely. Every electrician is interviewed and reference-checked before being shortlisted, and can be hired for a single visit or an ongoing arrangement.",
      ur: "چاہے آپ کو یک بار مرمت درکار ہو، مکمل وائرنگ کا کام، یا بار بار دیکھ بھال کے لیے آن کال الیکٹریشن، آر ایکس ڈائریکٹ تجربہ کار الیکٹریشن فراہم کرتا ہے جو گھریلو اور دفتری وائرنگ، فکسچر کی تنصیب، بریکر اور فیوز کے مسائل، اور فوری خرابیوں کو محفوظ طریقے سے حل کرتے ہیں۔ ہر الیکٹریشن کو منتخب کرنے سے پہلے انٹرویو اور حوالہ جات کی جانچ سے گزارا جاتا ہے، اور اسے ایک وزٹ یا مسلسل انتظام کے لیے رکھا جا سکتا ہے۔",
    },
    benefits: {
      en: [
        "One-time repair or ongoing maintenance arrangements",
        "Experience with household and office wiring systems",
        "Own tools and safety equipment",
        "Available for urgent, same-day fault fixes",
      ],
      ur: [
        "یک بار مرمت یا مسلسل دیکھ بھال کے انتظامات",
        "گھریلو اور دفتری وائرنگ سسٹمز کا تجربہ",
        "اپنے اوزار اور حفاظتی سامان",
        "فوری، اسی دن کی خرابیوں کے حل کے لیے دستیاب",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer and client references",
        "Practical skills assessment",
        "Tool and safety-equipment check",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر اور کلائنٹ کے حوالہ جات",
        "عملی مہارت کی جانچ",
        "اوزار اور حفاظتی سامان کی جانچ",
      ],
    },
  },
  {
    slug: "plumbers",
    icon: "plumber",
    image: "/images/services/plumbers.webp",
    imageAlt: {
      en: "Plumber fixing a pipe in a Pakistani home",
      ur: "ایک پاکستانی گھر میں پلمبر پائپ کی مرمت کر رہا ہے",
    },
    name: { en: "Plumbers", ur: "پلمبر" },
    shortDesc: {
      en: "Experienced plumbers for leak repairs, fixture installation, drainage issues and bathroom or kitchen plumbing work.",
      ur: "لیکیج کی مرمت، فکسچر کی تنصیب، نکاسی آب کے مسائل اور باتھ روم یا کچن کے پلمبنگ کام کے لیے تجربہ کار پلمبر۔",
    },
    intro: {
      en: "From a leaking tap to a full bathroom re-plumb, RX Direct places experienced plumbers who handle repairs, fixture installation, drainage and water-tank issues across households and offices. Every plumber is interviewed and reference-checked before being shortlisted, and can be booked for a single job or a recurring maintenance arrangement.",
      ur: "ایک ٹپکتے ہوئے نل سے لے کر باتھ روم کی مکمل پلمبنگ تک، آر ایکس ڈائریکٹ تجربہ کار پلمبر فراہم کرتا ہے جو گھروں اور دفاتر میں مرمت، فکسچر کی تنصیب، نکاسی آب اور پانی کے ٹینک کے مسائل حل کرتے ہیں۔ ہر پلمبر کو منتخب کرنے سے پہلے انٹرویو اور حوالہ جات کی جانچ سے گزارا جاتا ہے، اور اسے ایک کام یا مسلسل دیکھ بھال کے انتظام کے لیے رکھا جا سکتا ہے۔",
    },
    benefits: {
      en: [
        "One-time repair or ongoing maintenance arrangements",
        "Experience with bathroom, kitchen and water-tank plumbing",
        "Own tools and standard fittings on hand",
        "Available for urgent leak and blockage callouts",
      ],
      ur: [
        "یک بار مرمت یا مسلسل دیکھ بھال کے انتظامات",
        "باتھ روم، کچن اور واٹر ٹینک پلمبنگ کا تجربہ",
        "اپنے اوزار اور معیاری فٹنگز ہمراہ",
        "فوری لیکیج اور بلاکیج کالز کے لیے دستیاب",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer and client references",
        "Practical skills assessment",
        "Tool and equipment check",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر اور کلائنٹ کے حوالہ جات",
        "عملی مہارت کی جانچ",
        "اوزار اور سامان کی جانچ",
      ],
    },
  },
  {
    slug: "carpenters",
    icon: "carpenter",
    image: "/images/services/carpenters.webp",
    imageAlt: {
      en: "Carpenter working on wooden furniture in a Pakistani home",
      ur: "پاکستانی گھر میں ایک بڑھئی لکڑی کے فرنیچر پر کام کر رہا ہے",
    },
    name: { en: "Carpenters", ur: "بڑھئی" },
    shortDesc: {
      en: "Skilled carpenters for furniture repair, custom woodwork, door and window fittings, and cabinetry.",
      ur: "فرنیچر کی مرمت، حسبِ ضرورت لکڑی کا کام، دروازے اور کھڑکیوں کی فٹنگ، اور کیبنٹری کے لیے ماہر بڑھئی۔",
    },
    intro: {
      en: "Whether it's a broken cabinet hinge, a custom wardrobe, or door and window repairs, RX Direct places skilled carpenters experienced in household and office woodwork. Every carpenter is interviewed and reference-checked before being shortlisted, and can be booked for a single project or ongoing maintenance work.",
      ur: "چاہے وہ کیبنٹ کا ٹوٹا ہوا قبضہ ہو، حسبِ ضرورت الماری، یا دروازے اور کھڑکیوں کی مرمت، آر ایکس ڈائریکٹ ماہر بڑھئی فراہم کرتا ہے جو گھریلو اور دفتری لکڑی کے کام کا تجربہ رکھتے ہیں۔ ہر بڑھئی کو منتخب کرنے سے پہلے انٹرویو اور حوالہ جات کی جانچ سے گزارا جاتا ہے، اور اسے ایک پروجیکٹ یا مسلسل دیکھ بھال کے کام کے لیے رکھا جا سکتا ہے۔",
    },
    benefits: {
      en: [
        "One-time project or ongoing maintenance arrangements",
        "Experience with furniture, cabinetry and door/window fittings",
        "Custom woodwork on request",
        "Own tools and equipment",
      ],
      ur: [
        "یک بار پروجیکٹ یا مسلسل دیکھ بھال کے انتظامات",
        "فرنیچر، کیبنٹری اور دروازے/کھڑکی کی فٹنگز کا تجربہ",
        "درخواست پر حسبِ ضرورت لکڑی کا کام",
        "اپنے اوزار اور سامان",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer and client references",
        "Practical skills assessment",
        "Tool and equipment check",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر اور کلائنٹ کے حوالہ جات",
        "عملی مہارت کی جانچ",
        "اوزار اور سامان کی جانچ",
      ],
    },
  },
  {
    slug: "painters",
    icon: "painter",
    image: "/images/services/painters.webp",
    imageAlt: {
      en: "Painter painting an interior wall in a Pakistani home",
      ur: "پاکستانی گھر میں ایک پینٹر اندرونی دیوار پر رنگ کر رہا ہے",
    },
    name: { en: "Painters", ur: "پینٹر" },
    shortDesc: {
      en: "Experienced painters for interior and exterior painting, touch-ups, and full house or office repainting.",
      ur: "اندرونی اور بیرونی پینٹنگ، ٹچ اپس، اور مکمل گھر یا دفتر کی دوبارہ پینٹنگ کے لیے تجربہ کار پینٹر۔",
    },
    intro: {
      en: "From a single-room touch-up to a full house repaint, RX Direct places experienced painters who handle interior and exterior work, wall preparation and finishing across households and offices. Every painter is interviewed and reference-checked before being shortlisted, and can be booked for a single job or a larger multi-day project.",
      ur: "ایک کمرے کی ٹچ اپ سے لے کر مکمل گھر کی دوبارہ پینٹنگ تک، آر ایکس ڈائریکٹ تجربہ کار پینٹر فراہم کرتا ہے جو گھروں اور دفاتر میں اندرونی اور بیرونی کام، دیوار کی تیاری اور فنشنگ کرتے ہیں۔ ہر پینٹر کو منتخب کرنے سے پہلے انٹرویو اور حوالہ جات کی جانچ سے گزارا جاتا ہے، اور اسے ایک کام یا کئی دنوں کے بڑے پروجیکٹ کے لیے رکھا جا سکتا ہے۔",
    },
    benefits: {
      en: [
        "Single-room touch-ups or full house/office repaints",
        "Experience with interior and exterior finishes",
        "Wall preparation and surface repair included",
        "Own tools, drop sheets and safety equipment",
      ],
      ur: [
        "ایک کمرے کی ٹچ اپ یا مکمل گھر/دفتر کی دوبارہ پینٹنگ",
        "اندرونی اور بیرونی فنشز کا تجربہ",
        "دیوار کی تیاری اور سطح کی مرمت شامل",
        "اپنے اوزار، ڈراپ شیٹس اور حفاظتی سامان",
      ],
    },
    checks: {
      en: [
        "CNIC & address verification",
        "Previous employer and client references",
        "Practical skills assessment",
        "Tool and equipment check",
      ],
      ur: [
        "شناختی کارڈ اور پتے کی تصدیق",
        "سابقہ آجر اور کلائنٹ کے حوالہ جات",
        "عملی مہارت کی جانچ",
        "اوزار اور سامان کی جانچ",
      ],
    },
  },
];

export const services: ServiceCategory[] = rawServices.map((s) => {
  const override = getServiceImageOverride(s.slug);
  if (!override) return s;
  return {
    ...s,
    image: override.image?.trim() || s.image,
    imageAlt: override.alt?.trim()
      ? { ...s.imageAlt, en: override.alt.trim() }
      : s.imageAlt,
  };
});

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
