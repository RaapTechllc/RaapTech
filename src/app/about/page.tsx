import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { OdometerStat, RuleDraw, StampReveal } from "@/components/motion";
import { SITE, bookingHref, bookingIsExternal } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Tim Raap",
  description:
    "Tim Raap spent 20+ years in the sheet metal trade — Local Union 73 apprenticeship to Operations Manager at a major Chicago shop. RaapTech is that experience, turned into a consultancy.",
};

const timeline = [
  {
    era: "The Apprenticeship",
    title: "Local Union 73, Chicago",
    body: "Started in the trade the way everyone should — on the bench, learning how sheet metal actually goes together. That foundation is why RaapTech databases reflect how shops really fabricate, not how software demos say they should.",
  },
  {
    era: "The Shop Floor",
    title: "Two decades in MEP fabrication",
    body: "Twenty-plus years across sheet metal fabrication and MEP project environments. CADmep®, CAMduct®, and ESTmep® learned by running real work through them — estimating jobs, building spools, shipping ductwork.",
  },
  {
    era: "The Office",
    title: "Operations Manager, major Chicago sheet metal shop",
    body: "Owned the whole picture: estimating, fabrication, delivery, and the database underneath all of it. Lived the exact problems RaapTech now fixes — pricing nobody trusts, job entry that takes forever, knowledge trapped in one person's head.",
  },
  {
    era: "Now",
    title: "Founder, RaapTech LLC",
    body: "RaapTech exists because the problem is everywhere and almost nobody fixing it has actually run a shop. Tim has. That's the whole pitch.",
  },
];

const stats = [
  { value: "20+", label: "Years in the Trade" },
  { value: "73", label: "Local Union, Chicago" },
  { value: "3", label: "Platforms Mastered" },
  { value: "1", label: "Person You Work With" },
];

export default function AboutPage() {
  const ctaHref = bookingHref();
  const ctaExternal = bookingIsExternal();
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <section className="bg-paper pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">About</div>
          <h1 className="max-w-3xl font-display text-display-xl font-bold text-ink">
            The trade background is the product.
          </h1>
          <RuleDraw className="mt-8 max-w-xs border-ink" />
          <p className="mt-8 max-w-2xl font-sans text-body-lg text-gray-1">
            RaapTech isn&apos;t a software company that discovered construction.
            It&apos;s a tradesman who spent twenty years living the database
            problem — and got tired of watching shops lose bids because of it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 border-2 border-ink md:grid-cols-4">
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
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {timeline.map((item, i) => (
              <StampReveal key={item.era} delayMs={i * 80}>
                <div className="card h-full">
                  <div className="mb-2 font-mono text-xs uppercase tracking-label text-gray-2">
                    {item.era}
                  </div>
                  <h2 className="mb-3 font-display text-xl font-bold text-ink">
                    {item.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-1">
                    {item.body}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — inverted */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow eyebrow-ink mb-4">How We Work</div>
          <h2 className="mb-4 max-w-2xl font-display text-display-lg font-bold text-paper">
            Shop-floor rules, applied to consulting
          </h2>
          <RuleDraw className="mb-16 max-w-xs border-paper" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Say it plain",
                body: "If your database is fine, you'll hear that. If it's a mess, you'll hear exactly why and what it costs. No consultant-speak, no padded findings.",
              },
              {
                title: "Fix, don't present",
                body: "Every engagement ends with something working — not a deck about what could work. You pay for a database your estimators trust.",
              },
              {
                title: "Leave it maintainable",
                body: "Documented structure, clean naming, and a team that knows what it's looking at. The goal is that you never need a rescue again.",
              },
            ].map((item, i) => (
              <StampReveal key={item.title} delayMs={i * 80}>
                <div className="h-full border-2 border-gray-1 bg-ink p-8">
                  <h3 className="mb-3 font-display text-xl font-bold text-paper">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-3">
                    {item.body}
                  </p>
                </div>
              </StampReveal>
            ))}
          </div>

          <StampReveal delayMs={240}>
            <p className="mt-10 font-mono text-sm uppercase tracking-label text-gray-3">
              — Tim Raap, Founder
            </p>
          </StampReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <StampReveal>
            <div className="flex flex-col items-start justify-between gap-8 border-2 border-ink p-10 md:flex-row md:items-center md:p-12">
              <div>
                <div className="eyebrow mb-3">Work With Tim</div>
                <h2 className="font-display text-display-lg font-bold text-ink">
                  Talk to someone who has run the floor.
                </h2>
              </div>
              <a href={ctaHref} {...ctaProps} className="btn-primary whitespace-nowrap">
                {SITE.cta}
                <ArrowRight />
              </a>
            </div>
          </StampReveal>
        </div>
      </section>
    </>
  );
}
