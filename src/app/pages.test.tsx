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
import HangerSpacingPage from "./tools/hanger-spacing/page";
import DatabaseDiagnosticPage from "./tools/database-diagnostic/page";

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

  it("home points the free diagnostic at the in-browser tool", () => {
    render(<HomePage />);
    expect(screen.queryByLabelText(/Work email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Request the diagnostic by email/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/nothing is captured on this page/i)).not.toBeInTheDocument();
    const diagnosticLinks = screen.getAllByRole("link", { name: /Open the diagnostic/i });
    expect(diagnosticLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of diagnosticLinks) {
      expect(link).toHaveAttribute("href", "/tools/database-diagnostic");
    }
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
    expect(screen.getByRole("link", { name: /Get the Diagnostic/i })).toHaveAttribute(
      "href",
      "/tools/database-diagnostic",
    );
    expect(screen.getByText(/Start here — 10 minutes, no account/i)).toBeInTheDocument();
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

  it("tools index links to each field calculator", () => {
    render(<ToolsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Field tools/);
    expect(screen.getByRole("link", { name: /Open database diagnostic/i })).toHaveAttribute(
      "href",
      "/tools/database-diagnostic",
    );
    expect(screen.getByRole("link", { name: /Open duct calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
    expect(screen.getByRole("link", { name: /Open offset calculator/i })).toHaveAttribute(
      "href",
      "/tools/offset-calculator",
    );
    expect(screen.getByRole("link", { name: /Open hanger calculator/i })).toHaveAttribute(
      "href",
      "/tools/hanger-spacing",
    );
  });

  it("calculator routes render their native tools", () => {
    const ductulator = render(<DuctulatorPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Duct sizing calculator/);
    expect(screen.getByLabelText(/Airflow \(CFM\)/i)).toBeInTheDocument();
    ductulator.unmount();

    const offset = render(<OffsetCalculatorPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Field offset calculator/);
    expect(screen.getByLabelText(/Duct diameter/i)).toBeInTheDocument();
    offset.unmount();

    const hanger = render(<HangerSpacingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Hanger spacing calculator/);
    expect(screen.getByLabelText(/Horizontal run length/i)).toBeInTheDocument();
    hanger.unmount();

    render(<DatabaseDiagnosticPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Database diagnostic/);
    expect(screen.getByRole("button", { name: /Score the database/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pricing accuracy/i })).toBeInTheDocument();
  });

  it("calculator routes keep a tools breadcrumb and compact switcher in the page", () => {
    const ductulator = render(<DuctulatorPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Duct sizing calculator/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Field offset calculator/i })).toHaveAttribute(
      "href",
      "/tools/offset-calculator",
    );
    expect(screen.getByRole("link", { name: /Hanger spacing calculator/i })).toHaveAttribute(
      "href",
      "/tools/hanger-spacing",
    );
    expect(screen.getByRole("link", { name: /Database diagnostic/i })).toHaveAttribute(
      "href",
      "/tools/database-diagnostic",
    );
    ductulator.unmount();

    const offset = render(<OffsetCalculatorPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Field offset calculator/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Duct sizing calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
    expect(screen.getByRole("link", { name: /Hanger spacing calculator/i })).toHaveAttribute(
      "href",
      "/tools/hanger-spacing",
    );
    offset.unmount();

    const hanger = render(<HangerSpacingPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Hanger spacing calculator/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Duct sizing calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
    hanger.unmount();

    render(<DatabaseDiagnosticPage />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveTextContent(
      /Tools\s*\/\s*Database diagnostic/,
    );
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: /Duct sizing calculator/i })).toHaveAttribute(
      "href",
      "/tools/ductulator",
    );
  });
});
