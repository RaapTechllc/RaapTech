import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tim Raap — 20 years of Autodesk Fabrication and construction workflow experience. CADmep, ESTmep, CAMduct consulting for sheet metal and MEP contractors.",
};

const values = [
  {
    tag: "01",
    title: "Trade Knowledge First",
    description:
      "Every recommendation starts with understanding the work. CADmep, BOMs, submittals, fabrication databases. If you have not lived it, you cannot fix it.",
  },
  {
    tag: "02",
    title: "Process Before Tools",
    description:
      "Software does not fix a broken workflow. We map how information actually moves through your projects first, then apply the right tool — including AI when it earns its place.",
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
      "Remote advice is cheap. Showing up at the shop, training the team in person, and being there when the workflow breaks — that is what makes it stick.",
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
      "Launched RaapTech to formalize two decades of consulting work for sheet metal and MEP contractors.",
  },
  {
    year: "2025",
    title: "Construction Workflow Optimization",
    description:
      "Expanded focus to PM admin workflows — submittals, daily reports, change orders — and practical AI deployment on-site.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">About RaapTech</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8 max-w-3xl">
            Built by someone who has actually been on the job site
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            RaapTech is not a tech startup that read about construction. It is 20
            years of Autodesk Fabrication work, packaged into a consulting practice
            focused on workflow optimization for MEP and sheet metal contractors.
          </p>
        </div>
      </section>

      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-brand-emerald" />
                <span className="section-tag">Founder</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Tim Raap</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Tim has spent 20 years inside the Autodesk Fabrication Suite —
                CADmep, ESTmep, CAMduct, Fabrication databases. Not selling it.
                Using it. On the shop floor, in the field, training crews, fixing
                what broke.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                He founded RaapTech because the trades need someone who speaks
                both languages. Your shop does not need a Silicon Valley tech team.
                It needs someone who understands your fabrication database, knows
                what a BOM looks like, and can fix the admin workflows that eat
                your PMs&apos; week.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Today Tim is on-site daily at sheet metal and MEP shops — not just
                consulting from an office. He brings that same practical approach
                to every client engagement.
              </p>
              <Link href="/contact#book" className="btn-primary text-xs">
                {SITE.cta}
              </Link>
            </div>

            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <div className="font-mono text-xs text-slate-500 mb-4">
                  {"// expertise_stack"}
                </div>
                <div className="space-y-3 font-mono text-sm">
                  {[
                    { key: "primary", value: "Construction Workflow Ops" },
                    { key: "tools", value: "CADmep / ESTmep / CAMduct" },
                    { key: "domain", value: "Sheet Metal & MEP" },
                    { key: "applied", value: "Workflow Audit & Fix" },
                    { key: "method", value: "Process Automation" },
                    { key: "delivery", value: "On-Site Training" },
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between gap-4">
                      <span className="text-slate-500">{item.key}</span>
                      <span className="text-brand-orange">
                        &quot;{item.value}&quot;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-dark-border bg-dark-surface p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-emerald animate-pulse" />
                  <span className="font-mono text-xs text-brand-emerald">
                    On-site daily — available for new clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">How Tim Works</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-16">
            Operating principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-border">
            {values.map((value) => (
              <div
                key={value.tag}
                className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-slate-600">
                    {value.tag}
                  </span>
                  <div className="h-px flex-1 bg-dark-border" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Timeline</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-16">
            From the shop floor to workflow optimization
          </h2>

          <div className="relative">
            <div className="absolute left-16 sm:left-24 top-0 bottom-0 w-px bg-dark-border" />
            <div className="space-y-0">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6 sm:gap-8 group">
                  <div className="w-16 sm:w-24 shrink-0 pt-8">
                    <span className="font-mono text-sm font-bold text-brand-orange">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative pt-8 pb-8 flex-1 border-b border-dark-border last:border-b-0">
                    <div className="absolute left-0 top-10 w-3 h-3 border border-brand-orange bg-dark-bg -translate-x-[calc(50%+0.5px)] group-hover:bg-brand-orange transition-colors" />
                    <h3 className="font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
