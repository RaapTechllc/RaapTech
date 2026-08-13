import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolPageHeader } from "./ToolChrome";

describe("ToolPageHeader", () => {
  it("renders a mobile-visible breadcrumb back to the tools index", () => {
    render(
      <ToolPageHeader slug="ductulator" eyebrow="Field Tool · Airside">
        Size round duct in the browser.
      </ToolPageHeader>,
    );

    const crumb = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(crumb.className).not.toMatch(/\bhidden\b/);
    expect(screen.getByRole("link", { name: /^Tools$/i })).toHaveAttribute(
      "href",
      "/tools",
    );
    expect(crumb).toHaveTextContent(/Tools\s*\/\s*Duct sizing calculator/);
  });

  it("lets you hop to another tool without the site header", () => {
    render(
      <ToolPageHeader slug="ductulator" eyebrow="Field Tool · Airside">
        Size round duct in the browser.
      </ToolPageHeader>,
    );

    const switcher = screen.getByRole("navigation", { name: /field tools/i });
    expect(
      screen.getByRole("link", { name: /Database diagnostic/i }),
    ).toHaveAttribute("href", "/tools/database-diagnostic");
    expect(
      screen.getByRole("link", { name: /Field offset calculator/i }),
    ).toHaveAttribute("href", "/tools/offset-calculator");
    expect(
      screen.getByRole("link", { name: /Hanger spacing calculator/i }),
    ).toHaveAttribute("href", "/tools/hanger-spacing");
    expect(switcher.querySelector("[aria-current='page']")).toHaveTextContent(
      /Duct sizing calculator/i,
    );
  });
});
