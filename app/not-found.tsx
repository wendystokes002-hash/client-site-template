import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow center">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">Sorry, we couldn’t find that page. It may have moved.</p>
        <div className="actions center-actions">
          <Link className="btn" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
