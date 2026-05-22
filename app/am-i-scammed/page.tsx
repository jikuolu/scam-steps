import Link from "next/link";
import { OfficialHelp } from "@/components/OfficialHelp";

export const metadata = {
  title: "Not sure if you've been scammed?",
  description:
    "A plain-language checklist of the warning signs of a scam. If several apply to your situation, treat it as a scam — here's what to do next.",
  alternates: { canonical: "/am-i-scammed" },
};

interface FlagGroup {
  heading: string;
  intro: string;
  flags: string[];
}

const GROUPS: FlagGroup[] = [
  {
    heading: "How they reached you",
    intro: "Most scams start with contact you didn't ask for.",
    flags: [
      "They contacted you first — a call, text, email, social media message, or a pop-up on your screen — and you hadn't reached out to them.",
      "The caller ID or email address looks almost right but slightly off, or the message came from a number you don't recognize.",
      "A pop-up or warning on your computer told you to call a phone number.",
      "Someone you only met online — never in person — eventually brought up money.",
    ],
  },
  {
    heading: "What they're asking for",
    intro:
      "The form of payment is the clearest single tell. Real businesses and agencies do not ask to be paid these ways.",
    flags: [
      "They asked you to pay with gift cards — buying cards and reading the numbers over the phone.",
      "They asked you to pay by cryptocurrency, or to deposit cash into a crypto ATM.",
      "They asked you to wire money, or to send money through Zelle, Venmo, or Cash App to someone you don't know in person.",
      "They asked for your bank login, card numbers, Social Security number, or a verification code that was texted to you.",
      "They asked for remote access to your computer or phone.",
    ],
  },
  {
    heading: "How they're pressuring you",
    intro:
      "Scams rely on rushing you past your own judgment. Real institutions give you time.",
    flags: [
      "They said you must act now — within minutes or hours — or something bad will happen.",
      "They threatened you: arrest, deportation, a lawsuit, losing your account, or your benefits being cut off.",
      "They told you to keep it secret — not to tell your family, your bank, or the police.",
      "They stayed on the phone with you and didn't want you to hang up.",
    ],
  },
  {
    heading: "The story they told",
    intro: "Scam stories follow a small number of familiar shapes.",
    flags: [
      "You were told you won a prize, a lottery, or a sweepstakes you don't remember entering — but you have to pay a fee or tax to collect it.",
      "You were offered an investment with unusually high or guaranteed returns.",
      "You were told you owe money — taxes, a debt, a fine — that you don't recognize.",
      "You were told there was a problem with an account, a package, or a payment, and you needed to confirm your details to fix it.",
      "You were sent or 'accidentally' overpaid money, and asked to send some of it back.",
      "A message claimed to be from a relative or friend in sudden trouble, needing money fast.",
    ],
  },
  {
    heading: "Who they claimed to be",
    intro:
      "Scammers impersonate trusted institutions because it lowers your guard. Knowing what these institutions actually do helps.",
    flags: [
      "They claimed to be from a government agency — IRS, Social Security, Medicare, police, immigration — and demanded payment. Government agencies do not call demanding payment or threatening arrest.",
      "They claimed to be your bank's fraud department and asked you to move money to a 'safe account.' Banks never ask you to move your own money to protect it.",
      "They claimed to be tech support — Microsoft, Apple, your internet provider — and said your device was infected.",
      "They claimed to be a company you know, but contacted you through a channel that company doesn't normally use.",
    ],
  },
];

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

      <div className="mt-8 flex flex-col gap-5">
        {GROUPS.map((g) => (
          <section key={g.heading} className="card">
            <h2 className="serif" style={{ margin: 0, fontSize: "1.3rem" }}>
              {g.heading}
            </h2>
            <p className="prose mt-1 text-sm" style={{ color: "var(--muted)" }}>
              {g.intro}
            </p>
            <ul className="prose mt-3" style={{ marginBottom: 0 }}>
              {g.flags.map((f, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        ))}
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
