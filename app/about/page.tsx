import Link from "next/link";

export const metadata = {
  title: "About — Scam Steps",
  description: "Methodology, sources, what this site is and isn't.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 prose">
      <h1 className="serif">About</h1>

      <h2 className="serif">What this is</h2>
      <p>
        A free guided workflow for US scam victims. Triage classifies the case;
        the plan orders the filings; the templates pre-fill the paperwork. No
        accounts, no payment, no data leaves your browser unless you submit it
        yourself through the official channels.
      </p>

      <h2 className="serif">What this is not</h2>
      <ul>
        <li>
          Not a recovery service. The site does not contact banks, agencies,
          or platforms on your behalf. Anyone offering to recover funds for an
          upfront fee is themselves running a scam.
        </li>
        <li>Not legal advice. For losses over approximately $10,000 or where civil action is being considered, consult a consumer-protection attorney.</li>
        <li>Not international. US-only for now. International recovery has separate channels and law.</li>
      </ul>

      <h2 className="serif">Sources for the recovery-rate bands</h2>
      <p>
        Ranges are derived from public reports rather than internal data —
        treat them as orders of magnitude, not predictions. Categories combine
        signals from:
      </p>
      <ul>
        <li>FTC Consumer Sentinel annual reports (loss totals by category and payment method)</li>
        <li>CFPB complaint database public extracts (resolution outcomes for Reg E disputes, including Zelle imposter scams pre- and post-2023 policy shift)</li>
        <li>FBI IC3 annual reports (case counts, kill-chain recoveries on wire fraud)</li>
        <li>Published bank policies (Chase, BofA, Wells Fargo, Citi, Capital One — dispute procedures and Reg E timelines)</li>
        <li>CFPB sample dispute letter language (basis for the bank-dispute template)</li>
        <li>FTC identitytheft.gov flow (basis for the identity-theft handoff)</li>
      </ul>
      <p>
        Aggregate bands are intentionally wide. A 5–15% band for crypto sent to
        an exchange means the population-level recovery rate falls in that
        range; individual cases vary by speed of filing, exchange policies,
        and whether the scammer has already withdrawn.
      </p>

      <h2 className="serif">Privacy</h2>
      <p>
        Triage answers and incident details are stored in your browser's
        sessionStorage. They are not transmitted to this site, any server, or
        any third party. Closing the tab clears them. There is no account
        system because there is nothing to store between visits — every plan
        is regenerated from your triage inputs.
      </p>
      <p>
        No analytics, no tracking, no cookies beyond what your browser sets by
        default. No external scripts load on the plan or template pages.
      </p>

      <h2 className="serif">Updates</h2>
      <p>
        Filing procedures, bank policies, and recovery rates change. The data
        behind this site — scam categories, reporting channels, bank fraud
        pages, recovery-rate bands — is open and version-controlled. The
        annual review compares the bands against the latest FTC and IC3
        reports and updates them in one place.
      </p>

      <h2 className="serif">Why this exists</h2>
      <p>
        After a scam, the recovery process is fragmented across six or more
        independent systems. Victims either don't know the order of operations
        or don't know that some channels (bank dispute, exchange freeze, wire
        recall) have hard time windows that close before the others matter.
        The cost of that fragmentation is borne disproportionately by victims
        who could have recovered funds if they'd known to file in the right
        order. This is the simplest possible orchestrator for that problem.
      </p>

      <p className="mt-8">
        <Link href="/triage" className="btn-primary no-underline">Start the triage</Link>
      </p>
    </div>
  );
}
