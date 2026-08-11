// Engineering basis: NIST TN 1887 Rev. 1 documents the Darcy-Weisbach /
// Colebrook straight-duct model used by CONTAM. This implementation uses the
// explicit Haaland approximation rather than copying any proprietary table.
// https://doi.org/10.6028/NIST.TN.1887r1
export const STANDARD_AIR = {
  densityLbmPerFt3: 0.075,
  dynamicViscosityLbmPerFtHour: 0.0432,
  roughnessFt: 0.0005,
} as const;

export const DUCT_LIMITS = {
  airflowCfm: { min: 10, max: 100_000 },
  diameterIn: { min: 1, max: 144 },
  rectangularSideIn: { min: 1, max: 120 },
  frictionRate: { min: 0.005, max: 2 },
  velocityFpm: { min: 100, max: 10_000 },
  aspectRatio: { max: 4 },
} as const;

const GRAVITATIONAL_CONVERSION = 32.174;
const LBF_PER_FT2_PER_IN_WATER = 5.202;
const LAMINAR_LIMIT = 2300;
const TURBULENT_LIMIT = 4000;
const DESIGN_LENGTH_FT = 100;

export type FlowRegime = "laminar" | "transitional" | "turbulent";

export interface FrictionFactorResult {
  factor: number;
  regime: FlowRegime;
}

export interface DuctPerformance {
  areaSqFt: number;
  velocityFpm: number;
  reynoldsNumber: number;
  frictionFactor: number;
  flowRegime: FlowRegime;
  frictionRateInWgPer100Ft: number;
}

export interface RectangularDuctPerformance extends DuctPerformance {
  widthIn: number;
  heightIn: number;
  aspectRatio: number;
  equivalentDiameterIn: number;
}

export interface RoundDuctSolution {
  exactDiameterIn: number;
  frictionDiameterIn: number;
  velocityDiameterIn: number | null;
  wholeDiameterIn: number;
  limitingCriterion: "friction" | "velocity";
  performance: DuctPerformance;
}

export interface PracticalRectangle {
  widthIn: number;
  heightIn: number;
  aspectRatio: number;
  equivalentDiameterIn: number;
  velocityFpm: number;
  frictionRateInWgPer100Ft: number;
}

