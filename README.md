# RaapTech LLC — Company Website

Marketing site for RaapTech LLC: Autodesk Fabrication database consultancy
(CADmep®, CAMduct®, ESTmep®) for MEP contractors and sheet metal fabrication
shops. Chicago-based. Strict black/white/gray industrial-editorial brand —
see `DESIGN.md`.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Self-hosted variable fonts via `next/font/local` (Space Grotesk, Inter, JetBrains Mono) — see `src/app/fonts/`. No build-time network fetch.

## Prerequisites

- Node.js 22 (matches the Docker base image `node:22-alpine`)
- npm (the repo ships a `package-lock.json`)

## Getting started

```bash
npm ci            # install exact, locked dependencies
npm run dev       # start the dev server at http://localhost:3000
```

## Scripts

| Command           | What it does                                      |
|-------------------|---------------------------------------------------|
| `npm run dev`     | Start the Next.js dev server (http://localhost:3000) |
| `npm run build`   | Production build (`next build`)                    |
| `npm run start`   | Serve the production build                         |
| `npm run lint`    | Lint with the ESLint CLI (`eslint .`)             |
| `npm test`        | Run the Vitest unit tests (`vitest run`)          |
| `npx tsc --noEmit`| Type-check without emitting output                |

> Fonts are self-hosted (`src/app/fonts/*.woff2`, loaded via `next/font/local`),
> so `next build` makes no network calls for fonts and works offline / air-gapped.

## Project structure

```
src/
  app/              # App Router routes
    about/          # /about — founder credibility
    contact/        # /contact — form + booking
    results/        # /results — case studies
    services/       # /services — offer ladder with pricing
    api/contact/    # POST /api/contact — contact form endpoint
    api/diagnostic/ # POST /api/diagnostic — lead-magnet email capture
    fonts/          # self-hosted variable fonts (.woff2)
    layout.tsx      # root layout (fonts, metadata, JSON-LD, chrome)
    page.tsx        # home page (/)
    globals.css     # global styles + Tailwind layers
  components/        # shared UI (Navbar, Footer, ContactForm, motion, icons)
  lib/               # shared helpers (site.ts — SITE/booking, nav.ts — NAV_LINKS)
public/             # static assets
DESIGN.md           # brand design system — source of truth
```

## Configuration

Site identity, contact info, CTA copy, and booking live in `src/lib/site.ts`:

- **Booking** — paste the live Cal.com/Calendly event URL into `SITE.bookingUrl`
  and set `bookingEnabled: true`. Until then, CTAs fall back to a pre-filled
  email. A scheduler embed slot is marked on `/contact`.
- **Forms** are decoupled from any CRM/email vendor via env vars:
  - `CONTACT_FORM_ENDPOINT` — webhook/Formspree/Resend URL receiving contact
    form submissions as JSON.
  - `DIAGNOSTIC_CAPTURE_ENDPOINT` — endpoint receiving diagnostic signups.
  - Unset: submissions are accepted and logged server-side, so the site works
    before a vendor is picked.
- **Logo** — a text wordmark placeholder is in use. Drop the provided logo
  file into `public/images/` and swap it into `src/components/Navbar.tsx`
  (~150px wide, clearspace = height of the "R"; never recolor or modify).

## Deployment

- **Vercel** — configured via `vercel.json` (framework `nextjs`, `npm run build`).
- **Docker** — multi-stage `Dockerfile` producing a standalone server on port 3000.

  ```bash
  docker compose up --build      # build and run the container
  ```

  Uses Next.js `output: "standalone"` (see `next.config.ts`).

## Higgsfield (imagery + video)

RaapTech follows the same media pattern as
[AI Content Factory](https://github.com/coleam00/ai-content-factory):
**explore cheap stills → human approve → render winners only.**

### CLI (preferred)

```bash
npm install -g @higgsfield/cli
higgsfield auth login
higgsfield account
```

Agent skill (recipes + RaapTech brand constraints):
`.claude/skills/higgsfield/SKILL.md`

### MCP (optional)

Project MCP config: `.cursor/mcp.json` → `https://mcp.higgsfield.ai/mcp`.
Connect under **Cursor Settings → MCP / Connectors** (OAuth). Brand prompt
rules: `.cursor/rules/higgsfield-imagery.mdc`.
