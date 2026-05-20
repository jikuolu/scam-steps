// Filing-template generators. Each returns plain-text the user can copy.
// Language adapted from CFPB sample dispute letters and FTC ID-theft templates.
// All templates produce drafts the user reviews, edits, and signs themselves.

import { SCAM_TYPES, type ScamTypeId } from "./scam-types";
import { PAYMENT_LABELS, type TriageInput } from "./triage";

export interface IncidentDetails {
  fullName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  // Incident
  incidentDate: string; // ISO yyyy-mm-dd
  discoveredDate: string;
  amountUSD: string;
  narrative: string;
  // Scammer
  scammerName: string;
  scammerContact: string;
  scammerAccount: string;
  // Payment / account
  bankName: string;
  accountLast4: string;
  transactionId: string;
  // Optional case numbers
  policeCaseNumber: string;
  ic3ReferenceNumber: string;
}

export const EMPTY_INCIDENT: IncidentDetails = {
  fullName: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  incidentDate: "",
  discoveredDate: "",
  amountUSD: "",
  narrative: "",
  scammerName: "",
  scammerContact: "",
  scammerAccount: "",
  bankName: "",
  accountLast4: "",
  transactionId: "",
  policeCaseNumber: "",
  ic3ReferenceNumber: "",
};

const blank = (v: string, placeholder: string) => v.trim() ? v : `[${placeholder}]`;

export function incidentNarrative(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  const type = SCAM_TYPES[scamTypeId];
  return [
    `INCIDENT NARRATIVE — for your files and to attach to filings`,
    ``,
    `Reporter: ${blank(d.fullName, "your full name")}`,
    `Contact: ${blank(d.contactEmail, "your email")} / ${blank(d.contactPhone, "your phone")}`,
    `Address: ${blank(d.address, "your mailing address")}`,
    ``,
    `Category: ${type.label}`,
    `Payment method: ${PAYMENT_LABELS[input.payment]}`,
    `Date of incident: ${blank(d.incidentDate, "yyyy-mm-dd")}`,
    `Date discovered: ${blank(d.discoveredDate, "yyyy-mm-dd")}`,
    `Amount lost: $${blank(d.amountUSD, "amount")}`,
    ``,
    `What happened:`,
    blank(d.narrative, "Write a chronological account of what happened, in your own words. Start with how the scammer first contacted you. Include dates, times, amounts, and what was said. Stick to facts you can verify; mark anything uncertain as 'approximately' or 'I believe.'"),
    ``,
    `Scammer information:`,
    `  Name or alias used: ${blank(d.scammerName, "unknown")}`,
    `  Contact (phone, email, social handle): ${blank(d.scammerContact, "unknown")}`,
    `  Receiving account (bank, wallet, platform handle): ${blank(d.scammerAccount, "unknown")}`,
    ``,
    `Financial details:`,
    `  Sending bank: ${blank(d.bankName, "your bank")}`,
    `  Account last 4 digits: ${blank(d.accountLast4, "xxxx")}`,
    `  Transaction reference: ${blank(d.transactionId, "transaction id or confirmation number")}`,
    ``,
    `Case references:`,
    `  Police case number: ${blank(d.policeCaseNumber, "to be added once filed")}`,
    `  FBI IC3 complaint number: ${blank(d.ic3ReferenceNumber, "to be added once filed")}`,
    ``,
    `Signed: ${blank(d.fullName, "your name")}`,
    `Date: ${new Date().toISOString().slice(0, 10)}`,
  ].join("\n");
}

export function evidenceList(): string {
  return [
    `EVIDENCE CHECKLIST`,
    ``,
    `Save originals where possible. Take screenshots, then export raw data. Banks and law enforcement weight raw exports higher than screenshots.`,
    ``,
    `Communications`,
    `  [ ] Full message thread with the scammer — export from the platform where available, screenshots otherwise`,
    `  [ ] Email headers (in Gmail: 'Show original' from the message menu)`,
    `  [ ] Phone numbers used to call you, including any voicemails saved`,
    `  [ ] Caller ID screenshots showing spoofed numbers`,
    ``,
    `Financial`,
    `  [ ] Bank or card statement showing the disputed transaction(s)`,
    `  [ ] Transaction confirmation emails from the sending platform`,
    `  [ ] Wire confirmation including beneficiary name and bank`,
    `  [ ] Crypto transaction hash (txid) and receiving address`,
    `  [ ] Screenshots of any platform balance changes`,
    ``,
    `Scammer-side identifiers`,
    `  [ ] Website URLs visited, with the URL bar visible in screenshots`,
    `  [ ] Names, photos, and account handles used`,
    `  [ ] Receiving account numbers, bank names, wallet addresses`,
    `  [ ] Any documents the scammer sent (fake invoices, fake ID, fake government letters)`,
    ``,
    `Your side`,
    `  [ ] A written narrative in your own words (use the Incident Narrative template)`,
    `  [ ] Timeline of events with dates and times`,
    `  [ ] Any actions you took before realizing it was a scam`,
    ``,
    `File organization`,
    `  Save everything in a single folder named YYYY-MM-DD-[scam-type]. Inside that folder, separate subfolders for: 01-narrative, 02-communications, 03-financial, 04-scammer-evidence, 05-case-numbers. Banks asking for documentation will accept a zipped copy of this folder.`,
  ].join("\n");
}

