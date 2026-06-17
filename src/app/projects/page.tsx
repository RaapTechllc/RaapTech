import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Representative workflow optimization outcomes for MEP and sheet metal contractors. Construction workflow audits, fabrication consulting, and process fixes.",
};

const outcomes = [
  {
    tag: "01",
    title: "Submittal tracking cleanup",
    before:
      "PM manually updating a spreadsheet at 6 PM because subs never confirmed receipt.",
    after:
      "Single tracker with status alerts — PM checks once in the morning instead of chasing all day.",
    note: "Representative of typical engagements. Results vary by team size and starting maturity.",
  },
  {
    tag: "02",
    title: "Daily report workflow",
    before:
      "Foremen call in, office transcribes, half the details missing when disputes show up months later.",
    after:
      "Structured mobile-friendly template with required fields — documentation holds up in review.",
    note: "Representative of typical engagements. Results vary by team size and starting maturity.",
  },
  {
    tag: "03",
    title: "Estimating-to-shop handoff",
    before:
      "BOM revisions lost between estimating and fabrication — rework on the shop floor.",
    after:
      "Versioned handoff checklist with sign-off — fab gets what estimating actually approved.",
    note: "Representative of typical engagements. Results vary by team size and starting maturity.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Projects</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Representative outcomes
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Detailed case studies with client names are coming as sign-offs come
            in. These are typical before/after patterns from workflow audit
            engagements — not guaranteed results for every shop.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
            {outcomes.map((outcome) => (
              <div key={outcome.tag} className="bg-dark-bg p-8">
                <span className="font-mono text-xs text-slate-600 mb-4 block">
                  {outcome.tag}
                </span>
                <h2 className="font-semibold text-white text-lg mb-6">
                  {outcome.title}
                </h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
                      Before
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {outcome.before}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-brand-emerald uppercase tracking-wider mb-2">
                      After
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {outcome.after}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {outcome.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-dark-border bg-dark-surface p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Want to hear how this applies to your shop?
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
              Book a free consultation. We&apos;ll talk through your biggest
              bottleneck and whether a workflow audit is the right fit.
            </p>
            <Link href="/contact#book" className="btn-primary">
              {SITE.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
