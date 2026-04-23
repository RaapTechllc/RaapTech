import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "RaapTech LLC is an AI infrastructure company founded by Kyle Raap, engineering autonomous agent systems and intelligent automation platforms.",
};

const values = [
  {
    tag: "01",
    title: "Machine-First Design",
    description:
      "Every system is built to operate autonomously. Human oversight is a feature, not a requirement for function.",
  },
  {
    tag: "02",
    title: "Production Bias",
    description:
      "Demos are not products. We ship infrastructure that runs in production, handles edge cases, and scales without babysitting.",
  },
  {
    tag: "03",
    title: "Minimal Abstraction",
    description:
      "We build close to the metal where it matters. Fewer layers means fewer failure modes and lower latency.",
  },
  {
    tag: "04",
    title: "Compounding Systems",
    description:
      "The best AI infrastructure gets better over time. Every agent interaction trains the next iteration.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Foundation",
    description:
      "RaapTech LLC founded with a focus on building AI-powered automation infrastructure for complex, multi-step workflows.",
  },
  {
    year: "2023",
    title: "Agent Fleet v1",
    description:
      "Launched first version of AI Agent Fleet — a distributed orchestration system for deploying autonomous task agents at scale.",
  },
  {
    year: "2024",
    title: "LLM Trading Arena",
    description:
      "Developed LLM Trading Arena: a live evaluation framework where language models compete on financial signal generation with real capital exposure.",
  },
  {
    year: "2025",
    title: "Platform Expansion",
    description:
      "Expanded into SEO intelligence with automated health reporting systems and launched BeanzNeez as a standalone consumer product.",
  },
  {
    year: "2026",
    title: "Mission Control",
    description:
      "Shipping Mission Control — a unified dashboard for managing multi-agent fleets, monitoring autonomous workflows, and scaling AI operations.",
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
            Engineering the autonomous infrastructure layer
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            RaapTech LLC is a focused AI infrastructure company. We build the
            systems that let intelligent agents operate, coordinate, and scale —
            without requiring constant human intervention.
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
              <h2 className="text-3xl font-bold text-white mb-6">Kyle Raap</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Kyle Raap is the founder of RaapTech LLC, with a background
                spanning systems engineering, AI research, and applied machine
                learning. He started RaapTech to bridge the gap between
                cutting-edge AI research and production-ready infrastructure.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                His work focuses on the hard problems: deploying LLMs at scale,
                orchestrating autonomous agent fleets, and building systems that
                operate reliably without constant human oversight.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Before RaapTech, Kyle worked on distributed systems and
                algorithmic trading platforms, experience that directly informs
                the reliability-first approach to AI infrastructure he brings to
                every project.
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
                    { key: "primary", value: "AI Infrastructure" },
                    { key: "secondary", value: "Autonomous Agents" },
                    { key: "domain", value: "LLM Systems" },
                    { key: "applied", value: "Algorithmic Trading" },
                    { key: "tooling", value: "Distributed Systems" },
                    { key: "stack", value: "Python, TypeScript, Rust" },
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
                    Currently building Mission Control v2
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
            <span className="section-tag">Operating Principles</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-16">
            How we think about building
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
            <span className="section-tag">Company Timeline</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-16">
            From concept to production
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
