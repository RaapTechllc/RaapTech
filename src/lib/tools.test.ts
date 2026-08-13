import { describe, expect, it } from "vitest";
import { TOOLS, getTool } from "./tools";

describe("TOOLS registry", () => {
  it("lists every field tool with slug, name, and href", () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(2);
    for (const tool of TOOLS) {
      expect(tool.slug.length).toBeGreaterThan(0);
      expect(tool.name.length).toBeGreaterThan(0);
      expect(tool.href).toBe(`/tools/${tool.slug}`);
    }
  });

  it("includes the current ductulator and offset calculators", () => {
    expect(TOOLS.map((tool) => tool.slug)).toEqual([
      "ductulator",
      "offset-calculator",
    ]);
    expect(getTool("ductulator").href).toBe("/tools/ductulator");
    expect(getTool("offset-calculator").name).toBe("Field offset calculator");
    expect(() => getTool("nope" as never)).toThrow(/Unknown tool/);
  });
});
