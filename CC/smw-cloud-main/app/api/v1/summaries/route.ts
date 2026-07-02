import { NextResponse, type NextRequest } from "next/server";
import {
  getReadyToShipSummary,
  isIsoDate,
  todayInTimeZone,
  WorkPackageQueryError,
} from "@/lib/queries/work-packages";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPPORTED_KINDS = ["ready_to_ship"] as const;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(request, "read_only");
  if (auth instanceof NextResponse) return auth;

  const kind = request.nextUrl.searchParams.get("kind") ?? "ready_to_ship";
  if (!(SUPPORTED_KINDS as readonly string[]).includes(kind)) {
    return NextResponse.json(
      { error: `unsupported summary kind: ${kind}`, supported: SUPPORTED_KINDS },
      { status: 400 },
    );
  }

  const date = request.nextUrl.searchParams.get("date") ?? todayInTimeZone();
  if (!isIsoDate(date)) {
    return NextResponse.json({ error: "date must use YYYY-MM-DD" }, { status: 400 });
  }

  try {
    return NextResponse.json(await getReadyToShipSummary(date));
  } catch (err) {
    if (err instanceof WorkPackageQueryError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
