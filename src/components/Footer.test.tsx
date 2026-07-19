import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the company name and tagline", () => {
    render(<Footer />);
    expect(screen.getByText("RAAPTECH")).toBeInTheDocument();
    expect(
      screen.getByText(/Autodesk Fabrication database consultancy/i),
    ).toBeInTheDocument();
  });

  it("renders the contact email as a mailto link", () => {
    render(<Footer />);
    const email = screen.getByRole("link", { name: "TRaap@RaapTech.com" });
    expect(email).toHaveAttribute("href", "mailto:TRaap@RaapTech.com");
  });

  it("renders the LinkedIn link", () => {
    render(<Footer />);
    const linkedIn = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedIn).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/raaptech",
    );
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders every primary navigation link", () => {
    render(<Footer />);
    for (const label of ["Home", "About", "Services", "Results", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("shows the Autodesk trademark attribution and independence disclaimer", () => {
    render(<Footer />);
    expect(
      screen.getByText(/registered trademarks or trademarks of Autodesk, Inc\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /RaapTech is an independent consultancy and is not affiliated with or endorsed by Autodesk, Inc\./i,
      ),
    ).toBeInTheDocument();
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year} RaapTech LLC`)),
    ).toBeInTheDocument();
  });
});
