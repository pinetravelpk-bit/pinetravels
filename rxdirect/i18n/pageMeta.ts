// Titles and descriptions for the Urdu (/urdu) and Roman Urdu (/roman-urdu)
// versions of the main pages.
type Meta = { title: string; description: string };
type Lang = "ur" | "roman";

export const LOCALIZED_META: Record<string, Record<Lang, Meta>> = {
  "/": {
    ur: {
      title: "آر ایکس ڈائریکٹ | پاکستان میں تصدیق شدہ گھریلو عملہ",
      description:
        "باورچی، ڈرائیور، ملازمہ، نینی، نرس، گارڈ اور آفس بوائے، شناختی کارڈ اور حوالہ جات کی جانچ کے بعد۔ اسلام آباد، راولپنڈی، لاہور اور کراچی میں 24 سے 48 گھنٹے میں فہرست۔",
    },
    roman: {
      title: "RX Direct | Pakistan mein verified gharelu staff",
      description:
        "Cook, driver, maid, nanny, nurse, guard aur office boy, CNIC aur references check karne ke baad. Islamabad, Rawalpindi, Lahore aur Karachi mein 24 se 48 ghante mein shortlist.",
    },
  },
  "/hire-staff": {
    ur: {
      title: "عملہ رکھیں | تصدیق شدہ گھریلو عملے کی درخواست | آر ایکس ڈائریکٹ",
      description:
        "پاکستان میں تصدیق شدہ گھریلو عملہ حاصل کریں: باورچی، ڈرائیور، ملازمہ، نینی، گارڈ اور مزید۔ اپنی ضرورت بھیجیں اور 24 سے 48 گھنٹے میں جانچ شدہ فہرست پائیں۔",
    },
    roman: {
      title: "Staff hire karein | Verified gharelu staff ki request | RX Direct",
      description:
        "Pakistan mein verified gharelu staff hasil karein: cook, driver, maid, nanny, guard aur mazeed. Apni zaroorat bhejein aur 24 se 48 ghante mein checked shortlist payein.",
    },
  },
  "/services": {
    ur: {
      title: "گھریلو عملے کی خدمات | آر ایکس ڈائریکٹ",
      description:
        "آر ایکس ڈائریکٹ کی تمام خدمات: باورچی، ڈرائیور، ملازمہ، صفائی کا عملہ، سیکیورٹی گارڈ، آفس بوائے، نینی، مالی، نرس اور مستری، پورے پاکستان میں تصدیق شدہ۔",
    },
    roman: {
      title: "Gharelu staff ki services | RX Direct",
      description:
        "RX Direct ki tamam services: cook, driver, maid, cleaner, security guard, office boy, nanny, mali, nurse aur mistri, poore Pakistan mein verified.",
    },
  },
  "/cities": {
    ur: {
      title: "جن شہروں میں ہم کام کرتے ہیں | آر ایکس ڈائریکٹ",
      description:
        "آر ایکس ڈائریکٹ اسلام آباد، راولپنڈی، لاہور، کراچی، فیصل آباد، ملتان، پشاور اور گوجرانوالہ میں تصدیق شدہ گھریلو عملہ فراہم کرتا ہے۔",
    },
    roman: {
      title: "Jin shehron mein hum kaam karte hain | RX Direct",
      description:
        "RX Direct Islamabad, Rawalpindi, Lahore, Karachi, Faisalabad, Multan, Peshawar aur Gujranwala mein verified gharelu staff faraham karta hai.",
    },
  },
  "/contact": {
    ur: {
      title: "رابطہ کریں | آر ایکس ڈائریکٹ",
      description:
        "تصدیق شدہ گھریلو عملہ رکھنے کے لیے آر ایکس ڈائریکٹ سے رابطہ کریں۔ واٹس ایپ، کال یا پیغام بھیجیں، یا راولپنڈی چاندنی چوک میں ہمارے دفتر آئیں۔",
    },
    roman: {
      title: "Rabta karein | RX Direct",
      description:
        "Verified gharelu staff rakhne ke liye RX Direct se rabta karein. WhatsApp, call ya message karein, ya Chandni Chowk Rawalpindi mein hamare office aayein.",
    },
  },
  "/about": {
    ur: {
      title: "ہمارے بارے میں | ایس ای سی پی رجسٹرڈ کمپنی | آر ایکس ڈائریکٹ",
      description:
        "آر ایکس ڈائریکٹ ایک ایس ای سی پی رجسٹرڈ کمپنی ہے جو 2018 سے پاکستان کے بڑے شہروں میں تصدیق شدہ گھریلو عملہ فراہم کر رہی ہے۔",
    },
    roman: {
      title: "Hamare baare mein | SECP registered company | RX Direct",
      description:
        "RX Direct ek SECP registered company hai jo 2018 se Pakistan ke bare shehron mein verified gharelu staff faraham kar rahi hai.",
    },
  },
  "/how-it-works": {
    ur: {
      title: "طریقہ کار | آر ایکس ڈائریکٹ",
      description:
        "آر ایکس ڈائریکٹ کیسے کام کرتا ہے: آپ کے پہلے واٹس ایپ پیغام سے لے کر نئے عملے کے پہلے دن تک، اور نوکری کے خواہشمند ہمارے ساتھ کیسے رجسٹر ہوں۔",
    },
    roman: {
      title: "Tareeqa kaar | RX Direct",
      description:
        "RX Direct kaise kaam karta hai: aap ke pehle WhatsApp message se le kar naye staff ke pehle din tak, aur naukri dhoondne wale hamare saath kaise register hon.",
    },
  },
  "/faqs": {
    ur: {
      title: "عام سوالات | آر ایکس ڈائریکٹ",
      description:
        "آر ایکس ڈائریکٹ کے ذریعے گھریلو عملہ رکھنے کے بارے میں عام سوالات: وقت، جانچ پڑتال، فیس اور 6 ماہ کی تبدیلی کی ضمانت۔",
    },
    roman: {
      title: "Aam sawalat | RX Direct",
      description:
        "RX Direct ke zariye gharelu staff rakhne ke baare mein aam sawalat: waqt, verification, fee aur 6 maah ki replacement guarantee.",
    },
  },
  "/jobs": {
    ur: {
      title: "گھریلو عملے کی نوکریاں | آر ایکس ڈائریکٹ",
      description:
        "باورچی، ڈرائیور، ملازمہ، ہیلپر، نرس، گارڈ اور مستری کی نوکریاں۔ اپلائی کریں اور آر ایکس ڈائریکٹ کے ذریعے اچھے گھروں میں کام پائیں، کوئی فیس نہیں۔",
    },
    roman: {
      title: "Gharelu staff ki naukriyan | RX Direct",
      description:
        "Cook, driver, maid, helper, nurse, guard aur mistri ki naukriyan. Apply karein aur RX Direct ke zariye ache gharon mein kaam payein, koi fee nahi.",
    },
  },
  "/pricing": {
    ur: {
      title: "تنخواہ اور فیس کیسے طے ہوتی ہے | آر ایکس ڈائریکٹ",
      description:
        "گھریلو عملے کی تنخواہ کیسے طے ہوتی ہے، اور آر ایکس ڈائریکٹ کی پلیسمنٹ فیس کیسے لگتی ہے۔ کوئی چھپی ہوئی فیس نہیں۔",
    },
    roman: {
      title: "Tankhwah aur fee kaise tay hoti hai | RX Direct",
      description:
        "Gharelu staff ki tankhwah kaise tay hoti hai, aur RX Direct ki placement fee kaise lagti hai. Koi chhupi hui fee nahi.",
    },
  },
};

