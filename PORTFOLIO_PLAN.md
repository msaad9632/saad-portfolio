# Portfolio — Implementation Plan v2

**Muhammad Saad** · GitHub `msaad9632` · Vercel `msaad9632@gmail.com` · Lahore, Pakistan
**Target:** new Vercel project on a `*.vercel.app` subdomain
**Revised:** 2026-08-11, after review by 14 agency agents across 4 clusters, plus LinkedIn verification

> Scratch file for the *portfolio* project; it lives in this repo only because this is the
> current working directory. Move it when the portfolio repo exists.

**What changed from v1:** the admin panel no longer uses Supabase (§6 — this removes an entire
class of security and availability failure); the hero visual was re-engineered because its
core shader mechanism did not work as described and its meaning was illegible (§4); a
palette token fails WCAG AA and was corrected (§5); a full design-token layer was added that
v1 left for a developer to invent (§5); an About section was added and Capabilities deleted
(§3); real employment surfaced from LinkedIn (§2); and one headline statistic was overstated
and is now exact (§2).

---

## 0. Thesis

The benchmark, `abdur-rafay-khan-portfolio.vercel.app`, sells **services** — client sites, a
filter-chip project grid, a fake terminal skills widget, three stat counters that render
`0+ / 0+ / 0%`, and a GitHub section with nothing in it.

Saad's material is a different category, and it is his own writing that proves it:

- an SSRF gate whose test corpus includes *"a host resolving to **both** a public and a
  private address — blocked, because you don't control which one the OS picks"*
- a confidence score published as a weighted decomposition, with an honest-failure case where
  a bot wall scores 0.42 and raises `blocked_content` — because *"a cookie banner scored as a
  successful extraction is worse than an error"*
- a 6-digit PIN deliberately excluded from protecting the cloud copy, because it is
  offline-brute-forcible in about two minutes
- invoice-rendering tests that diff real PDFs and caught a doubled word and a number split by
  invisible bidi marks — *"both invisible in the DOM, both obvious on paper"*
- a freight system that treats a provider's invalid stage report as `TrackingIngestionFailed`
  rather than applying it silently
- an ASL verifier rebuilt around a rolling ~2-second movement window after COFFEE passed for
  two motionless fists — *"that class of bug is now structurally prevented"*
- a QA log that records its own **retracted** finding, *"because a QA log that records only
  confirmed hits teaches nothing about which methods lie to you"*

**The site's job is to make an engineer reading it think: this person has been burned and
learned the right lesson.** Design carries credibility; the writing carries proof. Nothing on
the page is a number that cannot be pointed at in a repo.

---

## 1. Verified content inventory

Every row below was checked against primary sources. The extraction service's test count was
verified by *running the suite*, not by reading the README.

