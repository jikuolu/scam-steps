// Scam-type taxonomy with honest recovery-rate bands.
// See research/scam-types.md for sources and reasoning. Update annually.

export type ScamTypeId =
  | "card-unauthorized"
  | "zelle-venmo-cashapp-authorized"
  | "wire-transfer"
  | "crypto-external-wallet"
  | "crypto-exchange-held"
  | "marketplace-platform-paid"
  | "marketplace-p2p-paid"
  | "romance"
  | "investment-pig-butchering"
  | "identity-theft"
  | "government-impersonation"
  | "tech-support-remote-access"
  | "other";

export interface ScamType {
  id: ScamTypeId;
  label: string;
  oneLine: string;
  // Realistic recovery-rate band as percent. Population-level, not predictions.
  recoveryBand: { low: number; high: number };
  // Hours from incident within which the most important action must happen.
  // Null means no hard time window (e.g. romance, identity theft).
  criticalWindowHours: number | null;
  // The most-important first action, in plain language.
  firstAction: string;
  // Channels relevant to this type, in priority order. See lib/channels.ts.
  channels: string[];
  // Honest framing about expected outcome.
  honestNote: string;
}

export const SCAM_TYPES: Record<ScamTypeId, ScamType> = {
  "card-unauthorized": {
    id: "card-unauthorized",
    label: "Unauthorized credit or debit card charge",
    oneLine:
      "Charges on your card you did not authorize. Card number, not full account, compromised.",
    recoveryBand: { low: 85, high: 95 },
    criticalWindowHours: 60 * 24, // 60 days; treated as urgent because banks count from statement date
    firstAction:
      "Call the fraud number on the back of your card. Not the branch, not the app's general support. Tell them you have fraudulent charges and need to file a dispute. The legal rules that protect you are Regulation Z for credit cards and Regulation E for debit cards — you can mention them, but you don't have to.",
    channels: ["bank-dispute", "police-report", "ftc-reportfraud", "ic3"],
    honestNote:
      "If you file within 60 days with reasonable documentation, getting your money back is the norm. For debit cards, the bank usually puts the money back temporarily within 10 business days while they investigate; for credit cards, the charge is usually removed right away. The bank dispute is the recovery — every other step here supports it.",
  },
  "zelle-venmo-cashapp-authorized": {
    id: "zelle-venmo-cashapp-authorized",
    label: "Zelle, Venmo, or Cash App payment you sent to a scammer",
    oneLine:
      "You authorized the payment but were deceived about who or what you were paying.",
    recoveryBand: { low: 10, high: 25 },
    criticalWindowHours: 48,
    firstAction:
      "Call the sending bank's fraud line and ask them to recall the payment and open a fraud dispute. Most banks deny these on the first try — file anyway, because the next step (a CFPB complaint about the denial) is where many cases actually get reversed.",
    channels: [
      "bank-dispute",
      "platform-report",
      "police-report",
      "ftc-reportfraud",
      "ic3",
      "cfpb",
    ],
    honestNote:
      "When you sent the money yourself (even though you were tricked), federal law (Regulation E) does not automatically protect you the way it does for unauthorized charges. After pressure from the CFPB in 2023, big banks started reimbursing some imposter-scam cases — but coverage is hit-or-miss. The CFPB complaint step matters more here than for any other type, but you have to file the bank dispute first so there's a denial for the CFPB to push back on.",
  },
  "wire-transfer": {
    id: "wire-transfer",
    label: "Wire transfer to a scammer",
    oneLine: "Funds moved by wire — domestic or international.",
    recoveryBand: { low: 5, high: 50 },
    criticalWindowHours: 48,
    firstAction:
      "Call the bank that sent the wire and ask them to recall it. Do this first — speed matters more than any other step. If the wire was over $50,000 and went to a bank in another country, also ask them to coordinate with the FBI through your IC3 complaint number — the FBI has a fast recall program for cases like this.",
    channels: ["bank-dispute", "ic3", "police-report", "ftc-reportfraud"],
    honestNote:
      "This is the most time-sensitive category. Recall odds are 30–50% if you act within 24 hours, under 5% past 72 hours for international wires. File IC3 right away — for big international wires the FBI can ask foreign banks for cooperation, but only if you move fast.",
  },
  "crypto-external-wallet": {
    id: "crypto-external-wallet",
    label: "Crypto sent to a non-custodial wallet",
    oneLine:
      "Funds sent to a wallet address the scammer controls directly, outside any exchange.",
    recoveryBand: { low: 0, high: 1 },
    criticalWindowHours: null,
    firstAction:
      "File IC3 immediately. Then read the warning below about recovery scammers. Do not engage with anyone who promises crypto recovery.",
    channels: ["ic3", "ftc-reportfraud", "police-report"],
    honestNote:
      "Honest: recovery is effectively zero. Filing still matters for documentation (tax loss, future legal action, aggregate enforcement data) but no individual recovery should be expected. The most common follow-up scam is a fake 'crypto recovery service' targeting your loss — every one of those is itself a scam. Do not pay anyone who promises to recover this.",
  },
  "crypto-exchange-held": {
    id: "crypto-exchange-held",
    label: "Crypto sent to an exchange account (Coinbase, Binance, Kraken, etc.)",
    oneLine:
      "Funds sent to a wallet still controlled by a regulated exchange — small window where freeze is possible.",
    recoveryBand: { low: 5, high: 15 },
    criticalWindowHours: 24,
    firstAction:
      "Contact the receiving exchange's law-enforcement / compliance portal immediately. Provide transaction hash, your IC3 complaint number, and a police report number if you have one. Speed matters more than completeness — the scammer is moving the funds.",
    channels: [
      "exchange-report",
      "ic3",
      "police-report",
      "ftc-reportfraud",
      "bank-dispute",
    ],
    honestNote:
      "Exchanges can sometimes freeze funds before the scammer withdraws. The window is hours, not days. Recovery odds are still low (5–15%) but real, unlike non-custodial wallets.",
  },
  "marketplace-platform-paid": {
    id: "marketplace-platform-paid",
    label: "Marketplace purchase paid via platform checkout",
    oneLine:
      "eBay, FB Marketplace shipping, OfferUp shipping, PayPal Goods & Services — paid through the platform.",
    recoveryBand: { low: 60, high: 80 },
    criticalWindowHours: 24 * 30,
    firstAction:
      "Open a dispute in the platform's Resolution Center / Purchase Protection within their stated window. For eBay and PayPal G&S this is your primary path — recovery is the norm.",
    channels: ["platform-report", "bank-dispute", "ftc-reportfraud"],
    honestNote:
      "Purchase Protection programs are designed for this. If platform denies, escalate to the card or bank used to fund the purchase as a chargeback.",
  },
  "marketplace-p2p-paid": {
    id: "marketplace-p2p-paid",
    label: "Marketplace purchase paid by Zelle, Venmo Friends, or cash",
    oneLine:
      "Paid the seller directly outside the platform's protected payment flow.",
    recoveryBand: { low: 5, high: 15 },
    criticalWindowHours: 48,
    firstAction:
      "Same as authorized Zelle / Venmo fraud — call the sending bank's fraud line and request a Regulation E dispute. Report the seller on the platform in parallel. Honest expectation: low recovery rate.",
    channels: [
      "bank-dispute",
      "platform-report",
      "police-report",
      "ftc-reportfraud",
      "ic3",
      "cfpb",
    ],
    honestNote:
      "Paying outside the platform's protected checkout is the single largest cause of unrecovered marketplace losses. The bank dispute path is real but weak; file it anyway.",
  },
  romance: {
    id: "romance",
    label: "Romance scam",
    oneLine:
      "Sustained relationship deception over weeks or months, payments by wire, gift card, or crypto.",
    recoveryBand: { low: 0, high: 5 },
    criticalWindowHours: null,
    firstAction:
      "File IC3 first — romance scam reports are aggregated for FBI takedown operations. Then handle the payment channels per their categories below. Read the warning about recovery scammers carefully — romance-scam victims are the most-targeted group for follow-on fraud.",
    channels: ["ic3", "ftc-reportfraud", "bank-dispute", "police-report"],
    honestNote:
      "Recovery is rare. Filing still matters because aggregated IC3 data drives takedowns of the fraud rings, and a police / FTC record protects you from later being accused of the original transfers in legal or tax contexts. The hardest part of this category is that the same victim list is targeted by 'recovery agents' promising to get the funds back — every one of those is itself a scam.",
  },
  "investment-pig-butchering": {
    id: "investment-pig-butchering",
    label: "Investment fraud / 'pig butchering'",
    oneLine:
      "Fake crypto-trading platform, often introduced through a long social-engineering relationship.",
    recoveryBand: { low: 0, high: 2 },
    criticalWindowHours: null,
    firstAction:
      "File IC3 immediately. Add an SEC TCR complaint if a US-registered entity was claimed. State securities regulator is often more responsive than SEC for losses under $250k.",
    channels: ["ic3", "sec-tcr", "ftc-reportfraud", "bank-dispute"],
    honestNote:
      "Recovery is under 2% in nearly all cases. The FBI has had some success with operations like Shamrock that seized scam infrastructure; victims sometimes receive partial restitution years later. File and forget the timeline — expect no recovery, document fully.",
  },
  "identity-theft": {
    id: "identity-theft",
    label: "Identity theft — accounts opened or SSN used in your name",
    oneLine:
      "Someone has used your personal information to open accounts or commit fraud — different from a single fraudulent charge.",
    recoveryBand: { low: 70, high: 90 },
    criticalWindowHours: 72,
    firstAction:
      "Go to identitytheft.gov and walk through the FTC's recovery process. It produces an official Identity Theft Report that banks and creditors are required by law to accept. Then place a free credit freeze with all three credit bureaus — Equifax, Experian, and TransUnion.",
    channels: [
      "identitytheft-gov",
      "credit-bureaus",
      "police-report",
      "bank-dispute",
    ],
    honestNote:
      "Identity theft is the one category where the FTC runs a guided recovery flow that produces a legally accepted Identity Theft Report — identitytheft.gov walks you through it. When fraudulent accounts are challenged using that report, more than 80% of cases are resolved in the victim's favor, according to published FTC data.",
  },
  "government-impersonation": {
    id: "government-impersonation",
    label: "Government impersonation (IRS, Social Security, ICE, FBI, etc.)",
    oneLine:
      "Caller claimed to be a government agency demanding payment, often by gift card, wire, or crypto.",
    recoveryBand: { low: 2, high: 20 },
    criticalWindowHours: 48,
    firstAction:
      "File with TIGTA for IRS impersonation or SSA OIG for Social Security impersonation. Then handle the payment channels per their categories — gift card recovery is near-zero, wire / crypto per those entries.",
    channels: ["ic3", "ftc-reportfraud", "police-report", "bank-dispute"],
    honestNote:
      "Recovery depends entirely on payment method. Gift card payments are effectively unrecoverable. Government agencies do not call demanding payment, threaten arrest, or accept gift cards — surfacing this for future calls matters as much as the recovery filing.",
  },
  "tech-support-remote-access": {
    id: "tech-support-remote-access",
    label: "Tech support scam with remote access to your device",
    oneLine:
      "You called or were called by fake 'support' and granted remote access — funds moved or persistent access installed.",
    recoveryBand: { low: 30, high: 60 },
    criticalWindowHours: 24,
    firstAction:
      "Disconnect the device from the internet now. From a different, clean device: change passwords for banking, email, and any account accessed during the session. Then call the bank's fraud line and dispute any moved funds.",
    channels: ["bank-dispute", "ic3", "ftc-reportfraud", "police-report"],
    honestNote:
      "Two losses to consider: the funds moved, and the persistent access. Remote-access tools (AnyDesk, TeamViewer, ScreenConnect) need to be uninstalled and the device scanned. If banking sessions happened, treat the device as compromised until cleaned by a trusted technician.",
  },
  other: {
    id: "other",
    label: "Other scam type",
    oneLine: "A scam that doesn't cleanly fit the categories above.",
    recoveryBand: { low: 5, high: 30 },
    criticalWindowHours: 48,
    firstAction:
      "File the universal channels — IC3, FTC ReportFraud, local police report — and dispute with any bank or card involved in the transfer.",
    channels: ["bank-dispute", "ic3", "ftc-reportfraud", "police-report"],
    honestNote:
      "When the category isn't clear, file the universal channels. Recovery odds depend on the payment method used; the documentation pack below is what you'll need either way.",
  },
};
