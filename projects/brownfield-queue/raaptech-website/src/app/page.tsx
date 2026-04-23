import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RaapTech LLC — AI Infrastructure & Autonomous Agents",
  description:
    "RaapTech LLC builds AI infrastructure and autonomous agent systems. Founded by Kyle Raap — engineering the future of intelligent automation.",
};

const stats = [
  { value: "4+", label: "Active Projects" },
  { value: "100K+", label: "Agents Deployed" },
  { value: "24/7", label: "Autonomous Ops" },
  { value: "< 50ms", label: "Avg Response" },
];

const features = [
  {
    tag: "01",
    title: "Autonomous Agent Fleets",
    description:
      "Deploy and orchestrate hundreds of AI agents working in parallel. Built-in mission control, real-time monitoring, and adaptive task routing.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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
    title: "LLM Trading Systems",
    description:
      "Production-grade language model integration for financial markets. Real-time signal generation, risk management, and algorithmic execution.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="square"
          strokeWidth={1.5}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
  {
    tag: "03",
    title: "Intelligent SEO Systems",
    description:
      "AI-powered SEO health monitoring and automated reporting. Crawl, analyze, and surface actionable insights at scale.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#FF6B35 1px, transparent 1px), linear-gradient(90deg, #FF6B35 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange to-transparent opacity-40" />

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-emerald" />
              <span className="section-tag">AI Infrastructure</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight mb-8">
              Machines That
              <br />
              <span className="text-brand-orange">Think.</span>
              <br />
              Systems That
              <br />
              <span className="text-brand-emerald">Operate.</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
              RaapTech LLC engineers AI infrastructure and autonomous agent
              systems. From fleet orchestration to LLM-powered trading — we
              build what operates at machine speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects" className="btn-primary">
                View Projects
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary">
                About RaapTech
              </Link>
            </div>
          </div>
        </div>

        {/* Terminal accent */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="border border-dark-border bg-dark-surface p-4 w-72">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-dark-border">
              <div className="w-2 h-2 bg-brand-orange" />
              <span className="font-mono text-xs text-slate-500">
                agent.status
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">fleet_status</span>
                <span className="text-brand-emerald">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">agents_online</span>
                <span className="text-white">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">tasks_queued</span>
                <span className="text-white">1,842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">throughput</span>
                <span className="text-brand-orange">98.4%</span>
              </div>
              <div className="mt-3 pt-3 border-t border-dark-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-emerald animate-pulse" />
                  <span className="text-brand-emerald">All systems nominal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-dark-border bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`px-8 py-10 ${
                  i < stats.length - 1
                    ? "border-r border-dark-border"
                    : ""
                }`}
              >
                <div className="font-mono text-3xl font-bold text-brand-orange mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-slate-500 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">What We Build</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 max-w-xl">
            Infrastructure for the autonomous era
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
            {features.map((feature, i) => (
              <div key={i} className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-brand-orange group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-xs text-slate-600">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="section-tag mb-3 block">Ready to Deploy</span>
              <h2 className="text-3xl font-bold text-white">
                Let&apos;s build something that scales.
              </h2>
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Start a Conversation
              </Link>
              <Link href="/projects" className="btn-secondary whitespace-nowrap">
                See Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