| # | Project | Source | Live | Media | Depth |
|---|---|---|---|---|---|
| 1 | **extract** — URL → structured JSON API | `msaad9632/ai_extraction_service`, public | — | ✅ 6 PNGs in `D:\ai_extraction_service\docs\screenshots\` | ⭐⭐⭐ |
| 2 | **Ledger** — bilingual EN/اردو rental bookkeeping | `msaad9632/equipment-ledger`, public | — | ✅ **8** PNGs in repo `docs/screenshots/` (v1 said 6 — `02-machine` and `07-invoice` were missed; the invoice shot is the one the invoice-vs-transaction story needs) | ⭐⭐⭐ |
| 3 | **Raaziq** — freight quotation + shipment tracking | `E:\LogisticSoftware`, **stays private** | — | ❌ must be captured | ⭐⭐⭐ |
| 4 | **QuickSign** — in-browser ASL learning game | co-founded with **Abdur Rafay Khan**; no repo of Saad's | ✅ `aslgame.vercel.app` — confirmed | ✅ 5 WEBPs in `E:\ASL_Game\web\public\shots\` | ⭐⭐⭐ (v1 rated this ⭐⭐ — wrong, see below) |
| 5 | **DineSync** — restaurant reservations | `msaad9632/dinesync`, public | ✅ `dinesync-chi.vercel.app` — verified 200, `/api/reservations`, `/api/tables`, `/api/menu` all live | ⚠️ capture from live | ⭐ **no README, no description** |

**Excluded:** Tijaarat Interiors, APPNA New Jersey, Rafay's Restaurant Reservation System.

### Corrections to v1's reading of the material

**QuickSign was under-rated.** `E:\ASL_Game\README.md` contains *"How recognition works (and the
bug we refuse to repeat)"* — the COFFEE false-positive and its structural fix. There is also a
dedicated `docs/KNOWN_LIMITATIONS.md` that opens *"deliberately candid — every item is real
and evidenced"* and concedes that held-out test accuracy overstates real-world accuracy. That
is the single most on-thesis artifact across all five projects. His LinkedIn post adds the
verification model: five linguistic parameters (handshape, location, movement, palm
orientation, non-manual markers), on-device MediaPipe so the camera feed never leaves the
device, and a Bi-GRU trained on their own dataset acting as a **veto-only** layer that can
reject but never approve. Promote to a full case study.

**DineSync is the one place invention can re-enter.** The repo was created 2026-08-11, has no
README and no description. Every other project's copy is constrained by a README Saad wrote;
this one is not. Its honest basis already exists in `D:\DB Project\backend\db.js:1–10`, which
states the *constraint* rather than the choice: local dev uses SQL Server through the
Windows-only `msnodesqlv8` ODBC driver, and Postgres is *"the only one that runs in a Linux
serverless function."* **Write that README before writing a word of DineSync copy**, or demote
DineSync to a one-line supporting entry with a live link.

### Media plan

- **Raaziq** — no screenshots exist. `cd backend && uv sync --extra dev`, seed, run uvicorn,
  then `cd frontend && npm i && npm run dev`; capture `/shipments`, `/shipments/:id`,
  `/quotes/new`, `/track/:ref`, `/worker/queue`. The README says Alembic needs Postgres, but
  the **test suite already builds the full schema on in-memory SQLite** — so a Postgres-free
  capture session is more likely to work than v1 assumed. **Crop out the demo worker
  credentials** (`Worker123!`) that appear in the seeded data.
- **extract** — `scripts/capture_screenshots.py` regenerates deterministically with stubbed API
  responses. Re-run it rather than reusing stale PNGs.
- **Ledger** — pull the 8 PNGs from GitHub raw. The README's fiction disclaimer (*"Every
  company, client, person, site, and figure in this repository is fictional"*) is the clearance
  to publish them; cite it in the case study.
- **DineSync** — capture from the live deployment.
- **Profile photo — resolved.** LinkedIn has a professional headshot (561×561, suit, plain
  background). It is behind a credentialed CDN URL that cannot be fetched programmatically.
  **Saad: right-click the photo → Save image as → tell me the path.** Thirty seconds, and it is
  the last blocking asset.
- All images: `sharp` at build time → AVIF + WebP + fallback, EXIF stripped (the headshot is
  the likeliest GPS carrier), intrinsic dimensions recorded for the CLS budget.

### Never publish

`E:\ASL_Game\docs\PRODUCT_BACKLOG_SAAD.md` holds a live PostHog project number and a Supabase
project ref, a rule excluding Pakistan traffic because *"that traffic is friends and family,
not real users,"* and a Critical item reading *"Need more users."* **No QuickSign traction,
engagement or user figure is safe to put on the site**, and those identifiers must not appear
in any screenshot. Same for Raaziq's demo credentials and its dev-only `JWT_SECRET_KEY` note.

---

## 2. Positioning

"Senior software engineer" describes how the work is planned, not a title to print — the
audience checks LinkedIn in ten seconds and this site's whole strategy is credibility.

**LinkedIn verification changed this section.** Saad has real employment that v1 did not know
about, and has no About text to transcribe, so the About copy is written from evidence.

| Fact | Source |
|---|---|
| **AI/ML Intern, KnevaTech** — since ~July 2026 | LinkedIn post + Kneva's own announcement post naming him |
| **Co-founder, QuickSign** — with Abdur Rafay Khan | his LinkedIn post, Rafay tagged and engaged; attribution is public and mutual |
| BSc Computer Science, National University of Computer and Emerging Sciences (FAST), Lahore | LinkedIn |
| Lahore, Punjab, Pakistan | LinkedIn |

- **No seniority claim, no student apology.** Identity line: `Muhammad Saad — Software Engineer`.
- **Headline** — confirmed as nearly his own sentence, generalised from
  *"tells you when it failed instead of handing back a bot wall as if it were an article"*:

  > **I build systems that tell you when they've failed.**

- **Supporting line — two clauses re-cited.** v1 defended these with the wrong evidence:

  | Clause | v1 cited | Correct citation |
  |---|---|---|
  | extraction pipelines | confidence score / `blocked_content` | ✅ unchanged, best-evidenced clause on the page |
  | offline-first financial software | the WebCrypto model | ❌ that is a *privacy* property. Use: *"Money software fails quietly, so most of the verification is arithmetic invariants"* |
  | freight operations tooling | append-only status events | ⚠️ that is *auditability*. Use `TrackingIngestionFailed` — an invalid provider stage is *"not silently applied"* — and keep append-only as secondary |

- **Statistics — corrected.** v1 said "2 findings retracted." The QA checklist labels one
  `❌ Retracted — no bug existed` and the other `Correction: this was a misdiagnosis`.
  Ship: **139 tests · a 101-row acceptance plan · 6 bugs found and fixed · 1 retraction and
  1 correction.** All four verified exactly; 139 was re-verified by running `pytest
  --collect-only`. The corrected version is stronger, because that line's entire value is
  precision.
- **Rendered as prose, never as a counter row.** A four-number grid is visually identical to
  the benchmark's fake counters. One sentence under the positioning statement.
- **Also publish the still-open defects** — the QA checklist lists open items (meta-refresh
  redirects unfollowed, `text/plain` → 415, a metrics undercount). On a site about honest
  failure, known-open bugs are worth more than fixed ones.

---

## 3. Information architecture

```
NAV — floating pill, transparent over hero → blur + hairline on scroll
  skip link precedes everything

