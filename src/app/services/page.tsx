import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Construction Workflow Audit ($3K–$5K), Autodesk Fabrication consulting, and AI onboarding for sheet metal and MEP contractors.",
};

const auditIncludes = [
  "Full documentation of your current admin workflows and bottleneck identification",
  "2-hour workflow mapping session with your PM team",
  "Prioritized improvement roadmap — plain English, no jargon",
  "One workflow fully built, tested, and handed off to your team",
  "Documentation your staff can actually use",
  "30-day follow-up check-in to confirm results",
];

const fabricationIncludes = [
  "CADmep, ESTmep, CAMduct setup and configuration",
  "Fabrication database maintenance and custom libraries",
  "Pricing table updates and estimating workflow optimization",
  "On-site training your team actually retains",
  "Knowledge transfer — documenting what your senior people know",
  "Process audits and workflow fixes",
];

const aiIncludes = [
  "Assessment: where AI actually helps in your workflow",
  "Setup: shop-approved AI tools configured for your workflow",
  "Templates: estimating, RFIs, submittals, change orders, safety docs",
  "On-site training session with your team",
  "Monthly retainer for ongoing support and prompt updates",
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Start with the workflow audit. Add depth when you need it.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Every engagement starts with the same question: where is your team
            losing time? The audit answers that and fixes one bottleneck. Fabrication
            consulting and AI onboarding are available when you need more.
          </p>
        </div>
      </section>

      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-brand-emerald">PRIMARY</span>
                <span className="font-mono text-xs text-slate-600">01</span>
                <div className="h-px flex-1 bg-dark-border" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Construction Workflow Audit
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                We map how information moves through your projects — submittals,
                daily reports, change orders, closeout — find the biggest time
                sink, and fix one workflow completely.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Not a slide deck. A working process change your team is already
                using when we leave.
              </p>
              <div className="space-y-2 font-mono text-sm mb-8">
                <div className="text-white font-semibold">$3,000 – $5,000</div>
                <div className="text-slate-500">5–10 business days</div>
                <div className="text-slate-500">
                  Final pricing confirmed after scoping call
                </div>
              </div>
              <Link href="/contact#book" className="btn-primary text-xs">
                {SITE.cta}
              </Link>
            </div>
            <div className="border border-dark-border bg-dark-surface p-6">
              <h3 className="font-mono text-xs text-brand-emerald mb-4 tracking-widest uppercase">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {auditIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-400"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-orange mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-slate-600">02</span>
                <div className="h-px flex-1 bg-dark-border" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Autodesk Fabrication Consulting
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Your fabrication database is the backbone of your shop. When it is
                wrong, estimates are wrong, BOMs are wrong, and someone eats the
                difference. Tim has spent 20 years keeping these systems running.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Knowledge transfer is built into every engagement — so tribal
                knowledge does not walk out the door when your senior guy retires.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <h3 className="font-mono text-xs text-brand-emerald mb-4 tracking-widest uppercase">
                  What This Covers
                </h3>
                <ul className="space-y-3">
                  {fabricationIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-400"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-orange mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-dark-border bg-dark-surface p-4 font-mono text-xs text-slate-500">
                Pricing: project-based or hourly.{" "}
                <Link
                  href="/contact#book"
                  className="text-brand-orange hover:text-white transition-colors"
                >
                  Book a scoping call.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-slate-600">03</span>
                <div className="h-px flex-1 bg-dark-border" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                AI Onboarding for MEP &amp; Sheet Metal Contractors
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Shops that streamline estimating and admin often turn quotes
                faster. AI is not going to replace your estimator — but an
                estimator with the right tools can outwork one without them.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Tim sets up tools for your actual workflows — the RFIs your team
                writes, the submittals you send, the change orders you process.
                Then he trains your people on-site until it sticks.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <h3 className="font-mono text-xs text-brand-emerald mb-4 tracking-widest uppercase">
                  How It Works
                </h3>
                <ul className="space-y-3">
                  {aiIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-400"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-orange mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-dark-border bg-dark-surface p-4 font-mono text-xs text-slate-500">
                Monthly retainer available.{" "}
                <Link
                  href="/contact#book"
                  className="text-brand-orange hover:text-white transition-colors"
                >
                  Book a scoping call.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="section-tag mb-3 block">Next Step</span>
              <h2 className="text-3xl font-bold text-white">
                Not sure which service fits? Start with the free consultation.
              </h2>
            </div>
            <Link href="/contact#book" className="btn-primary whitespace-nowrap">
              {SITE.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
