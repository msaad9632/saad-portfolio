# Session Context — Saad Portfolio Website

> Full handoff for this project. Read this before doing anything else in `E:\saad-portfolio`.
> This file lives in the project root per the user's explicit request ("store context of this
> chat there too with file named context.md like everything i need").

---

## 0. Where this project lives now

- **Current location:** `E:\saad-portfolio` (moved here from `D:\saad-portfolio` on the user's
  instruction — the chat session was previously bound to `D:\DB Project`, the DineSync repo,
  and the user wanted this portfolio work fully separated from it).
- The user said they will point this chat session's working directory at `E:\saad-portfolio`
  after the migration — if you're reading this in a session already rooted here, that's done.
- `D:\saad-portfolio` and the stray `D:\DB Project\PORTFOLIO_PLAN.md` /
  `portfolio-redesign-context.md` copies should be treated as superseded. The canonical plan
  file is now `E:\saad-portfolio\PORTFOLIO_PLAN.md`, canonical background doc is
  `E:\saad-portfolio\CONTEXT.md`.
- **Do not touch `D:\DB Project`** — that's the DineSync repo, unrelated to this project.

---

## 1. Who this is for

| Item | Value |
|---|---|
| Name | Muhammad Saad |
| GitHub | `msaad9632` (3 public repos, verified via API: `dinesync`, `equipment-ledger`, `ai_extraction_service`) |
| LinkedIn | linkedin.com/in/muhammad-saad-492853407 — Student at National University of Computer and Emerging Sciences, Lahore, Punjab, Pakistan |
| Vercel | `msaad9632@gmail.com` |
| Email | msaad9632@gmail.com |
| Real employment | AI/ML Intern @ KnevaTech — verified via LinkedIn post + a repost from "Kneva" naming him among new interns |

## 2. The ask, condensed

Build a brand-new premium, **interactive** portfolio website — not a restyle of anything
existing. Full detailed brief lives in `PORTFOLIO_PLAN.md`; key points repeated here because
they're easy to lose:

- Quality bar: reads as "this person builds serious software," not "this person made a cool
  portfolio." Plan and build it at a senior engineer's quality bar — but do NOT put "senior"
  as a title/positioning claim in the site copy itself.
