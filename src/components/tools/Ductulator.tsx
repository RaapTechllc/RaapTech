"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  practicalRectangularEquivalents,
  rectangularDuctPerformance,
  roundDuctPerformance,
  solveRoundDuct,
  type DuctPerformance,
  type RectangularDuctPerformance,
  type RoundDuctSolution,
} from "@/lib/duct-calculator";

const inputClass =
  "mt-2 w-full border-2 border-ink bg-paper px-3 py-3 font-mono text-base text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClass = "font-mono text-xs font-bold uppercase tracking-label text-ink";

function number(value: string): number {
  return Number(value);
}

function format(value: number, digits = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

function Metric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-gray-3 pb-3">
      <dt className="font-mono text-xs uppercase tracking-label text-gray-2">{label}</dt>
      <dd className="mt-1 font-display text-xl font-bold text-ink">{children}</dd>
    </div>
  );
}

type SizeResult = {
  solution: RoundDuctSolution;
  rectangles: ReturnType<typeof practicalRectangularEquivalents>;
};

type CheckResult =
  | { shape: "round"; performance: DuctPerformance }
  | { shape: "rectangular"; performance: RectangularDuctPerformance };

export default function Ductulator() {
  const [mode, setMode] = useState<"size" | "check">("size");
  const [airflow, setAirflow] = useState("400");
  const [friction, setFriction] = useState("0.1");
  const [maximumVelocity, setMaximumVelocity] = useState("");
  const [diameter, setDiameter] = useState("10");
  const [shape, setShape] = useState<"round" | "rectangular">("round");
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("14");
  const [sizeResult, setSizeResult] = useState<SizeResult | null>(null);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function switchMode(next: "size" | "check") {
    setMode(next);
    setError(null);
  }

  function sizeDuct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const solution = solveRoundDuct({
        cfm: number(airflow),
        targetFrictionRate: number(friction),
        maximumVelocityFpm: maximumVelocity.trim()
          ? number(maximumVelocity)
          : undefined,
      });
      setSizeResult({
        solution,
        rectangles: practicalRectangularEquivalents(
          number(airflow),
          solution.wholeDiameterIn,
        ),
      });
      setError(null);
    } catch (caught) {
      setSizeResult(null);
      setError(caught instanceof Error ? caught.message : "Unable to size this duct.");
    }
  }

  function checkDuct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const cfm = number(airflow);
      setCheckResult(
        shape === "round"
          ? { shape, performance: roundDuctPerformance(cfm, number(diameter)) }
          : {
              shape,
              performance: rectangularDuctPerformance(
                cfm,
                number(width),
                number(height),
              ),
            },
      );
      setError(null);
    } catch (caught) {
      setCheckResult(null);
      setError(caught instanceof Error ? caught.message : "Unable to check this duct.");
    }
  }

  return (
    <div className="border-2 border-ink bg-paper">
      <div className="grid grid-cols-2 border-b-2 border-ink">
        {(["size", "check"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => switchMode(item)}
            className={`px-4 py-4 font-mono text-xs font-bold uppercase tracking-label ${
              mode === item ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-gray-4"
            } ${item === "size" ? "border-r-2 border-ink" : ""}`}
          >
            {item === "size" ? "Size new duct" : "Check existing duct"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b-2 border-ink p-6 lg:border-b-0 lg:border-r-2">
          {mode === "size" ? (
            <form noValidate onSubmit={sizeDuct} className="space-y-5">
              <label className={labelClass} htmlFor="duct-airflow">
                Airflow (CFM)
                <input
                  className={inputClass}
                  id="duct-airflow"
                  type="number"
                  value={airflow}
                  onChange={(event) => setAirflow(event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="duct-friction">
                Target friction rate (in. w.g./100 ft)
                <input
                  className={inputClass}
                  id="duct-friction"
                  type="number"
                  step="0.01"
                  value={friction}
                  onChange={(event) => setFriction(event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="duct-max-velocity">
                Maximum velocity (FPM, optional)
                <input
                  className={inputClass}
                  id="duct-max-velocity"
                  type="number"
                  value={maximumVelocity}
                  onChange={(event) => setMaximumVelocity(event.target.value)}
                />
              </label>
              <button className="btn-primary" type="submit">Size duct</button>
            </form>
          ) : (
            <form noValidate onSubmit={checkDuct} className="space-y-5">
              <label className={labelClass} htmlFor="check-airflow">
                Airflow (CFM)
                <input
                  className={inputClass}
                  id="check-airflow"
                  type="number"
                  value={airflow}
                  onChange={(event) => setAirflow(event.target.value)}
                />
              </label>
              <label className={labelClass} htmlFor="duct-shape">
                Duct shape
                <select
                  className={inputClass}
                  id="duct-shape"
                  value={shape}
                  onChange={(event) =>
                    setShape(event.target.value as "round" | "rectangular")
                  }
                >
                  <option value="round">Round</option>
                  <option value="rectangular">Rectangular</option>
                </select>
              </label>
              {shape === "round" ? (
                <label className={labelClass} htmlFor="duct-diameter">
                  Diameter (in)
                  <input
                    className={inputClass}
                    id="duct-diameter"
                    type="number"
                    value={diameter}
                    onChange={(event) => setDiameter(event.target.value)}
                  />
                </label>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <label className={labelClass} htmlFor="duct-width">
                    Width (in)
                    <input
                      className={inputClass}
                      id="duct-width"
                      type="number"
                      value={width}
                      onChange={(event) => setWidth(event.target.value)}
                    />
                  </label>
                  <label className={labelClass} htmlFor="duct-height">
                    Height (in)
                    <input
                      className={inputClass}
                      id="duct-height"
                      type="number"
                      value={height}
                      onChange={(event) => setHeight(event.target.value)}
                    />
                  </label>
                </div>
              )}
              <button className="btn-primary" type="submit">Check duct</button>
            </form>
          )}
          {error && (
            <p role="alert" className="mt-5 border-2 border-ink bg-gray-4 p-3 font-mono text-sm text-ink">
              {error}
            </p>
          )}
        </div>

        <div className="min-h-96 p-6" aria-live="polite">
          {mode === "size" && !sizeResult && (
            <p className="font-mono text-sm text-gray-2">Enter design criteria and size the duct.</p>
          )}
          {mode === "size" && sizeResult && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Round result</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Metric label="Exact calculated diameter">
                  {format(sizeResult.solution.exactDiameterIn)} in
                </Metric>
                <Metric label="Practical round size">
                  {sizeResult.solution.wholeDiameterIn} in
                </Metric>
                <Metric label="Resulting velocity">
                  {format(sizeResult.solution.performance.velocityFpm, 0)} FPM
                </Metric>
                <Metric label="Resulting friction">
                  {format(sizeResult.solution.performance.frictionRateInWgPer100Ft, 3)} in. w.g./100 ft
                </Metric>
                <Metric label="Limiting criterion">
                  {sizeResult.solution.limitingCriterion === "velocity" ? "Maximum velocity" : "Friction rate"}
                </Metric>
                <Metric label="Reynolds number">
                  {format(sizeResult.solution.performance.reynoldsNumber, 0)}
                </Metric>
              </dl>
              <h3 className="mt-8 font-display text-xl font-bold text-ink">Practical rectangular equivalents</h3>
              <div className="mt-3 overflow-x-auto">
                <table aria-label="Rectangular equivalents" className="w-full border-collapse font-mono text-sm">
                  <thead><tr className="border-b-2 border-ink text-left"><th className="py-2 pr-4">Size</th><th className="py-2 pr-4">Ratio</th><th className="py-2 pr-4">Velocity</th><th className="py-2">Friction</th></tr></thead>
                  <tbody>
                    {sizeResult.rectangles.map((item) => (
                      <tr key={`${item.widthIn}x${item.heightIn}`} className="border-b border-gray-3">
                        <td className="py-2 pr-4">{item.widthIn} × {item.heightIn} in</td>
                        <td className="py-2 pr-4">{format(item.aspectRatio)}:1</td>
                        <td className="py-2 pr-4">{format(item.velocityFpm, 0)} FPM</td>
                        <td className="py-2">{format(item.frictionRateInWgPer100Ft, 3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {mode === "check" && !checkResult && (
            <p className="font-mono text-sm text-gray-2">Enter an installed or proposed duct section to check it.</p>
          )}
          {mode === "check" && checkResult && (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Existing duct result</h2>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {checkResult.shape === "rectangular" && (
                  <Metric label="Equivalent round diameter">
                    {format(checkResult.performance.equivalentDiameterIn)} in
                  </Metric>
                )}
                <Metric label={checkResult.shape === "rectangular" ? "Actual velocity" : "Velocity"}>
                  {format(checkResult.performance.velocityFpm, 0)} FPM
                </Metric>
                <Metric label="Friction rate">
                  {format(checkResult.performance.frictionRateInWgPer100Ft, 3)} in. w.g./100 ft
                </Metric>
                <Metric label="Reynolds number">{format(checkResult.performance.reynoldsNumber, 0)}</Metric>
                <Metric label="Darcy friction factor">{format(checkResult.performance.frictionFactor, 4)}</Metric>
                <Metric label="Flow regime">{checkResult.performance.flowRegime}</Metric>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
