import { Footer, Header } from "./components";
import { site } from "@/lib/site";

const tel = site.phone.replace(/[^+\d]/g, "");

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.intro,
    ...(site.url && { url: site.url }),
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone }),
    ...(site.address && { address: site.address }),
  };
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="wrap hero-in">
            {site.city && <p className="eyebrow">Serving {site.city}</p>}
            <h1>{site.tagline}</h1>
            <p className="lead">{site.intro}</p>
            <div className="actions">
              <a className="btn" href="#contact">
                Get a free quote
              </a>
              {tel && (
                <a className="btn btn-ghost" href={`tel:${tel}`}>
                  Call {site.phone}
                </a>
              )}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>Our services</h2>
            <div className="grid">
              {site.services.map((s) => (
                <article key={s.title} className="card">
                  <span className="dot" aria-hidden="true" />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="wrap">
            <p className="eyebrow">Why choose us</p>
            <h2>Why customers choose {site.name}</h2>
            <div className="grid">
              {site.reasons.map((r, i) => (
                <article key={r.title} className="reason">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap narrow">
            <p className="eyebrow">About us</p>
            <h2>About {site.name}</h2>
            <p className="lead">{site.about}</p>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="wrap contact-in">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s talk</h2>
              <p className="lead">Tell us what you need and we&apos;ll get back to you quickly.</p>
              {site.email && (
                <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent("Enquiry from your website")}`}>
                  Email us
                </a>
              )}
            </div>
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
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
