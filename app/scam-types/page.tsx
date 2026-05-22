import Link from "next/link";
import { SCAM_TYPES } from "@/lib/scam-types";

export const metadata = {
  title: "Common scams",
  description: "Honest recovery-rate bands and first actions per scam category.",
  alternates: { canonical: "/scam-types" },
};

export default function ScamTypesPage() {
  const types = Object.values(SCAM_TYPES).sort(
    (a, b) => b.recoveryBand.low - a.recoveryBand.low
  );
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="serif">Common scams</h1>
      <p className="prose mt-3" style={{ color: "var(--muted)" }}>
        Sorted by typical recovery rate, highest first. The percentage is the
        share of victims in that category who get their money back when
        filings are done correctly within the time windows — pulled from
        public FTC, CFPB, and IC3 data. Population averages, not predictions
        for any individual case.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {types.map((t) => (
          <Link
            key={t.id}
            href={`/scam-types/${t.id}`}
            className="card no-underline"
            style={{ color: "var(--foreground)" }}
          >
            <div className="flex justify-between items-baseline gap-3">
              <h3 className="serif" style={{ margin: 0 }}>{t.label}</h3>
              <span className="text-sm" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                Typical recovery{" "}
                <span className="mono" style={{ color: "var(--accent)" }}>
                  {t.recoveryBand.low}–{t.recoveryBand.high}%
                </span>
              </span>
            </div>
            <p className="prose mt-2 text-sm" style={{ marginBottom: 0 }}>{t.oneLine}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/triage" className="btn-primary no-underline">
          If you're not sure which one — start the triage
        </Link>
      </div>
    </div>
  );
}
