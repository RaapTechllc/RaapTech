import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

// next/image needs a plain <img> under jsdom.
vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    alt,
    src,
    className,
    ...rest
  }: {
    fill?: boolean;
    priority?: boolean;
    alt: string;
    src: string;
    className?: string;
  }) =>
    React.createElement("img", {
      alt,
      src: typeof src === "string" ? src : "",
      className,
      ...rest,
    }),
}));

// jsdom does not implement matchMedia / IntersectionObserver.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_cb: IntersectionObserverCallback) {}
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// Unmount React trees between tests (auto-cleanup only registers with globals).
afterEach(() => {
  cleanup();
});
