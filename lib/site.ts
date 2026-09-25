/**
 * ALL WEBSITE CONTENT LIVES IN THIS FILE.
 *
 * Values read from process.env are filled in automatically when the site is
 * created from Insight Meridian Client Manager (Vercel → Settings →
 * Environment Variables). You can also replace them with plain text here.
 * After editing, commit + push in GitHub Desktop — Vercel redeploys by itself.
 */
const env = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);

export type Style = "modern" | "classic" | "bold";

const name = env(process.env.NEXT_PUBLIC_SITE_NAME, "Your Business Name");
const city = env(process.env.NEXT_PUBLIC_CITY, "");
const where = city ? ` in ${city}` : "";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const serviceNames = env(process.env.NEXT_PUBLIC_SERVICES, "Our services, Consultations, Support")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const site = {
  name,
  tagline: env(process.env.NEXT_PUBLIC_TAGLINE, "Quality service you can trust"),
  intro: `${name} helps customers${where} with friendly, reliable service — from the first conversation to the finished job.`,
  city,
  email: env(process.env.NEXT_PUBLIC_EMAIL, ""),
  phone: env(process.env.NEXT_PUBLIC_PHONE, ""),
  address: env(process.env.NEXT_PUBLIC_ADDRESS, ""),
  hours: env(process.env.NEXT_PUBLIC_HOURS, "Monday – Friday, 9:00 AM – 5:00 PM"),
  brand: env(process.env.NEXT_PUBLIC_BRAND_COLOR, "#0B1B34"),
  style: (["modern", "classic", "bold"].includes(process.env.NEXT_PUBLIC_STYLE || "") ? process.env.NEXT_PUBLIC_STYLE : "modern") as Style,
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "").replace(/\/$/, ""),
  // Optional: a Formspree (or similar) form address. Without it, the contact form opens the visitor's email app.
  formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT, ""),

  /** Services — each one gets its own page at /services/<name>. Edit the text freely. */
  services: serviceNames.map((title) => ({
    title,
    slug: slugify(title),
    summary: `Expert help with ${title.toLowerCase()} — tailored to what you need, with clear pricing and no surprises.`,
    details: [
      `When it comes to ${title.toLowerCase()}, we start by listening. We take time to understand what you need, explain the options in plain language and give you a clear price before any work begins.`,
      `Every job is carried out carefully by experienced people who take pride in their work — and we keep you updated from start to finish.`,
    ],
    benefits: ["Clear, upfront pricing", "Experienced, friendly team", "Reliable scheduling", "Work done right the first time"],
  })),

  reasons: [
    { title: "Experienced team", text: "Skilled people who take pride in doing the job right the first time." },
    { title: "Clear, fair pricing", text: "Honest quotes up front, so you always know what you’re paying for." },
    { title: "Fast response", text: "We reply quickly and turn up when we say we will." },
  ],

  about: {
    story: [
      `${name} was started with a simple idea: customers deserve great work, clear communication and people they can rely on.`,
      `Today we help customers${where} with ${serviceNames.slice(0, 3).join(", ").toLowerCase()}${serviceNames.length > 3 ? " and more" : ""}. Many of our customers come to us through recommendations — something we’re proud of and work hard to earn.`,
    ],
    values: [
      { title: "Quality", text: "We do the job properly, not quickly and badly." },
      { title: "Honesty", text: "Straight answers and fair prices — no hidden extras." },
      { title: "Respect", text: "For your time, your home or business, and your budget." },
    ],
    /** Add real team members to show a Team section, e.g. { name: "Jane Doe", role: "Owner" } */
    team: [] as { name: string; role: string }[],
  },

  /**
   * Testimonials are hidden until you add REAL reviews from real customers
   * (with their permission), e.g. { quote: "Great service!", name: "Sam R.", detail: "Austin" }
   */
  testimonials: [] as { quote: string; name: string; detail?: string }[],

  faq: [
    { q: "How do I get a quote?", a: "Send us a message through the contact page or give us a call. Tell us a little about what you need and we’ll get back to you quickly with next steps and a clear price." },
    { q: "Which areas do you serve?", a: city ? `We’re based in ${city} and serve customers in the surrounding area. Not sure if we cover you? Just ask.` : "Get in touch and tell us where you are — we’ll let you know straight away if we can help." },
    { q: "How quickly can you start?", a: "It depends on the job and our schedule, but we always reply promptly and give you a realistic start date." },
    { q: "How do I pay?", a: "We accept common payment methods. Payment details are included with your quote or invoice." },
    { q: "What if I’m not happy with the work?", a: "Tell us. We take every concern seriously and will work with you to put things right." },
  ],

  credit: { text: "Website by Insight Meridian Group", url: "https://insightmeridiangroup.com" },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const tel = site.phone.replace(/[^+\d]/g, "");

/** Black or white text, whichever reads better on the brand colour. */
export const onBrand = (hex: string) => {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "#ffffff";
  const [r, g, b] = m.slice(1).map((x) => parseInt(x, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? "#111827" : "#ffffff";
};

export const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
