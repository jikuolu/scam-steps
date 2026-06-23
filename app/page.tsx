import type { Metadata } from "next";
import Link from "next/link";
import { OfficialHelp } from "@/components/OfficialHelp";

export const metadata: Metadata = {
  title: "Is this a scam? Free check + recovery steps",
  description:
    "Free, self-serve guide for US scams. Check the warning signs in seconds, or start the recovery steps if money or information has already left your hands. No signup, no payment, nothing stored.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-6 pb-14">
      <section
        className="mb-10"
        style={{
          border: "1px solid var(--warn)",
          background: "var(--warn-soft)",
          borderRadius: 4,
          padding: "0.85rem 1.1rem",
        }}
      >
        <p className="prose" style={{ margin: 0, color: "var(--warn)", fontWeight: 500 }}>
          On a call right now with someone pressuring you? Hang up. You're
          allowed to.
        </p>
        <p className="prose mt-1 text-sm" style={{ margin: "0.35rem 0 0", color: "var(--foreground)" }}>
          Real police, banks, the IRS, Medicare, and Microsoft never call like
          this. Hanging up is safe. You can always call them back at a number
          you trust.
        </p>
      </section>

      <section className="text-center flex flex-col items-center">
        <h1 className="serif home-title">
          Is this a scam? Or did one already happen?
        </h1>
        <div className="prose home-lede mt-5 flex flex-col items-center" style={{ textAlign: "center" }}>
          <p>Take a breath. We'll help you figure it out — and what to do next.</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 w-full">
          <Link
            href="/am-i-scammed"
            className="btn-primary lg"
            style={{ width: "100%", maxWidth: "26rem", textAlign: "center", padding: "1.1rem 1.5rem", fontSize: "1.15rem" }}
          >
            Check if it's a scam
          </Link>
          <p style={{ fontSize: "1.02rem", margin: "0.3rem 0 0" }}>
            Already paid or shared information?{" "}
            <Link href="/triage" className="underline-link">
              Start the recovery steps
            </Link>
          </p>
          <p style={{ fontSize: "0.96rem", color: "var(--muted)", margin: "0.2rem 0 0" }}>
            Or{" "}
            <Link href="/cards" className="underline-link">
              browse all 12 action cards
            </Link>
          </p>
        </div>
      </section>

      <section className="mt-12 note-card">
        <h3 className="serif" style={{ marginTop: 0 }}>
          Free, self-serve, not a commercial service
        </h3>
        <p className="prose mt-2" style={{ marginBottom: 0 }}>
          A free public guide — no signup, no payment, no appointment.
          Whatever you type stays in this browser tab; close it and it's
          gone. Not a consultation service, and not affiliated with any.
        </p>
      </section>

      <section className="mt-8 warn-card">
        <h3 className="serif" style={{ marginTop: 0 }}>
          One warning before you go any further
        </h3>
        <p className="prose mt-2" style={{ marginBottom: 0 }}>
          If someone you didn't already know contacts you offering to recover
          the money — a "recovery agent," a "blockchain investigator," an
          "FBI compliance officer" — they are themselves running a scam.
          Recovery scammers find their targets by buying lists of confirmed
          victims. Block them. The plan below uses only official, free
          channels, and no real recovery channel will message you privately
          offering help.
        </p>
      </section>

      <section className="mt-12">
        <OfficialHelp />
      </section>
    </div>
  );
}
