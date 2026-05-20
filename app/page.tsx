import type { Metadata } from "next";
import Link from "next/link";
import { OfficialHelp } from "@/components/OfficialHelp";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-20 pb-14">
      <section className="text-center flex flex-col items-center">
        <h1 className="serif home-title">
          One step at a time. Here's what to do first.
        </h1>
        <div className="prose home-lede mt-7 flex flex-col items-center" style={{ textAlign: "center" }}>
          <p>
            Five short questions about what happened. Then you get the calls
            to make first — your bank, the right hotline, the right agency,
            in the right order.
          </p>
          <p>
            And a generated draft you can use for the official reports and
            communications that follow.
          </p>
        </div>

        <div className="mt-9 flex gap-3 flex-wrap justify-center">
          <Link href="/triage" className="btn-primary lg">
            Start — 2 minutes
          </Link>
          <Link href="/scam-types" className="btn-ghost lg">
            Or browse by scam type
          </Link>
        </div>

        <ol
          className="mt-10 text-left flex flex-col gap-3 mx-auto"
          style={{ maxWidth: "36rem", listStyle: "none", paddingLeft: 0 }}
        >
          {[
            "Answer five short questions about what happened.",
            "See an ordered plan — calls to make first, then the agencies and forms that apply to your case, with the deadlines that matter.",
            "Get editable drafts of every report you'll need to file — bank dispute, police, FBI IC3, FTC, and more. Copy, edit, send them yourself.",
          ].map((text, i) => (
            <li key={i} className="flex gap-3" style={{ fontSize: "1.02rem", lineHeight: 1.5 }}>
              <span
                style={{ color: "var(--accent)", fontWeight: 600, minWidth: "1.25rem", flexShrink: 0 }}
              >
                {i + 1}.
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 note-card">
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
