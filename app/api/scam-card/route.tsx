import { ImageResponse } from "next/og";

// 1200×630 — works for OG link previews AND for Google Image search ranking.
// Six highest-signal red flags, distilled from /am-i-scammed.
// Same visual is embedded on /am-i-scammed via <img> for image-search discovery.

const FLAGS = [
  "They contacted you out of the blue",
  "They want gift cards, crypto, or a wire",
  "They're pressuring you to act right now",
  "They told you not to tell anyone",
  'They claim to be the IRS, your bank, or "fraud"',
  "They asked for a password, code, or remote access",
];

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafaf7",
          display: "flex",
          flexDirection: "column",
          padding: "56px 60px 48px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#1a1a1a",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Is this a scam?
          </div>
          <div style={{ fontSize: 24, color: "#6b6b65", marginTop: 8 }}>
            Six warning signs · from scamsteps.org
          </div>
        </div>

        {/* Two-column grid of red flags */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          {FLAGS.map((f, i) => (
            <div
              key={i}
              style={{
                width: 510,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                border: "1px solid #d8d6cf",
                borderRadius: 8,
                background: "#ffffff",
                fontSize: 24,
                lineHeight: 1.25,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  background: "#8a3a2a",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                !
              </div>
              <div style={{ display: "flex", flex: 1 }}>{f}</div>
            </div>
          ))}
        </div>

        {/* Verdict + attribution */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#8a3a2a",
              color: "#ffffff",
              padding: "16px 24px",
              borderRadius: 8,
              fontSize: 24,
              fontWeight: 500,
              display: "flex",
            }}
          >
            If several apply → treat it as a scam
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#2d4a3e",
              fontWeight: 600,
              display: "flex",
            }}
          >
            scamsteps.org
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        // Cache aggressively — content is static. Vercel CDN + browser cache.
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
