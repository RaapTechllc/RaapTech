import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DatabaseDiagnostic from "./DatabaseDiagnostic";
import { QUESTIONS } from "@/lib/database-diagnostic";
import { SITE } from "@/lib/site";

async function answerEveryQuestion(
  user: ReturnType<typeof userEvent.setup>,
  choice: "a" | "c",
) {
  const index = choice === "a" ? 0 : 2;
  for (const question of QUESTIONS) {
    const radios = screen.getAllByRole("radio", { name: question.choices[index]!.label });
    const radio = radios.find((node) => node.getAttribute("name") === question.id);
    if (!radio) {
      throw new Error(`Missing radio for ${question.id}`);
    }
    await user.click(radio);
  }
}

describe("DatabaseDiagnostic", () => {
  it("renders the four dimensions and scores in the browser", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<DatabaseDiagnostic />);

    expect(screen.getByRole("heading", { name: /Pricing accuracy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Item structure/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Connector health/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Documentation/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Score the database/i })).toBeInTheDocument();

    const form = screen.getByRole("button", { name: /Score the database/i }).closest("form");
    expect(form).not.toHaveAttribute("action");
    expect(form).not.toHaveAttribute("method", "post");

    await answerEveryQuestion(user, "c");
    await user.click(screen.getByRole("button", { name: /Score the database/i }));

    expect(screen.getByRole("heading", { name: /The database is a rumor/i })).toBeInTheDocument();
    expect(screen.getByText(/dual entry/i)).toBeInTheDocument();
    expect(screen.getByText(/leak 24 \/ 24/i)).toBeInTheDocument();

    const email = screen.getByRole("link", { name: /Email these results to Tim/i });
    expect(email.getAttribute("href")).toMatch(new RegExp(`^mailto:${SITE.email}`));
    expect(decodeURIComponent(email.getAttribute("href") ?? "")).toMatch(/Overall leak: 24 \/ 24/);

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("does not require email to see a tight score", async () => {
    const user = userEvent.setup();
    render(<DatabaseDiagnostic />);
    await answerEveryQuestion(user, "a");
    await user.click(screen.getByRole("button", { name: /Score the database/i }));

    expect(screen.getByRole("heading", { name: /isn't the leak/i })).toBeInTheDocument();
    expect(screen.getByText(/nothing is stored on the server/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/work email/i)).not.toBeInTheDocument();
  });

  it("clears the scored result when a radio changes so the live leak updates", async () => {
    const user = userEvent.setup();
    render(<DatabaseDiagnostic />);
    await answerEveryQuestion(user, "c");
    await user.click(screen.getByRole("button", { name: /Score the database/i }));
    expect(screen.getByText(/leak 24 \/ 24/i)).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /This quarter/i }));

    expect(screen.queryByText(/leak 24 \/ 24/i)).not.toBeInTheDocument();
    expect(screen.getByText(/leak 22 \/ 24/i)).toBeInTheDocument();
  });

  it("asks for the remaining questions instead of posting", async () => {
    const user = userEvent.setup();
    render(<DatabaseDiagnostic />);
    await user.click(screen.getByRole("button", { name: /Score the database/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Answer every question/i);
  });

  it("scrolls the results panel into view after scoring", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    render(<DatabaseDiagnostic />);
    await answerEveryQuestion(user, "a");
    await user.click(screen.getByRole("button", { name: /Score the database/i }));
    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });
    expect(screen.getByRole("region", { name: /results/i })).toHaveFocus();
  });
});
