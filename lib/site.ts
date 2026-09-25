/**
 * WEBSITE CONTENT
 *
 * Normally you don't edit anything here: the content is managed in
 * Insight Meridian Client Manager → client → "Website content", and this site
 * picks up changes automatically within about a minute.
 *
 * The values below are only the fall-back used when the CRM has no content
 * yet (or can't be reached). They come from the Vercel Environment Variables
 * that were filled in when the site was created.
 */
import { cache } from "react";

export type Style = "modern" | "classic" | "bold";

export type Service = { title: string; slug: string; summary: string; details: string[]; benefits: string[]; image: string };

export type Site = {
  name: string;
  tagline: string;
  intro: string;
  city: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  brand: string;
  style: Style;
  url: string;
  formEndpoint: string;
  gaId: string;
  logo: string;
  heroImage: string;
  aboutImage: string;
  services: Service[];
  reasons: { title: string; text: string }[];
  about: { story: string[]; values: { title: string; text: string }[]; team: { name: string; role: string; photo: string }[] };
  testimonials: { quote: string; name: string; detail?: string }[];
  faq: { q: string; a: string }[];
  credit: { text: string; url: string };
};

const env = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);
const str = (v: unknown, fallback = "") => (typeof v === "string" && v.trim() ? v.trim() : fallback);
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const paras = (t: string) => t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const lines = (t: string) => t.split("\n").map((p) => p.trim()).filter(Boolean);
const isStyle = (s: string): s is Style => ["modern", "classic", "bold"].includes(s);
const safeUrl = (u: string) => (/^(https:\/\/|data:image\/)/i.test(u) ? u : "");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "service";

const makeService = (title: string, summary = "", details = "", points = "", image = ""): Service => ({
  title,
  slug: slugify(title),
  summary: summary || `Expert help with ${title.toLowerCase()} — tailored to what you need, with clear pricing and no surprises.`,
  details: details
    ? paras(details)
    : [
        `When it comes to ${title.toLowerCase()}, we start by listening. We take time to understand what you need, explain the options in plain language and give you a clear price before any work begins.`,
        "Every job is carried out carefully by experienced people who take pride in their work — and we keep you updated from start to finish.",
      ],
  benefits: points ? lines(points) : ["Clear, upfront pricing", "Experienced, friendly team", "Reliable scheduling", "Work done right the first time"],
  image: safeUrl(image),
});

/** Content from the Vercel Environment Variables (fall-back). */
function fromEnv(): Site {
  const name = env(process.env.NEXT_PUBLIC_SITE_NAME, "Your Business Name");
  const city = env(process.env.NEXT_PUBLIC_CITY, "");
  const where = city ? ` in ${city}` : "";
  const style = env(process.env.NEXT_PUBLIC_STYLE, "modern");
  return {
    name,
    tagline: env(process.env.NEXT_PUBLIC_TAGLINE, "Quality service you can trust"),
    intro: `${name} helps customers${where} with friendly, reliable service — from the first conversation to the finished job.`,
    city,
    email: env(process.env.NEXT_PUBLIC_EMAIL, ""),
    phone: env(process.env.NEXT_PUBLIC_PHONE, ""),
    address: env(process.env.NEXT_PUBLIC_ADDRESS, ""),
    hours: env(process.env.NEXT_PUBLIC_HOURS, "Monday – Friday, 9:00 AM – 5:00 PM"),
    brand: env(process.env.NEXT_PUBLIC_BRAND_COLOR, "#0B1B34"),
    style: isStyle(style) ? style : "modern",
    url: env(process.env.NEXT_PUBLIC_SITE_URL, "").replace(/\/$/, ""),
    formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT, ""),
    gaId: env(process.env.NEXT_PUBLIC_GA_ID, ""),
    logo: "",
    heroImage: "",
    aboutImage: "",
    services: env(process.env.NEXT_PUBLIC_SERVICES, "Our services, Consultations, Support")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((t) => makeService(t)),
    reasons: [
      { title: "Experienced team", text: "Skilled people who take pride in doing the job right the first time." },
      { title: "Clear, fair pricing", text: "Honest quotes up front, so you always know what you’re paying for." },
      { title: "Fast response", text: "We reply quickly and turn up when we say we will." },
    ],
    about: {
      story: [
        `${name} was started with a simple idea: customers deserve great work, clear communication and people they can rely on.`,
        "Many of our customers come to us through recommendations — something we’re proud of and work hard to earn.",
      ],
      values: [
        { title: "Quality", text: "We do the job properly, not quickly and badly." },
        { title: "Honesty", text: "Straight answers and fair prices — no hidden extras." },
        { title: "Respect", text: "For your time, your home or business, and your budget." },
      ],
      team: [],
    },
    testimonials: [],
    faq: [
      { q: "How do I get a quote?", a: "Send us a message through the contact page or give us a call. Tell us a little about what you need and we’ll get back to you quickly with next steps and a clear price." },
      { q: "Which areas do you serve?", a: city ? `We’re based in ${city} and serve customers in the surrounding area. Not sure if we cover you? Just ask.` : "Get in touch and tell us where you are — we’ll let you know straight away if we can help." },
      { q: "How quickly can you start?", a: "It depends on the job and our schedule, but we always reply promptly and give you a realistic start date." },
      { q: "How do I pay?", a: "We accept common payment methods. Payment details are included with your quote or invoice." },
    ],
    credit: { text: "Website by Insight Meridian Group", url: "https://insightmeridiangroup.com" },
  };
}

