import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-paper bg-hazard">
                <span className="font-mono text-sm font-bold text-ink">RT</span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-paper">
                RAAPTECH LLC
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              Autodesk Fabrication consulting and AI onboarding for sheet metal
              and MEP contractors. 20 years of trade experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-label text-hazard">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-dim transition-colors hover:text-hazard"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-label text-hazard">
              Contact
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:kyle@raaptech.com"
                  className="font-mono text-sm text-paper-dim transition-colors hover:text-hazard"
                >
                  kyle@raaptech.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-volt" />
                <span className="font-mono text-xs uppercase tracking-label text-paper-dim">
                  On-site daily
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t-2 border-paper/20 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-paper-dim">
            &copy; {currentYear} RaapTech LLC. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-label text-paper-dim">
            Autodesk Fabrication Consulting &amp; AI for the Trades
          </p>
        </div>
      </div>
    </footer>
  );
}
