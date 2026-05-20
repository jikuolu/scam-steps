// Plan generation. Given a classified scam type + triage details, produce an
// ordered action list with deadlines and per-step framing.

import { SCAM_TYPES, type ScamTypeId } from "./scam-types";
import { CHANNELS, type ChannelId } from "./channels";
import type { TriageInput } from "./triage";

export interface PlanStep {
  order: number;
  channel: ChannelId;
  title: string;
  urgency: "now" | "today" | "this-week" | "this-month";
  deadline?: string; // human-readable
  rationale: string;
  whatToDo: string;
  expectedOutcome: string;
}

export interface RecoveryPlan {
  scamType: ScamTypeId;
  recoveryBand: { low: number; high: number };
  honestNote: string;
  firstAction: string;
  steps: PlanStep[];
  // Categories whose generated filing templates are worth offering.
  templates: TemplateId[];
  warnings: string[];
}

export type TemplateId =
  | "incident-narrative"
  | "evidence-list"
  | "bank-dispute-letter"
  | "ic3-prefill"
  | "ftc-prefill"
  | "police-report-script"
  | "cfpb-prefill";

function urgencyFor(channel: ChannelId, hoursSinceIncident: number, criticalHours: number | null): PlanStep["urgency"] {
  if (channel === "bank-dispute" || channel === "exchange-report") {
    if (hoursSinceIncident < 48) return "now";
    return "today";
  }
  if (channel === "credit-bureaus") return "now";
  if (channel === "police-report") return "today";
  if (channel === "ic3" || channel === "ftc-reportfraud" || channel === "identitytheft-gov") {
    return criticalHours && hoursSinceIncident < criticalHours ? "today" : "this-week";
  }
  if (channel === "platform-report") return "today";
  if (channel === "cfpb") return "this-month";
  return "this-week";
}

function deadlineFor(channel: ChannelId, scamType: ScamTypeId, hoursSince: number): string | undefined {
  if (channel === "bank-dispute") {
    if (scamType === "card-unauthorized") {
      const hoursLeft = Math.max(0, 60 * 24 - hoursSince);
      return `Regulation E / Z window: ${Math.floor(hoursLeft / 24)} days remaining of the 60-day filing window`;
    }
    if (scamType === "wire-transfer") return "Wire-recall window: 24–48 hours from initiation";
    if (scamType === "crypto-exchange-held") return "Exchange-freeze window: hours, not days";
  }
  if (channel === "exchange-report") return "Within 24 hours — freeze window is short";
  return undefined;
}

export function generatePlan(scamTypeId: ScamTypeId, input: TriageInput): RecoveryPlan {
  const type = SCAM_TYPES[scamTypeId];
  const steps: PlanStep[] = [];

  type.channels.forEach((channelId, idx) => {
    const channel = CHANNELS[channelId as ChannelId];
    if (!channel) return;
    steps.push({
      order: idx + 1,
      channel: channel.id,
      title: channel.label,
      urgency: urgencyFor(channel.id, input.hoursSinceIncident, type.criticalWindowHours),
      deadline: deadlineFor(channel.id, scamTypeId, input.hoursSinceIncident),
      rationale: channel.whatItDoes,
      whatToDo: channel.howToFile,
      expectedOutcome: channel.realisticOutcome,
    });
  });

  // Identity-theft special-case: insert credit freeze high in the order.
  if (scamTypeId === "identity-theft" && !type.channels.includes("credit-bureaus")) {
    const freeze = CHANNELS["credit-bureaus"];
    steps.unshift({
      order: 0,
      channel: "credit-bureaus",
      title: freeze.label,
      urgency: "now",
      rationale: freeze.whatItDoes,
      whatToDo: freeze.howToFile,
      expectedOutcome: freeze.realisticOutcome,
    });
  }

  const templates: TemplateId[] = ["incident-narrative", "evidence-list"];
  if (type.channels.includes("bank-dispute")) templates.push("bank-dispute-letter");
  if (type.channels.includes("ic3")) templates.push("ic3-prefill");
  if (type.channels.includes("ftc-reportfraud")) templates.push("ftc-prefill");
  if (type.channels.includes("police-report")) templates.push("police-report-script");
  if (type.channels.includes("cfpb")) templates.push("cfpb-prefill");

  const warnings: string[] = [];
  if (scamTypeId === "crypto-external-wallet" || scamTypeId === "romance" || scamTypeId === "investment-pig-butchering") {
    warnings.push(
      "You are now on the lists that recovery scammers buy. In the coming weeks, expect strangers to reach out — by phone, email, social media, or text — claiming to be FBI agents, blockchain investigators, lawyers from a class action, or 'compliance officers' who can get your money back. Every one of them is running a follow-on scam. The pattern: an upfront fee, then a 'tax,' then a 'cooperation payment' — each one promising release of recovered funds that never come. Block them, do not engage, do not pay. Legitimate recovery only happens through the channels in this plan."
    );
  }
  if (scamTypeId === "tech-support-remote-access") {
    warnings.push(
      "Treat the device as compromised. Change passwords from a different device, not the affected one. Uninstall any remote-access software (AnyDesk, TeamViewer, ScreenConnect, LogMeIn). Run a full malware scan. If banking sessions happened during the remote access, consider the device unsafe for financial use until cleaned by a trusted technician."
    );
  }
  if (input.payment === "gift-card") {
    warnings.push(
      "Gift card payments are effectively unrecoverable. The exception: if the card has not yet been redeemed, the issuer may freeze the balance — call the gift card brand's fraud line within hours. File the federal reports regardless, for documentation."
    );
  }

  return {
    scamType: scamTypeId,
    recoveryBand: type.recoveryBand,
    honestNote: type.honestNote,
    firstAction: type.firstAction,
    steps,
    templates,
    warnings,
  };
}
