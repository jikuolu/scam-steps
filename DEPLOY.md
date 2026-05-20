# Deploy — Scam Steps

Step-by-step to take the site from this repo to scamsteps.org. Roughly 30
minutes end-to-end. The site is a static Next.js build; no database, no
runtime services beyond the Vercel edge.

---

## 1. Register the domain on Cloudflare

1. Go to cloudflare.com → Domains → Register Domain
2. Search `scamsteps.org`. If available, register — ~$11/year for `.org` on
   Cloudflare (no markup; they bill at cost).
3. Cloudflare creates the zone automatically and sets its own nameservers.
4. (Optional but recommended) Defensively register `scamsteps.com` and
   redirect to `.org` later.

If `scamsteps.org` is taken, the fallback order from the domain decision
doc is: `scamsteps.com` → `scamtriage.org` → `afterascam.org`.

---

## 2. Create the Vercel project

1. vercel.com → Add New → Project
2. Connect GitHub → pick `jikuolu/CoAgency-Lab`
3. **Critical**: in the import dialog, set:
   - **Root Directory** → `Pain Solver/scam-navigator`
   - Framework Preset → Next.js (auto-detected)
   - Build command → leave default (`next build`)
   - Output directory → leave default
   - Install command → leave default (`npm install`)
4. **Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://scamsteps.org` (Production)
   - Optional: same var with the preview deploy URL for the Preview env
     (Vercel auto-injects `VERCEL_URL` but our code uses the explicit env
     var; default falls back to `https://scamsteps.org`)
5. Deploy. First build is ~90 seconds. You'll get a `*.vercel.app`
   preview URL.

---

## 3. Point the domain at Vercel

In Vercel project → Settings → Domains:

1. Add `scamsteps.org` and `www.scamsteps.org`
2. Vercel will show two records to add at Cloudflare. Typical pattern:
   - Apex (`scamsteps.org`): A record → Vercel's anycast IP `76.76.21.21`
     (or whatever Vercel currently shows — copy the exact value from the
     Vercel UI)
   - Subdomain (`www`): CNAME → `cname.vercel-dns.com`

In Cloudflare DNS:

1. **Disable Cloudflare's proxy (orange cloud)** for both records. Set
   them to "DNS only" (gray cloud). Vercel handles SSL and CDN — running
   Cloudflare's proxy on top causes redirect loops and cert issues.
2. Save.
3. Back in Vercel, "Verify" — propagation is usually under 5 minutes.
   Vercel auto-provisions Let's Encrypt cert.

---

## 4. Verify the deploy

Once `scamsteps.org` resolves:

- [ ] Homepage loads, no console errors
- [ ] Triage walks through all 5 steps
- [ ] Plan page renders after triage (sessionStorage)
- [ ] Templates download as `.txt`
- [ ] Bank lookup expands properly
- [ ] `scamsteps.org/sitemap.xml` returns the 16-route sitemap
- [ ] `scamsteps.org/robots.txt` returns the disallow line for `/plan`
- [ ] View page source on the homepage — confirm canonical URL is
      `https://scamsteps.org/`, not the Vercel preview URL
- [ ] Mobile width (DevTools → 390×844) — re-walk homepage and plan

---

## 5. Submit to Google Search Console

1. search.google.com/search-console → Add Property → `scamsteps.org`
2. Verify via Cloudflare DNS TXT record (fastest)
3. Submit `https://scamsteps.org/sitemap.xml`
4. URL Inspection → Request Indexing on:
   - `/`
   - `/scam-types`
   - `/scam-types/card-unauthorized` (highest-traffic intent)
   - `/scam-types/zelle-venmo-cashapp-authorized`
   - `/scam-types/wire-transfer`
   - `/scam-types/identity-theft`
   - `/triage`
   - `/about`

Daily request-indexing cap is 10. Indexing on a new domain with no
backlinks takes 4–8 weeks. Don't refresh the dashboard hourly.

---

## 6. After deploy

- **Vercel Analytics**: auto-enabled on the Hobby tier after first deploy.
  Per-page traffic + Core Web Vitals within ~24 hours.
- **No paid tier needed** for v1 traffic levels. Hobby tier covers up to
  100GB bandwidth/month — plenty for a content site.
- **Updates**: every push to `main` deploys to production automatically.
  Every push to a branch deploys a preview URL.

---

## Troubleshooting

**"Module not found: @/lib/site"** — Vercel didn't pick up the root
directory setting. Project → Settings → General → Root Directory.

**Build succeeds but pages are blank** — usually `metadataBase` URL
mismatch. Check `NEXT_PUBLIC_SITE_URL` is set in Vercel env vars.

**Cloudflare cert errors** — proxy is still on. DNS records must be gray
cloud (DNS only) for Vercel to serve its own cert.

**`/sitemap.xml` 404** — the sitemap is at `app/sitemap.ts`. If the route
isn't building, run `npm run build` locally and check it lists
`sitemap.xml` in the route table.
