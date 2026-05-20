"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  classify,
  PATTERN_LABELS,
  PAYMENT_LABELS,
  CONTACT_LABELS,
  type TriageInput,
} from "@/lib/triage";
import { generatePlan, type RecoveryPlan, type TemplateId } from "@/lib/plan";
import { SCAM_TYPES } from "@/lib/scam-types";
import { OfficialHelp } from "@/components/OfficialHelp";
import { CallsToMake } from "@/components/CallsToMake";
import { BankLookup } from "@/components/BankLookup";
import {
  EMPTY_INCIDENT,
  incidentNarrative,
  evidenceList,
  bankDisputeLetter,
  ic3Prefill,
  ftcPrefill,
  policeReportScript,
  cfpbPrefill,
  type IncidentDetails,
} from "@/lib/templates";

const URGENCY_LABEL: Record<string, string> = {
  now: "Now",
  today: "Today",
  "this-week": "This week",
  "this-month": "After bank denial",
};
const URGENCY_CLASS: Record<string, string> = {
  now: "tag tag-now",
  today: "tag tag-today",
  "this-week": "tag tag-week",
  "this-month": "tag tag-month",
};

const TEMPLATE_LABELS: Record<TemplateId, string> = {
  "incident-narrative": "Incident narrative",
  "evidence-list": "Evidence checklist",
  "bank-dispute-letter": "Bank dispute letter (Reg E / Reg Z)",
  "ic3-prefill": "IC3 (FBI) pre-fill",
  "ftc-prefill": "FTC ReportFraud pre-fill",
  "police-report-script": "Police report script",
  "cfpb-prefill": "CFPB escalation pre-fill",
};

