import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start the triage",
  description:
    "Five short questions about what happened. Your answers stay in this browser tab.",
  alternates: { canonical: "/triage" },
};

export default function TriageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
