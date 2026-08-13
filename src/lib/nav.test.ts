import { describe, expect, it } from "vitest";
import { isNavLinkActive, NAV_LINKS } from "./nav";

describe("NAV_LINKS", () => {
  it("lists every primary route in order, including Tools", () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      "/",
      "/services",
      "/tools",
      "/about",
      "/results",
      "/contact",
    ]);
  });

  it("gives every link a non-empty href and label", () => {
    for (const link of NAV_LINKS) {
      expect(link.href).toMatch(/^\//);
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it("keeps nested tool routes active without marking Home active everywhere", () => {
    expect(isNavLinkActive("/tools", "/tools")).toBe(true);
    expect(isNavLinkActive("/tools/ductulator", "/tools")).toBe(true);
    expect(isNavLinkActive("/tools/offset-calculator", "/tools")).toBe(true);
    expect(isNavLinkActive("/tools/hanger-spacing", "/tools")).toBe(true);
    expect(isNavLinkActive("/tools/ductulator", "/")).toBe(false);
    expect(isNavLinkActive("/services", "/tools")).toBe(false);
  });
});
