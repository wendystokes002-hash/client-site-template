import type { Metadata, Viewport } from "next";
import { site, onBrand } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.intro,
  openGraph: { title: site.name, description: site.intro, type: "website" },
  alternates: site.url ? { canonical: "/" } : undefined,
};

export const viewport: Viewport = { themeColor: site.brand };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const style = { "--brand": site.brand, "--on-brand": onBrand(site.brand) } as React.CSSProperties;
  return (
    <html lang="en" style={style}>
      <body>{children}</body>
    </html>
  );
}
