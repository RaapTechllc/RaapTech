import { describe, expect, it } from "vitest";
import {
  calculateOffsetLayout,
  formatLengthInches,
  parseLengthInches,
  solveOffsetAngle,
  solveOffsetRadius,
} from "./offset-calculator";

describe("offset calculator geometry engine", () => {
  it("parses decimal, fraction, and mixed-fraction field dimensions", () => {
    expect(parseLengthInches("12.5")).toBe(12.5);
    expect(parseLengthInches("1/2")).toBe(0.5);
    expect(parseLengthInches("12 1/2")).toBe(12.5);
    expect(parseLengthInches("-2 1/4")).toBe(-2.25);
    expect(parseLengthInches("12 nope")).toBeNull();
    expect(parseLengthInches("1/0")).toBeNull();
    expect(parseLengthInches("  ")).toBeNull();
    expect(parseLengthInches("1 2/2")).toBeNull();
    expect(parseLengthInches("-1/2")).toBe(-0.5);
  });

  it("formats dimensions to the nearest sixteenth and reduces fractions", () => {
    expect(formatLengthInches(12.5)).toBe("12 1/2 in");
    expect(formatLengthInches(13.372583002)).toBe("13 3/8 in");
    expect(formatLengthInches(4)).toBe("4 in");
    expect(formatLengthInches(-0.125)).toBe("−1/8 in");
    expect(formatLengthInches(0)).toBe("0 in");
    expect(formatLengthInches(Number.NaN)).toBe("—");
  });

  it("matches the preserved 18-inch radius, 45-degree, 4-inch fixture", () => {
    const result = calculateOffsetLayout({
      radiusIn: 18,
      angleDeg: 45,
      straightIn: 4,
    });
    expect(result.offsetIn).toBeCloseTo(13.372583002, 9);
    expect(result.runIn).toBeCloseTo(28.2842712475, 9);
  });

  it("solves the angle and straight length back from the fixture", () => {
    const solved = solveOffsetAngle({
      radiusIn: 18,
      offsetIn: 13.372583002030478,
      runIn: 28.284271247461906,
    });
    expect(solved).not.toBeNull();
    expect(solved?.angleDeg).toBeCloseTo(45, 5);
    expect(solved?.straightIn).toBeCloseTo(4, 5);
  });

  it("solves radius and straight length back from the fixture", () => {
    const solved = solveOffsetRadius({
      angleDeg: 45,
      offsetIn: 13.372583002030478,
      runIn: 28.284271247461906,
    });
    expect(solved).not.toBeNull();
    expect(solved?.radiusIn).toBeCloseTo(18, 6);
    expect(solved?.straightIn).toBeCloseTo(4, 6);
  });

  it("round-trips representative field layouts", () => {
    for (const fixture of [
      { radiusIn: 12, angleDeg: 30, straightIn: 8 },
      { radiusIn: 24, angleDeg: 60, straightIn: 0 },
      { radiusIn: 9, angleDeg: 22.5, straightIn: 17.25 },
    ]) {
      const layout = calculateOffsetLayout(fixture);
      const angle = solveOffsetAngle({
        radiusIn: fixture.radiusIn,
        offsetIn: layout.offsetIn,
        runIn: layout.runIn,
      });
      const radius = solveOffsetRadius({
        angleDeg: fixture.angleDeg,
        offsetIn: layout.offsetIn,
        runIn: layout.runIn,
      });
      expect(angle?.angleDeg).toBeCloseTo(fixture.angleDeg, 5);
      expect(angle?.straightIn).toBeCloseTo(fixture.straightIn, 5);
      expect(radius?.radiusIn).toBeCloseTo(fixture.radiusIn, 5);
      expect(radius?.straightIn).toBeCloseTo(fixture.straightIn, 5);
    }
  });

  it("keeps inverse solutions inside the forward-layout bounds", () => {
    expect(
      solveOffsetAngle({
        radiusIn: 0.01,
        offsetIn: 0.7129646455628165,
        runIn: 0.7212489168102785,
      }),
    ).toBeNull();
    expect(
      solveOffsetRadius({
        angleDeg: 45,
        offsetIn: 0.7129646455628165,
        runIn: 0.7212489168102785,
      }),
    ).toBeNull();
    expect(
      solveOffsetRadius({
        angleDeg: 0.005,
        offsetIn: 0.0003492029277928991,
        runIn: 4.003141577418732,
      }),
    ).toBeNull();
  });

  it("retains the exact minimum radius through inverse floating-point math", () => {
    const result = solveOffsetRadius({
      angleDeg: 0.05,
      offsetIn: 0.0008727121117039714,
      runIn: 1.0001087022926538,
    });
    expect(result?.radiusIn).toBeCloseTo(0.0625, 10);
    expect(result?.straightIn).toBeCloseTo(1, 10);
  });

  it("solves valid angles at both ends of the supported range", () => {
    const lower = solveOffsetAngle({
      radiusIn: 18,
      offsetIn: 0.0006986800086056692,
      runIn: 4.006283124351796,
    });
    expect(lower?.angleDeg).toBeCloseTo(0.01, 5);
    expect(lower?.straightIn).toBeCloseTo(4, 5);

    const upper = solveOffsetAngle({
      radiusIn: 18,
      offsetIn: 135.96854600027646,
      runIn: 36.0872527437405,
    });
    expect(upper?.angleDeg).toBeCloseTo(89.95, 5);
    expect(upper?.straightIn).toBeCloseTo(100, 5);

    const nearNinety = solveOffsetAngle({
      radiusIn: 0.0625,
      offsetIn: 1.124890536163845,
      runIn: 0.12587261691876633,
    });
    expect(nearNinety?.angleDeg).toBeCloseTo(89.95, 5);
    expect(nearNinety?.straightIn).toBeCloseTo(1, 5);
  });

  it("returns null when a requested inverse layout cannot exist", () => {
    expect(
      solveOffsetAngle({ radiusIn: 18, offsetIn: 2, runIn: 1 }),
    ).toBeNull();
    expect(
      solveOffsetRadius({ angleDeg: 45, offsetIn: 2, runIn: 1 }),
    ).toBeNull();
  });

  it("handles the exact 90-degree special case", () => {
    expect(
      solveOffsetAngle({ radiusIn: 18, runIn: 36, offsetIn: 40 }),
    ).toEqual({ angleDeg: 90, straightIn: 4 });
    expect(
      solveOffsetAngle({
        radiusIn: 18,
        runIn: 36,
        offsetIn: 35.99999999999999,
      }),
    ).toEqual({ angleDeg: 90, straightIn: 0 });
  });

  it("rejects inverse inputs outside supported geometry bounds", () => {
    expect(
      solveOffsetAngle({ radiusIn: 10_001, runIn: 36, offsetIn: 40 }),
    ).toBeNull();
    expect(
      solveOffsetRadius({ angleDeg: 91, runIn: 36, offsetIn: 40 }),
    ).toBeNull();
    expect(
      solveOffsetRadius({ angleDeg: 0.000001, runIn: 36, offsetIn: 40 }),
    ).toBeNull();
  });

  it("rejects invalid forward-layout values", () => {
    expect(() =>
      calculateOffsetLayout({ radiusIn: 0, angleDeg: 45, straightIn: 4 }),
    ).toThrow(/radius/i);
    expect(() =>
      calculateOffsetLayout({ radiusIn: 18, angleDeg: 0, straightIn: 4 }),
    ).toThrow(/angle/i);
    expect(() =>
      calculateOffsetLayout({ radiusIn: 18, angleDeg: 45, straightIn: -1 }),
    ).toThrow(/straight/i);
  });
});
