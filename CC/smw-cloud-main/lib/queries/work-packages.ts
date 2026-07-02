import type { PoolClient, QueryResultRow } from "pg";
import type { Session } from "@/lib/auth";
import { query, withTx } from "@/lib/db";
import { newId } from "@/lib/ids";
import {
  hasRequiredStatusNotes,
  isStatusEventSource,
  isWorkPackageStatus,
  validateStatusTransition,
  type StatusEventSource,
  type WorkPackageStatus,
} from "@/lib/workflow-status";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export class WorkPackageQueryError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "WorkPackageQueryError";
  }
}

export interface CapacitySummary {
  availableHours: number | null;
  actualHours: number | null;
  totalHours: number | null;
  scheduledHours: number | null;
  capacityDeltaHours: number | null;
  totalPounds: number | null;
  totalSoldUsd: number | null;
}

export interface StatusTimelineEvent {
  id: string;
  workPackageId: string;
  fromStatus: WorkPackageStatus | null;
  toStatus: WorkPackageStatus;
  occurredAt: string;
  actorUserId: string | null;
  source: StatusEventSource;
  notes: string | null;
  deviceId: string | null;
  locationHint: string | null;
}

export interface DailyWorkloadItem {
  workPackageId: string | null;
  scheduleWorkItemId: string | null;
  projectCode: string | null;
  projectName: string | null;
  jobNumber: string | null;
  jobCodePrefix: string;
  label: string;
  workPackageCode: string | null;
  workPackageName: string | null;
  status: WorkPackageStatus | "plan_only";
  category: string | null;
  isHot: boolean;
  isDueToday: boolean;
  isMegaProject: boolean;
  plannedDueDate: string | null;
  notes: string | null;
  matchConfidence: string | null;
}

export interface DailyWorkloadResponse {
  date: string;
  capacity: CapacitySummary | null;
  counts: {
    hot: number;
    dueToday: number;
    holds: number;
    readyToShip: number;
    shippedToday: number;
    activeWorkPackages: number;
  };
  sections: {
    hot: DailyWorkloadItem[];
    dueToday: DailyWorkloadItem[];
    holds: DailyWorkloadItem[];
    readyToShip: DailyWorkloadItem[];
    recentActivity: StatusTimelineEvent[];
  };
}

export interface ReadyToShipItem {
  workPackageId: string;
  workPackageCode: string;
  workPackageName: string;
  jobNumber: string;
  jobCodePrefix: string;
  jobName: string;
  projectCode: string | null;
  projectName: string | null;
  plannedDueDate: string | null;
  isHot: boolean;
  isMegaProject: boolean;
  isOverdue: boolean;
  readySince: string | null;
}

// Prompt-safe data contract per PRD §21.2: machine fields, a short
// human-readable narrative, and source counts + timestamps.
export interface ReadyToShipSummary {
  kind: "ready_to_ship";
  date: string;
  generatedAt: string;
  counts: {
    readyToShip: number;
    hot: number;
    mega: number;
    overdue: number;
  };
  narrative: string;
  items: ReadyToShipItem[];
}

export interface WorkPackageListItem {
  id: string;
  code: string;
  name: string;
  status: WorkPackageStatus;
  plannedDueDate: string | null;
  updatedAt: string;
  isHot: boolean;
  isMegaProject: boolean;
  holdReason: string | null;
  projectId: string | null;
  projectCode: string | null;
  projectName: string | null;
  jobId: string;
  jobNumber: string;
  jobCodePrefix: string;
  jobName: string;
}

export interface WorkPackageListResponse {
  items: WorkPackageListItem[];
  nextCursor: string | null;
  limit: number;
}

export interface WorkPackageFilters {
  date?: string;
  projectId?: string;
  jobId?: string;
  status?: WorkPackageStatus;
  hot?: boolean;
  mega?: boolean;
  hold?: boolean;
  q?: string;
  cursor?: string;
  limit: number;
}

export interface WorkPackageSummary extends WorkPackageListItem {
  type: string;
  latestPublishVersionId: string | null;
  viewerNodeRef: string | null;
}

export interface ProjectSummary {
  id: string;
  code: string;
  name: string;
  customerName: string | null;
}

export interface JobSummary {
  id: string;
  smwJobNumber: string;
  jobCodePrefix: string;
  poNumber: string | null;
  name: string;
  customerName: string | null;
  plannedDueDate: string | null;
  isMega: boolean;
}