01  HERO           full viewport · 3D canvas · headline · evidence line · ONE primary CTA
02  SELECTED WORK  5 case studies, asymmetric; #1 full-bleed, rest offset → /work/[slug]
03  HOW IT BROKE   three incidents, not three principles — asymmetric editorial
04  ABOUT          photo, the engineering narrative, KnevaTech + QuickSign + FAST
05  EXPERIENCE     compact timeline — KnevaTech, QuickSign. No GCSE/O-Level rows
06  CONTACT        closing statement · email · GitHub · LinkedIn · footer
```

**Added: About.** v1 blocked on a profile photo for a site that had nowhere to put one.

**Deleted: Capabilities.** "Six domains with technologies revealed underneath" is a badge grid
under a new name — the thing the brief bans. Each case study carries its own stack line, which
is where a technology means something.

**Deleted: GitHub activity.** A contribution matrix over a 3-repo, 0-star account is weak
evidence, and the benchmark's own version renders empty.

**§03 is incidents, not principles.** "Three principles I build by" is the most template-shaped
composition on the web. Three *incidents* — COFFEE passing for two motionless fists; the bot
wall scoring 0.52 with no warning; `window.print()` returning early on Android — each with what
changed structurally afterwards.

**`/work/[slug]` detail pages**, omitted by the previous plan and restored here: overview →
problem → approach → architecture diagram → decisions that cost something → deliberate scope
limits → links. The READMEs' "scope limits" and "retracted findings" sections port over nearly
verbatim and are the most senior writing in the corpus.

**Also needed and previously unspecified:** `/404`, prev/next between case studies, scroll
restoration, `previous_slugs` handling so a rename doesn't 404 inbound links.

---

## 4. Hero — the 3D system

### Concept: **Fallback**

The extraction service's parser ladder as ambient motion:
`trafilatura → thin? → Playwright → re-run → readability → selectolax → 422`.

Packets of light travel forward through a lattice. Periodically one hits a node that **fails** —
it dims, the packet stalls, then reroutes down an alternate edge and continues. It is the only
hero concept considered that says something about the person, and it states §0's thesis before
a word is read.

### Four changes that decide whether this works

The finish-gate review was blunt: as specified in v1, this renders as a plexus — nodes, edges
and travelling lights — which is exactly the AI-template hero the brief bans. The concept is
good; the execution was generic. Four fixes, all required:

1. **Forward-only geometry, not a plexus.** Six discrete depth-ranked columns, one per parser
   stage, edges strictly forward, no cross-links. It then reads as a pipeline, not a starfield,
   and a skipped stage is *visible*.
2. **The failure event must be deterministic first.** v1 had it stochastic "every several
   seconds" — median hero dwell is 3–8 s, so a large fraction of visitors would see only a
   lattice with lights and the concept fails for them. Scripted reroute at **t ≈ 1.2 s** after
   canvas ready, staged within 300 px of the headline; stochastic every 4–7 s thereafter.
3. **Tap or click a node to fail it.** One gesture. It satisfies the brief's "genuine
   interactive 3D" (camera parallax is ambient response, not agency), it works identically on
   mobile where there is no cursor at all, and it *is* the thesis: the visitor causes a failure
   and watches the system route around it and tell them.
4. **A visible mono caption**, bottom-left: `trafilatura → playwright → readability → 422`,
   active stage in `--text-2`. One line converts particles into a diagram.

### Implementation — corrected

**The v1 shader mechanism did not work.** It said "position along an edge is a uniform,
animated on the GPU." A uniform is uniform across the whole draw call, so every packet would
sit at the same position along its own edge, in lockstep, forever. Independent packets that way
would need N materials and N draw calls — the exact CPU cost the plan claimed to avoid.

**Correct technique — per-instance attributes plus one global time uniform:**

```glsl
// per-packet attributes: aStart, aEnd (vec3), aT0, aSpeed, aSeed (float)
// one uniform: uTime
float t = clamp((uTime - aT0) * aSpeed, 0.0, 1.0);
vec3  p = mix(aStart, aEnd, t);
gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
```

One draw call, zero per-frame CPU geometry work, every packet independent.

**The reroute cannot be pure-GPU** — it is stateful, event-driven, per-packet behaviour that a
`clamp()` loop cannot express. A CPU state machine over a **24–64 packet pool** writes
`aStart`/`aEnd`/`aT0` on retarget only and sets `needsUpdate`. At the stated cadence that is
about ten floats per second, not per frame. The stall-and-reroute easing is a piecewise
three-point envelope inside the shader. No GPGPU, no ping-pong FBOs, no addons.

**Budget the right quantity.** v1 budgeted node count; the mobile frame-time killer is fill
rate — a full-viewport canvas at DPR 3 on a 430 px phone is ~3.6 M fragments per frame before
blending. `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))`, 1.25 on mobile, is worth
more than the entire node reduction and is one line. Nodes are `Points` with a circular alpha
sprite, not `SphereGeometry` — 900 spheres at 8×6 segments is ~86 k triangles to draw 3 px dots;
sprites are ~1.8 k and identical on screen. State an **edge** budget too; edges drive density
and aliasing far more than nodes do.

**Line width is a real constraint nobody had noticed.** `LineBasicMaterial.linewidth` is ignored
on essentially every WebGL platform (ANGLE caps at 1 px). ~1800 dim 1 px hairlines on `#0A0A0A`
at DPR 3 will shimmer and alias under camera motion rather than read as an architecture diagram.
Since `Line2`/`LineMaterial` is an addon and the bundle has no room (below), the answer is a
**hand-rolled instanced-quad line shader** — six columns of forward-only edges is a small,
regular set, so this is contained.

