// Single source of truth for the primary navigation, shared by Navbar & Footer.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const;

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
