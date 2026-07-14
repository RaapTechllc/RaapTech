---
name: higgsfield
description: |
  Use when the user wants to generate an image, a video, or a marketing clip for RaapTech
  with the Higgsfield CLI. Triggers: "higgsfield", "make an ad", "hero image", "product pan",
  "shop floor video", "generate a video with higgsfield", "content factory".
---

# Higgsfield CLI (RaapTech)

RaapTech prefers the **Higgsfield CLI** for media (same approach as
[coleam00/ai-content-factory](https://github.com/coleam00/ai-content-factory)):
cheap stills first, human approval, spend video credits only on winners.
MCP (`.cursor/mcp.json`) is optional; the CLI is the reliable path in agents.

## Install / auth

```bash
npm install -g @higgsfield/cli
higgsfield auth login          # browser OAuth once
higgsfield account             # credit balance
```

Self-documenting:

```bash
higgsfield --help
higgsfield model list --image
higgsfield model list --video
higgsfield model get <model>
```

Every `generate create` supports `--wait` and prints a `result_url` — download that URL.

## Cost rule (from AI Content Factory)

Images ≈ cheap (`nano_banana_pro` ~0.15 cr). Video ≈ 10–100× more.
**Explore on stills → human approve → render only winners.**

## RaapTech brand constraints for prompts

- Sheet metal / MEP / Autodesk Fabrication shop floor — real ductwork, steel, concrete.
- Palette cues: warm concrete, black ink, hazard orange `#FF4D00`. No purple SaaS glow.
- No AI-vendor logos or named AI products in frame.
- No garbled on-screen text / captions unless explicitly requested.
- Prefer full-bleed 16:9 for site heroes; 9:16 only for social/UGC experiments.

## Recipes

### Site hero / still plate (cheap)

```bash
higgsfield generate create nano_banana_pro \
  --prompt "Documentary photo of a sheet metal fabrication shop floor, stacked galvanized HVAC ductwork, concrete floor, hazard-striped column, fluorescent + window light, no people faces close-up, no text, no logos, industrial neo-brutalist mood" \
  --aspect_ratio 16:9 --wait
```

Save into `public/images/` (e.g. `hero-shop-floor.png`).

### Shop-floor pan (video, gated)

```bash
higgsfield generate create kling3_0_turbo \
  --start-image public/images/hero-shop-floor.png \
  --prompt "slow cinematic push-in across stacked ductwork, subtle light shift, documentary fabrication shop, no text overlays" \
  --aspect_ratio 16:9 --duration 10 --resolution 1080p --wait
```

### Optional UGC-style talking head (social only)

Use `gemini_omni` only when the user asks for a UGC ad. Cap spoken line ~25 words,
keep the anti-repeat clause from the upstream skill, pass a branded still via
`--image-references`. Prefer fabrication/shop context over generic kitchen UGC
unless the user specifies otherwise.

## Gotchas

- Keep each `--prompt` on **one line**.
- Prefer iterating stills; only spend video after approval.
- If unauthenticated, run `higgsfield auth login` (user must complete browser OAuth).
