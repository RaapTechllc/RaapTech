import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { RuleDraw } from "@/components/motion";
import { SITE, bookingHref, bookingIsExternal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Database Health Audit or send a message. RaapTech LLC — Autodesk Fabrication database consultancy, Elmwood Park / Chicago, IL.",
};

export default function ContactPage() {
  const ctaHref = bookingHref();
  const ctaExternal = bookingIsExternal();
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <section className="bg-paper pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow mb-4">Contact</div>
          <h1 className="max-w-3xl font-display text-display-xl font-bold text-ink">
            Talk to someone who has run the floor.
          </h1>
          <RuleDraw className="mt-8 max-w-xs border-ink" />

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">
                Send a message
              </h2>
              <ContactForm />
            </div>

            {/* Direct + booking */}
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-ink">
                  Book directly
                </h2>
                <p className="mb-6 text-base leading-relaxed text-gray-1">
                  The fastest path: book a Database Health Audit call.
                  Twenty minutes, no pitch deck — we&apos;ll talk about
                  what&apos;s broken and whether we can fix it.
                </p>
                <a href={ctaHref} {...ctaProps} className="btn-primary">
                  {SITE.cta}
                </a>
                {/* Cal.com/Calendly embed slot: once SITE.bookingUrl is live,
                    embed the scheduler inline here instead of the link. */}
              </div>

              <div className="border-t-2 border-ink pt-10">
                <h2 className="mb-6 font-display text-2xl font-bold text-ink">
                  Direct
                </h2>
                <ul className="space-y-3">
                  <li>
                    <div className="font-mono text-xs uppercase tracking-label text-gray-2">
                      Email
                    </div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-mono text-base text-ink underline underline-offset-4"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <div className="font-mono text-xs uppercase tracking-label text-gray-2">
                      Phone
                    </div>
                    <a
                      href={SITE.phoneHref}
                      className="font-mono text-base text-ink underline underline-offset-4"
                    >
                      {SITE.phone}
                    </a>
                  </li>
                  <li>
                    <div className="font-mono text-xs uppercase tracking-label text-gray-2">
                      Location
                    </div>
                    <span className="font-mono text-base text-ink">
                      {SITE.location}
                    </span>
                  </li>
                  <li>
                    <div className="font-mono text-xs uppercase tracking-label text-gray-2">
                      LinkedIn
                    </div>
                    <a
                      href={SITE.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base text-ink underline underline-offset-4"
                    >
                      RaapTech LLC
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