export interface PublishSummary {
  id: string;
  sourceSystem: string;
  sourceFileName: string | null;
  processingStatus: string;
  viewerStatus: string;
  publishedAt: string;
  workPackageCount: number;
  partCount: number;
}

export interface ScheduleWorkItemSummary {
  id: string;
  date: string;
  category: string;
  companyJobName: string | null;
  poNumber: string | null;
  sellPriceUsd: number | null;
  pounds: number | null;
  actualHrs: number | null;
  fullJobHrs: number | null;
  notes: string | null;
  shipNotes: string | null;
  matchConfidence: string | null;
}

export interface PartSummary {
  id: string;
  code: string;
  name: string | null;
  qty: number;
  metadata: unknown;
}

export interface WorkPackageDetailResponse {
  workPackage: WorkPackageSummary;
  project: ProjectSummary | null;
  job: JobSummary;
  latestPublish: PublishSummary | null;
  scheduleItem: ScheduleWorkItemSummary | null;
  parts: PartSummary[];
  statusEvents: StatusTimelineEvent[];
}

export interface CreateStatusEventInput {
  workPackageId: string;
  toStatus: WorkPackageStatus;
  source: StatusEventSource;
  notes?: string;
  deviceId?: string;
  locationHint?: string;
}

interface CapacityRow extends QueryResultRow {
  availableHours: string | null;
  actualHours: string | null;
  totalHours: string | null;
  scheduledHours: string | null;
  capacityDeltaHours: string | null;
  totalPounds: string | null;
  totalSoldUsd: string | null;
}

interface DailyItemRow extends QueryResultRow {
  workPackageId: string | null;
  scheduleWorkItemId: string | null;
  projectCode: string | null;
  projectName: string | null;
  jobNumber: string | null;
  jobCodePrefix: string | null;
  label: string | null;
  workPackageCode: string | null;
  workPackageName: string | null;
  status: string | null;
  category: string | null;
  isHot: boolean | null;
  isDueToday: boolean | null;
  isMegaProject: boolean | null;
  plannedDueDate: string | null;
  notes: string | null;
  matchConfidence: string | null;
}

interface StatusEventRow extends QueryResultRow {
  id: string;
  workPackageId: string;
  fromStatus: string | null;
  toStatus: string;
  occurredAt: string;
  actorUserId: string | null;
  source: string;
  notes: string | null;
  deviceId: string | null;
  locationHint: string | null;
}

interface CountRow extends QueryResultRow {
  count: string;
}

interface ReadyToShipRow extends QueryResultRow {
  workPackageId: string;
  workPackageCode: string | null;
  workPackageName: string | null;
  jobNumber: string;
  jobCodePrefix: string;
  jobName: string;
  projectCode: string | null;
  projectName: string | null;
  plannedDueDate: string | null;
  isHot: boolean | null;
  isMegaProject: boolean | null;
  isOverdue: boolean | null;
  readySince: string | null;
}

interface WorkPackageListRow extends QueryResultRow {
  id: string;
  code: string;
  name: string;
  status: string;
  plannedDueDate: string | null;
  updatedAt: string;
  isHot: boolean;
  isMegaProject: boolean;
  holdReason: string | null;
  projectId: string | null;
  projectCode: string | null;
  projectName: string | null;
  jobId: string;
  jobNumber: string;
  jobCodePrefix: string;
  jobName: string;
}

interface WorkPackageDetailRow extends WorkPackageListRow {
  type: string;
  latestPublishVersionId: string | null;
  viewerNodeRef: string | null;
  projectCustomerName: string | null;
  jobPoNumber: string | null;
  jobCustomerName: string | null;
  jobPlannedDueDate: string | null;
  jobIsMega: boolean;
  publishId: string | null;
  publishSourceSystem: string | null;
  publishSourceFileName: string | null;
  publishProcessingStatus: string | null;
  publishViewerStatus: string | null;
  publishPublishedAt: string | null;
  publishWorkPackageCount: number | null;
  publishPartCount: number | null;
  scheduleItemId: string | null;
  scheduleDate: string | null;
  scheduleCategory: string | null;
  scheduleCompanyJobName: string | null;
  schedulePoNumber: string | null;
  scheduleSellPriceUsd: string | null;
  schedulePounds: string | null;
  scheduleActualHrs: string | null;
  scheduleFullJobHrs: string | null;
  scheduleNotes: string | null;
  scheduleShipNotes: string | null;
  scheduleMatchConfidence: string | null;
}