export function bankDisputeLetter(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  const isCard = input.payment === "credit-card" || input.payment === "debit-card";
  const reg = isCard && input.payment === "credit-card" ? "Regulation Z (15 U.S.C. § 1666)" : "Regulation E (12 C.F.R. § 1005.11)";
  const type = SCAM_TYPES[scamTypeId];

  return [
    `${blank(d.fullName, "Your name")}`,
    `${blank(d.address, "Your address")}`,
    `${blank(d.contactEmail, "Your email")}`,
    `${blank(d.contactPhone, "Your phone")}`,
    ``,
    `${new Date().toISOString().slice(0, 10)}`,
    ``,
    `${blank(d.bankName, "Bank name")}`,
    `Fraud / Dispute Department`,
    ``,
    `Re: Written notice of fraud and dispute — Account ending ${blank(d.accountLast4, "xxxx")}`,
    ``,
    `To Whom It May Concern,`,
    ``,
    `I am writing to provide formal written notice of fraud on my account and to dispute the following transaction(s) under ${reg}.`,
    ``,
    `Disputed transaction:`,
    `  Date: ${blank(d.incidentDate, "yyyy-mm-dd")}`,
    `  Amount: $${blank(d.amountUSD, "amount")}`,
    `  Reference / transaction ID: ${blank(d.transactionId, "id")}`,
    `  Recipient as it appears on the statement: ${blank(d.scammerName, "as shown on statement")}`,
    ``,
    `Nature of the dispute:`,
    `${type.label}. ${blank(d.narrative, "Describe the fraud in 3–5 sentences. State clearly what was misrepresented and when you discovered the fraud.")}`,
    ``,
    `I am requesting the following:`,
    `1. Provisional credit to the disputed amount within the timeframes required by ${reg}.`,
    `2. A formal investigation into the transaction.`,
    `3. Written notice of the final determination, including a copy of any documents the bank relied on, as required by law.`,
    ``,
    `Supporting documentation enclosed:`,
    `  - Incident narrative`,
    `  - Evidence packet (communications, transaction confirmations, scammer identifiers)`,
    `  - Police case number: ${blank(d.policeCaseNumber, "to be added")}`,
    `  - FBI IC3 complaint number: ${blank(d.ic3ReferenceNumber, "to be added")}`,
    ``,
    `Please confirm receipt of this notice in writing within 10 business days.`,
    ``,
    `Sincerely,`,
    `${blank(d.fullName, "Your name")}`,
    ``,
    `--`,
    `Note: this is a draft generated for your review. Read it, edit it for accuracy, sign it, and send it. The bank's mailing address for written disputes is usually on the back of your card statement under 'Billing Inquiries' or on their website under 'Notice of Billing Errors.' Send by USPS Certified Mail with Return Receipt — the postal receipt is your proof of timely filing.`,
  ].join("\n");
}

export function ic3Prefill(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  const type = SCAM_TYPES[scamTypeId];
  return [
    `IC3 COMPLAINT — pre-fill draft`,
    `Go to ic3.gov, click 'File a Complaint.' Use the values below in the matching form fields.`,
    ``,
    `Victim Information`,
    `  Name: ${blank(d.fullName, "your name")}`,
    `  Email: ${blank(d.contactEmail, "your email")}`,
    `  Phone: ${blank(d.contactPhone, "your phone")}`,
    `  Address: ${blank(d.address, "your address")}`,
    ``,
    `Financial Information`,
    `  Amount lost: $${blank(d.amountUSD, "amount")}`,
    `  Payment method: ${PAYMENT_LABELS[input.payment]}`,
    `  Sending bank: ${blank(d.bankName, "your bank")}`,
    `  Sending account (last 4): ${blank(d.accountLast4, "xxxx")}`,
    `  Receiving account / wallet / handle: ${blank(d.scammerAccount, "scammer's receiving account")}`,
    `  Transaction reference: ${blank(d.transactionId, "transaction id")}`,
    ``,
    `Subject Information (the scammer)`,
    `  Name or alias used: ${blank(d.scammerName, "unknown")}`,
    `  Contact information: ${blank(d.scammerContact, "phone / email / handle")}`,
    ``,
    `Incident Description`,
    `Category: ${type.label}`,
    `Date of incident: ${blank(d.incidentDate, "yyyy-mm-dd")}`,
    ``,
    `${blank(d.narrative, "Write a clear chronological account: how the scammer contacted you, what they said, what you sent, when you realized it was a scam.")}`,
    ``,
    `--`,
    `Save the IC3 complaint confirmation number — banks and platforms will ask for it. Add it back into your incident-narrative file so it's available for the next filing.`,
  ].join("\n");
}

