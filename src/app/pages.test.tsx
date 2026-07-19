import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import AboutPage from "./about/page";
import ServicesPage from "./services/page";
import ResultsPage from "./results/page";
import ContactPage from "./contact/page";

// HomePage is an async server component (Next 15 async searchParams), so we
// await it like a function and render the returned JSX.
async function renderHome(searchParams?: Promise<{ diagnostic?: string }>) {
  render(await HomePage({ searchParams }));
}

// Characterization smoke tests: each route renders without throwing and shows
// its hero headline + a stable, route-specific anchor.
describe("page smoke tests", () => {
  it("home renders consultancy eyebrow, hero headline, and primary CTA", async () => {
    await renderHome();
    expect(
      screen.getByText(/Autodesk Fabrication Database Consultancy — Chicago/),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Your Database Is\s*Costing You Bids\.\s*We Fix It\./,
    );
    expect(
      screen.getAllByRole("link", { name: /Book a Database Health Audit/i })[0],
    ).toBeInTheDocument();
  });

  it("home renders the offer ladder with pricing", async () => {
    await renderHome();
    expect(screen.getByText("$2,500")).toBeInTheDocument();
    expect(screen.getByText("$12,000")).toBeInTheDocument();
    expect(screen.getByText("From $1,500/mo")).toBeInTheDocument();
    expect(screen.getByText("Free Database Diagnostic")).toBeInTheDocument();
  });

  it("home renders the diagnostic lead-magnet form", async () => {
    await renderHome();
    const email = screen.getByLabelText(/Work email/i);
    expect(email).toBeRequired();
    expect(email.closest("form")).toHaveAttribute("action", "/api/diagnostic");
    expect(
      screen.getByRole("button", { name: /Send Me the Diagnostic/i }),
    ).toBeInTheDocument();
  });

  it("home shows a confirmation when diagnostic=sent", async () => {
    await renderHome(Promise.resolve({ diagnostic: "sent" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      /diagnostic is on its way/i,
    );
  });

  it("about renders its hero headline", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /The trade background is the product\./,
    );
  });

  it("services renders its headline and a service title", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /The offer ladder\./,
    );
    expect(screen.getAllByText("Database Health Audit")[0]).toBeInTheDocument();
  });

  it("results renders the case-studies headline", () => {
    render(<ResultsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Proof, not promises\./,
    );
  });

  it("contact renders its headline and the contact form", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Talk to someone who has run the floor\./,
    );
    expect(
      screen.getByRole("button", { name: /Send Message/i }),
    ).toBeInTheDocument();
  });
});
