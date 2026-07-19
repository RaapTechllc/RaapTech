import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { OdometerStat, RuleDraw, StampReveal } from "@/components/motion";
import { SITE, bookingHref, bookingIsExternal } from "@/lib/site";

export const metadata: Metadata = {
  title: "RaapTech LLC — Autodesk Fabrication Database Consultancy, Chicago",
  description:
    "We fix broken Autodesk Fabrication databases for MEP contractors and sheet metal shops. CADmep, CAMduct, ESTmep — cleaned up, priced right, built to win bids. Book a Database Health Audit.",
};

const stats = [
  { value: "20+", label: "Years in the Trade" },
  { value: "15→3", label: "Job Entry: Minutes" },
  { value: "73", label: "Local Union Apprentice" },
  { value: "3", label: "Platforms Mastered" },
];

const credentials = [
  "20+ YEARS IN THE TRADE",
  "LOCAL UNION 73",
  "SHOP OPERATIONS MANAGER",
  "CADmep® · CAMduct® · ESTmep®",
];

const pains = [
  {
    tag: "01",
    title: "Nobody trusts the pricing",
    description:
      "Your estimator pulls a number from the database, then checks it against a spreadsheet, then calls a guy who 'knows the real number.' That's not estimating — that's guessing with extra steps.",
  },
  {
    tag: "02",
    title: "Bids die waiting on turnaround",
    description:
      "A job that should take 3 minutes to enter takes 15. Multiply that across every item, every bid, every week. You're losing work to shops that are simply faster — not better.",
  },
  {
    tag: "03",
    title: "The knowledge is walking out the door",
    description:
      "Dave retires in 18 months. He's the only one who knows why the database is built the way it is. When he leaves, the answers leave with him.",
  },
  {
    tag: "04",
    title: "Workarounds on top of workarounds",
    description:
      "Duplicate items. Dead connectors. Pressure classes nobody maintains. Every 'quick fix' from the last five years is still in there, costing you time on every single job.",
  },
];

const steps = [
  {
    number: "01",
    title: "Database Health Audit",
    description:
      "We go through your Autodesk® Fabrication database item by item — pricing, connectors, seams, pressure classes, labor tables. You get a written report of what's broken, what it costs you, and the fix plan.",
  },
  {
    number: "02",
    title: "Remediation Sprint",
    description:
      "A focused, fixed-scope engagement to rebuild what the audit flagged. Clean items, correct pricing, working connectors. Your estimators feel the difference the first week.",
  },
  {
    number: "03",
    title: "Monthly Retainer",
    description:
      "Databases drift. Prices change, people improvise, vendors update. A retainer keeps your database clean, documented, and current — so you never need another rescue.",
  },
];

const offers = [
  {
    name: "Free Database Diagnostic",
    price: "Free",
    note: "Email sign-up",
    description:
      "A self-guided diagnostic that scores your database health across the areas that cost shops the most bids. Know where you stand in 10 minutes.",
  },
  {
    name: "Database Health Audit",
    price: "$2,500",
    note: "Credits toward a Sprint within 30 days",
    description:
      "Full hands-on audit of your fabrication database. Written findings, prioritized fix list, and a straight answer on what it's costing you.",
  },
  {
    name: "Remediation Sprint",
    price: "$12,000",
    note: "Founding rate $8,000 — first 3 clients, case-study agreement",
    description:
      "Fixed-scope rebuild of everything the audit flags. Clean database, correct pricing, documented structure your team can actually maintain.",
  },
  {
    name: "Monthly Retainer",
    price: "From $1,500/mo",
    note: "Ongoing ownership",
    description:
      "We own database health so your team doesn't have to. Updates, documentation, price maintenance, and someone to call when something looks wrong.",
  },
];

