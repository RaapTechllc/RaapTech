# RaapTech — Next-Level Redesign Proposal

> **Status:** Proposal — no code in this document has been implemented.
> **Relationship to `DESIGN.md`:** `DESIGN.md` remains the brand's source of
> truth. Nothing here replaces the industrial neo-brutalist identity; this
> document proposes how to push it further and how to execute that push on the
> site. Where a proposal would change a brand rule, that is called out
> explicitly and would require a `DESIGN.md` revision first.
> **Scope:** the marketing site in `src/` (Next.js 15 App Router, Tailwind 3,
> zero runtime UI dependencies).

---

## 1. Where the site stands

The rebrand shipped a disciplined system. Before proposing more, credit what
already works — these are load-bearing and must survive any redesign:

**Working well**

- **Token discipline.** One palette (`ink`/`paper`/`concrete`/`steel` +
  `hazard`/`signal`/`volt`), defined once in `tailwind.config.ts`, mirrored in
  `DESIGN.md` front matter. No stray hex values in pages.
- **The hard-shadow system.** `shadow-hard` + the "press" hover (translate by
  the shadow offset, drop the shadow) is a genuine signature. Buttons and
  `.card-pop` feel physical.
- **Mono texture.** JetBrains Mono eyebrows, spec panels, and stat captions
  read as "technical" without saying it.
- **Page rhythm.** Alternating ink/paper sections with 2px structural borders
  gives scrolling a beat.
- **Fundamentals.** Self-hosted fonts (offline builds), `prefers-reduced-motion`
  handling in `globals.css`, per-page metadata, a build-time OG image
  (`src/app/opengraph-image.tsx`), Vitest suite with enforced coverage
  thresholds.

**Gaps**

| Gap | Where | Why it matters |
|-----|-------|----------------|
| The site is static. All motion is a marquee, a pulse dot, and hover presses. Nothing responds to scroll; pages appear fully formed. | site-wide | "Built, not bought" should feel engineered in motion, not just in layout. |
| Projects is a placeholder. | `src/app/projects/page.tsx` | For a consultancy, proof is the highest-value pixel on the site. A "coming soon" page is a hole in the sales argument. |
| The contact form is simulated. `ContactForm.tsx` fakes success with a 1.2s `setTimeout`. | `src/components/ContactForm.tsx` | A lead who submits the form goes nowhere. This is the single most consequential defect on the site. |
| No `sitemap.ts` / `robots.ts`. Robots directives exist only in metadata. | `src/app/` | Cheap SEO wins left on the table. |
| One shared icon. `ArrowRight` in `src/components/icons.tsx`; every other icon is inlined per page. | `src/components/icons.tsx` | Inlined SVGs drift in stroke weight and linecap style over time. |
| Heroes are near-identical. Every page opens with the same inverted-ink hero + `grid-backdrop`. | all 5 pages | The pattern is right; the sameness makes pages 2–5 feel templated. |

---

## 2. Principles for the next level

Three rules govern every proposal below.

### 2.1 Motion as machinery

When this site moves, it should move like equipment: **stepped, snapped,
deliberate**. No floaty ease-in-out fades, no parallax drift, no spring
physics. Reveals snap into place. Counters tick in discrete steps like a
mechanical odometer. The typing effect uses a hard block cursor, not a fade.
If an animation would look at home on a SaaS template, it's wrong here.

Implementation posture: **CSS first** (scroll-driven animations,
`@keyframes` with `steps()`), a small `IntersectionObserver` hook second,
animation libraries never. The site currently ships zero runtime UI
dependencies; keep it that way.

### 2.2 Structure becomes interactive

The brand already *shows* structure — 2px borders, grid backdrops, giant
section numbers. Next level: structure *responds*. Grid lines draw themselves
in as a section enters the viewport. Section numbers count up. The spec panel
boots like a terminal. The user should feel the page being assembled, the way
a drawing sheet gets built up layer by layer.

### 2.3 Proof over polish

The highest-leverage redesign work isn't visual — it's turning `/projects`
from a placeholder into evidence and making the contact form actually deliver
leads. Motion and art direction serve the sales argument; they don't replace
it. Phasing below reflects this: plumbing before choreography.

---

## 3. Visual & interaction upgrades

### 3.1 Scroll choreography (site-wide)

A small motion vocabulary, applied consistently:

- **Rule-draw.** Section 2px dividers and card-grid gap lines scale from
  0 → 100% width as they enter the viewport (`transform: scaleX`, snapped
  easing). One-time, ~300ms, origin-left. This is the "drafting the sheet"
  moment.
