import Link from "next/link";

export const metadata = {
  title: "About",
  description: "What Scam Steps is, how the recovery numbers are sourced, and how your privacy is handled.",
  alternates: { canonical: "/about" },
};

const IS = [
  "Free. No accounts, no payment, no upsell.",
  "Self-serve. Everything runs in your browser.",
  "A filing aid — it orders the steps and pre-fills the paperwork.",
];

const IS_NOT = [
  "Not a recovery service. It never contacts banks or agencies for you.",
  "Not legal advice. Over ~$10,000, or for civil action, see a consumer-protection attorney.",
  "Not international. US channels only, for now.",
];

const SOURCES = [
  "FTC Consumer Sentinel annual reports — loss totals by category and payment method.",
  "CFPB complaint database — resolution outcomes for Regulation E disputes, including Zelle imposter scams before and after the 2023 policy shift.",
  "FBI IC3 annual reports — case counts and wire-fraud kill-chain recoveries.",
  "Published bank dispute policies — Chase, BofA, Wells Fargo, Citi, Capital One.",
  "CFPB sample dispute-letter language and the FTC identitytheft.gov flow — the basis for the templates.",
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="serif">About</h1>
      <p className="prose mt-4 home-lede">
        Scam Steps turns "what happened" into an ordered list of what to do —
        the calls to make first, the agencies and forms that apply, and
        editable drafts of every report.
      </p>

      <div className="mt-8 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div className="card">
          <h2 className="serif" style={{ marginTop: 0, fontSize: "1.2rem", color: "var(--accent)" }}>
            What it is
          </h2>
          <ul className="prose mt-2 text-sm" style={{ marginBottom: 0, listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {IS.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="serif" style={{ marginTop: 0, fontSize: "1.2rem", color: "var(--warn)" }}>
            What it isn't
          </h2>
          <ul className="prose mt-2 text-sm" style={{ marginBottom: 0, listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {IS_NOT.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>

      <h2 className="serif mt-12">Where the recovery numbers come from</h2>
      <p className="prose mt-2">
        The recovery-rate bands are derived from public reports, not internal
        data. They are population averages — orders of magnitude, not
        predictions for any single case. The bands are deliberately wide:
        an individual outcome depends on how fast you file, the institution's
        policies, and whether the money has already moved.
      </p>
      <ul className="prose mt-3 text-sm" style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {SOURCES.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <p className="prose text-sm" style={{ color: "var(--muted)" }}>
        The bands are reviewed annually against the latest FTC and IC3
        reports. The underlying data — scam categories, channels, bank
        pages — is open and version-controlled.
      </p>

      <h2 className="serif mt-12">Your privacy</h2>
      <div className="note-card mt-3">
        <p className="prose" style={{ margin: 0 }}>
          Your triage answers and incident details stay in your browser and
          are never transmitted to this site or anyone else. Close the tab
          and they're gone — there is no account because there is nothing to
          store. No analytics, no tracking, no third-party scripts.
        </p>
      </div>

      <h2 className="serif mt-12">Why it exists</h2>
      <p className="prose mt-2">
        After a scam, recovery is fragmented across six or more separate
        systems — and some of them, like bank disputes and wire recalls,
        have deadlines that close within hours. People lose recoverable money
        simply for not knowing the order of operations. This site is the
        simplest tool that fixes that.
      </p>

      <p className="mt-10">
        <Link href="/triage" className="btn-primary no-underline">Start the triage</Link>
      </p>
    </div>
  );
}