const proof = [
  {
    title: "Learned on the shop floor",
    body: "Local Union 73 apprenticeship. Twenty-plus years in the trade. CADmep®, CAMduct®, and ESTmep® learned by running work through them — not from a sales deck.",
  },
  {
    title: "Ran the operation",
    body: "Operations Manager at a major Chicago sheet metal shop. Tim has owned the estimating bottleneck, the database mess, and the Monday-morning fallout when a bid goes sideways.",
  },
  {
    title: "A fix, not a slide deck",
    body: "Every engagement ends with a database that works — priced right, structured right, documented so it stays that way. If we can't find problems worth fixing, we tell you before you spend a dollar.",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ diagnostic?: string }>;
}) {
  const diagnosticSent = (await searchParams)?.diagnostic === "sent";
  const ctaHref = bookingHref();
  const ctaExternal = bookingIsExternal();
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-16 text-paper">
        <Image
          src="/images/hero-shop-floor.png"
          alt="Sheet metal fabrication shop floor with stacked HVAC ductwork"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center grayscale"
        />
        {/* Flat ink scrim for readable type */}
        <div className="absolute inset-0 bg-ink/80" aria-hidden />
        <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:pb-24">
          <div className="eyebrow eyebrow-ink mb-6">
            Autodesk Fabrication Database Consultancy — Chicago
          </div>

          <h1 className="max-w-4xl font-display text-display-2xl font-bold tracking-tight text-paper">
            <StampReveal delayMs={60}>
              <span className="block">Your Database Is</span>
            </StampReveal>
            <StampReveal delayMs={120}>
              <span className="block">Costing You Bids.</span>
            </StampReveal>
            <StampReveal delayMs={180} className="mt-[0.12em]">
              <span className="highlight-paper">We Fix It.</span>
            </StampReveal>
          </h1>

          <StampReveal delayMs={240}>
            <p className="mt-8 max-w-xl font-sans text-body-lg text-gray-3">
              RaapTech rebuilds broken Autodesk Fabrication databases for MEP
              contractors and sheet metal shops — so your estimators stop
              hunting for pricing and start winning work.
            </p>
          </StampReveal>

          <StampReveal delayMs={300}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={ctaHref} {...ctaProps} className="btn-on-ink">
                {SITE.cta}
                <ArrowRight />
              </a>
              <Link href="#how-it-works" className="btn-on-ink-outline">
                See How It Works
              </Link>
            </div>
          </StampReveal>

          {/* Status strip */}
          <StampReveal delayMs={360}>
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-gray-1 pt-5 font-mono text-xs uppercase tracking-label">
              <span className="text-paper">Accepting new clients</span>
              <span className="text-gray-3">CADmep® / CAMduct® / ESTmep®</span>
              <span className="text-gray-3">Chicago + Midwest</span>
              <span className="text-gray-3">Founding rate: 3 spots</span>
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
              className="flex flex-1 items-center justify-center px-4 py-3 text-center font-mono text-[0.65rem] font-medium uppercase tracking-label text-ink sm:text-xs"
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* The Problem */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">The Problem</div>
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-ink">
            Sound familiar?
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-ink" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {pains.map((pain, i) => (
              <StampReveal key={pain.tag} delayMs={i * 80}>
                <div className="card group relative h-full">
                  <span className="section-number absolute right-6 top-4 text-6xl">
                    {pain.tag}
                  </span>
                  <h3 className="mb-3 pr-16 font-display text-xl font-bold text-ink">
                    {pain.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-1">
                    {pain.description}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism — inverted */}
      <section id="how-it-works" className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow eyebrow-ink mb-4">How It Works</div>
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-paper">
            Audit. Sprint. Retainer. A path, not a project that never ends.
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-paper" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <StampReveal key={step.number} delayMs={i * 80}>
                <div className="relative h-full border-2 border-gray-1 bg-ink p-8">
                  <span className="section-number absolute right-6 top-4 text-6xl text-gray-1">
                    {step.number}
                  </span>
                  <h3 className="mb-3 pr-16 font-display text-xl font-bold text-paper">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-3">
                    {step.description}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offer ladder */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Services &amp; Pricing</div>
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-ink">
            Transparent pricing. No discovery-call games.
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-ink" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {offers.map((offer, i) => (
              <StampReveal key={offer.name} delayMs={i * 80}>
                <div className="card flex h-full flex-col">
                  <div className="mb-1 font-mono text-xs uppercase tracking-label text-gray-2">
                    {offer.note}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {offer.name}
                  </h3>
                  <div className="mt-2 font-display text-4xl font-bold text-ink">
                    {offer.price}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-gray-1">
                    {offer.description}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>

          <StampReveal delayMs={240}>
            <div className="mt-10">
              <Link href="/services" className="btn-secondary">
                Full Service Details
                <ArrowRight />
              </Link>
            </div>
          </StampReveal>
        </div>
      </section>

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
                  className="font-display text-5xl font-bold text-ink"
                />
                <div className="mt-2 font-mono text-xs uppercase tracking-label text-gray-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 border-t-0 border-ink px-6 py-4 font-mono text-xs uppercase tracking-label text-gray-1">
            Job entry: 15 minutes &rarr; 3 minutes. That&apos;s what a clean
            database does.
          </div>
        </div>
      </section>

      {/* Why RaapTech — founder credibility */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Why RaapTech</div>
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-ink">
            Twenty years in the trade. Not twenty months in a WeWork.
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-ink" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {proof.map((item, i) => (
              <StampReveal key={item.title} delayMs={i * 80}>
                <div className="card h-full">
                  <h3 className="mb-3 font-display text-xl font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-1">
                    {item.body}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>

          <StampReveal delayMs={240}>
            <p className="mt-10 font-mono text-sm uppercase tracking-label text-gray-1">
              — Tim Raap, Founder
            </p>
          </StampReveal>
        </div>
      </section>

      {/* Lead magnet — Free Database Diagnostic */}
      <section id="diagnostic" className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="eyebrow eyebrow-ink mb-4">Free Tool</div>
              <h2 className="font-display text-display-lg font-bold text-paper">
                How healthy is your database? Find out in 10 minutes.
              </h2>
              <RuleDraw className="mt-6 max-w-xs border-paper" />
            </div>
            <div>
              <p className="font-sans text-body-lg text-gray-3">
                The free RaapTech Database Diagnostic scores your fabrication
                database across pricing accuracy, item structure, connector
                health, and documentation — and tells you where you&apos;re
                losing time and bids.
              </p>
              <form
                action="/api/diagnostic"
                method="post"
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <label htmlFor="diagnostic-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="diagnostic-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full border-2 border-paper bg-ink px-4 py-4 font-sans text-base text-paper placeholder:text-gray-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
                />
                <button type="submit" className="btn-on-ink whitespace-nowrap">
                  Send Me the Diagnostic
                </button>
              </form>
              {diagnosticSent && (
                <p role="status" className="mt-4 border-2 border-paper px-4 py-3 font-mono text-xs uppercase tracking-label text-paper">
                  You&apos;re in. The diagnostic is on its way to your inbox.
                </p>
              )}
              <p className="mt-3 font-mono text-xs uppercase tracking-label text-gray-2">
                No spam. One email with the diagnostic, that&apos;s it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <StampReveal>
            <div className="flex flex-col items-start justify-between gap-8 border-2 border-ink bg-ink p-10 md:flex-row md:items-center md:p-12">
              <div>
                <div className="eyebrow eyebrow-ink mb-3">Ready to Talk</div>
                <h2 className="font-display text-display-lg font-bold text-paper">
                  Stop losing bids to a broken database.
                </h2>
                <p className="mt-4 max-w-xl font-sans text-body-lg text-gray-3">
                  Book a Database Health Audit. You&apos;ll know exactly
                  what&apos;s wrong, what it&apos;s costing you, and what it
                  takes to fix it.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href={ctaHref} {...ctaProps} className="btn-on-ink whitespace-nowrap">
                  {SITE.cta}
                </a>
                <Link href="/services" className="btn-on-ink-outline whitespace-nowrap">
                  View Services
                </Link>
              </div>
            </div>
          </StampReveal>
        </div>
      </section>
    </>
  );
}
