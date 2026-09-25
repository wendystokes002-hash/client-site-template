/**
 * Insight Meridian — client website suspension check
 * ----------------------------------------------------
 * Built in: this template already includes the suspension check.
 *   - Next.js 16+: keep the file name proxy.ts
 *   - Next.js 13–15: rename to middleware.ts and rename the function to `middleware`
 *
 * Set CRM_URL below (or env var IMW_CRM_URL) to your Client Manager address.
 * When you click "Suspend website" in the CRM, this site shows a neutral
 * "temporarily unavailable" page within ~1 minute. Restore reverses it.
 * If the CRM can't be reached, the site stays ONLINE (fails open).
 */
import { NextResponse, type NextRequest } from "next/server";

const CRM_URL = process.env.IMW_CRM_URL || "https://portal.insightmeridiangroup.com";

export async function proxy(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  try {
    const res = await fetch(`${CRM_URL}/api/site-status?domain=${encodeURIComponent(host)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    const { status } = (await res.json()) as { status?: string };
    if (status === "suspended") {
      return new NextResponse(PAGE, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": "86400", "Cache-Control": "no-store" },
      });
    }
  } catch {
    /* fail open: never take a site down because the check failed */
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals and static files
  matcher: ["/((?!_next/|favicon|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$).*)"],
};

const PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Temporarily unavailable</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1e293b}
main{max-width:30rem;padding:2rem;text-align:center}h1{font-size:1.5rem;margin:0 0 .75rem}p{color:#475569;line-height:1.6;margin:0}</style></head>
<body><main><h1>This website is temporarily unavailable</h1><p>We&rsquo;re sorry for the inconvenience. Please check back soon.</p></main></body></html>`;
