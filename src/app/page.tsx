import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RaapTech LLC — Construction Workflow Optimization",
  description:
    "20 years in MEP fabrication. Thousands of admin hours eliminated. We audit your construction workflows, find the bottlenecks, and fix them. Book a free workflow consultation.",
};

const painPoints = [
  {
    tag: "01",
    title: "Change orders buried in email",
    description:
      "An owner sends a change order. It sits in someone's inbox for a week. By the time your PM finds it, the field already built it wrong. Now you're eating the cost and the rework.",
  },
  {
    tag: "02",
    title: "Daily reports nobody trusts",
    description:
      "Foremen call it in. Office staff transcribes it. Half the details are missing, the other half are wrong. When a dispute shows up six months later, your documentation is a mess.",
  },
  {
    tag: "03",
    title: "Submittal tracking by spreadsheet",
    description:
      "Your PM is manually updating a tracker at 6 PM because the sub forgot to confirm receipt. Meanwhile, the architect is asking where the shop drawings are — for the third time this week.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book a free call",
    description:
      "20 minutes. We'll talk about where your team is losing time and whether we can help. No pitch deck, no pressure.",
  },
  {
    number: "02",
    title: "We audit your workflows",
    description:
      "We sit down with your PMs, your foremen, and your office staff. We map how information actually moves through your projects — and where it breaks down.",
  },
  {
    number: "03",
    title: "You get your hours back",
    description:
      "We fix the biggest bottleneck. Not a recommendation report — a working process change your team is already using. Most clients save 6–12 hours per week.",
  },
];

