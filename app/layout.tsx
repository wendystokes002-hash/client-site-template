import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { getSite, onBrand } from "@/lib/site";
import { Footer, Header } from "@/components/Layout";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: site.url ? new URL(site.url) : undefined,
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.intro,
    openGraph: { title: site.name, description: site.intro, type: "website", siteName: site.name, ...(site.heroImage && !site.heroImage.startsWith("data:") && { images: [site.heroImage] }) },
    ...(site.logo && !site.logo.startsWith("data:") && { icons: { icon: site.logo } }),
  };
}

export async function generateViewport(): Promise<Viewport> {
  return { themeColor: (await getSite()).brand };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  const style = { "--brand": site.brand, "--on-brand": onBrand(site.brand) } as React.CSSProperties;
  return (
    <html lang="en" data-style={site.style} style={style}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header site={site} />
        <main id="main">{children}</main>
        <Footer site={site} />
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
