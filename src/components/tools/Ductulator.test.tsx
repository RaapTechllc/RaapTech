import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Ductulator from "./Ductulator";

describe("Ductulator", () => {
  it("sizes a round duct and presents practical rectangular options", async () => {
    const user = userEvent.setup();
    render(<Ductulator />);

    expect(screen.getByLabelText(/Airflow \(CFM\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target friction rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Maximum velocity/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Size duct/i }));

    expect(screen.getByText("Practical round size").nextElementSibling).toHaveTextContent("10 in");
    expect(screen.getByText(/Limiting criterion/i).nextElementSibling).toHaveTextContent(
      /friction/i,
    );
    expect(screen.getByRole("table", { name: /Rectangular equivalents/i })).toBeInTheDocument();
  });

  it("checks an existing rectangular duct", async () => {
    const user = userEvent.setup();
    render(<Ductulator />);

    await user.click(screen.getByRole("button", { name: /Check existing duct/i }));
    await user.selectOptions(screen.getByLabelText(/Duct shape/i), "rectangular");
    await user.clear(screen.getByLabelText(/Airflow \(CFM\)/i));
    await user.type(screen.getByLabelText(/Airflow \(CFM\)/i), "1000");
    await user.clear(screen.getByLabelText(/Width/i));
    await user.type(screen.getByLabelText(/Width/i), "10");
    await user.clear(screen.getByLabelText(/Height/i));
    await user.type(screen.getByLabelText(/Height/i), "14");
    await user.click(screen.getByRole("button", { name: /Check duct/i }));

    expect(screen.getByText("Equivalent round diameter").nextElementSibling).toHaveTextContent(
      "12.89 in",
    );
    expect(screen.getByText("Actual velocity").nextElementSibling).toHaveTextContent(
      "1,029 FPM",
    );
  });

  it("reports invalid field input accessibly", async () => {
    const user = userEvent.setup();
    render(<Ductulator />);
    await user.clear(screen.getByLabelText(/Airflow \(CFM\)/i));
    await user.type(screen.getByLabelText(/Airflow \(CFM\)/i), "0");
    await user.click(screen.getByRole("button", { name: /Size duct/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Airflow/i);
  });
});