**LOD is a watchdog, not a constant.** Measure median frame time over ~60 frames, then degrade
in order: DPR → packet count → node/edge count → disable packets → static gradient. A binary
desktop/mobile switch chosen at load is not LOD; mid-range Android in 2026 spans an order of
magnitude.

**Three lifecycle bugs that would otherwise ship:**
- `webglcontextlost` → `preventDefault()` and fall through to the static-gradient path. Routine
  on mobile Safari after a tab is backgrounded; without it the hero goes black.
- Full disposal on unmount (`geometry`/`material`/`renderer.dispose()` + `forceContextLoss()`).
  Home → work → home client navigation otherwise leaks a WebGL context per round trip until the
  browser starts killing the oldest — which kills the *hero* while the user is still browsing.
- Dispose on the `prefers-reduced-motion` path too, instead of holding a live context and its
  GPU memory for the page lifetime after rendering one frame.

**Loading.** `next/dynamic` with `ssr: false` **must live inside a `'use client'` wrapper** —
calling it from a Server Component is a hard build error in Next 15. Fire the import on
`requestIdleCallback` after load, never eagerly: 300–600 ms of throttled parse inside the trace
window is the single most likely cause of missing the Lighthouse target.

**Reduced motion:** render the **post-reroute** frame — failed node dimmed, alternate path lit —
not a meaningless mid-state. And gate the `0.06` cursor-parallax lerp separately from the rAF
loop; parallax is a distinct motion source and precisely the vestibular trigger the preference
exists for. Read via `matchMedia` with a `change` listener; users toggle mid-session.

**Pause:** `IntersectionObserver` stops the loop entirely when the hero leaves the viewport,
plus `visibilitychange` — a backgrounded tab throttles rAF but is not guaranteed to stop it.

### Motion elsewhere

CSS transitions and WAAPI. **No Framer Motion** — every animation the brief describes is a few
lines of CSS, and `motion` (the renamed package) is ~34 KB gz full-build, ~4.6 KB via
`LazyMotion`. Even 4.6 KB buys nothing here. One guard: WAAPI's `finished` promise **rejects on
cancel**, which is an unhandled rejection in the console and would fail the zero-console-errors
bar.

**Reveals must be visible by default**, with animation as progressive enhancement. If they start
at `opacity: 0` and JS adds a class, then a JS error or an IntersectionObserver edge case leaves
content permanently invisible — the most common severe scroll-reveal bug, and v1's reveal system
was exactly that shape.

### The R3F number in v1 was wrong

v1 claimed R3F + drei costs "~350–600 KB gzipped." That quotes the drei *barrel*, which nobody
ships. Measured: `three` named-imports 132.5 KB gz, R3F adds ~50 KB, drei ~10–40 KB depending on
imports. So the real comparison is ~132 KB vs ~185 KB — a 40% increase, not 4×. **The decision
still stands** (a single imperative scene that never reconciles gets nothing from a React
reconciler), but a plan whose thesis is "no number that can't be pointed at" cannot carry a
5×-inflated figure. Corrected.

---

## 5. Design system

v1 specified tracking, one line-height and three radii, and left everything else for a developer
to invent. Full token layer:

```css
:root {
  color-scheme: dark;

  --bg:        #0A0A0A;   --surface:   #111111;   --surface-2: #18181B;
  --border:    #27272A;
  --text:      #FAFAFA;   /* 18.97:1 on --bg  ✓ verified */
  --text-2:    #A1A1AA;   /*  7.37:1 on --surface ✓ */
  --text-3:    #8B8B94;   /*  5.59:1 on --surface ✓ — see below */
  --accent:    #3B82F6;   /*  5.38:1 on --bg ✓ */

  /* type — fluid, 1.25 mobile → 1.333 desktop */
  --t-display: clamp(2.25rem, 1.2rem + 4.4vw, 4.5rem);
  --t-h2:      clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem);
  --t-h3: 1.5rem;  --t-lg: 1.125rem;  --t-base: 1rem;
  --t-sm: .875rem; --t-xs: .8125rem;  --t-mono: .8125rem;

  /* space — 4px base */
  --s1:4px --s2:8px --s3:12px --s4:16px --s6:24px --s8:32px
  --s12:48px --s16:64px --s24:96px --s32:128px --s40:160px;

  --section-y: clamp(80px, 10vw, 160px);
  --w-prose: 68ch;  --w-content: 1120px;  --w-wide: 1440px;

  --d-state: 120ms; --d-hover: 220ms; --d-reveal: 480ms;
  --e-out: cubic-bezier(.2,0,0,1);
}
```

**`--text-3` was a WCAG AA failure and is fixed.** v1 used `#71717A` for "meta, captions" —
small text, the case that requires 4.5:1 — and it measures **3.91:1** on `--surface`, **4.10:1**
on `--bg`, **3.67:1** on `--surface-2`. It failed on every surface it could land on, and worst on
hover. `#8B8B94` clears all three. v1's §8 promised this token would be "verified before use";
it was verified, and it failed. Restrict `#71717A` to ≥24 px text or non-text decoration.

**Also flagged:** `#FAFAFA` on `--accent` is **3.52:1** — fails AA. No solid-accent button with a
near-white label. The primary CTA is `--text` on `--surface-2` with a 1px border.

**Tracking scales with size** — a flat `-0.03em` reads cramped at a 36 px mobile display size:
≥48 px `-0.03em` · 32–48 px `-0.02em` · 24–32 px `-0.01em` · <24 px `0` · mono `0`.

