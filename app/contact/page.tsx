import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/Layout";
import { getSite, telOf } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Contact", description: `Contact ${site.name}${site.phone ? ` on ${site.phone}` : ""}.` };
}

export default async function Contact() {
  const site = await getSite();
  const tel = telOf(site.phone);
  const canForm = !!(site.formEndpoint || site.email);
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" text="Tell us what you need and we’ll get back to you quickly." />
      <section className="section">
        <div className="wrap contact-grid">
          <div>
            {canForm ? (
              <ContactForm to={site.email} endpoint={site.formEndpoint} />
            ) : (
              <p className="lead">Call us or visit — we’d love to hear from you.</p>
            )}
          </div>
          <aside className="panel">
            <dl className="details">
              {site.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${tel}`}>{site.phone}</a>
                  </dd>
                </div>
              )}
              {site.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              )}
              {site.address && (
                <div>
                  <dt>Address</dt>
                  <dd>{site.address}</dd>
                </div>
              )}
              {!site.address && site.city && (
                <div>
                  <dt>Area</dt>
                  <dd>{site.city}</dd>
                </div>
              )}
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </aside>
        </div>
        {(site.address || site.city) && (
          <div className="wrap">
            <iframe
              className="map"
              title={`Map of ${site.address || site.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address || site.city)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </section>
    </>
  );
}
