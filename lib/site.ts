/**
 * All the website's content lives here.
 * The values marked env(...) are filled in automatically when the site is
 * created from Insight Meridian Client Manager (Vercel → Settings →
 * Environment Variables). You can also just type the text directly here.
 */
const env = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);

const name = env(process.env.NEXT_PUBLIC_SITE_NAME, "Your Business Name");
const city = env(process.env.NEXT_PUBLIC_CITY, "");

export const site = {
  name,
  tagline: env(process.env.NEXT_PUBLIC_TAGLINE, "Quality service you can trust"),
  intro: `${name} helps customers${city ? ` in ${city}` : ""} with friendly, reliable service — from the first call to the finished job.`,
  city,
  email: env(process.env.NEXT_PUBLIC_EMAIL, ""),
  phone: env(process.env.NEXT_PUBLIC_PHONE, ""),
  address: env(process.env.NEXT_PUBLIC_ADDRESS, ""),
  hours: "Monday – Friday, 9:00 AM – 5:00 PM",
  brand: env(process.env.NEXT_PUBLIC_BRAND_COLOR, "#0B1B34"),
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "").replace(/\/$/, ""),
  services: env(process.env.NEXT_PUBLIC_SERVICES, "Our services, Consultations, Support")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((title) => ({ title, text: `Professional ${title.toLowerCase()} tailored to what you need, with clear pricing and no surprises.` })),
  reasons: [
    { title: "Experienced team", text: "Skilled people who take pride in doing the job right the first time." },
    { title: "Clear, fair pricing", text: "Honest quotes up front, so you always know what you’re paying for." },
    { title: "Fast response", text: "We reply quickly and turn up when we say we will." },
  ],
  about:
    "We are a local, customer-focused business. Our goal is simple: do great work, communicate clearly and treat every customer the way we would want to be treated.",
  credit: { text: "Website by Insight Meridian Group", url: "https://insightmeridiangroup.com" },
};

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
