import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/ToolChrome";
import DatabaseDiagnostic from "@/components/tools/DatabaseDiagnostic";

export const metadata: Metadata = {
  title: "Database Diagnostic",
  description:
    "Free self-guided checklist that scores a fabrication database across pricing accuracy, item structure, connector health, and documentation. Runs in the browser. No account.",
  alternates: { canonical: "/tools/database-diagnostic" },
  openGraph: { url: "/tools/database-diagnostic" },
};

export default function DatabaseDiagnosticPage() {
  return (
    <>
      <ToolPageHeader slug="database-diagnostic" eyebrow="Shop Tool · Database">
        Twelve questions about how the shop actually uses Autodesk® Fabrication
        — CADmep, CAMduct, or ESTmep. Scores stay in this browser. No account,
        no upload, no telemetry.
      </ToolPageHeader>

      <section className="bg-paper pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <DatabaseDiagnostic />
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <div>
            <div className="eyebrow eyebrow-ink mb-4">What this is</div>
            <h2 className="font-display text-display-md font-bold text-paper">
              A self-score, not a database review.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-3">
              How the shop fabs, what it quotes in, and how often anyone
              maintains the file. This checklist is that conversation, scored.
              It does not open your database and it does not replace a Database
              Health Audit.
            </p>
          </div>
          <div className="border-2 border-paper p-6">
            <div className="font-mono text-xs uppercase tracking-label text-paper">
              Four areas that cost shops bids
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-gray-3">
              <li>Pricing accuracy — stale catalogs, shadow spreadsheets, dual entry</li>
              <li>Item structure — duplicates, template labor, specialty added later</li>
              <li>Connector health — connections the shop can&apos;t make, dead posts</li>
              <li>Documentation — reports, ownership, and what lives in one person&apos;s head</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-2 border-ink p-6">
            <div className="eyebrow mb-3">Not a substitute for opening the file</div>
            <p className="max-w-4xl text-base leading-relaxed text-gray-1">
              This is a self-score. It is not a hands-on review of your
              fabrication database, not a fabrication release, and not the
              $2,500 Database Health Audit. Answers never leave this browser
              unless you choose to email them.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
