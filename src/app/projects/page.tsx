import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "RaapTech LLC projects: AI Agent Fleet, Mission Control, LLM Trading Arena, BeanzNeez, SEO Health Reports — production AI infrastructure and autonomous systems.",
};

type ProjectStatus = "Live" | "Beta" | "In Development";

interface Project {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  statusColor: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
}

const projects: Project[] = [
  {
    tag: "01",
    title: "AI Agent Fleet / Mission Control",
    subtitle: "Autonomous Agent Orchestration Platform",
    description:
      "A distributed system for deploying, monitoring, and coordinating fleets of autonomous AI agents. Mission Control provides a unified dashboard for managing agent tasks, observing real-time execution, handling failures, and scaling capacity. Built for production workloads with zero manual intervention.",
    status: "In Development",
    statusColor: "text-brand-orange",
    stack: ["Python", "TypeScript", "Redis", "PostgreSQL", "WebSockets", "Docker"],
    metrics: [
      { label: "Concurrent Agents", value: "500+" },
      { label: "Task Throughput", value: "10K/hr" },
      { label: "Failure Recovery", value: "< 2s" },
    ],
    featured: true,
  },
  {
    tag: "02",
    title: "LLM Trading Arena",
    subtitle: "Live LLM Performance Evaluation via Financial Markets",
    description:
      "A real-money evaluation framework where language models compete on financial signal generation. Each model operates autonomously — analyzing market data, generating trading signals, and executing positions. Performance is measured by returns, drawdown, and risk-adjusted metrics. The market doesn't lie.",
    status: "Beta",
    statusColor: "text-brand-emerald",
    stack: ["Python", "LangChain", "GPT-4", "Claude", "Alpaca API", "PostgreSQL"],
    metrics: [
      { label: "Models Active", value: "12" },
      { label: "Strategies Tested", value: "240+" },
      { label: "Live Since", value: "2024" },
    ],
    featured: true,
  },
  {
    tag: "03",
    title: "BeanzNeez",
    subtitle: "Consumer AI Product",
    description:
      "BeanzNeez is a consumer-facing AI application that delivers personalized, intelligent experiences. Built on RaapTech's agent infrastructure, it demonstrates how underlying AI systems can power products for everyday users — not just enterprise deployments.",
    status: "Live",
    statusColor: "text-brand-emerald",
    stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Vercel"],
    metrics: [
      { label: "Status", value: "Production" },
      { label: "Users", value: "Growing" },
      { label: "Platform", value: "Web" },
    ],
    featured: false,
  },
  {
    tag: "04",
    title: "SEO Health Reports",
    subtitle: "AI-Powered SEO Intelligence & Monitoring",
    description:
      "An automated SEO analysis and reporting system that crawls websites, surfaces technical issues, analyzes content quality, and generates actionable improvement reports. Powered by AI for intelligent diagnosis — goes beyond raw crawl data to provide prioritized, context-aware recommendations.",
    status: "Live",
    statusColor: "text-brand-emerald",
    stack: ["Python", "Next.js", "Playwright", "GPT-4", "PostgreSQL", "Redis"],
    metrics: [
      { label: "Checks per Report", value: "200+" },
      { label: "Report Generation", value: "< 5min" },
      { label: "Clients", value: "Active" },
    ],
    featured: false,
  },
];

const statusBadgeClass: Record<ProjectStatus, string> = {
  "Live": "border-brand-emerald/40 text-brand-emerald bg-brand-emerald/5",
  "Beta": "border-brand-orange/40 text-brand-orange bg-brand-orange/5",
  "In Development": "border-slate-600 text-slate-400 bg-slate-800/30",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Projects</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Production AI Systems
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            From autonomous agent fleets to LLM-powered financial markets — each
            project is a production deployment, not a prototype.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Featured</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-dark-border">
            {projects
              .filter((p) => p.featured)
              .map((project, i) => (
                <div
                  key={i}
                  className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-xs text-slate-600">
                      {project.tag}
                    </span>
                    <span
                      className={`font-mono text-xs px-2 py-1 border ${statusBadgeClass[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-slate-500 mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-px bg-dark-border mb-6">
                    {project.metrics.map((metric, j) => (
                      <div key={j} className="bg-dark-surface p-3">
                        <div className="font-mono text-sm font-bold text-brand-orange">
                          {metric.value}
                        </div>
                        <div className="font-mono text-xs text-slate-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-1 border border-dark-border text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">All Projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-border">
            {projects
              .filter((p) => !p.featured)
              .map((project, i) => (
                <div
                  key={i}
                  className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-xs text-slate-600">
                      {project.tag}
                    </span>
                    <span
                      className={`font-mono text-xs px-2 py-1 border ${statusBadgeClass[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-1">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-slate-500 mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-px bg-dark-border mb-6">
                    {project.metrics.map((metric, j) => (
                      <div key={j} className="bg-dark-surface p-3">
                        <div className="font-mono text-sm font-bold text-brand-orange">
                          {metric.value}
                        </div>
                        <div className="font-mono text-xs text-slate-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-1 border border-dark-border text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="section-tag mb-3 block">Collaboration</span>
              <h2 className="text-2xl font-bold text-white">
                Have a project that needs AI infrastructure?
              </h2>
            </div>
            <Link href="/contact" className="btn-primary whitespace-nowrap">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
