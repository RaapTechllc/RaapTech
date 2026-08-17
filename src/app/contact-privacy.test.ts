import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const privacyControlledFiles = [
  "src/lib/site.ts",
  "src/app/layout.tsx",
  "src/app/contact/page.tsx",
  "src/components/ContactForm.tsx",
  "src/components/Footer.tsx",
  "CC/RaapTech/n8n-workflow-complete.json",
  "CC/RaapTech/n8n-workflow-updated.json",
] as const;

const staticUsPhone =
  /(?<!\d)(?:\+?1[\s().-]*)?\(?\d{3}\)?[\s().-]*\d{3}[\s().-]*\d{4}(?!\d)/;

describe("public contact privacy", () => {
  it.each([
    "3125550199",
    "+1 312 555 0199",
    "+1 (312) 555-0199",
    "312.555.0199",
    "1-312-555-0199",
  ])("detects static phone format %s", (phone) => {
    expect(phone).toMatch(staticUsPhone);
  });

  for (const relativePath of privacyControlledFiles) {
    it(`${relativePath} does not publish a direct phone number`, () => {
      const source = readFileSync(resolve(process.cwd(), relativePath), "utf8");

      expect(source).not.toMatch(staticUsPhone);
      expect(source.toLowerCase()).not.toContain("tel:");
    });
  }
});
