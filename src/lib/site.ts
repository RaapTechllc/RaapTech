/**
 * Canonical site identity, contact, and CTA.
 *
 * Single source of truth — import from here instead of hardcoding.
 * Drop the real Cal.com/Calendly event URL into `bookingUrl` once the
 * account/event exists, then flip `bookingEnabled` to true.
 */
export const SITE = {
  name: "RaapTech LLC",
  legalName: "RaapTech LLC",
  url: "https://raaptech.com",
  founder: "Tim Raap",
  email: "TRaap@RaapTech.com",
  phone: "224-202-6962",
  phoneHref: "tel:+12242026962",
  location: "Elmwood Park, IL — Chicagoland",
  linkedIn: "https://www.linkedin.com/company/raaptech",
  /**
   * Booking link for the Database Health Audit.
   * TODO: paste the live Cal.com/Calendly event URL here.
   * Leave blank to fall back to a pre-filled mailto CTA.
   */
  bookingUrl: "",
  /** Set true once `bookingUrl` points at a live event. */
  bookingEnabled: false,
  cta: "Book a Database Health Audit",
  ctaShort: "Book an Audit",
  /** Pre-filled email fallback used until booking is live. */
  emailSubject: "Database Health Audit — RaapTech",
} as const;

/** Primary CTA target: live scheduler when enabled, else a pre-filled email. */
export function bookingHref(): string {
  if (SITE.bookingEnabled && SITE.bookingUrl) return SITE.bookingUrl;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.emailSubject)}`;
}

/** True when the CTA opens an external scheduler (target/rel handling). */
export function bookingIsExternal(): boolean {
  return SITE.bookingEnabled && SITE.bookingUrl.startsWith("http");
}
