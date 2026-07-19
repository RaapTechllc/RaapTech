import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders every labeled field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it("marks the right fields as required", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Name/)).toBeRequired();
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.getByLabelText(/Subject/)).toBeRequired();
    expect(screen.getByLabelText(/Message/)).toBeRequired();
    expect(screen.getByLabelText(/Company/)).not.toBeRequired();
  });

  it("offers the consultancy subject options", () => {
    render(<ContactForm />);
    for (const label of [
      "Database Health Audit",
      "Remediation Sprint",
      "Monthly Retainer",
      "Free Database Diagnostic",
      "Other",
    ]) {
      expect(screen.getByRole("option", { name: label })).toBeInTheDocument();
    }
  });

  it("posts the form as JSON to /api/contact and confirms on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), "Test User");
    await user.type(screen.getByLabelText(/Email/), "test@example.com");
    await user.type(screen.getByLabelText(/Company/), "Test Shop LLC");
    await user.selectOptions(
      screen.getByLabelText(/Subject/),
      "database-health-audit",
    );
    await user.type(screen.getByLabelText(/Message/), "Hello there");
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(
      await screen.findByText("Message received.", undefined, {
        timeout: 3000,
      }),
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        company: "Test Shop LLC",
        subject: "database-health-audit",
        message: "Hello there",
      }),
    });
  });

  it("shows an error alert when the API responds with a failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), "Test User");
    await user.type(screen.getByLabelText(/Email/), "test@example.com");
    await user.selectOptions(screen.getByLabelText(/Subject/), "other");
    await user.type(screen.getByLabelText(/Message/), "Hello there");
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /Something went wrong/i,
    );
  });

  it("shows an error alert when the request throws", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), "Test User");
    await user.type(screen.getByLabelText(/Email/), "test@example.com");
    await user.selectOptions(screen.getByLabelText(/Subject/), "other");
    await user.type(screen.getByLabelText(/Message/), "Hello there");
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /Something went wrong/i,
    );
  });
});