function requireRange(label: string, value: number, min: number, max: number): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}.`);
  }
}

function turbulentHaalandFactor(
  reynoldsNumber: number,
  diameterIn: number,
  roughnessFt: number,
): number {
  const diameterFt = diameterIn / 12;
  const relativeRoughness = roughnessFt / diameterFt;
  const inverseRoot =
    -1.8 *
    Math.log10(
      Math.pow(relativeRoughness / 3.7, 1.11) + 6.9 / reynoldsNumber,
    );
  return 1 / Math.pow(inverseRoot, 2);
}

export function roundAreaSqFt(diameterIn: number): number {
  requireRange(
    "Round diameter",
    diameterIn,
    DUCT_LIMITS.diameterIn.min,
    DUCT_LIMITS.diameterIn.max,
  );
  const diameterFt = diameterIn / 12;
  return (Math.PI * diameterFt * diameterFt) / 4;
}

export function velocityFpm(cfm: number, areaSqFt: number): number {
  requireRange(
    "Airflow",
    cfm,
    DUCT_LIMITS.airflowCfm.min,
    DUCT_LIMITS.airflowCfm.max,
  );
  if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) {
    throw new RangeError("Area must be a positive finite value.");
  }
  return cfm / areaSqFt;
}

export function darcyFrictionFactor(
  reynoldsNumber: number,
  diameterIn: number,
  roughnessFt: number = STANDARD_AIR.roughnessFt,
): FrictionFactorResult {
  if (!Number.isFinite(reynoldsNumber) || reynoldsNumber <= 0) {
    throw new RangeError("Reynolds number must be positive and finite.");
  }
  requireRange(
    "Round diameter",
    diameterIn,
    DUCT_LIMITS.diameterIn.min,
    DUCT_LIMITS.diameterIn.max,
  );
  if (!Number.isFinite(roughnessFt) || roughnessFt < 0 || roughnessFt > 0.1) {
    throw new RangeError("Roughness must be between 0 and 0.1 ft.");
  }

  if (reynoldsNumber < LAMINAR_LIMIT) {
    return { factor: 64 / reynoldsNumber, regime: "laminar" };
  }

  if (reynoldsNumber < TURBULENT_LIMIT) {
    const laminarAtBoundary = 64 / LAMINAR_LIMIT;
    const turbulentAtBoundary = turbulentHaalandFactor(
      TURBULENT_LIMIT,
      diameterIn,
      roughnessFt,
    );
    const blend =
      (reynoldsNumber - LAMINAR_LIMIT) /
      (TURBULENT_LIMIT - LAMINAR_LIMIT);
    return {
      factor:
        laminarAtBoundary +
        blend * (turbulentAtBoundary - laminarAtBoundary),
      regime: "transitional",
    };
  }

  return {
    factor: turbulentHaalandFactor(reynoldsNumber, diameterIn, roughnessFt),
    regime: "turbulent",
  };
}

export function roundDuctPerformance(
  cfm: number,
  diameterIn: number,
): DuctPerformance {
  requireRange(
    "Airflow",
    cfm,
    DUCT_LIMITS.airflowCfm.min,
    DUCT_LIMITS.airflowCfm.max,
  );
  const areaSqFt = roundAreaSqFt(diameterIn);
  const airVelocityFpm = velocityFpm(cfm, areaSqFt);
  const velocityFtPerSecond = airVelocityFpm / 60;
  const diameterFt = diameterIn / 12;
  const dynamicViscosityPerSecond =
    STANDARD_AIR.dynamicViscosityLbmPerFtHour / 3600;
  const reynoldsNumber =
    (STANDARD_AIR.densityLbmPerFt3 * velocityFtPerSecond * diameterFt) /
    dynamicViscosityPerSecond;
  const friction = darcyFrictionFactor(reynoldsNumber, diameterIn);
  const velocityPressureLbfPerFt2 =
    (STANDARD_AIR.densityLbmPerFt3 / GRAVITATIONAL_CONVERSION) *
    (velocityFtPerSecond * velocityFtPerSecond) /
    2;
  const pressureLossLbfPerFt2 =
    friction.factor *
    (DESIGN_LENGTH_FT / diameterFt) *
    velocityPressureLbfPerFt2;

  return {
    areaSqFt,
    velocityFpm: airVelocityFpm,
    reynoldsNumber,
    frictionFactor: friction.factor,
    flowRegime: friction.regime,
    frictionRateInWgPer100Ft:
      pressureLossLbfPerFt2 / LBF_PER_FT2_PER_IN_WATER,
  };
}

export function equivalentRoundDiameterIn(widthIn: number, heightIn: number): number {
  requireRange(
    "Rectangular width",
    widthIn,
    DUCT_LIMITS.rectangularSideIn.min,
    DUCT_LIMITS.rectangularSideIn.max,
  );
  requireRange(
    "Rectangular height",
    heightIn,
    DUCT_LIMITS.rectangularSideIn.min,
    DUCT_LIMITS.rectangularSideIn.max,
  );
  return (
    (1.3 * Math.pow(widthIn * heightIn, 0.625)) /
    Math.pow(widthIn + heightIn, 0.25)
  );
}

export function rectangularDuctPerformance(
  cfm: number,
  widthIn: number,
  heightIn: number,
): RectangularDuctPerformance {
  requireRange(
    "Airflow",
    cfm,
    DUCT_LIMITS.airflowCfm.min,
    DUCT_LIMITS.airflowCfm.max,
  );
  const larger = Math.max(widthIn, heightIn);
  const smaller = Math.min(widthIn, heightIn);
  const equivalentDiameterIn = equivalentRoundDiameterIn(larger, smaller);
  const aspectRatio = larger / smaller;
  if (aspectRatio > DUCT_LIMITS.aspectRatio.max) {
    throw new RangeError(
      `Rectangular aspect ratio must not exceed ${DUCT_LIMITS.aspectRatio.max}:1.`,
    );
  }
  const areaSqFt = (larger * smaller) / 144;
  const actualVelocityFpm = velocityFpm(cfm, areaSqFt);
  const equivalentPerformance = roundDuctPerformance(cfm, equivalentDiameterIn);

  return {
    ...equivalentPerformance,
    areaSqFt,
    velocityFpm: actualVelocityFpm,
    widthIn: larger,
    heightIn: smaller,
    aspectRatio,
    equivalentDiameterIn,
  };
}

function solveFrictionDiameter(cfm: number, targetFrictionRate: number): number {
  let low: number = DUCT_LIMITS.diameterIn.min;
  let high: number = DUCT_LIMITS.diameterIn.max;
  const lossAtHigh = roundDuctPerformance(cfm, high).frictionRateInWgPer100Ft;
  if (lossAtHigh > targetFrictionRate) {
    throw new RangeError("Target friction requires a duct larger than the supported range.");
  }

  for (let index = 0; index < 100; index += 1) {
    const middle = (low + high) / 2;
    const loss = roundDuctPerformance(cfm, middle).frictionRateInWgPer100Ft;
    if (loss > targetFrictionRate) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

export function solveRoundDuct({
  cfm,
  targetFrictionRate,
  maximumVelocityFpm,
}: {
  cfm: number;
  targetFrictionRate: number;
  maximumVelocityFpm?: number;
}): RoundDuctSolution {
  requireRange(
    "Airflow",
    cfm,
    DUCT_LIMITS.airflowCfm.min,
    DUCT_LIMITS.airflowCfm.max,
  );
  requireRange(
    "Target friction rate",
    targetFrictionRate,
    DUCT_LIMITS.frictionRate.min,
    DUCT_LIMITS.frictionRate.max,
  );
  if (maximumVelocityFpm !== undefined) {
    requireRange(
      "Maximum velocity",
      maximumVelocityFpm,
      DUCT_LIMITS.velocityFpm.min,
      DUCT_LIMITS.velocityFpm.max,
    );
  }

  const frictionDiameterIn = solveFrictionDiameter(cfm, targetFrictionRate);
  const velocityDiameterIn =
    maximumVelocityFpm === undefined
      ? null
      : Math.sqrt((576 * cfm) / (Math.PI * maximumVelocityFpm));
  const exactDiameterIn = Math.max(
    frictionDiameterIn,
    velocityDiameterIn ?? DUCT_LIMITS.diameterIn.min,
  );
  if (exactDiameterIn > DUCT_LIMITS.diameterIn.max) {
    throw new RangeError("Required diameter exceeds the supported range.");
  }
  const wholeDiameterIn = Math.ceil(exactDiameterIn - Number.EPSILON);
  const limitingCriterion =
    velocityDiameterIn !== null && velocityDiameterIn > frictionDiameterIn
      ? "velocity"
      : "friction";

  return {
    exactDiameterIn,
    frictionDiameterIn,
    velocityDiameterIn,
    wholeDiameterIn,
    limitingCriterion,
    performance: roundDuctPerformance(cfm, wholeDiameterIn),
  };
}

export function practicalRectangularEquivalents(
  cfm: number,
  targetEquivalentDiameterIn: number,
): PracticalRectangle[] {
  requireRange(
    "Airflow",
    cfm,
    DUCT_LIMITS.airflowCfm.min,
    DUCT_LIMITS.airflowCfm.max,
  );
  requireRange(
    "Equivalent diameter",
    targetEquivalentDiameterIn,
    DUCT_LIMITS.diameterIn.min,
    DUCT_LIMITS.diameterIn.max,
  );

  const ratios = [1, 1.5, 2, 3, 4] as const;
  const seen = new Set<string>();
  const results: PracticalRectangle[] = [];

  for (const targetRatio of ratios) {
    const exactHeight =
      (targetEquivalentDiameterIn * Math.pow(targetRatio + 1, 0.25)) /
      (1.3 * Math.pow(targetRatio, 0.625));
    const widthIn = Math.ceil(exactHeight * targetRatio);
    const heightIn = Math.ceil(exactHeight);
    if (
      widthIn > DUCT_LIMITS.rectangularSideIn.max ||
      heightIn > DUCT_LIMITS.rectangularSideIn.max
    ) {
      continue;
    }
    const key = `${widthIn}x${heightIn}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const performance = rectangularDuctPerformance(cfm, widthIn, heightIn);
    results.push({
      widthIn,
      heightIn,
      aspectRatio: performance.aspectRatio,
      equivalentDiameterIn: performance.equivalentDiameterIn,
      velocityFpm: performance.velocityFpm,
      frictionRateInWgPer100Ft: performance.frictionRateInWgPer100Ft,
    });
  }

  return results;
}