interface PartRow extends QueryResultRow {
  id: string;
  code: string;
  name: string | null;
  qty: string;
  metadata: unknown;
}

function toNumber(value: string | number | null): number | null {
  if (value === null) return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function toRequiredNumber(value: string | number): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function todayInTimeZone(timeZone = "America/Chicago"): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function parseBooleanFilter(value: string | null): boolean | undefined {
  if (value === null || value === "") return undefined;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  throw new WorkPackageQueryError(`invalid boolean filter: ${value}`, 400);
}

export function parseLimit(value: string | null): number {
  if (value === null || value === "") return DEFAULT_LIMIT;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new WorkPackageQueryError("limit must be a positive integer", 400);
  }
  return Math.min(parsed, MAX_LIMIT);
}

export function parseWorkPackageFilters(params: URLSearchParams): WorkPackageFilters {
  const date = params.get("date") ?? undefined;
  if (date && !isIsoDate(date)) {
    throw new WorkPackageQueryError("date must use YYYY-MM-DD", 400);
  }

  const statusParam = params.get("status");
  const status =
    statusParam === null || statusParam === ""
      ? undefined
      : parseWorkPackageStatusFilter(statusParam);

  const q = params.get("q")?.trim();

  return {
    date,
    projectId: params.get("projectId") ?? undefined,
    jobId: params.get("jobId") ?? undefined,
    status,
    hot: parseBooleanFilter(params.get("hot")),
    mega: parseBooleanFilter(params.get("mega")),
    hold: parseBooleanFilter(params.get("hold")),
    q: q && q.length > 0 ? q : undefined,
    cursor: params.get("cursor") ?? undefined,
    limit: parseLimit(params.get("limit")),
  };
}

function parseWorkPackageStatusFilter(value: string): WorkPackageStatus {
  if (!isWorkPackageStatus(value)) {
    throw new WorkPackageQueryError("invalid status filter", 400);
  }
  return value;
}

function mapStatusEvent(row: StatusEventRow): StatusTimelineEvent {
  if (!isWorkPackageStatus(row.toStatus) || !isStatusEventSource(row.source)) {
    throw new WorkPackageQueryError("status event contains invalid persisted values", 500);
  }

  const fromStatus = row.fromStatus;
  if (fromStatus !== null && !isWorkPackageStatus(fromStatus)) {
    throw new WorkPackageQueryError("status event contains invalid from_status", 500);
  }

  return {
    id: row.id,
    workPackageId: row.workPackageId,
    fromStatus,
    toStatus: row.toStatus,
    occurredAt: row.occurredAt,
    actorUserId: row.actorUserId,
    source: row.source,
    notes: row.notes,
    deviceId: row.deviceId,
    locationHint: row.locationHint,
  };
}

function mapDailyItem(row: DailyItemRow): DailyWorkloadItem {
  const status = row.status ?? "plan_only";
  if (status !== "plan_only" && !isWorkPackageStatus(status)) {
    throw new WorkPackageQueryError("daily workload contains invalid status", 500);
  }

  return {
    workPackageId: row.workPackageId,
    scheduleWorkItemId: row.scheduleWorkItemId,
    projectCode: row.projectCode,
    projectName: row.projectName,
    jobNumber: row.jobNumber,
    jobCodePrefix: row.jobCodePrefix ?? "",
    label: row.label ?? "Unlabeled work",
    workPackageCode: row.workPackageCode,
    workPackageName: row.workPackageName,
    status,
    category: row.category,
    isHot: row.isHot ?? false,
    isDueToday: row.isDueToday ?? false,
    isMegaProject: row.isMegaProject ?? false,
    plannedDueDate: row.plannedDueDate,
    notes: row.notes,
    matchConfidence: row.matchConfidence,
  };
}

