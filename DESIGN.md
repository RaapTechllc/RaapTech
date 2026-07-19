---
version: 1.0
name: RaapTech
description: >-
  Industrial-editorial identity for RaapTech LLC — Autodesk Fabrication
  database consultancy for MEP contractors and sheet metal fabrication shops.
  Strict black/white/gray. Big type, sharp rules, proof over polish.
colors:
  ink: "#000000"
  paper: "#FFFFFF"
  gray-1: "#333333"
  gray-2: "#666666"
  gray-3: "#CCCCCC"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 1.05
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
  border: "2px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
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

RaapTech is a Chicago-based Autodesk Fabrication database consultancy for MEP
contractors and sheet metal fabrication shops. The visitor is a shop owner or
operations manager who rose through the trades — 45–60, union background,
tech-skeptical. They distrust slick marketing and trust proof, numbers, and
someone who has clearly run a shop floor.

The identity is **industrial-editorial**: sharp rules and dividers, big type,
grayscale photography, monospace touches for numbers and data. **Strictly
black, white, and gray.** Strong whitespace is the brand — never cram.

- **Personality:** Tradesman-credible. Direct. Proof over polish. Short,
  punchy sentences; big claims with numbers.
- **Emotional intent:** Trust through competence — a precise field manual,
  not a glossy SaaS landing page.
- **Hero photography:** Full-bleed shop-floor photograph, **grayscale-treated
  (mandatory on all photos)**, with a flat ink scrim for readable type. One
  headline, one sentence, one CTA. No carousel, no video autoplay.
- **Motion:** Subtle fade/slide on scroll only (stamp reveals, rule-draw
  dividers, odometer stats). CSS/`IntersectionObserver` only;
  `prefers-reduced-motion` gets the fully assembled page. No parallax.

## Colors

The palette is fixed by brand rule. **No color outside this table without
explicit approval** — including CTA hover states (hover = black↔white invert).

| Token | Hex | Role |
|-------|-----|------|
| `ink` | `#000000` | Primary text, headers, CTAs, borders, inverted-section backgrounds. |
| `paper` | `#FFFFFF` | Backgrounds. |
| `gray-1` | `#333333` | Secondary text; muted text/borders on inverted sections. |
| `gray-2` | `#666666` | Captions, metadata, footer fine print. |
| `gray-3` | `#CCCCCC` | Borders, dividers, muted text on ink, watermark section numbers. |

**Semantic roles**
- On `paper`: text = `ink`, secondary = `gray-1`, captions = `gray-2`, hairline borders = `gray-3`, structural borders = `ink`.
- On `ink` (inverted sections): text = `paper`, muted = `gray-3`, borders = `gray-1`.
- Contrast: text combinations must meet WCAG AA. `gray-2` is caption-size only on white; never body text on ink.

## Typography

Three self-hosted variable fonts (`src/app/fonts/`, `next/font/local`,
`font-display: swap` — no Google Fonts CDN), each with one job.

- **Display — Space Grotesk (700):** All headlines and big numbers. Tight
  leading (~1.05), negative tracking. All caps or title case for H1s. Go
  large — `display-2xl` is meant to feel oversized and structural.
- **Body — Inter (400):** All running prose. Minimum 16px mobile / 18px
  desktop. `body-lg` for hero/intro paragraphs. Max measure ~`max-w-2xl`.
- **Mono — JetBrains Mono (500):** Labels, eyebrows, stat captions, data
  rows, section numbers. UPPERCASE, wide tracking (`0.18em`). Numbers and
  data get visual weight — large stat callouts are a brand signature.

Type scale tokens: `display-2xl`, `display-xl`, `h2`, `h3`, `label`,
`body-lg`. Use the fluid `clamp()` sizes — do not hand-pick font sizes.

## Layout

- **Container:** `max-w-7xl` centered, `px-6` gutters. Full-bleed color
  blocks may exceed it; their content stays in the container.
- **Grid & structure:** Show the structure — visible 2px `ink` dividers
  between sections and grid cells, oversized mono section numbers
  (`01 / 02 / 03`) as watermarks in `gray-3`.
- **Rhythm:** Alternate `paper` and inverted `ink` sections down the page.
- **Spacing:** Section padding `section` (6rem). Be generous vertically —
  whitespace is the brand.
- **Mobile-first is non-negotiable.** Half of visits are phones in fab shops.
  Large touch targets, high-contrast text, no small gray-on-gray.

## Depth, Shapes, Iconography

- **No shadows as decoration.** Depth comes from borders and inversion, not
  elevation. No gradients, no glassmorphism, no blur effects.
- **Corners are square. Always.** `rounded.none` everywhere; `rounded.full`
  only for true circles.
- Shape language: rectangles, hairline/2px rules, right angles. Drawing
  sheets and steel plate, not pills and bubbles.
- Icons: thin (2px) line icons with square linecaps. No rounded icons.

## Components

- **button-primary:** `ink` fill, `paper` text, 2px `ink` border, `label`
  typography. Hover inverts to `paper`/`ink`. One primary CTA per view.
- **button-on-ink:** inverted variant for dark sections — `paper` fill,
  `ink` text (or `paper` border/transparent for the outline variant).
- **card:** `paper` fill, 2px `ink` border, no shadow. Cards in a grid sit
  on structural 2px gaps.
- **tag / eyebrow:** mono `label`, UPPERCASE, with a leading 2px rule.
  Anchors every section.
- **stat:** oversized Space Grotesk number, mono caption beneath. Numbers
  carry the proof — give them room.
- **input / select / textarea:** `paper` fill, 2px `ink` border, square;
  visible 2px outline on focus (no glow). Label is mono uppercase above.
- **nav:** fixed top bar, `paper` with 2px `ink` bottom border; active link
  underlined. Logo left-aligned, ~150px wide, clearspace = height of the
  "R". Never recreate, recolor, stretch, or add effects to the logo.

## Voice & Compliance

- Short punchy sentences. Big claims get numbers ("Job entry: 15 minutes →
  3 minutes"). Section structure: Hook → Problem → Mechanism → Proof → CTA.
- **Trademark:** Autodesk product names get ® on first mention per page
  (CADmep®, CAMduct®, ESTmep®). The footer carries the required attribution
  and independence disclaimer: "RaapTech is an independent consultancy and
  is not affiliated with or endorsed by Autodesk, Inc."
- Pricing is shown transparently. This audience respects it.

## Do's and Don'ts

**Do**
- Keep it black/white/gray — let type scale and structure do the work.
- Show structure: borders, grid lines, section numbers, alternating ink/paper.
- Use mono for numbers, stats, and technical labels.
- Design for a phone in a fab shop first.

**Don't**
- **No color outside the five brand tokens.** No gradients, no startup
  clichés, no 3D blobs, no AI-slop illustrations, no glassmorphism.
- No shadows-as-decoration, no script fonts, no rounded corners.
- No stock photos of people in hardhats pointing at tablets. All photography
  grayscale-treated.
- No lorem ipsum, ever. No modified logo.
- Don't set display type in Inter or body prose in Space Grotesk.
