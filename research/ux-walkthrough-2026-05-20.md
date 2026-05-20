# Scam Steps — UX walkthrough 2026-05-20

Walkthrough done in the parent session (the API was overloaded when an
independent agent was attempted twice; noted as a bias caveat). Walked all
seven user-facing routes at 1280×900, with senior accessibility in mind.

## Executive summary

The site holds together. Tone is right, hierarchy works, and the calls /
templates / channels structure gives a victim something to do at every
scroll position. Three things are off and worth fixing before public
launch: (1) raw scam-type IDs leak in the plan-page sidebar where a user
can read them; (2) the homepage is too short on desktop, making the bottom
disclaimers feel like the actual conclusion; (3) several "Why this step"
and "What to expect" labels on the plan page repeat the same word patterns
across every step, which makes the section read as filler.

---

## P0 — fix before public launch

### P0-1. Raw internal IDs leak to the user on the plan page

On `/plan`, the right sidebar shows:

> Pattern: impersonation-bank-gov
> Payment: wire
> Contact: phone-call
> Hours since: 36
> Approx loss: $25000

These are internal classifier keys. A user — especially a senior — sees
`impersonation-bank-gov` and has no idea what that means; if they were
expecting government-impersonation language, they get a hyphenated slug
instead. The source is `app/plan/page.tsx` around the `<aside>` block
where it renders `input.pattern`, `input.payment`, etc. directly.

**Fix**: render the labels from `PATTERN_LABELS`, `PAYMENT_LABELS`,
`CONTACT_LABELS` (already exported from `lib/triage.ts`). One-line change
per field.

### P0-2. The "Re-run triage" link in the sidebar is small and plain-styled

Same aside block. The user finishes triage, sees their classification, may
realize they picked the wrong option (very common — "tech support" vs
"government impersonation" overlap is real). The recovery is "Re-run
triage" rendered as a small `text-sm` link with no affordance. For a senior
correcting a mistake under stress, this should be a visible button, not a
secondary footnote.

**Fix**: promote to a `.btn-ghost` element. Keep the smaller font size if
needed but give it a border so it reads as clickable.

### P0-3. "Approx loss: $25000" without comma formatting

Same aside. Reads as a programming-string. Should be `$25,000`. Trivial
intl format change. Same applies to the recovery-rate band display where
percentages appear without "%" spacing in a few spots — minor but worth a
sweep.

---

## P1 — important, fix in the next pass

### P1-1. The homepage feels short on desktop

At 1280×900 the homepage above-the-fold is the title + lede + buttons,
and one scroll shows the "Free, self-serve" panel and the warning. The
warning is the last thing the user reads. There is no closer, no "what
happens after I click Start," no preview of the plan structure. A scam
victim debating whether to start needs to feel that there's substance
behind the button.

**Concrete suggestion**: add a small block between the buttons and the
"Free, self-serve" panel that shows a 3-step preview — *"1. Answer five
questions. 2. See your ordered plan and the calls to make first. 3. Get
editable drafts of every report to file."* — with no decorative styling,
just numbered text. Replaces the three-card block we removed earlier, but
flatter and shorter.

### P1-2. The plan page's "Why this step / How to file / What to expect" labels read as filler

Every channel step has all three labels even when the content under "Why
this step" is a single sentence that overlaps with "What to expect." Five
steps × three labels = 15 small headings the user has to scan. Quote from
`app/plan/page.tsx` rendering loop — the `<strong>Why this step:</strong>`
patterns repeat for every step.

**Fix options**:
- Drop "Why this step" entirely; the rationale should be part of the step
  title or the first sentence of "How to file."
- Or render the three blocks as a small definition list `<dl>` so they
  visually distinguish themselves, instead of three identical inline
  `<strong>` patterns.

### P1-3. The bank lookup list shows all 15 banks by default

`components/BankLookup.tsx`. On first paint, all 15 banks render. That's
fine, but for someone arriving at the plan page in shock the list is
visually heavy — a wall of names is overwhelming. A senior may not realize
the input above it is a filter; they may scroll past or feel they have to
read all 15.

**Fix**: show 5 most-common banks by default, with a "Show all 15" toggle
or "Type your bank name to filter from 15 supported banks" hint. Keep the
fallback note about searching for unlisted banks.

### P1-4. The triage progress indicator is muted

The triage page shows "Step 1 of 5" in muted text at the top. For users
who need to know how much further they have to go (anxiety + ADHD-shaped
attention spans + senior visual scan), this should be a more visible
indicator. A simple `▮▮▮▯▯` dot pattern or a progress bar would help.
Currently the eye lands on the H1 first, the progress text second.

**Fix**: visual progress indicator next to or below the H1.

### P1-5. The warning card under triage step 1 ("Nothing on this page is sent anywhere…") is in muted gray, easy to miss

