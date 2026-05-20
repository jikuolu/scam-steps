# Scam Steps

A free guided workflow for US scam victims. Triage classifies the case; the
plan orders the filings; the templates pre-fill the paperwork. No accounts,
no payment, no tracking — every input stays in the browser.

This is the first Pain Solver project. See `../scam-resolution/CONTEXT.md` for
the project rationale and `../docs/playbook.md` for the build pattern this
follows.

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy

See [`DEPLOY.md`](./DEPLOY.md). Cloudflare for the domain, Vercel for
hosting, Search Console for indexing. ~30 minutes end-to-end.

## What's in this repo

```
scam-navigator/
├── app/
│   ├── page.tsx              # homepage
│   ├── triage/page.tsx       # 5-question interview
│   ├── plan/page.tsx         # generated recovery plan + filing templates
│   ├── scam-types/           # browseable list + per-type guides (SSG)
│   ├── about/page.tsx        # methodology, sources, privacy
│   └── globals.css
├── lib/
│   ├── triage.ts             # input types + classification logic
│   ├── scam-types.ts         # 12 categories, recovery-rate bands, channels
│   ├── channels.ts           # reporting-channel data (bank, IC3, FTC, etc.)
│   ├── plan.ts               # generates ordered plan from classification
│   └── templates.ts          # filing-template generators
└── research/
    ├── scam-types.md         # recovery-rate sources and reasoning
    └── recovery-channels.md  # per-channel notes + priority-ordering rule
```

The two non-data files (`plan.ts`, `templates.ts`) consume `scam-types.ts` and
`channels.ts` — to add a new scam type or update a recovery-rate band, edit
those and the rest follows.

## What it does

1. **Triage.** Five questions: what happened, payment method, contact channel,
   how long ago, approximate loss. Classifies to one of 12 scam types.
2. **Plan.** Generates an ordered list of filings — bank dispute, IC3, FTC,
   police, CFPB escalation, platform reports, credit freeze, exchange freeze —
   per type, with deadlines and rationales.
3. **Templates.** Pre-fills incident narrative, evidence checklist, Regulation
   E / Z bank-dispute letter, IC3 / FTC drafts, police report script, CFPB
   escalation. Each is a draft the user reviews and submits themselves.
4. **Honesty.** Realistic recovery-rate band shown per category, with the
   specific reason rates are low when they are. Active warnings for known
   follow-on scams (recovery-agent fraud, tech-support persistent access).

## What it deliberately does not do

- Promise recovery
- Submit anything on the user's behalf
- Collect user data — sessionStorage only, no analytics, no cookies, no API
- Cover international cases (US-only v1)
- Charge anything

## Open items before public launch

- Domain choice (`coagencylab.com/scam-navigator` subpath vs. dedicated domain)
- Legal review of bank-dispute letter and CFPB pre-fill language
- Annual review of recovery-rate bands against the latest FTC and IC3 reports
- Per-bank dispute-process specifics (Chase / BofA / Wells / Citi / Cap One)
- An honest user-test with someone who has been scammed in the last 12 months

## Methodology

See `app/about/page.tsx` and `research/scam-types.md`. The recovery-rate bands
combine FTC Consumer Sentinel, CFPB complaint outcomes, IC3 reports, and
published bank policies. They are population averages, not individual
predictions. Annual review cycle.

## Stack

Next.js 16 App Router, TypeScript strict, Tailwind v4, static generation
everywhere except the two interactive client pages (`/triage`, `/plan`). No
backend, no database, no runtime AI calls — every page is either statically
rendered or client-only. Hosts on Vercel free tier.
