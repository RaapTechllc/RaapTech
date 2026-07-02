import type { Job } from "bullmq";
import { logger } from "@/lib/logger";
import { getReadyToShipSummary, isIsoDate } from "@/lib/queries/work-packages";

export interface SummariesPayload {
  kind: "superintendent_daily" | "pm_daily" | "publish_delta" | "ready_to_ship";
  targetDate: string;
}

export async function summariesHandler(job: Job<SummariesPayload>): Promise<void> {
  const { kind, targetDate } = job.data;

  if (!isIsoDate(targetDate)) {
    throw new Error(`summaries: targetDate must use YYYY-MM-DD, got "${targetDate}"`);
  }

  if (kind !== "ready_to_ship") {
    logger.info({ jobId: job.id, kind, targetDate }, `summaries: ${kind} not implemented yet`);
    return;
  }

  const summary = await getReadyToShipSummary(targetDate);

  logger.info(
    {
      jobId: job.id,
      kind: summary.kind,
      targetDate: summary.date,
      counts: summary.counts,
      narrative: summary.narrative,
    },
    "summaries: built ready_to_ship summary",
  );
}
