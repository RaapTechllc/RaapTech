import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import {
  QUESTIONS,
  allLeakingAnswers,
  allTightAnswers,
  bandForLeak,
  diagnosticMailtoHref,
  scoreDiagnostic,
  unansweredQuestionIds,
} from "./database-diagnostic";

describe("database diagnostic scoring", () => {
  it("covers four dimensions with 12 shop-floor questions", () => {
    expect(QUESTIONS).toHaveLength(12);
    const counts = QUESTIONS.reduce<Record<string, number>>((acc, question) => {
      acc[question.dimension] = (acc[question.dimension] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({
      pricing: 3,
      structure: 3,
      connectors: 3,
      documentation: 3,
    });
  });

  it("scores a tight shop at zero leak", () => {
    const result = scoreDiagnostic(allTightAnswers());
    expect(result.leak).toBe(0);
    expect(result.maxLeak).toBe(24);
    expect(result.band).toBe("tight");
    expect(result.headline).toMatch(/isn't the leak/i);
    expect(result.dimensions.every((dimension) => dimension.leak === 0)).toBe(true);
  });

  it("scores a fully leaking shop at max and names the money problem", () => {
    const result = scoreDiagnostic(allLeakingAnswers());
    expect(result.leak).toBe(24);
    expect(result.band).toBe("walking");
    expect(result.headline).toMatch(/rumor/i);
    const pricing = result.dimensions.find((dimension) => dimension.id === "pricing");
    expect(pricing?.line).toMatch(/dual entry/i);
  });

  it("does not treat 6/24 (worst pricing, rest tight) as a tight shop", () => {
    const answers = allTightAnswers();
    answers["pricing-catalog"] = "c";
    answers["pricing-trust"] = "c";
    answers["pricing-dual-entry"] = "c";
    const result = scoreDiagnostic(answers);
    expect(result.leak).toBe(6);
    expect(result.maxLeak).toBe(24);
    expect(bandForLeak(6, 24)).not.toBe("tight");
    expect(result.band).not.toBe("tight");
    expect(result.headline).not.toMatch(/isn't the leak/i);
    const pricing = result.dimensions.find((dimension) => dimension.id === "pricing");
    expect(pricing?.leak).toBe(6);
    expect(pricing?.line).toMatch(/dual entry/i);
    expect(result.summary).toMatch(/Pricing accuracy/i);
  });

  it("calls out dual entry even when the rest of pricing is mixed", () => {
    const answers = allTightAnswers();
    answers["pricing-dual-entry"] = "c";
    answers["pricing-trust"] = "b";
    const result = scoreDiagnostic(answers);
    const pricing = result.dimensions.find((dimension) => dimension.id === "pricing");
    expect(pricing?.leak).toBe(3);
    expect(pricing?.line).toMatch(/dual entry/i);
  });

  it("bands leak scores into shop-language ranges", () => {
    const mixed = allTightAnswers();
    mixed["pricing-catalog"] = "c";
    mixed["pricing-trust"] = "c";
    mixed["pricing-dual-entry"] = "c";
    mixed["docs-written"] = "c";
    mixed["docs-owner"] = "b";
    const result = scoreDiagnostic(mixed);
    expect(result.leak).toBe(9);
    expect(result.band).toBe("hours");
    expect(result.headline).toMatch(/leaking hours/i);
    const docs = result.dimensions.find((dimension) => dimension.id === "documentation");
    expect(docs?.line).toMatch(/one person's head/i);
  });

  it("rejects incomplete answers", () => {
    expect(unansweredQuestionIds({})).toHaveLength(12);
    expect(() => scoreDiagnostic({ "pricing-catalog": "a" })).toThrow(
      /Answer every question/i,
    );
  });

  it("builds an optional mailto with scores, not a capture form", () => {
    const result = scoreDiagnostic(allLeakingAnswers());
    const href = diagnosticMailtoHref(result);
    expect(href.startsWith(`mailto:${SITE.email}?`)).toBe(true);
    expect(decodeURIComponent(href)).toMatch(/Overall leak: 24 \/ 24/);
    expect(decodeURIComponent(href)).toMatch(/Pricing accuracy: 6\/6/);
    expect(decodeURIComponent(href)).toMatch(/self-score/i);
  });
});
