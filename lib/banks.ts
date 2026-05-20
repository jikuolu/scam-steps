// Top US consumer banks' official fraud / security pages.
//
// Rule for what goes here: only the bank's primary security or fraud
// landing page on its main domain. The page itself will always list the
// current phone number. We never cache phone numbers in this file — wrong
// numbers are a known vector for fake-bank scams targeting victims.
//
// Verification cadence: annual. Follow each link, confirm it still resolves
// to the bank's fraud / security page. Update verifiedAt when reviewed.

export interface Bank {
  id: string;
  name: string;
  // Common alternate names users may type.
  aliases: string[];
  // The bank's primary fraud/security landing page on its main domain.
  fraudPageUrl: string;
  // ISO date of last manual verification.
  verifiedAt: string;
  // Short note shown in the UI if the bank has a specific tip.
  note?: string;
}

export const BANKS: Bank[] = [
  {
    id: "chase",
    name: "Chase",
    aliases: ["jpmorgan", "jp morgan", "chase bank"],
    fraudPageUrl: "https://www.chase.com/digital/resources/privacy-security/security/report-fraud",
    verifiedAt: "2026-05-20",
  },
  {
    id: "bofa",
    name: "Bank of America",
    aliases: ["boa", "bank of america"],
    fraudPageUrl: "https://www.bankofamerica.com/security-center/overview/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "wells-fargo",
    name: "Wells Fargo",
    aliases: ["wells", "wf"],
    fraudPageUrl: "https://www.wellsfargo.com/privacy-security/fraud/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "citi",
    name: "Citi",
    aliases: ["citibank", "citigroup"],
    fraudPageUrl: "https://www.citi.com/credit-cards/credit-card-customer-service/credit-card-fraud",
    verifiedAt: "2026-05-20",
  },
  {
    id: "capital-one",
    name: "Capital One",
    aliases: ["capone", "cap one"],
    fraudPageUrl: "https://www.capitalone.com/digital/security/report-fraud/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "us-bank",
    name: "U.S. Bank",
    aliases: ["us bank", "usbank"],
    fraudPageUrl: "https://www.usbank.com/customer-service/digital-explorer/security-center.html",
    verifiedAt: "2026-05-20",
  },
  {
    id: "pnc",
    name: "PNC",
    aliases: ["pnc bank"],
    fraudPageUrl: "https://www.pnc.com/en/security-privacy.html",
    verifiedAt: "2026-05-20",
  },
  {
    id: "truist",
    name: "Truist",
    aliases: ["bb&t", "suntrust", "truist bank"],
    fraudPageUrl: "https://www.truist.com/fraud-and-security",
    verifiedAt: "2026-05-20",
  },
  {
    id: "td",
    name: "TD Bank",
    aliases: ["td", "toronto dominion"],
    fraudPageUrl: "https://www.td.com/us/en/personal-banking/security",
    verifiedAt: "2026-05-20",
  },
  {
    id: "usaa",
    name: "USAA",
    aliases: [],
    fraudPageUrl: "https://www.usaa.com/inet/wc/advice-finances-fraud-protection",
    verifiedAt: "2026-05-20",
    note: "USAA is generally faster than other major banks on fraud disputes — call within 24 hours where possible.",
  },
  {
    id: "navy-federal",
    name: "Navy Federal Credit Union",
    aliases: ["nfcu", "navy federal", "navy fed"],
    fraudPageUrl: "https://www.navyfederal.org/security.html",
    verifiedAt: "2026-05-20",
  },
  {
    id: "discover",
    name: "Discover",
    aliases: ["discover card", "discover bank"],
    fraudPageUrl: "https://www.discover.com/credit-cards/help-center/help/fraud/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "amex",
    name: "American Express",
    aliases: ["amex"],
    fraudPageUrl: "https://www.americanexpress.com/us/security-center/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "ally",
    name: "Ally Bank",
    aliases: ["ally"],
    fraudPageUrl: "https://www.ally.com/security/",
    verifiedAt: "2026-05-20",
  },
  {
    id: "schwab",
    name: "Charles Schwab Bank",
    aliases: ["schwab", "charles schwab"],
    fraudPageUrl: "https://www.schwab.com/legal/schwab-security-guarantee",
    verifiedAt: "2026-05-20",
  },
];

export function searchBanks(query: string): Bank[] {
  const q = query.trim().toLowerCase();
  if (!q) return BANKS;
  return BANKS.filter((b) => {
    if (b.name.toLowerCase().includes(q)) return true;
    return b.aliases.some((a) => a.toLowerCase().includes(q));
  });
}
