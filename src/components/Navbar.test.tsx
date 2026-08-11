import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/tools/ductulator",
}));

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the brand link and every primary navigation route", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("RaapTech Home")).toBeInTheDocument();
    for (const label of ["Home", "Services", "Tools", "About", "Results", "Contact"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });

  it("marks Tools active on a nested calculator route", () => {
    render(<Navbar />);
    for (const link of screen.getAllByRole("link", { name: "Tools" })) {
      expect(link).toHaveClass("underline");
    }
  });

  it("exposes a Book an Audit call to action", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: /Book an Audit/i }).length).toBeGreaterThan(0);
  });

  it("reveals the mobile menu when the menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const before = screen.getAllByRole("link", { name: "Tools" }).length;
    await user.click(screen.getByLabelText("Toggle menu"));
    const after = screen.getAllByRole("link", { name: "Tools" }).length;

    expect(after).toBeGreaterThan(before);
  });
});
