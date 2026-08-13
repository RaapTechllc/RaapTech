import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/ToolChrome";
import Ductulator from "@/components/tools/Ductulator";

export const metadata: Metadata = {
  title: "Duct Sizing Calculator",
  description:
    "Size or check round and rectangular HVAC duct using Darcy-Weisbach pressure loss, a Haaland friction-factor approximation, and standard-air assumptions.",
  alternates: { canonical: "/tools/ductulator" },
  openGraph: { url: "/tools/ductulator" },
};

export default function DuctulatorPage() {
  return (
    <>
      <ToolPageHeader slug="ductulator" eyebrow="Field Tool · Airside">
        Size round duct by airflow and friction rate or check an existing round
        or rectangular section. Calculations run entirely in this browser.
      </ToolPageHeader>

      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <Ductulator />
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <div>
            <div className="eyebrow eyebrow-ink mb-4">Engineering Basis</div>
            <h2 className="font-display text-display-md font-bold text-paper">
              Transparent equations, stated assumptions.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-3">
              Straight-duct pressure loss uses Darcy–Weisbach with laminar
              64/Re behavior and the explicit Haaland turbulent approximation.
              Rectangular equivalents use the equal-friction Huebscher relation.
              No proprietary handbook tables or calculator source code are copied.
              The public Darcy–Weisbach/Colebrook basis is documented in{" "}
              <a
                href="https://doi.org/10.6028/NIST.TN.1887r1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4"
              >
                NIST Technical Note 1887 Rev. 1
              </a>
              .
            </p>
          </div>
          <div className="border-2 border-paper p-6">
            <div className="font-mono text-xs uppercase tracking-label text-paper">
              Authorized defaults
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-3">
              <li>Standard air density: 0.075 lbm/ft³</li>
              <li>Dynamic viscosity: 0.0432 lbm/(ft·h)</li>
              <li>Galvanized duct roughness: 0.0005 ft</li>
              <li>Rectangular aspect ratio: 4:1 maximum</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-2 border-ink p-6">
            <div className="eyebrow mb-3">Professional Limitation</div>
            <p className="max-w-4xl text-base leading-relaxed text-gray-1">
              Preliminary sizing only. This tool does not replace project
              criteria, engineering judgment, applicable code, or current
              SMACNA and ASHRAE guidance. Verify air density, material
              roughness, pressure class, fittings, system effect, sound,
              leakage, and constructability before fabrication or installation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
