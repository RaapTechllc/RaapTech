---
version: alpha
name: RaapTech
description: >-
  Industrial neo-brutalist identity for RaapTech LLC — Autodesk Fabrication
  consulting and AI onboarding for sheet metal & MEP contractors. Warm concrete
  canvas, black structural ink, electric hazard-orange signature. Built, not bought.
colors:
  ink: "#0B0B0C"
  paper: "#EDE9E0"
  concrete: "#DBD6CA"
  steel: "#57544C"
  hazard: "#FF4D00"
  signal: "#1453FF"
  volt: "#C8FF00"
  paper-dim: "#9B978C"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 0.95
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 500
    letterSpacing: "0.08em"
  display-2xl:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(3rem, 9vw, 8rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-xl:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.1
  label:
    fontFamily: "{typography.mono.fontFamily}"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.18em"
  body-lg:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)"
    lineHeight: 1.55
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  section: "6rem"
  section-lg: "8rem"
  border: "2px"
  border-bold: "3px"
components:
  button-primary:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2rem"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1rem"
---

# RaapTech — DESIGN.md

> The single source of truth for RaapTech's visual identity. Machine-readable
> tokens live in the YAML front matter; the rationale and rules live below.
> If code and this file disagree, this file wins — update code, not the brand.

## Overview

RaapTech sits at an unusual intersection: 20 years of hands-on Autodesk
Fabrication trade work **and** modern AI tooling, sold to sheet-metal and MEP
contractors who build real things. The brand has to read as **credible on a
shop floor and fluent in software** at the same time.

The identity is **industrial neo-brutalism**: the visual language of shop
drawings, safety signage, and steel — made confident and a little loud.

- **Personality:** Built-not-bought. Direct. Engineered. No fluff, no fog of
  buzzwords. Speaks plainly, shows the structure, owns the hard edges.
- **Emotional intent:** Trust through competence. The site should feel like a
  precise field manual, not a glossy SaaS landing page.
- **Signature move:** Warm concrete "paper" canvas + black structural ink +
  one electric **hazard-orange** accent, with hard offset shadows and heavy
  2px borders. Sections alternate light (paper) and inverted (ink) for rhythm.
- **Hero photography:** The home first viewport is a full-bleed shop-floor
  photograph with a flat ink scrim (no soft gradient depth). Brand wordmark
  sits at hero scale; one headline, one sentence, one CTA group. Spec chrome
  is a thin status strip — not a floating card over the image.
- **Motion:** Machinery language — stamp reveals, rule-draw dividers, stepped
  odometer counters. CSS/`IntersectionObserver` only; `prefers-reduced-motion`
  gets the fully assembled page.

## Colors

The palette is deliberately small and high-contrast. Color is structural, not
decorative — use it to direct attention, never to fill space.

| Token | Hex | Role |
|-------|-----|------|
| `ink` | `#0B0B0C` | Primary text on light; background of inverted sections; all borders. |
| `paper` | `#EDE9E0` | Primary background — warm concrete. The default canvas. |
| `concrete` | `#DBD6CA` | Secondary surface / cards on paper; subtle fills. |
| `steel` | `#57544C` | Secondary / muted text on paper. |
| `hazard` | `#FF4D00` | **Signature accent.** Primary CTAs, emphasis, key numbers. Use boldly but sparingly. |
| `signal` | `#1453FF` | Electric blue. Technical accents, links, data highlights. The "software" counterpoint to hazard's "trade". |
| `volt` | `#C8FF00` | Acid lime. **Live/active status only** (pulse dots, "available" tags). Never body color. |
| `paper-dim` | `#9B978C` | Muted text **on ink** (inverted) sections. |
| `white` | `#FFFFFF` | Reserved; rare. Most "white" is `paper`. |

**Semantic roles**
- On `paper`: text = `ink`, muted = `steel`, borders = `ink`.
- On `ink` (inverted sections): text = `paper`, muted = `paper-dim`, accents stay `hazard`/`signal`/`volt`.
- Accent budget per viewport: ~1 `hazard` focal point, `signal` for technical labels/links, `volt` only for a live indicator.

## Typography

Three families, each with one job. Contrast between huge geometric display and
quiet monospace labels is the core of the type system.

- **Display — Space Grotesk (700):** All headlines and big numbers. Set tight
  (`line-height` ~1.05, negative tracking) — tight enough to feel structural,
  loose enough that `.highlight` hazard stamps don't collide with the line
  above. Go large — `display-2xl` is meant to feel oversized and structural.
  Sentence case for headlines; UPPERCASE is reserved for labels.
- **Body — Inter (400):** All running prose. `body-lg` for hero/intro
  paragraphs, `body` for everything else. Max measure ~`max-w-2xl`.
