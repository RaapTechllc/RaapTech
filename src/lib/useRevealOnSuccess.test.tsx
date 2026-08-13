import { render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRevealOnSuccess } from "./useRevealOnSuccess";

function Probe({ autoReveal }: { autoReveal: boolean }) {
  const { ref, reveal } = useRevealOnSuccess<HTMLDivElement>();
  useEffect(() => {
    if (autoReveal) reveal();
  }, [autoReveal, reveal]);
  return (
    <div ref={ref} tabIndex={-1} data-testid="panel">
      Results
    </div>
  );
}

describe("useRevealOnSuccess", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("scrolls and focuses the panel after reveal()", async () => {
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    const focus = vi.spyOn(HTMLElement.prototype, "focus");
    render(<Probe autoReveal />);

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it("does not scroll on first mount without reveal()", () => {
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    render(<Probe autoReveal={false} />);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
