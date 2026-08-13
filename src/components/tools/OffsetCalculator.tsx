"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  calculateOffsetLayout,
  formatLengthInches,
  formatLengthInput,
  isStockElbowAngle,
  parseLengthInches,
  solveOffsetAngle,
  solveOffsetRadius,
  STOCK_ELBOW_ANGLES_DEG,
  type OffsetAngleSolution,
  type OffsetLayout,
  type OffsetRadiusSolution,
} from "@/lib/offset-calculator";
import { useRevealOnSuccess } from "@/lib/useRevealOnSuccess";

const inputClass =
  "mt-2 w-full border-2 border-ink bg-paper px-3 py-3 font-mono text-base text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClass = "font-mono text-xs font-bold uppercase tracking-label text-ink";

function length(label: string, raw: string): number {
  const parsed = parseLengthInches(raw);
  if (parsed === null) throw new RangeError(`Enter a valid ${label}.`);
  return parsed;
}

function positiveLength(label: string, raw: string): number {
  const parsed = length(label, raw);
  if (parsed <= 0) {
    throw new RangeError(
      `${label.charAt(0).toUpperCase()}${label.slice(1)} must be greater than zero.`,
    );
  }
  return parsed;
}

function decimal(label: string, raw: string): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) throw new RangeError(`Enter a valid ${label}.`);
  return parsed;
}

function Metric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-gray-3 pb-3">
      <dt className="font-mono text-xs uppercase tracking-label text-gray-2">{label}</dt>
      <dd className="mt-1 font-display text-xl font-bold text-ink">{children}</dd>
    </div>
  );
}

type InverseResult =
  | { kind: "angle"; result: OffsetAngleSolution; radiusIn: number }
  | { kind: "radius"; result: OffsetRadiusSolution; ductDiameterIn: number };

function GeometryDiagram({ layout }: { layout: OffsetLayout | null }) {
  return (
    <svg
      role="img"
      aria-label="Offset geometry diagram"
      viewBox="0 0 640 260"
      className="mt-8 w-full border-2 border-ink bg-gray-4"
    >
      <title>Offset geometry</title>
      <desc>Two equal bends joined by a straight centerline segment.</desc>
      <defs>
        <marker id="offset-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
        </marker>
      </defs>
      <path d="M60 205 H155 Q190 205 215 180 L415 55 Q440 35 475 35 H580" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="square" />
      <path d="M60 205 H155 Q190 205 215 180 L415 55 Q440 35 475 35 H580" fill="none" stroke="#f7f7f5" strokeWidth="3" strokeDasharray="10 8" />
      <line x1="44" y1="205" x2="44" y2="35" stroke="currentColor" strokeWidth="2" markerStart="url(#offset-arrow)" markerEnd="url(#offset-arrow)" />
      <line x1="60" y1="225" x2="580" y2="225" stroke="currentColor" strokeWidth="2" markerStart="url(#offset-arrow)" markerEnd="url(#offset-arrow)" />
      <text x="14" y="126" transform="rotate(-90 14 126)" className="fill-ink font-mono text-[14px]">OFFSET</text>
      <text x="290" y="250" className="fill-ink font-mono text-[14px]">RUN</text>
      <text x="280" y="118" className="fill-ink font-mono text-[13px]">STRAIGHT BETWEEN TANGENTS</text>
      {layout && (
        <>
          <text x="68" y="24" className="fill-ink font-mono text-[13px]">OFFSET {formatLengthInches(layout.offsetIn)}</text>
          <text x="430" y="248" className="fill-ink font-mono text-[13px]">RUN {formatLengthInches(layout.runIn)}</text>
        </>
      )}
    </svg>
  );
}