**Weights: exactly three — 400, 500, 600.** No 700.
**Line height:** display 1.05 · h2 1.15 · body 1.6 · mono 1.55 · caption 1.45.
**Measure:** 68ch prose, 80ch mono.

**Elevation rule, written down so shadows don't appear:** `--bg` page → `--surface` resting →
`--surface-2` hover/active only. `--border` is the only edge. **No box-shadows on the public
site.** `--border` at 1.33:1 is fine as decoration but must never be the sole indicator of a
control's boundary.

**Breakpoints — design 390 / 640 / 1024 / 1440; test 320 / 375 / 390 / 430 / 768 / 1024 / 1440 /
1920.** v1 tested eight and designed for none.

**CSS boundary rule:** tokens in `:root`, layout utilities from Tailwind, **arbitrary bracket
values forbidden** — CI greps for `\[[0-9.]+(px|rem)\]` in `src/`. Cheapest possible guard
against token rot. Pin Tailwind v4 (its `@theme` block is a different token setup from v3).

**Accent semantics — replacing v1's unenforceable "two instances per viewport" rule**, which
counted instances rather than salience and which v1's own token table violated four ways.
`#3B82F6` means **"executing right now"**: the travelling packet, `:focus-visible`, the
current-section nav indicator. Not availability, not links at rest, never a fill.
- Persistent accent: **max one element per section**. Transient accent (focus, hover, active
  packet) uncapped — it is user-caused and disappears.
- Resting accent ≤ **0.15% of viewport pixels**, checkable by counting accent pixels in a
  Playwright screenshot in CI. Turns a vibe into a gate.
- Max form factors: ≤2 px stroke, ≤10 px dot, or text.

**Kill the availability status dot** — it is the benchmark's signature element, and copying it
while claiming differentiation is a brand failure. Replace with one mono line of `--text-3`:
`Final year, FAST Lahore · AI/ML intern at KnevaTech · replies within a day`. Factual,
unfakeable, not the benchmark. `aria-hidden` any dot that survives; never let colour alone carry
state.

**The signature component — Decision block.** Full-bleed to `--measure`, `border-top: 1px solid
var(--border)`, `padding-top: 24px`, mono label at `--t-mono`/`--text-3`/uppercase/`0.08em`
reading `DECISION 03 · why the PIN doesn't protect the cloud copy`, then body at `--t-lg`. Used
in every case study. This, not the grain overlay, is what makes the site his rather than
Vercel-house-style.

**Voice contract.** First person singular, past tense for work, declarative. Every claim carries
a number, a file, or a named decision. **Banned:** clean, robust, seamless, passionate,
cutting-edge, leveraging, journey, "I'm a CS student who loves…", exclamation marks, and
em-dashes used for drama. Sentence case for headings and nav; uppercase only for mono labels.
Numerals for all quantities.

**Type:** Geist Sans + Geist Mono via `next/font`, self-hosted, zero layout shift. Mono is
reserved for identifiers, stage names, HTTP codes and file paths — where a monospace face earns
its place, unlike the benchmark's fake terminal.

**Urdu — decide now, not at build time.** The Ledger's differentiator is bilingual EN/اردو and
that string reaches the page. Subset Noto Nastaliq Urdu (~40 KB, `font-display: swap`, loaded
only on that case study) with `dir="rtl"` on the block. Every Urdu fragment needs
`lang="ur" dir="rtl"` (WCAG 3.1.2) — which pairs naturally with the project's own line about
*"Urdu first, and properly — not a translated string table bolted onto a left-to-right design."*

**Texture:** one SVG grain overlay ~3% opacity, fixed, `pointer-events: none`. No gradients, no
glows, no glassmorphism, no `backdrop-filter` except the scrolled nav pill.
**Radii:** 8 px controls, 12 px cards, 0 on full-bleed media. Nothing is a pill but the nav.

### Mobile as its own composition

v1 said almost nothing here. Required:
- Hero `100svh`, canvas sized to `lvh` so the address bar cannot reflow it.
- Case studies become **one full-bleed hero item + four 88 px list rows with a 64 px thumb** —
  v1's asymmetry collapses at 390 px into four identical stacked cards, i.e. a card grid without
  hierarchy.
- Desktop screenshots are illegible at 375 px and the evidence is the entire point: ship cropped
  detail versions, or a pinch-zoom lightbox.
- Native `<dialog>` for the drawer, not a full-screen hamburger overlay.
- `@media (hover:hover)` guards on every hover affordance, plus real `:active` states.
- `overflow-x: auto` on every mono block; `env(safe-area-inset-bottom)` on fixed elements.
- Tap-to-fail is the hero's mobile interaction.

---

## 6. Admin panel — **git-backed, no database**

The requirement: complete control, every option, and no AI needed to redeploy.

### Why v1's Supabase design is abandoned

v1 justified Supabase with *"DineSync already uses it, so there is no new platform to learn."*
**That is false, and it was verified false:** `D:\DB Project\backend\db.js` uses Supabase purely
as hosted Postgres over `pg` and a `DATABASE_URL`. No `@supabase/supabase-js`, no Auth, no RLS,
no Storage. Every Supabase subsystem v1 leaned on was net-new — and those are exactly the
subsystems the review found sharp edges in:

