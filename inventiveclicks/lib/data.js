// ---------------------------------------------------------------------------
// InventiveClicks — all site content lives here.
// Swap copy/colours freely; every page reads from this single source.
// `palette` = [from, to] hex pair used by the generated SVG posters/avatars.
// `icon`    = a lucide-react icon name (mapped in components/visuals/Icon.jsx).
// ---------------------------------------------------------------------------

export const site = {
  name: "InventiveClicks",
  domain: "inventiveclicks.com",
  tagline: "Creative digital marketing that compounds.",
  description:
    "InventiveClicks is a creative digital marketing agency helping ambitious brands grow with SEO, paid media, social, content and conversion-focused design.",
  email: "hello@inventiveclicks.com",
  phone: "+1 (415) 555-0142",
  phoneHref: "tel:+14155550142",
  address: "500 Market Street, Suite 12, San Francisco, CA",
  hours: "Mon–Fri · 9:00–18:00 PST",
  socials: [
    { label: "Instagram", short: "Ig", href: "https://instagram.com" },
    { label: "LinkedIn", short: "In", href: "https://linkedin.com" },
    { label: "X / Twitter", short: "X", href: "https://x.com" },
    { label: "Dribbble", short: "Dr", href: "https://dribbble.com" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", desc: "Who we are & how we think" },
      { label: "Our Team", href: "/team", desc: "The people behind the work" },
      { label: "Pricing", href: "/pricing", desc: "Simple, scalable plans" },
      { label: "Contact", href: "/contact", desc: "Start a conversation" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services", desc: "The full toolkit" },
      { label: "SEO", href: "/services/seo", desc: "Compound organic growth" },
      { label: "Paid Media / PPC", href: "/services/ppc", desc: "Profitable ad scaling" },
      { label: "Social Media", href: "/services/social-media", desc: "Culture-first content" },
      { label: "Web & CRO", href: "/services/web-design", desc: "Sites that convert" },
    ],
  },
  {
    label: "Work",
    href: "/projects",
    children: [
      { label: "Case Studies", href: "/projects", desc: "Outcomes we're proud of" },
      { label: "Northwind Organics", href: "/projects/northwind", desc: "312% revenue growth" },
      { label: "Lumen Fintech", href: "/projects/lumen", desc: "41% lower CAC" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export const hero = {
  eyebrow: "Digital marketing agency",
  titleLines: ["We turn", "clicks into", "compounding growth"],
  emphasis: "clicks",
  subtitle:
    "InventiveClicks is a full-funnel creative agency. We blend strategy, performance media and design to grow the brands people can't stop clicking.",
  ctaPrimary: { label: "Start a project", href: "/contact" },
  ctaSecondary: { label: "See our work", href: "/projects" },
  marquee: [
    "SEO",
    "Paid Social",
    "Google Ads",
    "Branding",
    "Content",
    "Web Design",
    "CRO",
    "Email",
    "Analytics",
    "Strategy",
  ],
  stats: [
    { value: 480, suffix: "+", label: "Projects shipped" },
    { value: 5.4, suffix: "x", label: "Average ROAS", decimals: 1 },
    { value: 96, suffix: "%", label: "Client retention" },
  ],
};

export const clients = [
  "Northwind",
  "Lumen",
  "Verde",
  "Atlas",
  "Bloomly",
  "Pulse",
  "Kinetic",
  "Nova",
  "Cobalt",
  "Meridian",
];

export const services = [
  {
    slug: "seo",
    icon: "Search",
    title: "Search Engine Optimization",
    tagline: "Own the results that matter",
    excerpt:
      "Technical, content and authority work that turns organic search into a durable, compounding channel.",
    palette: ["#c8f94e", "#5eead4"],
    features: [
      "Technical SEO & Core Web Vitals",
      "Programmatic & topical content",
      "Digital PR & link acquisition",
      "Local & international SEO",
    ],
    deliverables: [
      "Full technical audit & roadmap",
      "Keyword & topic architecture",
      "Monthly content production",
      "Rank & revenue reporting",
    ],
    metric: { value: "312%", label: "avg. organic revenue lift" },
  },
  {
    slug: "ppc",
    icon: "MousePointerClick",
    title: "Paid Media & PPC",
    tagline: "Scale spend, protect margin",
    excerpt:
      "Full-funnel paid search, shopping and social that scales profitably against the metrics your CFO cares about.",
    palette: ["#a78bfa", "#c8f94e"],
    features: [
      "Google, Bing & Shopping",
      "Meta, TikTok & LinkedIn ads",
      "Creative testing at scale",
      "Bidding & budget engineering",
    ],
    deliverables: [
      "Account restructure & build",
      "Weekly optimisation cadence",
      "Creative & landing tests",
      "Blended ROAS dashboards",
    ],
    metric: { value: "41%", label: "lower cost per acquisition" },
  },
  {
    slug: "social-media",
    icon: "Share2",
    title: "Social Media Marketing",
    tagline: "Be the brand people follow",
    excerpt:
      "Culture-first content and community management that earns attention and turns followers into customers.",
    palette: ["#5eead4", "#a78bfa"],
    features: [
      "Organic content & calendars",
      "Short-form video production",
      "Community & DM management",
      "Influencer & creator programs",
    ],
    deliverables: [
      "Channel strategy & tone",
      "12–20 assets / month",
      "Community management",
      "Growth & engagement reports",
    ],
    metric: { value: "8.9x", label: "avg. engagement growth" },
  },
  {
    slug: "content",
    icon: "PenLine",
    title: "Content Marketing",
    tagline: "Words that rank and resonate",
    excerpt:
      "Editorial, SEO and thought-leadership content engineered to attract, educate and convert your audience.",
    palette: ["#fb923c", "#c8f94e"],
    features: [
      "Editorial strategy & briefs",
      "Long-form & SEO articles",
      "Lead magnets & whitepapers",
      "Email & newsletter content",
    ],
    deliverables: [
      "Content strategy & calendar",
      "8–12 pieces / month",
      "On-page SEO optimisation",
      "Performance reporting",
    ],
    metric: { value: "3x", label: "more qualified traffic" },
  },
  {
    slug: "web-design",
    icon: "Code2",
    title: "Web Design & CRO",
    tagline: "Sites built to convert",
    excerpt:
      "High-performance websites and landing pages, continuously optimised so every click has somewhere brilliant to land.",
    palette: ["#60a5fa", "#a78bfa"],
    features: [
      "Conversion-first UX & UI",
      "Next.js & Webflow builds",
      "Landing page systems",
      "A/B & multivariate testing",
    ],
    deliverables: [
      "Design & prototype",
      "Development & launch",
      "Experiment roadmap",
      "CRO reporting",
    ],
    metric: { value: "+68%", label: "avg. conversion rate" },
  },
  {
    slug: "branding",
    icon: "Palette",
    title: "Branding & Creative",
    tagline: "Identity with a point of view",
    excerpt:
      "Distinctive brand systems, messaging and campaign creative that make you impossible to ignore.",
    palette: ["#f472b6", "#c8f94e"],
    features: [
      "Brand strategy & positioning",
      "Visual identity systems",
      "Campaign concepts",
      "Motion & ad creative",
    ],
    deliverables: [
      "Brand platform & guidelines",
      "Logo & identity kit",
      "Creative templates",
      "Launch campaign assets",
    ],
    metric: { value: "2.4x", label: "brand recall lift" },
  },
  {
    slug: "email",
    icon: "Mail",
    title: "Email & Automation",
    tagline: "Revenue on autopilot",
    excerpt:
      "Lifecycle email, SMS and marketing automation that squeezes more value from every subscriber and lead.",
    palette: ["#34d399", "#5eead4"],
    features: [
      "Klaviyo & HubSpot builds",
      "Lifecycle & flow strategy",
      "Segmentation & personalisation",
      "SMS & push programs",
    ],
    deliverables: [
      "Flow architecture",
      "Campaign calendar",
      "Design & copy",
      "Deliverability & revenue reports",
    ],
    metric: { value: "38%", label: "of revenue from email" },
  },
  {
    slug: "analytics",
    icon: "BarChart3",
    title: "Analytics & Insights",
    tagline: "Decisions you can trust",
    excerpt:
      "Clean measurement, attribution and dashboards so you always know what's working — and what to do next.",
    palette: ["#c8f94e", "#60a5fa"],
    features: [
      "GA4 & server-side tracking",
      "Attribution modelling",
      "Looker & BI dashboards",
      "Experimentation frameworks",
    ],
    deliverables: [
      "Measurement plan",
      "Tracking implementation",
      "Live dashboards",
      "Insight & action reports",
    ],
    metric: { value: "100%", label: "of spend, accounted for" },
  },
];

export const counters = [
  { value: 480, suffix: "+", label: "Projects delivered" },
  { value: 5.4, suffix: "x", label: "Average client ROAS", decimals: 1 },
  { value: 96, suffix: "%", label: "Client retention rate" },
  { value: 120, suffix: "M+", prefix: "$", label: "Revenue generated" },
];

export const process = [
  {
    no: "01",
    icon: "Compass",
    title: "Discover",
    text: "We dig into your data, market and customers to find the real levers of growth — not vanity metrics.",
  },
  {
    no: "02",
    icon: "PenTool",
    title: "Strategy",
    text: "A clear, prioritised roadmap that maps channels, budget and creative to measurable business outcomes.",
  },
  {
    no: "03",
    icon: "Rocket",
    title: "Create & Launch",
    text: "Our strategists, designers and media buyers build campaigns and ship them fast, with quality baked in.",
  },
  {
    no: "04",
    icon: "LineChart",
    title: "Optimise & Scale",
    text: "We test relentlessly, double down on winners and compound results month over month.",
  },
];

export const about = {
  eyebrow: "Who we are",
  title: "A senior team obsessed with your numbers",
  lead:
    "We started InventiveClicks because most agencies optimise for activity, not outcomes. We flipped it. Every strategist here is measured on the growth we create for the brands we serve.",
  paragraphs: [
    "Founded in 2016, we're a tight, senior team of strategists, performance marketers, designers and analysts. No account-manager telephone game — you work directly with the people doing the work.",
    "We blend the creativity of a studio with the rigour of a growth team. That means brand you're proud of and a spreadsheet your CFO loves, at the same time.",
  ],
  values: [
    {
      icon: "Target",
      title: "Outcomes over output",
      text: "We're judged on revenue, pipeline and ROAS — not decks and impressions.",
    },
    {
      icon: "Eye",
      title: "Radical transparency",
      text: "Live dashboards, honest reporting and a clear view of exactly where your budget goes.",
    },
    {
      icon: "Sparkles",
      title: "Creativity with rigour",
      text: "Bold ideas, tested hard. If it doesn't move a number, it doesn't ship.",
    },
    {
      icon: "HeartHandshake",
      title: "Partners, not vendors",
      text: "We plug into your team, share your goals and stay for the long game.",
    },
  ],
  milestones: [
    { year: "2016", text: "InventiveClicks founded in San Francisco" },
    { year: "2019", text: "Crossed $20M in client revenue generated" },
    { year: "2022", text: "Opened creative studio & in-house video" },
    { year: "2026", text: "480+ projects, teams across 3 time zones" },
  ],
};

export const projects = [
  {
    slug: "northwind",
    client: "Northwind Organics",
    title: "Scaling an organic grocery brand to 8 figures",
    category: "E-commerce",
    year: "2025",
    palette: ["#c8f94e", "#34d399"],
    excerpt:
      "A full-funnel rebuild of paid social and SEO took a regional organics brand national.",
    services: ["Paid Media", "SEO", "CRO", "Email"],
    metrics: [
      { value: "312%", label: "Revenue growth" },
      { value: "5.8x", label: "Blended ROAS" },
      { value: "-34%", label: "Cost per order" },
    ],
    challenge:
      "Northwind had loyal regional customers but flat growth and a paid account bleeding budget on branded terms. Organic visibility outside their home state was near zero.",
    solution:
      "We restructured the ad account around prospecting cohorts, rebuilt the Shopify PDP and checkout for conversion, and launched a programmatic SEO engine targeting recipe and ingredient intent. A new lifecycle email program recaptured abandoned carts.",
    outcome:
      "Within nine months Northwind crossed eight figures in annual revenue, tripled organic traffic and cut cost per order by a third while scaling spend 4x.",
  },
  {
    slug: "lumen",
    client: "Lumen Fintech",
    title: "Cutting CAC 41% for a Series B fintech",
    category: "SaaS / Fintech",
    year: "2025",
    palette: ["#a78bfa", "#60a5fa"],
    excerpt:
      "Full-funnel paid search plus a conversion-obsessed site rebuild dropped acquisition cost sharply.",
    services: ["PPC", "Web & CRO", "Analytics"],
    metrics: [
      { value: "-41%", label: "Cost per acquisition" },
      { value: "2.3x", label: "Qualified demos" },
      { value: "+68%", label: "Landing conversion" },
    ],
    challenge:
      "Lumen was scaling spend but CAC was climbing faster than revenue. Attribution was broken, so nobody trusted the numbers or knew which channels actually worked.",
    solution:
      "We rebuilt measurement with server-side tracking and a blended attribution model, then rearchitected the paid search account around intent tiers. A new set of landing pages and a streamlined demo flow lifted conversion across the board.",
    outcome:
      "CAC fell 41% in a single quarter, qualified demos more than doubled, and the leadership team finally had a dashboard they could take to the board with confidence.",
  },
  {
    slug: "verde",
    client: "Verde Skincare",
    title: "5.2x ROAS across Meta & TikTok for a DTC brand",
    category: "DTC / Beauty",
    year: "2024",
    palette: ["#f472b6", "#c8f94e"],
    excerpt:
      "A creative-led paid social strategy turned a founder-run skincare label into a category challenger.",
    services: ["Paid Social", "Branding", "Content"],
    metrics: [
      { value: "5.2x", label: "Blended ROAS" },
      { value: "220%", label: "New-customer growth" },
      { value: "48", label: "Winning creatives / mo" },
    ],
    challenge:
      "Verde had a beautiful product but generic ads and creative that fatigued in days. Scaling spend simply meant burning money faster.",
    solution:
      "We built a creative testing engine: a steady stream of UGC, founder stories and education-led video, all mapped to funnel stage. Winners were scaled aggressively while a refreshed brand system tied everything together.",
    outcome:
      "Verde held a 5.2x blended ROAS while tripling spend, grew new customers 220% year over year, and now ships dozens of tested creatives every month.",
  },
  {
    slug: "atlas",
    client: "Atlas Logistics",
    title: "3x qualified pipeline for a B2B logistics platform",
    category: "B2B",
    year: "2024",
    palette: ["#60a5fa", "#5eead4"],
    excerpt:
      "Account-based content plus LinkedIn media built a repeatable enterprise pipeline engine.",
    services: ["Content", "Paid Media", "SEO"],
    metrics: [
      { value: "3.1x", label: "Qualified pipeline" },
      { value: "-27%", label: "Cost per lead" },
      { value: "#1", label: "Category rankings" },
    ],
    challenge:
      "Atlas sold to enterprise ops teams with long sales cycles, but marketing was generating volume, not quality. Sales ignored most leads.",
    solution:
      "We aligned marketing and sales on ICP, launched an ABM content program around the buyer's real problems, and paired it with tightly-targeted LinkedIn and search media. SEO captured high-intent comparison queries.",
    outcome:
      "Qualified pipeline tripled within a year, cost per lead fell 27%, and Atlas now ranks first for its most valuable category terms.",
  },
  {
    slug: "bloom",
    client: "Bloom Studio",
    title: "From invisible to #1 rankings in six months",
    category: "Local / Services",
    year: "2024",
    palette: ["#34d399", "#c8f94e"],
    excerpt:
      "A local SEO and reputation program made a boutique studio the obvious choice in its city.",
    services: ["Local SEO", "Web Design", "Content"],
    metrics: [
      { value: "#1", label: "Map pack rankings" },
      { value: "+540%", label: "Organic calls" },
      { value: "4.9★", label: "Review rating" },
    ],
    challenge:
      "Bloom relied entirely on referrals. Online, competitors owned every search a potential client made.",
    solution:
      "We rebuilt the site for speed and local intent, ran a structured review-generation program, and published locally-relevant content that answered real customer questions.",
    outcome:
      "In six months Bloom claimed the top of the local map pack, grew organic phone calls more than fivefold and built a review moat competitors can't easily match.",
  },
  {
    slug: "pulse",
    client: "Pulse Fitness",
    title: "220k app installs at an $0.84 CPI",
    category: "App / Mobile",
    year: "2023",
    palette: ["#fb923c", "#a78bfa"],
    excerpt:
      "A creative-first UA strategy drove efficient installs and, more importantly, retained users.",
    services: ["Paid Social", "Creative", "Analytics"],
    metrics: [
      { value: "220k", label: "App installs" },
      { value: "$0.84", label: "Cost per install" },
      { value: "3.2x", label: "D30 retention lift" },
    ],
    challenge:
      "Pulse could buy installs, but users churned in days and the economics never worked.",
    solution:
      "We focused creative on outcomes and community, built a retention-aware measurement model, and optimised campaigns to activated users rather than raw installs. Onboarding was reworked alongside the media.",
    outcome:
      "Pulse hit 220k installs at an $0.84 CPI while more than tripling 30-day retention — turning paid growth from a leaky bucket into a real channel.",
  },
];

export const testimonials = [
  {
    quote:
      "InventiveClicks feels like our in-house growth team, not an agency. They obsess over the same numbers we do and it shows every single month.",
    name: "Elena Marsh",
    role: "VP Marketing",
    company: "Northwind Organics",
    palette: ["#c8f94e", "#34d399"],
  },
  {
    quote:
      "They cut our CAC by 41% in a quarter and, for the first time, gave us numbers the board actually trusts. Genuinely rare.",
    name: "David Okonkwo",
    role: "Co-founder & CEO",
    company: "Lumen Fintech",
    palette: ["#a78bfa", "#60a5fa"],
  },
  {
    quote:
      "The creative output is unreal. We went from fatiguing ads in days to a machine that ships winners every week.",
    name: "Sofia Reyes",
    role: "Founder",
    company: "Verde Skincare",
    palette: ["#f472b6", "#c8f94e"],
  },
  {
    quote:
      "Finally an agency that gets B2B. Marketing and sales are aligned and pipeline has never been healthier.",
    name: "Tom Bradley",
    role: "CMO",
    company: "Atlas Logistics",
    palette: ["#60a5fa", "#5eead4"],
  },
  {
    quote:
      "Transparent, senior and fast. No fluff, no hand-offs to juniors — just people who care about our results.",
    name: "Hana Suzuki",
    role: "Head of Growth",
    company: "Pulse Fitness",
    palette: ["#fb923c", "#a78bfa"],
  },
];

export const team = [
  {
    slug: "ayesha-khan",
    name: "Ayesha Khan",
    role: "Founder & Strategy Director",
    initials: "AK",
    palette: ["#c8f94e", "#34d399"],
    bio: "Ayesha founded InventiveClicks after a decade leading growth at consumer and SaaS brands. She sets strategy and keeps every engagement honest about outcomes.",
    socials: ["In", "X"],
  },
  {
    slug: "daniel-rivera",
    name: "Daniel Rivera",
    role: "Head of Paid Media",
    initials: "DR",
    palette: ["#a78bfa", "#60a5fa"],
    bio: "Daniel has managed north of $80M in ad spend across search and social. He lives in the account, not the deck.",
    socials: ["In", "X"],
  },
  {
    slug: "mia-chen",
    name: "Mia Chen",
    role: "Creative Director",
    initials: "MC",
    palette: ["#f472b6", "#c8f94e"],
    bio: "Mia leads brand and campaign creative, turning strategy into work people actually stop and click on.",
    socials: ["Dr", "In"],
  },
  {
    slug: "samuel-okafor",
    name: "Samuel Okafor",
    role: "SEO & Content Lead",
    initials: "SO",
    palette: ["#5eead4", "#60a5fa"],
    bio: "Samuel builds organic engines that compound. Technical SEO, topical authority and content that ranks and converts.",
    socials: ["In", "X"],
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Social & Community Lead",
    initials: "PN",
    palette: ["#fb923c", "#f472b6"],
    bio: "Priya turns brands into the ones people follow, blending culture, community and short-form video.",
    socials: ["Ig", "X"],
  },
  {
    slug: "lucas-meyer",
    name: "Lucas Meyer",
    role: "Analytics & CRO Lead",
    initials: "LM",
    palette: ["#c8f94e", "#60a5fa"],
    bio: "Lucas makes the numbers trustworthy — measurement, attribution and the experiments that lift conversion.",
    socials: ["In"],
  },
];

export const pricing = [
  {
    name: "Starter",
    price: "$2,400",
    period: "/ month",
    tagline: "For focused brands that need one channel done exceptionally well.",
    popular: false,
    features: [
      "One core channel (SEO, PPC or Social)",
      "Dedicated strategist",
      "Monthly strategy call",
      "Creative & content production",
      "Live performance dashboard",
    ],
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "$5,900",
    period: "/ month",
    tagline: "Our most popular plan — a full-funnel program built to compound.",
    popular: true,
    features: [
      "Up to three integrated channels",
      "Senior pod: strategy, media, creative",
      "Bi-weekly optimisation calls",
      "Landing pages & CRO testing",
      "Advanced analytics & attribution",
      "Priority creative production",
    ],
    cta: "Start growing",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    tagline: "For established brands scaling spend across every channel.",
    popular: false,
    features: [
      "Unlimited integrated channels",
      "Embedded senior growth team",
      "Weekly strategic partnership",
      "Custom creative studio output",
      "Server-side tracking & BI",
      "Executive reporting & forecasting",
    ],
    cta: "Talk to us",
  },
];

export const posts = [
  {
    slug: "ai-assisted-seo-2026",
    title: "The 2026 playbook for AI-assisted SEO",
    category: "SEO",
    date: "2026-07-28",
    read: "8 min",
    author: "Samuel Okafor",
    palette: ["#c8f94e", "#5eead4"],
    excerpt:
      "AI didn't kill SEO — it raised the bar. Here's how we use it to move faster without sacrificing quality or rankings.",
    body: [
      "Search changed more in the last eighteen months than in the previous eight years. Generative answers, AI overviews and a flood of machine-written content have reshaped what it takes to win. The brands panicking are the ones who treated SEO as a volume game.",
      "Our approach is simple: use AI to compress the boring parts of the workflow — research, clustering, briefs, internal linking — and reinvest the time we save into originality, expertise and genuine usefulness. That's the part machines still can't fake.",
      "Start with topical authority. Map the full universe of questions your customer asks, then build content that answers them better than anyone else. AI accelerates the mapping; your team supplies the point of view.",
      "Finally, measure what matters. Rankings are a proxy; revenue is the goal. Tie every piece of content to a business outcome and you'll always know where to invest next.",
    ],
  },
  {
    slug: "cut-cac-41-percent",
    title: "How we cut a client's CAC by 41% in one quarter",
    category: "Paid Media",
    date: "2026-06-14",
    read: "6 min",
    author: "Daniel Rivera",
    palette: ["#a78bfa", "#60a5fa"],
    excerpt:
      "A step-by-step teardown of the account restructure and measurement fix behind one of our favourite results.",
    body: [
      "When Lumen came to us, spend was scaling but so was cost per acquisition. The first problem wasn't the ads — it was the measurement. Nobody trusted the numbers, so nobody could make good decisions.",
      "We rebuilt tracking with a server-side setup and a blended attribution model. Suddenly the team could see which campaigns drove qualified demos, not just cheap clicks.",
      "Next came structure. We split the account into intent tiers and moved budget toward the queries that actually converted. Branded defence was tightened, and wasteful broad match was reined in.",
      "The last lever was the landing experience. New pages and a shorter demo flow lifted conversion 68%. Stack those together and CAC dropped 41% in a single quarter.",
    ],
  },
  {
    slug: "creative-testing-frameworks",
    title: "Creative testing frameworks that actually scale",
    category: "Creative",
    date: "2026-05-30",
    read: "7 min",
    author: "Mia Chen",
    palette: ["#f472b6", "#c8f94e"],
    excerpt:
      "Winning on paid social is a creative problem. Here's the system we use to ship winners every week.",
    body: [
      "On modern ad platforms, creative is the targeting. The algorithm finds the right people if you feed it the right ideas — so the real constraint is how many good ideas you can test.",
      "We organise creative around angles, not just formats. An angle is a reason to care; a format is how you express it. One strong angle can spawn a dozen executions.",
      "Every test has a hypothesis and a clear read. We hold structure constant so we're measuring the idea, not the noise, and we scale winners fast while they're fresh.",
      "The result is a flywheel: more tests, faster learning, more winners. That's what lets us hold ROAS steady even as spend climbs.",
    ],
  },
  {
    slug: "first-party-data-advantage",
    title: "First-party data is your unfair advantage",
    category: "Analytics",
    date: "2026-05-08",
    read: "5 min",
    author: "Lucas Meyer",
    palette: ["#c8f94e", "#60a5fa"],
    excerpt:
      "As third-party signals disappear, the brands that own their data win. Here's how to build that muscle now.",
    body: [
      "The cookie era is ending, and with it a lot of easy targeting. The brands that thrive are the ones investing in first-party data — information customers give you directly.",
      "It starts with capture: smart forms, quizzes, loyalty and email. Every interaction is a chance to learn something useful and permissioned.",
      "Then it's about activation. Feed clean audiences back into your platforms, personalise lifecycle messaging and model who's most likely to convert.",
      "Own your data and you're no longer renting your audience from a platform. That's a durable advantage no algorithm change can take away.",
    ],
  },
  {
    slug: "landing-pages-that-convert",
    title: "Landing pages that convert: a teardown",
    category: "CRO",
    date: "2026-04-19",
    read: "6 min",
    author: "Lucas Meyer",
    palette: ["#60a5fa", "#a78bfa"],
    excerpt:
      "Traffic is expensive. A great landing page is the cheapest growth lever most brands ignore.",
    body: [
      "You can spend months optimising campaigns, but if clicks land on a weak page, you're pouring budget through a leaky bucket. Conversion is where efficient growth is won.",
      "Great pages lead with the outcome, not the feature. They answer the visitor's real question in the first screen and remove every ounce of friction from the next step.",
      "Proof matters. Specific numbers, real customers and clear guarantees beat adjectives every time. Show, don't claim.",
      "And always be testing. A disciplined experiment roadmap turns a good page into a compounding asset that gets better every month.",
    ],
  },
  {
    slug: "tiktok-vs-meta-budget",
    title: "TikTok vs Meta: where should your budget go?",
    category: "Paid Social",
    date: "2026-03-27",
    read: "7 min",
    author: "Priya Nair",
    palette: ["#fb923c", "#f472b6"],
    excerpt:
      "It's not either/or. Here's how we decide the split — and why the answer changes as you scale.",
    body: [
      "The honest answer to 'TikTok or Meta?' is 'it depends' — but that's not very useful, so let's make it concrete.",
      "Meta is still the efficiency workhorse for most brands: mature targeting, strong measurement and reliable scale. It's usually where we anchor budget.",
      "TikTok is where culture and discovery happen. For the right creative it can be dramatically cheaper — but it rewards native, entertaining content, not repurposed TV spots.",
      "Our rule of thumb: prove the funnel on Meta, use TikTok to expand reach and lower blended costs, and let creative — not platform loyalty — decide the split.",
    ],
  },
];

export const faqs = [
  {
    q: "How quickly will we see results?",
    a: "Paid channels can move within weeks; SEO and content compound over months. We set clear milestones for each channel up front so you always know what good looks like and when to expect it.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Absolutely. We're built to plug into in-house teams — sharing dashboards, joining stand-ups and filling capability gaps rather than duplicating what you already do well.",
  },
  {
    q: "What size brands do you work with?",
    a: "From funded startups to established brands spending seven figures a year. Our Growth plan is the most common starting point; Scale is for teams running every channel at once.",
  },
  {
    q: "Are there long contracts?",
    a: "We work on rolling monthly engagements after an initial three-month runway — enough time to build, launch and start compounding, with no multi-year lock-in.",
  },
  {
    q: "Who actually does the work?",
    a: "The senior people you meet in the pitch. No bait-and-switch to juniors — strategists, media buyers and designers work directly on your account.",
  },
  {
    q: "How do you report on performance?",
    a: "Every client gets a live dashboard plus a monthly review focused on business outcomes — revenue, pipeline and ROAS — not vanity metrics.",
  },
];

export const footer = {
  blurb:
    "InventiveClicks is a creative digital marketing agency turning clicks into compounding growth for ambitious brands.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "SEO", href: "/services/seo" },
        { label: "Paid Media & PPC", href: "/services/ppc" },
        { label: "Social Media", href: "/services/social-media" },
        { label: "Web & CRO", href: "/services/web-design" },
        { label: "All services", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Our work", href: "/projects" },
        { label: "Team", href: "/team" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "hello@inventiveclicks.com", href: "mailto:hello@inventiveclicks.com" },
        { label: "+1 (415) 555-0142", href: "tel:+14155550142" },
        { label: "Start a project", href: "/contact" },
      ],
    },
  ],
};

// Small helpers used across dynamic routes
export const getService = (slug) => services.find((s) => s.slug === slug);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getPost = (slug) => posts.find((p) => p.slug === slug);

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
