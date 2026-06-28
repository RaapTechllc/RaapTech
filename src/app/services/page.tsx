import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors. CADmep, ESTmep, CAMduct, database maintenance, and AI workflow setup.",
};

const fabricationCoverage = [
  "CADmep, ESTmep, CAMduct setup and configuration",
  "Fabrication database maintenance and custom libraries",
  "Pricing table updates and estimating workflow optimization",
  "On-site training your team actually retains",
  "Knowledge transfer — documenting what your senior people know",
  "Process audits and workflow fixes",
];

const aiCoverage = [
  "Assessment: where AI actually helps in your workflow",
  "Setup: a business-grade AI assistant, configured for your shop",
  "Templates: estimating, RFIs, submittals, change orders, safety docs",
  "On-site training session with your team",
  "Monthly retainer for ongoing support and prompt updates",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero — inverted */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-20 text-paper">
        <div className="absolute inset-0 grid-backdrop" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="eyebrow eyebrow-ink mb-8">
            <span className="text-hazard">Services</span>
          </div>
          <h1 className="max-w-4xl font-display text-display-xl font-bold tracking-tight text-paper">
            Two things we do. Both grounded in 20 years of trade work.
          </h1>
          <p className="mt-10 max-w-2xl font-sans text-body-lg text-paper-dim">
            Every engagement starts with the same question: what is actually
            slowing your shop down? Then we fix that. No extra layers, no
            upsells.
          </p>
        </div>
      </section>

      {/* Service 01 — paper */}
      <section className="relative overflow-hidden bg-paper py-24">
        <span className="section-number pointer-events-none absolute -top-8 right-4 select-none text-[12rem] text-ink/[0.06] sm:text-[18rem]">
          01
        </span>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-6">Autodesk Fabrication</div>
              <h2 className="mb-6 font-display text-display-lg font-bold text-ink">
                Autodesk Fabrication Consulting
              </h2>
              <p className="mb-6 max-w-2xl font-sans leading-relaxed text-steel">
                Your fabrication database is the backbone of your shop. When it
                is wrong, estimates are wrong, BOMs are wrong, and someone eats
                the difference. Kyle has spent 20 years keeping these systems
                running.
              </p>
              <p className="mb-8 max-w-2xl font-sans leading-relaxed text-steel">
                The real cost is not the software license. It is the tribal
                knowledge that walks out the door when your senior guy retires.
                Knowledge transfer is built into every engagement.
              </p>
              <Link href="/contact" className="btn-primary">
                Start a Conversation
                <ArrowRight />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="card-pop bg-concrete">
                <div className="eyebrow mb-6">What This Covers</div>
                <ul className="space-y-4">
                  {fabricationCoverage.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-sans text-sm leading-relaxed text-ink"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-hazard" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-2 border-ink bg-paper p-4">
                <div className="font-mono text-xs uppercase tracking-label text-steel">
                  Pricing: project-based or hourly.{" "}
                  <Link
                    href="/contact"
                    className="text-signal underline-offset-4 hover:underline"
                  >
                    Contact for details.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 02 — inverted */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <span className="section-number pointer-events-none absolute -top-8 right-4 select-none text-[12rem] text-paper/[0.06] sm:text-[18rem]">
          02
        </span>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <div className="eyebrow eyebrow-ink mb-6">
                <span className="text-hazard">AI Onboarding</span>
              </div>
              <h2 className="mb-6 font-display text-display-lg font-bold text-paper">
                AI Onboarding for MEP &amp; Sheet Metal Contractors
              </h2>
              <p className="mb-6 max-w-2xl font-sans leading-relaxed text-paper-dim">
                Your competitor is turning around quotes faster because they
                stopped doing everything by hand. AI is not going to replace
                your estimator. But an estimator with AI is going to outwork one
                without it.
              </p>
              <p className="mb-8 max-w-2xl font-sans leading-relaxed text-paper-dim">
                This is not a generic AI workshop. Kyle sets up the tools for
                your actual workflows — the RFIs your team writes, the
                submittals you send, the change orders you process. Then he
                trains your people on-site until it sticks.
              </p>
              <Link href="/contact" className="btn-primary">
                Start a Conversation
                <ArrowRight />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="group relative border-2 border-paper bg-ink p-8 text-paper shadow-hard-paper transition-transform duration-150 hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none">
                <div className="eyebrow eyebrow-ink mb-6">
                  <span className="text-hazard">How It Works</span>
                </div>
                <ul className="space-y-4">
                  {aiCoverage.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-sans text-sm leading-relaxed text-paper"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-hazard" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-2 border-paper bg-ink p-4">
                <div className="font-mono text-xs uppercase tracking-label text-paper-dim">
                  Monthly retainer available.{" "}
                  <Link
                    href="/contact"
                    className="text-signal underline-offset-4 hover:underline"
                  >
                    Contact for details.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — paper */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 border-2 border-ink bg-concrete p-10 shadow-hard md:flex-row md:items-center md:p-12">
            <div>
              <div className="eyebrow mb-3">Next Step</div>
              <h2 className="font-display text-display-lg font-bold text-ink">
                Not sure which service fits? Let&apos;s talk about your shop.
              </h2>
            </div>
            <Link href="/contact" className="btn-primary whitespace-nowrap">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
