import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import AboutPage from "./about/page";
import ServicesPage from "./services/page";
import ProjectsPage from "./projects/page";
import ContactPage from "./contact/page";

// Characterization smoke tests: each route renders without throwing and shows
// its hero headline + a stable, route-specific anchor.
describe("page smoke tests", () => {
  it("home renders brand, hero headline, and primary CTA", () => {
    render(<HomePage />);
    expect(screen.getByText("RAAPTECH")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /20 Years in/,
    );
    expect(
      screen.getByRole("link", { name: /View Services/i }),
    ).toBeInTheDocument();
  });

  it("about renders its hero headline", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Built by someone who has/,
    );
  });

  it("services renders its headline and a service title", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Two things we do/,
    );
    expect(
      screen.getByText("Autodesk Fabrication Consulting"),
    ).toBeInTheDocument();
  });

  it("projects renders the case-studies headline", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Case Studies/,
    );
  });

  it("contact renders its headline and the contact form", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/talk/i);
    expect(
      screen.getByRole("button", { name: /Send Message/i }),
    ).toBeInTheDocument();
  });
});
