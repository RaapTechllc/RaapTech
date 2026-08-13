import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/ToolChrome";
import HangerSpacingCalculator from "@/components/tools/HangerSpacingCalculator";

export const metadata: Metadata = {
  title: "Hanger Spacing Calculator",
  description:
    "Estimate SMACNA-aligned hanger spacing, extra hangers at elbows and tees, and suggested rod size for horizontal metal duct.",
  alternates: { canonical: "/tools/hanger-spacing" },
  openGraph: { url: "/tools/hanger-spacing" },
};

export default function HangerSpacingPage() {
  return (
    <>
      <ToolPageHeader slug="hanger-spacing" eyebrow="Field Tool · Support">
        Estimate maximum hanger spacing and a hanger count for a horizontal run,
        including extras near elbows and intersections. Spacing and rod defaults
        live in a small data file you can check against the shop book.
      </ToolPageHeader>

      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <HangerSpacingCalculator />
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <div>
            <div className="eyebrow eyebrow-ink mb-4">Estimate Basis</div>
            <h2 className="font-display text-display-md font-bold text-paper">
              Spacing bands and fitting extras, not a copied table.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-3">
              Regular hangers sit at both ends of the run and at the maximum
              spacing for the size and shape. Extra hangers are added when an
              estimated elbow is more than 2 ft from an existing hanger, or an
              estimated tee is more than 4 ft away. Fittings are treated as
              evenly spaced along the run so extras that land on a regular
              station are not counted twice.
            </p>
          </div>
          <div className="border-2 border-paper p-6">
            <div className="font-mono text-xs uppercase tracking-label text-paper">
              What this does not do
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-3">
              <li>Does not apply an insulation allowance</li>
              <li>Does not size strap, trapeze, or inserts</li>
              <li>Does not cover risers, seismic, or point loads</li>
              <li>Does not replace the SMACNA HVAC DCS or the spec</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-2 border-ink p-6">
            <div className="eyebrow mb-3">Field Verification Required</div>
            <p className="max-w-4xl text-base leading-relaxed text-gray-1">
              Verify hanger spacing, rod or strap size, and extra supports
              against the current SMACNA HVAC Duct Construction Standards (Metal
              and Flexible) and the job spec before fabrication or installation.
              This calculator is a layout aid, not a fabrication release.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
