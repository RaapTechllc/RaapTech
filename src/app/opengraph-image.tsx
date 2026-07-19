import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Branded Open Graph image, generated at build time (no network). See DESIGN.md.
// Strict black/white/gray per brand spec.
export const runtime = "nodejs";
export const alt =
  "RaapTech LLC — Autodesk Fabrication Database Consultancy, Chicago";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#000000";
const PAPER = "#FFFFFF";
const GRAY_3 = "#CCCCCC";

export default async function OpengraphImage() {
  const grotesk = await readFile(
    join(process.cwd(), "src/app/fonts/space-grotesk-700.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          color: PAPER,
          padding: 72,
          border: `16px solid ${PAPER}`,
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: "0.12em" }}>
            RAAPTECH
          </span>
          <span style={{ fontSize: 24, letterSpacing: "0.12em", color: GRAY_3 }}>
            CHICAGO
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontSize: 80, fontWeight: 700 }}>
            Your Database Is
          </span>
          <span style={{ fontSize: 80, fontWeight: 700, marginTop: 8 }}>
            Costing You Bids.
          </span>
          <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
            <span
              style={{
                backgroundColor: PAPER,
                color: INK,
                padding: "0 16px",
                fontSize: 80,
                fontWeight: 700,
              }}
            >
              We Fix It.
            </span>
          </div>
        </div>

        {/* Tagline */}
        <span style={{ fontSize: 28, color: GRAY_3 }}>
          Autodesk Fabrication database consultancy for MEP contractors &amp; sheet metal shops
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: grotesk,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