function mapListItem(row: WorkPackageListRow): WorkPackageListItem {
  if (!isWorkPackageStatus(row.status)) {
    throw new WorkPackageQueryError("work package contains invalid status", 500);
  }

  return {
    id: row.id,
    code: row.code,
    name: row.name,
    status: row.status,
    plannedDueDate: row.plannedDueDate,
    updatedAt: row.updatedAt,
    isHot: row.isHot,
    isMegaProject: row.isMegaProject,
    holdReason: row.holdReason,
    projectId: row.projectId,
    projectCode: row.projectCode,
    projectName: row.projectName,
    jobId: row.jobId,
    jobNumber: row.jobNumber,
    jobCodePrefix: row.jobCodePrefix,
    jobName: row.jobName,
  };
}

export async function getDailyWorkload(date: string): Promise<DailyWorkloadResponse> {
  if (!isIsoDate(date)) {
    throw new WorkPackageQueryError("date must use YYYY-MM-DD", 400);
  }

  const [
    capacityResult,
    packageResult,
    scheduleOnlyResult,
    activityResult,
    shippedCountResult,
  ] = await Promise.all([
    query<CapacityRow>(
      `SELECT
         available_hours::text AS "availableHours",
         actual_hours::text AS "actualHours",
         total_hours::text AS "totalHours",
         (continuing_ops_hours + new_input_hours)::text AS "scheduledHours",
         (available_hours - COALESCE(actual_hours, continuing_ops_hours + new_input_hours))::text AS "capacityDeltaHours",
         total_pounds::text AS "totalPounds",
         total_sold_usd::text AS "totalSoldUsd"
       FROM schedule_capacity_snapshots
       WHERE date = $1
       ORDER BY id DESC
       LIMIT 1`,
      [date],
    ),
    query<DailyItemRow>(
      `SELECT
         wp.id AS "workPackageId",
         swi.id AS "scheduleWorkItemId",
         p.code AS "projectCode",
         p.name AS "projectName",
         j.smw_job_number AS "jobNumber",
         j.job_code_prefix AS "jobCodePrefix",
         CONCAT(j.smw_job_number, CASE WHEN wp.code IS NULL THEN '' ELSE ' / ' || wp.code END) AS label,
         wp.code AS "workPackageCode",
         wp.name AS "workPackageName",
         wp.current_status AS status,
         swi.category AS category,
         (wp.is_hot OR COALESCE(swi.is_hot, false)) AS "isHot",
         (wp.planned_due_date = $1::date OR COALESCE(swi.is_due_today, false)) AS "isDueToday",
         (wp.is_mega_project OR COALESCE(j.is_mega, false) OR COALESCE(swi.is_mega_project, false)) AS "isMegaProject",
         wp.planned_due_date::text AS "plannedDueDate",
         COALESCE(wp.hold_reason, swi.notes) AS notes,
         swi.match_confidence AS "matchConfidence"
       FROM work_packages wp
       JOIN jobs j ON j.id = wp.job_id
       LEFT JOIN projects p ON p.id = j.project_id
       LEFT JOIN schedule_work_items swi ON swi.id = wp.schedule_work_item_id
       WHERE
         wp.planned_due_date = $1::date
         OR wp.is_hot = true
         OR wp.current_status IN ('hold', 'ready_to_ship')
       ORDER BY wp.priority DESC, wp.planned_due_date ASC NULLS LAST, wp.updated_at DESC
       LIMIT 100`,
      [date],
    ),
    query<DailyItemRow>(
      `SELECT
         NULL::text AS "workPackageId",
         swi.id AS "scheduleWorkItemId",
         p.code AS "projectCode",
         p.name AS "projectName",
         swi.smw_job_number AS "jobNumber",
         swi.job_code_prefix AS "jobCodePrefix",
         COALESCE(swi.company_job_name, swi.smw_job_number, swi.po_number, 'Schedule item') AS label,
         NULL::text AS "workPackageCode",
         NULL::text AS "workPackageName",
         NULL::text AS status,
         swi.category AS category,
         swi.is_hot AS "isHot",
         swi.is_due_today AS "isDueToday",
         swi.is_mega_project AS "isMegaProject",
         swi.date::text AS "plannedDueDate",
         COALESCE(swi.notes, swi.ship_notes) AS notes,
         swi.match_confidence AS "matchConfidence"
       FROM schedule_work_items swi
       LEFT JOIN jobs j ON j.id = swi.job_id
       LEFT JOIN projects p ON p.id = j.project_id
       LEFT JOIN work_packages wp ON wp.schedule_work_item_id = swi.id
       WHERE swi.date = $1::date AND wp.id IS NULL
       ORDER BY swi.row_index ASC
       LIMIT 100`,
      [date],
    ),
    query<StatusEventRow>(
      `SELECT
         se.id,
         se.work_package_id AS "workPackageId",
         se.from_status AS "fromStatus",
         se.to_status AS "toStatus",
         se.occurred_at::text AS "occurredAt",
         se.actor_user_id AS "actorUserId",
         se.source,
         se.notes,
         se.device_id AS "deviceId",
         se.location_hint AS "locationHint"
       FROM status_events se
       JOIN work_packages wp ON wp.id = se.work_package_id
       WHERE se.occurred_at >= $1::date AND se.occurred_at < ($1::date + INTERVAL '1 day')
       ORDER BY se.occurred_at DESC
       LIMIT 10`,
      [date],
    ),
    query<CountRow>(
      `SELECT COUNT(*)::text AS count
       FROM status_events
       WHERE to_status = 'shipped'
         AND occurred_at >= $1::date
         AND occurred_at < ($1::date + INTERVAL '1 day')`,
      [date],
    ),
  ]);

  const capacityRow = capacityResult.rows[0];
  const capacity = capacityRow
    ? {
        availableHours: toNumber(capacityRow.availableHours),
        actualHours: toNumber(capacityRow.actualHours),
        totalHours: toNumber(capacityRow.totalHours),
        scheduledHours: toNumber(capacityRow.scheduledHours),
        capacityDeltaHours: toNumber(capacityRow.capacityDeltaHours),
        totalPounds: toNumber(capacityRow.totalPounds),
        totalSoldUsd: toNumber(capacityRow.totalSoldUsd),
      }
    : null;

  const items = [...packageResult.rows, ...scheduleOnlyResult.rows].map(mapDailyItem);
  const recentActivity = activityResult.rows.map(mapStatusEvent);
  const hot = items.filter((item) => item.isHot);
  const dueToday = items.filter((item) => item.isDueToday);
  const holds = items.filter((item) => item.status === "hold");
  const readyToShip = items.filter((item) => item.status === "ready_to_ship");

  return {
    date,
    capacity,
    counts: {
      hot: hot.length,
      dueToday: dueToday.length,
      holds: holds.length,
      readyToShip: readyToShip.length,
      shippedToday: Number(shippedCountResult.rows[0]?.count ?? 0),
      activeWorkPackages: items.filter(
        (item) => item.workPackageId && item.status !== "shipped" && item.status !== "canceled",
      ).length,
    },
    sections: {
      hot,
      dueToday,
      holds,
      readyToShip,
      recentActivity,
    },
  };
}

