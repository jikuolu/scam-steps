import { ImageResponse } from "next/og";
import { SCAM_TYPES, type ScamTypeId } from "@/lib/scam-types";
import { CALLS, CALLS_PER_TYPE } from "@/lib/calls";

// Per-scam-type action card — 1200×630. Title, recovery rate, top-3 actions,
// time window, attribution. Derived from the same data that drives the
// recovery flow, so it stays current automatically.

export const runtime = "nodejs";

function formatWindow(hours: number | null): string | null {
  if (hours === null) return null;
  if (hours <= 24) return "Act within 24 hours";
  if (hours <= 48) return "Act within 48 hours";
  if (hours <= 72) return "Act within 72 hours";
  const days = Math.round(hours / 24);
  return `Act within ${days} days`;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const t = SCAM_TYPES[id as ScamTypeId];
  if (!t) return new Response("Not found", { status: 404 });

  const callIds = CALLS_PER_TYPE[t.id] ?? [];
  const actions = callIds
    .slice(0, 3)
    .map((cid) => CALLS[cid]?.who)
    .filter(Boolean) as string[];
  const window = formatWindow(t.criticalWindowHours);
  const recoveryHi = t.recoveryBand.high;
  const bandTone =
    recoveryHi >= 60 ? "#2a6a63" : recoveryHi >= 25 ? "#8a6420" : "#8a3a2a";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafaf7",
          display: "flex",
          flexDirection: "column",
          padding: "52px 60px 44px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#1a1a1a",
        }}
      >
        {/* Header: title + recovery badge */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: 24,
                color: "#6b6b65",
                marginBottom: 6,
                display: "flex",
              }}
            >
              If this happened to you —
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                display: "flex",
              }}
            >
              {t.label}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              padding: "14px 20px",
              borderRadius: 10,
              border: `2px solid ${bandTone}`,
              background: "#ffffff",
              minWidth: 200,
            }}
          >
            <div
              style={{
                fontSize: 15,
                color: "#6b6b65",
                letterSpacing: 1,
                display: "flex",
              }}
            >
              TYPICAL RECOVERY
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: bandTone,
                lineHeight: 1.05,
                marginTop: 4,
                display: "flex",
              }}
            >
              {t.recoveryBand.low}–{t.recoveryBand.high}%
            </div>
          </div>
        </div>

        {/* Window badge */}
        {window && (
          <div
            style={{
              marginTop: 22,
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: 999,
              background: "#f4e9e3",
              color: "#8a3a2a",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {window}
          </div>
        )}

        {/* Top actions */}
        <div
          style={{
            marginTop: window ? 24 : 32,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {actions.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "16px 20px",
                background: "#ffffff",
                border: "1px solid #d8d6cf",
                borderRadius: 8,
                fontSize: 24,
                lineHeight: 1.2,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  background: "#2d4a3e",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ display: "flex", flex: 1 }}>{a}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 20, color: "#6b6b65", display: "flex" }}>
            Full plan, calls, and filing templates:
          </div>
          <div
            style={{
              fontSize: 22,
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
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