- **Odometer stats.** Numbers in the stats grid (`src/app/page.tsx` `stats`)
  and the About timeline years tick up in discrete steps when scrolled into
  view — `steps()` timing or a counter in the observer hook. Never a smooth
  tween.
- **Stamp reveal.** Cards and giant `.section-number` watermarks appear with a
  single hard step: one frame offset 6px down-right with the shadow detached,
  next frame seated. Like a stamp hitting paper. No opacity fade longer than
  ~150ms.
- **Sticky spec rail.** On long pages (Services, About), the mono spec panel
  pattern becomes a `position: sticky` side rail whose rows update per section
  (e.g. `section: 02 / ai_onboarding`) — the page reads like a drawing sheet
  with a live title block.

Mechanics: prefer CSS scroll-driven animations (`animation-timeline: view()`)
with an `IntersectionObserver` fallback packaged as one small hook —
`src/lib/useInView.ts` (new). All of it gated behind the existing
`prefers-reduced-motion` block in `src/app/globals.css`: reduced-motion users
get the fully-assembled page, no exceptions. Server components stay server
components; only leaf nodes that animate become client components.

### 3.2 Hero upgrades (home first, pattern for all pages)

- **Terminal boot for the spec panel.** The `raaptech.status` panel in
  `src/app/page.tsx` types its rows on first view: keys appear instantly,
  values type at ~30ms/char with a block cursor, the `volt` status line lands
  last. One pass, never loops. Reduced motion → static panel.
- **Kinetic headline, restrained.** The `display-2xl` headline reveals per
  line with the stamp motif (hard step, top line first). No per-letter
  animation — at this size, line-level is louder and cheaper.
- **Hero differentiation.** Keep the inverted-ink hero pattern but give each
  page one distinguishing structural element: home keeps the spec panel; About
  gets a "personnel record" card (photo slot + mono data rows); Services gets
  a two-row "scope of work" index that anchors to sections 01/02; Projects
  gets a drawing-sheet title block (see 3.4); Contact keeps the response-time
  badge but adds a live clock row (`local_time`, mono, ticking).

### 3.3 Micro-interactions

- **Directional press.** Today every `.btn` and `.card-pop` presses down-right
  regardless of cursor. Upgrade: press *away from the cursor entry edge*
  (enter from the left → element presses right). Small JS on pointerenter, or
  keep as-is where it's not worth a client component — this is a
  nice-to-have, flagged as such in the roadmap.
- **Marquee interaction.** Keep `marquee-pause` on hover, and invert the
  hovered term (`ink` chip on `hazard` band) so pausing has a visible reason.
- **Blueprint hover on cards.** On `.card-pop` hover, a hairline blueprint
  grid (the `grid-backdrop` treatment at card scale, `ink` at ~6% opacity)
  fades in behind the content. Reads as "look under the surface."
- **Link underlines.** Prose links get a 2px underline that thickens to 3px
  on hover — square, structural, no color transition tricks.

### 3.4 New signature components

- **Drawing-sheet case-study frame** (the Projects centerpiece). Each case
  study renders inside a border treatment modeled on a fabrication drawing
  sheet: 2px `ink` outer frame, mono title block bottom-right (`project /
  client_type / scope / rev / date`), tick marks on the frame edges. This is
  the single strongest opportunity to make the brand literal instead of
  metaphorical.
- **Data-strip.** A full-width one-row strip of mono key/value pairs separated
  by 2px rules (`hours_saved: 120/yr · scope: ESTmep · crew: 14`). Used for
  case-study summaries and the Services pricing rows.
- **Before/after slider.** For case studies with a visual (a cleaned-up
  database table, a rebuilt template): two panels with a draggable 2px
  `hazard` divider, square handle. Client component, keyboard-accessible
  (arrow keys move the divider).
- **Logo/credential strip.** A bordered horizontal band of client logos or —
  more honest at 4 clients — credential chips (`AUTODESK FABRICATION · 20 YRS`,
  `MEP / SHEET METAL`, `ON-SITE DAILY`) in the boxed-chip eyebrow style.

### 3.5 Iconography

Grow `src/components/icons.tsx` from one icon into the site's full set
(~10–12: arrow, grid/sheet, duct, database, wrench, terminal, clock, check,
mail, pin, menu/close). Enforce the existing rules in one place: 1.5px
stroke, `strokeLinecap="square"`, `strokeLinejoin` miter, 24px grid. Then
delete every per-page inline SVG (`src/app/page.tsx` features,
services/about/contact equivalents) and import from the set. This is a pure
consolidation — no visual change intended.

### 3.6 Non-goals (unchanged brand law)

