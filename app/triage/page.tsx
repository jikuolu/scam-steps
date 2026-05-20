"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  PATTERN_LABELS,
  PAYMENT_LABELS,
  CONTACT_LABELS,
  type ScamPattern,
  type PaymentMethod,
  type ContactChannel,
  type TriageInput,
} from "@/lib/triage";

export default function TriagePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [pattern, setPattern] = useState<ScamPattern | "">("");
  const [payment, setPayment] = useState<PaymentMethod | "">("");
  const [contact, setContact] = useState<ContactChannel | "">("");
  const [hoursSinceIncident, setHours] = useState<string>("");
  const [approxLossUSD, setLoss] = useState<string>("");

  const steps = [
    {
      label: "What best describes what happened",
      valid: !!pattern,
      body: (
        <RadioGroup
          name="pattern"
          options={Object.entries(PATTERN_LABELS) as [ScamPattern, string][]}
          value={pattern}
          onChange={(v) => setPattern(v as ScamPattern)}
        />
      ),
    },
    {
      label: "How did the money move",
      valid: !!payment,
      body: (
        <RadioGroup
          name="payment"
          options={Object.entries(PAYMENT_LABELS) as [PaymentMethod, string][]}
          value={payment}
          onChange={(v) => setPayment(v as PaymentMethod)}
        />
      ),
    },
    {
      label: "How were you first contacted",
      valid: !!contact,
      body: (
        <RadioGroup
          name="contact"
          options={Object.entries(CONTACT_LABELS) as [ContactChannel, string][]}
          value={contact}
          onChange={(v) => setContact(v as ContactChannel)}
        />
      ),
    },
    {
      label: "When did this happen",
      valid: hoursSinceIncident !== "" && Number(hoursSinceIncident) >= 0,
      body: (
        <div>
          <p className="prose mb-3 text-sm" style={{ color: "var(--muted)" }}>
            Approximate hours since the most recent payment or since you
            discovered the loss. Used to determine which deadlines still apply.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {[
              ["Under 6 hours", 3],
              ["Today", 12],
              ["1–2 days", 36],
              ["3–7 days", 96],
              ["1–2 weeks", 240],
              ["2–4 weeks", 500],
              ["1–2 months", 1080],
              ["Over 2 months", 2000],
            ].map(([label, h]) => (
              <button
                key={label as string}
                type="button"
                className="btn-ghost"
                onClick={() => setHours(String(h))}
                style={{
                  background: Number(hoursSinceIncident) === h ? "var(--accent-soft)" : undefined,
                  borderColor: Number(hoursSinceIncident) === h ? "var(--accent)" : undefined,
                }}
              >
                {label as string}
              </button>
            ))}
          </div>
          <label className="text-sm" style={{ color: "var(--muted)" }}>
            Or enter exact hours
          </label>
          <input
            type="number"
            min={0}
            value={hoursSinceIncident}
            onChange={(e) => setHours(e.target.value)}
            placeholder="hours"
          />
        </div>
      ),
    },
    {
      label: "Approximate loss",
      valid: approxLossUSD !== "" && Number(approxLossUSD) >= 0,
      body: (
        <div>
          <p className="prose mb-3 text-sm" style={{ color: "var(--muted)" }}>
            Rounded USD. Used only to flag the $50,000-international threshold
            that unlocks the FBI's Financial Fraud Kill Chain on wire fraud.
            Not stored.
          </p>
          <input
            type="number"
            min={0}
            value={approxLossUSD}
            onChange={(e) => setLoss(e.target.value)}
            placeholder="amount in USD"
          />
        </div>
      ),
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  function submit() {
    const input: TriageInput = {
      pattern: pattern as ScamPattern,
      payment: payment as PaymentMethod,
      contact: contact as ContactChannel,
      hoursSinceIncident: Number(hoursSinceIncident),
      approxLossUSD: Number(approxLossUSD),
    };
    sessionStorage.setItem("scam-nav-triage", JSON.stringify(input));
    router.push("/plan");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="prose" style={{ color: "var(--foreground)" }}>
        Your answers stay in this browser tab. Nothing is sent anywhere.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-2" aria-label={`Step ${step + 1} of ${steps.length}`}>
          {steps.map((_, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <span
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: isActive || isDone ? "var(--accent)" : "var(--rule)",
                  opacity: isDone ? 0.45 : 1,
                  display: "inline-block",
                }}
              />
            );
          })}
        </div>
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          Step {step + 1} of {steps.length}
        </span>
      </div>

      <h1 className="serif mt-4">{current.label}</h1>
      <div className="mt-6">{current.body}</div>

      <div className="mt-8 flex justify-between">
        <button
          className="btn-ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        {isLast ? (
          <button className="btn-primary" disabled={!current.valid} onClick={submit}>
            See what to do
          </button>
        ) : (
          <button
            className="btn-primary"
            disabled={!current.valid}
            onClick={() => setStep((s) => s + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function RadioGroup<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: [T, string][];
  value: string;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map(([v, label]) => (
        <label
          key={v}
          className="flex items-start gap-3 card cursor-pointer"
          style={{
            padding: "0.75rem 1rem",
            background: value === v ? "var(--accent-soft)" : "var(--paper)",
            borderColor: value === v ? "var(--accent)" : "var(--rule)",
          }}
        >
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            style={{ width: "auto", marginTop: "0.3rem" }}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
