import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "HVAC Field Tools",
  description:
    "Free browser-based database diagnostic, duct sizing, offset, and hanger spacing tools for HVAC sheet metal shops.",
  alternates: { canonical: "/tools" },
  openGraph: { url: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <section className="bg-paper pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Tools</div>
          <h1 className="max-w-4xl font-display text-display-xl font-bold text-ink">
            Field tools. No account. No telemetry.
          </h1>
          <div className="mt-8 max-w-xs border-t-2 border-ink" />
          <p className="mt-8 max-w-3xl font-sans text-body-lg text-gray-1">
            A self-score for the fabrication database, plus fast calculators for
            early sizing and shop or field layout. Inputs stay in your browser.
            Results still require project-specific criteria and professional
            verification.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 sm:gap-4 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <article
              key={tool.href}
              className="flex flex-col border-2 border-ink bg-paper p-4 sm:p-5"
            >
              <div className="eyebrow mb-2">{tool.eyebrow}</div>
              <h2 className="font-display text-lg font-bold leading-tight text-ink sm:text-xl">
                {tool.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-snug text-gray-1">
                {tool.summary}
              </p>
              <Link
                href={tool.href}
                className="mt-4 inline-flex self-start border-2 border-ink bg-ink px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-label text-paper hover:bg-paper hover:text-ink sm:text-xs"
              >
                {tool.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
