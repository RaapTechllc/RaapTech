# RaapTech LLC — Company Website

Marketing site for RaapTech LLC: Autodesk Fabrication consulting (CADmep, ESTmep,
CAMduct) and AI onboarding for sheet metal and MEP contractors.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Fonts via `next/font/google` (Inter, JetBrains Mono)

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
| `npm run lint`    | Lint with ESLint (`next lint`)                     |
| `npx tsc --noEmit`| Type-check without emitting output                |

> The build downloads the Inter and JetBrains Mono fonts from Google Fonts at
> build time. A network-restricted/air-gapped environment that blocks
> `fonts.googleapis.com` will fail `next build` at the font-fetch step.

## Project structure

```
src/
  app/              # App Router routes
    about/          # /about
    contact/        # /contact
    projects/       # /projects
    services/       # /services
    layout.tsx      # root layout (fonts, metadata, chrome)
    page.tsx        # home page (/)
    globals.css     # global styles + Tailwind layers
  components/        # shared UI (Navbar, Footer, ContactForm, ThemeProvider)
public/             # static assets
```

## Deployment

- **Vercel** — configured via `vercel.json` (framework `nextjs`, `npm run build`).
- **Docker** — multi-stage `Dockerfile` producing a standalone server on port 3000.

  ```bash
  docker compose up --build      # build and run the container
  ```

  Uses Next.js `output: "standalone"` (see `next.config.ts`).
