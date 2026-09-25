import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Layout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "FAQ", description: `Answers to common questions about ${site.name}.` };

export default function Faq() {
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
      <CtaBand title="Still have a question?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
