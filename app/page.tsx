import Link from "next/link";
import { CtaBand } from "@/components/Layout";
import { site, tel } from "@/lib/site";

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
    ...(site.city && { areaServed: site.city }),
  };
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-text">
            {site.city && <p className="eyebrow">Serving {site.city}</p>}
            <h1>{site.tagline}</h1>
            <p className="lead">{site.intro}</p>
            <div className="actions">
              <Link className="btn" href="/contact">
                Get a free quote
              </Link>
              {tel ? (
                <a className="btn btn-ghost" href={`tel:${tel}`}>
                  Call {site.phone}
                </a>
              ) : (
                <Link className="btn btn-ghost" href="/services">
                  Our services
                </Link>
              )}
            </div>
          </div>
          <div className="hero-card" aria-hidden="true">
            <p className="hero-card-h">What we do</p>
            <ul>
              {site.services.slice(0, 5).map((s) => (
                <li key={s.slug}>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Our services</h2>
            </div>
            <Link href="/services" className="more">
              All services →
            </Link>
          </div>
          <div className="grid">
            {site.services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card">
                <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="card-link">Learn more →</span>
              </Link>
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

      {site.testimonials.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Reviews</p>
            <h2>What our customers say</h2>
            <div className="grid">
              {site.testimonials.map((t) => (
                <figure key={t.name} className="quote">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    {t.name}
                    {t.detail ? ` · ${t.detail}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">About us</p>
            <h2>About {site.name}</h2>
          </div>
          <div>
            <p className="lead">{site.about.story[0]}</p>
            <Link href="/about" className="more">
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
