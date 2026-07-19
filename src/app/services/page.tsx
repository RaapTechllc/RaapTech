import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { RuleDraw, StampReveal } from "@/components/motion";
import { SITE, bookingHref, bookingIsExternal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Database Health Audit, Remediation Sprint, and monthly retainer for Autodesk Fabrication databases. Transparent pricing for MEP contractors and sheet metal shops.",
};

const offers = [
  {
    name: "Free Database Diagnostic",
    price: "Free",
    note: "Start here — email sign-up",
    description:
      "A self-guided diagnostic that scores your fabrication database across pricing accuracy, item structure, connector health, and documentation. Ten minutes, and you know where you stand.",
    includes: [
      "Scored across the four areas that cost shops the most bids",
      "Plain-language results — no consultant-speak",
      "A baseline you can bring to any conversation about your database",
    ],
    cta: { label: "Get the Diagnostic", href: "/contact" },
  },
  {
    name: "Database Health Audit",
    price: "$2,500",
    note: "Credits in full toward a Sprint started within 30 days",
    description:
      "A full hands-on audit of your Autodesk Fabrication database — CADmep®, CAMduct®, or ESTmep®. We go through it item by item and tell you exactly what's broken and what it costs you.",
    includes: [
      "Item-by-item review: pricing, connectors, seams, pressure classes, labor tables",
      "Written findings report with a prioritized fix list",
      "Straight answer on what the mess is costing you in hours and lost bids",
      "Fix plan you can hand to us — or to anyone",
    ],
    cta: null,
  },
  {
    name: "Remediation Sprint",
    price: "$12,000",
    note: "Founding rate $8,000 — first 3 clients, in exchange for a case study",
    description:
      "A fixed-scope rebuild of everything the audit flags. Not a recommendation report — a working database your estimators feel the first week.",
    includes: [
      "Clean, deduplicated item structure",
      "Corrected pricing and labor tables",
      "Working connectors and pressure classes",
      "Documentation of how the database is built, so it stays maintainable",
    ],
    cta: null,
  },
  {
    name: "Monthly Retainer",
    price: "From $1,500/mo",
    note: "Ongoing ownership of database health",
    description:
      "Databases drift. Prices change, people improvise, vendors update. A retainer keeps your database clean, documented, and current — and gives your team someone to call when something looks wrong.",
    includes: [
      "Scheduled database maintenance and price updates",
      "Documentation kept current as the database evolves",
      "Priority support for your estimators and shop staff",
      "New-item and service setup as your work changes",
    ],
    cta: null,
  },
];

export default function ServicesPage() {
  const ctaHref = bookingHref();
  const ctaExternal = bookingIsExternal();
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <section className="bg-paper pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Services</div>
          <h1 className="max-w-3xl font-display text-display-xl font-bold text-ink">
            The offer ladder. Every rung priced.
          </h1>
          <RuleDraw className="mt-8 max-w-xs border-ink" />
          <p className="mt-8 max-w-2xl font-sans text-body-lg text-gray-1">
            Start free, or start with the audit. Every engagement ends with
            something working — and the audit fee credits toward a Sprint, so
            you never pay twice to find out what&apos;s wrong.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {offers.map((offer, i) => (
              <StampReveal key={offer.name} delayMs={i * 80}>
                <div className="card flex h-full flex-col">
                  <div className="mb-1 font-mono text-xs uppercase tracking-label text-gray-2">
                    {offer.note}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {offer.name}
                  </h2>
                  <div className="mt-2 font-display text-4xl font-bold text-ink">
                    {offer.price}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-gray-1">
                    {offer.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2 border-t-2 border-ink pt-6">
                    {offer.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-gray-1"
                      >
                        <span className="mt-[0.4em] h-2 w-2 shrink-0 bg-ink" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    {offer.cta ? (
                      <Link href={offer.cta.href} className="btn-secondary w-full">
                        {offer.cta.label}
                        <ArrowRight />
                      </Link>
                    ) : (
                      <a href={ctaHref} {...ctaProps} className="btn-primary w-full">
                        {SITE.cta}
                        <ArrowRight />
                      </a>
                    )}
                  </div>
                </div>
              </StampReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="eyebrow eyebrow-ink mb-3">Not Sure Where to Start</div>
              <h2 className="max-w-xl font-display text-display-lg font-bold text-paper">
                Start with the audit. If there&apos;s nothing worth fixing,
                we&apos;ll tell you.
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