function mapReadyToShipItem(row: ReadyToShipRow): ReadyToShipItem {
  return {
    workPackageId: row.workPackageId,
    workPackageCode: row.workPackageCode ?? "",
    workPackageName: row.workPackageName ?? "",
    jobNumber: row.jobNumber,
    jobCodePrefix: row.jobCodePrefix,
    jobName: row.jobName,
    projectCode: row.projectCode,
    projectName: row.projectName,
    plannedDueDate: row.plannedDueDate,
    isHot: row.isHot ?? false,
    isMegaProject: row.isMegaProject ?? false,
    isOverdue: row.isOverdue ?? false,
    readySince: row.readySince,
  };
}

function buildReadyToShipNarrative(date: string, items: ReadyToShipItem[]): string {
  if (items.length === 0) {
    return `No work packages are ready to ship as of ${date}.`;
  }

  const hot = items.filter((item) => item.isHot).length;
  const overdue = items.filter((item) => item.isOverdue).length;
  const noun = items.length === 1 ? "work package" : "work packages";
  const qualifiers: string[] = [];
  if (hot > 0) qualifiers.push(`${hot} hot`);
  if (overdue > 0) qualifiers.push(`${overdue} overdue`);
  const tail = qualifiers.length > 0 ? ` — ${qualifiers.join(", ")}.` : ".";

  return `${items.length} ${noun} ready to ship as of ${date}${tail}`;
}

