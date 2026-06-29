---
name: ai-slop-cleaner
description: >-
  Detect and rewrite "AI slop" in prose and marketing copy — overused LLM
  vocabulary (delve, leverage, seamless, robust, elevate, unlock…),
  negative-parallelism ("it's not just X, it's Y"), rule-of-three padding,
  em-dash overuse, bold-label list bloat, decorative emoji, hedging, and vague
  hype — and rewrite it into crisp, specific, human copy. Use when asked to
  de-slop writing, clean up site/marketing copy, remove "AI tells", or make text
  sound human. Preserves facts, domain terms, real numbers, and an intentional
  punchy brand voice; never fabricates claims.
---

# AI Slop Cleaner

Find the mechanical, evidence-free tells of LLM-generated prose and replace them
with specific, human writing. The cure for slop is almost always **specificity**
(a number, a name, a concrete verb), not deletion.

## When to use

- "Clean up the copy", "de-slop this", "make it sound human", "remove the AI tells".
- Auditing marketing/landing/About copy, READMEs, blog drafts, release notes.

## Operating rules (read first)

1. **Preserve meaning and facts.** Never drop a real number, name, date, part term,
   or claim. If a slop word sits next to a fact, rewrite *around* the fact.
2. **Specificity over deletion.** Prefer replacing vague hype with a concrete detail.
   Only delete when the phrase adds no information.
3. **Voice is not slop.** A deliberate fragment ("It ships Tuesday."), one
   well-placed em dash, sentence-case wit, a single intentional tricolon — these are
   *human* signals. Remove only the **mechanical, repeated, evidence-free** versions.
4. **Density is the tell, not the mark.** One em dash per few hundred words is fine;
   3–5× the human rate is not. Same for bold, triads, and qualifiers.
5. **Smallest change that lands.** Don't rewrite good sentences. Propose surgical edits.
6. **No fabrication.** If you can't substantiate a claim a slop phrase implied, cut the
   claim — don't invent a number.

## Detection → fix taxonomy

### Vocabulary (replace with plain words or a fact)
| Tell | Fix |
|---|---|
| delve / delve into | "look at", "dig into", or state the point directly |
| leverage / utilize / harness / empower | "use" / "let(s)" |
| robust / seamless / scalable / streamline / optimize | specify or cut ("syncs in <1s") |
| game-changer / cutting-edge / state-of-the-art / world-class / revolutionary / next-generation | replace with the fact that proves it |
| meticulous(ly) | cut, or "well-made" / "hand-…" |
| crucial / vital / essential / pivotal / paramount | reserve emphasis; say *why* it matters |
| underscore / highlight / showcase | "shows", "points to", or drop |
| tapestry / realm / landscape / mosaic / beacon / cornerstone | name the actual thing ("area", the list) |
| boasts | "has", "comes with" |
| foster / cultivate / elevate / unlock / embark | plain verb + real action |
| resonate / captivate / compelling | describe the concrete effect; cut "compelling" |
| garner / bolster / vibrant / enduring | "get" / "strengthen" / a specific detail / a real timespan |

### Sentence structure
| Tell | Fix |
|---|---|
| "It's not just X, it's Y" (negative parallelism) | state the claim once, directly |
| "Not only X but also Y" | plain conjunction or two sentences |
| Rule of three / stacked tricolons | use the real count (2, 4, 5…); break mirrored rhythm |
| "From X to Y" (fake range) | name the specific items |
| "Whether you're X or Y" / "In a world where…" | cut; lead with the concrete benefit / one real reader |
| dangling importance tails ("…marking a pivotal moment", "…highlighting the significance of") | cut the tail; state what changed |
| over-hedging / false balance ("while X… Y remains…") | pick a side and argue it |
| hedging ("can help", "may", "designed to") | state what it does |

