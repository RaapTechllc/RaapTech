# Changelog — Master Prompt Alignment Pass

## Summary
Full structural and copy alignment of the RaapTech website to the master design brief (two-offer model, Sprint-first, Skool as continuity).

---

## Nav — All Pages

| Page | Home | Sprint | Skool | Results | About |
|---|---|---|---|---|---|
| index.html | active | — | — | — | — |
| sprint.html | — | active | — | — | — |
| skool.html | — | — | active | — | — |
| about.html | — | — | — | — | active |
| contact.html | — | — | — | — | — |
| results.html | — | — | — | active | — |

- Added **Home** link to all 5 pages
- **Results** now links to `/results` (new page)

---

## Homepage (`index.html`) — Restructured to §1-§7

| § | Section | Status | Notes |
|---|---|---|---|
| §1 | Hero | Kept | Sprint-first CTA, Skool as secondary link |
| §2 | Who This Is For | Split | Who-list only (personas moved out of pain cards) |
| §3 | Core Pain | **New** | 3 problem cards: RFQ delays, handoff leaks, library chaos |
| §4 | Two Ways | Enriched | Sprint card now has full $4,800 offer + guarantee; Skool card is side-path |
| §5 | How It Works | Kept | 3-step process cards |
| §6 | Founder Credibility | Kept | Compact founder strip |
| §7 | Final CTA | Kept | Book audit + capacity framing |

**Moved off homepage → `/results`:**
- Before → After compare table
- Representative Outcomes cards
- Testimonials placeholder

---

## New Page: `/results`

- Hero: "What Changes After a Sprint" (conservative subtitle)
- Section 1: Before → After compare table (moved from homepage)
- Section 2: Representative Outcomes cards (Track A/B/C)
- Section 3: Testimonials placeholder with TBD attributions
- Section 4: Final CTA → `/contact#book`

---

## `/skool` — Tier Logic Alignment

| Tier | Label | Role | Copy |
|---|---|---|---|
| Standard | Access | Watch and learn | Read-only, library, no live calls |
| Premium | **Answers** | Core offer | Weekly office hours, template vault, priority thread |
| VIP | Direct Help | Scarce 1:1 | One fix/month, private thread, 5-slot cap |

- Premium is the **visual anchor** (`tier-card-featured` with transform/scale)
- Copy tightened to sound like **ongoing operational support**, not a course launch
- No implied traction or member counts

---

## CTA Hierarchy Verification

| Page | Primary CTA | Secondary CTA | Notes |
|---|---|---|---|
| **Home** | Book Free Audit (Sprint) | Skool side-path | Sprint-first ✅ |
| **Sprint** | Book Free Audit | — | Single-purpose conversion ✅ |
| **Skool** | Join Premium | Book audit (escape hatch) | Only page where Skool is primary ✅ |
| **Results** | Book Free Audit | — | Trust → conversion ✅ |
| **About** | Book Free Audit | — | Trust → conversion ✅ |
| **Contact** | Calendly embed | Email/phone fallback | Booking only ✅ |

---

## Copy Guardrails

- ✅ No "AI" language on homepage hero, nav, or top-level CTAs
- ✅ AI mentioned only in `/sprint` FAQ (buried, operational context)
- ✅ No fake testimonials — all use "TBD — name pending sign-off"
- ✅ No implied Skool traction (member counts, "proven community")
- ✅ "Representative of typical Sprint engagements" on all outcome claims
- ✅ Operator-first tone: plainspoken, specific, not corporate

---

## Files Changed

- `index.html` — restructured `<main>` block, §1-§7 alignment
- `sprint.html` — nav updated
- `skool.html` — nav + tier labels updated
- `about.html` — nav updated
- `contact.html` — nav updated
- `results.html` — **created**
