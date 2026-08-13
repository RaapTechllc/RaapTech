/**
 * Typical values — confirm against SMACNA HVAC DCS 4th ed Tables for hangers
 * (commonly cited as 4-1 / 4-2) before treating as code.
 *
 * These are conservative, commonly cited bands for horizontal metal duct — not a
 * reproduction of SMACNA tables. Rectangular uses 8 ft max spacing (tighter than
 * the 10 ft allowance often cited for smaller widths). Round uses 10 ft on
 * smaller diameters and 8 ft once the diameter is into the 50 in-plus range.
 * Rod sizes step with duct size. Kyle should edit the numbers if the shop book
 * differs.
 *
 * Insulation weight is not encoded here (no single clean public rule to apply
 * without copying the manual). Lined or wrapped duct must be checked in SMACNA
 * HVAC DCS and the job spec.
 */

export type DuctShape = "round" | "rectangular";

export interface HangerBand {
  /** Inclusive upper bound of diameter (round) or width (rectangular), inches. */
  maxSizeIn: number;
  /** Maximum hanger spacing along a horizontal run, feet. */
  maxSpacingFt: number;
  /** Suggested minimum rod diameter, inches. */
  minRodIn: number;
}

export const HANGER_LIMITS = {
  sizeIn: { min: 1, max: 120 },
  lengthFt: { min: 0.25, max: 10_000 },
  count: { min: 0, max: 200 },
} as const;

export const ELBOW_HANGER_DISTANCE_FT = 2;
export const INTERSECTION_HANGER_DISTANCE_FT = 4;

export const RECTANGULAR_HANGER_BANDS: readonly HangerBand[] = [
  { maxSizeIn: 30, maxSpacingFt: 8, minRodIn: 0.25 },
  { maxSizeIn: 60, maxSpacingFt: 8, minRodIn: 0.375 },
  { maxSizeIn: 84, maxSpacingFt: 8, minRodIn: 0.5 },
  { maxSizeIn: 120, maxSpacingFt: 8, minRodIn: 0.5 },
];

export const ROUND_HANGER_BANDS: readonly HangerBand[] = [
  { maxSizeIn: 18, maxSpacingFt: 10, minRodIn: 0.25 },
  { maxSizeIn: 36, maxSpacingFt: 10, minRodIn: 0.375 },
  { maxSizeIn: 50, maxSpacingFt: 10, minRodIn: 0.5 },
  { maxSizeIn: 84, maxSpacingFt: 8, minRodIn: 0.5 },
  { maxSizeIn: 120, maxSpacingFt: 8, minRodIn: 0.625 },
];

export function hangerSchedule(shape: DuctShape, sizeIn: number): HangerBand {
  if (!Number.isFinite(sizeIn) || sizeIn < HANGER_LIMITS.sizeIn.min) {
    throw new RangeError(
      `Duct size must be at least ${HANGER_LIMITS.sizeIn.min} in.`,
    );
  }
  if (sizeIn > HANGER_LIMITS.sizeIn.max) {
    throw new RangeError(
      `Duct size must be ${HANGER_LIMITS.sizeIn.max} in or less.`,
    );
  }

  const bands = shape === "round" ? ROUND_HANGER_BANDS : RECTANGULAR_HANGER_BANDS;
  const match = bands.find((band) => sizeIn <= band.maxSizeIn);
  if (!match) {
    throw new RangeError("Duct size is outside the supported hanger schedule.");
  }
  return match;
}
