// Official help — public, free, US-based authorities a scam victim can talk to
// or file with directly. Surfaced as a calm sidebar / footer block.

export function OfficialHelp({ compact = false }: { compact?: boolean }) {
  return (
    <div className="card" style={{ background: "var(--paper)" }}>
      <h3 className="serif" style={{ margin: 0 }}>
        Free, official help from a real person
      </h3>
      <p
        className="prose mt-2 text-sm"
        style={{ color: "var(--muted)", marginBottom: 0 }}
      >
        If you'd like to talk to someone before filing, these are free public
        services. They cannot recover funds for you, but they will walk you
        through what to do next.
      </p>
      <ul className="prose mt-3 text-sm" style={{ marginBottom: 0 }}>
        <li>
          <strong>AARP Fraud Watch Helpline</strong> — 877-908-3360. Free,
          7 days/week, you do not need to be an AARP member or over 50. Trained
          volunteers who specialize in scam recovery guidance.
        </li>
        <li>
          <strong>FTC ReportFraud advisor</strong> —{" "}
          <a
            className="underline-link"
            href="https://reportfraud.ftc.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            reportfraud.ftc.gov
          </a>
          . After filing, the FTC sometimes connects you with a consumer-
          advice specialist.
        </li>
        <li>
          <strong>FTC IdentityTheft.gov</strong> —{" "}
          <a
            className="underline-link"
            href="https://identitytheft.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            identitytheft.gov
          </a>
          . Best place to start if your Social Security number, accounts, or
          personal information were exposed.
        </li>
        <li>
          <strong>FBI IC3</strong> —{" "}
          <a
            className="underline-link"
            href="https://www.ic3.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            ic3.gov
          </a>
          . Federal intake for internet-enabled crime.
        </li>
        <li>
          <strong>CFPB</strong> —{" "}
          <a
            className="underline-link"
            href="https://www.consumerfinance.gov/complaint/"
            target="_blank"
            rel="noopener noreferrer"
          >
            consumerfinance.gov/complaint
          </a>
          . Use this if your bank refuses your fraud dispute.
        </li>
        {!compact && (
          <>
            <li>
              <strong>Your state Attorney General</strong> —{" "}
              <a
                className="underline-link"
                href="https://www.naag.org/find-my-ag/"
                target="_blank"
                rel="noopener noreferrer"
              >
                naag.org/find-my-ag
              </a>
              .
            </li>
            <li>
              <strong>National Elder Fraud Hotline</strong> — 833-372-8311. US
              Dept of Justice line for victims age 60+. Free.
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
