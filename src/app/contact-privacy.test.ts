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

const staticUsPhone = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/;

describe("public contact privacy", () => {
  for (const relativePath of privacyControlledFiles) {
    it(`${relativePath} does not publish a direct phone number`, () => {
      const source = readFileSync(resolve(process.cwd(), relativePath), "utf8");

      expect(source).not.toMatch(staticUsPhone);
      expect(source.toLowerCase()).not.toContain("tel:");
    });
  }
});
