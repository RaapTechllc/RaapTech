import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HVAC Field Tools",
  description:
    "Free browser-based duct sizing and field offset calculators for HVAC sheet metal professionals.",
  alternates: { canonical: "/tools" },
  openGraph: { url: "/tools" },
};

const tools = [
  {
    title: "Duct sizing calculator",
    eyebrow: "Airside",
    description:
      "Size round duct by airflow and friction rate, check existing round or rectangular duct, and compare practical rectangular equivalents.",
    href: "/tools/ductulator",
    cta: "Open duct calculator",
  },
  {
    title: "Field offset calculator",
    eyebrow: "Layout",
    description:
      "Lay out two-elbow offsets or solve the bend angle, centerline radius, and straight spool required to fit a known run.",
    href: "/tools/offset-calculator",
    cta: "Open offset calculator",
  },
] as const;

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
            Fast browser calculators for early sizing and shop or field layout.
            Inputs stay in your browser. Results still require project-specific
            criteria and professional verification.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-2">
          {tools.map((tool) => (
            <article key={tool.href} className="card flex min-h-80 flex-col">
              <div className="eyebrow mb-4">{tool.eyebrow}</div>
              <h2 className="font-display text-display-md font-bold text-ink">
                {tool.title}
              </h2>
              <p className="mt-5 flex-1 text-base leading-relaxed text-gray-1">
                {tool.description}
              </p>
              <Link href={tool.href} className="btn-primary mt-8 self-start">
                {tool.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
