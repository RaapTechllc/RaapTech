import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { OdometerStat, RuleDraw, StampReveal } from "@/components/motion";

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

const credentials = [
  "AUTODESK FABRICATION · 20 YRS",
  "MEP / SHEET METAL",
  "ON-SITE DAILY",
  "CADmep · ESTmep · CAMduct",
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
      {/* Full-bleed shop-floor hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-16 text-paper">
        <Image
          src="/images/hero-shop-floor.png"
          alt="Sheet metal fabrication shop floor with stacked HVAC ductwork"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Flat ink scrim — readable type without soft gradient depth */}
        <div className="absolute inset-0 bg-ink/72" aria-hidden />
        <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:pb-24">
          <StampReveal>
            <p className="font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl md:text-6xl">
              RAAPTECH
            </p>
          </StampReveal>

          <div className="eyebrow eyebrow-ink mt-8 mb-6">
            <span className="text-hazard">Fabrication Consulting + AI</span>
          </div>

          <h1 className="max-w-4xl font-display text-display-2xl font-bold tracking-tight text-paper">
            <StampReveal delayMs={60}>
              <span className="block">20 Years in</span>
            </StampReveal>
            <StampReveal delayMs={120}>
              <span className="block text-hazard">the Trade.</span>
            </StampReveal>
            <StampReveal delayMs={180}>
              <span className="block">AI-Native by</span>
            </StampReveal>
            <StampReveal delayMs={240} className="mt-[0.12em]">
              <span className="highlight">Default.</span>
            </StampReveal>
          </h1>

          <StampReveal delayMs={300}>
            <p className="mt-8 max-w-xl font-sans text-body-lg text-paper">
              Kyle Raap brings two decades of Autodesk Fabrication — CADmep,
              ESTmep, CAMduct — and AI tooling to the shops that actually build.
            </p>
          </StampReveal>

          <StampReveal delayMs={360}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/services" className="btn-primary">
                View Services
                <ArrowRight />
              </Link>
              <Link href="/contact" className="btn-on-ink">
                Get in Touch
              </Link>
            </div>
          </StampReveal>

          {/* Live status strip — not a floating card */}
          <StampReveal delayMs={420}>
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-paper/30 pt-5 font-mono text-xs uppercase tracking-label">
              <span className="flex items-center gap-2 text-volt">
                <span className="status-dot" />
                Available for new clients
              </span>
              <span className="text-paper-dim">specialty: fabrication</span>
              <span className="text-paper-dim">on_site: daily</span>
            </div>
          </StampReveal>
        </div>
      </section>

      {/* Credential band */}
      <div className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-stretch divide-x-2 divide-ink border-x-2 border-ink">
          {credentials.map((c) => (
            <div
              key={c}
              className="flex flex-1 items-center justify-center px-4 py-3 font-mono text-[0.65rem] font-medium uppercase tracking-label text-ink sm:text-xs"
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="marquee-pause overflow-hidden border-b-2 border-ink bg-hazard">
        <div className="marquee py-3">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {ticker.map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="marquee-term flex items-center gap-4 whitespace-nowrap px-4 font-mono text-xs font-medium uppercase tracking-label text-ink"
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
          <RuleDraw className="border-ink" />
          <div className="grid grid-cols-2 border-x-2 border-ink md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 py-12 ${
                  i < stats.length - 1 ? "border-r-2 border-ink" : ""
                } ${i < 2 ? "border-b-2 border-ink md:border-b-0" : ""}`}
              >
                <OdometerStat
                  value={stat.value}
                  className="font-display text-5xl font-bold text-hazard"
                />
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
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-ink">
            Trade knowledge meets modern tooling
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-ink" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, i) => (
              <StampReveal key={feature.tag} delayMs={i * 80}>
                <div className="card-pop group relative bg-concrete">
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
              </StampReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — inverted */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <StampReveal>
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
          </StampReveal>
        </div>
      </section>
    </>
  );
}
