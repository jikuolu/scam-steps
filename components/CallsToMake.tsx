import { CALLS, CALLS_PER_TYPE } from "@/lib/calls";
import type { ScamTypeId } from "@/lib/scam-types";

export function CallsToMake({ scamType }: { scamType: ScamTypeId }) {
  const callIds = CALLS_PER_TYPE[scamType] || [];
  if (callIds.length === 0) return null;

  return (
    <div className="card" style={{ background: "var(--paper)" }}>
      <h2 className="serif" style={{ margin: 0 }}>
        Calls to make first
      </h2>
      <p className="prose mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Phone calls move faster than online filings, especially in the first
        24–48 hours. Make these calls before, or while, you work through the
        templated filings below.
      </p>
      <ol className="mt-4 flex flex-col gap-3" style={{ listStyle: "none", paddingLeft: 0 }}>
        {callIds.map((id, i) => {
          const c = CALLS[id];
          if (!c) return null;
          const isPhone = /^\d|^\d{3}-/.test(c.number);
          return (
            <li key={id} className="divider" style={{ paddingTop: i === 0 ? 0 : "0.75rem", borderTop: i === 0 ? "none" : undefined }}>
              <div className="flex justify-between items-baseline gap-3 flex-wrap">
                <h3 className="serif" style={{ margin: 0, fontSize: "1.12rem" }}>
                  {i + 1}. {c.who}
                </h3>
                {c.hours && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {c.hours}
                  </span>
                )}
              </div>
              <div className="mt-1 mono text-sm" style={{ color: "var(--accent)" }}>
                {isPhone ? (
                  <a href={`tel:${c.number.replace(/[^\d]/g, "")}`} className="underline-link">
                    {c.number}
                  </a>
                ) : (
                  c.number
                )}
              </div>
              <p className="prose mt-1 text-sm" style={{ marginBottom: 0 }}>
                <strong>What to say:</strong> {c.what}
              </p>
              <p className="prose text-sm" style={{ color: "var(--muted)", marginBottom: 0 }}>
                <strong>Why this one:</strong> {c.why}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