- **Hero must be genuinely interactive 3D/WebGL** (raw Three.js, not react-three-fiber/drei) —
  this was called out again explicitly in the most recent turn ("i mean it should be like
  interactive etc"). Prioritize this over polishing later sections.
- Visual system is fixed: bg `#0A0A0A`, surface `#111111`, text white, accent `#3B82F6` used
  sparingly, mostly monochrome. Banned: cyberpunk/neon, glassmorphism, gradients, skill-bar
  charts, badge-wall grids, generic template sections, terminal UI clichés.
- **Content integrity is a hard rule**: never invent companies, clients, metrics, testimonials,
  employers, or achievements. Every claim must be verifiable against a real repo/source.
- **Admin panel**: user wants complete content control without needing AI/Claude to redeploy —
  "every option in admin panel." Resolved architecture: **git-backed CMS** (GitHub OAuth +
  GitHub Git Trees API commits, Vercel auto-deploys on push), not Supabase. This is a later
  phase — not part of the current draft build.
- **Deploy target:** a `*.vercel.app` subdomain, not a custom domain. Chosen project name:
  `msaad` (target `msaad.vercel.app`, fallback `msaad-portfolio`).
- **Benchmark:** `https://abdur-rafay-khan-portfolio.vercel.app` — study for weaknesses to beat
  (fake `0+/0+/0%` stat counters, fake terminal skills widget, includes projects that aren't
  Rafay's own work, empty GitHub section). Do not copy its layout or content.
- Use the `agency-agents` persona library (github.com/msitarzewski/agency-agents) for
  plan/design review — already run once (4-cluster, 14-persona review), see §5 below.
- Use LinkedIn as the source for photo + About section content. **Photo not yet provided by
  the user** — build with a placeholder box for now, swap in later.

## 3. Verified project inventory (do not deviate from this)

| # | Project | Status | Key facts to use |
|---|---|---|---|
| 1 | **ai_extraction_service** | ✅ real, public, Python | URL → structured JSON API. FastAPI, Playwright, Trafilatura, Selectolax, PyMuPDF, Pydantic v2, `uv`. 5-signal confidence scoring, multi-stage fallback parser ladder, SSRF gate. **139 tests** (actually run via `uv run pytest --collect-only -q`, confirmed exact count). QA_CHECKLIST has 1 retracted finding + 1 correction (not "2 retracted" — that was a prior overstatement, fixed). Screenshots exist at `D:\ai_extraction_service\docs\screenshots\` (6 PNGs). |
| 2 | **equipment-ledger** | ✅ real, public, HTML | Bilingual EN/Urdu bookkeeping + invoicing for a heavy-equipment rental business. Single HTML file, no build step, no deps. WebCrypto AES-GCM 256 + PBKDF2 (600k iterations, double-wrap), LocalStorage, RTL Urdu support. "26-day month" billing rule (`floor(rate/26×days)`). Android `window.print()` timing bug fixed via `afterprint`/`visibilitychange`. PDF-diffing test found a doubled word + a bidi-mark-split number. Fiction disclaimer already published — screenshots are clear to use. 8 screenshots on GitHub (corrected count from an earlier miscount of 6). "No AI, anywhere" is an actual positioning line from the README. |
| 3 | **QuickSign / ASL** | ⚠️ no public repo under `msaad9632` | Built together with **Abdur Rafay Khan** — credit as a collaboration, no GitHub link to point at. **Live URL confirmed by user: `https://aslgame.vercel.app/`** (verified live, page title "QuickSign — Learn ASL with Zippy"). Local source: `E:\ASL_Game`. Screenshots: `E:\ASL_Game\web\public\shots\` — exactly 5 WEBP files (`home.webp`, `signcoach.webp`, `story.webp`, `multiplayer.webp`, `privacy.webp`). Story: on-device MediaPipe hand tracking (camera never leaves device), rule-based verification across 5 linguistic parameters (handshape, location, movement, palm orientation, non-manual markers), a Bi-GRU neural net used **only as a veto layer** (can reject, never approve) added after a real bug — the "COFFEE sign" false positive, where a single-frame check let a static fist pass; fixed with a rolling ~2s movement window. WebRTC multiplayer, gamification, PWA. Tech: React, TypeScript, Tailwind v4, Framer Motion, MediaPipe Tasks API, TensorFlow.js, WebRTC, Supabase Postgres, Vercel. **Do not use** any figures from `docs/PRODUCT_BACKLOG_SAAD.md` (live PostHog project number, Supabase project ref, a Pakistan-traffic-exclusion rule, a "need more users" admission) — none of that is safe to publish. |
| 4 | **dinesync** | ✅ real, public, JavaScript | Live at `https://dinesync-chi.vercel.app`. Local: `D:\DB Project`. Restaurant reservation system. Backend detail (from `backend/db.js`): local dev runs SQL Server via the Windows-only `msnodesqlv8` ODBC driver; the Vercel deploy uses Postgres via `pg`/Supabase-as-hosted-Postgres — described in that file's own header comment as "the only one that runs in a Linux serverless function." **DineSync has zero documentation** (repo created 2026-08-11, no README) — Phase 0 of the plan is to write its README from `backend/db.js` before writing any DineSync case-study copy, since this is "the one place invention can re-enter." Decision (delegated to me by the user, "u decide"): give it a full case study, but leaner than the other three. |
| 5 | **Raaziq / LogisticSoftware** | 🔒 private, personal, in-progress | Local at `E:\LogisticSoftware`. User's own current project — **screenshots only, no repo link, no source code exposure** ("might put it out commercially later"). FastAPI/SQLAlchemy 2.x/Alembic/PostgreSQL backend, React/TypeScript/Vite/Tailwind v4/shadcn frontend. Notable engineering details from its README: ordered `ShipmentStage` enum with strict progression rules; the quote→shipment acceptance seam is transactional and idempotent (a failed acceptance never permanently consumes a job-number sequence value); append-only `StatusEvent` rows; worker-portal authorization enforced by *reusing* `advance_stage` rather than a parallel check; `TrackingAdapter` protocol with `MockTrackingAdapter`; `TrackingIngestionFailed` exception on invalid provider stage reports; customer-tracking endpoint returns only safe fields "by construction on the backend"; the ops-side `POST /shipments/{id}/status` endpoint was deliberately removed. Screenshots need to be captured locally (SQLite-backed run is fine, Postgres not required) — **crop out any demo credentials** (e.g. `Worker123!`) before use. Not yet captured as of last session. |
| — | Tijaarat Interiors, APPNA NJ | ❌ not his | These are from Rafay's reference/benchmark site. Never include. |

## 4. Design tokens & hard technical decisions (already resolved, don't re-litigate)

- **Stack:** Next.js ≥15.2.3 (App Router, RSC) — pinned for CVE-2025-29927 middleware bypass.
  TypeScript strict. Tailwind CSS v4 (`@theme` tokens, not v3). Raw `three` (named imports only,
  no `@react-three/fiber`/`drei`).
- **Colors:** `--bg:#0A0A0A`, `--surface:#111111`, text white/`#FAFAFA`, accent `#3B82F6` (used
  as "accent = executing right now," capped at ~0.15% viewport pixel area — not "two instances
  per viewport," that rule was found unenforceable and replaced).
- `--text-3` (meta/caption gray) is `#8B8B94`, NOT `#71717A` — the original value failed WCAG AA
  (3.91:1 on `--surface`); `#8B8B94` passes at 5.59:1. This was a corrected bug, don't revert it.
- **Hero mechanism:** per-instance buffer attributes (`aStart`, `aEnd`, `aT0`, `aSpeed`, `aSeed`)
  driven by one shared `uTime` uniform, for independent GPU-interpolated packet motion along
  network edges, plus a CPU-side state machine over a small pool (24–64) for stateful
  reroute/failure events. A single shared uniform for position (an earlier, wrong design) cannot
  produce independent packet motion — don't reintroduce that bug.
- Hero needs: `next/dynamic({ssr:false})` wrapped in a **`'use client'`** component (hard Next 15
  build error otherwise if attempted from a Server Component directly), `IntersectionObserver`
  to pause the rAF loop offscreen, `webglcontextlost` handling, full WebGL disposal on unmount,
  `prefers-reduced-motion` respected (disposal, not just slower motion), mobile 30fps cap,
  `renderer.setPixelRatio` capped, a deterministic first "failure" event at t≈1.2s, and
  tap/click-to-fail interactivity. Canvas needs `aria-hidden` + `tabindex="-1"` +
  `pointer-events:none` (WCAG 4.1.2 — don't leave a focusable element inside a hidden subtree).
- **IA (site sections):** Hero → About (needs a photo placeholder box since no photo yet) →
  Work/case studies (with `/work/[slug]` detail pages, restored after being dropped in an
  earlier draft) → "Incidents" (three specific documented bugs/fixes, editorial layout, not a
  grid — replaces a earlier "Capabilities" section that was identified as a disguised badge
  grid and deleted) → Experience → Contact. No "Hi, I'm X + photo + buttons" hero.
- **Admin/CMS (later phase, not in current draft):** git-backed, not Supabase. GitHub OAuth,
  GitHub Git Trees API writes via `octokit`, one commit per save, Vercel auto-deploys off
  `main`. Markdown (not MDX) content pipeline: `remark-parse → remark-gfm → remark-directive →
  remark-rehype → rehype-sanitize → toJsxRuntime`, `sharp` for image processing (EXIF strip,
  AVIF/WebP derivatives), `zod` for server-side validation, `draftMode()` cookie-based preview
  (not a `/?preview=1` query param — that forces the whole route dynamic for all traffic and
  risks cache poisoning). A Rollback button matters more than a Deploy button since Vercel
  already serves the last-good deployment on a failed build.
  - This was a full architecture swap from an earlier Supabase-based design — the Supabase
    design's own stated justification ("DineSync already uses Supabase") was verified **false**
    by reading `D:\DB Project\backend\db.js`: DineSync only uses Supabase as hosted Postgres via
    `pg`, none of Auth/RLS/Storage/`@supabase/supabase-js`. Do not resurrect the Supabase plan.
- **Accessibility gate:** not just "Lighthouse 100 a11y" — a named manual protocol: keyboard-only
  pass (including admin panel), NVDA+Firefox, VoiceOver iOS, 400% zoom reflow test at 1280px,
  text-spacing bookmarklet, forced-colors test. Target size floor is 24×24px (WCAG 2.5.8, AA) —
  44px is the AAA figure (2.5.5), don't conflate them.
- **Real measured bundle costs** (via esbuild, not registry-listed numbers): raw `three` named
  imports for the Fallback scene ≈ 132.5KB gz (WebGLRenderer alone is ~129.1KB gz — an
  "irreducible floor"). R3F adds only ~50KB gz over raw three; drei adds ~10–40KB depending on
  imports (not the ~350–600KB previously and wrongly claimed — that number came from the drei
  *barrel* import nobody ships).

## 5. Agency-agents review already done

A 4-cluster, 14-persona review (using real persona definitions from
`github.com/msitarzewski/agency-agents`) was run against plan v1 and produced plan v2 (the
current `PORTFOLIO_PLAN.md`). Findings already folded in — see §4 above for the concrete fixes
(Supabase justification, hero shader design, bundle size claim, `next/dynamic` SSR bug, WCAG
contrast, retraction-count overstatement, preview-mode security issue). Don't re-run this
review from scratch unless the user asks for a fresh pass on new work.

## 6. Current build status (as of this session)

A background build agent scaffolded a first draft directly in what's now `E:\saad-portfolio`
before hitting the user's Claude session limit (reset 4:30pm Asia/Karachi) partway through.
**Files that exist and need review/completion:**

```
app/
  layout.tsx
  page.tsx
  globals.css
  favicon.ico
components/
  Nav.tsx
  Hero.tsx
  HeroScene.tsx        ← raw Three.js scene, needs verification against §4 hero spec
  HeroSceneClient.tsx   ← the 'use client' + dynamic-import wrapper
  About.tsx
  Work.tsx
  Incidents.tsx
  Experience.tsx
  Contact.tsx
lib/
  projects.ts           ← project data, verify against §3 inventory (no invented facts)
```

**Not yet done / explicitly deferred:**
- Admin panel / GitHub OAuth CMS — later phase, not part of this draft.
- `/work/[slug]` detail pages — draft used simplified cards per the build instructions given
  to the agent; may still need to be added per plan §3.
- Real profile photo — user said they'll provide it later; placeholder box in use.
- Raaziq/LogisticSoftware screenshots — not yet captured (needs a local run).
- Full asset collection (Ledger's 8 screenshots, extract-service's 6, ASL's 5, DineSync live
  capture) — not yet pulled into `public/`.
- DineSync README — Phase 0 of the plan, not yet written.
- Deployment to Vercel — not started.

**Immediate next step:** verify `npm run dev` runs cleanly, check the hero scene actually
implements the per-instance-attribute design (not the broken single-uniform version), confirm
no invented content slipped into `lib/projects.ts` or the section components, then continue
asset collection and the remaining IA sections per the plan.

## 7. Notable user preferences / working style (for whoever picks this up)

- User wants to review a working draft in-browser before further polishing — "make it first
  then ill review, go ahead." Prioritize a runnable, visually real result over completeness.
- User is fine delegating judgment calls explicitly ("u decide" on DineSync's case-study
  depth) — but wants the reasoning stated, not just the decision.
- User corrects scope/architecture aggressively when something doesn't hold up (see the
  Supabase-justification incident in §4) — verify claims against real files before building on
  them, the same standard the plan itself imposes on published content.
- Direct, terse instructions, sometimes with typos — read for intent, don't over-ask when the
  intent is clear from context already established (e.g. "yes yes dine sync id in" = confirm
  DineSync inclusion).
