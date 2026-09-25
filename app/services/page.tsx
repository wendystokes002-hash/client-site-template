/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Layout";
import { getSite } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Services", description: `Services offered by ${site.name}: ${site.services.map((s) => s.title).join(", ")}.` };
}

export default async function Services() {
  const site = await getSite();
  return (
    <>
      <PageHero eyebrow="Services" title="How we can help" text={`Everything ${site.name} offers${site.city ? ` in ${site.city}` : ""}. Choose a service to learn more.`} />
      <section className="section">
        <div className="wrap grid">
          {site.services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card">
              {s.image && <img className="card-img" src={s.image} alt="" loading="lazy" />}
              <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <span className="card-link">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
