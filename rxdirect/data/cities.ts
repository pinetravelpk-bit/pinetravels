import { getCityImageOverride } from "@/data/siteImages";

export interface Society {
  slug: string;
  name: { en: string; ur: string };
  shortDesc: { en: string; ur: string };
  intro: { en: string; ur: string };
}

export interface City {
  slug: string;
  image: string;
  imageAlt: { en: string; ur: string };
  name: { en: string; ur: string };
  shortDesc: { en: string; ur: string };
  intro: { en: string; ur: string };
  societies: Society[];
  featured?: boolean;
}

const rawCities: City[] = [
  {
    slug: "islamabad",
    image: "/images/cities/islamabad.webp",
    imageAlt: {
      en: "Faisal Mosque and the Margalla Hills skyline in Islamabad",
      ur: "اسلام آباد میں فیصل مسجد اور مارگلہ کی پہاڑیوں کا منظر",
    },
    name: { en: "Islamabad", ur: "اسلام آباد" },
    shortDesc: {
      en: "Verified domestic staff across Islamabad's sectors, from F-6 to Bahria Town.",
      ur: "اسلام آباد کے تمام سیکٹرز میں، ایف سکس سے بحریہ ٹاؤن تک، تصدیق شدہ گھریلو عملہ۔",
    },
    intro: {
      en: "As the capital, Islamabad is home to diplomats, corporate professionals and growing families who need staff they can trust. RX Direct has an active local team placing cooks, drivers, helpers, cleaners, guards and office boys across Islamabad's sectors, with fast turnaround for both residential and corporate clients.",
      ur: "دارالحکومت ہونے کے ناطے، اسلام آباد میں سفارت کار، کارپوریٹ پیشہ ور افراد اور بڑھتے ہوئے خاندان آباد ہیں جنہیں قابلِ اعتماد عملے کی ضرورت ہوتی ہے۔ آر ایکس ڈائریکٹ کی مقامی ٹیم اسلام آباد کے تمام سیکٹرز میں باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتی ہے, رہائشی اور کارپوریٹ دونوں کلائنٹس کے لیے تیز رفتار خدمت کے ساتھ۔",
    },
    featured: true,
    societies: [
      {
        slug: "dha-islamabad",
        name: { en: "DHA Islamabad", ur: "ڈی ایچ اے اسلام آباد" },
        shortDesc: {
          en: "Gated phases with controlled entry, popular with corporate and diplomatic households.",
          ur: "کنٹرولڈ انٹری کے حامل فیزز، کارپوریٹ اور سفارتی گھرانوں میں مقبول۔",
        },
        intro: {
          en: "DHA Islamabad's phases sit behind controlled gates and security desks, which means every staff member needs proper documentation on file before they can move freely in and out. It's home to a large mix of corporate professionals and diplomatic-adjacent households who expect a higher hiring standard as the baseline, not an upgrade.",
          ur: "ڈی ایچ اے اسلام آباد کے فیزز کنٹرولڈ گیٹس اور سیکیورٹی ڈیسک کے پیچھے واقع ہیں، جس کا مطلب ہے کہ ہر عملہ رکن کو آزادانہ آمدورفت سے پہلے مناسب دستاویزات کا حامل ہونا ضروری ہے۔ یہاں کارپوریٹ پیشہ ور افراد اور سفارتی نوعیت کے گھرانوں کی بڑی تعداد آباد ہے جو تقرری کے لیے اعلیٰ معیار کو ایک اضافی سہولت نہیں بلکہ بنیادی ضرورت سمجھتے ہیں۔",
        },
      },
      {
        slug: "bahria-town-islamabad",
        name: { en: "Bahria Town Islamabad", ur: "بحریہ ٹاؤن اسلام آباد" },
        shortDesc: {
          en: "One of the largest housing developments in the twin cities, Phase 1 through Safari Valley.",
          ur: "جڑواں شہروں کی سب سے بڑی ہاؤسنگ ڈویلپمنٹس میں سے ایک، فیز ون سے صفاری ویلی تک۔",
        },
        intro: {
          en: "Bahria Town Islamabad spans a huge area, from the older phases near the main boulevard out to Safari Valley and the Overseas Enclave. With that scale comes a wide range of household sizes and staffing needs, and a genuine commute-reliability factor for staff coming from further-out phases.",
          ur: "بحریہ ٹاؤن اسلام آباد ایک وسیع رقبے پر پھیلا ہوا ہے, مین بلیوارڈ کے قریب پرانے فیزز سے لے کر صفاری ویلی اور اوورسیز اینکلیو تک۔ اس وسعت کے ساتھ گھرانوں کے سائز اور عملے کی ضروریات میں بھی وسیع فرق آتا ہے، اور دور دراز فیزز سے آنے والے عملے کے لیے آمدورفت کی وقت کی پابندی ایک حقیقی عنصر بن جاتی ہے۔",
        },
      },
      {
        slug: "askari-islamabad",
        name: { en: "Askari 10, 11 & 14", ur: "عسکری 10، 11 اور 14" },
        shortDesc: {
          en: "Army and veteran housing sectors with their own gate security and documentation standards.",
          ur: "اپنے گیٹ سیکیورٹی اور دستاویزات کے معیار کے حامل فوجی اور سابق فوجی رہائشی سیکٹرز۔",
        },
        intro: {
          en: "Askari 10, 11 and 14 are home to a mix of serving and retired military families, and both sectors maintain their own gate security. Residents here tend to expect a hiring standard that goes a step beyond what's typical elsewhere, verifiable documentation, contactable references, and staff who are comfortable with structured entry procedures.",
          ur: "عسکری 10، 11 اور 14 میں حاضر سروس اور ریٹائرڈ فوجی خاندانوں کی مخلوط آبادی ہے، اور دونوں سیکٹرز اپنی گیٹ سیکیورٹی رکھتے ہیں۔ یہاں کے مکین عام طور پر ایک ایسا معیار توقع رکھتے ہیں جو دیگر جگہوں سے بڑھ کر ہو, قابلِ تصدیق دستاویزات، رابطہ کیے جا سکنے والے حوالہ جات، اور ایسا عملہ جو منظم داخلے کے طریقہ کار کے ساتھ باآسانی ہم آہنگ ہو سکے۔",
        },
      },
      {
        slug: "naval-anchorage",
        name: { en: "Naval Anchorage", ur: "نیول اینکریج" },
        shortDesc: {
          en: "Close to the Kashmir Highway corridor, popular for its commute convenience.",
          ur: "کشمیر ہائی وے کوریڈور کے قریب، آمدورفت کی سہولت کے باعث مقبول۔",
        },
        intro: {
          en: "Naval Anchorage sits close to the Kashmir Highway, which makes it convenient for commuting but also means residents rely heavily on drivers and staff who genuinely know the fastest routes at different times of day, morning school-run traffic looks very different from the evening commute back from Blue Area.",
          ur: "نیول اینکریج کشمیر ہائی وے کے قریب واقع ہے، جو آمدورفت کے لیے آسان بناتا ہے لیکن اس کا مطلب یہ بھی ہے کہ مکین ایسے ڈرائیورز اور عملے پر بہت زیادہ انحصار کرتے ہیں جو دن کے مختلف اوقات میں تیز ترین راستوں سے واقعی واقف ہوں, صبح اسکول جانے کا ٹریفک شام کو بلیو ایریا سے واپسی کے ٹریفک سے بالکل مختلف ہوتا ہے۔",
        },
      },
      {
        slug: "ghauri-town",
        name: { en: "Ghauri Town", ur: "غوری ٹاؤن" },
        shortDesc: {
          en: "A spread-out Zone 5 community where many homes rely on their own private security.",
          ur: "زون 5 کی ایک پھیلی ہوئی کمیونٹی جہاں بہت سے گھر اپنی نجی سیکیورٹی پر انحصار کرتے ہیں۔",
        },
        intro: {
          en: "Ghauri Town's zones spread across a large area of Zone 5, and unlike some of Islamabad's more centrally-gated societies, many homes here depend on their own private guard rather than a single society-wide security perimeter, which makes the individual hiring decision, and the vetting behind it, matter even more.",
          ur: "غوری ٹاؤن کے زونز زون 5 کے وسیع رقبے پر پھیلے ہوئے ہیں، اور اسلام آباد کی کچھ زیادہ مرکزی طور پر محفوظ سوسائٹیز کے برعکس، یہاں بہت سے گھر ایک واحد سوسائٹی وائیڈ سیکیورٹی کے بجائے اپنے نجی گارڈ پر انحصار کرتے ہیں, جس کی وجہ سے انفرادی بھرتی کا فیصلہ اور اس کے پیچھے کی جانچ پڑتال مزید اہم ہو جاتی ہے۔",
        },
      },
      {
        slug: "bani-gala",
        name: { en: "Bani Gala", ur: "بنی گالہ" },
        shortDesc: {
          en: "Upscale hillside homes near Rawal Lake and the Margalla foothills.",
          ur: "راول جھیل اور مارگلہ کی نشیبی پہاڑیوں کے قریب اعلیٰ درجے کے پہاڑی گھر۔",
        },
        intro: {
          en: "Bani Gala's hillside villas near Rawal Lake tend to be larger properties with more grounds to maintain, which is why gardeners and full household teams, cook, helper and guard together, are some of our most common requests from the area.",
          ur: "راول جھیل کے قریب بنی گالہ کی پہاڑی رہائش گاہیں عام طور پر بڑی جائیدادیں ہیں جن کی دیکھ بھال کے لیے زیادہ رقبہ درکار ہوتا ہے، یہی وجہ ہے کہ مالی اور مکمل گھریلو ٹیمیں, باورچی، ہیلپر اور گارڈ ایک ساتھ, اس علاقے سے ہماری سب سے عام درخواستوں میں شامل ہیں۔",
        },
      },
    ],
  },
  {
    slug: "rawalpindi",
    image: "/images/cities/rawalpindi.webp",
    imageAlt: {
      en: "Street view of Rawalpindi's Saddar market area",
      ur: "راولپنڈی کے صدر بازار کا منظر",
    },
    name: { en: "Rawalpindi", ur: "راولپنڈی" },
    shortDesc: {
      en: "Trusted staffing for Rawalpindi's homes and businesses, from Saddar to Bahria Town.",
      ur: "راولپنڈی کے گھروں اور کاروباروں کے لیے قابلِ اعتماد عملہ، صدر سے بحریہ ٹاؤن تک۔",
    },
    intro: {
      en: "Rawalpindi's twin-city proximity to Islamabad means our teams cover both cities seamlessly. From cantonment-area households to growing housing societies, we place verified cooks, drivers, helpers, cleaners, guards and office boys throughout Rawalpindi.",
      ur: "راولپنڈی کی اسلام آباد سے قربت کی وجہ سے ہماری ٹیمیں دونوں شہروں کا احاطہ بلا رکاوٹ کرتی ہیں۔ چھاؤنی کے علاقوں کے گھرانوں سے لے کر بڑھتی ہوئی ہاؤسنگ سوسائٹیز تک، ہم راولپنڈی بھر میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتے ہیں۔",
    },
    featured: true,
    societies: [
      {
        slug: "dha-rawalpindi",
        name: { en: "DHA Rawalpindi", ur: "ڈی ایچ اے راولپنڈی" },
        shortDesc: {
          en: "Multiple phases, each with its own gate and staff registration process.",
          ur: "متعدد فیزز، ہر ایک کا اپنا گیٹ اور عملہ رجسٹریشن کا عمل۔",
        },
        intro: {
          en: "DHA Rawalpindi has expanded across several phases, each with its own gate and security desk. Most phases require staff to register with a CNIC, and many issue a staff ID card for regular entry, which is exactly why we verify every candidate's documentation before placement rather than leaving it for move-in day.",
          ur: "ڈی ایچ اے راولپنڈی کئی فیزز میں پھیل چکا ہے، ہر ایک کا اپنا گیٹ اور سیکیورٹی ڈیسک ہے۔ زیادہ تر فیزز میں عملے کو شناختی کارڈ کے ساتھ رجسٹر ہونا ضروری ہے، اور بہت سے باقاعدہ داخلے کے لیے عملہ آئی ڈی کارڈ جاری کرتے ہیں, یہی وجہ ہے کہ ہم ہر امیدوار کی دستاویزات کی تصدیق تعیناتی سے پہلے کرتے ہیں، نہ کہ منتقلی کے دن کے لیے چھوڑ دیتے ہیں۔",
        },
      },
      {
        slug: "bahria-town-rawalpindi",
        name: { en: "Bahria Town Rawalpindi", ur: "بحریہ ٹاؤن راولپنڈی" },
        shortDesc: {
          en: "A mixed-use community with residential phases alongside commercial plazas.",
          ur: "کمرشل پلازوں کے ساتھ رہائشی فیزز پر مشتمل مخلوط استعمال کی کمیونٹی۔",
        },
        intro: {
          en: "Bahria Town Rawalpindi has grown into a genuine mixed-use community, residential phases alongside commercial plazas, small offices and clinics. That mix is exactly why we see steady demand for both household drivers and office support staff from the same neighborhood.",
          ur: "بحریہ ٹاؤن راولپنڈی ایک حقیقی مخلوط استعمال کی کمیونٹی بن چکا ہے, تجارتی پلازوں، چھوٹے دفاتر اور کلینکس کے ساتھ رہائشی فیزز۔ یہی امتزاج ہے جس کی وجہ سے ہمیں اسی علاقے سے گھریلو ڈرائیورز اور دفتری معاون عملے دونوں کی مستقل طلب دیکھنے کو ملتی ہے۔",
        },
      },
      {
        slug: "askari-rawalpindi",
        name: { en: "Askari Housing Schemes", ur: "عسکری ہاؤسنگ اسکیمیں" },
        shortDesc: {
          en: "Askari 1, 3, 5, 7 and 13, scattered through Rawalpindi Cantt.",
          ur: "عسکری 1، 3، 5، 7 اور 13، راولپنڈی چھاؤنی میں پھیلی ہوئی۔",
        },
        intro: {
          en: "Rawalpindi's Askari sectors, 1, 3, 5, 7 and 13, are scattered through the cantonment area, each maintaining its own entry protocol. We prioritize candidates with prior cantonment or gated-community experience for placements here, since they're already familiar with the documentation these sectors expect.",
          ur: "راولپنڈی کے عسکری سیکٹرز, 1، 3، 5، 7 اور 13, چھاؤنی کے علاقے میں پھیلے ہوئے ہیں، ہر ایک اپنا داخلے کا طریقہ کار رکھتا ہے۔ یہاں تعیناتی کے لیے ہم چھاؤنی یا محفوظ کمیونٹی کے سابقہ تجربے کے حامل امیدواروں کو ترجیح دیتے ہیں، کیونکہ وہ پہلے ہی ان سیکٹرز کی متوقع دستاویزات سے واقف ہوتے ہیں۔",
        },
      },
      {
        slug: "airport-housing-society",
        name: { en: "Airport Housing Society", ur: "ایئرپورٹ ہاؤسنگ سوسائٹی" },
        shortDesc: {
          en: "One of Rawalpindi's older, well-established residential schemes.",
          ur: "راولپنڈی کی پرانی اور مستحکم رہائشی اسکیموں میں سے ایک۔",
        },
        intro: {
          en: "Airport Housing Society (AHS) is one of Rawalpindi's older, well-established residential schemes, with a mix of long-time resident families and newer households. Hiring here has traditionally worked through word-of-mouth, and more families are now looking for a verified alternative to informal referrals.",
          ur: "ایئرپورٹ ہاؤسنگ سوسائٹی (اے ایچ ایس) راولپنڈی کی پرانی اور مستحکم رہائشی اسکیموں میں سے ایک ہے، جہاں طویل عرصے سے رہائش پذیر خاندانوں اور نئے گھرانوں کی آمیزش ہے۔ یہاں بھرتی روایتی طور پر منہ زبانی حوالوں کے ذریعے ہوتی رہی ہے، اور اب زیادہ خاندان غیر رسمی حوالوں کے بجائے تصدیق شدہ متبادل تلاش کر رہے ہیں۔",
        },
      },
      {
        slug: "scheme-3-rawalpindi",
        name: { en: "Scheme 3", ur: "اسکیم 3" },
        shortDesc: {
          en: "A long-established residential area along Allama Iqbal Road.",
          ur: "علامہ اقبال روڈ کے ساتھ ایک دیرینہ رہائشی علاقہ۔",
        },
        intro: {
          en: "Scheme 3 is one of Rawalpindi's longer-established residential areas, home to a mix of joint-family households and smaller nuclear families along Allama Iqbal Road. Cooks and general helpers are by far the most common requests we get from this area.",
          ur: "اسکیم 3 راولپنڈی کے دیرینہ رہائشی علاقوں میں سے ایک ہے، جہاں علامہ اقبال روڈ کے ساتھ مشترکہ خاندانی گھرانوں اور چھوٹے یک خاندانی گھرانوں کی آمیزش ہے۔ باورچی اور عمومی ہیلپرز اس علاقے سے ہمیں موصول ہونے والی سب سے عام درخواستیں ہیں۔",
        },
      },
      {
        slug: "chaklala-scheme",
        name: { en: "Chaklala Scheme", ur: "چکلالہ اسکیم" },
        shortDesc: {
          en: "Close to Chaklala Cantt and the airbase, with its own security norms.",
          ur: "چکلالہ چھاؤنی اور ایئربیس کے قریب، اپنے سیکیورٹی اصولوں کے ساتھ۔",
        },
        intro: {
          en: "Chaklala Scheme sits close to Chaklala Cantt, and households here often expect staff to be comfortable with the extra layer of security checks that come with proximity to a military airbase area, something we screen for specifically when placing drivers and guards in this part of Rawalpindi.",
          ur: "چکلالہ اسکیم چکلالہ چھاؤنی کے قریب واقع ہے، اور یہاں کے گھرانے اکثر توقع رکھتے ہیں کہ عملہ فوجی ایئربیس کے قریب ہونے کی وجہ سے اضافی سیکیورٹی چیکس کے ساتھ باآسانی ہم آہنگ ہو, جو ہم خاص طور پر راولپنڈی کے اس حصے میں ڈرائیورز اور گارڈز تعینات کرتے وقت جانچتے ہیں۔",
        },
      },
    ],
  },
  {
    slug: "lahore",
    image: "/images/cities/lahore.webp",
    imageAlt: {
      en: "Badshahi Mosque skyline in Lahore",
      ur: "لاہور میں بادشاہی مسجد کا منظر",
    },
    name: { en: "Lahore", ur: "لاہور" },
    shortDesc: {
      en: "Verified domestic staff for Lahore's homes and offices, from DHA to Gulberg.",
      ur: "لاہور کے گھروں اور دفاتر کے لیے تصدیق شدہ گھریلو عملہ، ڈی ایچ اے سے گلبرگ تک۔",
    },
    intro: {
      en: "Pakistan's cultural capital is home to a large, active RX Direct client base. We place cooks, drivers, helpers, cleaners, guards and office boys across Lahore's residential societies and commercial districts, with the same rigorous verification process used nationwide.",
      ur: "پاکستان کا ثقافتی دارالحکومت آر ایکس ڈائریکٹ کے بڑے اور فعال کلائنٹ بیس کا گھر ہے۔ ہم لاہور کی رہائشی سوسائٹیز اور تجارتی علاقوں میں باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتے ہیں، ملک بھر میں استعمال ہونے والے اسی سخت تصدیقی عمل کے ساتھ۔",
    },
    featured: true,
    societies: [
      {
        slug: "dha-lahore",
        name: { en: "DHA Lahore", ur: "ڈی ایچ اے لاہور" },
        shortDesc: {
          en: "The largest DHA in the country, spanning older and newer phases alike.",
          ur: "ملک کا سب سے بڑا ڈی ایچ اے، پرانے اور نئے فیزز پر مشتمل۔",
        },
        intro: {
          en: "DHA Lahore spans more phases than almost any other DHA development in Pakistan, from the older, established sections near Barki Road to newer phases still under active development. Household needs vary a lot from one phase to the next, but our verification standard doesn't change.",
          ur: "ڈی ایچ اے لاہور پاکستان کے تقریباً کسی بھی دوسرے ڈی ایچ اے ڈویلپمنٹ سے زیادہ فیزز پر پھیلا ہوا ہے، برکی روڈ کے قریب پرانے مستحکم حصوں سے لے کر ابھی زیرِ تعمیر نئے فیزز تک۔ ایک فیز سے دوسرے فیز تک گھریلو ضروریات میں کافی فرق ہوتا ہے، لیکن ہمارا تصدیقی معیار تبدیل نہیں ہوتا۔",
        },
      },
      {
        slug: "bahria-town-lahore",
        name: { en: "Bahria Town Lahore", ur: "بحریہ ٹاؤن لاہور" },
        shortDesc: {
          en: "A large-scale development off Sundar Raiwind Road.",
          ur: "سندر رائیونڈ روڈ پر واقع ایک بڑے پیمانے کی ڈویلپمنٹ۔",
        },
        intro: {
          en: "Bahria Town Lahore's scale means new households are moving in constantly, and many need a cook, helper, guard and gardener staffed up all at once. We shortlist multiple roles in parallel for households setting up here, rather than running separate hiring processes for each.",
          ur: "بحریہ ٹاؤن لاہور کی وسعت کا مطلب ہے کہ نئے گھرانے مسلسل منتقل ہو رہے ہیں، اور بہت سے ایک ساتھ باورچی، ہیلپر، گارڈ اور مالی کی ضرورت رکھتے ہیں۔ ہم یہاں آباد ہونے والے گھرانوں کے لیے متعدد کردار بیک وقت منتخب کرتے ہیں، الگ الگ بھرتی کے عمل چلانے کے بجائے۔",
        },
      },
      {
        slug: "askari-lahore",
        name: { en: "Askari 10 & 11", ur: "عسکری 10 اور 11" },
        shortDesc: {
          en: "Close to commercial activity, generating demand for both guards and office boys.",
          ur: "تجارتی سرگرمی کے قریب، گارڈز اور آفس بوائے دونوں کی طلب پیدا کرتا ہے۔",
        },
        intro: {
          en: "Askari 10 and Askari 11 in Lahore sit near enough to commercial and institutional activity that we regularly place two roles side by side here: security guards for homes, and office boys for the small offices and clinics nearby, both expected to meet the same disciplined standard.",
          ur: "لاہور میں عسکری 10 اور عسکری 11 تجارتی اور ادارہ جاتی سرگرمی کے اتنے قریب واقع ہیں کہ ہم اکثر یہاں دو کردار ایک ساتھ تعینات کرتے ہیں: گھروں کے لیے سیکیورٹی گارڈز، اور قریبی چھوٹے دفاتر اور کلینکس کے لیے آفس بوائے, دونوں سے ایک ہی نظم و ضبط کے معیار کی توقع کی جاتی ہے۔",
        },
      },
      {
        slug: "gulberg-lahore",
        name: { en: "Gulberg", ur: "گلبرگ" },
        shortDesc: {
          en: "Lahore's commercial-and-residential hub around MM Alam Road.",
          ur: "ایم ایم عالم روڈ کے گرد لاہور کا تجارتی و رہائشی مرکز۔",
        },
        intro: {
          en: "Gulberg blends residential homes with Lahore's busiest commercial strip along MM Alam Road, which means our placements here split fairly evenly between household staff for residences and office boys or guards for the businesses and clinics nearby.",
          ur: "گلبرگ رہائشی گھروں کو ایم ایم عالم روڈ کے ساتھ لاہور کی مصروف ترین تجارتی پٹی کے ساتھ ملاتا ہے، جس کا مطلب ہے کہ یہاں ہماری تقرریاں رہائش گاہوں کے لیے گھریلو عملے اور قریبی کاروباروں و کلینکس کے لیے آفس بوائے یا گارڈز کے درمیان تقریباً برابر تقسیم ہوتی ہیں۔",
        },
      },
      {
        slug: "model-town-lahore",
        name: { en: "Model Town", ur: "ماڈل ٹاؤن" },
        shortDesc: {
          en: "One of Lahore's oldest planned residential areas, built around a circular park.",
          ur: "ایک گول پارک کے گرد تعمیر شدہ لاہور کے قدیم ترین منصوبہ بند رہائشی علاقوں میں سے ایک۔",
        },
        intro: {
          en: "Model Town is one of Lahore's oldest planned residential areas, built around its well-known circular park layout. Many households here are long-established families who prefer a live-in cook or helper with genuine longevity, we prioritize candidates with a stable, verifiable work history for placements in the area.",
          ur: "ماڈل ٹاؤن لاہور کے قدیم ترین منصوبہ بند رہائشی علاقوں میں سے ایک ہے، جو اپنے معروف گول پارک کے گرد تعمیر کیا گیا ہے۔ یہاں کے بہت سے گھرانے دیرینہ خاندان ہیں جو حقیقی استحکام کے حامل لِیو اِن باورچی یا ہیلپر کو ترجیح دیتے ہیں, ہم اس علاقے میں تعیناتی کے لیے مستحکم اور قابلِ تصدیق کام کی تاریخ رکھنے والے امیدواروں کو ترجیح دیتے ہیں۔",
        },
      },
      {
        slug: "johar-town-lahore",
        name: { en: "Johar Town", ur: "جوہر ٹاؤن" },
        shortDesc: {
          en: "A large, middle-class residential area popular with young families.",
          ur: "نوجوان خاندانوں میں مقبول ایک بڑا متوسط طبقے کا رہائشی علاقہ۔",
        },
        intro: {
          en: "Johar Town's mix of young families and working professionals generates steady demand for part-time cleaners and daily cooks in particular, households here often want flexible, hourly arrangements rather than full-time live-in staff.",
          ur: "جوہر ٹاؤن میں نوجوان خاندانوں اور کام کرنے والے پیشہ ور افراد کی آمیزش خاص طور پر جز وقتی صفائی کے عملے اور روزانہ باورچیوں کی مستقل طلب پیدا کرتی ہے, یہاں کے گھرانے اکثر مکمل وقتی لِیو اِن عملے کے بجائے لچکدار، فی گھنٹہ انتظامات چاہتے ہیں۔",
        },
      },
    ],
  },
  {
    slug: "karachi",
    image: "/images/cities/karachi.webp",
    imageAlt: {
      en: "Karachi coastal city skyline at dusk",
      ur: "شام کے وقت کراچی کے ساحلی شہر کا منظر",
    },
    name: { en: "Karachi", ur: "کراچی" },
    shortDesc: {
      en: "Reliable domestic staffing across Karachi, from Clifton to DHA and beyond.",
      ur: "کلفٹن سے ڈی ایچ اے اور اس سے آگے تک، کراچی بھر میں قابلِ اعتماد گھریلو عملہ۔",
    },
    intro: {
      en: "Pakistan's largest city needs staffing partners who can move fast. RX Direct places verified cooks, drivers, helpers, cleaners, guards and office boys across Karachi's diverse neighborhoods, backed by the same background-checking process used in every city we serve.",
      ur: "پاکستان کے سب سے بڑے شہر کو ایسے اسٹافنگ پارٹنرز درکار ہیں جو تیزی سے کام کر سکیں۔ آر ایکس ڈائریکٹ کراچی کے متنوع علاقوں میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتا ہے، ہر شہر میں استعمال ہونے والے اسی پس منظر کی جانچ کے عمل کے ساتھ۔",
    },
    featured: true,
    societies: [
      {
        slug: "clifton-defence-karachi",
        name: { en: "Clifton & Defence (DHA)", ur: "کلفٹن اور ڈیفنس (ڈی ایچ اے)" },
        shortDesc: {
          en: "Karachi's most established coastal neighborhoods.",
          ur: "کراچی کے سب سے مستحکم ساحلی علاقے۔",
        },
        intro: {
          en: "Clifton and DHA Karachi are among the city's most established addresses, with a long-standing base of families who've hired staff through generations of the same networks. We're increasingly the verified alternative for households here who want the same reliability without depending entirely on inherited connections.",
          ur: "کلفٹن اور ڈی ایچ اے کراچی شہر کے سب سے مستحکم پتوں میں سے ہیں، جہاں خاندان نسل در نسل ایک ہی نیٹ ورکس کے ذریعے عملہ رکھتے آئے ہیں۔ ہم تیزی سے یہاں کے گھرانوں کے لیے وہ تصدیق شدہ متبادل بنتے جا رہے ہیں جو وراثتی رابطوں پر مکمل انحصار کیے بغیر وہی بھروسہ فراہم کرتا ہے۔",
        },
      },
      {
        slug: "bahria-town-karachi",
        name: { en: "Bahria Town Karachi", ur: "بحریہ ٹاؤن کراچی" },
        shortDesc: {
          en: "A newer development further from the city's older established areas.",
          ur: "شہر کے پرانے مستحکم علاقوں سے دور ایک نئی ڈویلپمنٹ۔",
        },
        intro: {
          en: "Bahria Town Karachi sits further out from the older parts of the city, which means households here often can't rely on an informal network of long-time neighbors the way families in Clifton or PECHS might, making structured, verified hiring matter even more.",
          ur: "بحریہ ٹاؤن کراچی شہر کے پرانے حصوں سے دور واقع ہے، جس کا مطلب ہے کہ یہاں کے گھرانے اکثر کلفٹن یا پی ای سی ایچ ایس کے خاندانوں کی طرح دیرینہ پڑوسیوں کے غیر رسمی نیٹ ورک پر انحصار نہیں کر سکتے, جس سے منظم اور تصدیق شدہ بھرتی مزید اہم ہو جاتی ہے۔",
        },
      },
      {
        slug: "askari-karachi",
        name: { en: "Askari 5 & Malir Cantt", ur: "عسکری 5 اور ملیر کینٹ" },
        shortDesc: {
          en: "Cantonment-area housing with its own security and entry protocol.",
          ur: "اپنے سیکیورٹی اور داخلے کے طریقہ کار کے حامل چھاؤنی کے علاقے کی رہائش۔",
        },
        intro: {
          en: "Askari 5 and the wider Malir Cantt area follow cantonment-standard entry protocols, and residents expect staff who are comfortable producing ID and following visitor procedures consistently, the same disciplined standard we apply to every Askari placement nationwide.",
          ur: "عسکری 5 اور وسیع تر ملیر کینٹ کا علاقہ چھاؤنی کے معیاری داخلے کے طریقہ کار کی پیروی کرتا ہے، اور مکین ایسے عملے کی توقع رکھتے ہیں جو مسلسل شناخت پیش کرنے اور زائرین کے طریقہ کار پر عمل کرنے میں باآسانی ہم آہنگ ہو, وہی نظم و ضبط کا معیار جو ہم ملک بھر میں ہر عسکری تعیناتی پر لاگو کرتے ہیں۔",
        },
      },
      {
        slug: "gulshan-e-iqbal",
        name: { en: "Gulshan-e-Iqbal", ur: "گلشنِ اقبال" },
        shortDesc: {
          en: "A large, established middle-class area along University Road.",
          ur: "یونیورسٹی روڈ کے ساتھ ایک بڑا اور مستحکم متوسط طبقے کا علاقہ۔",
        },
        intro: {
          en: "Gulshan-e-Iqbal's size and density along University Road means a huge range of household types, from single-family homes to multi-family apartment buildings, each with different staffing needs. Cleaners and part-time helpers are especially common requests from the area's apartment-heavy blocks.",
          ur: "یونیورسٹی روڈ کے ساتھ گلشنِ اقبال کے سائز اور کثافت کا مطلب ہے گھرانوں کی وسیع اقسام, واحد خاندانی گھروں سے لے کر کثیر خاندانی اپارٹمنٹ عمارتوں تک, ہر ایک کی مختلف عملے کی ضروریات کے ساتھ۔ صفائی کا عملہ اور جز وقتی ہیلپرز اس علاقے کے اپارٹمنٹ سے بھرپور بلاکس سے خاص طور پر عام درخواستیں ہیں۔",
        },
      },
      {
        slug: "north-nazimabad",
        name: { en: "North Nazimabad", ur: "نارتھ ناظم آباد" },
        shortDesc: {
          en: "An established older area with a strong base of long-term resident families.",
          ur: "دیرینہ رہائش پذیر خاندانوں کی مضبوط بنیاد کے حامل ایک مستحکم پرانا علاقہ۔",
        },
        intro: {
          en: "North Nazimabad's long-term resident base means many households here have had the same domestic staffing arrangement for years, and are now looking for a replacement they can verify with the same confidence, reference checks and a trial period matter especially here.",
          ur: "نارتھ ناظم آباد کے دیرینہ رہائش پذیر افراد کا مطلب ہے کہ یہاں کے بہت سے گھرانوں کا برسوں سے ایک ہی گھریلو عملے کا انتظام رہا ہے، اور اب وہ اسی اعتماد کے ساتھ ایک قابلِ تصدیق متبادل تلاش کر رہے ہیں, حوالہ جات کی جانچ اور آزمائشی مدت یہاں خاص طور پر اہم ہیں۔",
        },
      },
      {
        slug: "pechs-karachi",
        name: { en: "PECHS", ur: "پی ای سی ایچ ایس" },
        shortDesc: {
          en: "One of Karachi's oldest planned cooperative housing societies.",
          ur: "کراچی کی قدیم ترین منصوبہ بند کوآپریٹو ہاؤسنگ سوسائٹیز میں سے ایک۔",
        },
        intro: {
          en: "PECHS (Pakistan Employees Co-operative Housing Society) is one of Karachi's oldest planned societies, with tree-lined streets and a settled, multi-generational resident base. Live-in cooks and helpers with genuine long-term references tend to be the strongest fit for households here.",
          ur: "پی ای سی ایچ ایس (پاکستان ایمپلائیز کوآپریٹو ہاؤسنگ سوسائٹی) کراچی کی قدیم ترین منصوبہ بند سوسائٹیز میں سے ایک ہے، جہاں درختوں سے سجی سڑکیں اور کئی نسلوں پر مشتمل مستحکم آبادی ہے۔ حقیقی طویل مدتی حوالہ جات کے حامل لِیو اِن باورچی اور ہیلپرز عام طور پر یہاں کے گھرانوں کے لیے سب سے موزوں ثابت ہوتے ہیں۔",
        },
      },
    ],
  },
  {
    slug: "faisalabad",
    image: "/images/cities/faisalabad.webp",
    imageAlt: {
      en: "The historic Clock Tower (Ghanta Ghar) in central Faisalabad",
      ur: "وسطی فیصل آباد میں تاریخی گھنٹہ گھر",
    },
    name: { en: "Faisalabad", ur: "فیصل آباد" },
    shortDesc: {
      en: "Verified domestic staff for Pakistan's textile capital, from Wapda City to Madina Town.",
      ur: "پاکستان کے ٹیکسٹائل کے دارالحکومت کے لیے تصدیق شدہ گھریلو عملہ، واپڈا سٹی سے مدینہ ٹاؤن تک۔",
    },
    intro: {
      en: "Faisalabad's mix of established industrial families and newer planned societies means household staffing needs vary widely across the city. RX Direct places verified cooks, drivers, helpers, cleaners, guards and office boys across Faisalabad, with the same background-checking process used in every city we serve.",
      ur: "فیصل آباد میں مستحکم صنعتی خاندانوں اور نئی منصوبہ بند سوسائٹیز کی آمیزش کا مطلب ہے کہ شہر بھر میں گھریلو عملے کی ضروریات میں کافی فرق ہے۔ آر ایکس ڈائریکٹ فیصل آباد بھر میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتا ہے، ہر شہر میں استعمال ہونے والے اسی پس منظر کی جانچ کے عمل کے ساتھ۔",
    },
    societies: [
      {
        slug: "wapda-city-faisalabad",
        name: { en: "Wapda City", ur: "واپڈا سٹی" },
        shortDesc: {
          en: "A 650-acre, meticulously planned society and one of Faisalabad's most prestigious.",
          ur: "650 ایکڑ پر مشتمل، منظم منصوبہ بند سوسائٹی اور فیصل آباد کی سب سے معتبر سوسائٹیز میں سے ایک۔",
        },
        intro: {
          en: "Wapda City spans roughly 650 acres and is one of the most expansive, carefully planned housing projects in Faisalabad. Its larger properties and higher-income resident base mean full household teams, cook, helper and guard together, are common requests from the area.",
          ur: "واپڈا سٹی تقریباً 650 ایکڑ پر پھیلا ہوا ہے اور فیصل آباد کے سب سے وسیع اور احتیاط سے منصوبہ بند ہاؤسنگ پراجیکٹس میں سے ایک ہے۔ یہاں کی بڑی جائیدادوں اور زیادہ آمدنی والے مکینوں کا مطلب ہے کہ مکمل گھریلو ٹیمیں, باورچی، ہیلپر اور گارڈ ایک ساتھ, اس علاقے سے عام درخواستیں ہیں۔",
        },
      },
      {
        slug: "madina-town-faisalabad",
        name: { en: "Madina Town", ur: "مدینہ ٹاؤن" },
        shortDesc: {
          en: "An established area known for its location and comprehensive amenities.",
          ur: "اپنے محلِ وقوع اور جامع سہولیات کے لیے معروف ایک مستحکم علاقہ۔",
        },
        intro: {
          en: "Madina Town is a well-established residential and commercial area, and most of our requests here come from working families who want a reliable daily cook and cleaner rather than full-time live-in staff, a flexible, part-time arrangement tends to fit the area best.",
          ur: "مدینہ ٹاؤن ایک مستحکم رہائشی اور تجارتی علاقہ ہے، اور یہاں سے ہماری زیادہ تر درخواستیں کام کرنے والے خاندانوں کی طرف سے آتی ہیں جو مکمل وقتی لِیو اِن عملے کے بجائے قابلِ اعتماد روزانہ باورچی اور صفائی کے عملے کے خواہاں ہوتے ہیں, ایک لچکدار، جز وقتی انتظام اس علاقے کے لیے سب سے موزوں ثابت ہوتا ہے۔",
        },
      },
      {
        slug: "jinnah-colony-faisalabad",
        name: { en: "Jinnah Colony", ur: "جناح کالونی" },
        shortDesc: {
          en: "A central, long-established neighborhood near the city's commercial core.",
          ur: "شہر کے تجارتی مرکز کے قریب ایک مرکزی اور دیرینہ علاقہ۔",
        },
        intro: {
          en: "Jinnah Colony sits close to Faisalabad's commercial core, and its mix of homes and small businesses generates steady requests for both household helpers and office boys for nearby shops and offices.",
          ur: "جناح کالونی فیصل آباد کے تجارتی مرکز کے قریب واقع ہے، اور گھروں اور چھوٹے کاروباروں کی آمیزش قریبی دکانوں اور دفاتر کے لیے گھریلو ہیلپرز اور آفس بوائے دونوں کی مستقل طلب پیدا کرتی ہے۔",
        },
      },
      {
        slug: "eden-valley-faisalabad",
        name: { en: "Eden Valley", ur: "ایڈن ویلی" },
        shortDesc: {
          en: "A newer planned development popular with young families.",
          ur: "نوجوان خاندانوں میں مقبول ایک نئی منصوبہ بند ڈویلپمنٹ۔",
        },
        intro: {
          en: "Eden Valley is a newer, still-growing development, and many households here are setting up staff for the first time in a new home, we often place a cook, helper and cleaner together for these first-time setups.",
          ur: "ایڈن ویلی ایک نئی، ابھی بڑھتی ہوئی ڈویلپمنٹ ہے، اور یہاں کے بہت سے گھرانے نئے گھر میں پہلی بار عملہ رکھ رہے ہیں, ہم اکثر ان پہلی مرتبہ کے انتظامات کے لیے باورچی، ہیلپر اور صفائی کے عملے کو ایک ساتھ تعینات کرتے ہیں۔",
        },
      },
      {
        slug: "citi-housing-faisalabad",
        name: { en: "Citi Housing Faisalabad", ur: "سٹی ہاؤسنگ فیصل آباد" },
        shortDesc: {
          en: "A gated, modern community with a growing resident base.",
          ur: "بڑھتی ہوئی آبادی کے ساتھ ایک محفوظ، جدید کمیونٹی۔",
        },
        intro: {
          en: "Citi Housing Faisalabad's gated layout means staff need to register at the community's security desk, similar to DHA and Bahria societies elsewhere, we verify CNIC and address details upfront so this is a formality, not a delay, on move-in day.",
          ur: "سٹی ہاؤسنگ فیصل آباد کی محفوظ ترتیب کا مطلب ہے کہ عملے کو کمیونٹی کے سیکیورٹی ڈیسک پر رجسٹر ہونا ضروری ہے، دیگر جگہوں کی ڈی ایچ اے اور بحریہ سوسائٹیز کی طرح, ہم شناختی کارڈ اور پتے کی تفصیلات پہلے سے تصدیق کرتے ہیں تاکہ یہ منتقلی کے دن ایک رسمی کارروائی ہو، تاخیر نہیں۔",
        },
      },
      {
        slug: "peoples-colony-faisalabad",
        name: { en: "People's Colony", ur: "پیپلز کالونی" },
        shortDesc: {
          en: "A well-known, established residential area popular with local families.",
          ur: "مقامی خاندانوں میں مقبول ایک معروف اور مستحکم رہائشی علاقہ۔",
        },
        intro: {
          en: "People's Colony is one of Faisalabad's better-known older residential areas, with a strong base of established local families. Word-of-mouth hiring is still common here, and we're an increasingly popular verified alternative for families who want the same trust without the guesswork.",
          ur: "پیپلز کالونی فیصل آباد کے زیادہ معروف پرانے رہائشی علاقوں میں سے ایک ہے، جہاں مقامی خاندانوں کی مضبوط بنیاد ہے۔ یہاں منہ زبانی بھرتی اب بھی عام ہے، اور ہم ان خاندانوں کے لیے ایک تیزی سے مقبول تصدیق شدہ متبادل بن رہے ہیں جو اندازوں کے بغیر وہی بھروسہ چاہتے ہیں۔",
        },
      },
    ],
  },
  {
    slug: "multan",
    image: "/images/cities/multan.webp",
    imageAlt: {
      en: "The historic Shrine of Shah Rukn-e-Alam in Multan",
      ur: "ملتان میں تاریخی مزار شاہ رکنِ عالم",
    },
    name: { en: "Multan", ur: "ملتان" },
    shortDesc: {
      en: "Verified domestic staff across Multan, from DHA Multan to Cantt and Gulgasht Colony.",
      ur: "ملتان بھر میں تصدیق شدہ گھریلو عملہ، ڈی ایچ اے ملتان سے چھاؤنی اور گلگشت کالونی تک۔",
    },
    intro: {
      en: "The City of Saints is also one of South Punjab's fastest-growing residential markets. RX Direct places verified cooks, drivers, helpers, cleaners, guards and office boys across Multan, with the same rigorous verification process used in every city we serve.",
      ur: "اولیاء کا شہر جنوبی پنجاب کی تیزی سے بڑھتی ہوئی رہائشی مارکیٹوں میں سے ایک بھی ہے۔ آر ایکس ڈائریکٹ ملتان بھر میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتا ہے، ہر شہر میں استعمال ہونے والے اسی سخت تصدیقی عمل کے ساتھ۔",
    },
    societies: [
      {
        slug: "dha-multan",
        name: { en: "DHA Multan", ur: "ڈی ایچ اے ملتان" },
        shortDesc: {
          en: "South Punjab's largest housing project, spanning roughly 9,500 acres in Phase 1 alone.",
          ur: "جنوبی پنجاب کا سب سے بڑا ہاؤسنگ پراجیکٹ، صرف فیز ون میں تقریباً 9,500 ایکڑ پر مشتمل۔",
        },
        intro: {
          en: "DHA Multan is South Punjab's largest housing project, with its first phase alone spanning roughly 9,500 acres across six phases. Given the scale, staff comfort with gate security and CNIC-based entry is essential, the same standard we apply to every DHA placement nationwide.",
          ur: "ڈی ایچ اے ملتان جنوبی پنجاب کا سب سے بڑا ہاؤسنگ پراجیکٹ ہے، جس کا صرف پہلا فیز چھ فیزز میں تقریباً 9,500 ایکڑ پر پھیلا ہوا ہے۔ اس وسعت کے پیشِ نظر، عملے کا گیٹ سیکیورٹی اور شناختی کارڈ پر مبنی داخلے سے باآسانی ہم آہنگ ہونا ضروری ہے, وہی معیار جو ہم ملک بھر میں ہر ڈی ایچ اے تعیناتی پر لاگو کرتے ہیں۔",
        },
      },
      {
        slug: "wapda-town-multan",
        name: { en: "Wapda Town", ur: "واپڈا ٹاؤن" },
        shortDesc: {
          en: "An MDA-approved society near Bosan Road and the Northern Bypass.",
          ur: "بوسن روڈ اور ناردرن بائی پاس کے قریب ایم ڈی اے سے منظور شدہ سوسائٹی۔",
        },
        intro: {
          en: "Wapda Town Multan is administered by the Wapda Employees Cooperative Housing Society and sits near the Northern Bypass and Bosan Road. Most requests from the area are for daily cooks and helpers serving established, mid-sized family homes.",
          ur: "واپڈا ٹاؤن ملتان کا انتظام واپڈا ایمپلائیز کوآپریٹو ہاؤسنگ سوسائٹی کے پاس ہے اور یہ ناردرن بائی پاس اور بوسن روڈ کے قریب واقع ہے۔ اس علاقے سے زیادہ تر درخواستیں مستحکم، درمیانے سائز کے خاندانی گھروں کی خدمت کرنے والے روزانہ باورچیوں اور ہیلپرز کے لیے ہوتی ہیں۔",
        },
      },
      {
        slug: "gulgasht-colony-multan",
        name: { en: "Gulgasht Colony", ur: "گلگشت کالونی" },
        shortDesc: {
          en: "An established residential area popular for its rental housing market.",
          ur: "اپنی کرائے کی رہائش کی مارکیٹ کے لیے معروف ایک مستحکم رہائشی علاقہ۔",
        },
        intro: {
          en: "Gulgasht Colony has a large rental housing market alongside long-term resident families, which means our placements here range from short-term arrangements for newer tenants to long-standing live-in staff for established households.",
          ur: "گلگشت کالونی میں طویل مدتی رہائش پذیر خاندانوں کے ساتھ کرائے کی رہائش کی بڑی مارکیٹ ہے، جس کا مطلب ہے کہ یہاں ہماری تقرریاں نئے کرایہ داروں کے لیے مختصر مدتی انتظامات سے لے کر مستحکم گھرانوں کے لیے دیرینہ لِیو اِن عملے تک پھیلی ہوئی ہیں۔",
        },
      },
      {
        slug: "multan-cantt",
        name: { en: "Multan Cantt", ur: "ملتان چھاؤنی" },
        shortDesc: {
          en: "The cantonment area, with its own entry and security expectations.",
          ur: "چھاؤنی کا علاقہ، اپنی داخلے اور سیکیورٹی کی توقعات کے ساتھ۔",
        },
        intro: {
          en: "Multan Cantt households expect the same disciplined, security-conscious standard common to cantonment areas nationwide, CNIC verification and a police character certificate are standard for any guard placement here, not an exception.",
          ur: "ملتان چھاؤنی کے گھرانے ملک بھر کے چھاؤنی علاقوں میں عام اسی نظم و ضبط اور سیکیورٹی سے آگاہ معیار کی توقع رکھتے ہیں, یہاں کسی بھی گارڈ کی تعیناتی کے لیے شناختی کارڈ کی تصدیق اور پولیس کریکٹر سرٹیفکیٹ ایک استثناء نہیں بلکہ معیاری طریقہ کار ہے۔",
        },
      },
      {
        slug: "citi-housing-multan",
        name: { en: "Citi Housing Multan", ur: "سٹی ہاؤسنگ ملتان" },
        shortDesc: {
          en: "A modern gated community near Bosan Road.",
          ur: "بوسن روڈ کے قریب ایک جدید محفوظ کمیونٹی۔",
        },
        intro: {
          en: "Citi Housing Multan sits right off Bosan Road and has attracted a wave of newer households over the past few years, many of them staffing a home for the first time, which is where our full-team placements (cook, helper and guard together) come in most often.",
          ur: "سٹی ہاؤسنگ ملتان بوسن روڈ کے بالکل قریب واقع ہے اور گزشتہ چند سالوں میں نئے گھرانوں کی ایک لہر کو اپنی جانب متوجہ کیا ہے, ان میں سے بہت سے پہلی بار گھر میں عملہ رکھ رہے ہیں، جہاں ہماری مکمل ٹیم کی تعیناتی (باورچی، ہیلپر اور گارڈ ایک ساتھ) سب سے زیادہ کام آتی ہے۔",
        },
      },
      {
        slug: "bosan-road-multan",
        name: { en: "Bosan Road Area", ur: "بوسن روڈ ایریا" },
        shortDesc: {
          en: "A major residential and commercial corridor with several housing schemes nearby.",
          ur: "قریبی کئی ہاؤسنگ اسکیموں کے حامل ایک اہم رہائشی و تجارتی راستہ۔",
        },
        intro: {
          en: "The Bosan Road corridor connects several of Multan's newer housing schemes, and drivers placed in this area need to be comfortable navigating between them daily, school runs and office commutes here often cross multiple society boundaries in a single trip.",
          ur: "بوسن روڈ کوریڈور ملتان کی کئی نئی ہاؤسنگ اسکیموں کو آپس میں ملاتا ہے، اور اس علاقے میں تعینات ڈرائیورز کو روزانہ ان کے درمیان سفر کرنے میں باآسانی ہم آہنگ ہونا ضروری ہے, یہاں اسکول اور دفتر کی آمدورفت اکثر ایک ہی سفر میں متعدد سوسائٹیوں کی حدود عبور کرتی ہے۔",
        },
      },
    ],
  },
  {
    slug: "peshawar",
    image: "/images/cities/peshawar.webp",
    imageAlt: {
      en: "Islamia College, one of Peshawar's most recognized landmarks",
      ur: "اسلامیہ کالج، پشاور کی معروف ترین عمارتوں میں سے ایک",
    },
    name: { en: "Peshawar", ur: "پشاور" },
    shortDesc: {
      en: "Verified domestic staff across Peshawar, from Hayatabad to DHA Peshawar and Cantt.",
      ur: "پشاور بھر میں تصدیق شدہ گھریلو عملہ، حیات آباد سے ڈی ایچ اے پشاور اور چھاؤنی تک۔",
    },
    intro: {
      en: "Peshawar's blend of established townships and newer gated developments means household staffing needs vary widely. RX Direct places verified cooks, drivers, helpers, cleaners, guards and office boys across Peshawar, with the same background-checking process used in every city we serve.",
      ur: "پشاور میں مستحکم ٹاؤن شپس اور نئی محفوظ ڈویلپمنٹس کی آمیزش کا مطلب ہے کہ گھریلو عملے کی ضروریات میں کافی فرق ہے۔ آر ایکس ڈائریکٹ پشاور بھر میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتا ہے، ہر شہر میں استعمال ہونے والے اسی پس منظر کی جانچ کے عمل کے ساتھ۔",
    },
    societies: [
      {
        slug: "hayatabad",
        name: { en: "Hayatabad", ur: "حیات آباد" },
        shortDesc: {
          en: "Peshawar's largest planned township, developed across multiple phases.",
          ur: "پشاور کی سب سے بڑی منصوبہ بند ٹاؤن شپ، متعدد فیزز میں تعمیر شدہ۔",
        },
        intro: {
          en: "Hayatabad is Peshawar's largest and most organized planned township, developed across multiple numbered phases. Its scale and well-established infrastructure mean it's one of our most active areas in the city, with steady demand across all eight staff categories we offer.",
          ur: "حیات آباد پشاور کی سب سے بڑی اور منظم منصوبہ بند ٹاؤن شپ ہے، جو متعدد نمبردار فیزز میں تعمیر کی گئی ہے۔ اس کی وسعت اور مستحکم بنیادی ڈھانچے کا مطلب ہے کہ یہ شہر میں ہمارے سب سے فعال علاقوں میں سے ایک ہے، جہاں ہماری تمام آٹھ عملے کی اقسام کی مستقل طلب ہے۔",
        },
      },
      {
        slug: "university-town-peshawar",
        name: { en: "University Town", ur: "یونیورسٹی ٹاؤن" },
        shortDesc: {
          en: "An established area near the University of Peshawar and Islamia College.",
          ur: "جامعہ پشاور اور اسلامیہ کالج کے قریب ایک مستحکم علاقہ۔",
        },
        intro: {
          en: "University Town sits near the University of Peshawar and Islamia College, and its long-established academic and professional families tend to prefer live-in cooks and helpers with genuine, verifiable long-term references over short-term arrangements.",
          ur: "یونیورسٹی ٹاؤن جامعہ پشاور اور اسلامیہ کالج کے قریب واقع ہے، اور یہاں کے دیرینہ تعلیمی و پیشہ ور خاندان مختصر مدتی انتظامات کے بجائے حقیقی، قابلِ تصدیق طویل مدتی حوالہ جات کے حامل لِیو اِن باورچی اور ہیلپرز کو ترجیح دیتے ہیں۔",
        },
      },
      {
        slug: "dha-peshawar",
        name: { en: "DHA Peshawar", ur: "ڈی ایچ اے پشاور" },
        shortDesc: {
          en: "A newer DHA development bringing gated-community standards to Peshawar.",
          ur: "پشاور میں محفوظ کمیونٹی کے معیارات لانے والی نئی ڈی ایچ اے ڈویلپمنٹ۔",
        },
        intro: {
          en: "DHA Peshawar is a newer development that's brought the same gated, security-desk standard familiar from other DHA cities to Peshawar. As the community continues to fill in, we're seeing steady demand from first-time households setting up a full staff team at once.",
          ur: "ڈی ایچ اے پشاور ایک نئی ڈویلپمنٹ ہے جس نے دیگر ڈی ایچ اے شہروں سے مانوس وہی محفوظ اور سیکیورٹی ڈیسک کا معیار پشاور میں متعارف کرایا ہے۔ جیسے جیسے کمیونٹی آباد ہوتی جا رہی ہے، ہمیں پہلی بار عملہ رکھنے والے گھرانوں کی طرف سے مکمل ٹیم بیک وقت رکھنے کی مستقل طلب دیکھنے کو مل رہی ہے۔",
        },
      },
      {
        slug: "regi-model-town",
        name: { en: "Regi Model Town", ur: "ریگی ماڈل ٹاؤن" },
        shortDesc: {
          en: "A large Peshawar Development Authority project spread across five zones.",
          ur: "پانچ زونز پر پھیلا ہوا پشاور ڈویلپمنٹ اتھارٹی کا ایک بڑا منصوبہ۔",
        },
        intro: {
          en: "Regi Model Town is a large Peshawar Development Authority project spread across five separate zones near the University of Peshawar and Khyber Teaching Hospital. Given its size, drivers placed here need genuine familiarity with which zone a household is in, not just the general area.",
          ur: "ریگی ماڈل ٹاؤن پشاور ڈویلپمنٹ اتھارٹی کا ایک بڑا منصوبہ ہے جو جامعہ پشاور اور خیبر ٹیچنگ ہسپتال کے قریب پانچ الگ زونز پر پھیلا ہوا ہے۔ اس کی وسعت کے پیشِ نظر، یہاں تعینات ڈرائیورز کو صرف عمومی علاقے کی نہیں بلکہ گھرانہ کس زون میں ہے اس کی حقیقی واقفیت ہونی چاہیے۔",
        },
      },
      {
        slug: "peshawar-cantt",
        name: { en: "Peshawar Cantt", ur: "پشاور چھاؤنی" },
        shortDesc: {
          en: "The cantonment area, home to a large military and civil-service community.",
          ur: "ایک بڑی فوجی اور سول سروس کمیونٹی کا گھر، چھاؤنی کا علاقہ۔",
        },
        intro: {
          en: "Peshawar Cantt is home to a large military and civil-service community, and follows the same disciplined entry and documentation standards common to cantonment areas across the country, CNIC verification and a clean record are non-negotiable for any placement here.",
          ur: "پشاور چھاؤنی ایک بڑی فوجی اور سول سروس کمیونٹی کا گھر ہے، اور ملک بھر کے چھاؤنی علاقوں میں عام اسی نظم و ضبط کے داخلے اور دستاویزات کے معیار کی پیروی کرتی ہے, یہاں کسی بھی تعیناتی کے لیے شناختی کارڈ کی تصدیق اور صاف ریکارڈ ناگزیر ہیں۔",
        },
      },
      {
        slug: "warsak-road-peshawar",
        name: { en: "Warsak Road", ur: "وارثک روڈ" },
        shortDesc: {
          en: "A well-known residential and commercial corridor on the city's edge.",
          ur: "شہر کے کنارے پر ایک معروف رہائشی و تجارتی راستہ۔",
        },
        intro: {
          en: "The Warsak Road corridor mixes established homes with newer commercial development, and households here often need a driver comfortable with both city-center commutes and the quieter, more spread-out stretches further along the road.",
          ur: "وارثک روڈ کوریڈور مستحکم گھروں کو نئی تجارتی ترقی کے ساتھ ملاتا ہے، اور یہاں کے گھرانوں کو اکثر ایسے ڈرائیور کی ضرورت ہوتی ہے جو شہر کے مرکز کی آمدورفت اور روڈ کے آگے زیادہ خاموش اور پھیلے ہوئے حصوں دونوں سے باآسانی ہم آہنگ ہو۔",
        },
      },
    ],
  },
  {
    slug: "gujranwala",
    image: "/images/cities/gujranwala.webp",
    imageAlt: {
      en: "Nishan-e-Manzil, a historic landmark in Gujranwala",
      ur: "نشانِ منزل، گوجرانوالہ کی ایک تاریخی یادگار",
    },
    name: { en: "Gujranwala", ur: "گوجرانوالہ" },
    shortDesc: {
      en: "Verified domestic staff across Gujranwala, from DHA Gujranwala to Model Town and Satellite Town.",
      ur: "گوجرانوالہ بھر میں تصدیق شدہ گھریلو عملہ، ڈی ایچ اے گوجرانوالہ سے ماڈل ٹاؤن اور سیٹلائٹ ٹاؤن تک۔",
    },
    intro: {
      en: "Gujranwala's growing industrial economy has brought a wave of new housing societies alongside its older, established neighborhoods. RX Direct places verified cooks, drivers, helpers, cleaners, guards and office boys across Gujranwala, with the same rigorous verification process used nationwide.",
      ur: "گوجرانوالہ کی بڑھتی ہوئی صنعتی معیشت اپنے پرانے مستحکم محلوں کے ساتھ نئی ہاؤسنگ سوسائٹیز کی لہر لے کر آئی ہے۔ آر ایکس ڈائریکٹ گوجرانوالہ بھر میں تصدیق شدہ باورچی، ڈرائیور، ہیلپرز، صفائی کا عملہ، گارڈز اور آفس بوائے تعینات کرتا ہے، ملک بھر میں استعمال ہونے والے اسی سخت تصدیقی عمل کے ساتھ۔",
    },
    societies: [
      {
        slug: "dha-gujranwala",
        name: { en: "DHA Gujranwala", ur: "ڈی ایچ اے گوجرانوالہ" },
        shortDesc: {
          en: "A newer DHA development quickly building a strong reputation in the city.",
          ur: "شہر میں تیزی سے مضبوط ساکھ بنانے والی نئی ڈی ایچ اے ڈویلپمنٹ۔",
        },
        intro: {
          en: "DHA Gujranwala is a newer entrant to the city's housing market that's quickly built a strong reputation. As with every DHA society we serve, gate registration and CNIC verification are standard for staff here, we handle this upfront so it's never a first-day surprise.",
          ur: "ڈی ایچ اے گوجرانوالہ شہر کی ہاؤسنگ مارکیٹ میں ایک نیا داخلہ ہے جس نے تیزی سے مضبوط ساکھ بنائی ہے۔ ہر ڈی ایچ اے سوسائٹی کی طرح جہاں ہم خدمات فراہم کرتے ہیں، یہاں عملے کے لیے گیٹ رجسٹریشن اور شناختی کارڈ کی تصدیق معیاری طریقہ کار ہے, ہم یہ پہلے سے سنبھال لیتے ہیں تاکہ یہ کبھی پہلے دن کی حیرانی نہ بنے۔",
        },
      },
      {
        slug: "model-town-gujranwala",
        name: { en: "Model Town", ur: "ماڈل ٹاؤن" },
        shortDesc: {
          en: "A well-organized, self-sustaining neighborhood southwest of central Gujranwala.",
          ur: "وسطی گوجرانوالہ کے جنوب مغرب میں ایک منظم اور خود کفیل محلہ۔",
        },
        intro: {
          en: "Model Town Gujranwala is known for its large houses, organized streets and easy access to schools and hospitals, the kind of established, family-oriented area where households tend to want a long-term cook and helper rather than short-term or occasional staff.",
          ur: "ماڈل ٹاؤن گوجرانوالہ اپنے بڑے گھروں، منظم سڑکوں اور اسکولوں و ہسپتالوں تک آسان رسائی کے لیے معروف ہے, یہ ایک ایسا مستحکم اور خاندان دوست علاقہ ہے جہاں گھرانے عام طور پر مختصر مدتی یا کبھی کبھار عملے کے بجائے طویل مدتی باورچی اور ہیلپر چاہتے ہیں۔",
        },
      },
      {
        slug: "satellite-town-gujranwala",
        name: { en: "Satellite Town", ur: "سیٹلائٹ ٹاؤن" },
        shortDesc: {
          en: "One of Gujranwala's oldest and most prestigious residential areas, established in 1950.",
          ur: "1950 میں قائم گوجرانوالہ کے قدیم ترین اور معتبر ترین رہائشی علاقوں میں سے ایک۔",
        },
        intro: {
          en: "Satellite Town is one of Gujranwala's oldest planned residential areas, established in 1950 along Daska Road with a grid-based layout. Its long-settled, multi-generational families tend to place high value on genuinely verifiable staff references, informal word-of-mouth hiring is being phased out here in favor of a more structured process.",
          ur: "سیٹلائٹ ٹاؤن گوجرانوالہ کے قدیم ترین منصوبہ بند رہائشی علاقوں میں سے ایک ہے، جو 1950 میں ڈسکہ روڈ کے ساتھ گرڈ پر مبنی ترتیب کے ساتھ قائم کیا گیا تھا۔ یہاں کے دیرینہ، کئی نسلوں پر مشتمل خاندان عملے کے حقیقی طور پر قابلِ تصدیق حوالہ جات کو زیادہ اہمیت دیتے ہیں, غیر رسمی منہ زبانی بھرتی یہاں ایک زیادہ منظم عمل کے حق میں کم ہوتی جا رہی ہے۔",
        },
      },
      {
        slug: "citi-housing-gujranwala",
        name: { en: "Citi Housing Gujranwala", ur: "سٹی ہاؤسنگ گوجرانوالہ" },
        shortDesc: {
          en: "A modern gated community popular with newer, growing families.",
          ur: "نئے اور بڑھتے ہوئے خاندانوں میں مقبول ایک جدید محفوظ کمیونٹی۔",
        },
        intro: {
          en: "Citi Housing Gujranwala has attracted a wave of newer, growing families over the past few years, many of them staffing a home for the first time, first-time full-team placements (cook, helper, guard) are among our most common requests from the area.",
          ur: "سٹی ہاؤسنگ گوجرانوالہ نے گزشتہ چند سالوں میں نئے اور بڑھتے ہوئے خاندانوں کی ایک لہر کو اپنی جانب متوجہ کیا ہے، ان میں سے بہت سے پہلی بار گھر میں عملہ رکھ رہے ہیں, پہلی بار مکمل ٹیم کی تعیناتی (باورچی، ہیلپر، گارڈ) اس علاقے سے ہماری سب سے عام درخواستوں میں شامل ہے۔",
        },
      },
      {
        slug: "palm-city-gujranwala",
        name: { en: "Palm City", ur: "پام سٹی" },
        shortDesc: {
          en: "A newer development gaining popularity among prospective buyers.",
          ur: "ممکنہ خریداروں میں مقبولیت حاصل کرنے والی ایک نئی ڈویلپمنٹ۔",
        },
        intro: {
          en: "Palm City is one of Gujranwala's newer, fast-growing developments, and as it fills in we're seeing the same first-time-household pattern common to other new societies, families setting up a full staff roster at once rather than adding roles gradually.",
          ur: "پام سٹی گوجرانوالہ کی نئی، تیزی سے بڑھتی ہوئی ڈویلپمنٹس میں سے ایک ہے، اور جیسے جیسے یہ آباد ہوتی جا رہی ہے، ہمیں دیگر نئی سوسائٹیز میں عام وہی پہلی بار گھرانے کا انداز دیکھنے کو مل رہا ہے, خاندان بتدریج کردار شامل کرنے کے بجائے بیک وقت مکمل عملے کی فہرست ترتیب دے رہے ہیں۔",
        },
      },
      {
        slug: "dc-colony-gujranwala",
        name: { en: "DC Colony", ur: "ڈی سی کالونی" },
        shortDesc: {
          en: "An established residential pocket popular with local professional families.",
          ur: "مقامی پیشہ ور خاندانوں میں مقبول ایک مستحکم رہائشی علاقہ۔",
        },
        intro: {
          en: "DC Colony is a smaller, established residential pocket popular with local professional families, where daily cooks and part-time helpers are the most common requests, most households here prefer flexible, hourly arrangements over full-time live-in staff.",
          ur: "ڈی سی کالونی ایک چھوٹا، مستحکم رہائشی علاقہ ہے جو مقامی پیشہ ور خاندانوں میں مقبول ہے، جہاں روزانہ باورچی اور جز وقتی ہیلپرز سب سے عام درخواستیں ہیں, یہاں کے زیادہ تر گھرانے مکمل وقتی لِیو اِن عملے کے بجائے لچکدار، فی گھنٹہ انتظامات کو ترجیح دیتے ہیں۔",
        },
      },
    ],
  },
];

export const cities: City[] = rawCities.map((c) => {
  const override = getCityImageOverride(c.slug);
  if (!override) return c;
  return {
    ...c,
    image: override.image?.trim() || c.image,
    imageAlt: override.alt?.trim() ? { ...c.imageAlt, en: override.alt.trim() } : c.imageAlt,
  };
});

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getSocietyBySlug(citySlug: string, societySlug: string) {
  const city = getCityBySlug(citySlug);
  if (!city) return undefined;
  const society = city.societies.find((s) => s.slug === societySlug);
  if (!society) return undefined;
  return { city, society };
}
