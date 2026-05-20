# Reporting channels — what each one does, where it sits in priority

The orchestrator's job is sequencing these correctly per scam type. This file
records what each channel actually does and what it doesn't, so the generated
plan can be honest about why each step is there.

---

## Bank / card issuer dispute (the channel where the money lives)

This is where recovery actually happens for most categories. Everything else
either supports the dispute (police report as evidence) or runs in parallel.

- **Reach via**: card-back fraud number. Not the branch, not the app's general
  support. The fraud line bypasses the call center.
- **What you say**: "I need to report a fraudulent transaction and file a
  dispute under Regulation E / Regulation Z." Use the specific reg.
- **What you submit**: dispute form (provided by bank), supporting documents,
  optionally a police report case number.
- **Timeline**: provisional credit usually within 10 business days for debit
  (Reg E requires it); credit-card disputes faster. Final resolution can take
  60–90 days.
- **If denied**: appeal in writing within the bank's stated window, then file
  a CFPB complaint. Reg E denials with weak documentation often get reversed
  after CFPB pressure.

## IC3 — FBI Internet Crime Complaint Center

ic3.gov

- **What it is**: federal data-collection intake for internet-enabled crime.
- **What it does**: aggregates reports for FBI analysis; rarely investigates
  individual cases under $100k loss.
- **What it does for the victim**: provides a confirmation number that some
  banks and platforms accept as evidence of a filed federal complaint. Useful
  for the Financial Fraud Kill Chain on wire fraud ($50k+ international).
- **Window**: file as soon as possible, especially for wire fraud (FFKC
  requires speed).
- **Honest framing**: "Submit-and-track" channel; not a recovery mechanism on
  its own.

## FTC ReportFraud.ftc.gov

reportfraud.ftc.gov

- **What it is**: consumer-protection data collection.
- **What it does for the victim**: nothing direct; feeds the FTC's Consumer
  Sentinel database, which state AGs and law enforcement query.
- **Worth filing for**: aggregate signal, and the FTC's identitytheft.gov flow
  is the same agency.

## identitytheft.gov

- **What it is**: FTC's identity-theft-specific recovery flow.
- **What it does**: generates a personalized recovery plan, drafts dispute
  letters to creditors, produces an FTC Identity Theft Report that banks and
  creditors are required to accept under FCRA.
- **When to use**: SSN exposed, accounts opened in your name, tax-return fraud,
  medical-identity theft.
- **Note**: best-in-class for its slice. Scam Steps should hand off
  to it for identity-theft cases rather than re-implementing.

## Local police report

- **What it is**: case number from local jurisdiction.
- **What it does**: required or strongly encouraged by many banks for dispute
  processing. Required by identitytheft.gov flow for some steps.
- **Reality**: most departments will file the report but not investigate
  under-$5k losses. Get the case number. That's the deliverable.
- **How to file**: in person at the local precinct, online for many cities
  (search "[city] police report online"), or via non-emergency line.

## State Attorney General — Consumer Protection Division

- **What it is**: state-level consumer-protection filing.
- **What it does**: investigates patterns across multiple complaints; can take
  action against in-state actors; sometimes helps recover funds via direct
  contact with merchants.
- **When to file**: scams involving US-based businesses, repeat-offender
  patterns, or where federal channels won't act.
- **Find yours**: naag.org/find-my-ag/

## Credit bureaus — fraud alert + freeze

equifax.com, experian.com, transunion.com

- **Fraud alert**: free, 1 year, requires lenders to verify identity before
  extending credit. File at one bureau; they notify the other two.
- **Credit freeze**: free, indefinite, blocks new credit applications until
  thawed. File at all three separately (none of them propagate the freeze).
- **When to use**: SSN, DOB, or account credentials exposed. Even suspected
  exposure justifies a freeze — it's free and reversible.

## CFPB — Consumer Financial Protection Bureau

consumerfinance.gov/complaint

- **What it is**: federal regulator complaint channel for financial-institution
  conduct.
- **What it does**: routes complaint to the named institution with a 15-day
  response requirement, then a 60-day final-response requirement. Public
  database. Banks treat these seriously.
- **When to file**: bank denied a dispute, refused to investigate, or violated
  Reg E timelines.

## Platform-specific reports

- **Zelle**: report.zellepay.com — used by issuing banks.
- **Venmo**: in-app, Help → Report a Problem.
- **Cash App**: in-app, Profile → Support → Report a Payment Issue.
- **PayPal**: Resolution Center → Report a Problem.
- **Coinbase**: Security → Report Theft / Unauthorized Activity.
- **Facebook Marketplace**: Messenger conversation → Report Buyer/Seller +
  Purchase Protection claim if eligible.
- **eBay**: Resolution Center.
- **OfferUp**: in-app, Help → Report.

These are required for platform-side action and Purchase Protection claims.
They rarely recover funds outside Purchase Protection programs.

## TIGTA / SSA OIG / FCC / specialty channels

- **TIGTA** (tigta.gov): IRS impersonation.
- **SSA OIG** (oig.ssa.gov): Social Security impersonation.
- **FCC** (fcc.gov/consumers): robocalls, spoofed numbers (limited recovery
  value, useful for aggregate enforcement).
- **SEC** (sec.gov/tcr): investment fraud involving claimed securities.
- **State securities regulator**: investment fraud, often more responsive than
  SEC for small losses.

---

## Priority ordering — the rule

For any case the generated plan applies this order:

1. **Stop the bleed.** Freeze any account with active access (cards, online
   banking session if device compromised, credit freeze if SSN exposed). This
   comes before any reporting.
2. **Bank dispute / wire recall / exchange freeze.** Wherever the money lives
   or moved through. Time-critical.
3. **Police report.** For the case number; used as evidence in steps 2 and 5.
4. **Federal intake.** IC3 for internet-enabled, FTC ReportFraud always,
   identitytheft.gov if ID was compromised.
5. **State AG.** Useful but rarely time-critical.
6. **Platform reports.** In parallel with steps 2–4.
7. **CFPB escalation.** Only if bank denies dispute or violates timeline.

The plan generator applies this order with per-scam-type filtering — e.g.,
"crypto to non-custodial wallet" skips step 2 because there's no bank to
dispute with, and the user is told why.
