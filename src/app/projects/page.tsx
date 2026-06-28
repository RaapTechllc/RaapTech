import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "RaapTech project portfolio and case studies. Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero — inverted */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-20 text-paper">
        <div className="absolute inset-0 grid-backdrop" />

        <div className="relative mx-auto max-w-7xl px-6">
          <span className="section-number absolute right-6 top-8 text-[12rem] leading-none text-paper/[0.04] md:text-[16rem]">
            01
          </span>

          <div className="eyebrow eyebrow-ink mb-8">
            <span className="text-hazard">Projects</span>
          </div>

          <h1 className="font-display text-display-2xl font-bold tracking-tight text-paper">
            Case Studies
          </h1>

          <p className="mt-10 max-w-2xl font-sans text-body-lg text-paper-dim">
            Detailed case studies from real engagements are coming soon. In the
            meantime, if you want to hear how we have helped shops like yours,
            reach out directly.
          </p>
        </div>
      </section>

      {/* Placeholder — bold ink block on paper */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-2 border-ink bg-ink p-10 text-paper shadow-hard md:p-16">
            <div className="flex items-center gap-2 border-b-2 border-paper/30 pb-4">
              <span className="status-dot" />
              <span className="font-mono text-xs uppercase tracking-label text-volt">
                In Progress
              </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="font-display text-display-xl font-bold leading-none text-paper">
                  Coming
                  <br />
                  <span className="text-hazard">Soon</span>
                </div>
              </div>

              <div className="lg:col-span-5 lg:self-end">
                <div className="eyebrow eyebrow-ink mb-4">
                  <span className="text-hazard">The Work</span>
                </div>
                <h2 className="font-display text-display-lg font-bold text-paper">
                  Real projects. Real results. No fluff.
                </h2>
                <p className="mt-6 max-w-2xl font-sans text-paper-dim">
                  We are documenting engagements with current clients &mdash;
                  Fabrication database overhauls, estimating workflow
                  improvements, and AI onboarding outcomes. Check back soon.
                </p>
                <div className="mt-10">
                  <Link href="/contact" className="btn-primary">
                    Ask About Our Work
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
