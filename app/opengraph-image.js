import { ImageResponse } from "next/og";

export const alt = "InventiveClicks — Creative Digital Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #220a3e 0%, #17012c 55%, #1c0740 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(91,58,238,0.55), rgba(91,58,238,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(33,155,228,0.45), rgba(33,155,228,0) 70%)",
            display: "flex",
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6B4BF0, #5B3AEE 55%, #219BE4)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "white" }}>
            InventiveClicks
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Ideas that make your brand
            <span style={{ color: "#8163F0", marginLeft: 16 }}>click.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(235,229,255,0.75)" }}>
            Video Animation · Graphic Design · Creative Marketing · Influencer Marketing
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", height: 4, width: 64, background: "linear-gradient(90deg,#5B3AEE,#219BE4)", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 26, color: "rgba(235,229,255,0.85)", fontWeight: 600 }}>
            inventiveclicks.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