export async function getReadyToShipSummary(date: string): Promise<ReadyToShipSummary> {
  if (!isIsoDate(date)) {
    throw new WorkPackageQueryError("date must use YYYY-MM-DD", 400);
  }

  const result = await query<ReadyToShipRow>(
    `SELECT
       wp.id AS "workPackageId",
       wp.code AS "workPackageCode",
       wp.name AS "workPackageName",
       j.smw_job_number AS "jobNumber",
       j.job_code_prefix AS "jobCodePrefix",
       j.name AS "jobName",
       p.code AS "projectCode",
       p.name AS "projectName",
       wp.planned_due_date::text AS "plannedDueDate",
       wp.is_hot AS "isHot",
       (wp.is_mega_project OR COALESCE(j.is_mega, false)) AS "isMegaProject",
       (wp.planned_due_date IS NOT NULL AND wp.planned_due_date < $1::date) AS "isOverdue",
       rts.ready_since::text AS "readySince"
     FROM work_packages wp
     JOIN jobs j ON j.id = wp.job_id
     LEFT JOIN projects p ON p.id = j.project_id
     LEFT JOIN LATERAL (
       SELECT MAX(se.occurred_at) AS ready_since
       FROM status_events se
       WHERE se.work_package_id = wp.id AND se.to_status = 'ready_to_ship'
     ) rts ON true
     WHERE wp.current_status = 'ready_to_ship'
     ORDER BY wp.is_hot DESC, wp.planned_due_date ASC NULLS LAST, wp.updated_at DESC
     LIMIT 200`,
    [date],
  );

  const items = result.rows.map(mapReadyToShipItem);

  return {
    kind: "ready_to_ship",
    date,
    generatedAt: new Date().toISOString(),
    counts: {
      readyToShip: items.length,
      hot: items.filter((item) => item.isHot).length,
      mega: items.filter((item) => item.isMegaProject).length,
      overdue: items.filter((item) => item.isOverdue).length,
    },
    narrative: buildReadyToShipNarrative(date, items),
    items,
  };
}

export async function listWorkPackages(
  filters: WorkPackageFilters,
): Promise<WorkPackageListResponse> {
  const where: string[] = [];
  const params: unknown[] = [];

  function addParam(value: unknown): string {
    params.push(value);
    return `$${params.length}`;
  }

  if (filters.date) where.push(`wp.planned_due_date = ${addParam(filters.date)}::date`);
  if (filters.projectId) where.push(`p.id = ${addParam(filters.projectId)}`);
  if (filters.jobId) where.push(`j.id = ${addParam(filters.jobId)}`);
  if (filters.status) where.push(`wp.current_status = ${addParam(filters.status)}`);
  if (filters.hot !== undefined) where.push(`wp.is_hot = ${addParam(filters.hot)}`);
  if (filters.mega !== undefined) where.push(`wp.is_mega_project = ${addParam(filters.mega)}`);
  if (filters.hold !== undefined) {
    where.push(
      filters.hold
        ? `wp.current_status = 'hold'`
        : `wp.current_status <> 'hold'`,
    );
  }
  if (filters.cursor) where.push(`wp.id > ${addParam(filters.cursor)}`);
  if (filters.q) {
    const pattern = `%${filters.q}%`;
    where.push(
      `(wp.code ILIKE ${addParam(pattern)}
        OR wp.name ILIKE ${addParam(pattern)}
        OR j.smw_job_number ILIKE ${addParam(pattern)}
        OR j.name ILIKE ${addParam(pattern)}
        OR p.code ILIKE ${addParam(pattern)})`,
    );
  }

  const sql = `SELECT
      wp.id,
      wp.code,
      wp.name,
      wp.current_status AS status,
      wp.planned_due_date::text AS "plannedDueDate",
      wp.updated_at::text AS "updatedAt",
      wp.is_hot AS "isHot",
      wp.is_mega_project AS "isMegaProject",
      wp.hold_reason AS "holdReason",
      p.id AS "projectId",
      p.code AS "projectCode",
      p.name AS "projectName",
      j.id AS "jobId",
      j.smw_job_number AS "jobNumber",
      j.job_code_prefix AS "jobCodePrefix",
      j.name AS "jobName"
    FROM work_packages wp
    JOIN jobs j ON j.id = wp.job_id
    LEFT JOIN projects p ON p.id = j.project_id
    ${where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY wp.id ASC
    LIMIT ${addParam(filters.limit + 1)}`;

  const result = await query<WorkPackageListRow>(sql, params);
  const rows = result.rows.slice(0, filters.limit);
  const extra = result.rows[filters.limit];

  return {
    items: rows.map(mapListItem),
    nextCursor: extra?.id ?? null,
    limit: filters.limit,
  };
}