- **Supabase free-tier projects pause after 7 days without an API request.** A portfolio's whole
  purpose is to be opened by a recruiter weeks after the last edit — precisely the condition that
  triggers a pause. The site would break at the exact moment it matters, silently.
- **Supabase email signup is on by default.** With a policy scoped `for all to authenticated`,
  any stranger could self-issue that role and gain write access to every table and bucket.
- **Storage "public-read" would publish Raaziq's draft screenshots** the instant they uploaded —
  the one thing §1 is careful about.
- **MDX from a database is not stored XSS; it is server-side code execution.** `next-mdx-remote`
  compiles and evaluates on the server, and MDX supports `import` and arbitrary expressions.
  `rehype-sanitize` runs on the HTML AST *after* evaluation, so v1's claimed mitigation mitigates
  nothing — the exact "quietly wrong" failure this site exists to argue against.
- **Middleware is not an auth boundary** (CVE-2025-29927 skipped middleware entirely below Next
  15.2.3), and a Server Action is a public POST that does not inherit page authorization.
- No revision history, and no free-tier PITR to fall back on — a single account with destructive
  delete on case studies that took hours to write.

### The design

**Custom admin UI in Next.js, with git as the content store.**

- **Content** lives in the repo: `content/projects/*.md`, `content/sections/*.md`,
  `content/site.json`, images in `public/media/`.
- **Auth: GitHub OAuth**, checking `login === 'msaad9632'`. No password to manage, no reset flow,
  no session store — and MFA is GitHub's, already enabled, already recovered-for.
- **Writes** go through the GitHub **Git Trees API** — one commit per save regardless of how many
  files changed. Pushing to `main` triggers Vercel automatically. Publish *is* commit.
- **The admin UI is bespoke**, built with the site's own design tokens, so it feels like his
  product rather than a generic CMS chrome bolted on.

**What this buys, by construction rather than by mitigation:** no database to pause, no RLS, no
storage policies, no signup surface, no session management, no stored-code-execution surface,
infinite free revision history and one-click revert in git, build-time MDX from
version-controlled source (the only safe way to use MDX), and images committed to `/public` where
`next/image` optimises them statically with real intrinsic dimensions.

**Cost:** a publish takes ~60 s of build instead of ~2 s of revalidation. For a portfolio, that
is not a cost. If instant availability-toggling ever matters, that single volatile flag is the
one thing worth putting in a runtime store — and not before he complains.

### Admin capabilities — "every option"

- Projects: create / edit / delete / duplicate, reorder, publish–draft, per-project control of
  whether a repo link renders at all (Raaziq renders none).
- Media: upload, reorder, set cover, edit alt text, **or mark decorative** — required-alt with no
  decorative escape hatch just makes authors type junk that screen readers then announce.
- Copy: every section's heading and body, live preview rendered **server-side through the
  production pipeline** so there is one pipeline and one set of bugs.
- Experience, stack tags, site settings, résumé PDF, OG image.
- **Preview** via Next's cookie-based `draftMode()`. **Not `/?preview=1`** — reading
  `searchParams` in `page.tsx` opts the whole route into dynamic rendering for *every* visitor,
  and a hand-rolled flag can poison the shared cache with draft content.
- **`localStorage` autosave per row.** A long case-study body in a textarea plus an accidental
  navigation is otherwise unrecoverable. ~10 lines, highest-value editor feature here.
- Unsaved-changes guard on navigate-away. Duplicate always lands unpublished with a modified slug.
- **Deploy status that tells the truth.** A Vercel deploy hook returns `PENDING` immediately and
  says nothing about success — v1's `deploy_log` would have recorded success on every deploy
  including broken ones, which fails this site's own thesis. Since publish is now a git push,
  read deployment state from the Vercel API (or a deployment webhook with `x-vercel-signature`
  verification) and show the terminal state plus the build-log URL.
- **A Rollback button.** A failed build never breaks the live site — Vercel keeps serving the last
  good deployment. The real risk is a *successful* build of bad content, and the fix is instant
  rollback: one API call, no build, always works. If only one button existed, this is the one.

### Content format: Markdown, not MDX

Rename `body_mdx` → `body_md`. Pipeline:
`remark-parse → remark-gfm → remark-directive → remark-rehype → rehype-sanitize → toJsxRuntime`.
No eval, no compiler in the server bundle, safe by construction. The case-study bodies need
headings, prose, code blocks, images, links and tables — Markdown covers 100% of it.
`remark-directive` maps `:::decision{n=3}` and `:::callout` to an **allowlist** of components,
which is 95% of why anyone wanted MDX, at ~20 lines and zero eval.

The sanitiser schema must **preserve `alt`, `lang`, `dir`, `scope` and ARIA attributes** — default
allowlists routinely strip ARIA, and a sanitiser that fixes XSS by silently deleting
accessibility metadata is a real and common regression.

**Heading offset:** map `#` → `h2` inside bodies so an author cannot produce two `h1`s or skip a
level.

### Image handling

Uploads go through a route handler that: sniffs magic bytes (PNG/JPEG/WebP/AVIF allowlist),
**rejects SVG outright** (XML that executes script), caps size and dimensions (a 30 KB PNG can
decode to 100k×100k), generates the filename server-side, re-encodes via `sharp` (which strips
EXIF and fixes rotation), and records width/height for the CLS budget. `file.type` and the
extension are attacker-controlled and are not validation.

