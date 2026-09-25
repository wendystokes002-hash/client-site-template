import type { Metadata } from "next";
import { PageHero } from "@/components/Layout";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function Privacy() {
  const site = await getSite();
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="section">
        <div className="wrap narrow prose">
          <p>This page explains how {site.name} handles personal information collected through this website.</p>
          <h2>What we collect</h2>
          <p>
            If you contact us through the website, by email or by phone, we receive the details you choose to share, such as your name, contact
            details and message. Our hosting provider may also log basic technical data (such as IP address and browser type) to keep the website
            secure.
          </p>
          <h2>How we use it</h2>
          <p>We use your information only to reply to you and provide the services you ask for. We do not sell your personal information.</p>
          <h2>Who we share it with</h2>
          <p>Only with service providers that help us run this website and our business (for example hosting and email), and only as needed.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiries only as long as needed to respond and for our normal business records.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete your information at any time
            {site.email ? (
              <>
                {" "}
                by emailing <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            ) : null}
            .
          </p>
        </div>
      </section>
    </>
  );
}
