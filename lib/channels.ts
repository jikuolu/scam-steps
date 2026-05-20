// Reporting channels. See research/recovery-channels.md.

export type ChannelId =
  | "bank-dispute"
  | "ic3"
  | "ftc-reportfraud"
  | "identitytheft-gov"
  | "police-report"
  | "state-ag"
  | "credit-bureaus"
  | "cfpb"
  | "platform-report"
  | "exchange-report"
  | "sec-tcr";

export interface Channel {
  id: ChannelId;
  label: string;
  url?: string;
  whatItIs: string;
  whatItDoes: string;
  howToFile: string;
  realisticOutcome: string;
}

export const CHANNELS: Record<ChannelId, Channel> = {
  "bank-dispute": {
    id: "bank-dispute",
    label: "Bank or card-issuer dispute",
    whatItIs:
      "A formal dispute with the financial institution that holds the account or issued the card involved in the transfer.",
    whatItDoes:
      "Investigates the transaction and can reverse it. This is where most actual recovery happens. The legal rules that require the bank to investigate are called Regulation E (for debit cards and electronic transfers) and Regulation Z (for credit cards) — mentioning the name on the call signals you know your rights.",
    howToFile:
      "Call the fraud number on the back of your card, or your bank's fraud line — not the branch and not the general customer-service number. Say: 'I need to report fraud and file a dispute.' Be ready to email or upload documents. Before you hang up, get a dispute reference number.",
    realisticOutcome:
      "For debit cards, the bank usually puts the money back temporarily within 10 business days while they investigate. For credit cards, the charge is usually removed right away. Final decision takes 60–90 days. This is the single strongest place to recover money — every other step supports this one.",
  },
  ic3: {
    id: "ic3",
    label: "FBI Internet Crime Complaint Center (IC3)",
    url: "https://www.ic3.gov",
    whatItIs:
      "The FBI's intake portal for internet-enabled crime. Federal-level data collection.",
    whatItDoes:
      "Collects your report for FBI analysis. The FBI rarely investigates individual cases, but the report still matters. For wire transfers over $50,000 to a bank in another country, the FBI has a fast-acting recall program (the Financial Fraud Kill Chain) that can sometimes get the money back — but only if you file IC3 quickly.",
    howToFile:
      "Go to ic3.gov, click 'File a Complaint.' The form asks for the incident narrative, financial details, scammer information, and how you were contacted. Plan 20–40 minutes for the first complete filing. Save the confirmation number — some banks and platforms accept it as evidence of a federal report.",
    realisticOutcome:
      "Confirmation number you can cite to banks, platforms, and law enforcement. No individual investigation for most cases. Aggregate data drives federal action against fraud rings over time.",
  },
  "ftc-reportfraud": {
    id: "ftc-reportfraud",
    label: "FTC ReportFraud",
    url: "https://reportfraud.ftc.gov",
    whatItIs:
      "Federal Trade Commission's consumer-protection complaint database.",
    whatItDoes:
      "Feeds the Consumer Sentinel database used by state attorneys general and law enforcement. Does not investigate individual cases.",
    howToFile:
      "Go to reportfraud.ftc.gov. The form is shorter than IC3 — about 10–15 minutes. Same incident narrative, less detail required.",
    realisticOutcome:
      "Aggregate enforcement signal. Useful for documentation. Not a recovery channel on its own.",
  },
  "identitytheft-gov": {
    id: "identitytheft-gov",
    label: "FTC IdentityTheft.gov",
    url: "https://identitytheft.gov",
    whatItIs:
      "The FTC's identity-theft-specific recovery flow — the best-built channel for cases where SSN or accounts were compromised.",
    whatItDoes:
      "Walks you through a personalized recovery plan, drafts dispute letters to creditors, and produces an official FTC Identity Theft Report. Banks and creditors are required by law (the Fair Credit Reporting Act) to accept this report.",
    howToFile:
      "Go to identitytheft.gov and follow the guided flow. Plan 30–60 minutes. The output is a packet of pre-filled letters and a recovery plan.",
    realisticOutcome:
      "Best-in-class recovery support for identity-theft cases. 80%+ recovery rate for fraudulent accounts contested with an Identity Theft Report.",
  },
  "police-report": {
    id: "police-report",
    label: "Local police report",
    whatItIs:
      "A police report from your local jurisdiction, producing a case number.",
    whatItDoes:
      "Provides a case number that banks often require for dispute processing and that the FTC identity-theft flow uses. Most departments will not investigate losses under ~$5,000, but the report itself is the deliverable.",
    howToFile:
      "In person at the local precinct, online for most US cities (search '[your city] police online report'), or by non-emergency phone. Have the incident narrative, transaction details, and any scammer contact information ready. Request a case number before ending the report.",
    realisticOutcome:
      "Case number you cite in bank disputes, platform reports, and federal filings. Investigation unlikely for small losses; the documentation is the value.",
  },
  "state-ag": {
    id: "state-ag",
    label: "State Attorney General — Consumer Protection",
    url: "https://www.naag.org/find-my-ag/",
    whatItIs:
      "State-level consumer-protection complaint, filed with your state's Attorney General.",
    whatItDoes:
      "Investigates patterns across multiple complaints. Can act against in-state businesses. Sometimes directly contacts merchants to negotiate refunds.",
    howToFile:
      "Find your state AG at naag.org/find-my-ag and follow the consumer-complaint instructions. Most states have an online form.",
    realisticOutcome:
      "Variable by state. Strong on patterns and in-state actors, weak on individual recovery in most cases.",
  },
  "credit-bureaus": {
    id: "credit-bureaus",
    label: "Credit bureau fraud alert and freeze",
    whatItIs:
      "Free fraud alerts and credit freezes with Equifax, Experian, and TransUnion.",
    whatItDoes:
      "Fraud alert: lenders must verify identity before extending credit, for 1 year. Credit freeze: blocks all new credit applications until thawed.",
    howToFile:
      "Place a freeze with each bureau separately (freezes do not propagate): equifax.com/personal/credit-report-services, experian.com/freeze, transunion.com/credit-freeze. Each is free and immediate. A fraud alert with one bureau notifies the other two — file once for the alert.",
    realisticOutcome:
      "Stops future damage from SSN exposure. Does not undo existing damage; combine with identitytheft.gov for that.",
  },
  cfpb: {
    id: "cfpb",
    label: "CFPB consumer complaint",
    url: "https://www.consumerfinance.gov/complaint/",
    whatItIs:
      "Consumer Financial Protection Bureau complaint channel.",
    whatItDoes:
      "Sends your complaint directly to your bank with a deadline — they must respond within 15 days and resolve within 60 days. The complaints are public, so banks take them seriously.",
    howToFile:
      "Go to consumerfinance.gov/complaint. Only file here after your bank has already denied your dispute, refused to investigate, or missed the legal deadlines — the CFPB handles bank conduct, not the original scam.",
    realisticOutcome:
      "Often gets the bank to reverse a denied dispute, especially for Zelle and other 'I sent the money myself but was tricked' cases. This is the single most effective step for pushing back on a bank that refuses to help.",
  },
  "platform-report": {
    id: "platform-report",
    label: "Platform-specific report (Zelle, Venmo, Cash App, PayPal, Meta, eBay, etc.)",
    whatItIs:
      "In-platform fraud / dispute report through the payment or marketplace platform involved.",
    whatItDoes:
      "Triggers the platform's internal fraud review and any applicable Purchase Protection. Required for marketplace Purchase Protection claims.",
    howToFile:
      "Each platform has its own flow — see the per-platform links in the generated plan. Typical path: in-app Help → Report a Problem / Resolution Center.",
    realisticOutcome:
      "Strong recovery for platform-checkout-paid marketplace purchases (eBay, PayPal G&S). Weak for peer-to-peer payments outside Purchase Protection.",
  },
  "exchange-report": {
    id: "exchange-report",
    label: "Cryptocurrency exchange compliance / law-enforcement portal",
    whatItIs:
      "The receiving exchange's official process for law-enforcement and victim freeze requests.",
    whatItDoes:
      "Can freeze the receiving account if the funds have not been withdrawn. Time window is hours, not days.",
    howToFile:
      "Coinbase: coinbase.com/legal/law_enforcement_inquiries. Binance: binance.com/en/support/list (law-enforcement portal). Kraken: support.kraken.com (security → report theft). Provide transaction hash, your IC3 number, and any police case number. Speed matters more than completeness.",
    realisticOutcome:
      "5–15% recovery if the exchange acts before the scammer withdraws. Zero if they've already moved to a non-custodial wallet.",
  },
  "sec-tcr": {
    id: "sec-tcr",
    label: "SEC Tips, Complaints, and Referrals",
    url: "https://www.sec.gov/tcr",
    whatItIs:
      "Securities and Exchange Commission's complaint channel for investment fraud involving securities.",
    whatItDoes:
      "Routes complaints to the SEC's Office of the Whistleblower / Division of Enforcement. May trigger investigation for patterns or US-registered entities.",
    howToFile:
      "Go to sec.gov/tcr and complete the TCR form. Specify the entity name, claimed registration, transaction details.",
    realisticOutcome:
      "Useful when a US-registered entity was claimed in the fraud. Limited utility for offshore investment fraud. State securities regulator is often more responsive for losses under $250k.",
  },
};
