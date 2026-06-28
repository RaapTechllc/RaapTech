# Autonomous Brownfield Code-Quality Loop — State

_Last updated: 2026-06-28_

## Project map (Phase 0)

- **Project**: `raaptech-site` — RaapTech LLC company website (marketing site).
- **Stack**: Next.js 15.5.14 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS 3.4.
- **Layout**: Single package. Source under `src/app` (routes) and `src/components`.
  - Also present but **out of scope** (separate embedded projects, not part of the Next.js build):
    `CC/RaapTech/` (n8n workflow JSON), `CURSOR PROJECTS/obsidian-ai-agent/` (Python).
- **Package manager**: npm (has `package-lock.json`).
- **Deploy target**: Vercel (`vercel.json`, `framework: nextjs`), also Docker (`Dockerfile`, `output: standalone`).
- **CI**: none found (`.github/workflows` absent). No `.gitlab-ci.yml`.
- **Docs/conventions**: no README, no CONTRIBUTING, no `.editorconfig`.

### Exact check commands
- install: `npm ci`
- typecheck: `npx tsc --noEmit`
- lint: `npm run lint`  (→ `next lint`; note: prints deprecation warning, removed in Next 16)
- build: `npm run build` (→ `next build`)
- test: **none** (no test runner configured, zero test files)

## Baseline (against HEAD `157e992` before any change)

| Check     | Result at baseline | Notes |
|-----------|--------------------|-------|
| install   | ✅ pass            | `npm ci`, 358 pkgs. 6 npm-audit vulns (3 moderate, 3 high). |
| typecheck | ❌ FAIL            | `src/app/services/page.tsx` ~40 parse errors (corrupted file). |
| lint      | n/a at baseline    | (blocked behind broken file conceptually) — clean after fix. |
| build     | ❌ FAIL            | (a) code parse errors **+** (b) Google Fonts fetch blocked. |

### Root cause of the build-breaker
Commits `88ae5b7` (services) and `157e992` (about), both titled "remove brand-specific
AI vendor names", introduced **hard-wrap corruption**: spurious line breaks (mixed CR/LF)
injected mid-token and mid-string, plus mangled em-dashes (`—` → U+FFFD `�`) in about.
- `services/page.tsx`: 166 stray CRs; whitespace-stripped content **identical** to clean
  parent `54ee62f` → the commit made **no real content change**, only corruption.
- `about/page.tsx`: 213 stray CRs; whitespace-stripped content identical to `54ee62f`
  **except** mangled em-dashes → restoring `54ee62f` is content-correct.

- **Green set (baseline)**: install.
- **Red set (baseline)**: typecheck, build (code portion).

## Ladder status

1. Build-breakers — **services/about corruption FIXED**. Remaining build failure is the
   Google Fonts network block = **environmental, not code** (deploy target Vercel is fine).
2. Type errors — **CLEAN** (`tsc --noEmit` exit 0 after fix).
3. Lint errors/warnings — **CLEAN** (`next lint`: 0 warnings/errors).
4. Failing tests — n/a (no tests).
5. Formatting — no formatter configured; lint clean.
6. Dead code/unused — none flagged by eslint.
7. Coverage — repo has **zero** tests (see needs-sign-off).
8. Docs drift — no README exists (added; see iteration log).
9. Low-risk refactors — none taken (judgment-dependent).

## Iteration log

- **It.1+2** — target: rung 1 build-breaker (corrupted `services/page.tsx` + `about/page.tsx`).
  action: `git checkout 54ee62f -- <both files>` (content-identical clean versions; restores
  about's em-dashes). gate: `tsc --noEmit` exit 0, `next lint` clean.
  commit: **38adf30** `fix(pages): repair hard-wrap/CR corruption in services & about pages`.
- **It.3** — target: rung 8/protective — prevent recurrence of the CR corruption.
  action: add `.gitattributes` (`* text=auto eol=lf`); `git add --renormalize .` changes nothing
  (tree already LF). commit: (pending)
- **It.4** — target: rung 8 docs — no README existed (`.dockerignore` already references one).
  action: add `README.md` documenting stack, scripts, structure, deploy, and the Google-Fonts
  build caveat. commit: (pending)

## Round 2 (post-merge of PR #2 — user delegated the open items)

- **It.5** — target: needs-sign-off #1, vendor names. Genericized brand mentions in
  `services/page.tsx`, `page.tsx`, `about/page.tsx` ("Claude.ai/ChatGPT" → "a business-grade
  AI assistant"; dropped "Claude, ChatGPT" parenthetical). gate: tsc + lint clean.
  commit: **699af8c** `content: genericize AI vendor names in site copy`. ✅ resolves sign-off #1.
- **It.6** — target: needs-sign-off #3 / rung 7, establish tests. Added Vitest 3 + RTL +
  jest-dom + jsdom; `npm test`; 12 tests across Footer/ThemeProvider/Navbar/ContactForm.
  gate: 12/12 pass, tsc clean, lint clean.
  commit: **8fbcd48** `test: add Vitest + RTL smoke/characterization suite`. ✅ resolves sign-off #3.

## Needs sign-off queue (remaining)

1. ✅ RESOLVED in It.5 — vendor names genericized.
2. **Build is not network-self-contained.** `next/font/google` (Inter, JetBrains Mono) fetches
   from Google Fonts at build time; blocked by this env's network policy. Builds fine on Vercel.
   **Question:** want fonts self-hosted (`next/font/local`) so builds work offline/air-gapped?
   (Behavior/architecture change. NOTE: can't be done in this env — fetching the font files is
   also blocked by the same network policy.)
3. ✅ RESOLVED in It.6 — Vitest + RTL smoke suite added.
4. **`next lint` deprecation** (removed in Next 16). Deferred — works for now; migrate to the
   ESLint CLI before a Next 16 upgrade. (Recommended, not yet done.)

## Last full-suite checkpoint (Round 2, after It.6)
- test ✅ (`npm test`: 12/12 pass)
- typecheck ✅ (`tsc --noEmit` exit 0; now also covers `*.test.tsx` + vitest config)
- lint ✅ (`next lint`: 0 warnings/errors)
- build ⚠️ env-blocked: still fails ONLY at the Google-Fonts fetch (test files are not
  route-imported, so they never enter the bundle; the TS program tsc mirrors is clean).

## Commits — Round 1 (merged via PR #2, squash `83a2b2b`)
- `38adf30` fix(pages): repair hard-wrap/CR corruption in services & about pages
- `78c9ca2` chore: add .gitattributes to enforce LF line endings
- `11ef605` docs: add README with setup, scripts, structure, and deploy notes
- `fba318b` chore: add autoloop state file

## Commits — Round 2 (branch `claude/brownfield-code-quality-loop-wigjmv`, new PR)
- `699af8c` content: genericize AI vendor names in site copy
- `8fbcd48` test: add Vitest + RTL smoke/characterization suite
- (state file update commit follows)
