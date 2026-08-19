// ─────────────────────────────────────────────────────────────
// InventiveClicks — central content source of truth.
// All copy here is original. Edit this one file to rebrand copy,
// contact details, services, work and testimonials site-wide.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "InventiveClicks",
  legalName: "InventiveClicks",
  domain: "inventiveclicks.com",
  url: "https://inventiveclicks.com",
  tagline: "Ideas that click.",
  description:
    "InventiveClicks is a creative digital marketing agency crafting video animation, graphic design, creative marketing campaigns and influencer marketing that turn attention into growth.",
  foundingYear: 2019,
  // Contact — replace placeholders with real details before launch.
  email: "hello@inventiveclicks.com",
  phone: "+1 (555) 012-3400",
  phoneHref: "tel:+15550123400",
  whatsappHref: "https://wa.me/15550123400",
  address: {
    street: "123 Creative Avenue, Suite 400",
    city: "Austin",
    region: "TX",
    postal: "78701",
    country: "US",
  },
  socials: {
    instagram: "https://instagram.com/inventiveclicks",
    linkedin: "https://linkedin.com/company/inventiveclicks",
    youtube: "https://youtube.com/@inventiveclicks",
    behance: "https://behance.net/inventiveclicks",
    x: "https://x.com/inventiveclicks",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Services ───────────────────────────────────────────────────
// The four the client leads with (video animation, graphic design,
// creative marketing, influencer marketing) come first, followed by
// two complementary offerings that round out a full-service agency.
export const services = [
  {
    slug: "video-animation",
    icon: "video",
    name: "Video Animation",
    short: "Scroll-stopping motion",
    tagline: "Motion that makes people watch to the end.",
    summary:
      "2D & 3D motion graphics, explainer videos, product animation and social-first edits engineered to hold attention and drive action.",
    accent: "brand",
    deliverables: [
      "Explainer & product videos",
      "2D / 3D motion graphics",
      "Social reels & shorts",
      "Logo stings & brand intros",
      "Animated ads & VFX",
      "Storyboards & scripts",
    ],
    outcomes: [
      { stat: "3.4x", label: "avg. watch-through vs. static" },
      { stat: "48 hr", label: "first-cut turnaround" },
    ],
    intro:
      "Great motion isn't decoration — it's the fastest way to make a complex idea instantly obvious. Our animators pair a story-first script with crafted frames so every second earns the next.",
    process: [
      { title: "Script & storyboard", text: "We shape the message and map every beat before a single frame moves." },
      { title: "Design & style frames", text: "You approve the look — palette, type, motion language — up front." },
      { title: "Animate & sound", text: "Frame-perfect animation, sound design and mix, built for silent-autoplay feeds." },
      { title: "Deliver everywhere", text: "Exports sized for every platform: 16:9, 9:16, 1:1, plus captions." },
    ],
    faqs: [
      {
        q: "How long does an animated video take?",
        a: "A 30–60 second explainer typically takes 2–3 weeks end to end. Social reels can turn around in 48–72 hours once the style is locked.",
      },
      {
        q: "Do you write the script too?",
        a: "Yes. Scriptwriting, storyboarding, voiceover casting and sound design are all included — you can hand us a rough idea and we take it the rest of the way.",
      },
    ],
  },
  {
    slug: "graphic-design",
    icon: "palette",
    name: "Graphic Design",
    short: "Brand-perfect visuals",
    tagline: "Design that looks like you meant it.",
    summary:
      "Brand identity, social creative, packaging and print built on a consistent system — so every touchpoint feels unmistakably yours.",
    accent: "azure",
    deliverables: [
      "Logo & brand identity",
      "Social media creative",
      "Packaging & print",
      "Pitch decks & one-pagers",
      "Ad & display banners",
      "Brand guideline systems",
    ],
    outcomes: [
      { stat: "1 system", label: "everything on-brand, everywhere" },
      { stat: "100+", label: "assets shipped per retainer month" },
    ],
    intro:
      "We design the system, not just the asset. A clear visual language means your team can move fast and every post, deck and product still looks like it came from the same place.",
    process: [
      { title: "Brand audit", text: "We study your market, voice and current assets to find the gaps." },
      { title: "Direction", text: "Two or three distinct design routes — you pick the one that fits." },
      { title: "Build the system", text: "Type, color, grid, iconography and templates your team can run with." },
      { title: "Handover", text: "Organized files, guidelines and editable templates in Figma & Canva." },
    ],
    faqs: [
      {
        q: "Can you work within our existing brand?",
        a: "Absolutely. We can extend and modernize your current identity, or build a new one from scratch — whichever the project calls for.",
      },
      {
        q: "Do we get editable source files?",
        a: "Every engagement ships organized, editable source files plus templates so your team can keep creating on-brand between projects.",
      },
    ],
  },
  {
    slug: "creative-marketing",
    icon: "spark",
    name: "Creative Marketing",
    short: "Campaigns that convert",
    tagline: "Big ideas, measured in results.",
    summary:
      "Full-funnel campaign strategy, content and performance creative — concepts built to be felt and tuned to convert.",
    accent: "pink",
    deliverables: [
      "Campaign strategy & concepts",
      "Content calendars",
      "Performance ad creative",
      "Landing pages & funnels",
      "Copywriting & messaging",
      "A/B creative testing",
    ],
    outcomes: [
      { stat: "-38%", label: "avg. cost per acquisition" },
      { stat: "full-funnel", label: "awareness to conversion" },
    ],
    intro:
      "Creativity without a number attached is just art. We build campaigns around a clear business goal, then use rapid creative testing to double down on what actually moves it.",
    process: [
      { title: "Insight", text: "We find the one true thing about your audience worth building on." },
      { title: "Concept", text: "A campaign platform that flexes across every channel and format." },
      { title: "Produce", text: "Copy, design and motion, produced at the volume performance needs." },
      { title: "Optimize", text: "Weekly testing loops — kill the losers, scale the winners." },
    ],
    faqs: [
      {
        q: "Do you run the ad accounts too?",
        a: "We can own creative only, or manage the full media buy across Meta, Google, TikTok and LinkedIn — including budget, targeting and reporting.",
      },
      {
        q: "How do you measure a campaign?",
        a: "Every campaign starts with one primary metric and a target. We report against it weekly, with clear read-outs on what's working and what changes next.",
      },
    ],
  },
  {
    slug: "influencer-marketing",
    icon: "megaphone",
    name: "Influencer Marketing",
    short: "Creators that fit",
    tagline: "The right voices, the real numbers.",
    summary:
      "Creator partnerships, UGC and end-to-end campaign management with vetted talent, tracked deliverables and transparent reporting.",
    accent: "coral",
    deliverables: [
      "Creator sourcing & vetting",
      "UGC content production",
      "Whitelisting & paid amplification",
      "Contracts & campaign management",
      "Seeding & gifting programs",
      "Performance reporting",
    ],
    outcomes: [
      { stat: "5,000+", label: "vetted creators in network" },
      { stat: "real reach", label: "audiences checked for authenticity" },
    ],
    intro:
      "Influence works when the fit is real. We match you with creators whose audience genuinely overlaps yours, handle the messy middle — briefs, contracts, approvals — and prove impact with clean reporting.",
    process: [
      { title: "Match", text: "We shortlist creators by audience fit, authenticity and past performance." },
      { title: "Brief", text: "Clear creative briefs that protect the brand and free the creator." },
      { title: "Manage", text: "Contracts, timelines, approvals and payments — handled end to end." },
      { title: "Amplify", text: "Turn the best-performing posts into paid ads that keep working." },
    ],
    faqs: [
      {
        q: "How do you pick creators?",
        a: "We screen for real, engaged audiences — not just follower counts — using audience overlap, engagement quality and authenticity checks before anyone gets shortlisted.",
      },
      {
        q: "Do you handle contracts and payments?",
        a: "Yes. Sourcing, negotiation, contracts, content approvals and creator payments are all managed by us, so you get finished content and a clean report.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    icon: "share",
    name: "Social Media Marketing",
    short: "Always-on presence",
    tagline: "Show up sharp, every single day.",
    summary:
      "Channel management, community building and paid social that keep your brand consistent, current and growing across every feed.",
    accent: "azure",
    deliverables: [
      "Channel management",
      "Content production",
      "Community management",
      "Paid social buying",
      "Analytics & reporting",
      "Trend & format strategy",
    ],
    outcomes: [
      { stat: "daily", label: "consistent, on-brand posting" },
      { stat: "one team", label: "strategy, creative & community" },
    ],
    intro:
      "Being everywhere isn't the goal — being unmistakable is. We run your channels as one system: a content engine, a community desk and a paid layer that turns organic wins into reach.",
    process: [
      { title: "Strategy", text: "Channel plan, content pillars and a voice that fits each platform." },
      { title: "Create", text: "A steady stream of native content built for how people actually scroll." },
      { title: "Engage", text: "Real community management — replies, DMs and conversation, not silence." },
      { title: "Grow", text: "Paid amplification on the posts already proving themselves organically." },
    ],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "Instagram, TikTok, LinkedIn, YouTube, Facebook and X. We recommend focusing budget on the two or three where your audience actually is, rather than spreading thin.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "We create it end to end — concept, design, motion, captions — then publish, engage and report. Scheduling-only is available if you already have a content engine.",
      },
    ],
  },
  {
    slug: "web-design-development",
    icon: "code",
    name: "Web Design & Development",
    short: "Sites that perform",
    tagline: "Fast, findable, built to convert.",
    summary:
      "High-performance websites and landing pages engineered for speed, SEO and conversion — the home base every campaign points to.",
    accent: "brand",
    deliverables: [
      "Marketing websites",
      "Landing pages & funnels",
      "Next.js / headless builds",
      "Technical & on-page SEO",
      "Core Web Vitals tuning",
      "Analytics & CRO setup",
    ],
    outcomes: [
      { stat: "95+", label: "typical Lighthouse score" },
      { stat: "SEO-first", label: "built to be found & cited" },
    ],
    intro:
      "Your website is where paid, social and influence all cash out. We build fast, accessible, search-optimized sites — with structured data baked in — so both people and AI answer engines understand you.",
    process: [
      { title: "Architecture", text: "Sitemap, wireframes and a conversion plan before design begins." },
      { title: "Design", text: "Beautiful, on-brand pages designed mobile-first and accessible." },
      { title: "Build", text: "Clean, fast code with structured data and analytics from day one." },
      { title: "Optimize", text: "Speed, SEO and conversion tuning after launch, backed by data." },
    ],
    faqs: [
      {
        q: "What do you build sites with?",
        a: "Modern stacks like Next.js and headless CMSs for speed and SEO — or Webflow and WordPress when the client's team needs to self-manage. We match the tool to your team.",
      },
      {
        q: "Is SEO included?",
        a: "Technical SEO, on-page structure, structured data and Core Web Vitals tuning are built in — the same generative-AI-ready SEO approach this very site is built on.",
      },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

// ── Company stats ──────────────────────────────────────────────
export const stats = [
  { value: "250+", label: "Brands served" },
  { value: "1,200+", label: "Projects delivered" },
  { value: "5,000+", label: "Creators in network" },
  { value: "6", label: "Years of clicks" },
];

// ── How we work ────────────────────────────────────────────────
export const process = [
  {
    step: "01",
    title: "Discover",
    text: "We dig into your goals, audience and market until we find the sharpest angle — then agree on the one metric that matters.",
  },
  {
    step: "02",
    title: "Design the plan",
    text: "A clear strategy and creative platform, scoped with timelines and owners. No mystery, no fluff — a plan you can see.",
  },
  {
    step: "03",
    title: "Create & launch",
    text: "Our animators, designers and marketers produce at pace, ship on schedule and go live across the right channels.",
  },
  {
    step: "04",
    title: "Measure & scale",
    text: "We track against the goal, cut what underperforms and pour fuel on what works — week after week.",
  },
];

// ── Why choose us ──────────────────────────────────────────────
export const whyUs = [
  {
    icon: "spark",
    title: "One team, every discipline",
    text: "Strategy, motion, design, influence and web under one roof — so nothing gets lost in the handoff.",
  },
  {
    icon: "target",
    title: "Creative tied to numbers",
    text: "Every idea ships with a target. We make work that's felt and prove that it performed.",
  },
  {
    icon: "bolt",
    title: "Built to move fast",
    text: "Reels in 48 hours, first cuts in days, weekly test loops. Momentum is a feature.",
  },
  {
    icon: "shield",
    title: "Transparent by default",
    text: "Clear scopes, shared dashboards and honest reporting. You always know where things stand.",
  },
];

// ── Portfolio / work ───────────────────────────────────────────
export const work = [
  {
    slug: "lumen-skincare",
    title: "Lumen Skincare",
    category: "Creative Marketing",
    service: "creative-marketing",
    result: "3.1x return on ad spend",
    blurb: "A full-funnel launch campaign that turned a new serum into a sell-out in eight weeks.",
    tags: ["Strategy", "Performance creative", "Paid social"],
    accent: "pink",
  },
  {
    slug: "northwind-fintech",
    title: "Northwind",
    category: "Video Animation",
    service: "video-animation",
    result: "2.4M explainer views",
    blurb: "A 60-second animated explainer that made a complex fintech product finally click.",
    tags: ["Script", "2D animation", "Sound design"],
    accent: "brand",
  },
  {
    slug: "vertex-apparel",
    title: "Vertex Apparel",
    category: "Influencer Marketing",
    service: "influencer-marketing",
    result: "48 creators, 9.2M reach",
    blurb: "A creator-led drop campaign with vetted talent and paid whitelisting amplification.",
    tags: ["Creator sourcing", "UGC", "Whitelisting"],
    accent: "coral",
  },
  {
    slug: "atlas-coffee",
    title: "Atlas Coffee Co.",
    category: "Graphic Design",
    service: "graphic-design",
    result: "Full rebrand + packaging",
    blurb: "A ground-up identity system and retail packaging that doubled shelf standout.",
    tags: ["Brand identity", "Packaging", "Guidelines"],
    accent: "azure",
  },
  {
    slug: "helio-saas",
    title: "Helio",
    category: "Web Design & Development",
    service: "web-design-development",
    result: "98 Lighthouse, +64% signups",
    blurb: "A blazing-fast Next.js marketing site with structured data and CRO built in.",
    tags: ["Next.js", "SEO", "CRO"],
    accent: "brand",
  },
  {
    slug: "bloom-social",
    title: "Bloom",
    category: "Social Media Marketing",
    service: "social-media-marketing",
    result: "0 to 180k in 6 months",
    blurb: "An always-on social engine that grew a wellness brand from launch to a real community.",
    tags: ["Channel management", "Content", "Community"],
    accent: "azure",
  },
];

// ── Testimonials ───────────────────────────────────────────────
export const testimonials = [
  {
    quote:
      "InventiveClicks felt less like an agency and more like the most creative part of our own team. The animation work alone paid for itself in a month.",
    name: "Priya Natarajan",
    role: "VP Marketing, Northwind",
    rating: 5,
  },
  {
    quote:
      "They matched us with creators who actually fit — and the reporting was so clean I could forward it straight to our board.",
    name: "Marcus Bell",
    role: "Founder, Vertex Apparel",
    rating: 5,
  },
  {
    quote:
      "Our rebrand finally looks like the company we're becoming. Every deck, post and package is unmistakably us now.",
    name: "Elena Fischer",
    role: "CEO, Atlas Coffee Co.",
    rating: 5,
  },
  {
    quote:
      "Cost per acquisition down 40% in one quarter. Big ideas, but always with a number attached. That's rare.",
    name: "David Okonkwo",
    role: "Growth Lead, Lumen Skincare",
    rating: 5,
  },
];

// ── Pricing ────────────────────────────────────────────────────
export const pricing = [
  {
    name: "Launch",
    price: "$2,400",
    cadence: "/ project",
    for: "One-off campaigns & single deliverables",
    features: [
      "One service, scoped tightly",
      "Dedicated project lead",
      "2 rounds of revisions",
      "Source files & handover",
      "2–3 week delivery",
    ],
    cta: "Start a project",
    featured: false,
  },
  {
    name: "Growth",
    price: "$4,900",
    cadence: "/ month",
    for: "Brands that need consistent, multi-channel output",
    features: [
      "Multi-service retainer",
      "Strategy + creative + reporting",
      "Priority 48-hour turnarounds",
      "Monthly performance review",
      "Shared dashboard access",
      "Unlimited async requests",
    ],
    cta: "Book a strategy call",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "",
    for: "Full-funnel programs & influencer at scale",
    features: [
      "Everything in Growth",
      "Influencer program management",
      "Paid media buying",
      "Dedicated creative pod",
      "Quarterly strategy offsites",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

// ── Insights / blog ────────────────────────────────────────────
export const insights = [
  {
    slug: "generative-ai-seo",
    title: "Generative AI is the new front page — is your brand citable?",
    category: "SEO",
    read: "6 min read",
    date: "2026-02-04",
    excerpt:
      "Answer engines don't rank ten blue links — they cite one source. Here's how to structure content so AI recommends you.",
    body: [
      { text: "For twenty years, SEO meant one thing: earn a spot on a page of ten blue links and hope for the click. That page is quietly disappearing. When someone asks an AI assistant for \"the best digital marketing agency for video\", they don't get ten options — they get an answer, sometimes with a single brand named in it. The game has changed from ranking to being cited." },
      { heading: "Why citations beat rankings", text: "Large language models don't browse the way people do. They synthesize. When a model answers a question, it draws on the sources it can most confidently understand and attribute. If your content is ambiguous, unstructured or buried in marketing fluff, the model skips you and cites the competitor who made themselves easy to quote." },
      { heading: "Structure is the new keyword", text: "The single biggest lever is structured data. Clear schema.org markup — Organization, Service, FAQPage, Article — tells a machine exactly what your page is, who you are and what you offer. It's the difference between hoping an engine infers your business and telling it plainly. This very website is built with layered JSON-LD for exactly that reason." },
      { heading: "Write answers, not essays", text: "Answer engines love content that states a claim and immediately supports it. Lead with the takeaway. Use plain, declarative sentences. Add an FAQ section that answers the real questions people ask — verbatim. Publish an llms.txt file that summarizes your business for crawlers. Each of these makes you fractionally easier to quote, and quotability compounds." },
      { heading: "The takeaway", text: "Generative-AI optimization isn't a rebrand of SEO — it's a shift in who you're writing for. Half your audience is now a model deciding whether you're a trustworthy source. Make your expertise structured, specific and easy to cite, and you become the brand the AI recommends." },
    ],
  },
  {
    slug: "short-form-video-that-converts",
    title: "The anatomy of a short-form video that actually converts",
    category: "Video",
    read: "5 min read",
    date: "2026-01-21",
    excerpt:
      "The first 1.5 seconds decide everything. A frame-by-frame breakdown of hooks that stop the scroll.",
    body: [
      { text: "A short-form video lives or dies in its first second and a half. That's roughly how long a viewer gives you before their thumb decides your fate. Everything else — the story, the product, the call to action — only matters if the hook earns the right to be seen." },
      { heading: "Open on motion or a question", text: "Static openers get scrolled past. Start mid-motion, mid-gesture or mid-sentence so the viewer feels they've walked in on something already happening. A visual pattern-break or a question they can't help answering buys you the next three seconds." },
      { heading: "Design for sound-off", text: "The majority of feed video is watched muted. If your message depends on audio, most people never receive it. Burn in captions, let the visuals carry the story, and treat sound as an enhancement rather than a requirement. When the mix does play, it should reward the viewer, not inform them." },
      { heading: "One idea, one video", text: "The instinct to cram three benefits into thirty seconds is the fastest way to communicate none of them. Pick a single, sharp idea per video. If you have three things to say, make three videos — the algorithm rewards volume of focused content far more than density." },
      { heading: "Earn the CTA", text: "By the time you ask for the click, the viewer should already want it. The strongest calls to action feel like the natural next step, not an interruption. Show the outcome, make it desirable, then point the way." },
    ],
  },
  {
    slug: "vetting-influencers",
    title: "How to vet an influencer in 10 minutes (and spot fake reach)",
    category: "Influencer",
    read: "7 min read",
    date: "2026-01-09",
    excerpt:
      "Follower counts lie. The five signals we check before any creator makes it onto a client shortlist.",
    body: [
      { text: "A big follower count is the easiest metric to fake and the least useful to trust. Before any creator makes it onto a client shortlist, we run a quick five-signal check that separates genuine influence from inflated vanity numbers — and it takes about ten minutes." },
      { heading: "1. Engagement quality, not quantity", text: "Look past the like count to the comments. Are they specific and conversational, or a wall of generic emoji and \"nice post\"? Real audiences ask questions and tell stories. Bought engagement is bland and repetitive." },
      { heading: "2. Follower growth shape", text: "Healthy accounts grow in a steady line with natural bumps around viral moments. Sudden vertical spikes with no corresponding content usually mean a purchase. Most analytics tools will show you the curve in seconds." },
      { heading: "3. Audience overlap", text: "The point isn't reach — it's the right reach. A creator with 40,000 followers who genuinely overlaps your customer is worth more than a million mismatched eyeballs. We check audience geography, age and interests against the brand's actual buyers." },
      { heading: "4. Comment-to-like ratio", text: "A suspiciously high like count paired with almost no comments is a classic bot signature. Genuine communities talk back. The ratio should feel human." },
      { heading: "5. Brand-safety history", text: "A quick scroll through past partnerships and public posts tells you whether a creator aligns with the brand's values — and whether they've been in any controversies worth knowing about before you attach your name to theirs." },
      { heading: "The takeaway", text: "Influence is about fit and authenticity, not follower math. Spend ten minutes on these five signals and you'll avoid the expensive mistake of paying for an audience that was never really there." },
    ],
  },
];

// ── General FAQs (home + contact) ──────────────────────────────
export const faqs = [
  {
    q: "What kind of businesses do you work with?",
    a: "From funded startups to established brands across e-commerce, SaaS, wellness, food & beverage and lifestyle. If you have something worth talking about, we can help more people click on it.",
  },
  {
    q: "Can I hire you for just one service?",
    a: "Yes. Start with a single project — an explainer video, a rebrand, one campaign — or plug us in as a full retainer across video, design, marketing and influence. We scale to fit.",
  },
  {
    q: "How fast can you start?",
    a: "Most projects kick off within a week of a signed scope. Social reels and urgent creative can often start within 48 hours once we've aligned on direction.",
  },
  {
    q: "How do you price your work?",
    a: "Project-based for one-off deliverables and monthly retainers for ongoing work. Every engagement is scoped and quoted up front, so you always know what you're paying for.",
  },
  {
    q: "Do you work with brands outside the US?",
    a: "Absolutely — we're remote-first and work with brands worldwide across time zones, delivering everything digitally.",
  },
  {
    q: "How do you make sure the work actually performs?",
    a: "Every engagement starts with one primary metric and a target. We report against it, run creative tests, and optimize — so you get work that's both beautiful and accountable.",
  },
];

// ── Client logos (wordmarks rendered as text) ──────────────────
export const clients = [
  "Lumen", "Northwind", "Vertex", "Atlas", "Helio", "Bloom", "Cadence", "Orbit",
];

export const footerLinks = {
  Services: services.slice(0, 5).map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  Company: [
    { label: "About us", href: "/about" },
    { label: "Our work", href: "/work" },
    { label: "Contact", href: "/contact" },
    { label: "Services", href: "/services" },
  ],
};
