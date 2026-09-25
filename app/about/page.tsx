/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Layout";
import { getSite, initials } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "About us", description: site.about.story[0] };
}

export default async function About() {
  const site = await getSite();
  return (
    <>
      <PageHero eyebrow="About us" title={`About ${site.name}`} text={site.tagline} />
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Who we are</h2>
            {site.aboutImage && <img className="about-img" src={site.aboutImage} alt="" />}
          </div>
          <div className="prose">
            {site.about.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <p className="eyebrow">What we stand for</p>
          <h2>Our values</h2>
          <div className="grid">
            {site.about.values.map((v, i) => (
              <article key={v.title} className="reason">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {site.about.team.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Our team</p>
            <h2>Meet the team</h2>
            <div className="grid">
              {site.about.team.map((t) => (
                <article key={t.name} className="person">
                  {t.photo ? <img className="avatar" src={t.photo} alt={t.name} /> : <span className="avatar">{initials(t.name)}</span>}
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand site={site} />
    </>
  );
}
