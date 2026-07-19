import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO metadata routes", () => {
  it("sitemap lists the five marketing routes", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toEqual([
      "https://raaptech.com",
      "https://raaptech.com/about",
      "https://raaptech.com/services",
      "https://raaptech.com/results",
      "https://raaptech.com/contact",
    ]);
    expect(entries[0]?.priority).toBe(1);
  });

  it("robots allows crawl and points at the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://raaptech.com/sitemap.xml");
    expect(r.host).toBe("https://raaptech.com");
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