- **Mono — JetBrains Mono (500):** Labels, eyebrows, stats captions, data
  rows, "terminal" UI, section numbers. UPPERCASE, wide tracking (`0.18em`).
  This is the texture that signals "technical".

Type scale tokens: `display-2xl`, `display-xl`, `h2`, `h3`, `label`, `body-lg`.
Use the fluid `clamp()` sizes — do not hand-pick arbitrary font sizes.

## Layout

- **Container:** `max-w-7xl` centered, `px-6` gutters. Content rarely exceeds
  this; full-bleed color blocks may, but their content stays in the container.
- **Grid & structure:** Show the structure. Use visible 2px `ink` dividers
  between sections and between grid cells (e.g. `gap-[2px] bg-ink` grids where
  cells are `paper`). Oversized mono section numbers (`01 / 02 / 03`) anchor
  sections.
- **Rhythm:** Alternate `paper` and inverted `ink` sections down the page so
  scrolling has a beat. The hero is typically inverted (`ink`) for drama; the
  next section flips to `paper`.
- **Spacing:** Section padding `section` (6rem) / `section-lg` (8rem). Be
  generous vertically, tight and structural horizontally.

## Elevation & Depth

Depth is **flat + hard**. No soft blurred shadows, no gradients-as-depth.

- **Hard offset shadow** is the only elevation primitive: a solid, un-blurred
  shadow offset down-right. `shadow-hard` = `6px 6px 0 0 {colors.ink}`;
  `shadow-hard-sm` = `4px 4px 0 0 {colors.ink}`. On ink sections, shadow color
  flips to `paper` (`shadow-hard-paper`) or `hazard` for emphasis.
- **Interaction:** elements with a hard shadow "press" on hover — translate by
  the shadow offset and drop the shadow (`hover:translate-x-[6px]
  hover:translate-y-[6px] hover:shadow-none`). This is the primary hover motif.
- Borders carry hierarchy more than shadow. 2px `ink` is the default;
  `border-bold` (3px) for hero/feature emphasis.

## Shapes

- **Corners are square. Always.** `rounded.none` (0px) everywhere. The only
  exception is `rounded.full` for true circles (status dots, the logo mark if
  circular, avatars). No `rounded-md`, no `rounded-lg`, ever.
- Shape language is rectangles, hairline/2px rules, and right-angle "bracket"
  motifs. Think drawing sheets and steel plate, not pills and bubbles.
- Iconography: thin (1.5px) line icons with **square** linecaps/linejoins
  (`strokeLinecap="square"`), matching the hard-edged system. No rounded icons.

## Components

- **button-primary:** `hazard` fill, `ink` text, 2px `ink` border, `shadow-hard`,
  `label` typography (mono, uppercase, wide tracking). Hover = press
  (translate + shadow none). The one loud CTA per view.
- **button-secondary:** `paper` fill, `ink` text + 2px `ink` border,
  `shadow-hard`; hover inverts to `ink`/`paper`. On ink sections, use the
  inverted variant (`paper` border/text, transparent fill).
- **card:** `paper`/`concrete` fill, 2px `ink` border, optional `shadow-hard`.
  Cards in a grid sit on a 2px `ink` gap so the grid lines read as structure.
- **tag / eyebrow:** mono `label`, UPPERCASE; either `hazard` text with a
  leading 2px rule, or a boxed `border` chip. Anchors every section.
- **stat:** oversized Space Grotesk number in `hazard` or `ink`, mono caption
  beneath.
- **input / select / textarea:** `paper` fill, 2px `ink` border, square; focus
  → 2px `hazard` border (no glow). `label` is mono uppercase above the field.
- **nav:** fixed top bar, `paper` with a 2px `ink` bottom border; active link
  marked with `hazard`. Square logo tile in `hazard`/`ink`.
- **section number:** giant mono `01`–`0n` in `concrete`/`paper-dim` as a
  structural watermark.

## Do's and Don'ts

**Do**
- Keep the canvas calm so one `hazard` element can shout.
- Show structure: borders, grid lines, section numbers, alternating ink/paper.
- Use mono labels liberally for technical texture; keep prose in Inter.
- Make interactions physical — the hard-shadow "press" on hover/active.
- Go big on display type. Oversized is on-brand.

**Don't**
- No rounded corners (except true circles), no soft/blurred shadows, no
  gradients used as depth, no glassmorphism.
- Don't introduce new accent colors. Three accents (`hazard`/`signal`/`volt`)
  is the whole budget; `volt` is status-only.
- Don't set display type in Inter or body prose in Space Grotesk — keep each
  family in its lane.
- Don't center long-form paragraphs or let measure exceed ~`max-w-2xl`.
- Don't name AI vendors in copy; say "AI assistant / AI tools" generically.
