import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  query: vi.fn(),
  withTx: vi.fn(),
}));

import { query } from "@/lib/db";
import { getReadyToShipSummary, WorkPackageQueryError } from "@/lib/queries/work-packages";

const mockedQuery = vi.mocked(query);

function rows(rows: unknown[]) {
  mockedQuery.mockResolvedValueOnce({
    rows,
    rowCount: rows.length,
    command: "SELECT",
    oid: 0,
    fields: [],
  } as never);
}

describe("getReadyToShipSummary", () => {
  beforeEach(() => {
    mockedQuery.mockReset();
  });

  it("rejects invalid dates before touching the database", async () => {
    await expect(getReadyToShipSummary("2026-99-99")).rejects.toThrow(WorkPackageQueryError);
    expect(mockedQuery).not.toHaveBeenCalled();
  });

  it("returns a real ready_to_ship payload with machine fields, counts, and a narrative", async () => {
    rows([
      {
        workPackageId: "wp_1",
        workPackageCode: "WP-001",
        workPackageName: "Spiral run A",
        jobNumber: "24-1001",
        jobCodePrefix: "SP",
        jobName: "Thermaduct North",
        projectCode: "P-100",
        projectName: "North Tower",
        plannedDueDate: "2026-04-18",
        isHot: true,
        isMegaProject: false,
        isOverdue: true,
        readySince: "2026-04-19T14:00:00.000Z",
      },
      {
        workPackageId: "wp_2",
        workPackageCode: "WP-002",
        workPackageName: "Coil line B",
        jobNumber: "24-1002",
        jobCodePrefix: "CL",
        jobName: "Thermaduct South",
        projectCode: null,
        projectName: null,
        plannedDueDate: "2026-04-25",
        isHot: false,
        isMegaProject: true,
        isOverdue: false,
        readySince: null,
      },
    ]);

    const summary = await getReadyToShipSummary("2026-04-20");

    expect(summary.kind).toBe("ready_to_ship");
    expect(summary.date).toBe("2026-04-20");
    expect(typeof summary.generatedAt).toBe("string");
    expect(summary.counts).toEqual({ readyToShip: 2, hot: 1, mega: 1, overdue: 1 });
    expect(summary.narrative).toBe(
      "2 work packages ready to ship as of 2026-04-20 — 1 hot, 1 overdue.",
    );
    expect(summary.items).toHaveLength(2);
    expect(summary.items[0]).toMatchObject({
      workPackageId: "wp_1",
      workPackageCode: "WP-001",
      jobNumber: "24-1001",
      isHot: true,
      isOverdue: true,
      readySince: "2026-04-19T14:00:00.000Z",
    });

    // Proves the builder issued a real query filtered to ready_to_ship — not a placeholder log.
    const firstCall = mockedQuery.mock.calls[0];
    expect(firstCall).toBeDefined();
    const [sql, params] = firstCall!;
    expect(sql).toContain("wp.current_status = 'ready_to_ship'");
    expect(params).toEqual(["2026-04-20"]);
  });

  it("returns an empty-but-real payload when nothing is ready to ship", async () => {
    rows([]);

    const summary = await getReadyToShipSummary("2026-04-20");

    expect(summary.counts).toEqual({ readyToShip: 0, hot: 0, mega: 0, overdue: 0 });
    expect(summary.narrative).toBe("No work packages are ready to ship as of 2026-04-20.");
    expect(summary.items).toEqual([]);
  });
});
