import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url || "";
  const paths = ["", "/about", "/services", ...site.services.map((s) => `/services/${s.slug}`), "/faq", "/contact", "/privacy", "/terms"];
  return paths.map((p) => ({ url: `${base}${p}` || "/", lastModified: new Date() }));
}
