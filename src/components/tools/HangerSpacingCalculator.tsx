"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  estimateHangerLayout,
  type HangerEstimate,
} from "@/lib/hanger-calculator";
import { type DuctShape } from "@/lib/hanger-data";
import { useRevealOnSuccess } from "@/lib/useRevealOnSuccess";

const inputClass =
  "mt-2 w-full border-2 border-ink bg-paper px-3 py-3 font-mono text-base text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClass = "font-mono text-xs font-bold uppercase tracking-label text-ink";

function Metric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-gray-3 pb-3">
      <dt className="font-mono text-xs uppercase tracking-label text-gray-2">{label}</dt>
      <dd className="mt-1 font-display text-xl font-bold text-ink">{children}</dd>
    </div>
  );
}

function number(label: string, raw: string): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) throw new RangeError(`Enter a valid ${label}.`);
  return parsed;
}

export default function HangerSpacingCalculator() {
  const [shape, setShape] = useState<DuctShape>("rectangular");
  const [size, setSize] = useState("24");
  const [length, setLength] = useState("40");
  const [elbows, setElbows] = useState("0");
  const [intersections, setIntersections] = useState("0");
  const [result, setResult] = useState<HangerEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultsRef, reveal: revealResults } = useRevealOnSuccess<HTMLElement>();

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const next = estimateHangerLayout({
        shape,
        sizeIn: number("duct size", size),
        lengthFt: number("run length", length),
        elbowCount: number("elbow count", elbows),
        intersectionCount: number("intersection count", intersections),
      });
      setResult(next);
      setError(null);
      revealResults();
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "Unable to estimate hangers.");
    }
  }

  return (
    <div className="border-2 border-ink bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b-2 border-ink p-6 lg:border-b-0 lg:border-r-2">
          <form noValidate onSubmit={calculate} className="space-y-5">
            <label className={labelClass} htmlFor="hanger-shape">
              Duct shape
              <select
                className={inputClass}
                id="hanger-shape"
                value={shape}
                onChange={(event) => setShape(event.target.value as DuctShape)}
              >
                <option value="rectangular">Rectangular</option>
                <option value="round">Round</option>
              </select>
            </label>
            <label className={labelClass} htmlFor="hanger-size">
              {shape === "round" ? "Diameter (in)" : "Width (in)"}
              <input
                className={inputClass}
                id="hanger-size"
                value={size}
                onChange={(event) => setSize(event.target.value)}
                inputMode="decimal"
              />
            </label>
            <label className={labelClass} htmlFor="hanger-length">
              Horizontal run length (ft)
              <input
                className={inputClass}
                id="hanger-length"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                inputMode="decimal"
              />
            </label>
            <label className={labelClass} htmlFor="hanger-elbows">
              Elbows / direction changes
              <input
                className={inputClass}
                id="hanger-elbows"
                value={elbows}
                onChange={(event) => setElbows(event.target.value)}
                inputMode="numeric"
              />
            </label>
            <label className={labelClass} htmlFor="hanger-intersections">
              Intersections / tees
              <input
                className={inputClass}
                id="hanger-intersections"
                value={intersections}
                onChange={(event) => setIntersections(event.target.value)}
                inputMode="numeric"
              />
            </label>
            <button className="btn-primary" type="submit">
              Estimate hangers
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-5 border-2 border-ink bg-gray-4 p-3 font-mono text-sm text-ink">
              {error}
            </p>
          )}
        </div>

        <section
          ref={resultsRef}
          tabIndex={-1}
          aria-live="polite"
          aria-label="Results"
          className="min-h-96 scroll-mt-24 p-6 outline-none"
        >
          {!result && (
            <p className="font-mono text-sm text-gray-2">
              Enter the run and estimate hanger count from spacing plus extras.
            </p>
          )}
          {result && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Hanger estimate</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Metric label="Max hanger spacing">{result.maxSpacingFt} ft</Metric>
                <Metric label="Suggested min rod">{result.minRodLabel}</Metric>
                <Metric label="Regular hangers along the run">{result.regularHangerCount}</Metric>
                <Metric label="Estimated hanger count">{result.estimatedHangerCount}</Metric>
              </dl>
              <h3 className="mt-8 font-display text-xl font-bold text-ink">Extra hanger rules</h3>
              <ul className="mt-3 space-y-2 font-mono text-sm text-gray-1">
                <li>
                  Within {result.elbowRuleFt} ft of each elbow / direction change
                  {result.extraElbowHangers
                    ? ` — ${result.extraElbowHangers} extra`
                    : " — none extra on this layout"}
                </li>
                <li>
                  Within {result.intersectionRuleFt} ft of each intersection / tee
                  {result.extraIntersectionHangers
                    ? ` — ${result.extraIntersectionHangers} extra`
                    : " — none extra on this layout"}
                </li>
              </ul>
              <p className="mt-8 border-l-2 border-ink pl-3 font-mono text-xs leading-relaxed text-gray-1">
                Verify spacing, hanger type, and rod size against the current SMACNA HVAC
                Duct Construction Standards (Metal and Flexible) and the job spec. This is
                a layout aid, not a fabrication release.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
