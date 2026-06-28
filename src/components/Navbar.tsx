"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-ink bg-paper">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="RaapTech Home"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center border-2 border-ink bg-hazard transition-transform duration-150 group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
            <span className="font-mono text-sm font-bold text-ink">RT</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            RAAPTECH
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-mono text-xs font-medium uppercase tracking-label transition-colors ${
                  pathname === link.href
                    ? "text-hazard"
                    : "text-ink hover:text-hazard"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:inline-flex btn-primary">
            Get in Touch
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex h-9 w-9 items-center justify-center border-2 border-ink text-ink md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="square"
                strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t-2 border-ink bg-paper md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-ink/15 last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 font-mono text-xs font-medium uppercase tracking-label transition-colors ${
                    pathname === link.href
                      ? "text-hazard"
                      : "text-ink hover:text-hazard"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
