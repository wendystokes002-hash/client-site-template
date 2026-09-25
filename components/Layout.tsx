import Link from "next/link";
import { initials, nav, site, tel } from "@/lib/site";

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="mark">{initials(site.name)}</span>
          <span className="brand-name">{site.name}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.slice(1).map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <a className="btn btn-sm" href={tel ? `tel:${tel}` : "/contact"}>
            {tel ? "Call us" : "Get a quote"}
          </a>
        </nav>
        <details className="menu">
          <summary aria-label="Open menu">
            <span />
            <span />
            <span />
          </summary>
          <div className="menu-panel">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            {tel && (
              <a className="btn" href={`tel:${tel}`}>
                Call {site.phone}
              </a>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">{site.name}</p>
          <p>{site.tagline}</p>
        </div>
        <div>
          <p className="footer-h">Pages</p>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="footer-h">Services</p>
          {site.services.slice(0, 6).map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <p className="footer-h">Contact</p>
          {site.phone && <a href={`tel:${tel}`}>{site.phone}</a>}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.address && <span>{site.address}</span>}
          <span>{site.hours}</span>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name.replace(/\.$/, "")}. All rights reserved.
        </p>
        <p className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={site.credit.url} target="_blank" rel="noopener">
            {site.credit.text}
          </a>
        </p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Ready to get started?", text = "Tell us what you need and we’ll get back to you quickly." }: { title?: string; text?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta-in">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="actions">
          <Link className="btn btn-invert" href="/contact">
            Get a free quote
          </Link>
          {tel && (
            <a className="btn btn-outline-invert" href={`tel:${tel}`}>
              Call {site.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Check() {
  return (
    <svg className="check" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 10.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
