import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("production Next.js configuration", () => {
  it("preserves standalone output for the documented Docker image", () => {
    expect(nextConfig.output).toBe("standalone");
    expect(nextConfig.outputFileTracingRoot).toBe(process.cwd());
  });

  it("applies the reviewed headers to every route", async () => {
    const entries = await nextConfig.headers?.();
    expect(entries).toEqual([
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]);
  });
});
