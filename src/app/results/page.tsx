import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { RuleDraw, StampReveal } from "@/components/motion";
import { SITE, bookingHref, bookingIsExternal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Results & Case Studies",
  description:
    "What a clean Autodesk Fabrication database does for a shop: faster job entry, pricing estimators trust, bids out the door on time. Case studies from RaapTech engagements.",
};

const caseStudies = [
  {
    tag: "Case Study 01",
    title: "Job entry: 15 minutes → 3 minutes",
    context: "Chicago-area sheet metal fabrication shop",
    problem:
      "Job entry took 15 minutes per job because estimators had to work around broken items, duplicate entries, and pricing nobody trusted. Bids were going out late — or not at all.",
    fix: "Full database audit followed by a remediation sprint: deduplicated items, rebuilt pricing tables, repaired connectors and pressure classes, documented the structure.",
    results: [
      { value: "15→3", label: "Minutes per job entry" },
      { value: "5x", label: "Faster estimating turnaround" },
    ],
    placeholder: false,
  },
  {
    tag: "Case Study 02",
    title: "Founding client engagement — in progress",
    context: "MEP contractor, Midwest",
    problem:
      "Details to be published with the client's approval as part of the founding-client case-study agreement.",
    fix: "Remediation sprint at the founding rate, scoped from a Database Health Audit.",
    results: [{ value: "—", label: "Results published on completion" }],
    placeholder: true,
  },
];

export default function ResultsPage() {
  const ctaHref = bookingHref();
  const ctaExternal = bookingIsExternal();
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <section className="bg-paper pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Results</div>
          <h1 className="max-w-3xl font-display text-display-xl font-bold text-ink">
            Proof, not promises.
          </h1>
          <RuleDraw className="mt-8 max-w-xs border-ink" />
          <p className="mt-8 max-w-2xl font-sans text-body-lg text-gray-1">
            Numbers from real engagements. As founding clients complete their
            sprints, their results get published here — with their approval and
            their names on them.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl space-y-8 px-6">
          {caseStudies.map((cs, i) => (
            <StampReveal key={cs.tag} delayMs={i * 80}>
              <article className="card">
                <div className="mb-2 font-mono text-xs uppercase tracking-label text-gray-2">
                  {cs.tag} · {cs.context}
                </div>
                <h2 className="font-display text-display-lg font-bold text-ink">
                  {cs.title}
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-label text-gray-2">
                      The Problem
                    </h3>
                    <p className="text-base leading-relaxed text-gray-1">
                      {cs.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-label text-gray-2">
                      The Fix
                    </h3>
                    <p className="text-base leading-relaxed text-gray-1">
                      {cs.fix}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-px border-2 border-ink bg-ink md:grid-cols-4">
                  {cs.results.map((r) => (
                    <div key={r.label} className="bg-paper px-6 py-8">
                      <div className="font-display text-4xl font-bold text-ink">
                        {r.value}
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-label text-gray-2">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </StampReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="eyebrow eyebrow-ink mb-3">Founding Rate</div>
              <h2 className="max-w-xl font-display text-display-lg font-bold text-paper">
                Become the next case study. First 3 clients get the $8,000
                founding rate.
              </h2>
            </div>
            <a href={ctaHref} {...ctaProps} className="btn-on-ink whitespace-nowrap">
              {SITE.cta}
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
