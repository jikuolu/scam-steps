import Link from "next/link";
import { WarningSigns } from "@/components/WarningSigns";

export const metadata = {
  title: "Is this a scam?",
  description:
    "Free, plain-language check for whether something is a scam — whether it's happening right now or you're checking after the fact. Five groups of warning signs. If several apply, treat it as a scam.",
  alternates: { canonical: "/am-i-scammed" },
  openGraph: {
    title: "Is this a scam? Quick checklist of the six biggest warning signs",
    description:
      "Six warning signs, in one card. If several apply, treat it as a scam. Free, no signup, from scamsteps.org.",
    images: [
      {
        url: "/api/scam-card",
        width: 1200,
        height: 630,
        alt: "Is this a scam? Quick checklist of six warning signs from scamsteps.org",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is this a scam? Quick checklist of the six biggest warning signs",
    description:
      "Six warning signs, in one card. If several apply, treat it as a scam.",
    images: ["/api/scam-card"],
  },
};

export default function AmIScammedPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="serif">Is this a scam?</h1>
      <p className="prose mt-4 home-lede">
        Whether something feels off right now or you're going back over what
        already happened — the warning signs are the same. Read the groups
        below. You don't need a perfect match; if several apply, treat it as
        a scam and act on that.
      </p>

      {/* Shareable risk card — primary on-page image for image-search ranking */}
      <figure className="mt-7" style={{ margin: "1.75rem 0 0" }}>
        <img
          src="/api/scam-card"
          alt="Is this a scam? Quick checklist of six warning signs from scamsteps.org — contacted you out of the blue, wants gift cards or crypto, pressuring you to act now, told you to keep it secret, claims to be IRS or your bank, asks for a password or remote access."
          width={1200}
          height={630}
          loading="eager"
          style={{
            width: "100%",
            height: "auto",
            border: "1px solid var(--rule)",
            borderRadius: 6,
            display: "block",
          }}
        />
        <figcaption
          className="text-sm mt-2"
          style={{ color: "var(--muted)", textAlign: "center" }}
        >
          Save this image and send it to anyone who might need it.
        </figcaption>
      </figure>

      <section
        className="mt-7"
        style={{
          border: "1px solid var(--warn)",
          background: "var(--warn-soft)",
          borderRadius: 4,
          padding: "0.95rem 1.15rem",
        }}
      >
        <p className="prose" style={{ margin: 0, color: "var(--warn)", fontWeight: 600 }}>
          Did they tell you to keep it secret?
        </p>
        <p className="prose mt-1 text-sm" style={{ margin: "0.35rem 0 0", color: "var(--foreground)" }}>
          That alone is enough. Real institutions never ask you to hide
          anything from your family, your bank, or the police. Tell someone
          you trust right now.
        </p>
      </section>

      <p className="prose mt-7 text-sm" style={{ color: "var(--muted)" }}>
        Five groups of warning signs, in plain language. Tap any heading to
        collapse a group you've already read.
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
