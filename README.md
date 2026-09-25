# Client Site Template — Insight Meridian Group

A fast, one-page business website used by **Client Manager → Create website**.
It already includes the suspension check (`proxy.ts`), SEO basics, a sitemap and a
privacy page. The client's details are filled in automatically from the CRM.

## One-time setup (5 minutes)
1. Open **GitHub Desktop** → File → **Add local repository** → choose this folder
   → "create a repository" → name it `client-site-template` → **Publish repository**.
   **Untick "Keep this code private"** (Vercel needs to read it; there are no secrets in it).
2. Copy the repo link, e.g. `https://github.com/your-name/client-site-template`.
3. Client Manager → **Settings → Website template** → paste the link → Save.

## Creating a client website
Client → **Website setup → Create website** → check the details → **Open Vercel & create**
→ click **Deploy** in Vercel. About a minute later the site is live at `name.vercel.app`.
Paste that address back into the CRM.

## Customising a client's site afterwards
- **Text & services:** edit `lib/site.ts` in the client's own repo (the copy Vercel made),
  or change the values in Vercel → project → Settings → Environment Variables, then Redeploy.
- **Images/logo:** add them to `public/` and reference them in `app/page.tsx`.
- **Favicon:** replace `app/icon.svg`.
- Every change you push with GitHub Desktop redeploys automatically.

Changes to this template only affect **new** websites, not ones already created.

## Settings used (Vercel Environment Variables)
| Name | Example |
|---|---|
| NEXT_PUBLIC_SITE_NAME | Harbor Plumbing Co. |
| NEXT_PUBLIC_TAGLINE | Fast, reliable plumbing in Austin |
| NEXT_PUBLIC_SERVICES | Repairs, Installations, Emergency call-outs |
| NEXT_PUBLIC_EMAIL / _PHONE / _ADDRESS / _CITY | contact details |
| NEXT_PUBLIC_BRAND_COLOR | #0B1B34 |
| NEXT_PUBLIC_SITE_URL | https://harborplumbing.com (once the domain is connected) |
| IMW_CRM_URL | your Client Manager address (for suspension) |
