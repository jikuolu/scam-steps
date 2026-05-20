import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — free self-serve guide for scam victims`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — free self-serve guide for scam victims`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — free self-serve guide for scam victims`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header>
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="no-underline flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ width: "1.4rem", height: "1.4rem", flexShrink: 0 }}
              >
                <rect x="2" y="14" width="5" height="6" rx="0.6" fill="var(--accent)" opacity="0.35" />
                <rect x="9.5" y="9" width="5" height="11" rx="0.6" fill="var(--accent)" opacity="0.65" />
                <rect x="17" y="4" width="5" height="16" rx="0.6" fill="var(--accent)" />
              </svg>
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
        <Analytics />
        <SpeedInsights />
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