export default function PlanPage() {
  const [input, setInput] = useState<TriageInput | null>(null);
  const [plan, setPlan] = useState<RecoveryPlan | null>(null);
  const [details, setDetails] = useState<IncidentDetails>(EMPTY_INCIDENT);
  const [active, setActive] = useState<TemplateId | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("scam-nav-triage");
    if (!raw) return;
    try {
      const parsed: TriageInput = JSON.parse(raw);
      setInput(parsed);
      const scamId = classify(parsed);
      setPlan(generatePlan(scamId, parsed));
    } catch {}
    const savedDetails = sessionStorage.getItem("scam-nav-details");
    if (savedDetails) {
      try {
        setDetails(JSON.parse(savedDetails));
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("scam-nav-details", JSON.stringify(details));
  }, [details]);

  if (!input || !plan) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="serif">No triage data found</h1>
        <p className="prose mt-3">
          The plan is generated from your triage answers, which stay in this
          browser tab.{" "}
          <Link href="/triage">Start the triage</Link> to generate a plan.
        </p>
      </div>
    );
  }

  const type = SCAM_TYPES[plan.scamType];
  const generated = active ? renderTemplate(active, details, plan.scamType, input) : "";
  const templateText = edited ? editedText : generated;

  function openTemplate(t: TemplateId) {
    setActive(t);
    setEdited(false);
    setEditedText("");
  }

  function downloadTemplate() {
    if (!active) return;
    const blob = new Blob([templateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Classified as
          </div>
          <h1 className="serif mt-1">{type.label}</h1>
          <p className="prose mt-3 text-lg" style={{ color: "var(--muted)" }}>
            {type.oneLine}
          </p>

          <div className="mt-5 note-card">
            <div className="text-sm font-medium">Realistic recovery rate for this category</div>
            <div className="mt-1 serif" style={{ fontSize: "1.5rem" }}>
              {plan.recoveryBand.low}–{plan.recoveryBand.high}%
            </div>
            <p className="prose mt-3 text-sm" style={{ marginBottom: 0 }}>{plan.honestNote}</p>
          </div>

          {plan.warnings.map((w, i) => (
            <div key={i} className="warn-card mt-4">
              <div className="text-sm font-medium">Important</div>
              <p className="prose mt-1 text-sm" style={{ marginBottom: 0 }}>{w}</p>
            </div>
          ))}

          <h2 className="serif mt-10">Do this first</h2>
          <p className="prose mt-2">{plan.firstAction}</p>

          <div className="mt-6">
            <CallsToMake scamType={plan.scamType} />
          </div>

          {showsBank(plan.scamType) && (
            <div className="mt-4">
              <BankLookup />
            </div>
          )}

          <h2 className="serif mt-10">Ordered plan</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {plan.steps.map((step) => (
              <li key={`${step.order}-${step.channel}`} className="card">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="serif" style={{ margin: 0 }}>
                    {step.order + 1}. {step.title}
                  </h3>
                  <span className={URGENCY_CLASS[step.urgency]}>{URGENCY_LABEL[step.urgency]}</span>
                </div>
                {step.deadline && (
                  <div className="mt-1 text-sm" style={{ color: "var(--warn)" }}>
                    {step.deadline}
                  </div>
                )}
                <p className="prose mt-2 text-sm">
                  <strong>Why this step:</strong> {step.rationale}
                </p>
                <p className="prose text-sm">
                  <strong>How to file:</strong> {step.whatToDo}
                </p>
                <p className="prose text-sm" style={{ color: "var(--muted)", marginBottom: 0 }}>
                  <strong>What to expect:</strong> {step.expectedOutcome}
                </p>
              </li>
            ))}
          </ol>

          <h2 className="serif mt-12">Filing templates</h2>
          <p className="prose mt-2">
            Fill in your details once below — they populate every template.
            Templates are drafts. Read them, edit for accuracy, and send them
            yourself.
          </p>

          <div className="card mt-4">
            <h3 className="serif" style={{ margin: 0 }}>Your details</h3>
            <p className="prose mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Stays in your browser. Not sent anywhere.
            </p>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <Field label="Your full name" value={details.fullName} onChange={(v) => setDetails({ ...details, fullName: v })} />
              <Field label="Email" value={details.contactEmail} onChange={(v) => setDetails({ ...details, contactEmail: v })} />
              <Field label="Phone" value={details.contactPhone} onChange={(v) => setDetails({ ...details, contactPhone: v })} />
              <Field label="Mailing address" value={details.address} onChange={(v) => setDetails({ ...details, address: v })} />
              <Field label="Incident date (yyyy-mm-dd)" value={details.incidentDate} onChange={(v) => setDetails({ ...details, incidentDate: v })} />
              <Field label="Discovered date" value={details.discoveredDate} onChange={(v) => setDetails({ ...details, discoveredDate: v })} />
              <Field label="Amount lost (USD)" value={details.amountUSD} onChange={(v) => setDetails({ ...details, amountUSD: v })} />
              <Field label="Sending bank" value={details.bankName} onChange={(v) => setDetails({ ...details, bankName: v })} />
              <Field label="Account last 4" value={details.accountLast4} onChange={(v) => setDetails({ ...details, accountLast4: v })} />
              <Field label="Transaction ID / wire ref / tx hash" value={details.transactionId} onChange={(v) => setDetails({ ...details, transactionId: v })} />
              <Field label="Scammer name or alias" value={details.scammerName} onChange={(v) => setDetails({ ...details, scammerName: v })} />
              <Field label="Scammer contact (phone, email, handle)" value={details.scammerContact} onChange={(v) => setDetails({ ...details, scammerContact: v })} />
              <Field label="Scammer receiving account" value={details.scammerAccount} onChange={(v) => setDetails({ ...details, scammerAccount: v })} />
              <Field label="Police case number (if filed)" value={details.policeCaseNumber} onChange={(v) => setDetails({ ...details, policeCaseNumber: v })} />
              <Field label="IC3 complaint number (if filed)" value={details.ic3ReferenceNumber} onChange={(v) => setDetails({ ...details, ic3ReferenceNumber: v })} />
            </div>
            <div className="mt-3">
              <label className="text-sm" style={{ color: "var(--muted)" }}>
                What happened — chronological account, in your own words
              </label>
              <textarea
                rows={6}
                value={details.narrative}
                onChange={(e) => setDetails({ ...details, narrative: e.target.value })}
                placeholder="Start with how the scammer first contacted you. Include dates, amounts, and what was said. Stick to facts."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {plan.templates.map((t) => (
              <button
                key={t}
                className={active === t ? "btn-primary" : "btn-ghost"}
                onClick={() => openTemplate(t)}
              >
                {TEMPLATE_LABELS[t]}
              </button>
            ))}
          </div>

          {active && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <h3 className="serif" style={{ margin: 0 }}>
                  {TEMPLATE_LABELS[active]}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      setEdited(false);
                      setEditedText("");
                    }}
                    disabled={!edited}
                    title="Discard your edits and regenerate from the details form above"
                  >
                    Reset to generated
                  </button>
                  <button className="btn-ghost" onClick={() => navigator.clipboard.writeText(templateText)}>
                    Copy
                  </button>
                  <button className="btn-primary" onClick={downloadTemplate}>
                    Download .txt
                  </button>
                </div>
              </div>
              <p className="prose text-sm" style={{ color: "var(--muted)" }}>
                Editable. Read it, fix anything inaccurate, then download or
                copy. {edited && <em>Edited — your changes are kept until you reset.</em>}
              </p>
              <textarea
                value={templateText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                  setEdited(true);
                }}
                rows={26}
                className="mono"
                style={{ fontSize: "0.85rem", lineHeight: 1.5 }}
              />
            </div>
          )}
        </div>

        <aside className="text-sm" style={{ color: "var(--muted)" }}>
          <div className="card" style={{ padding: "1rem 1.25rem" }}>
            <div className="font-medium" style={{ color: "var(--foreground)" }}>Your answers</div>
            <dl className="mt-2 grid gap-y-1" style={{ gridTemplateColumns: "auto 1fr", columnGap: "0.5rem" }}>
              <dt style={{ color: "var(--muted)" }}>What happened:</dt>
              <dd style={{ color: "var(--foreground)" }}>{PATTERN_LABELS[input.pattern]}</dd>
              <dt style={{ color: "var(--muted)" }}>Payment:</dt>
              <dd style={{ color: "var(--foreground)" }}>{PAYMENT_LABELS[input.payment]}</dd>
              <dt style={{ color: "var(--muted)" }}>Contact:</dt>
              <dd style={{ color: "var(--foreground)" }}>{CONTACT_LABELS[input.contact]}</dd>
              <dt style={{ color: "var(--muted)" }}>Hours since:</dt>
              <dd style={{ color: "var(--foreground)" }}>{input.hoursSinceIncident}</dd>
              <dt style={{ color: "var(--muted)" }}>Approx loss:</dt>
              <dd style={{ color: "var(--foreground)" }}>
                ${input.approxLossUSD.toLocaleString("en-US")}
              </dd>
            </dl>
            <Link href="/triage" className="btn-ghost mt-4 inline-block no-underline">
              Change my answers
            </Link>
          </div>

          <div className="mt-4">
            <p>
              Filing templates are drafts. Read them, edit them, and submit them
              through the channel's official website yourself.
            </p>
          </div>

          <div className="mt-6">
            <OfficialHelp compact />
          </div>
        </aside>
      </div>
    </div>
  );
}

function showsBank(scamTypeId: ReturnType<typeof classify>): boolean {
  // Show bank lookup whenever a bank-line call is part of the recommended sequence.
  // See CALLS_PER_TYPE in lib/calls.ts. crypto-external-wallet is the only one
  // without a bank-side call.
  return scamTypeId !== "crypto-external-wallet";
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm" style={{ color: "var(--muted)" }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function renderTemplate(
  id: TemplateId,
  d: IncidentDetails,
  scamTypeId: ReturnType<typeof classify>,
  input: TriageInput
): string {
  switch (id) {
    case "incident-narrative":
      return incidentNarrative(d, scamTypeId, input);
    case "evidence-list":
      return evidenceList();
    case "bank-dispute-letter":
      return bankDisputeLetter(d, scamTypeId, input);
    case "ic3-prefill":
      return ic3Prefill(d, scamTypeId, input);
    case "ftc-prefill":
      return ftcPrefill(d, scamTypeId, input);
    case "police-report-script":
      return policeReportScript(d, scamTypeId, input);
    case "cfpb-prefill":
      return cfpbPrefill(d, scamTypeId, input);
  }
}
