import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors. CADmep, ESTmep, CAMduct, database maintenance, and AI workflow setup.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Two things we do. Both come from 20 years in the trade.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Every engagement starts the same way: what&apos;s actually slowing your shop down? Then we fix that. No extra layers, no upsells.
          </p>
        </div>
      </section>

      {/* Service 1 */}
      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-slate-600">01</span>
                <div className="h-px flex-1 bg-dark-border" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Autodesk Fabrication Consulting
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Your fabrication database is the backbone of your shop. When it&apos;s wrong, estimates are wrong, BOMs are wrong, and someone eats the difference. Tim&apos;s spent 20 years keeping these systems running.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                The real cost isn&apos;t the software license. It&apos;s the tribal knowledge that walks out the door when your senior guy retires. That&apos;s why knowledge transfer is baked into every engagement.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <h3 className="font-mono text-xs text-brand-emerald mb-4 tracking-widest uppercase">
                  What This Covers
                </h3>
                <ul className="space-y-3">
                  {[
                    "CADmep, ESTmep, CAMduct setup and configuration",
                    "Fabrication database maintenance and custom libraries",
                    "Pricing table updates and estimating workflow optimization",
                    "On-site training your team actually retains",
                    "Knowledge transfer — documenting what your senior people know",
                    "Process audits and workflow fixes",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-brand-orange mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-dark-border bg-dark-surface p-4">
                <div className="font-mono text-xs text-slate-500">
                  Pricing: project-based or hourly.{" "}
                  <Link href="/contact" className="text-brand-orange hover:text-white transition-colors">
                    Contact for details.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-slate-600">02</span>
                <div className="h-px flex-1 bg-dark-border" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                AI Onboarding for MEP &amp; Sheet Metal Contractors
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Your competitor is turning around quotes faster because they stopped doing everything by hand. AI isn&apos;t going to replace your estimator — but an estimator with AI is going to outwork one without it.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                This isn&apos;t a generic AI workshop. Tim sets up the tools for your actual workflows — the RFIs your team writes, the submittals you send, the change orders you process. Then he trains your people on-site until it sticks.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <h3 className="font-mono text-xs text-brand-emerald mb-4 tracking-widest uppercase">
                  How It Works
                </h3>
                <ul className="space-y-3">
                  {[
                    "Assessment: where AI actually helps in your workflow",
                    "Setup: Claude.ai or ChatGPT for Business, configured for your shop",
                    "Templates: estimating, RFIs, submittals, change orders, safety docs",
                    "On-site training session with your team",
                    "Monthly retainer for ongoing support and prompt updates",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-brand-orange mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-dark-border bg-dark-surface p-4">
                <div className="font-mono text-xs text-slate-500">
                  Monthly retainer available.{" "}
                  <Link href="/contact" className="text-brand-orange hover:text-white transition-colors">
                    Contact for details.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="section-tag mb-3 block">Next Step</span>
              <h2 className="text-3xl font-bold text-white">
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
