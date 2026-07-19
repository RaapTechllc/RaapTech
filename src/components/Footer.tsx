import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { SITE } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-xl font-bold tracking-tight text-paper">
              RAAPTECH
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-3">
              Autodesk Fabrication database consultancy for MEP contractors and
              sheet metal fabrication shops. Chicago-based, trade-built.
            </p>
            <a
              href={SITE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs uppercase tracking-label text-gray-3 transition-colors hover:text-paper"
            >
              LinkedIn &rarr;
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-label text-gray-3">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-3 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-label text-gray-3">
              Contact
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-sm text-gray-3 transition-colors hover:text-paper"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="font-mono text-sm text-gray-3 transition-colors hover:text-paper"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="font-mono text-xs uppercase tracking-label text-gray-3">
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Trademark attribution + independence disclaimer (required) */}
        <div className="mb-6 border-t border-gray-1 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-gray-2">
            Autodesk, CADmep, CAMduct, and ESTmep are registered trademarks or
            trademarks of Autodesk, Inc., and/or its subsidiaries and/or
            affiliates in the USA and/or other countries. RaapTech is an
            independent consultancy and is not affiliated with or endorsed by
            Autodesk, Inc.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-1 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-gray-2">
            &copy; {currentYear} RaapTech LLC. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-label text-gray-2">
            Fabrication Database Consultancy — Chicago
          </p>
        </div>
      </div>
    </footer>
  );
}
