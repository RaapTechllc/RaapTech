import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount React trees between tests (auto-cleanup only registers with globals).
afterEach(() => {
  cleanup();
});
