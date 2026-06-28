import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );
}

describe("Navbar", () => {
  it("renders the brand link and the primary navigation", () => {
    renderNavbar();
    expect(screen.getByLabelText("RaapTech Home")).toBeInTheDocument();
    for (const label of ["Home", "About", "Services", "Projects", "Contact"]) {
      expect(
        screen.getAllByRole("link", { name: label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("exposes a theme toggle control", () => {
    renderNavbar();
    expect(screen.getByLabelText("Toggle theme")).toBeInTheDocument();
  });

  it("reveals the mobile menu when the menu button is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const before = screen.getAllByRole("link", { name: "Home" }).length;
    await user.click(screen.getByLabelText("Toggle menu"));
    const after = screen.getAllByRole("link", { name: "Home" }).length;

    expect(after).toBeGreaterThan(before);
  });
});
