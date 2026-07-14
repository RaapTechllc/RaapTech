import { act, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useInView } from "./useInView";
import { OdometerStat, StampReveal } from "@/components/motion";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  elements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.elements.push(el);
  }

  unobserve() {}
  disconnect() {}

  trigger(isIntersecting: boolean) {
    const entries = this.elements.map(
      (target) =>
        ({
          isIntersecting,
          target,
          intersectionRatio: isIntersecting ? 1 : 0,
        }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

describe("useInView", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("flips inView when the observed node intersects", () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());
    const node = document.createElement("div");
    // Attach ref manually — renderHook doesn't mount a DOM node for us.
    (
      result.current.ref as { current: HTMLDivElement | null }
    ).current = node;

    // Re-run effect with the ref populated
    const { result: result2, rerender } = renderHook(() =>
      useInView<HTMLDivElement>(),
    );
    act(() => {
      (result2.current.ref as { current: HTMLDivElement | null }).current =
        node;
      rerender();
    });

    const observer = MockIntersectionObserver.instances.at(-1);
    expect(observer).toBeTruthy();
    act(() => {
      observer?.observe(node);
      observer?.trigger(true);
    });
    expect(result2.current.inView).toBe(true);
  });

  it("is immediately in view when reduced motion is preferred", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result, rerender } = renderHook(() => useInView<HTMLDivElement>());
    const node = document.createElement("div");
    act(() => {
      (result.current.ref as { current: HTMLDivElement | null }).current =
        node;
      rerender();
    });
    expect(result.current.inView).toBe(true);
  });
});

describe("StampReveal / OdometerStat", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders stamped children when reduced motion is on", () => {
    render(
      <StampReveal>
        <span>Stamped</span>
      </StampReveal>,
    );
    expect(screen.getByText("Stamped")).toBeInTheDocument();
  });

  it("shows the full numeric value under reduced motion", () => {
    render(<OdometerStat value="20+" className="stat" />);
    expect(screen.getByText("20+")).toBeInTheDocument();
  });

  it("passes through non-numeric labels", () => {
    render(<OdometerStat value="Daily" />);
    expect(screen.getByText("Daily")).toBeInTheDocument();
  });
});