`app/triage/page.tsx`. The privacy reassurance is a P1 trust signal but
sits in `var(--muted)` at the very bottom of the form, smaller than the
form labels. The exact people who most need this reassurance (seniors and
the recently scammed) will skim past it.

**Fix**: bump to body color and slightly emphasize ("Your answers stay in
this browser tab — nothing is sent anywhere"). Consider repeating at the
top, not just the bottom, on step 1.

---

## P2 — small polish

### P2-1. Inconsistent serif use in headings

`h4` is set to serif in `globals.css`, but in some plan-page contexts
(`<h4>` inside `CallsToMake.tsx`) the heading reads at the same visual
weight as the body and gets lost. Either bump h4 further or change the
component to use h3.

### P2-2. "Wire recall: 24–48 hours from initiation" deadline string is unclear

In `lib/plan.ts` the `deadlineFor` function returns plain text strings like
"Wire-recall window: 24–48 hours from initiation" — but the user doesn't
have a clock attached. Better: show how much time *they have remaining*
based on `hoursSinceIncident`. Example: "Wire-recall window: ~12 hours
remaining."

### P2-3. "Generate plan" button vs "Start — 2 minutes"

The homepage button says "Start — 2 minutes." Good — sets expectation. The
triage page's final "Generate plan" button is more abstract. Could be
"Show my plan" or "See what to do." Smaller deal but worth a pass.

### P2-4. The footer disclaimer is dense

```
Free self-serve reference. No accounts, no tracking, no payment, no paid
upgrade. Not a consultation service and not affiliated with any. All filing
templates are drafts you review and submit yourself — this site does not
contact any agency or institution on your behalf. Not legal advice; consult
a consumer-protection attorney for losses over approximately $10,000 or
where civil action is being considered.
```

Four claims stacked into one paragraph. Each is correct; together they
read as legal fine print. Consider two short paragraphs:
- "Free self-serve reference. No accounts, tracking, payment, or consultation."
- "Templates are drafts; you submit them yourself. Not legal advice; for losses over ~$10,000 or civil action, consult a consumer-protection attorney."

### P2-5. No visual indicator that templates are downloadable

When the user clicks a template button on the plan page, the textarea
appears. The "Download .txt" button is there but reads as one of three
peer buttons (Reset / Copy / Download). For a senior who hasn't used
similar tools, the Download button should be the primary visual emphasis
once they've opened a template.

### P2-6. The "About" page mentions data files

```
The data files driving this site live at lib/channels.ts and lib/scam-types.ts
```

This is methodology-honest but exposes implementation detail to a lay
reader. Either move to a separate "How this is maintained" subsection or
phrase it as "The data behind this site is open and updated annually."

---

## Voice and tone — what passes RULE 0

I checked for the writing-style.md failure modes: fabricated "I" voice,
aphoristic balance ("It's not X, it's Y"), hollow adjectives, transition
padding, self-justification. **The site largely passes.** Specific
observations:

- No fabricated "I" voice anywhere. Good.
- One "aphoristic balance" smell: "Five questions. A plan. Today." would
  have been a violation; the actual copy "*Five short questions about what
  happened. Then you get the calls to make first…*" avoids it.
- No "comprehensive / holistic / robust / nuanced" anywhere I saw.
- The warning blocks land their condition-before-claim structure correctly.

**One borderline phrase**: `app/about/page.tsx`:

> Identity theft has the best-built recovery infrastructure of any category.

"Best-built recovery infrastructure" reads slightly hollow because it
doesn't say what makes it so. The next sentence does the work ("FTC
Identity Theft Report; 80%+ recovery rate"), so consider moving the claim
into the evidence — "Identity theft is the only category where the FTC
runs a guided recovery flow that produces a legally accepted Identity
Theft Report."

---

## Effort vs payoff

| Fix | Effort | Payoff | Order |
|---|---|---|---|
| P0-1 Labelize sidebar IDs | 5 min | High — fixes "what does impersonation-bank-gov mean?" | First |
| P0-2 Re-run triage button | 5 min | Medium-high — recovery from misclassification | First |
| P0-3 Currency comma formatting | 2 min | Low-medium — small polish | First |
| P1-1 Homepage 3-step preview | 20 min | High — addresses "what am I committing to?" | Second |
| P1-2 Plan page label de-cluttering | 30 min | Medium — reduces visual noise | Second |
| P1-3 Bank lookup default-collapsed | 10 min | Medium — reduces visual overwhelm | Second |
| P1-4 Triage progress indicator | 15 min | Medium-high for seniors | Second |
| P1-5 Triage privacy reassurance prominence | 5 min | Medium | Second |
| P2 cluster | 5–15 min each | Low — polish only | Later |

If the maintainer does only P0-1, P0-2, P1-1, and P1-4, the site is
visibly stronger for the audience it serves.