export async function getWorkPackageDetail(
  id: string,
): Promise<WorkPackageDetailResponse | null> {
  const detailResult = await query<WorkPackageDetailRow>(
    `SELECT
       wp.id,
       wp.code,
       wp.name,
       wp.type,
       wp.current_status AS status,
       wp.planned_due_date::text AS "plannedDueDate",
       wp.updated_at::text AS "updatedAt",
       wp.is_hot AS "isHot",
       wp.is_mega_project AS "isMegaProject",
       wp.hold_reason AS "holdReason",
       wp.latest_publish_version_id AS "latestPublishVersionId",
       wp.viewer_node_ref AS "viewerNodeRef",
       p.id AS "projectId",
       p.code AS "projectCode",
       p.name AS "projectName",
       p.customer_name AS "projectCustomerName",
       j.id AS "jobId",
       j.smw_job_number AS "jobNumber",
       j.job_code_prefix AS "jobCodePrefix",
       j.name AS "jobName",
       j.po_number AS "jobPoNumber",
       j.customer_name AS "jobCustomerName",
       j.planned_due_date::text AS "jobPlannedDueDate",
       j.is_mega AS "jobIsMega",
       pv.id AS "publishId",
       pv.source_system AS "publishSourceSystem",
       pv.source_file_name AS "publishSourceFileName",
       pv.processing_status AS "publishProcessingStatus",
       pv.viewer_status AS "publishViewerStatus",
       pv.published_at::text AS "publishPublishedAt",
       pv.work_package_count AS "publishWorkPackageCount",
       pv.part_count AS "publishPartCount",
       swi.id AS "scheduleItemId",
       swi.date::text AS "scheduleDate",
       swi.category AS "scheduleCategory",
       swi.company_job_name AS "scheduleCompanyJobName",
       swi.po_number AS "schedulePoNumber",
       swi.sell_price_usd::text AS "scheduleSellPriceUsd",
       swi.pounds::text AS "schedulePounds",
       swi.actual_hrs::text AS "scheduleActualHrs",
       swi.full_job_hrs::text AS "scheduleFullJobHrs",
       swi.notes AS "scheduleNotes",
       swi.ship_notes AS "scheduleShipNotes",
       swi.match_confidence AS "scheduleMatchConfidence"
     FROM work_packages wp
     JOIN jobs j ON j.id = wp.job_id
     LEFT JOIN projects p ON p.id = j.project_id
     LEFT JOIN publish_versions pv ON pv.id = wp.latest_publish_version_id
     LEFT JOIN schedule_work_items swi ON swi.id = wp.schedule_work_item_id
     WHERE wp.id = $1
     LIMIT 1`,
    [id],
  );

  const row = detailResult.rows[0];
  if (!row) return null;

  const [partsResult, events] = await Promise.all([
    query<PartRow>(
      `SELECT id, code, name, qty::text, metadata
       FROM parts
       WHERE work_package_id = $1
       ORDER BY code ASC`,
      [id],
    ),
    getStatusEvents(id),
  ]);

  const workPackage = mapListItem(row);

  return {
    workPackage: {
      ...workPackage,
      type: row.type,
      latestPublishVersionId: row.latestPublishVersionId,
      viewerNodeRef: row.viewerNodeRef,
    },
    project: row.projectId
      ? {
          id: row.projectId,
          code: row.projectCode ?? "",
          name: row.projectName ?? "",
          customerName: row.projectCustomerName,
        }
      : null,
    job: {
      id: row.jobId,
      smwJobNumber: row.jobNumber,
      jobCodePrefix: row.jobCodePrefix,
      poNumber: row.jobPoNumber,
      name: row.jobName,
      customerName: row.jobCustomerName,
      plannedDueDate: row.jobPlannedDueDate,
      isMega: row.jobIsMega,
    },
    latestPublish: row.publishId
      ? {
          id: row.publishId,
          sourceSystem: row.publishSourceSystem ?? "other",
          sourceFileName: row.publishSourceFileName,
          processingStatus: row.publishProcessingStatus ?? "received",
          viewerStatus: row.publishViewerStatus ?? "not_requested",
          publishedAt: row.publishPublishedAt ?? "",
          workPackageCount: row.publishWorkPackageCount ?? 0,
          partCount: row.publishPartCount ?? 0,
        }
      : null,
    scheduleItem: row.scheduleItemId
      ? {
          id: row.scheduleItemId,
          date: row.scheduleDate ?? "",
          category: row.scheduleCategory ?? "other",
          companyJobName: row.scheduleCompanyJobName,
          poNumber: row.schedulePoNumber,
          sellPriceUsd: toNumber(row.scheduleSellPriceUsd),
          pounds: toNumber(row.schedulePounds),
          actualHrs: toNumber(row.scheduleActualHrs),
          fullJobHrs: toNumber(row.scheduleFullJobHrs),
          notes: row.scheduleNotes,
          shipNotes: row.scheduleShipNotes,
          matchConfidence: row.scheduleMatchConfidence,
        }
      : null,
    parts: partsResult.rows.map((part) => ({
      id: part.id,
      code: part.code,
      name: part.name,
      qty: toRequiredNumber(part.qty),
      metadata: part.metadata,
    })),
    statusEvents: events,
  };
}

