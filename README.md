# RaapTech LLC — Company Website

Marketing site for RaapTech LLC: Autodesk Fabrication consulting (CADmep, ESTmep,
CAMduct) and AI onboarding for sheet metal and MEP contractors.

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
    about/          # /about
    contact/        # /contact
    projects/       # /projects
    services/       # /services
    fonts/          # self-hosted variable fonts (.woff2)
    layout.tsx      # root layout (fonts, metadata, chrome)
    page.tsx        # home page (/)
    globals.css     # global styles + Tailwind layers
  components/        # shared UI (Navbar, Footer, ContactForm) + icons.tsx
  lib/               # shared helpers (nav.ts — NAV_LINKS)
public/             # static assets
DESIGN.md           # brand design system — source of truth
```

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
