"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";

const factors = {
  en: [
    "Staff category, a specialist like a nurse or professional chef is priced differently than a general helper",
    "Full-time, part-time or live-in arrangement",
    "Experience level and specific skill requirements",
    "City and how in-demand that role currently is in your area",
  ],
  ur: [
    "عملے کی قسم، جیسے نرس یا پیشہ ور شیف جیسے ماہر کی قیمت عام ہیلپر سے مختلف ہوتی ہے",
    "کل وقتی، جز وقتی یا لِیو اِن انتظام",
    "تجربے کی سطح اور مخصوص مہارت کی ضروریات",
    "شہر اور اس علاقے میں اس کردار کی موجودہ طلب",
  ],
};

const faqs = [
  {
    question: {
      en: "How much does it cost to hire domestic staff through RX Direct?",
      ur: "آر ایکس ڈائریکٹ کے ذریعے گھریلو عملہ رکھنے کی قیمت کتنی ہے؟",
    },
    answer: {
      en: "Pricing depends on the staff type, city and whether the arrangement is full-time, part-time or live-in. Message us on WhatsApp with your requirements and we'll share a clear, no-obligation quote before you commit to anything.",
      ur: "قیمت عملے کی قسم، شہر اور انتظام کل وقتی، جز وقتی یا لِیو اِن ہونے پر منحصر ہے۔ اپنی ضروریات کے ساتھ ہمیں واٹس ایپ پر پیغام بھیجیں اور ہم عزم کرنے سے پہلے واضح، بلا التزام قیمت فراہم کریں گے۔",
    },
  },
  {
    question: {
      en: "Is there a fee just to see candidates or get a shortlist?",
      ur: "کیا صرف امیدواروں کو دیکھنے یا فہرست حاصل کرنے کے لیے کوئی فیس ہے؟",
    },
    answer: {
      en: "No. Browsing candidates and requesting a shortlist is free, there's no obligation and no fee until you confirm a placement.",
      ur: "نہیں۔ امیدواروں کو دیکھنا اور فہرست کی درخواست مفت ہے، جب تک آپ تقرری کی تصدیق نہیں کرتے کوئی التزام یا فیس نہیں۔",
    },
  },
  {
    question: {
      en: "Do prices differ between cities?",
      ur: "کیا شہروں کے درمیان قیمتیں مختلف ہوتی ہیں؟",
    },
    answer: {
      en: "Yes, slightly, rates can vary by city and by how in-demand a particular role is in that area. We'll always confirm the exact rate for your city and requirements before you commit.",
      ur: "جی ہاں، تھوڑا سا، شرحیں شہر اور اس علاقے میں کسی خاص کردار کی طلب کے مطابق مختلف ہو سکتی ہیں۔ ہم عزم کرنے سے پہلے ہمیشہ آپ کے شہر اور ضروریات کے لیے درست شرح کی تصدیق کریں گے۔",
    },
  },
  {
    question: {
      en: "What's included if a placement doesn't work out?",
      ur: "اگر تقرری کامیاب نہ ہو تو کیا شامل ہے؟",
    },
    answer: {
      en: "Every placement includes a 6-month replacement guarantee from the date of placement, if it's not the right fit, we arrange a suitable replacement at no extra placement fee.",
      ur: "ہر تقرری میں تعیناتی کی تاریخ سے 6 ماہ کی تبدیلی کی ضمانت شامل ہے، اگر یہ موزوں ثابت نہ ہو تو ہم بغیر اضافی فیس کے موزوں تبدیلی کا انتظام کرتے ہیں۔",
    },
  },
];

export default function PricingPageClient({ article }: { article?: ReactNode } = {}) {
  const { t, locale } = useTranslation();

  return (
    <>
      <section className="section-py container-px mx-auto max-w-3xl">
        <SectionHeading
          title={t("pricingPage.title")}
          subtitle={t("pricingPage.subtitle")}
        />
        <p className="mt-8 leading-relaxed text-gray-600">{t("pricingPage.intro")}</p>

        <div className="mt-10 rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">{t("pricingPage.factorsTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {factors[locale].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 leading-relaxed text-gray-600">{t("pricingPage.noHidden")}</p>

        <h2 className="mt-10 text-lg font-bold text-gray-900">{t("pricingPage.categoriesTitle")}</h2>
        <p className="mt-4 leading-relaxed text-gray-600">{t("pricingPage.categoriesText")}</p>

        <div className="mt-14">
          <SectionHeading title={t("faqsPage.title")} />
          <div className="mt-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
      {article}

      <CTABanner
        title={t("pricingPage.ctaTitle")}
        subtitle={t("servicesPage.detailCtaSubtitle")}
        buttonLabel={t("common.requestStaff")}
      />
    </>
  );
}
