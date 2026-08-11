import { describe, expect, it } from "vitest";
import {
  STANDARD_AIR,
  darcyFrictionFactor,
  equivalentRoundDiameterIn,
  practicalRectangularEquivalents,
  rectangularDuctPerformance,
  roundAreaSqFt,
  roundDuctPerformance,
  solveRoundDuct,
  velocityFpm,
} from "./duct-calculator";

describe("duct calculator engineering engine", () => {
  it("publishes the authorized standard-air and galvanized-steel assumptions", () => {
    expect(STANDARD_AIR).toEqual({
      densityLbmPerFt3: 0.075,
      dynamicViscosityLbmPerFtHour: 0.0432,
      roughnessFt: 0.0005,
    });
  });

  it("calculates round area and velocity from independent geometry literals", () => {
    expect(roundAreaSqFt(10)).toBeCloseTo(0.5454153912, 9);
    expect(velocityFpm(400, 0.5454153912)).toBeCloseTo(733.3859778, 5);
  });

  it("uses 64/Re in laminar flow", () => {
    expect(darcyFrictionFactor(1000, 12)).toEqual({
      factor: 0.064,
      regime: "laminar",
    });
  });

  it("uses a continuous transitional result between laminar and turbulent flow", () => {
    const transition = darcyFrictionFactor(3000, 12);
    expect(transition.regime).toBe("transitional");
    expect(transition.factor).toBeGreaterThan(0.02);
    expect(transition.factor).toBeLessThan(0.04);
  });

  it("matches a Darcy-Weisbach/Haaland round-duct fixture", () => {
    const result = roundDuctPerformance(400, 10);
    expect(result.areaSqFt).toBeCloseTo(0.5454153912, 9);
    expect(result.velocityFpm).toBeCloseTo(733.3859778, 5);
    expect(result.reynoldsNumber).toBeCloseTo(63661.9772368, 3);
    expect(result.frictionFactor).toBeCloseTo(0.0217348593, 8);
    expect(result.frictionRateInWgPer100Ft).toBeCloseTo(0.0873085236, 7);
    expect(result.flowRegime).toBe("turbulent");
  });

  it("matches the Huebscher rectangular equivalent-diameter fixture", () => {
    expect(equivalentRoundDiameterIn(10, 14)).toBeCloseTo(12.8890397831, 8);
  });

  it("checks rectangular velocity separately from equivalent-round friction", () => {
    const result = rectangularDuctPerformance(1000, 10, 14);
    expect(result.areaSqFt).toBeCloseTo(0.9722222222, 9);
    expect(result.velocityFpm).toBeCloseTo(1028.5714286, 5);
    expect(result.equivalentDiameterIn).toBeCloseTo(12.8890397831, 8);
    expect(result.aspectRatio).toBe(1.4);
    expect(result.frictionRateInWgPer100Ft).toBeGreaterThan(0);
  });

  it("solves round diameter by friction and rounds upward for a practical size", () => {
    const result = solveRoundDuct({ cfm: 400, targetFrictionRate: 0.1 });
    expect(result.exactDiameterIn).toBeCloseTo(9.7295353546, 6);
    expect(result.wholeDiameterIn).toBe(10);
    expect(result.limitingCriterion).toBe("friction");
    expect(result.performance.frictionRateInWgPer100Ft).toBeLessThanOrEqual(0.1);
  });

  it("honors an optional maximum-velocity constraint", () => {
    const result = solveRoundDuct({
      cfm: 400,
      targetFrictionRate: 0.1,
      maximumVelocityFpm: 700,
    });
    expect(result.limitingCriterion).toBe("velocity");
    expect(result.wholeDiameterIn).toBe(11);
    expect(result.performance.velocityFpm).toBeLessThanOrEqual(700);
  });

  it("generates unique practical rectangular equivalents at or below 4:1", () => {
    const options = practicalRectangularEquivalents(400, 10);
    expect(options.length).toBeGreaterThanOrEqual(4);
    expect(options[0]).toMatchObject({ widthIn: 10, heightIn: 10, aspectRatio: 1 });
    expect(new Set(options.map((option) => `${option.widthIn}x${option.heightIn}`)).size).toBe(
      options.length,
    );
    for (const option of options) {
      expect(option.aspectRatio).toBeLessThanOrEqual(4);
      expect(option.equivalentDiameterIn).toBeGreaterThanOrEqual(10);
      expect(option.frictionRateInWgPer100Ft).toBeGreaterThan(0);
    }
  });

  it("rejects non-finite and out-of-range field inputs", () => {
    expect(() => roundDuctPerformance(0, 10)).toThrow(/airflow/i);
    expect(() => roundDuctPerformance(400, 0)).toThrow(/diameter/i);
    expect(() => rectangularDuctPerformance(400, 121, 10)).toThrow(/width/i);
    expect(() => solveRoundDuct({ cfm: 400, targetFrictionRate: 0 })).toThrow(
      /friction/i,
    );
    expect(() => roundDuctPerformance(Number.NaN, 10)).toThrow(/airflow/i);
    expect(() => velocityFpm(400, 0)).toThrow(/area/i);
    expect(() => velocityFpm(400, Number.NaN)).toThrow(/area/i);
    expect(() => darcyFrictionFactor(0, 12)).toThrow(/reynolds/i);
    expect(() => darcyFrictionFactor(Number.NaN, 12)).toThrow(/reynolds/i);
    expect(() => darcyFrictionFactor(10_000, 12, -1)).toThrow(/roughness/i);
    expect(() => darcyFrictionFactor(10_000, 12, 0.2)).toThrow(/roughness/i);
    expect(() => darcyFrictionFactor(10_000, 12, Number.NaN)).toThrow(
      /roughness/i,
    );
    expect(() => rectangularDuctPerformance(400, 50, 10)).toThrow(
      /aspect ratio/i,
    );
  });

  it("omits practical rectangles that exceed field dimension bounds", () => {
    expect(practicalRectangularEquivalents(400, 144)).toEqual([]);
  });
});