### Remaining security

- Pin `next >= 15.2.3` (CVE-2025-29927).
- Every route handler and Server Action re-checks the session independently — a Server Action is a
  public POST endpoint invocable directly.
- GitHub token server-side only, never in a client bundle, fine-grained and scoped to the one repo.
- **Nonce-based CSP** via middleware: `script-src 'self' 'nonce-…'; object-src 'none';
  base-uri 'none'; frame-ancestors 'none'`. Also required to hit the Lighthouse
  best-practices target, which now flags a missing CSP.

---

## 7. Stack

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js ≥15.2.3, App Router, TS strict | version floor is a security requirement |
| Styling | Tailwind **v4** + CSS custom properties | pinned; v3/v4 token setups differ entirely |
| 3D | `three`, **named imports only** | §4, §8 |
| Motion | CSS + WAAPI | §4 |
| Content | Markdown via remark/rehype, files in git | §6 |
| Auth | GitHub OAuth | §6 |
| Writes | GitHub Git Trees API (`octokit`) | one commit per save |
| Validation | `zod` — server-only | 8 content types of admin CRUD, hand-rolling is worse |
| Images | `sharp` at build/upload + `next/image` | §6. **Not** a custom `next/image` loader, which bypasses Vercel's optimiser, and **not** Supabase transforms, which are paid-tier only |
| Icons | inline SVG, hand-picked | a package for ~10 glyphs isn't worth a dependency |
| RUM | Vercel Speed Insights | one line, free, and §8 otherwise has no field data |

**Target: under 12 direct dependencies.** Anything beyond this list needs a stated reason.

---

## 8. Budgets and verification

| Metric | Budget |
|---|---|
| LCP (mobile, throttled) | < 1.8 s — realistic now that nothing queries a database at request time |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS on `/`, excl. three | < 120 KB gz *(Next 15 + React 19 baseline is ~90–105 KB — this is tight)* |
| `three` chunk | **< 160 KB gz.** Measured: named imports 132.5 KB, barrel 185.8 KB. `WebGLRenderer` alone is 129.1 KB, so headroom is ~27 KB and **no addon fits** |
| Hero frame time | < 8 ms desktop; **cap the loop at 30 fps on mobile** — halves GPU work and battery, visually identical for slow ambient motion, and turns a budget you'd miss into one you beat |
| rAF while hero off-screen | 0 |

**CI gates, not a phase-10 audit:** three-chunk size check; an assertion that no client chunk
contains the GitHub client or token; the arbitrary-value grep; the accent-pixel-area check.

### Accessibility — restated against the criteria, not against a score

v1 set "Lighthouse 100 a11y" as the gate. Lighthouse would award 100 to a build containing
nearly every defect below. Replaced with a named protocol.

- **Target size:** the conformance floor is **SC 2.5.8 (AA) = 24×24 CSS px**. 44×44 is SC 2.5.5,
  which is **AAA** — v1 stated a AAA number under an AA heading. 44 px applies to standalone
  controls as a self-imposed target; **inline prose links are exempt** per the SC, which matters
  for links inside case-study text.
- **Skip link** — absent from v1 entirely. SC 2.4.1 is **Level A**, and with a floating nav plus a
  full-viewport hero a keyboard user tabs the nav on every page load. One anchor.
- **`scroll-margin-top`** on all focusable targets ≥ nav height. Without it the sticky pill hides
  the focused element — **SC 2.4.11, new in WCAG 2.2, Level AA**, and invisible to automated tools.
- **Canvas is decorative:** `aria-hidden="true"` + `tabindex="-1"` + `pointer-events: none`, no
  text alternative, meaning carried by the visible prose, `h1` first in DOM. Without
  `pointer-events: none` a full-viewport canvas eats the hero CTA; without `tabindex="-1"` a
  focusable canvas inside an `aria-hidden` subtree is a 4.1.2 failure that axe flags.
- **Drag-to-reorder is a WCAG 2.2 SC 2.5.7 (AA) violation** and v1 specified it on five admin
  surfaces. Replace with **Move up / Move down** buttons — satisfies 2.5.7 and 2.1.1, needs no
  drag library, and is *less* code. Real `<input type="file">` behind the upload drop zone.
- **Mobile drawer:** native `<dialog>` — focus trap, Esc, top-layer stacking for free, no JS focus
  library. Plus `aria-expanded`/`aria-controls` on the toggle and body-scroll lock.
- **The admin is in accessibility scope** and gets its own manual pass — it sits behind auth so CI
  will never measure it. Form errors need `aria-describedby` + `aria-invalid` + focus moved to the
  first invalid field. The preview pane must be `aria-live="off"`. The publish result must be
  announced politely — a deploy that silently succeeds or fails is the one interaction where blind
  confirmation matters most.