const services = [
  {
    tier: "Free",
    name: "Workflow Consultation",
    price: "No cost",
    timeline: "20 minutes",
    description:
      "A conversation about where your team is losing time. We'll tell you honestly whether we can help.",
    cta: "Book a Call",
    href: "/contact",
    featured: false,
  },
  {
    tier: "Starter",
    name: "Workflow Audit + First Fix",
    price: "$3K – $5K",
    timeline: "5–10 business days",
    description:
      "Full documentation of your current admin workflows. Bottleneck identification. One workflow rebuilt, tested, and handed off. 30-day follow-up check-in.",
    cta: "Get Started",
    href: "/contact",
    featured: true,
  },
  {
    tier: "Full",
    name: "Construction Ops Upgrade",
    price: "$8K – $15K",
    timeline: "4–8 weeks",
    description:
      "Multiple workflows redesigned. Field-to-office handoffs rebuilt. Staff training and documentation. Ongoing support through rollout.",
    cta: "Let's Talk",
    href: "/contact",
    featured: false,
  },
  {
    tier: "Ongoing",
    name: "Operations Support",
    price: "$2K – $6K/mo",
    timeline: "Monthly retainer",
    description:
      "Continuous workflow monitoring and optimization. New process builds as your projects evolve. Priority support and regular check-ins.",
    cta: "Learn More",
    href: "/contact",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════ */}
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
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange to-transparent opacity-40" />

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-emerald" />
              <span className="section-tag">Construction Workflow Optimization</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight mb-8">
              20 Years in MEP.
              <br />
              <span className="text-brand-orange">Thousands of Admin</span>
              <br />
              <span className="text-brand-orange">Hours Eliminated.</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
              Your project managers are spending hours on work that should take minutes. We find the bottlenecks in your construction workflows and fix them &mdash; so your team can get back to building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Book a Free Workflow Audit
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
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
          </div>
        </div>

        {/* Terminal accent */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="border border-dark-border bg-dark-surface p-4 w-72">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-dark-border">
              <div className="w-2 h-2 bg-brand-orange" />
              <span className="font-mono text-xs text-slate-500">
                raaptech.status
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">specialty</span>
                <span className="text-brand-emerald">MEP / SHEET METAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">experience</span>
                <span className="text-white">20 yrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">active_clients</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">avg_time_saved</span>
                <span className="text-brand-orange">6–12 hrs/wk</span>
              </div>
              <div className="mt-3 pt-3 border-t border-dark-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-emerald animate-pulse" />
                  <span className="text-brand-emerald">Accepting new clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-dark-border bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "20", label: "Years in MEP" },
              { value: "4", label: "Active Clients" },
              { value: "6–12", label: "Hours Saved / Week" },
              { value: "Daily", label: "On-Site" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`px-8 py-10 ${i < 3 ? "border-r border-dark-border" : ""}`}
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

      {/* ═══════════════════════════════════════════
          SECTION 2: PROBLEM
      ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">The Problem</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
            The job isn&apos;t falling apart at the jobsite. It&apos;s falling apart in your inbox.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-16">
            Missed follow-ups. RFIs that sat for two weeks. Subs waiting on approvals that were &ldquo;sent&rdquo; but never confirmed. Admin drag is a slow leak &mdash; it doesn&apos;t show up on a cost report, but it&apos;s costing you real money.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-dark-bg p-8 hover:bg-dark-surface transition-colors group">
                <span className="font-mono text-xs text-slate-600 mb-4 block">
                  {point.tag}
                </span>
                <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-brand-orange transition-colors">
                  {point.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: SOLUTION
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
            A workflow audit that ends with something working &mdash; not a slide deck.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-12">
            We map your PM workflows from daily log to submittal tracking to closeout, identify the top bottlenecks eating the most time, and fix one of them. Completely. In under two weeks.
          </p>

          <div className="border border-dark-border bg-dark-surface p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-brand-emerald mb-6">
                  What&apos;s included
                </h3>
                <ul className="space-y-4">
                  {[
                    "2-hour workflow mapping session with your PM team",
                    "Written bottleneck analysis — plain English, no jargon",
                    "One workflow rebuilt, tested, and handed off",
                    "Documentation your staff can actually use",
                    "30-day follow-up check-in",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-brand-orange mt-2 shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-brand-emerald mb-6">
                  Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Investment</div>
                    <div className="text-2xl font-bold text-white">$3,000 – $5,000</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Timeline</div>
                    <div className="text-white font-semibold">5–10 business days</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Typical result</div>
                    <div className="text-white font-semibold">6–12 hours/week saved per PM</div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    Book a Free Workflow Audit
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 max-w-xl">
            Three steps. No complexity.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="font-mono text-6xl font-bold text-dark-border mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-white text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-dark-border">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeWidth={1} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: PROOF
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-dark-border bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Why Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 max-w-xl">
            We know this trade because we&apos;ve worked in it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
            {[
              {
                stat: "20 Years",
                label: "Autodesk Fabrication Experience",
                description:
                  "CADmep, ESTmep, CAMduct — learned on the shop floor, not from a sales deck. Tim Raap has been solving fabrication workflow problems since before most consultants knew what BIM was.",
              },
              {
                stat: "4 Active",
                label: "Construction Clients",
                description:
                  "We limit new engagements to maintain quality. Every client gets direct access to Tim — not a junior associate, not a subcontractor. The person who scoped the work does the work.",
              },
              {
                stat: "Daily",
                label: "On-Site at a Sheet Metal Shop",
                description:
                  "Not remote-only. Not fly-in-fly-out. Tim works on-site daily at an active sheet metal fabrication shop. He sees the problems as they happen — not weeks later in a status report.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-dark-bg p-8">
                <div className="font-mono text-3xl font-bold text-brand-orange mb-1">
                  {item.stat}
                </div>
                <div className="font-mono text-xs text-slate-500 tracking-wider uppercase mb-4">
                  {item.label}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: SERVICES
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
            Start with a conversation. Scale when it makes sense.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-16">
            Every engagement starts with a free call. If we can help, we&apos;ll tell you exactly how. If we can&apos;t, we&apos;ll tell you that too.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
            {services.map((service, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col ${
                  service.featured
                    ? "bg-dark-surface border border-brand-orange"
                    : "bg-dark-bg"
                }`}
              >
                <div className="font-mono text-xs text-brand-emerald tracking-widest uppercase mb-2">
                  {service.tier}
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">
                  {service.name}
                </h3>
                <div className="font-mono text-2xl font-bold text-brand-orange mb-1">
                  {service.price}
                </div>
                <div className="font-mono text-xs text-slate-500 mb-4">
                  {service.timeline}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className={service.featured ? "btn-primary text-sm" : "btn-secondary text-sm"}
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: ABOUT
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-dark-border bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-emerald" />
            <span className="section-tag">About</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built by someone who&apos;s actually been on the job site.
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Tim Raap spent two decades in Autodesk Fabrication and MEP project environments. He knows how shop drawings, change orders, and field coordination are supposed to flow — and what it looks like when they don&apos;t.
                </p>
                <p>
                  He&apos;s not guessing at where construction companies waste time. He&apos;s seen it from the inside — daily, on-site, at an active sheet metal fabrication shop. The problems he solves are the ones he&apos;s lived with.
                </p>
                <p>
                  RaapTech exists because most workflow consultants have never held a tape measure. Tim has. That&apos;s the difference.
                </p>
              </div>
            </div>

            <div className="border border-dark-border bg-dark-bg p-8">
              <h3 className="font-mono text-xs tracking-widest uppercase text-brand-emerald mb-6">
                Tim Raap
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-dark-border pb-3">
                  <span className="text-slate-500">role</span>
                  <span className="text-white">Founder</span>
                </div>
                <div className="flex justify-between border-b border-dark-border pb-3">
                  <span className="text-slate-500">background</span>
                  <span className="text-white">MEP Fabrication</span>
                </div>
                <div className="flex justify-between border-b border-dark-border pb-3">
                  <span className="text-slate-500">experience</span>
                  <span className="text-brand-orange">20 years</span>
                </div>
                <div className="flex justify-between border-b border-dark-border pb-3">
                  <span className="text-slate-500">tools</span>
                  <span className="text-white">CADmep / ESTmep / CAMduct</span>
                </div>
                <div className="flex justify-between border-b border-dark-border pb-3">
                  <span className="text-slate-500">on_site</span>
                  <span className="text-brand-orange">Daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">contact</span>
                  <a href="mailto:tim@raaptech.com" className="text-brand-orange hover:text-white transition-colors">
                    tim@raaptech.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-dark-border bg-dark-surface p-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-emerald" />
              <span className="section-tag">Ready to Talk</span>
              <div className="w-8 h-px bg-brand-emerald" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your team&apos;s time is worth more than admin work.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              20 minutes. No pitch deck. We&apos;ll talk about where your team is losing time — and whether we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Book a Free Workflow Audit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
