import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm honest fallback", () => {
  it("renders an email-only action instead of exposing the private phone number", () => {
    render(<ContactForm />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    const email = screen.getByRole("link", { name: /Write an email/i });
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
    expect(email.getAttribute("href")).toContain(encodeURIComponent("RaapTech project inquiry"));
    expect(
      screen.getAllByRole("link").some((link) => link.getAttribute("href")?.startsWith("tel:")),
    ).toBe(false);
    expect(screen.getByText(/calls are scheduled after we review your email/i)).toBeInTheDocument();
  });

  it("states that nothing is submitted or stored on the site", () => {
    render(<ContactForm />);
    expect(screen.getByText(/nothing is submitted or stored on this site/i)).toBeInTheDocument();
  });
});
