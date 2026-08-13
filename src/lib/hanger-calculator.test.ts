import { describe, expect, it } from "vitest";
import {
  distributedFittingPositions,
  estimateHangerLayout,
  regularHangerStations,
} from "./hanger-calculator";
import { hangerSchedule } from "./hanger-data";

describe("hanger schedule bands", () => {
  it("uses conservative rectangular spacing and steps rod size with width", () => {
    expect(hangerSchedule("rectangular", 24)).toEqual({
      maxSizeIn: 30,
      maxSpacingFt: 8,
      minRodIn: 0.25,
    });
    expect(hangerSchedule("rectangular", 48).minRodIn).toBe(0.375);
    expect(hangerSchedule("rectangular", 72).minRodIn).toBe(0.5);
    expect(hangerSchedule("rectangular", 96).minRodIn).toBe(0.5);
  });

  it("uses 10 ft round spacing on smaller diameters and 8 ft on large", () => {
    expect(hangerSchedule("round", 12)).toMatchObject({
      maxSpacingFt: 10,
      minRodIn: 0.25,
    });
    expect(hangerSchedule("round", 30).minRodIn).toBe(0.375);
    expect(hangerSchedule("round", 42).minRodIn).toBe(0.5);
    expect(hangerSchedule("round", 60).maxSpacingFt).toBe(8);
    expect(hangerSchedule("round", 100).minRodIn).toBe(0.625);
  });

  it("rejects zero, negative, and huge sizes", () => {
    expect(() => hangerSchedule("round", 0)).toThrow(/at least 1 in/i);
    expect(() => hangerSchedule("rectangular", -12)).toThrow(/at least 1 in/i);
    expect(() => hangerSchedule("round", 121)).toThrow(/120 in or less/i);
  });
});

describe("regular hanger stations", () => {
  it("places hangers at both ends and at max spacing", () => {
    expect(regularHangerStations(24, 8)).toEqual([0, 8, 16, 24]);
    expect(regularHangerStations(40, 8)).toEqual([0, 8, 16, 24, 32, 40]);
    expect(regularHangerStations(8, 8)).toEqual([0, 8]);
    expect(regularHangerStations(20, 8)).toEqual([0, 8, 16, 20]);
    expect(regularHangerStations(0, 8)).toEqual([]);
    expect(regularHangerStations(40, 0)).toEqual([]);
  });
});

describe("estimateHangerLayout", () => {
  it("counts a straight rectangular run from spacing alone", () => {
    const result = estimateHangerLayout({
      shape: "rectangular",
      sizeIn: 24,
      lengthFt: 40,
      elbowCount: 0,
      intersectionCount: 0,
    });
    expect(result.maxSpacingFt).toBe(8);
    expect(result.minRodLabel).toBe("1/4 in");
    expect(result.regularHangerCount).toBe(6);
    expect(result.extraElbowHangers).toBe(0);
    expect(result.extraIntersectionHangers).toBe(0);
    expect(result.estimatedHangerCount).toBe(6);
  });

  it("adds an elbow hanger when the fitting sits more than 2 ft from a station", () => {
    const result = estimateHangerLayout({
      shape: "rectangular",
      sizeIn: 24,
      lengthFt: 40,
      elbowCount: 3,
      intersectionCount: 0,
    });
    expect(distributedFittingPositions(3, 40)).toEqual([10, 20, 30]);
    expect(result.extraElbowHangers).toBe(1);
    expect(result.estimatedHangerCount).toBe(7);
  });

  it("does not double-count a fitting that already sits on a regular station", () => {
    const result = estimateHangerLayout({
      shape: "round",
      sizeIn: 12,
      lengthFt: 40,
      elbowCount: 1,
      intersectionCount: 0,
    });
    expect(distributedFittingPositions(1, 40)).toEqual([20]);
    expect(result.maxSpacingFt).toBe(10);
    expect(result.regularHangerCount).toBe(5);
    expect(result.extraElbowHangers).toBe(0);
    expect(result.estimatedHangerCount).toBe(5);
  });

  it("adds an intersection hanger when 10 ft spacing leaves a 5 ft midspan", () => {
    const result = estimateHangerLayout({
      shape: "round",
      sizeIn: 12,
      lengthFt: 50,
      elbowCount: 0,
      intersectionCount: 1,
    });
    expect(distributedFittingPositions(1, 50)).toEqual([25]);
    expect(result.extraIntersectionHangers).toBe(1);
    expect(result.estimatedHangerCount).toBe(result.regularHangerCount + 1);
  });

  it("lets an added elbow hanger also cover a tee at the same estimate position", () => {
    const result = estimateHangerLayout({
      shape: "round",
      sizeIn: 12,
      lengthFt: 50,
      elbowCount: 1,
      intersectionCount: 1,
    });
    expect(result.extraElbowHangers).toBe(1);
    expect(result.extraIntersectionHangers).toBe(0);
    expect(result.estimatedHangerCount).toBe(result.regularHangerCount + 1);
  });

  it("rejects impossible run length and fitting counts", () => {
    const base = {
      shape: "rectangular" as const,
      sizeIn: 24,
      lengthFt: 40,
      elbowCount: 0,
      intersectionCount: 0,
    };
    expect(() => estimateHangerLayout({ ...base, lengthFt: 0 })).toThrow(/Run length/i);
    expect(() => estimateHangerLayout({ ...base, lengthFt: 20_000 })).toThrow(/Run length/i);
    expect(() => estimateHangerLayout({ ...base, elbowCount: -1 })).toThrow(/Elbow count/i);
    expect(() => estimateHangerLayout({ ...base, intersectionCount: 1.5 })).toThrow(
      /whole number/i,
    );
  });
});