### Punctuation & formatting
| Tell | Fix |
|---|---|
| em-dash overuse (the "ChatGPT hyphen") | cap density; convert most to commas/periods/colons/parens |
| spaced em dashes ( — ) | close them up (US style) or rewrite |
| `- **Label:** text` bold-label list scaffold | flowing prose; bullets only for parallel items |
| mechanical boldface (every lead term) | ≤1 bold per section, or none |
| decorative emoji (🚀 ✨ ✅) in headers/body | remove |
| bullet bloat where prose belongs (5+ verbless noun phrases) | connect into prose |
| Title-Case Section Headers | sentence case |
| "7 key takeaways…" listicle counts | drop the count; let substance set the number |
| curly quotes in code/plain-text | normalize to straight (weak signal alone) |

### Marketing filler (delete or make concrete)
"In today's fast-paced / ever-evolving world" · "It's important to note that" / "It's worth
noting" · pedagogical connectors ("Let's break this down", "Importantly", "Notably") ·
chatbot remnants ("Certainly! Here's…", "I hope this helps") · "In conclusion / Overall"
recaps · "Key takeaways" boilerplate · "unlock / elevate / take it to the next level" ·
"tailored solutions / we've got you covered / look no further".

### Structural (statistical / argument-level)
- **Uniform sentence length (low burstiness).** Mix 3–8-word lines with 20+-word ones; add fragments.
- **Vague abstractions** ("significant improvements", "a wide range of"). Replace with a number/name/date/example.
- **Generic openers** ("In the world of…", "In the era of…"). Lead with the news.
- **Over-explaining / restating the premise.** Every paragraph must add one new fact or turn.
- **Anaphoric ruts** ("The… The… This… This…"). Vary sentence openings.
- **Excessive qualifiers** ("arguably", "essentially", "literally", "in many cases"). Delete and check it still holds.

## Do NOT strip (false positives)
- Domain terms / jargon real buyers use (CADmep, AP aging, tolerances, voltage ratings).
- Real numbers, names, dates, facts — specificity is the cure, never the disease.
- Intentional brand voice: fragments, one deliberate tricolon, one good em dash, dry wit.
- Em dashes used well (the problem is density + space-padding, not the mark).
- Curly quotes in finished, typeset publications.

## Process

1. **Gather the corpus.** Identify every file that holds human-facing copy (pages,
   components, metadata, README). For a codebase, copy lives in string literals/JSX text,
   not class names or identifiers.
2. **Scan.** Grep for high-signal tells to build a candidate list (starter below). Also read
   for the structure/voice tells grep can't catch (burstiness, triads, hedging).
3. **Curate.** For each candidate decide: genuine slop → fix; intentional voice / fact → keep.
   Log skips with a one-line reason. When unsure, keep it.
4. **Rewrite** surgically, preserving facts and voice. Never change non-copy strings, code,
   or identifiers.
5. **Verify.** Re-read for meaning drift; if in a codebase, run the project's gates
   (typecheck/lint/test/build) so the edits didn't break rendering.
6. **Report** a short diff summary: what was de-slopped and what was deliberately kept.

### Bootstrap grep

```bash
grep -rniE "delve|leverage|utili[sz]e|harness|seamless|robust|elevate|unlock|tapestry|realm|landscape|cornerstone|meticulous|crucial|pivotal|underscore|boasts|foster|cultivate|garner|bolster|game-?changer|cutting-edge|state-of-the-art|world-class|revolutionary|next-generation|in today'?s|fast-paced|ever-evolving|tailored solution|empower|take it to the next level|look no further|whether you'?re|not just|not only|it'?s worth noting|important to note|in conclusion" <copy-paths>
# Density checks (judgement, not auto-fix): em dashes, bold, emoji
grep -rcE "—|&mdash;" <copy-paths>
```

## Sources

Grounded in: Wikipedia *Signs of AI writing* / *WikiProject AI Cleanup*; GPTZero
(common AI vocabulary; perplexity & burstiness); Grammarly's overused-AI-words list; and
community skill repos — `conorbronsdon/avoid-ai-writing`, `jalaalrd/anti-ai-slop-writing`,
`hwajongpark/awesome-slop`, `lguz/humanize-writing-skill`. (~80 markers distilled.)
