import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OdometerStat, StampReveal } from "@/components/motion";
import { useInView } from "./useInView";

function Probe() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="probe" data-inview={inView ? "yes" : "no"}>
      probe
    </div>
  );
}

describe("useInView via StampReveal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("marks content in-view immediately under reduced motion", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<Probe />);
    await waitFor(() => {
      expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "yes");
    });
  });
});

describe("StampReveal / OdometerStat", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders stamped children when reduced motion is on", () => {
    render(
      <StampReveal>
        <span>Stamped</span>
      </StampReveal>,
    );
    expect(screen.getByText("Stamped")).toBeInTheDocument();
  });

  it("shows the full numeric value under reduced motion", async () => {
    render(<OdometerStat value="20+" className="stat" />);
    await waitFor(() => {
      expect(screen.getByText("20+")).toBeInTheDocument();
    });
  });

  it("passes through non-numeric labels", async () => {
    render(<OdometerStat value="Daily" />);
    await waitFor(() => {
      expect(screen.getByText("Daily")).toBeInTheDocument();
    });
  });
});
