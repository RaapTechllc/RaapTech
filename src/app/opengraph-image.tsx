import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RaapTech LLC — Construction Workflow Optimization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0F19",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#FF6B35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            RT
          </div>
          <span style={{ color: "white", fontSize: "32px", fontWeight: 700 }}>
            RAAPTECH LLC
          </span>
        </div>
        <div>
          <div
            style={{
              color: "#10B981",
              fontSize: "20px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Construction Workflow Optimization
          </div>
          <div
            style={{
              color: "white",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Reclaim 6–12 hours a week from admin work
          </div>
        </div>
        <div style={{ color: "#94A3B8", fontSize: "24px" }}>
          20 years in MEP fabrication · Tim Raap
        </div>
      </div>
    ),
    { ...size }
  );
}
