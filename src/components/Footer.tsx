import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
                <span className="font-mono font-bold text-white text-sm">
                  RT
                </span>
              </div>
              <span className="font-mono font-semibold text-white tracking-tight">
                RAAPTECH LLC
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Construction workflow optimization for sheet metal and MEP
              contractors. 20 years of trade experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-brand-emerald mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-brand-emerald mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:tim@raaptech.com"
                  className="text-slate-400 hover:text-brand-orange text-sm transition-colors"
                >
                  tim@raaptech.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-500">
            &copy; {currentYear} RaapTech LLC. All rights reserved.
          </p>
          <p className="font-mono text-xs text-slate-600">
            Construction Workflow Optimization
          </p>
        </div>
      </div>
    </footer>
  );
}
