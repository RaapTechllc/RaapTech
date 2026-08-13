import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/ToolChrome";
import OffsetCalculator from "@/components/tools/OffsetCalculator";

export const metadata: Metadata = {
  title: "Field Offset Calculator",
  description:
    "Lay out two-elbow HVAC offsets or solve the bend angle, centerline radius, and straight spool required to fit a known run.",
  alternates: { canonical: "/tools/offset-calculator" },
  openGraph: { url: "/tools/offset-calculator" },
};

export default function OffsetCalculatorPage() {
  return (
    <>
      <ToolPageHeader slug="offset-calculator" eyebrow="Field Tool · Layout">
        Calculate centerline offset and run for two equal elbows, or solve the
        geometry required to fit a known space. Fractional-inch input and
        nearest-sixteenth output are built in.
      </ToolPageHeader>

      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <OffsetCalculator />
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <div>
            <div className="eyebrow eyebrow-ink mb-4">Geometry Basis</div>
            <h2 className="font-display text-display-md font-bold text-paper">
              Centerline geometry, not a fitting database.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-3">
              The layout uses the centerline radius, equal bend angles, and the
              straight distance between elbow tangents. Inverse modes solve the
              same equations numerically or algebraically and reject impossible
              layouts.
            </p>
          </div>
          <div className="border-2 border-paper p-6">
            <div className="font-mono text-xs uppercase tracking-label text-paper">
              Input conventions
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-3">
              <li>Dimensions are centerline inches</li>
              <li>Mixed fractions such as 12 3/8 are accepted</li>
              <li>Outputs round to the nearest 1/16 inch</li>
              <li>Connector take-up is not added automatically</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-2 border-ink p-6">
            <div className="eyebrow mb-3">Field Verification Required</div>
            <p className="max-w-4xl text-base leading-relaxed text-gray-1">
              Verify fitting dimensions, connector allowances, elbow throat and
              heel construction, obstructions, hanger clearance, and actual
              field conditions before cutting or fabrication. This calculator
              is a layout aid, not a fabrication release.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
