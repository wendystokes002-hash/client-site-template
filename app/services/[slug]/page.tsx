import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, CtaBand, PageHero } from "@/components/Layout";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => site.services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = site.services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.summary } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = site.services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = site.services.filter((x) => x.slug !== slug);
  return (
    <>
      <PageHero eyebrow="Services" title={s.title} text={s.summary} />
      <section className="section">
        <div className="wrap split">
          <div className="prose">
            {s.details.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link className="btn" href="/contact">
              Ask about {s.title.toLowerCase()}
            </Link>
          </div>
          <aside className="panel">
            <p className="panel-h">Why choose us</p>
            <ul className="checks">
              {s.benefits.map((b) => (
                <li key={b}>
                  <Check /> {b}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <section className="section alt">
          <div className="wrap">
            <p className="eyebrow">More services</p>
            <h2>Other ways we can help</h2>
            <div className="grid">
              {others.map((o) => (
                <Link key={o.slug} href={`/services/${o.slug}`} className="card">
                  <h3>{o.title}</h3>
                  <p>{o.summary}</p>
                  <span className="card-link">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
