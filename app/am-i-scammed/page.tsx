import Link from "next/link";
import { OfficialHelp } from "@/components/OfficialHelp";
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
        <h2 className="serif">If you haven't paid or shared anything yet</h2>
        <p className="prose mt-2">
          Good — you may have caught this in time. Do this:
        </p>
        <ul className="prose">
          <li>
            <strong>Stop responding.</strong> End the call, stop replying.
            You do not owe them a conversation, an explanation, or a goodbye.
          </li>
          <li>
            <strong>Don't pay, and don't share anything more</strong> — no
            codes, no card numbers, no remote access — no matter what they
            threaten.
          </li>
          <li>
            <strong>Check independently.</strong> If they claimed to be your
            bank, a government agency, or a company, look up the real number
            yourself — on the back of your card, on a past statement, or on
            the agency's official website — and call that. Never use a number,
            link, or contact they gave you.
          </li>
          <li>
            <strong>Take your time.</strong> Real institutions will still be
            there in an hour. Anyone who can't survive you hanging up to
            verify is telling you what they are.
          </li>
        </ul>
        <p className="prose">
          If it turns out to be real, you've lost a few minutes. If it was a
          scam, you've lost nothing. That trade is always worth it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="serif">If you've already paid or shared information</h2>
        <p className="prose mt-2">
          Then the recovery steps matter, and timing matters — some of them
          have deadlines measured in hours. The guide will ask five short
          questions and give you an ordered plan: the calls to make first,
          the agencies and forms that apply, and editable drafts of every
          report.
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <Link href="/triage" className="btn-primary lg no-underline">
            Start — what to do now
          </Link>
          <Link href="/scam-types" className="btn-ghost lg no-underline">
            Recent common scams
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <OfficialHelp />
      </section>
    </div>
  );
}
