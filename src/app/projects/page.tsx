import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "RaapTech project portfolio and case studies. Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors.",
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
            Case Studies
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Detailed case studies from real engagements are coming soon. In the meantime, if you want to hear how we have helped shops like yours, reach out directly.
          </p>
        </div>
      </section>

      {/* Placeholder */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-12 text-center">
            <div className="font-mono text-xs text-slate-600 mb-4">COMING SOON</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Real projects. Real results. No fluff.
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
              We are documenting engagements with current clients — Fabrication database overhauls, estimating workflow improvements, and AI onboarding outcomes. Check back soon.
            </p>
            <Link href="/contact" className="btn-primary">
              Ask About Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
