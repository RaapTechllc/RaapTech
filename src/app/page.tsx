import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades",
  description:
    "20 years of Autodesk Fabrication experience. CADmep, ESTmep, CAMduct consulting and AI onboarding for sheet metal and MEP contractors.",
};

const stats = [
  { value: "20+", label: "Years Autodesk Fabrication" },
  { value: "4", label: "Active Clients" },
  { value: "Daily", label: "On-Site" },
  { value: "2023", label: "Founded" },
];

const ticker = [
  "CADmep",
  "ESTmep",
  "CAMduct",
  "Fabrication Databases",
  "AI Onboarding",
  "Estimating",
  "RFIs",
  "Submittals",
  "Change Orders",
  "On-Site Training",
];

const features = [
  {
    tag: "01",
    title: "Autodesk Fabrication Consulting",
    description:
      "CADmep, ESTmep, CAMduct setup and optimization. Database maintenance, pricing tables, custom libraries. On-site training your team actually retains. 20 years of keeping fabrication workflows running.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="square"
          strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        />
      </svg>
    ),
  },
  {
    tag: "02",
    title: "AI Onboarding for MEP & Sheet Metal Contractors",
    description:
      "Assessment of where AI fits your workflow. A business-grade AI assistant configured for your shop. Prompt templates for estimating, RFIs, submittals, and change orders. On-site training. Monthly retainer so it sticks.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="square"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — inverted */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-16 text-paper">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(237,233,224,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(237,233,224,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="eyebrow eyebrow-ink mb-8">
              <span className="text-hazard">Fabrication Consulting + AI</span>
            </div>

            <h1 className="font-display text-display-2xl font-bold tracking-tight text-paper">
              20 Years in
              <br />
              <span className="text-hazard">the Trade.</span>
              <br />
              AI-Native by
              <br />
              <span className="bg-hazard px-2 text-ink">Default.</span>
            </h1>

            <p className="mt-10 max-w-2xl font-sans text-body-lg text-paper-dim">
              Kyle Raap has spent two decades inside Autodesk Fabrication
              &mdash; CADmep, ESTmep, CAMduct &mdash; on the shop floor, not
              behind a sales deck. Now he brings AI tools to the contractors who
              actually build things.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link href="/services" className="btn-primary">
                View Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-on-ink">
                About Kyle
              </Link>
            </div>
          </div>

          {/* Spec panel */}
          <div className="lg:col-span-4 lg:self-center">
            <div className="border-2 border-paper bg-ink shadow-hard-paper">
              <div className="flex items-center gap-2 border-b-2 border-paper px-4 py-3">
                <span className="h-2.5 w-2.5 bg-hazard" />
                <span className="font-mono text-xs uppercase tracking-label text-paper-dim">
                  raaptech.status
                </span>
              </div>
              <div className="space-y-3 p-4 font-mono text-xs">
                {[
                  ["specialty", "FABRICATION", "text-signal"],
                  ["experience", "20+ YRS", "text-paper"],
                  ["active_clients", "4", "text-paper"],
                  ["on_site", "DAILY", "text-hazard"],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-paper-dim">{k}</span>
                    <span className={c}>{v}</span>
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-2 border-t-2 border-paper/30 pt-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-volt" />
                  <span className="text-volt">Available for new clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="overflow-hidden border-y-2 border-ink bg-hazard">
        <div className="marquee py-3">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {ticker.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-4 whitespace-nowrap px-4 font-mono text-xs font-medium uppercase tracking-label text-ink"
                >
                  {t}
                  <span className="text-ink/40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 border-x-2 border-ink md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 py-12 ${
                  i < stats.length - 1 ? "border-r-2 border-ink" : ""
                } ${i < 2 ? "border-b-2 border-ink md:border-b-0" : ""}`}
              >
                <div className="font-display text-5xl font-bold text-hazard">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-label text-steel">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">What We Do</div>
          <h2 className="mb-16 max-w-2xl font-display text-display-lg font-bold text-ink">
            Trade knowledge meets modern tooling
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.tag} className="card-pop group relative bg-concrete">
                <span className="section-number absolute right-6 top-4 text-6xl text-ink/10">
                  {feature.tag}
                </span>
                <div className="mb-6 inline-flex border-2 border-ink bg-hazard p-3 text-ink">
                  {feature.icon}
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-steel">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — inverted */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 border-2 border-hazard bg-ink p-10 shadow-hard-hazard md:flex-row md:items-center md:p-12">
            <div>
              <div className="eyebrow eyebrow-ink mb-3">
                <span className="text-hazard">Ready to Talk</span>
              </div>
              <h2 className="font-display text-display-lg font-bold text-paper">
                Your shop deserves someone who gets it.
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Start a Conversation
              </Link>
              <Link href="/services" className="btn-on-ink whitespace-nowrap">
                See Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