Restating `DESIGN.md` rules this redesign must not violate:

- No rounded corners (circles excepted). No soft/blurred shadows. No
  gradients-as-depth. No glassmorphism.
- No new accent colors. `hazard` budget stays ~1 focal point per viewport;
  `volt` stays status-only.
- No animation/UI libraries. No parallax, no scroll-jacking, no
  smooth-scroll hijack beyond the existing `scroll-behavior`.
- No AI vendor names in copy.
- Display type stays Space Grotesk; prose stays Inter; labels stay mono.

---

## 4. Page-by-page

### `/` — Home (`src/app/page.tsx`)

- Hero: terminal-boot spec panel + line-stamp headline (3.2).
- Stats grid: odometer counters (3.1). Revisit the numbers themselves —
  "4 Active Clients" and "2023 Founded" are honest but weak as brags; consider
  `hours on shop floor`, `databases maintained`, `response < 24h` where a real
  number exists (see 5.2 on provenance).
- Add one section between Features and CTA: **"Recent work"** — two
  drawing-sheet case-study teasers pulled from Projects, replacing nothing.
- Marquee: hover-invert (3.3).

### `/about` (`src/app/about/page.tsx`)

- Hero: personnel-record card variant (3.2).
- Timeline: the giant year numbers get the odometer treatment; each entry's
  rule draws in on scroll. Add a `hazard` "you are here" marker on the final
  entry.
- Principles cards: blueprint hover (3.3).

### `/services` (`src/app/services/page.tsx`)

- Sticky spec rail tracking sections 01/02 (3.1).
- Pricing notes become data-strips (3.4) — scope/deliverables/cadence as
  scannable mono rows instead of prose.
- Each service gets a 3-step "how an engagement runs" row (mono step numbers,
  2px connectors): assess → configure → train. Buyers of consulting want the
  shape of the engagement, not just the scope list.

### `/projects` (`src/app/projects/page.tsx`) — the biggest lift

Replace the placeholder with a real case-study system:

- `src/lib/projects.ts` (new): typed array of case studies — slug, title,
  client type (anonymized: "Midwest sheet-metal contractor, ~50 shop"),
  problem, intervention, result metrics, optional before/after asset.
- Index page: drawing-sheet frames (3.4) in the 2px-gap grid.
- Detail route `src/app/projects/[slug]/page.tsx` (new): title block header,
  problem → intervention → result sections with a data-strip of metrics,
  before/after slider where an asset exists, CTA.
- Until real write-ups exist, ship 2–3 anonymized studies from actual client
  work — anonymized beats absent, and the structure is ready for named studies
  later.

### `/contact` (`src/app/contact/page.tsx`)

- Wire the form for real (see 6.1). Keep the existing `FormState` machine and
  volt success panel — they're right; only the fake `setTimeout` goes.
- Success panel gains a mono "ticket" summary (`received / will respond by`)
  to reinforce the <24h promise.
- Add `mailto:` fallback messaging on the error state so a failed POST never
  strands a lead.

---

## 5. Content & proof strategy

### 5.1 Case-study format

Fixed three-beat structure, enforced by the `projects.ts` type:

1. **Problem** — the shop's situation, in trade language, 2–3 sentences.
2. **Intervention** — what RaapTech actually did, named tools (CADmep/ESTmep/
   CAMduct are fine; AI tooling stays generic per brand rule).
3. **Result** — numbers or nothing. Hours saved, error rate, turnaround time.
   If a number can't be stood behind, the study says what changed
   qualitatively and skips the metric row rather than inflating.

### 5.2 Stat provenance

Every number displayed anywhere on the site must trace to something real.
Add a maintainers' note (comment in `src/lib/projects.ts` or a short
`docs/CONTENT.md`) recording where each figure comes from and when it was
last verified. A brand built on "no fog of buzzwords" cannot ship decorative
statistics.

### 5.3 Voice

The de-slop pass set the bar; hold it. Concretely: no "seamless/robust/
elevate/unlock", no "it's not just X, it's Y" constructions, no rule-of-three
padding. Sentences a foreman would say out loud. New copy written for this
redesign gets checked against the same standard before merge.

---

## 6. Technical upgrades

### 6.1 Contact form backend (highest priority in the whole doc)

Two viable paths; pick one at implementation time:

- **Route handler + email API** (recommended): `src/app/api/contact/route.ts`
  validating the payload and sending via a transactional email provider
  (Resend/Postmark-class; one small SDK or a plain `fetch` to their REST API —
  the plain-fetch option preserves the zero-dependency posture). Needs one
  secret in Vercel env. Add honeypot field + submission-time check for spam;
  no CAPTCHA — hostile to the audience and the aesthetic.
