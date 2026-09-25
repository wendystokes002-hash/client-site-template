import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Layout";
import { getSite } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "FAQ", description: `Answers to common questions about ${(await getSite()).name}.` };
}

export default async function Faq() {
  const site = await getSite();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" text="Can’t find your answer? Just get in touch." />
      <section className="section">
        <div className="wrap narrow faq">
          {site.faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand site={site} title="Still have a question?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
