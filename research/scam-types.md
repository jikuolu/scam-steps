# Scam types — recovery picture per type

Source notes for the navigator's classification + honest-recovery-rate display.
Numbers are rough public estimates from FTC Consumer Sentinel, CFPB complaint
data, and IC3 annual reports (2022–2024). Treat them as orders-of-magnitude,
not promises. Update annually.

---

## 1. Unauthorized credit / debit card charge

The clearest recovery story in US consumer protection law.

- **Legal framework**: Regulation Z (credit cards), Regulation E (debit cards).
- **Card-network rules**: Visa / Mastercard chargeback procedures.
- **Window**: 60 days from statement date (debit, Reg E); 60 days from charge
  for credit (Reg Z). Banks often grant longer in practice.
- **Recovery rate if filed in window with reasonable documentation**: 85–95%.
- **Where money goes**: Provisional credit usually within 10 business days for
  debit; immediate for most credit-card disputes.

What kills recovery: filing past 60 days, no documentation, prior pattern of
unrecognized charges the cardholder ignored, evidence the cardholder gave the
card number to the merchant voluntarily.

## 2. Zelle / Venmo / Cash App — authorized push payment

The user authorized the payment. The bank's historical position: not their
problem.

- **Legal framework**: Reg E covers *unauthorized* transactions only. Authorized
  push payment (APP) fraud sits outside.
- **2023 shift**: Major Zelle banks agreed to reimburse certain "imposter scam"
  victims after CFPB pressure and state AG action. Coverage is patchy.
- **Recovery rate**: Historically <10%. Rising to ~20–25% post-2023 for
  imposter-scam categories at major banks (Chase, BofA, Wells, USAA).
- **Window**: File immediately. Banks often deny on first pass; appeal with
  CFPB complaint after.

What helps: police report, evidence the scammer impersonated bank/government,
recipient account already flagged by other reports.

## 3. Wire transfer fraud

Time-critical above all else.

- **Recall window**: Domestic wire ~24 hours practical; international ~48 hours
  before the funds move out of receiving correspondent banks.
- **Tool**: FBI's Financial Fraud Kill Chain (FFKC) — for wires $50k+ to
  international destinations, FBI can request recall via foreign counterparts.
  Requires IC3 filing + bank coordination + speed.
- **Recovery rate <24h**: 30–50%.
- **Recovery rate >72h international**: <5%.

What helps: filing IC3 immediately, calling the sending bank's fraud line (not
branch), pushing for SWIFT recall and FFKC if amount and destination qualify.

## 4. Cryptocurrency to external wallet

Honest: recovery is rare. Most "crypto recovery" services are themselves scams.

- **If sent to an exchange-controlled wallet** (Coinbase, Binance, Kraken):
  contact the exchange's compliance/law-enforcement portal within hours; they
  can sometimes freeze if the receiving account hasn't withdrawn yet.
  Recovery rate: 5–15% under those conditions.
- **If sent to a non-custodial wallet**: effectively zero. Filing is still
  worth it for aggregate law-enforcement data; do not pay anyone who promises
  recovery.
- **Window**: hours, not days, for exchange freezes.

Specific warning to surface in the UI: "recovery agents" who promise crypto
recovery for an upfront fee are themselves a known scam pattern (IC3 lists
this as a top victim-targeting fraud).

## 5. Marketplace fake-seller (Facebook Marketplace, OfferUp, eBay, Craigslist)

Recovery depends on the payment method used, not the platform.

- **Paid by credit card via platform checkout (eBay, FB Marketplace shipping)**:
  Purchase Protection programs cover most cases. 60–80% recovery.
- **Paid by PayPal Goods & Services**: PayPal dispute. 60–80%.
- **Paid by Zelle/Venmo/Cash App/cash to a stranger**: per APP fraud above,
  <15%.
- **Window**: platform-specific, usually 30–180 days.

## 6. Romance scam

Sustained relationship fraud, often crypto or wire by the time funds move.

- **Recovery rate**: <5% in most cases.
- **Why filing still matters**: aggregated IC3 data drives takedowns of the
  underlying fraud rings. Victim's loss is rarely recovered; future victims
  benefit.
- **Specific risk**: victim continues being targeted by recovery scammers after
  the original loss. Surface this warning prominently.

## 7. Investment fraud / "pig butchering"

Long-con fraud directing victim to fake crypto-trading platforms.

- **Recovery rate**: <1% in nearly all cases.
- **Process**: IC3 filing, state securities regulator, SEC complaint if
  US-registered entity claimed. FBI Operation Shamrock and similar have led
  to some asset seizures.
- **Window**: file immediately; expect no recovery; do file.

## 8. Identity theft (SSN, accounts opened in your name)

Different recovery shape — it's about stopping future damage, not recovering
past losses.

- **Tool**: identitytheft.gov (FTC). Generates a personalized recovery plan
  and an Identity Theft Report that banks and creditors must accept.
- **Critical actions**: credit freeze with Equifax, Experian, TransUnion (free,
  immediate); IRS Identity Protection PIN; close compromised accounts.
- **Recovery rate** (of fraudulent charges contested with an Identity Theft
  Report): 80%+.

## 9. Government impersonation (IRS, Social Security, ICE, FBI)

- **Specific channel**: TIGTA (Treasury Inspector General for Tax
  Administration) for IRS impersonation. SSA OIG for Social Security
  impersonation.
- **Recovery rate**: depends on payment method used. Gift card payments: <5%.
  Wire/crypto: per those categories.
- **Note**: government agencies do not call demanding payment; do not threaten
  arrest; do not accept gift cards. Surface this education.

## 10. Tech support / remote-access scam

Victim called a fake "support" number and granted remote access; scammer
either moved money via the victim's banking session or installed persistence.

- **Immediate action**: disconnect device, change all passwords from a clean
  device, contact bank fraud line, run full malware scan.
- **Recovery rate for funds moved**: 30–60% if caught and bank-disputed within
  24 hours; depends on payment rail used.
- **Persistent risk**: scammer may have installed remote-access tools (often
  AnyDesk, TeamViewer, ScreenConnect). Surface as a checklist.

---

## What we explicitly don't promise

- "We will get your money back." We don't; we help file the right reports
  correctly. The recipient channels decide outcomes.
- A specific recovery percentage for an individual case. The category averages
  above are population statistics, not predictions.
- Help if more than 12 months has passed. Most channels have expired by then.
- International recovery beyond US-resident-facing channels. Out of scope.

## What we say when recovery is unlikely

The honest sentence: *"Based on payment method and time elapsed, the
realistic recovery rate for this category is under 5%. Filing is still
worthwhile for two reasons: (1) it documents the fraud for credit/tax/legal
purposes; (2) aggregated reports drive law-enforcement action against the
ring. Do not pay anyone who promises to recover these funds — that is itself
a known scam."*