- **Form relay service** (fallback): point the existing form at a
  Formspree-class endpoint. Zero code beyond the URL, but adds a third-party
  dependency and their branding/limits.

Either way `ContactForm.tsx`'s state machine stays; tests in
`ContactForm.test.tsx` extend to mock the POST (success + failure paths).

### 6.2 SEO plumbing

- `src/app/sitemap.ts` and `src/app/robots.ts` (metadata routes) — trivial,
  ship first.
- JSON-LD (`ProfessionalService` + `Person` for Kyle) injected from
  `layout.tsx`.
- Per-case-study OG images once `[slug]` routes exist, reusing the
  `opengraph-image.tsx` pattern.

### 6.3 View transitions

Route changes get a brand-consistent cut using the View Transitions API
(Next.js experimental `viewTransition` flag, or a plain
`::view-transition-*` CSS treatment): a hard horizontal wipe — a 2px `ink`
rule sweeps across, new page snaps in behind it. Progressive enhancement;
browsers without support get the normal instant navigation. Gated behind
reduced-motion like everything else.

### 6.4 Housekeeping

- **Analytics-lite:** if wanted at all, a privacy-respecting, script-light
  option (Vercel Analytics or Plausible-class). No cookie banner burden.
- **Images:** case-study assets through `next/image`, AVIF/WebP, explicit
  dimensions. The site currently ships no content images; the Projects
  buildout is when this starts mattering.
- **Repo hygiene (flag, decide separately):** `CC/` and `CURSOR PROJECTS/`
  are unrelated projects living in the site repo. Recommend extracting them,
  but that's outside this redesign's scope.

---

## 7. Phased roadmap

Ordered by leverage, not by visual excitement. Each phase is independently
shippable.

| Phase | Contents | Files touched (primary) | Effort |
|-------|----------|------------------------|--------|
| **1 — Plumbing & proof foundations** | Real contact backend (6.1); `sitemap.ts` + `robots.ts` + JSON-LD (6.2); icon set consolidation (3.5) | `src/app/api/contact/route.ts` (new), `src/components/ContactForm.tsx`, `src/app/sitemap.ts` (new), `src/app/robots.ts` (new), `src/components/icons.tsx`, all 5 pages (icon imports) | S–M |
| **2 — Motion system** | `useInView` hook; rule-draw, odometer, stamp-reveal primitives; hero terminal boot + headline stamps; marquee hover-invert | `src/lib/useInView.ts` (new), `src/app/globals.css`, `tailwind.config.ts` (keyframes), `src/app/page.tsx`, hero sections of other pages | M |
| **3 — Projects buildout** | `projects.ts` data model; index redesign with drawing-sheet frames; `[slug]` detail route; data-strip + before/after components; home "Recent work" section; 2–3 anonymized studies | `src/lib/projects.ts` (new), `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` (new), `src/components/` (new components), `src/app/page.tsx` | L |
| **4 — Polish** | Sticky spec rail; page-specific hero variants; view transitions; blueprint hovers; directional press (optional); per-study OG images | `src/app/services/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `next.config.ts`, `globals.css` | M |

Each phase lands with its tests (see 8) and a `DESIGN.md` update only if it
introduces a new reusable pattern (drawing-sheet frame, data-strip, and the
motion vocabulary belong in `DESIGN.md` once they exist).

---

## 8. Success criteria

- **Performance:** Lighthouse ≥ 95 across the board on `/` and `/projects`
  after Phase 3; CLS = 0 (stamp reveals must reserve layout — animate
  transform/opacity only, never geometry); JS added across all phases stays
  small — no runtime animation/UI dependencies.
- **Accessibility:** reduced-motion parity is a merge blocker — every effect
  in §3 has a static fallback verified by toggling
  `prefers-reduced-motion`. Contrast unchanged (palette untouched).
  Before/after slider and mobile nav fully keyboard-operable.
- **Tests:** extend the existing Vitest suite per phase — `ContactForm`
  POST success/failure with mocked fetch; `projects.ts` data validation
  (every study has slug/problem/intervention/result); page smoke tests for
  the `[slug]` route; `useInView` hook behavior. Coverage thresholds in
  `vitest.config.ts` (90/85/70) stay enforced and passing.
- **Proof:** the real success metric — `/projects` shows at least two case
  studies with defensible numbers, and a form submission reaches an inbox.

---

*Prepared as the deliverable of branch `claude/fable-redesign-docs-6jyd2r`.
Implementation happens in follow-up branches, one phase per PR.*
