import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kyle Raap — 20 years of Autodesk Fabrication experience. CADmep, ESTmep, CAMduct consulting for sheet metal and MEP contractors. Now bringing AI to the trades.",
};

const expertiseStack = [
  { key: "primary", value: "Autodesk Fabrication Suite" },
  { key: "tools", value: "CADmep / ESTmep / CAMduct" },
  { key: "domain", value: "Sheet Metal & MEP Ops" },
  { key: "applied", value: "AI Workflow Design" },
  { key: "method", value: "Process Automation" },
  { key: "delivery", value: "On-Site Training" },
];

const values = [
  {
    tag: "01",
    title: "Trade Knowledge First",
    description:
      "Every recommendation starts with understanding the work. CADmep, BOMs, submittals, fabrication databases. If you have not lived it, you cannot fix it.",
  },
  {
    tag: "02",
    title: "AI as the Tool, Not the Product",
    description:
      "AI is useful when it saves your estimator two hours on a reprice. It is not useful as a buzzword on a slide deck. We deploy what works and skip what does not.",
  },
  {
    tag: "03",
    title: "Results Over Process",
    description:
      "Nobody cares how elegant the system is. They care that the material takeoff is right, the quote went out on time, and the crew has what they need.",
  },
  {
    tag: "04",
    title: "On-Site Accountability",
    description:
      "Remote advice is cheap. Showing up at the shop, training the team in person, and being there when the workflow breaks. That is what makes it stick.",
  },
];

const timeline = [
  {
    year: "2005",
    title: "Started in the Trade",
    description:
      "Began working with Autodesk Fabrication Suite. CADmep, ESTmep, CAMduct — learning the tools from the shop floor up.",
  },
  {
    year: "2010",
    title: "Fabrication Database Specialist",
    description:
      "Became the go-to person for Fabrication database setup, maintenance, and custom library development across multiple shops.",
  },
  {
    year: "2018",
    title: "Process Optimization Focus",
    description:
      "Shifted focus to estimating workflow optimization and knowledge transfer — helping shops retain what their senior people know.",
  },
  {
    year: "2023",
    title: "Founded RaapTech LLC",
    description:
      "Launched RaapTech to formalize two decades of consulting work and bring AI tools to sheet metal and MEP contractors.",
  },
  {
    year: "2025",
    title: "AI Onboarding for the Trades",
    description:
      "Started deploying AI tools on-site, configured for real construction workflows. Estimating, RFIs, submittals, change orders.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — inverted */}
      <section className="relative overflow-hidden bg-ink pt-16 text-paper">
        <div className="absolute inset-0 grid-backdrop" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <div className="eyebrow eyebrow-ink mb-8">
              <span className="text-hazard">About RaapTech</span>
            </div>

            <h1 className="font-display text-display-2xl font-bold tracking-tight text-paper">
              <span className="block">Built by someone who has</span>
              <span className="mt-[0.08em] block">
                <span className="highlight">actually</span> been on
              </span>
              <span className="block">the job site.</span>
            </h1>

            <p className="mt-10 max-w-2xl font-sans text-body-lg text-paper-dim">
              RaapTech is not a tech startup that read about construction. It is
              20 years of Autodesk Fabrication work, packaged into a consulting
              practice that now includes AI.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Get in Touch
                <ArrowRight />
              </Link>
              <Link href="/services" className="btn-on-ink">
                See Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Founder</div>
          <h2 className="mb-16 max-w-2xl font-display text-display-lg font-bold text-ink">
            Kyle Raap
          </h2>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Bio */}
            <div className="lg:col-span-7">
              <div className="space-y-6 font-sans text-base leading-relaxed text-steel">
                <p>
                  Kyle has spent 20 years inside the Autodesk Fabrication Suite —
                  CADmep, ESTmep, CAMduct, Fabrication databases. Not selling it.
                  Using it. On the shop floor, in the field, training crews,
                  fixing what broke.
                </p>
                <p>
                  He founded RaapTech because the trades need someone who speaks
                  both languages. Your shop does not need a Silicon Valley tech
                  team. It needs someone who understands your fabrication
                  database, knows what a BOM looks like, and can set up an AI tool
                  that your estimator will actually use.
                </p>
                <p>
                  Today Kyle is on-site daily at sheet metal and MEP shops, not
                  just consulting from an office. He uses AI tools in his own work
                  every day, and he brings that same practical approach to every
                  client engagement.
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Expertise spec card — ink panel */}
            <div className="lg:col-span-5 lg:self-start">
              <div className="border-2 border-ink bg-ink text-paper shadow-hard">
                <div className="flex items-center gap-2 border-b-2 border-paper px-4 py-3">
                  <span className="h-2.5 w-2.5 bg-hazard" />
                  <span className="font-mono text-xs uppercase tracking-label text-paper-dim">
                    expertise_stack
                  </span>
                </div>
                <div className="space-y-3 p-4 font-mono text-xs">
                  {expertiseStack.map((item) => (
                    <div key={item.key} className="flex justify-between gap-4">
                      <span className="text-paper-dim">{item.key}</span>
                      <span className="text-right text-signal">
                        &quot;{item.value}&quot;
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center gap-2 border-t-2 border-paper/30 pt-3">
                    <span className="status-dot" />
                    <span className="text-volt">
                      On-site daily — available for new clients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — inverted */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow eyebrow-ink mb-4">
            <span className="text-hazard">How Kyle Works</span>
          </div>
          <h2 className="mb-16 max-w-2xl font-display text-display-lg font-bold text-paper">
            Operating principles
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.tag}
                className="group relative border-2 border-paper bg-ink p-8 shadow-hard-paper transition-transform duration-150 hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none"
              >
                <span className="section-number absolute right-6 top-4 text-6xl text-paper/10">
                  {value.tag}
                </span>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-label text-hazard">
                    {value.tag}
                  </span>
                  <span className="h-[2px] flex-1 bg-paper/20" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-paper">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-paper-dim">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Timeline</div>
          <h2 className="mb-16 max-w-2xl font-display text-display-lg font-bold text-ink">
            From the shop floor to AI
          </h2>

          <div className="border-t-2 border-ink">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="group grid grid-cols-1 gap-4 border-b-2 border-ink py-10 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4 lg:col-span-3">
                  <span className="section-number block text-6xl text-ink transition-colors group-hover:text-hazard sm:text-7xl lg:text-8xl">
                    {item.year}
                  </span>
                </div>
                <div className="md:col-span-8 lg:col-span-7 lg:col-start-5 md:self-center">
                  <h3 className="mb-3 font-display text-xl font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-steel">
                    {item.description}
                  </p>
                </div>
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
                Someone who gets the shop floor and the software.
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
