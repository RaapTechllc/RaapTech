import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Branded Open Graph image, generated at build time (no network). See DESIGN.md.
export const runtime = "nodejs";
export const alt =
  "RaapTech LLC — Autodesk Fabrication Consulting & AI for the Trades";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0B0C";
const PAPER = "#EDE9E0";
const PAPER_DIM = "#9B978C";
const HAZARD = "#FF4D00";

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
          border: `16px solid ${HAZARD}`,
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: HAZARD,
              color: INK,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            RT
          </div>
          <span style={{ fontSize: 28, letterSpacing: "0.12em", color: PAPER_DIM }}>
            RAAPTECH LLC
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontSize: 96, fontWeight: 700 }}>
            Autodesk Fabrication
          </span>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <span
              style={{
                backgroundColor: HAZARD,
                color: INK,
                padding: "0 16px",
                fontSize: 96,
                fontWeight: 700,
              }}
            >
              + AI
            </span>
            <span style={{ fontSize: 96, fontWeight: 700, marginLeft: 24 }}>
              for the Trades
            </span>
          </div>
        </div>

        {/* Tagline */}
        <span style={{ fontSize: 30, color: PAPER_DIM }}>
          CADmep · ESTmep · CAMduct · AI onboarding for sheet metal &amp; MEP shops
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
