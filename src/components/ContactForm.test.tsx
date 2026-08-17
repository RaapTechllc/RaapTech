import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/lib/site";
import ContactForm from "./ContactForm";

describe("ContactForm honest fallback", () => {
  it("renders direct email and phone actions instead of an undelivered form", () => {
    render(<ContactForm />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    const email = screen.getByRole("link", { name: /Write an email/i });
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
    expect(email.getAttribute("href")).toContain(encodeURIComponent("RaapTech project inquiry"));

    const phone = screen.getByRole("link", { name: /Call 708-581-6922/i });
    expect(phone).toHaveAttribute("href", SITE.phoneHref);
  });

  it("states that nothing is submitted or stored on the site", () => {
    render(<ContactForm />);
    expect(screen.getByText(/nothing is submitted or stored on this site/i)).toBeInTheDocument();
  });
});
