import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import AboutPage from "./about/page";
import ServicesPage from "./services/page";
import ResultsPage from "./results/page";
import ContactPage from "./contact/page";
import ToolsPage from "./tools/page";
import DuctulatorPage from "./tools/ductulator/page";
import OffsetCalculatorPage from "./tools/offset-calculator/page";

describe("page smoke tests", () => {
  it("home renders consultancy eyebrow, hero headline, and primary CTA", () => {
    render(<HomePage />);
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

  it("home preserves the offer ladder pricing", () => {
    render(<HomePage />);
    expect(screen.getByText("$2,500")).toBeInTheDocument();
    expect(screen.getByText("$12,000")).toBeInTheDocument();
    expect(screen.getByText("From $1,500/mo")).toBeInTheDocument();
    expect(screen.getByText("Free Database Diagnostic")).toBeInTheDocument();
  });

  it("home uses an honest email path for the diagnostic", () => {
    render(<HomePage />);
    expect(screen.queryByLabelText(/Work email/i)).not.toBeInTheDocument();
    const diagnostic = screen.getByRole("link", {
      name: /Request the diagnostic by email/i,
    });
    expect(diagnostic.getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.getByText(/nothing is captured on this page/i)).toBeInTheDocument();
  });

  it("about renders its hero headline", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /The trade background is the product\./,
    );
  });

  it("services renders its headline and a service title", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/The offer ladder\./);
    expect(screen.getAllByText("Database Health Audit")[0]).toBeInTheDocument();
  });

  it("results renders the case-studies headline", () => {
    render(<ResultsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Proof, not promises\./);
  });

  it("contact renders honest direct actions", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Talk to someone who has run the floor\./,
    );
    expect(screen.getByRole("link", { name: /Write an email/i })).toBeInTheDocument();
  });

  it("tools index links to both field calculators", () => {
    render(<ToolsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Field tools/);
    expect(screen.getByRole("link", { name: /Open duct calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
    expect(screen.getByRole("link", { name: /Open offset calculator/i })).toHaveAttribute(
      "href",
      "/tools/offset-calculator",
    );
  });

  it("calculator routes render their native tools", () => {
    const { unmount } = render(<DuctulatorPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Duct sizing calculator/);
    expect(screen.getByLabelText(/Airflow \(CFM\)/i)).toBeInTheDocument();
    unmount();

    render(<OffsetCalculatorPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Field offset calculator/);
    expect(screen.getByLabelText(/Duct diameter/i)).toBeInTheDocument();
  });

  it("calculator routes keep a tools breadcrumb and compact switcher in the page", () => {
    const { unmount } = render(<DuctulatorPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Duct sizing calculator/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Field offset calculator/i })).toHaveAttribute(
      "href",
      "/tools/offset-calculator",
    );
    unmount();

    render(<OffsetCalculatorPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Field offset calculator/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Duct sizing calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
  });
});