- **Manual protocol:** keyboard-only pass including admin · NVDA + Firefox on the existing Windows
  machine · VoiceOver iOS for the drawer · **400% zoom reflow at 1280 px** (SC 1.4.10 — this is
  *not* the 320 px width test, and v1 claimed coverage it didn't have) · text-spacing bookmarklet
  (the tight tracking is exactly what clips) · forced-colors, high-risk for a
  `#0A0A0A`-on-`#0A0A0A` design with 1 px hairlines.
- **Architecture diagrams need real text equivalents**, not `alt="architecture diagram"`. They
  already exist: `pipeline.md` has Mermaid flowcharts, the extract README has the ASCII ladder,
  Raaziq's README has the ASCII adapter chain. Render the diagram with the ASCII as the accessible
  description in a `<details>` — which also serves sighted mobile users.

*Worth noting: Raaziq's own design system is documented as "light + dark, both WCAG AA-checked."
The portfolio should not ship a palette weaker than the project it showcases — which v1 did.*

---

## 9. Beating the benchmark

| Benchmark | This site |
|---|---|
| `0+ / 0+ / 0%` counters that never populate | Four real figures, each traceable to a repo, rendered as prose |
| Fake terminal (`arkhan@portfolio $ ls`) for skills | Banned by the brief. Mono type only where it means something |
| Project grid + filter chips | Asymmetric case studies + real detail pages |
| Empty "what I've been building lately" | Section removed; evidence moved into the case studies |
| "Let's build something people remember." | A closing line that says what he wants to be sent |
| GCSE / O-Level rows | Cut. Degree in progress, one line |
| About written in adjectives | About written in decisions |
| Client marketing sites as the spine | Systems with documented failure modes as the spine |
| No real employment shown | AI/ML Intern, KnevaTech — verified |

---

## 10. Agency agents

Reviewed v1: `design-ux-architect`, `design-ui-designer`, `design-brand-guardian`,
`design-ui-finish-gate-reviewer`, `engineering-software-architect`,
`engineering-frontend-developer`, `game-development/technical-artist`,
`testing-performance-benchmarker`, `engineering-backend-architect`, `engineering-cms-developer`,
`engineering-identity-access-engineer`, `security-appsec-engineer`, `testing-reality-checker`,
`testing-accessibility-auditor`.

Build phase ownership: UX architect (IA) · UI designer (tokens, components) · frontend developer
(components, motion) · technical artist (shader, LOD) · cms-developer (admin UX) ·
identity-access + appsec (auth, CSP, upload) · brand guardian and ui-finish-gate (polish gate) ·
performance-benchmarker and accessibility-auditor (release gate).

**`testing-reality-checker` holds veto on copy.** It caught one overstated statistic and two
mis-cited hero clauses in v1, and the plan before that invented an entire project. Nothing ships
without a source.

---

## 11. Phases

| # | Phase | Est |
|---|---|---|
| 0 | **DineSync README** written from `backend/db.js`, so its case study has a source at all | 1 h |
| 1 | Assets: Raaziq run + capture, DineSync capture, ledger pull, extract regenerate, ASL copy, photo from Saad, `sharp` pipeline | 3–4 h |
| 2 | Foundation: repo, Next 15.2.3+, full token layer, type scale, base components, Vercel skeleton | 4 h |
| 3 | **Copy first — write the `extract` case study in full** before any case-study layout exists | 3 h |
| 4 | Hero 3D: geometry, instanced line shader, packet attributes, CPU state machine, tap-to-fail, caption, watchdog, lifecycle, reduced motion | 6 h |
| 5 | Shell: nav pill + scroll state, `<dialog>` drawer, skip link, footer, reveal system | 3 h |
| 6 | Work: case-study section, `/work/[slug]`, Markdown pipeline, media, diagrams | 5 h |
| 7 | Remaining sections: incidents, about, experience, contact | 3 h |
| 8 | Remaining copy: four case studies, about, microcopy — Saad reviews every claim | 4 h |
| 9 | Admin: GitHub OAuth, Trees API writes, content CRUD, move up/down, autosave, draft mode, deploy status, rollback | 9 h |
| 10 | Responsive + accessibility: 8 breakpoints, manual protocol in §8, admin pass | 4 h |
| 11 | Performance: budgets, bundle analysis, Lighthouse, Speed Insights | 2.5 h |
| 12 | Ship: Vercel project, env, OG per case study, favicon, sitemap, robots, live verification | 2 h |

**~49 h.** Phase 3 moving before phase 6 is deliberate: this content is long and irregular, and
layouts built against placeholder text get rebuilt when the real text arrives.

*(The original Hermes estimate was 13.5 h, before the admin panel, detail pages and asset capture
existed.)*

---

## 12. Open items — resolved 2026-08-11

1. **Profile photo** — deferred. Saad will supply the path later. Build proceeds with a
   placeholder aspect-ratio box in the About section (§3) until it lands; nothing else blocks.
2. **QuickSign live URL — confirmed: `https://aslgame.vercel.app/`.** Not `quicksign.app` (that
   was only a schema `$id`, not a deployment). Use `aslgame.vercel.app` as the live link.
3. **DineSync — full case study, leaner than the other three.** Phase 0 writes its README from
   `backend/db.js` first, which gives it a real source (the Windows ODBC / Linux serverless
   constraint is a genuine engineering decision). It gets a `/work/[slug]` page like the others,
   but shorter — one architecture decision (the dual-backend split) rather than the extract
   service's five-decision depth, since that's what the evidence actually supports.
4. **Vercel subdomain — `msaad`.** Project name `msaad`, deploy target `msaad.vercel.app`
   (confirm availability at Phase 12; fall back to `msaad-portfolio` if taken).
5. **Raaziq capture** — proceeding with the local SQLite-backed run per §1's media plan; no
   objection raised.
