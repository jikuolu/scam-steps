// Triage classification: maps the 5-question interview to a scam type.
// Conservative — when in doubt, pick the type with the more rigorous filing path,
// not the more optimistic recovery rate.

import type { ScamTypeId } from "./scam-types";

export type PaymentMethod =
  | "credit-card"
  | "debit-card"
  | "zelle"
  | "venmo"
  | "cashapp"
  | "paypal-gs"
  | "paypal-ff"
  | "wire"
  | "crypto-exchange"
  | "crypto-wallet"
  | "gift-card"
  | "cash"
  | "other";

export type ContactChannel =
  | "phone-call"
  | "text-message"
  | "email"
  | "social-media"
  | "dating-app"
  | "marketplace-listing"
  | "in-person"
  | "pop-up-ad"
  | "other";

export type ScamPattern =
  | "unrecognized-charges-only" // saw charges I didn't make
  | "marketplace-purchase" // bought something that didn't arrive or was fake
  | "impersonation-bank-gov" // someone claimed to be from bank/IRS/SSA/police
  | "tech-support" // remote access to my device
  | "romance" // online relationship
  | "investment" // promised returns, fake trading platform
  | "identity-accounts-opened" // accounts opened in my name
  | "other";

export interface TriageInput {
  pattern: ScamPattern;
  payment: PaymentMethod;
  contact: ContactChannel;
  // Hours since the most recent payment / discovery.
  hoursSinceIncident: number;
  // Approximate loss in USD; used only for prioritization, not stored.
  approxLossUSD: number;
}

export function classify(input: TriageInput): ScamTypeId {
  const { pattern, payment } = input;

  if (pattern === "identity-accounts-opened") return "identity-theft";

  if (pattern === "tech-support") return "tech-support-remote-access";

  if (pattern === "romance") return "romance";

  if (pattern === "investment") return "investment-pig-butchering";

  if (pattern === "impersonation-bank-gov") {
    // Specific channel matters for impersonation; payment method drives recovery.
    if (payment === "wire") return "wire-transfer";
    if (payment === "crypto-wallet") return "crypto-external-wallet";
    if (payment === "crypto-exchange") return "crypto-exchange-held";
    return "government-impersonation";
  }

  if (pattern === "marketplace-purchase") {
    if (payment === "credit-card" || payment === "debit-card" || payment === "paypal-gs") {
      return "marketplace-platform-paid";
    }
    return "marketplace-p2p-paid";
  }

  if (pattern === "unrecognized-charges-only") {
    return "card-unauthorized";
  }

  // Fall through by payment method
  if (payment === "wire") return "wire-transfer";
  if (payment === "crypto-wallet") return "crypto-external-wallet";
  if (payment === "crypto-exchange") return "crypto-exchange-held";
  if (payment === "credit-card" || payment === "debit-card") return "card-unauthorized";
  if (payment === "zelle" || payment === "venmo" || payment === "cashapp" || payment === "paypal-ff") {
    return "zelle-venmo-cashapp-authorized";
  }

  return "other";
}

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  "credit-card": "Credit card",
  "debit-card": "Debit card",
  zelle: "Zelle",
  venmo: "Venmo",
  cashapp: "Cash App",
  "paypal-gs": "PayPal — Goods & Services",
  "paypal-ff": "PayPal — Friends & Family",
  wire: "Bank wire transfer",
  "crypto-exchange": "Crypto sent to an exchange account",
  "crypto-wallet": "Crypto sent to a wallet address",
  "gift-card": "Gift card",
  cash: "Cash",
  other: "Other",
};

export const PATTERN_LABELS: Record<ScamPattern, string> = {
  "unrecognized-charges-only": "Charges I did not make appeared on my card",
  "marketplace-purchase": "Bought something that didn't arrive, was fake, or was misrepresented",
  "impersonation-bank-gov": "Someone claimed to be from my bank, the IRS, SSA, police, or another agency",
  "tech-support": "I gave 'tech support' remote access to my computer or phone",
  romance: "Online relationship turned out to be fake; I sent money or information",
  investment: "I was directed to a trading platform or investment that turned out to be fake",
  "identity-accounts-opened": "Accounts were opened in my name or my SSN is being used",
  other: "None of the above clearly fits",
};

export const CONTACT_LABELS: Record<ContactChannel, string> = {
  "phone-call": "Phone call",
  "text-message": "Text message",
  email: "Email",
  "social-media": "Social media direct message",
  "dating-app": "Dating app or romance site",
  "marketplace-listing": "Marketplace listing",
  "in-person": "In person",
  "pop-up-ad": "Browser pop-up or warning",
  other: "Other",
};
