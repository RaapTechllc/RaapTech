import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import HangerSpacingCalculator from "./HangerSpacingCalculator";

describe("HangerSpacingCalculator", () => {
  it("estimates hangers for the default rectangular run", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);

    expect(screen.getByLabelText(/^Width \(in\)$/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));

    expect(screen.getByText("Max hanger spacing").nextElementSibling).toHaveTextContent(
      "8 ft",
    );
    expect(screen.getByText("Suggested min rod").nextElementSibling).toHaveTextContent(
      "1/4 in",
    );
    expect(screen.getByText("Estimated hanger count").nextElementSibling).toHaveTextContent(
      "6",
    );
    expect(screen.getByText(/not a fabrication release/i)).toBeInTheDocument();
  });

  it("reports extra hangers when elbows sit off the regular stations", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);
    await user.clear(screen.getByLabelText(/Elbows/i));
    await user.type(screen.getByLabelText(/Elbows/i), "3");
    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));
    expect(screen.getByText(/1 extra/i)).toBeInTheDocument();
    expect(screen.getByText("Estimated hanger count").nextElementSibling).toHaveTextContent(
      "7",
    );
  });

  it("reports an extra tee hanger when 10 ft spacing leaves a midspan gap", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);
    await user.selectOptions(screen.getByLabelText(/Duct shape/i), "round");
    await user.clear(screen.getByLabelText(/^Diameter \(in\)$/i));
    await user.type(screen.getByLabelText(/^Diameter \(in\)$/i), "12");
    await user.clear(screen.getByLabelText(/Horizontal run length/i));
    await user.type(screen.getByLabelText(/Horizontal run length/i), "50");
    await user.clear(screen.getByLabelText(/Intersections/i));
    await user.type(screen.getByLabelText(/Intersections/i), "1");
    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));
    expect(screen.getByText("Max hanger spacing").nextElementSibling).toHaveTextContent(
      "10 ft",
    );
    expect(screen.getByText(/1 extra/i)).toBeInTheDocument();
  });

  it("switches the size label for round duct", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);
    await user.selectOptions(screen.getByLabelText(/Duct shape/i), "round");
    expect(screen.getByLabelText(/^Diameter \(in\)$/i)).toBeInTheDocument();
  });

  it("rejects a zero duct size with an accessible error", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);
    await user.clear(screen.getByLabelText(/^Width \(in\)$/i));
    await user.type(screen.getByLabelText(/^Width \(in\)$/i), "0");
    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/at least 1 in/i);
  });

  it("rejects non-numeric size with an accessible error", async () => {
    const user = userEvent.setup();
    render(<HangerSpacingCalculator />);
    await user.clear(screen.getByLabelText(/^Width \(in\)$/i));
    await user.type(screen.getByLabelText(/^Width \(in\)$/i), "nope");
    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/valid duct size/i);
  });

  it("scrolls the results panel into view after a successful estimate", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    render(<HangerSpacingCalculator />);

    await user.click(screen.getByRole("button", { name: /Estimate hangers/i }));
    const results = screen.getByRole("region", { name: /results/i });
    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });
    expect(results).toHaveFocus();
  });
});
