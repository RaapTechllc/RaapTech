import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
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

  it("shows a confirmation after a successful submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), "Test User");
    await user.type(screen.getByLabelText(/Email/), "test@example.com");
    await user.selectOptions(screen.getByLabelText(/Subject/), "advisory");
    await user.type(screen.getByLabelText(/Message/), "Hello there");
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(
      await screen.findByText("Message received.", undefined, {
        timeout: 3000,
      }),
    ).toBeInTheDocument();
  });
});
