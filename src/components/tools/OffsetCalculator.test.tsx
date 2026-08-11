import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import OffsetCalculator from "./OffsetCalculator";

describe("OffsetCalculator", () => {
  it("calculates and rounds the preserved forward-layout fixture", async () => {
    const user = userEvent.setup();
    render(<OffsetCalculator />);

    expect(screen.getByLabelText(/Duct diameter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CLR multiplier/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Elbow angle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Straight.*between tangents/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Calculate layout/i }));
    expect(screen.getByText("Centerline offset").nextElementSibling).toHaveTextContent(
      "13 3/8 in",
    );
    expect(screen.getByText("Total run").nextElementSibling).toHaveTextContent(
      "28 5/16 in",
    );
    expect(screen.getByRole("img", { name: /Offset geometry/i })).toBeInTheDocument();
  });

  it("solves angle and spool length inside a known run", async () => {
    const user = userEvent.setup();
    render(<OffsetCalculator />);

    await user.click(screen.getByRole("button", { name: /Fit known run/i }));
    await user.clear(screen.getByLabelText(/Needed offset/i));
    await user.type(screen.getByLabelText(/Needed offset/i), "13.372583002030478");
    await user.clear(screen.getByLabelText(/Total run/i));
    await user.type(screen.getByLabelText(/Total run/i), "28.284271247461906");
    await user.click(screen.getByRole("button", { name: /^Solve layout$/i }));

    expect(screen.getByText("Solved elbow angle").nextElementSibling).toHaveTextContent(
      "45.00°",
    );
    expect(screen.getByText("Effective straight spool").nextElementSibling).toHaveTextContent(
      "4 in",
    );
  });

  it("rejects malformed fractions with an accessible error", async () => {
    const user = userEvent.setup();
    render(<OffsetCalculator />);
    await user.clear(screen.getByLabelText(/Duct diameter/i));
    await user.type(screen.getByLabelText(/Duct diameter/i), "12 nope");
    await user.click(screen.getByRole("button", { name: /Calculate layout/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/valid duct diameter/i);
  });

  it("rejects a zero duct diameter when solving a centerline radius", async () => {
    const user = userEvent.setup();
    render(<OffsetCalculator />);

    await user.click(screen.getByRole("button", { name: /Fit known run/i }));
    await user.selectOptions(screen.getByLabelText(/Solve for/i), "radius");
    await user.clear(screen.getByLabelText(/Duct diameter/i));
    await user.type(screen.getByLabelText(/Duct diameter/i), "0");
    await user.click(screen.getByRole("button", { name: /^Solve layout$/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /duct diameter must be greater than zero/i,
    );
  });
});
