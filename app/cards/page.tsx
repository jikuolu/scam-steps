import Link from "next/link";
import { SCAM_TYPES } from "@/lib/scam-types";

export const metadata = {
  title: "Action cards for every scam type",
  description:
    "One-image action cards for the 12 most common scam categories — what to do, who to call, realistic recovery rate. Save and share. Free, from scamsteps.org.",
  alternates: { canonical: "/cards" },
  openGraph: {
    title: "Action cards for every scam type — Scam Steps",
    description:
      "One-image action cards for the 12 most common scam categories. Save and share.",
    images: [
      {
        url: "/api/scam-card",
        width: 1200,
        height: 630,
        alt: "Is this a scam? Quick checklist of warning signs from scamsteps.org",
      },
    ],
  },
};

export default function CardsPage() {
  // Sort by realistic recovery, highest first — same order as /scam-types
  const types = Object.values(SCAM_TYPES).sort(
    (a, b) => b.recoveryBand.low - a.recoveryBand.low,
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="serif">Action cards for every scam type</h1>
      <p className="prose mt-4 home-lede">
        One image per scam type. The first calls to make, the realistic
        recovery rate, the time window. Save the one that matches and send
        it to anyone who needs it — these screenshot well into a text
        message.
      </p>

      {/* Overview card sits separately at the top */}
      <section className="mt-10">
        <h2 className="serif" style={{ fontSize: "1.3rem" }}>
          Not sure yet?
        </h2>
        <p className="prose mt-1 text-sm" style={{ color: "var(--muted)" }}>
          The general warning-signs card — the six biggest tells, regardless
          of scam type.
        </p>
        <figure
          className="mt-3"
          style={{ margin: "0.75rem 0 0", maxWidth: "640px" }}
        >
          <Link href="/am-i-scammed" className="no-underline">
            <img
              src="/api/scam-card"
              alt="Is this a scam? Quick checklist of six warning signs from scamsteps.org"
              width={1200}
              height={630}
              loading="eager"
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid var(--rule)",
                borderRadius: 6,
                display: "block",
              }}
            />
          </Link>
        </figure>
      </section>

      <section className="mt-12">
        <h2 className="serif" style={{ fontSize: "1.3rem" }}>
          By scam type
        </h2>
        <p className="prose mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Sorted by realistic recovery, highest first.
        </p>

        <div
          className="mt-5 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {types.map((t) => (
            <figure key={t.id} style={{ margin: 0 }}>
              <Link
                href={`/scam-types/${t.id}`}
                className="no-underline"
                aria-label={`${t.label} — full recovery plan`}
              >
                <img
                  src={`/api/scam-card/${t.id}`}
                  alt={`If this happened to you — ${t.label}. Typical recovery ${t.recoveryBand.low} to ${t.recoveryBand.high} percent. Action steps from scamsteps.org.`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    border: "1px solid var(--rule)",
                    borderRadius: 6,
                    display: "block",
                  }}
                />
              </Link>
              <figcaption
                className="text-sm mt-2"
                style={{ color: "var(--muted)" }}
              >
                <Link href={`/scam-types/${t.id}`} className="underline-link">
                  {t.label}
                </Link>{" "}
                — full plan, calls, and filing templates.
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-12 note-card">
        <p className="prose" style={{ margin: 0 }}>
          <strong>How to use these:</strong> right-click (or long-press on a
          phone) any card and save it. Text or email it to the person who
          needs it. Each card stands on its own — they don't have to visit
          the site to get value, but the full recovery plan and editable
          filing templates are one click away.
        </p>
      </section>
    </div>
  );
}
