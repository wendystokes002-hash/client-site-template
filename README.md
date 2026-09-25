# Client Site Template — Insight Meridian Group

A fast, multi-page business website used by **Client Manager → Create website**.

Pages: Home · About · Services (+ one page per service) · FAQ · Contact (form + map)
· Privacy · Terms · 404. Three design styles: **Modern**, **Classic**, **Bold**.
Includes the suspension check (`proxy.ts`), SEO tags, sitemap and a mobile menu.
The client's details are filled in automatically from the CRM.

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
- **All text (services, about, FAQ, reviews, team):** edit `lib/site.ts` in the client's own repo (the copy Vercel made),
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
| NEXT_PUBLIC_STYLE | modern, classic or bold |
| NEXT_PUBLIC_HOURS | Monday – Friday, 9:00 AM – 5:00 PM |
| NEXT_PUBLIC_FORM_ENDPOINT | optional Formspree link so the contact form sends emails directly |
| NEXT_PUBLIC_SITE_URL | https://harborplumbing.com (once the domain is connected) |
| IMW_CRM_URL | your Client Manager address (for suspension) |

## Reviews and team
Testimonials and the Team section stay hidden until you add real ones in `lib/site.ts`.
Only use genuine reviews from real customers, with their permission.