export default function OffsetCalculator() {
  const [mode, setMode] = useState<"forward" | "inverse">("forward");
  const [ductDiameter, setDuctDiameter] = useState("12");
  const [multiplier, setMultiplier] = useState("1.5");
  const [angle, setAngle] = useState("45");
  const [straight, setStraight] = useState("4");
  const [neededOffset, setNeededOffset] = useState(() =>
    formatLengthInput(13.372583002030478),
  );
  const [totalRun, setTotalRun] = useState(() =>
    formatLengthInput(28.284271247461906),
  );
  const [solveFor, setSolveFor] = useState<"angle" | "radius">("angle");
  const [layout, setLayout] = useState<OffsetLayout | null>(null);
  const [inverse, setInverse] = useState<InverseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultsRef, reveal: revealResults } = useRevealOnSuccess<HTMLElement>();

  function clearGeometry() {
    setLayout(null);
    setInverse(null);
  }

  function switchMode(next: "forward" | "inverse") {
    setMode(next);
    setError(null);
    if (next === "inverse" && layout) {
      setNeededOffset(formatLengthInput(layout.offsetIn));
      setTotalRun(formatLengthInput(layout.runIn));
    }
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const diameterIn = positiveLength("duct diameter", ductDiameter);
      const radiusIn = diameterIn * decimal("CLR multiplier", multiplier);
      const result = calculateOffsetLayout({
        radiusIn,
        angleDeg: decimal("elbow angle", angle),
        straightIn: length("straight distance", straight),
      });
      setLayout(result);
      setInverse(null);
      setError(null);
      revealResults();
    } catch (caught) {
      clearGeometry();
      setError(caught instanceof Error ? caught.message : "Unable to calculate this layout.");
    }
  }

  function solve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const diameterIn = positiveLength("duct diameter", ductDiameter);
      const offsetIn = length("needed offset", neededOffset);
      const runIn = length("total run", totalRun);
      if (solveFor === "angle") {
        const radiusIn = diameterIn * decimal("CLR multiplier", multiplier);
        const result = solveOffsetAngle({ radiusIn, offsetIn, runIn });
        if (!result) throw new RangeError("No buildable equal-angle layout fits those dimensions.");
        setInverse({ kind: "angle", result, radiusIn });
      } else {
        const result = solveOffsetRadius({
          angleDeg: decimal("known elbow angle", angle),
          offsetIn,
          runIn,
        });
        if (!result) throw new RangeError("No positive centerline radius fits those dimensions.");
        setInverse({ kind: "radius", result, ductDiameterIn: diameterIn });
      }
      setLayout(null);
      setError(null);
      revealResults();
    } catch (caught) {
      clearGeometry();
      setError(caught instanceof Error ? caught.message : "Unable to solve this layout.");
    }
  }

  const displayedLayout =
    layout ??
    (inverse?.kind === "angle"
      ? calculateOffsetLayout({
          radiusIn: inverse.radiusIn,
          angleDeg: inverse.result.angleDeg,
          straightIn: inverse.result.straightIn,
        })
      : inverse?.kind === "radius"
        ? calculateOffsetLayout({
            radiusIn: inverse.result.radiusIn,
            angleDeg: inverse.result.angleDeg,
            straightIn: inverse.result.straightIn,
          })
        : null);

  return (
    <div className="border-2 border-ink bg-paper">
      <div className="grid grid-cols-2 border-b-2 border-ink">
        <button type="button" onClick={() => switchMode("forward")} className={`border-r-2 border-ink px-4 py-4 font-mono text-xs font-bold uppercase tracking-label ${mode === "forward" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-gray-4"}`}>
          Build an offset
        </button>
        <button type="button" onClick={() => switchMode("inverse")} className={`px-4 py-4 font-mono text-xs font-bold uppercase tracking-label ${mode === "inverse" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-gray-4"}`}>
          Fit known run
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b-2 border-ink p-6 lg:border-b-0 lg:border-r-2">
          {mode === "forward" ? (
            <form noValidate onSubmit={calculate} className="space-y-5">
              <label className={labelClass} htmlFor="offset-diameter">Duct diameter (in)
                <input className={inputClass} id="offset-diameter" value={ductDiameter} onChange={(event) => setDuctDiameter(event.target.value)} inputMode="decimal" />
              </label>
              <label className={labelClass} htmlFor="offset-multiplier">CLR multiplier
                <input className={inputClass} id="offset-multiplier" value={multiplier} onChange={(event) => setMultiplier(event.target.value)} inputMode="decimal" />
              </label>
              <label className={labelClass} htmlFor="offset-angle">Elbow angle (degrees)
                <select className={inputClass} id="offset-angle" value={angle} onChange={(event) => setAngle(event.target.value)}>
                  {[...STOCK_ELBOW_ANGLES_DEG].map((item) => <option key={item} value={item}>{item}°</option>)}
                </select>
              </label>
              <label className={labelClass} htmlFor="offset-straight">Straight between tangents (in)
                <input className={inputClass} id="offset-straight" value={straight} onChange={(event) => setStraight(event.target.value)} inputMode="decimal" />
              </label>
              <button className="btn-primary" type="submit">Calculate layout</button>
            </form>
          ) : (
            <form noValidate onSubmit={solve} className="space-y-5">
              <label className={labelClass} htmlFor="offset-solve-for">Solve for
                <select className={inputClass} id="offset-solve-for" value={solveFor} onChange={(event) => setSolveFor(event.target.value as "angle" | "radius")}>
                  <option value="angle">Elbow angle and straight spool</option>
                  <option value="radius">Centerline radius and straight spool</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={labelClass} htmlFor="needed-offset">Needed offset (in)
                  <input className={inputClass} id="needed-offset" value={neededOffset} onChange={(event) => setNeededOffset(event.target.value)} inputMode="decimal" />
                </label>
                <label className={labelClass} htmlFor="total-run">Total run (in)
                  <input className={inputClass} id="total-run" value={totalRun} onChange={(event) => setTotalRun(event.target.value)} inputMode="decimal" />
                </label>
              </div>
              <label className={labelClass} htmlFor="inverse-diameter">Duct diameter (in)
                <input className={inputClass} id="inverse-diameter" value={ductDiameter} onChange={(event) => setDuctDiameter(event.target.value)} inputMode="decimal" />
              </label>
              {solveFor === "angle" ? (
                <label className={labelClass} htmlFor="inverse-multiplier">CLR multiplier
                  <input className={inputClass} id="inverse-multiplier" value={multiplier} onChange={(event) => setMultiplier(event.target.value)} inputMode="decimal" />
                </label>
              ) : (
                <label className={labelClass} htmlFor="inverse-angle">Known elbow angle (degrees)
                  <select className={inputClass} id="inverse-angle" value={angle} onChange={(event) => setAngle(event.target.value)}>
                    {[...STOCK_ELBOW_ANGLES_DEG].map((item) => <option key={item} value={item}>{item}°</option>)}
                  </select>
                </label>
              )}
              <button className="btn-primary" type="submit">Solve layout</button>
            </form>
          )}
          {error && <p role="alert" className="mt-5 border-2 border-ink bg-gray-4 p-3 font-mono text-sm text-ink">{error}</p>}
        </div>

        <section
          ref={resultsRef}
          tabIndex={-1}
          aria-live="polite"
          aria-label="Results"
          className="min-h-96 scroll-mt-24 p-6 outline-none"
        >
          {!layout && !inverse && <p className="font-mono text-sm text-gray-2">Enter the centerline geometry and calculate the layout.</p>}
          {mode === "forward" && layout && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Layout result</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Metric label="Centerline radius">{formatLengthInches(layout.radiusIn)}</Metric>
                <Metric label="Centerline offset">{formatLengthInches(layout.offsetIn)}</Metric>
                <Metric label="Total run">{formatLengthInches(layout.runIn)}</Metric>
                <Metric label="Straight between tangents">{formatLengthInches(layout.straightIn)}</Metric>
              </dl>
            </div>
          )}
          {mode === "inverse" && inverse?.kind === "angle" && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Solved layout</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Metric label="Solved elbow angle">{inverse.result.angleDeg.toFixed(2)}°</Metric>
                <Metric label="Effective straight spool">{formatLengthInches(inverse.result.straightIn)}</Metric>
                <Metric label="Centerline radius">{formatLengthInches(inverse.radiusIn)}</Metric>
              </dl>
              {!isStockElbowAngle(inverse.result.angleDeg) && (
                <p className="mt-5 border-l-2 border-ink pl-3 font-mono text-xs leading-relaxed text-gray-1">
                  {inverse.result.angleDeg.toFixed(2)}° is not a stock elbow.
                  Common fittings are 15, 22.5, 30, 45, 60, and 90°.
                </p>
              )}
            </div>
          )}
          {mode === "inverse" && inverse?.kind === "radius" && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Solved layout</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Metric label="Solved centerline radius">{formatLengthInches(inverse.result.radiusIn)}</Metric>
                <Metric label="Effective straight spool">{formatLengthInches(inverse.result.straightIn)}</Metric>
                <Metric label="Implied CLR multiplier">{(inverse.result.radiusIn / inverse.ductDiameterIn).toFixed(3)} × D</Metric>
              </dl>
            </div>
          )}
          <GeometryDiagram layout={error ? null : displayedLayout} />
        </section>
      </div>
    </div>
  );
}
