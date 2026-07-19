import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "./nav";

describe("NAV_LINKS", () => {
  it("lists the five primary routes in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual([
      "/",
      "/services",
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
});
