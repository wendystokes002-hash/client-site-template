import type { Metadata } from "next";
import { PageHero } from "@/components/Layout";
import { getSite } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default async function Terms() {
  const site = await getSite();
  return (
    <>
      <PageHero title="Terms of Use" />
      <section className="section">
        <div className="wrap narrow prose">
          <p>By using this website you agree to these terms.</p>
          <h2>Information on this website</h2>
          <p>
            We try to keep the information on this website accurate and up to date, but it is provided for general information only. Prices,
            availability and services may change. Please contact us to confirm details before relying on them.
          </p>
          <h2>Quotes and services</h2>
          <p>Any work we carry out is covered by the quote or agreement we give you, not by the general information on this website.</p>
          <h2>Content</h2>
          <p>The text, images and design of this website belong to {site.name} or are used with permission. Please don’t copy them without asking.</p>
          <h2>Links</h2>
          <p>Links to other websites are provided for convenience. We are not responsible for their content.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms?{" "}
            {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "Please contact us using the details on our contact page."}
          </p>
        </div>
      </section>
    </>
  );
}
