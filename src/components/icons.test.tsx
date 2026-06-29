import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArrowRight } from "./icons";

describe("ArrowRight", () => {
  it("renders an svg with the default size", () => {
    const { container } = render(<ArrowRight />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveClass("h-4", "w-4");
  });

  it("applies a custom className", () => {
    const { container } = render(<ArrowRight className="h-6 w-6" />);
    expect(container.querySelector("svg")).toHaveClass("h-6", "w-6");
  });
});