/** Merge the content saved in the CRM over the fall-back. */
function merge(base: Site, c: Record<string, unknown>): Site {
  const style = str(c.style, base.style);
  const services = arr<Record<string, string>>(c.services)
    .filter((s) => str(s?.title))
    .map((s) => makeService(str(s.title), str(s.summary), str(s.details), str(s.points), str(s.image_url)));
  // make service links unique
  const seen = new Map<string, number>();
  for (const s of services) {
    const n = seen.get(s.slug) || 0;
    seen.set(s.slug, n + 1);
    if (n) s.slug = `${s.slug}-${n + 1}`;
  }
  const reasons = arr<Record<string, string>>(c.reasons).filter((r) => str(r?.title));
  const story = paras(str(c.about_story));
  return {
    ...base,
    name: str(c.name, base.name),
    tagline: str(c.tagline, base.tagline),
    intro: str(c.intro, base.intro),
    city: typeof c.city === "string" ? c.city.trim() : base.city,
    email: typeof c.email === "string" ? c.email.trim() : base.email,
    phone: typeof c.phone === "string" ? c.phone.trim() : base.phone,
    address: typeof c.address === "string" ? c.address.trim() : base.address,
    hours: str(c.hours, base.hours),
    brand: /^#[0-9a-f]{6}$/i.test(str(c.brand)) ? str(c.brand) : base.brand,
    style: isStyle(style) ? style : base.style,
    url: str(c.site_url, base.url).replace(/\/$/, ""),
    formEndpoint: /^https:\/\//.test(str(c.form_endpoint)) ? str(c.form_endpoint) : base.formEndpoint,
    gaId: /^G-[A-Z0-9]+$/i.test(str(c.ga_id)) ? str(c.ga_id).toUpperCase() : base.gaId,
    logo: safeUrl(str(c.logo_url)),
    heroImage: safeUrl(str(c.hero_image_url)),
    aboutImage: safeUrl(str(c.about_image_url)),
    services: services.length ? services : base.services,
    reasons: reasons.length ? reasons.map((r) => ({ title: str(r.title), text: str(r.text) })) : base.reasons,
    about: {
      ...base.about,
      story: story.length ? story : base.about.story,
      team: arr<Record<string, string>>(c.team)
        .filter((m) => str(m?.name))
        .map((m) => ({ name: str(m.name), role: str(m.role), photo: safeUrl(str(m.photo_url)) })),
    },
    testimonials: arr<Record<string, string>>(c.testimonials)
      .filter((t) => str(t?.quote) && str(t?.name))
      .map((t) => ({ quote: str(t.quote), name: str(t.name), detail: str(t.detail) })),
    faq: (() => {
      const f = arr<Record<string, string>>(c.faq).filter((x) => str(x?.q) && str(x?.a));
      return f.length ? f.map((x) => ({ q: str(x.q), a: str(x.a) })) : base.faq;
    })(),
  };
}

const CRM_URL = (process.env.IMW_CRM_URL || "https://portal.insightmeridiangroup.com").replace(/\/$/, "");
const SITE_ID = process.env.IMW_SITE_ID || "";

/** The website's content: CRM content if available, otherwise the fall-back. Refreshes every 60 seconds. */
export const getSite = cache(async (): Promise<Site> => {
  const base = fromEnv();
  if (!SITE_ID) return base;
  try {
    const r = await fetch(`${CRM_URL}/api/site-content?site=${encodeURIComponent(SITE_ID)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return base;
    const { content } = (await r.json()) as { content: Record<string, unknown> | null };
    return content && typeof content === "object" ? merge(base, content) : base;
  } catch {
    return base;
  }
});

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const telOf = (phone: string) => phone.replace(/[^+\d]/g, "");

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
