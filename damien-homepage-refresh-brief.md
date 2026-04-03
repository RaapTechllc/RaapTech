# Task: Homepage Copy Refresh
**Assignee:** Damien (Claude Code on VM)
**Priority:** Critical
**Branch:** main

## Context
The homepage was rewritten earlier today (commit 9af4162) but used the old positioning. Tim has since locked the offer: Construction Workflow Audit + First Automation ($3K-$5K, 5-10 business days). The homepage needs to reflect this locked offer.

## Source Files (on Maxx workstation, SCP'd to Damien)
- `deliverables/2026-03-28-agency-homepage-examples.md` — 10 premium examples with patterns
- `deliverables/2026-03-28-offer-variants.md` — 3 approved copy variants
- `deliverables/2026-03-28-claims-review.md` — TopG's legal review (follow ALL yellow/red items)
- `deliverables/2026-03-28-workflow-audit-product.md` — full product spec

## Requirements
1. Hero headline: outcome-first, specific to MEP/sheet metal. Steal patterns from Axel's research (outcome + specific number + industry). NO generic "transform your business" garbage.
2. Primary CTA: "Book a Free Workflow Consultation" (not "Get Started" or "Contact Us")
3. Include: Problem section → Solution → How it works (3 steps) → Proof/credibility → About Tim → CTA
4. Stats to use: "20 years in MEP fabrication", "4 active clients", "serving sheet metal, mechanical, and electrical contractors"
5. Services section: Lead with "Construction Workflow Audit" — describe the $3K-$5K engagement in plain language
6. DO NOT use: "AI", "agents", "automation platform", "cutting-edge", "transformation", "leverage", "synergy", any vendor names (Claude, ChatGPT, OpenAI, Anthropic)
7. DO NOT promise "ROI within 90 days" — TopG flagged this RED
8. Time savings claims: use "6-12 hours/week" range, not "10+ hours"
9. Keep the existing design/brand: dark theme, brand-orange (#FF6B35), monospace font, Tailwind v3

## Repo
- GitHub: RaapTechllc/RaapTech
- Working dir: ~/projects/raaptech-website
- Run `git pull origin main` first, then `npm run build` to verify before pushing
