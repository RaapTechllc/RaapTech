import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tim Raap — 20 years of Autodesk Fabrication experience. CADmep, ESTmep, CAMduct consulting for sheet metal and MEP contractors. Now bringing AI to the trades.",
};

const values = [
  {
    tag: "01",
    title: "Trade Knowledge First",
    description:
      "Every recommendation starts with understanding the work. CADmep, BOMs, submittals, fabrication databases — if you haven't lived it, you can't fix it.",
  },
  {
    tag: "02",
    title: "AI as the Tool, Not the Product",
    description:
      "AI is useful when it saves your estimator two hours on a reprice. It's not useful as a buzzword on a slide deck. We deploy what works and skip what doesn't.",
  },
  {
    tag: "03",
    title: "Results Over Process",
    description:
      "Nobody cares how elegant the system is. Did the material takeoff come back right? Did the quote go out on time? Does the crew have what they need? That's what matters.",
  },
  {
    tag: "04",
    title: "On-Site Accountability",
    description:
      "Remote advice is cheap. Showing up at the shop, training the team in person, being there when the workflow breaks — that's what makes it stick.",
  },
];

const timeline = [
  {
    year: "2005",
    title: "Started in the Trade",
    description:
      "First job touching the Autodesk Fabrication Suite. CADmep, ESTmep, CAMduct — learned it all from the shop floor up, mostly by breaking things and fixing them.",
  },
  {
    year: "2010",
    title: "Fabrication Database Specialist",
    description:
      "Became the guy people called when their Fabrication database was sideways. Setup, maintenance, custom libraries — across more shops than I can count.",
  },
  {
    year: "2018",
    title: "Process Optimization Focus",
    description:
      "Started focusing on the real problem: when your senior estimator retires, everything in his head leaves with him. Built workflows to capture that knowledge before it walks out the door.",
  },
  {
    year: "2023",
    title: "Founded RaapTech LLC",
    description:
      "Made it official. Two decades of doing this work on the side — figured it was time to put a name on it and go all in.",
  },
  {
    year: "2025",
    title: "AI Onboarding for the Trades",
    description:
      "Started putting AI tools in people's hands on-site. Claude, ChatGPT — but configured for the actual work: estimating, RFIs, submittals, change orders. Not theory. The real thing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">About RaapTech</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8 max-w-3xl">
            Built by someone who&apos;s actually been on the job site
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            RaapTech isn&apos;t a tech startup that read about construction. It&apos;s 20 years of Autodesk Fabrication work — now with AI bolted on where it actually helps.
          </p>
        </div>
      </section>

      {/* Founder */}
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
                I&apos;ve spent 20 years inside the Autodesk Fabrication Suite — CADmep, ESTmep, CAMduct, Fabrication databases. Not selling it. Using it. Shop floor, field, training crews, fixing whatever broke at 6am.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                I started RaapTech because the trades need someone who speaks both languages. Your shop doesn&apos;t need a Silicon Valley tech team. You need someone who knows what a BOM looks like, understands your fabrication database, and can set up an AI tool your estimator will actually open twice.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Most days I&apos;m on-site at sheet metal and MEP shops. Not consulting from an office — actually there, in the way, asking questions. I use AI tools in my own work every day, and that&apos;s exactly how I bring them to clients.
              </p>
              <div className="flex gap-4">
                <Link href="/contact" className="btn-primary text-xs">
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-dark-border bg-dark-surface p-6">
                <div className="font-mono text-xs text-slate-500 mb-4">
                  {"// expertise_stack"}
                </div>
                <div className="space-y-3 font-mono text-sm">
                  {[
                    { key: "primary", value: "Autodesk Fabrication Suite" },
                    { key: "tools", value: "CADmep / ESTmep / CAMduct" },
                    { key: "domain", value: "Sheet Metal & MEP Ops" },
                    { key: "applied", value: "AI Workflow Design" },
                    { key: "method", value: "Process Automation" },
                    { key: "delivery", value: "On-Site Training" },
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between gap-4">
                      <span className="text-slate-500">{item.key}</span>
                      <span className="text-brand-orange">&quot;{item.value}&quot;</span>
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

      {/* Values */}
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
            {values.map((value, i) => (
              <div key={i} className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors">
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

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Timeline</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-16">
            From the shop floor to AI
          </h2>

          <div className="relative">
            <div className="absolute left-24 top-0 bottom-0 w-px bg-dark-border" />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-24 shrink-0 pt-8">
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
