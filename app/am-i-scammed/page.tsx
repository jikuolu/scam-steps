import Link from "next/link";
import { WarningSigns } from "@/components/WarningSigns";

export const metadata = {
  title: "Not sure if you've been scammed?",
  description:
    "A plain-language checklist of the warning signs of a scam. If several apply to your situation, treat it as a scam — here's what to do next.",
  alternates: { canonical: "/am-i-scammed" },
};

export default function AmIScammedPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="serif">Not sure if you've been scammed?</h1>
      <p className="prose mt-4 home-lede">
        Being unsure is normal. Scams are built to look ordinary while
        they're happening — the doubt usually comes later. Read the warning
        signs below. You don't need a perfect match. If several of these
        describe your situation, treat it as a scam and act on that.
      </p>

      <p className="prose mt-6 text-sm" style={{ color: "var(--muted)" }}>
        Five groups of warning signs. Tap any one to see what's inside.
      </p>
      <div className="mt-3">
        <WarningSigns />
      </div>

      <section className="mt-10 warn-card">
        <h2 className="serif" style={{ marginTop: 0, fontSize: "1.3rem" }}>
          If several of these apply
        </h2>
        <p className="prose mt-2" style={{ marginBottom: 0 }}>
          Then this is almost certainly a scam. You do not need to be
          certain, and you do not need to confront the other person to find
          out. The safest move is to stop, step back, and check
          independently — the next steps depend on whether money or
          information has already left your hands.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="serif">If you haven't paid yet — do this now</h2>
        <ul className="prose mt-3">
          <li><strong>Stop responding.</strong> Hang up, stop replying. You don't owe them a goodbye.</li>
          <li><strong>Don't pay or share anything</strong> — no codes, card numbers, or remote access — whatever they threaten.</li>
          <li><strong>Verify yourself.</strong> Look up the real number — on your card, a statement, the official website — and call that. Never a number or link they gave you.</li>
          <li><strong>Take your time.</strong> Anyone who can't survive you hanging up to check is telling you what they are.</li>
        </ul>
      </section>

      <section className="mt-8 note-card">
        <p className="prose" style={{ margin: 0 }}>
          <strong>Already paid, or shared a code, password, or card number?</strong>{" "}
          Then this moves from prevention to recovery, and some steps have
          deadlines measured in hours.{" "}
          <Link href="/triage" className="underline-link">Start the recovery steps</Link>.
        </p>
      </section>
    </div>
  );
}
