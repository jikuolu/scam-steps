// Site-level constants. Override the URL via NEXT_PUBLIC_SITE_URL in the
// environment (Vercel: set per environment). Production default points at
// the registered domain.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scamsteps.org").replace(/\/$/, "");
export const SITE_NAME = "Scam Steps";
export const SITE_DESCRIPTION =
  "Free, self-serve guide for US scam victims. Five questions, an ordered plan, the calls to make first, and editable filing-template drafts. No accounts, no payment, no data stored.";
