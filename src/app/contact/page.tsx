import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RaapTech LLC. We work with companies building on AI infrastructure, autonomous systems, and intelligent automation.",
};

const contactInfo = [
  {
    label: "Email",
    value: "tim@raaptech.com",
    href: "mailto:tim@raaptech.com",
    mono: true,
  },
  {
    label: "Company",
    value: "RaapTech LLC",
    href: null,
    mono: false,
  },
  {
    label: "Location",
    value: "United States",
    href: null,
    mono: false,
  },
];

const workTypes = [
  "AI Infrastructure Consulting",
  "Autonomous Agent Development",
  "LLM System Integration",
  "Technical Advisory",
  "Partnership / Collaboration",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Let&apos;s build something
            <br />
            <span className="text-brand-orange">serious.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            We work with companies that are serious about AI infrastructure.
            Tell us what you&apos;re building.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-dark-border">
            {/* Info Panel */}
            <div className="lg:col-span-2 bg-dark-bg p-8">
              <div className="mb-8">
                <h2 className="font-semibold text-white text-lg mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label}>
                      <div className="font-mono text-xs text-slate-600 mb-1 uppercase tracking-wider">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-brand-orange hover:underline ${info.mono ? "font-mono text-sm" : "text-sm"}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span
                          className={`text-slate-300 ${info.mono ? "font-mono text-sm" : "text-sm"}`}
                        >
                          {info.value}
                        </span>
                      )}
                    </div>
                  ))}
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
                  {"// response_time"}
                </div>
                <div className="font-mono text-sm text-brand-emerald">
                  &lt; 24 hours
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Average first response
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="lg:col-span-3 bg-dark-bg p-8">
              <h2 className="font-semibold text-white text-lg mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
