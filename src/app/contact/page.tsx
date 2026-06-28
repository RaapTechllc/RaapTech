import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RaapTech LLC. Autodesk Fabrication consulting and AI onboarding for sheet metal and MEP contractors.",
};

const contactInfo = [
  {
    label: "Email",
    value: "kyle@raaptech.com",
    href: "mailto:kyle@raaptech.com",
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
  "Autodesk Fabrication Consulting",
  "AI Onboarding",
  "Fabrication Database Maintenance",
  "Estimating Workflow Optimization",
  "On-Site Training",
  "Technical Advisory",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero — inverted */}
      <section className="relative overflow-hidden bg-ink pt-16 text-paper">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(237,233,224,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(237,233,224,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="eyebrow eyebrow-ink mb-8">
            <span className="text-hazard">Contact</span>
          </div>

          <h1 className="font-display text-display-2xl font-bold tracking-tight text-paper">
            Let&apos;s talk
            <br />
            <span className="bg-hazard px-2 text-ink">shop.</span>
          </h1>

          <p className="mt-10 max-w-2xl font-sans text-body-lg text-paper-dim">
            Sheet metal and MEP shops run on tight schedules and tighter
            margins. Tell us about your fabrication setup, your estimating
            workflow, and where you want AI or Autodesk Fabrication help &mdash;
            we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      {/* Contact Content — paper */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Get in Touch</div>
          <h2 className="mb-16 max-w-2xl font-display text-display-lg font-bold text-ink">
            Two ways in: the details, or the form.
          </h2>

          <div className="grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink lg:grid-cols-5">
            {/* Info Panel */}
            <div className="relative bg-paper p-8 lg:col-span-2 lg:p-10">
              <span className="section-number absolute right-6 top-4 text-6xl text-ink/10">
                01
              </span>

              <div className="eyebrow mb-6">Direct</div>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label}>
                    <div className="mb-1 font-mono text-xs uppercase tracking-label text-steel">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className={`text-signal underline-offset-4 hover:underline ${
                          info.mono ? "font-mono text-sm" : "text-sm"
                        }`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span
                        className={`text-ink ${
                          info.mono ? "font-mono text-sm" : "text-sm"
                        }`}
                      >
                        {info.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t-2 border-ink pt-8">
                <h3 className="mb-4 font-display text-xl font-bold text-ink">
                  We work on
                </h3>
                <ul className="space-y-3">
                  {workTypes.map((type) => (
                    <li key={type} className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 bg-hazard" />
                      <span className="text-sm text-steel">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-2 border-ink bg-concrete p-4 shadow-hard-sm">
                <div className="mb-2 font-mono text-xs uppercase tracking-label text-steel">
                  {"// response_time"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
                  <span className="font-mono text-sm text-signal">
                    &lt; 24 hours
                  </span>
                </div>
                <div className="mt-1 text-xs text-steel">
                  Average first response
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="relative bg-paper p-8 lg:col-span-3 lg:p-10">
              <span className="section-number absolute right-6 top-4 text-6xl text-ink/10">
                02
              </span>

              <div className="eyebrow mb-6">Send a Message</div>
              <h3 className="mb-8 font-display text-2xl font-bold text-ink">
                Tell us about your shop.
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
