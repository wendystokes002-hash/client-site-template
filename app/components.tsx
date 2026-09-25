import Link from "next/link";
import { initials, site } from "@/lib/site";

const tel = site.phone.replace(/[^+\d]/g, "");

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="mark">{initials(site.name)}</span>
          <span>{site.name}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <a href="/#services">Services</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
          {tel ? (
            <a className="btn btn-sm" href={`tel:${tel}`}>
              Call us
            </a>
          ) : (
            <a className="btn btn-sm" href="/#contact">
              Get in touch
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <p>
          © {new Date().getFullYear()} {site.name.replace(/\.$/, "")}. All rights reserved.
        </p>
        <p className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <a href={site.credit.url} target="_blank" rel="noopener">
            {site.credit.text}
          </a>
        </p>
      </div>
    </footer>
  );
}