export async function getStatusEvents(workPackageId: string): Promise<StatusTimelineEvent[]> {
  const result = await query<StatusEventRow>(
    `SELECT
       id,
       work_package_id AS "workPackageId",
       from_status AS "fromStatus",
       to_status AS "toStatus",
       occurred_at::text AS "occurredAt",
       actor_user_id AS "actorUserId",
       source,
       notes,
       device_id AS "deviceId",
       location_hint AS "locationHint"
     FROM status_events
     WHERE work_package_id = $1
     ORDER BY occurred_at DESC`,
    [workPackageId],
  );

  return result.rows.map(mapStatusEvent);
}

export async function createStatusEvent(
  input: CreateStatusEventInput,
  session: Session,
): Promise<StatusTimelineEvent> {
  if (!hasRequiredStatusNotes(input.toStatus, input.notes)) {
    throw new WorkPackageQueryError("hold status requires notes", 400);
  }

  return withTx(async (client) => createStatusEventInTx(client, input, session));
}

async function createStatusEventInTx(
  client: PoolClient,
  input: CreateStatusEventInput,
  session: Session,
): Promise<StatusTimelineEvent> {
  const currentResult = await client.query<{ current_status: string }>(
    `SELECT current_status FROM work_packages WHERE id = $1 FOR UPDATE`,
    [input.workPackageId],
  );

  const currentStatus = currentResult.rows[0]?.current_status;
  if (!currentStatus) {
    throw new WorkPackageQueryError("work package not found", 404);
  }
  if (!isWorkPackageStatus(currentStatus)) {
    throw new WorkPackageQueryError("work package contains invalid status", 500);
  }

  const transition = validateStatusTransition(currentStatus, input.toStatus);
  if (!transition.ok) {
    throw new WorkPackageQueryError(transition.reason ?? "invalid status transition", 400);
  }

  const eventId = newId("status_event");
  const eventResult = await client.query<StatusEventRow>(
    `INSERT INTO status_events (
       id,
       work_package_id,
       from_status,
       to_status,
       actor_user_id,
       source,
       notes,
       device_id,
       location_hint
     )
     VALUES (
       $1,
       $2,
       $3,
       $4,
       $5,
       $6,
       $7,
       $8,
       $9
     )
     RETURNING
       id,
       work_package_id AS "workPackageId",
       from_status AS "fromStatus",
       to_status AS "toStatus",
       occurred_at::text AS "occurredAt",
       actor_user_id AS "actorUserId",
       source,
       notes,
       device_id AS "deviceId",
       location_hint AS "locationHint"`,
    [
      eventId,
      input.workPackageId,
      currentStatus,
      input.toStatus,
      session.userId,
      input.source,
      input.notes?.trim() || null,
      input.deviceId?.trim() || null,
      input.locationHint?.trim() || null,
    ],
  );

  await client.query(
    `UPDATE work_packages
     SET
       current_status = $2,
       hold_reason = CASE WHEN $2 = 'hold' THEN $3 ELSE NULL END,
       updated_at = now()
     WHERE id = $1`,
    [input.workPackageId, input.toStatus, input.notes?.trim() || null],
  );

  const event = eventResult.rows[0];
  if (!event) {
    throw new WorkPackageQueryError("failed to create status event", 500);
  }

  return mapStatusEvent(event);
}
