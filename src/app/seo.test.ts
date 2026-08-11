import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as servicesMetadata } from "@/app/services/page";
import { metadata as resultsMetadata } from "@/app/results/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as toolsMetadata } from "@/app/tools/page";
import { metadata as ductulatorMetadata } from "@/app/tools/ductulator/page";
import { metadata as offsetMetadata } from "@/app/tools/offset-calculator/page";

describe("SEO metadata routes", () => {
  it("sitemap lists marketing and field-tool routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(urls).toEqual([
      "https://raaptech.com",
      "https://raaptech.com/about",
      "https://raaptech.com/services",
      "https://raaptech.com/results",
      "https://raaptech.com/contact",
      "https://raaptech.com/tools",
      "https://raaptech.com/tools/ductulator",
      "https://raaptech.com/tools/offset-calculator",
    ]);
    expect(entries[0]?.priority).toBe(1);
  });

  it("gives every public page an explicit route-specific canonical", () => {
    expect(homeMetadata.alternates?.canonical).toBe("/");
    expect(aboutMetadata.alternates?.canonical).toBe("/about");
    expect(servicesMetadata.alternates?.canonical).toBe("/services");
    expect(resultsMetadata.alternates?.canonical).toBe("/results");
    expect(contactMetadata.alternates?.canonical).toBe("/contact");
    expect(toolsMetadata.alternates?.canonical).toBe("/tools");
    expect(ductulatorMetadata.alternates?.canonical).toBe("/tools/ductulator");
    expect(offsetMetadata.alternates?.canonical).toBe("/tools/offset-calculator");
  });

  it("robots allows crawl and points at the sitemap", () => {
    const rules = robots();
    expect(rules.sitemap).toBe("https://raaptech.com/sitemap.xml");
    expect(rules.host).toBe("https://raaptech.com");
    expect(rules.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
