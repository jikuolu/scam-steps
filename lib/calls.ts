// Phone calls to make, per case type. Generic where institution-specific
// numbers are user-dependent (your bank). Specific where there's one number
// that always applies (AARP, Elder Fraud Hotline, TIGTA).

import type { ScamTypeId } from "./scam-types";

export interface PhoneCall {
  id: string;
  who: string;
  number: string;
  what: string;
  why: string;
  hours?: string;
}

export const CALLS: Record<string, PhoneCall> = {
  "your-bank-fraud": {
    id: "your-bank-fraud",
    who: "Your bank's fraud department",
    number: "On the back of your card, or look up '[your bank name] fraud department'",
    what: "Say: 'I'm a victim of fraud and need to file a dispute.' Ask for a dispute reference number before hanging up. Email any documents they request the same day.",
    why: "Where the money lives. This is the single most important call — it starts the formal dispute timer and, for card fraud, usually triggers provisional credit within 10 business days.",
    hours: "Most major US banks: 24/7",
  },
  "wire-recall": {
    id: "wire-recall",
    who: "The sending bank's wire desk",
    number: "Call your bank's main line and ask for the wire / international transfers desk specifically — not regular customer service",
    what: "Say: 'I authorized a wire today but was tricked. I need to request a recall.' If the wire was over $50,000 and went to another country, also ask whether the FBI's fast-acting recall program (the Financial Fraud Kill Chain) can be used — they coordinate with foreign banks through IC3.",
    why: "Wire transfers move fast and recalls are time-critical. Inside the US, you have roughly 24 hours. International, about 48 hours before the money moves out of reach.",
    hours: "Business hours; ask for the after-hours fraud line if outside",
  },
  "card-issuer-fraud": {
    id: "card-issuer-fraud",
    who: "Your card issuer's fraud line",
    number: "On the back of the card",
    what: "Say: 'I have fraudulent charges on my card and need to file a dispute.' You can also mention the legal rules that protect you — Regulation Z for credit, Regulation E for debit — but you don't have to. Ask for a new card while you're on the call.",
    why: "Federal law limits how much you can be charged for fraud on your card: $50 maximum on a credit card. The same $50 cap on a debit card applies only if you report within 2 business days; wait longer and the cap rises to $500. Calling fast matters.",
    hours: "24/7 for major issuers",
  },
  "aarp-fraud-watch": {
    id: "aarp-fraud-watch",
    who: "AARP Fraud Watch Helpline",
    number: "877-908-3360",
    what: "Free helpline staffed by trained volunteers. Walk through your situation; they'll help you decide what to file first. You do not have to be an AARP member or over 50.",
    why: "If you'd like to talk to a real person before doing any of the filings. They cannot recover funds for you, but they will help you think through the order.",
    hours: "Mon–Fri 8am–8pm ET",
  },
  "elder-fraud-hotline": {
    id: "elder-fraud-hotline",
    who: "National Elder Fraud Hotline",
    number: "833-372-8311",
    what: "US Department of Justice line for victims age 60+. Case managers help with reporting and connect to investigators where applicable.",
    why: "If you or your parent is 60+, this is a dedicated channel with more individual attention than IC3 or FTC.",
    hours: "Mon–Fri 10am–6pm ET",
  },
  "tigta-irs": {
    id: "tigta-irs",
    who: "TIGTA (IRS impersonation)",
    number: "800-366-4484",
    what: "Report calls from anyone claiming to be IRS demanding payment. The IRS does not call demanding payment, threaten arrest, or accept gift cards.",
    why: "Specific channel for IRS impersonation scams — files into the Treasury Inspector General's enforcement database.",
    hours: "Mon–Fri",
  },
  "ssa-oig": {
    id: "ssa-oig",
    who: "SSA Office of the Inspector General",
    number: "800-269-0271",
    what: "Report calls claiming to be Social Security Administration. Real SSA does not call demanding payment or threatening to suspend your SSN.",
    why: "Specific channel for Social Security impersonation. Files into SSA OIG investigation database.",
    hours: "Mon–Fri 10am–4pm ET",
  },
  "ftc-helpline": {
    id: "ftc-helpline",
    who: "FTC consumer line",
    number: "877-382-4357 (877-FTC-HELP)",
    what: "General consumer-fraud helpline. They will direct you to the right specific channel — most people end up at ReportFraud.ftc.gov anyway, but the call routes anyone unsure.",
    why: "If you're not sure where to start and prefer a phone call to a web form.",
    hours: "Mon–Fri 9am–8pm ET",
  },
  "exchange-compliance": {
    id: "exchange-compliance",
    who: "The receiving crypto exchange's compliance / law-enforcement portal",
    number: "Not phone — a web form. Coinbase: coinbase.com/legal/law_enforcement_inquiries · Binance: search 'Binance law enforcement request' · Kraken: support.kraken.com → report theft.",
    what: "Submit transaction hash, receiving address, your IC3 confirmation number (file IC3 first if you can), and a brief account of the fraud. Request a freeze on the receiving account.",
    why: "Exchanges can freeze the receiving account if you reach them before the scammer withdraws. The window is hours, not days. Recovery isn't guaranteed but it's the only crypto route with any chance.",
    hours: "24/7 web intake",
  },
  "local-police-nonemergency": {
    id: "local-police-nonemergency",
    who: "Your local police non-emergency line",
    number: "Search '[your city] police non-emergency' or 311 in many cities. Online report option exists in most US cities.",
    what: "Say: 'I want to file a police report for fraud. I'm not asking for an investigation — I need a case number for my bank and federal filings.' Get the case number in writing or by email.",
    why: "The case number is the deliverable. Most departments do not investigate losses under ~$5,000, but the case number is required by many banks for dispute processing and by the FTC identity-theft flow.",
    hours: "24/7 for non-emergency; online forms available anytime",
  },
};

export const CALLS_PER_TYPE: Record<ScamTypeId, string[]> = {
  "card-unauthorized": ["card-issuer-fraud", "local-police-nonemergency", "aarp-fraud-watch"],
  "zelle-venmo-cashapp-authorized": ["your-bank-fraud", "local-police-nonemergency", "aarp-fraud-watch"],
  "wire-transfer": ["wire-recall", "local-police-nonemergency", "aarp-fraud-watch"],
  "crypto-external-wallet": ["aarp-fraud-watch", "local-police-nonemergency"],
  "crypto-exchange-held": ["exchange-compliance", "your-bank-fraud", "local-police-nonemergency"],
  "marketplace-platform-paid": ["card-issuer-fraud", "local-police-nonemergency"],
  "marketplace-p2p-paid": ["your-bank-fraud", "local-police-nonemergency"],
  romance: ["aarp-fraud-watch", "your-bank-fraud", "local-police-nonemergency"],
  "investment-pig-butchering": ["your-bank-fraud", "local-police-nonemergency", "aarp-fraud-watch"],
  "identity-theft": ["card-issuer-fraud", "local-police-nonemergency", "aarp-fraud-watch"],
  "government-impersonation": ["tigta-irs", "ssa-oig", "your-bank-fraud", "local-police-nonemergency"],
  "tech-support-remote-access": ["your-bank-fraud", "card-issuer-fraud", "local-police-nonemergency"],
  other: ["your-bank-fraud", "local-police-nonemergency", "aarp-fraud-watch", "ftc-helpline"],
};
