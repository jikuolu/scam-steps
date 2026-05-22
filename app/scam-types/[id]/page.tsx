import Link from "next/link";
import { notFound } from "next/navigation";
import { SCAM_TYPES, type ScamTypeId } from "@/lib/scam-types";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { OfficialHelp } from "@/components/OfficialHelp";
import { CallsToMake } from "@/components/CallsToMake";
import { BankLookup } from "@/components/BankLookup";
import { ScamTypeTabs } from "@/components/ScamTypeTabs";

export function generateStaticParams() {
  return Object.keys(SCAM_TYPES).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = SCAM_TYPES[id as ScamTypeId];
  if (!t) return {};
  return {
    title: t.label,
    description: t.oneLine,
    alternates: { canonical: `/scam-types/${id}` },
  };
}

export default async function ScamTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = SCAM_TYPES[id as ScamTypeId];
  if (!t) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/scam-types" className="text-sm">← All scam types</Link>
      <h1 className="serif mt-3">{t.label}</h1>
      <p className="prose mt-3 text-lg" style={{ color: "var(--muted)" }}>{t.oneLine}</p>

      <div className="note-card mt-6">
        <div className="text-sm font-medium">Realistic recovery rate</div>
        <div className="mt-1 serif" style={{ fontSize: "1.5rem" }}>
          {t.recoveryBand.low}–{t.recoveryBand.high}%
        </div>
        <p className="prose mt-3 text-sm" style={{ marginBottom: 0 }}>{t.honestNote}</p>
      </div>

      <h2 className="serif mt-10">Do this first</h2>
      <p className="prose mt-2">{t.firstAction}</p>

      <div className="mt-8">
        <ScamTypeTabs
          calls={
            <>
              <CallsToMake scamType={t.id} />
              {t.id !== "crypto-external-wallet" && (
                <div className="mt-4">
                  <BankLookup />
                </div>
              )}
            </>
          }
          channels={
            <ol className="flex flex-col gap-3">
              {t.channels.map((channelId, i) => {
                const ch = CHANNELS[channelId as ChannelId];
                if (!ch) return null;
                return (
                  <li key={channelId} className="card">
                    <h3 className="serif" style={{ margin: 0 }}>
                      {i + 1}. {ch.label}
                    </h3>
                    <p className="prose mt-2">{ch.whatItDoes}</p>
                    <p className="prose">{ch.howToFile}</p>
                    <p className="prose text-sm" style={{ color: "var(--muted)", marginBottom: 0 }}>
                      Expected outcome: {ch.realisticOutcome}
                    </p>
                    {ch.url && (
                      <p className="prose text-sm mt-2" style={{ marginBottom: 0 }}>
                        <a className="underline-link" href={ch.url} target="_blank" rel="noopener noreferrer">{ch.url}</a>
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          }
        />
      </div>

      <div className="mt-10">
        <OfficialHelp compact />
      </div>

      <div className="mt-10 flex gap-3 flex-wrap">
        <Link href="/triage" className="btn-primary no-underline">
          Generate a filled plan for my case
        </Link>
        <Link href="/scam-types" className="btn-ghost no-underline">
          Browse other types
        </Link>
      </div>
    </div>
  );
}
