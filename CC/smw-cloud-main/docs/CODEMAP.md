# SMW Cloud Codemap

Navigation aid for the Sprint 0 scaffold. Updated at the end of each sprint.

## Entry points

| Surface | File |
|---|---|
| Web app | [app/page.tsx](../app/page.tsx) |
| Daily workload dashboard | [app/(dashboard)/dashboard/page.tsx](../app/(dashboard)/dashboard/page.tsx) |
| Work package list | [app/(dashboard)/work-packages/page.tsx](../app/(dashboard)/work-packages/page.tsx) |
| Work package detail | [app/(dashboard)/work-packages/[id]/page.tsx](../app/(dashboard)/work-packages/[id]/page.tsx) |
| Login | [app/(auth)/login/page.tsx](../app/(auth)/login/page.tsx) |
| Health API | [app/api/health/route.ts](../app/api/health/route.ts) |
| Daily workload API | [app/api/v1/daily-workload/route.ts](../app/api/v1/daily-workload/route.ts) |
| Summaries API | [app/api/v1/summaries/route.ts](../app/api/v1/summaries/route.ts) — deterministic summary layer (PRD §21); `ready_to_ship` live |
| Work packages API | [app/api/v1/work-packages/route.ts](../app/api/v1/work-packages/route.ts) |
| Work package detail API | [app/api/v1/work-packages/[id]/route.ts](../app/api/v1/work-packages/[id]/route.ts) |
| Status events API | [app/api/v1/work-packages/[id]/status-events/route.ts](../app/api/v1/work-packages/[id]/status-events/route.ts) |
| Worker | [worker/index.ts](../worker/index.ts) |
| Dev loop | [scripts/dev.ts](../scripts/dev.ts) |
| Seed | [scripts/seed.ts](../scripts/seed.ts) |

## Core modules

| Module | Purpose |
|---|---|
| [lib/env.ts](../lib/env.ts) | Zod-validated env; cached; throws on startup if invalid |
| [lib/ids.ts](../lib/ids.ts) | Prefixed ULIDs per PRD §9.2 (`proj_`, `job_`, `wp_`, `se_`, …) |
| [lib/db.ts](../lib/db.ts) | pg Pool singleton + `query()` / `withTx()` helpers |
| [lib/queue.ts](../lib/queue.ts) | BullMQ queues (`publish-ingest`, `schedule-parse`, `distro-parse`, `workload-parse`, `teams-notify`, `summaries`, `fabops`) |
| [lib/fabops/jobs.ts](../lib/fabops/jobs.ts) | FabOps BullMQ payload contract + producer helpers |
| [lib/auth.ts](../lib/auth.ts) | `Session`, `ROLES`, `hasRole`, `getSession`, `requireAuth` — local-admin only in Sprint 0 |
| [lib/logger.ts](../lib/logger.ts) | pino, pretty in dev, JSON in prod |
| [lib/workflow-status.ts](../lib/workflow-status.ts) | Work package status/source constants and transition validation |
| [lib/queries/work-packages.ts](../lib/queries/work-packages.ts) | Daily workload, work package, parts, schedule, publish, and status-event read/write models |

## Worker jobs

All placeholders until their sprint lands.

| Job | File | Arrives |
|---|---|---|
| publish-ingest | [worker/jobs/publish-ingest.ts](../worker/jobs/publish-ingest.ts) | Sprint 2 |
| schedule-parse | [worker/jobs/schedule-parse.ts](../worker/jobs/schedule-parse.ts) | Sprint 1 |
| distro-parse | [worker/jobs/distro-parse.ts](../worker/jobs/distro-parse.ts) | Sprint 1 |
| workload-parse | [worker/jobs/workload-parse.ts](../worker/jobs/workload-parse.ts) | Sprint 1 |
| teams-notify | [worker/jobs/teams-notify.ts](../worker/jobs/teams-notify.ts) | Sprint 4 |
| summaries | [worker/jobs/summaries.ts](../worker/jobs/summaries.ts) | `ready_to_ship` live; other kinds Sprint 4 |
| fabops | [worker/jobs/fabops.ts](../worker/jobs/fabops.ts) | Fabrication 2026 bridge |

## FabOps / Fabrication integration

| Doc | Purpose |
|---|---|
| [fabops/README.md](../fabops/README.md) | .NET engine layout + Fabrication 2026 compatibility status |
| [fabops/docs/troubleshooting.md](../fabops/docs/troubleshooting.md) | Field symptoms, 2026 API fixes, verification commands |
| [fabops/docs/nextjs-integration.md](../fabops/docs/nextjs-integration.md) | BullMQ queue contract and Windows worker bridge |

The FabOps API surface lives at [app/api/fabops/jobs/route.ts](../app/api/fabops/jobs/route.ts) — POST enqueues engine jobs, GET polls status by job id.

## Data model

One migration covers everything: [db/migrations/20260421000001_init.sql](../db/migrations/20260421000001_init.sql).

### Schema origin notes

The schema tracks **both** the PRD §18 minimum set and the real shape of SMW's daily artifacts:

- **`schedule_work_items`** — mirrors the real PLS workbook rows (A=`record_type`, B=`po_number`, C=`smw_job_number`+`job_code_prefix`, D=`company_job_name`, E=`hrs_bid`, F=`m_rate_usd`, G=`sell_price_usd`, H=`pounds`, I=`actual_hrs`, J=`full_job_hrs`, K=`pd_date_text`/`pd_direction`, L=`notes`, M=`total_job_usd`, N=`ship_notes`, O=`remaining_usd`, R–AB=`department_breakdown` JSON).
- **`schedule_capacity_snapshots`** — rich header-block metrics (workforce counts, hour pools, OT forecast, RPMA, mega vs non-mega $).
- **`schedule_recap_flags`** — RECAP tab daily QA checklist.
- **`distro_reports` / `distro_report_items`** — the "SMW WL Distro Report" PDFs (service-type pick lists).
- **`job_workload_reports` / `workload_fabrication_operations`** — the per-job Workload/Remediation PDFs (POUNDS REPORT, COIL LINE, LINER, WELDING, CANVAS, Airturns, STIFFNERS, ROUND FAB, SPIRAL STOCK).
- **`service_types` / `part_codes`** — material catalog (Duct Accessory, SMW Warm Air, SMW Spiral, ...; WAELBOW/10, SR08, B9012G, ...).

### Append-only / no hard delete

- `status_events`, `shipment_events`, `audit_logs`, `publish_versions`, `schedule_imports`, `notification_attempts`

### Phase 3 execution UX

- Dashboard and work package pages read persisted Postgres operational state only.
- UI render paths do **not** call the Windows FabOps engine directly; FabOps output is consumed after it is persisted to `publish_versions`, `work_packages`, `parts`, and related rows.
- Status mutations go through `status_events` plus transactional `work_packages.current_status` updates.

## Fixtures

- [fixtures/schedule/](../fixtures/schedule/) — real PLS weekly workbook.
- [fixtures/distro/](../fixtures/distro/) — 4-20 & 4-21 Thermaduct distro + workload PDFs.
- [fixtures/publish/](../fixtures/publish/) — synthetic Autodesk bundle (lands in Sprint 2 parser work).
