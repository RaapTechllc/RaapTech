import type { Metadata } from "next";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free workflow consultation with Tim Raap. Construction workflow optimization for MEP and sheet metal contractors.",
};

const workTypes = [
  "Construction Workflow Audit ($3K–$5K)",
  "Autodesk Fabrication Consulting",
  "AI Onboarding for MEP & Sheet Metal",
  "Operations Support (Retainer)",
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Book a free
            <br />
            <span className="text-brand-orange">workflow consultation.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            20 minutes. No pitch deck. Tell us where your team is losing time —
            we&apos;ll tell you if we can help.
          </p>
        </div>
      </section>

      <section className="py-16" id="book">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-dark-border">
            <div className="lg:col-span-2 bg-dark-bg p-8">
              <h2 className="font-semibold text-white text-lg mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 mb-8">
                <div>
                  <div className="font-mono text-xs text-slate-600 mb-1 uppercase tracking-wider">
                    Email
                  </div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-brand-orange hover:underline font-mono text-sm"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-600 mb-1 uppercase tracking-wider">
                    Phone
                  </div>
                  <a
                    href={SITE.phoneHref}
                    className="text-brand-orange hover:underline font-mono text-sm"
                  >
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-600 mb-1 uppercase tracking-wider">
                    Company
                  </div>
                  <span className="text-slate-300 text-sm">{SITE.name}</span>
                </div>
              </div>

              <div className="border-t border-dark-border pt-8 mb-8">
                <h3 className="font-semibold text-white mb-4">We work on</h3>
                <ul className="space-y-2">
                  {workTypes.map((type) => (
                    <li key={type} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-brand-orange" />
                      <span className="text-slate-400 text-sm">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-dark-border bg-dark-surface p-4">
                <div className="font-mono text-xs text-slate-500 mb-2">
                  {"// fastest_path"}
                </div>
                <div className="text-sm text-slate-300">
                  The consultation call is the fastest way to see if a workflow
                  audit fits your team.
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-dark-bg p-8">
              <h2 className="font-semibold text-white text-lg mb-2">
                Pick a time
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Calendar not loading? Call{" "}
                <a href={SITE.phoneHref} className="text-brand-orange">
                  {SITE.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${SITE.email}?subject=Workflow%20Consultation`}
                  className="text-brand-orange"
                >
                  {SITE.email}
                </a>
                .
              </p>
              <CalendlyEmbed />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
