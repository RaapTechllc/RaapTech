# RaapTech Construction Workflow Audit — Full Product Package
**Version:** 1.0
**Author:** Maxx (with Tim Raap's 20-year domain knowledge baked in)
**Date:** 2026-03-28

---

## How This Works

This document is the **entire product in a box.** It contains everything Tim needs to run a professional engagement from first contact to handoff:

1. **Pre-Engagement Intake** — what you collect before day 1
2. **Audit Framework** — what you observe and measure during the engagement
3. **Client Deliverable Template** — the report the client holds in their hands
4. **Owner Summary (1-pager)** — for the person writing the check
5. **Team Rollout Guide** — what changes for PMs and foremen on Monday

---

# PART 1: PRE-ENGAGEMENT INTAKE FORM

**When:** After the 20-minute qualifier call, before the engagement starts.
**Who fills it out:** Client's ops manager or lead PM, with Tim on a 30-minute call to walk through it.
**Why:** You can't audit what you can't see. This gets the raw material on the table before you show up.

---

### Company Profile

| Field | Answer |
|-------|--------|
| Company name | |
| Primary trade(s) | |
| Annual revenue (range) | |
| Number of office staff | |
| Number of field crews | |
| Number of active projects right now | |
| Typical project size (dollar range) | |
| Typical project duration | |
| Geographic coverage | |
| Union / non-union / mixed | |

### Team Roster (Key Players Only)

List every person who touches project admin. Not everyone — just the ones who create, move, or approve information.

| Name | Title/Role | What they actually do day-to-day | Years with company |
|------|-----------|--------------------------------|-------------------|
| | | | |
| | | | |
| | | | |
| | | | |

*Tim's note to self: the "what they actually do" column matters more than the title. A "project coordinator" at a 15-person shop is doing estimating, AP, submittals, and answering the phone. That's where you find the overload.*

### Tool Inventory

List every tool, system, or method your team uses to manage work. Include the workarounds.

| Category | Tool/Method | Who uses it | How often | Pain level (1-5) |
|----------|------------|-------------|-----------|-------------------|
| Project management | (e.g., Procore, Buildertrend, Excel, whiteboard) | | | |
| Estimating | | | | |
| Scheduling | | | | |
| Daily reports / field logs | | | | |
| Time tracking | | | | |
| Document control (submittals, RFIs, drawings) | | | | |
| Communication (internal) | | | | |
| Communication (with GC/owner) | | | | |
| Billing / pay apps | | | | |
| Material ordering / tracking | | | | |
| As-builts / closeout | | | | |
| Other | | | | |

### Sample Project Walkthrough

Pick one active project — ideally a mid-complexity job that's representative of your typical work. Walk through it:

1. **Project name and type:**
2. **Contract value:**
3. **How many people touch this project daily (office + field)?**
4. **Walk me through a submittal on this project — from request to approval. How long does that typically take? Who's involved at each step?**
5. **When the field needs an answer from the office, how does that request travel? How long until they get a response?**
6. **How do you handle change orders on this project? What's the typical lag between field work and documentation?**
7. **How does billing work on this project? How long does pay app prep take? Who does it?**
8. **What's the single biggest time waste on this project?**

### Baseline Time Estimate

Before we start, we need a rough baseline. This doesn't have to be exact — honest estimates are fine.

| Task | Hours/week (estimate) | Who does it |
|------|-----------------------|-------------|
| Manual data entry (any system) | | |
| Chasing approvals / follow-ups | | |
| Creating or updating reports | | |
| Searching for information (drawings, specs, contacts, history) | | |
| Re-entering data that already exists somewhere else | | |
| Coordinating between field and office | | |
| Billing / pay app preparation | | |
| Closeout documentation | | |
| **Total estimated admin hours/week across team** | | |

*This baseline is how we measure results. We'll revisit it at 30 days.*

---

# PART 2: AUDIT FRAMEWORK

**What Tim actually does during the 5-10 day engagement.**

This isn't a checklist you hand to a junior consultant. This is the observation framework Tim uses to diagnose where time leaks, where information breaks, and where the first fix should go.

---

## Phase 1: Observation (Days 1-2)

### Communication Path Mapping
Follow information as it moves through the company. For each project, map:

- **Request → Response chains:** When the field needs something, who do they contact? How? How long until they get an answer?
- **Approval chains:** Who approves what? How many people touch a submittal, RFI, change order, or material order before it's done?
- **Notification gaps:** When something changes (schedule, scope, drawing revision), who finds out? How? How fast?

**What you're looking for:**
- Phone calls and texts being used as the primary information system (no paper trail, no searchability)
- The same information being communicated more than once to different people
- Approval chains with more than 3 touches (sign of over-control or unclear authority)
- People who are bottlenecks — everything routes through them because nobody else has the context

### Data Re-Entry Points
Identify every place where someone types, writes, or enters the same information that already exists in another system or document.

Common ones in MEP/sheet metal:
- Field daily report → office project log
- Timesheet → billing system
- Drawing markup → as-built
- Submittal log (internal) → submittal log (GC portal)
- Material order → job cost tracking
- Change order field notes → formal CO documentation

**What you're counting:** Hours per week spent on re-entry, per person.

### Rework and Error Triggers
Document every instance during the observation period where work had to be redone, corrected, or chased because of an information problem (not a trade/craft problem).

| What happened | Root cause | Time lost | Who was affected |
|--------------|-----------|-----------|-----------------|
| | | | |

**What you're looking for:**
- Patterns, not one-offs. If the same type of error happens twice in a week, it happens 8+ times a month.
- Errors that cost money (missed change orders, unbilled T&M, wrong materials ordered)
- Errors that cost time (rework, re-coordination, re-approval cycles)
- Errors that cost people (PM burnout, overtime, field frustration with office)

## Phase 2: Measurement (Days 2-3)

### Time Audit (Shadow Method)
Shadow 2-3 key people for half a day each. Track in 15-minute blocks what they're actually doing:

| Time | Person | Activity | Category | Value-add? |
|------|--------|----------|----------|-----------|
| 7:00 | PM | Reviewing overnight emails from field | Communication | Maybe |
| 7:15 | PM | Forwarding field photos to GC with notes | Data re-entry | No |
| 7:30 | PM | Calling foreman about schedule change | Communication | Yes |
| 7:45 | PM | Updating Excel tracker with yesterday's progress | Data re-entry | No |

**Categories:** Communication, Data Re-Entry, Approval/Chase, Search/Find, Coordination, Value-Add Work, Other

**What you're measuring:**
- % of time on value-add work vs. admin/coordination
- Highest-volume non-value-add category (this is where the first fix goes)
- Which role is most overloaded relative to their actual job description

### Handoff Analysis
For each major information handoff (field→office, PM→billing, estimating→field), document:

| Handoff | From | To | Method | Avg delay | Failure rate (gut feel) | Consequence of failure |
|---------|------|----|---------|-----------|-----------------------|----------------------|
| Daily report | Foreman | PM | Text + phone call | Same day | 20% (incomplete) | Billing gaps |
| Change order docs | PM | Office | Email w/ attachment | 3-7 days | 30% (late) | Unbilled work |
| Submittal tracking | Coordinator | GC portal | Manual re-entry | 1-2 days | 10% (version error) | Rework |

## Phase 3: Diagnosis (Days 3-4)

### Friction Score Matrix
Rank every workflow by two dimensions: **frequency** (how often it happens) and **friction** (how much time/pain it causes each time).

|  | Low Frequency | High Frequency |
|--|--------------|---------------|
| **High Friction** | Monitor — fix if easy | **FIX FIRST** |
| **Low Friction** | Ignore | Optimize later |

The top-right quadrant is where the first automation goes. Period.

### Root Cause Categories
For each friction point, classify the root cause:

- **Process gap** — no defined process exists; people improvise every time
- **Tool gap** — the tool exists but doesn't connect to the next step
- **Authority gap** — nobody knows who's supposed to do this, so everyone does it (or nobody does)
- **Visibility gap** — the information exists but the people who need it can't see it
- **Habit gap** — the process exists but people don't follow it because the old way is easier

*This matters because the fix is different for each. A tool gap needs a tool. A process gap needs a process. An authority gap needs a decision from the owner, not software.*

## Phase 4: Implementation (Days 4-8)

### First Automation Scope
Based on the Friction Score Matrix, select ONE workflow to fix. Scope it tightly:

- **What it does:** (one sentence)
- **Who it affects:** (names, not roles)
- **What they stop doing:** (the manual thing that goes away)
- **What they start doing:** (the new process)
- **How we know it worked:** (measurable — hours saved, steps eliminated, error rate reduction)

### Build and Test
- Build the automation/workflow change
- Test it with real data from the client's actual project
- Run it parallel with the old process for 2-3 days (don't rip and replace)
- Fix issues in real time

### Handoff
- Walk the affected team members through the new process, one at a time
- Have them do it while Tim watches — not the other way around
- Document the "if this breaks" fallback (the old process, written down)
- Set the 30-day check-in date

---

# PART 3: CLIENT DELIVERABLE — THE WORKFLOW AUDIT REPORT

*This is what the client gets. Clean, professional, zero jargon. 10-15 pages max.*

---

## [CLIENT COMPANY NAME]
## Construction Workflow Audit Report
**Prepared by:** Tim Raap, RaapTech LLC
**Date:** [DATE]
**Engagement period:** [START] – [END]

---

### 1. Executive Summary

**What we did:**
Over [X] days, we observed your project management and field-to-office workflows across [X] active projects. We interviewed [X] team members, shadowed [X] key roles, and mapped how information moves through your operation from field to office and back.

**What we found:**
Your team spends approximately **[X] hours per week** on administrative tasks that don't require human judgment — data re-entry, chasing approvals, compiling reports manually, and searching for information that exists but isn't accessible where it's needed.

The biggest single time drain is **[primary friction point]**, which accounts for roughly **[X] hours/week** across your PM and coordination team.

**What we fixed:**
During this engagement, we implemented **[one-sentence description of first automation]**. Based on initial results, this change is expected to recover approximately **[X] hours/week** for your team.

**What we recommend next:**
Below you'll find [X] additional improvement opportunities, ranked by impact and ease of implementation. The top [2-3] are quick wins your team can implement within 30 days using tools you already have.

---

### 2. Your Team Today — What We Observed

*This section is a plain-English description of how the client's operation actually works. No judgment, no recommendations yet — just a clear mirror.*

**Team structure:**
[Org chart or simple description — who does what, who reports to whom for project decisions]

**Communication flow:**
[Diagram or description: how requests, approvals, and updates travel between field, office, and external parties]

**Tool landscape:**
[What tools are in use, how they connect (or don't), what the workarounds are]

**Typical project lifecycle (admin view):**
[Walk through a project from award to closeout, focusing on the admin and coordination steps, not the trade work]

---

### 3. Where Time Goes — The Numbers

**Team admin time breakdown:**

| Task Category | Hours/Week (Measured) | % of Total Admin | Primary Role(s) Affected |
|--------------|----------------------|-----------------|------------------------|
| Data re-entry | | | |
| Approval chasing / follow-up | | | |
| Report creation / compilation | | | |
| Information search | | | |
| Field-office coordination | | | |
| Billing / pay app prep | | | |
| Other admin | | | |
| **Total** | **[X]** | **100%** | |

**Comparison:** For a company your size running [X] active projects, a well-structured operation typically runs at [X] admin hours/week. You're running at [X]. The gap of **[X] hours/week** represents your improvement opportunity.

*Note: "Well-structured" doesn't mean perfect. It means the admin work that remains is work that genuinely requires a human decision — not re-keying data or chasing people for information.*

---

### 4. Friction Points — Ranked

| Rank | Friction Point | Hours/Week | Error Rate | Dollar Impact (est.) | Fix Difficulty |
|------|---------------|-----------|-----------|---------------------|---------------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**How we ranked these:** Frequency × impact. A problem that happens every day and costs you money is always the first fix, even if it's harder. A problem that happens monthly but has a small cost is a "nice to have."

---

### 5. What We Fixed (First Automation)

**The problem:**
[Specific description — what was happening, who was affected, how much time/money it cost]

**The fix:**
[What was built/changed — in plain terms, not technical jargon]

**How it works now:**
[Step-by-step: what the team member does differently. Keep it to 3-5 steps max.]

**Results (initial):**
- Time saved: [X] hours/week (estimated, to be confirmed at 30-day check-in)
- Steps eliminated: [X] manual steps → [X] steps
- Error reduction: [describe]

**What to watch for:**
[Known edge cases or situations where the old process might be needed temporarily]

---

### 6. Recommended Next Steps

These are ranked by impact and ease. The first 2-3 can be done in-house. The rest may need another engagement or outside help.

#### Quick Wins (implement within 30 days, minimal cost)

**1. [Recommendation name]**
- What: [one sentence]
- Why: [what it fixes, how much time it saves]
- How: [2-3 concrete steps]
- Cost: [free / minimal / tool subscription amount]

**2. [Recommendation name]**
- What:
- Why:
- How:
- Cost:

**3. [Recommendation name]**
- What:
- Why:
- How:
- Cost:

#### Medium-Term Improvements (30-90 days, some investment)

**4. [Recommendation name]**
- What:
- Why:
- Estimated effort:
- Estimated cost:

**5. [Recommendation name]**
- What:
- Why:
- Estimated effort:
- Estimated cost:

#### Strategic (90+ days, significant change)

**6. [Recommendation name]**
- What:
- Why:
- Dependencies:
- Rough investment range:

---

### 7. 30-Day Check-In Plan

| Date | What we check | How we measure |
|------|--------------|---------------|
| Day 7 | Is the first automation still running? Any issues? | Quick call with [PM name] |
| Day 14 | Team adoption — is everyone using the new process? | Usage check + quick survey |
| Day 30 | Time savings confirmed against baseline | Compare baseline hours to current hours |

**Your baseline (pre-engagement):** [X] admin hours/week across the team
**Target (post-engagement):** [X] admin hours/week (a reduction of [X] hours)

We'll measure this together at the 30-day mark. If you're not seeing the improvement, we'll diagnose why and adjust.

---

### 8. About RaapTech

Tim Raap has spent 20 years inside MEP and sheet metal operations — not selling software to them, but working alongside the PMs, coordinators, and foremen who keep projects moving.

RaapTech focuses on construction workflow optimization: finding where your team's time actually goes, identifying the bottlenecks that cost you the most, and fixing them with process changes that stick.

We work with MEP subcontractors, sheet metal fabrication shops, and specialty contractors across the Midwest.

**Contact:** Tim Raap | [email] | [phone]

---

# PART 4: OWNER SUMMARY (1-PAGER)

*Print this. Hand it to the owner. This is what gets tacked to their office wall or forwarded to their partner.*

---

## [COMPANY NAME] — Workflow Audit Results
**RaapTech LLC | Tim Raap | [DATE]**

---

**Your team is spending [X] hours/week on admin work that doesn't require human judgment.**

That's roughly **$[X]/month** in labor cost applied to tasks like re-entering data, chasing approvals, compiling reports, and searching for information that already exists somewhere in your system.

---

### What We Found

| # | Issue | Time Cost | Money Cost (est.) |
|---|-------|-----------|-------------------|
| 1 | [Top friction point] | [X] hrs/wk | $[X]/mo |
| 2 | [Second friction point] | [X] hrs/wk | $[X]/mo |
| 3 | [Third friction point] | [X] hrs/wk | $[X]/mo |

### What We Fixed
**[One-sentence description of first automation]**
→ Saves approximately **[X] hours/week** starting now.

### What's Left on the Table
If you address the top 3 recommendations in this report:
- **Estimated time recovered:** [X] hours/week across your team
- **Estimated annual value:** $[X] (based on blended labor rate of $[X]/hr)
- **Estimated implementation cost:** $[X] – $[X]
- **Payback period:** [X] weeks

### Next Step
Read the full report. Pick one recommendation. Call Tim.

---

# PART 5: TEAM ROLLOUT GUIDE

*This is for the people doing the work. No ROI numbers, no strategy talk. Just: here's what changed, here's what you do differently starting Monday.*

---

## What Changed and What It Means for You
**[COMPANY NAME] | [DATE]**

---

### Why This Happened
Your company brought in Tim Raap to look at how your team handles the admin side of projects — paperwork, approvals, reports, field-to-office communication. The goal was to find where the most time was being lost and fix the biggest one.

This is what we found and what we changed.

---

### What Changed

**Before:**
[2-3 sentences describing the old process in plain language. Be specific. "Every morning, the foreman would text photos to the PM, who would download them, rename them, and upload them to Procore. If a photo didn't come in, nobody knew until billing."]

**Now:**
[2-3 sentences describing the new process. Same level of specificity. "Photos get tagged and uploaded directly from the field. If a report isn't submitted by 4pm, the PM gets an automatic flag. No more chasing."]

---

### What You Need to Do Differently

**If you're a foreman / field lead:**
1. [Step 1 — specific action, not a concept]
2. [Step 2]
3. [Step 3]

**If you're a PM / project coordinator:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**If you're the office / admin:**
1. [Step 1]
2. [Step 2]

---

### What Stays the Same
- [List things that DON'T change — important for reducing anxiety]
- [e.g., "You still use Procore for submittals. That's not changing."]
- [e.g., "Your daily call with the PM still happens. This just means you're not repeating the same info."]

---

### If Something Breaks
If the new process isn't working or something's not right:

1. **First:** Go back to the old way. It still works. Nothing got removed.
2. **Then:** Tell [PM name or office contact] what happened.
3. **We'll fix it:** Tim is available for 30 days after this rollout. [Contact info]

---

### Quick Reference Card

*(Tear-off or screenshot-friendly — the 30-second version)*

| Situation | What you do now |
|-----------|----------------|
| [Common scenario 1] | [New action] |
| [Common scenario 2] | [New action] |
| [Common scenario 3] | [New action] |
| Something's broken | [Fallback action] |

---

*End of product package.*