export function serviceMeta(name: string, shortDesc: string, locale: Lang): Meta {
  return locale === "ur"
    ? {
        title: `${name} رکھیں | اسلام آباد، راولپنڈی اور پاکستان | آر ایکس ڈائریکٹ`,
        description: `${shortDesc} اسلام آباد، راولپنڈی، لاہور اور کراچی میں تصدیق شدہ عملہ دستیاب ہے۔`,
      }
    : {
        title: `${name} hire karein | Islamabad, Rawalpindi aur Pakistan | RX Direct`,
        description: `${shortDesc} Islamabad, Rawalpindi, Lahore aur Karachi mein verified staff dastiyab hai.`,
      };
}

export function cityMeta(name: string, shortDesc: string, locale: Lang): Meta {
  return locale === "ur"
    ? {
        title: `${name} میں گھریلو عملہ | باورچی، ڈرائیور، ملازمہ | آر ایکس ڈائریکٹ`,
        description: `${shortDesc} ${name} میں باورچی، ڈرائیور، ملازمہ، صفائی کا عملہ، گارڈ اور آفس بوائے، جانچ کے بعد۔`,
      }
    : {
        title: `${name} mein gharelu staff | Cook, driver, maid | RX Direct`,
        description: `${shortDesc} ${name} mein cook, driver, maid, cleaner, guard aur office boy, verification ke baad.`,
      };
}
