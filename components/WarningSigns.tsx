"use client";

import { useState } from "react";

interface FlagGroup {
  heading: string;
  summary: string;
  color: string;
  tint: string;
  flags: string[];
}

const GROUPS: FlagGroup[] = [
  {
    heading: "How they reached you",
    summary: "Unsolicited contact — they came to you.",
    color: "#3f5a6d",
    tint: "#eef2f5",
    flags: [
      "They contacted you first — a call, text, email, or message you didn't ask for.",
      "The caller ID or email looks almost right, but slightly off.",
      "A pop-up on your screen told you to call a number.",
      "Someone you only know online eventually brought up money.",
    ],
  },
  {
    heading: "What they're asking for",
    summary: "The payment method is the clearest single tell.",
    color: "#8a3a2a",
    tint: "#f4e9e3",
    flags: [
      "They asked you to pay with gift cards.",
      "They asked you to pay with cryptocurrency, or at a crypto ATM.",
      "They asked you to wire money, or send it by Zelle, Venmo, or Cash App.",
      "They asked for your passwords, card numbers, SSN, or a texted code.",
      "They asked for remote access to your computer or phone.",
    ],
  },
  {
    heading: "How they're pressuring you",
    summary: "Rushing you past your own judgment.",
    color: "#8a6420",
    tint: "#f4eedd",
    flags: [
      "They said you must act right now, or something bad will happen.",
      "They threatened you — arrest, a lawsuit, losing your account or benefits.",
      "They told you to keep it secret from your family, your bank, or police.",
      "They stayed on the phone and didn't want you to hang up.",
    ],
  },
  {
    heading: "The story they told",
    summary: "A familiar shape — a prize, a debt, an emergency, a deal.",
    color: "#5f4a6e",
    tint: "#efeaf3",
    flags: [
      "You won a prize you don't remember entering — but must pay a fee to collect it.",
      "You were promised unusually high or guaranteed investment returns.",
      "You were told you owe money — a tax, a debt, a fine — that you don't recognize.",
      "You were told to confirm your details to fix an account, package, or payment problem.",
      "You were 'overpaid' and asked to send some of the money back.",
      "A message claimed a relative was in sudden trouble and needed money fast.",
    ],
  },
  {
    heading: "Who they claimed to be",
    summary: "Impersonating someone you'd already trust.",
    color: "#2a6a63",
    tint: "#e4f0ee",
    flags: [
      "A 'government agency' demanded payment or threatened arrest. Real agencies never do this.",
      "Your 'bank' asked you to move money to a 'safe account.' Banks never ask this.",
      "'Tech support' said your device was infected and needed fixing.",
      "A company you know contacted you in a way it normally doesn't.",
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.15s ease",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WarningSigns() {
  // Expanded by default — the in-the-moment user can't reliably find a
  // collapse toggle, and the per-group summaries aren't a substitute for
  // seeing the flags.
  const [open, setOpen] = useState<number[]>([0, 1, 2, 3, 4]);

  const toggle = (i: number) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  return (
    <div className="flex flex-col gap-3">
      {GROUPS.map((g, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={g.heading}
            style={{
              borderLeft: `4px solid ${g.color}`,
              borderRadius: 4,
              background: isOpen ? g.tint : "var(--paper)",
              border: `1px solid var(--rule)`,
              borderLeftWidth: 4,
              borderLeftColor: g.color,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.95rem 1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                textAlign: "left",
                fontFamily: "inherit",
                color: g.color,
              }}
            >
              <Chevron open={isOpen} />
              <span style={{ flex: 1 }}>
                <span
                  className="serif"
                  style={{ display: "block", fontSize: "1.18rem", fontWeight: 500 }}
                >
                  {g.heading}
                </span>
                <span
                  style={{ display: "block", fontSize: "0.92rem", color: "var(--muted)", marginTop: "0.1rem" }}
                >
                  {g.summary}
                </span>
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: g.color,
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                {g.flags.length} signs
              </span>
            </button>
            {isOpen && (
              <ul style={{ listStyle: "none", margin: 0, padding: "0 1.1rem 1rem 2.4rem" }}>
                {g.flags.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      padding: "0.45rem 0",
                      borderTop: j === 0 ? "none" : "1px solid var(--rule)",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: g.color, fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
