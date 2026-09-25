import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url || "";
  return ["", "/privacy"].map((p) => ({ url: `${base}${p}` || "/", lastModified: new Date() }));
}
