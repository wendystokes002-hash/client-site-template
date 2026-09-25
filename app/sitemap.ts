import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = site.url || "";
  const paths = ["", "/about", "/services", ...site.services.map((s) => `/services/${s.slug}`), "/faq", "/contact", "/privacy", "/terms"];
  return paths.map((p) => ({ url: `${base}${p}` || "/", lastModified: new Date() }));
}
