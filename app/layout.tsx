import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Scam Steps — free self-serve guide for scam victims",
  description:
    "Free, self-serve guide for US scam victims. Five questions, an ordered plan, the calls to make first, and editable filing-template drafts. No accounts, no payment, no data stored. Not a paid consultation service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header>
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="no-underline flex items-baseline gap-2">
              <span className="serif wordmark">Scam Steps</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>US, beta</span>
            </Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/triage">Start</Link>
              <Link href="/scam-types">All types</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t rule mt-16">
          <div className="max-w-5xl mx-auto px-6 py-8 text-sm" style={{ color: "var(--muted)" }}>
            <p className="prose">
              Free self-serve reference. No accounts, tracking, payment, or consultation.
              Not a paid service and not affiliated with any.
            </p>
            <p className="prose">
              Templates are drafts; you submit them yourself. This site does not contact
              any agency on your behalf. Not legal advice — for losses over approximately
              $10,000 or where civil action is being considered, consult a
              consumer-protection attorney.
            </p>
            <p className="mt-2">
              <Link href="/about">About the methodology and sources.</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
