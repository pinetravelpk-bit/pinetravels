export interface Testimonial {
  name: string;
  city: { en: string; ur: string };
  role: { en: string; ur: string };
  quote: { en: string; ur: string };
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Malik",
    city: { en: "Islamabad", ur: "اسلام آباد" },
    role: { en: "Hired a cook & helper", ur: "باورچی اور ہیلپر رکھی" },
    quote: {
      en: "RX Direct found us a wonderful cook within two days. The verification process gave us real peace of mind, highly recommended for any family in Islamabad.",
      ur: "آر ایکس ڈائریکٹ نے دو دن کے اندر ہمیں ایک بہترین باورچی فراہم کیا۔ تصدیقی عمل نے ہمیں حقیقی اطمینان دیا, اسلام آباد کے کسی بھی خاندان کے لیے انتہائی تجویز کردہ۔",
    },
    avatar: "/images/testimonials/ayesha.webp",
    rating: 5,
  },
  {
    name: "Hamza Sheikh",
    city: { en: "Rawalpindi", ur: "راولپنڈی" },
    role: { en: "Hired a driver", ur: "ڈرائیور رکھا" },
    quote: {
      en: "Professional from the first WhatsApp message to the driver's first day. Our driver is punctual, polite and knows Rawalpindi's routes better than we do.",
      ur: "پہلے واٹس ایپ پیغام سے لے کر ڈرائیور کے پہلے دن تک پیشہ ورانہ خدمت۔ ہمارا ڈرائیور وقت کا پابند، شائستہ اور راولپنڈی کے راستوں کو ہم سے بہتر جانتا ہے۔",
    },
    avatar: "/images/testimonials/hamza.webp",
    rating: 5,
  },
  {
    name: "Sana Tariq",
    city: { en: "Lahore", ur: "لاہور" },
    role: { en: "Hired a nanny", ur: "آیا رکھی" },
    quote: {
      en: "As a working mother, finding a nanny I could trust was my biggest worry. RX Direct's screening process and follow-up support made all the difference.",
      ur: "ایک کام کرنے والی ماں کے طور پر، ایسی آیا تلاش کرنا جس پر بھروسہ کیا جا سکے میری سب سے بڑی فکر تھی۔ آر ایکس ڈائریکٹ کے جانچ کے عمل اور مسلسل معاونت نے بڑا فرق ڈالا۔",
    },
    avatar: "/images/testimonials/sana.webp",
    rating: 5,
  },
  {
    name: "Bilal Ahmed",
    city: { en: "Karachi", ur: "کراچی" },
    role: { en: "Hired office boys & guards", ur: "آفس بوائے اور گارڈز رکھے" },
    quote: {
      en: "We staffed an entire new office branch through RX Direct, office boys and security guards, all verified and reliable. Saved us weeks of hiring effort.",
      ur: "ہم نے آر ایکس ڈائریکٹ کے ذریعے پورے نئے دفتری برانچ کا عملہ رکھا, آفس بوائے اور سیکیورٹی گارڈز، سب تصدیق شدہ اور قابلِ اعتماد۔ ہماری بھرتی کی کئی ہفتوں کی محنت بچ گئی۔",
    },
    avatar: "/images/testimonials/bilal.webp",
    rating: 5,
  },
];