export function ftcPrefill(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  const type = SCAM_TYPES[scamTypeId];
  return [
    `FTC ReportFraud — pre-fill draft`,
    `Go to reportfraud.ftc.gov. Use the values below in the matching form fields.`,
    ``,
    `What happened (free text):`,
    `${blank(d.narrative, "Brief chronological account of what happened.")}`,
    ``,
    `Category: ${type.label}`,
    `Contact method: ${input.contact}`,
    `Date: ${blank(d.incidentDate, "yyyy-mm-dd")}`,
    `Amount lost: $${blank(d.amountUSD, "amount")}`,
    `Payment method: ${PAYMENT_LABELS[input.payment]}`,
    ``,
    `Information about the business or person:`,
    `  Name or alias: ${blank(d.scammerName, "unknown")}`,
    `  Contact: ${blank(d.scammerContact, "phone / email / handle")}`,
    `  Receiving account: ${blank(d.scammerAccount, "account / wallet / handle")}`,
    ``,
    `Your contact information:`,
    `  Name: ${blank(d.fullName, "your name")}`,
    `  Email: ${blank(d.contactEmail, "your email")}`,
    ``,
    `--`,
    `The FTC report does not produce a case number; it feeds the Consumer Sentinel database used by state AGs and law enforcement. Worth filing — short, low-effort.`,
  ].join("\n");
}

export function policeReportScript(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  const type = SCAM_TYPES[scamTypeId];
  return [
    `POLICE REPORT SCRIPT`,
    `Use this when calling the non-emergency line, walking into the precinct, or filling the online report form.`,
    ``,
    `What to ask for: a police report and a case number. You are not asking them to investigate; you are documenting the incident for your bank dispute and federal filings. State this directly if asked — most departments will not investigate losses under approximately $5,000.`,
    ``,
    `Script (read or paraphrase):`,
    ``,
    `My name is ${blank(d.fullName, "your name")}. I am a victim of ${type.label.toLowerCase()}. The incident occurred on ${blank(d.incidentDate, "yyyy-mm-dd")} and I lost approximately $${blank(d.amountUSD, "amount")} via ${PAYMENT_LABELS[input.payment]}. I am filing this report to obtain a case number for my bank dispute and federal complaints with the FBI's IC3 and the FTC.`,
    ``,
    `Brief summary of what happened:`,
    `${blank(d.narrative, "Two or three sentences. Keep it factual and short.")}`,
    ``,
    `Scammer identifiers I can provide:`,
    `  Name or alias: ${blank(d.scammerName, "unknown")}`,
    `  Contact: ${blank(d.scammerContact, "phone / email / handle")}`,
    `  Receiving account: ${blank(d.scammerAccount, "account / wallet / handle")}`,
    ``,
    `What I need from this report:`,
    `  - A case number, in writing, that I can cite to my bank and federal agencies.`,
    `  - A copy of the filed report, by email if available.`,
    ``,
    `If the officer asks where to send a copy: ${blank(d.contactEmail, "your email")}.`,
    ``,
    `--`,
    `Add the case number into your incident-narrative file before filing any other channel — they all ask for it.`,
  ].join("\n");
}

export function cfpbPrefill(d: IncidentDetails, scamTypeId: ScamTypeId, input: TriageInput): string {
  return [
    `CFPB COMPLAINT — pre-fill draft`,
    `File only after the bank has denied your dispute or failed to respond within Regulation E timelines (10 business days for initial response, 45 days for resolution; 90 days for new accounts).`,
    ``,
    `Go to consumerfinance.gov/complaint. Use the values below.`,
    ``,
    `Product: Checking or savings account / Credit card (select per your account type)`,
    `Issue: Problem with a purchase or transfer — Was charged for something I did not buy / Other transaction problem`,
    ``,
    `What happened:`,
    `On ${blank(d.incidentDate, "yyyy-mm-dd")}, $${blank(d.amountUSD, "amount")} was transferred from my account ending ${blank(d.accountLast4, "xxxx")} at ${blank(d.bankName, "bank name")} to a scammer (${blank(d.scammerName, "alias")}) via ${PAYMENT_LABELS[input.payment]}. I filed a written dispute with the bank under Regulation E on [date you filed]. The bank's response: [denied / no response / partial response]. I am submitting this complaint because [Reg E violation — denied without sufficient investigation / missed 10-business-day provisional credit deadline / refused to provide documents I am entitled to under § 1005.11].`,
    ``,
    `Desired resolution:`,
    `Reversal of the disputed transaction(s) and provisional credit as required by Regulation E. Written explanation of the bank's investigation, including documents relied upon.`,
    ``,
    `Documents to attach:`,
    `  - Copy of your dispute letter to the bank`,
    `  - Bank's denial response`,
    `  - Police case number: ${blank(d.policeCaseNumber, "case number")}`,
    `  - IC3 complaint number: ${blank(d.ic3ReferenceNumber, "number")}`,
    `  - Incident narrative`,
    ``,
    `--`,
    `The CFPB routes your complaint to the bank with a 15-day response requirement and a 60-day final-response requirement. Bank denials of Reg E disputes — particularly authorized push payment fraud — are commonly reversed at this step.`,
  ].join("\n");
}
