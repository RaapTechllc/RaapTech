import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the company name and tagline", () => {
    render(<Footer />);
    expect(screen.getByText("RAAPTECH LLC")).toBeInTheDocument();
    expect(
      screen.getByText(/Autodesk Fabrication consulting and AI onboarding/i),
    ).toBeInTheDocument();
  });

  it("renders the contact email as a mailto link", () => {
    render(<Footer />);
    const email = screen.getByRole("link", { name: "kyle@raaptech.com" });
    expect(email).toHaveAttribute("href", "mailto:kyle@raaptech.com");
  });

  it("renders every primary navigation link", () => {
    render(<Footer />);
    for (const label of ["Home", "About", "Services", "Projects", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year} RaapTech LLC`)),
    ).toBeInTheDocument();
  });
});
