# Implementation Plan — "Cinematic Flow" (reference concept #12)

Goal: replicate the **art direction** of concept #12 exactly — composition,
proportion, material, lighting, motion. Copy and project content are Saad's own
and deliberately differ from the reference image.

---

## Rejected from the source spec (with reasons)

| Spec item | Verdict | Reason |
|---|---|---|
| Project "OmniRoute" | **Dropped** | Not a real project. The reference image invented it alongside "Period Tracker" and "Data Scraper". Only QuickSign in that image is real. Shipping it would have put a fabricated project on the site. |
| React Three Fiber + drei | **Rejected** | Scene is one mesh, one material, one camera. All animation lives in uniforms driven by a rAF loop — spec §18 itself requires bypassing React for pointer input. R3F's value is a reconciler for a React-managed object tree; here it would cost ~50KB gz and then be routed around. Raw `three`, already installed. |
| Fullscreen fragment shader | **Rejected** | Produces smoke — flat, no specular, no surface. #12 is a *lit* surface where light rakes across ridges. Requires real geometry, real normals, real specular. |
| GSAP + ScrollTrigger | **Rejected** | ~50KB to do what feeding one scroll-progress float into uniforms does natively. |
| Lenis smooth scroll | **Rejected** | Hijacks native scroll, fights trackpad momentum, accessibility regression. |
| Custom cursor | **Rejected** | Hiding the native cursor is an a11y regression and is the loudest "generic AI portfolio" tell — the exact thing spec §21 asks to check for. |
| Separate "Incidents" section | **Dropped** | Spec §11 defines four sections. The incident stories are folded into each project's description instead. |
| "CODE. CREATE. IMPACT." | **Kept as specified** | Noted as the one generic line on an otherwise evidence-backed site; recommend swapping for the real headline later. |

---

## The surface — technical approach

**Geometry.** `PlaneGeometry(64, 44, 210, 150)` desktop / `110×80` mobile.
Deliberately overruns the viewport on all sides — a sheet whose edges you can
see reads as an *object*; one that runs past frame reads as an *environment*.

**Displacement.** Vertex shader, ridged noise `1 - |snoise|`. The absolute-value
fold is the entire difference between fabric creases and rolling dunes — plain
fbm cannot produce a crease.

**Anisotropy is the silk.** The noise domain is rotated ~30° and then scaled
unevenly (`x * 0.115`, `y * 0.028`). Compressing one axis and stretching the
other converts isotropic blobs into long parallel creases running the length of
the sheet. Isotropic noise at any frequency produces gravel, not silk.

**Normals.** Finite differences: three height samples per vertex, build the
tangent frame, cross product. Without real normals a displaced plane renders
flat regardless of displacement quality.

**Lighting.** Hand-rolled Blinn-Phong + Fresnel rim. Dark base albedo, one cool
key light, restrained cool rim. No environment map — a dark scene with two
analytic terms is cheaper and more controllable than an HDRI here.

**Compositing.** Blends toward the background colour instead of using alpha, so
the self-overlapping sheet depth-sorts correctly with no transparency artifacts,
and its rectangular boundary dissolves invisibly.

**Right-side composition.** Enforced in screen space (`gl_FragCoord.x / uRes.x`),
not by 3D placement — guarantees the left 20% stays clear for typography at every
viewport size regardless of camera or mesh transform.

---

## Interaction

**Pointer.** Raycast to the sheet's base plane, convert the hit to plane-local
coordinates, damp at `0.035` per frame. Heavy damping is the point: the sheet
trails the cursor with inertia and settles, rather than tracking 1:1. Damped
pointer *velocity* feeds displacement strength, so a fast flick deforms harder
than a slow drift. Camera drifts a fraction of cursor travel for parallax.

**Scroll.** Five keyframes over document progress, smoothstep-interpolated into
`uAmp` / `uStretch` / `uRibbon` / `uFade`: hero full → work thins and stretches →
about splits into ribbons → experience calms → contact sinks into darkness. The
same surface restated per section, never swapped, so the page stays one
environment.

**Performance.** No React state in the render loop. Pixel ratio capped (2
desktop / 1.5 mobile), ~30fps cap and halved tessellation on mobile, paused on
tab hide, `webglcontextlost` handled, full disposal on unmount.
`prefers-reduced-motion` renders one static frame and never starts the loop.
WebGL absent → constructor throws, component returns, page keeps its flat dark
background.

---

## Verification method

The browser preview pane in this session will not composite frames reliably, so
visual checks are done by `gl.readPixels` on the live canvas: luminance
histogram (are there real highlights?) and a left-to-right column profile (is the
sheet on the correct side, is the left clear?). More rigorous than eyeballing a
screenshot.

**Targets:** `maxLum` ≥ 150 (ridges genuinely catch light), left three columns
markedly darker than the right five (composition correct), mean luminance low
(the frame stays predominantly black).
