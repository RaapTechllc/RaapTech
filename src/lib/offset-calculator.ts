const OFFSET_LIMITS = {
  radiusIn: { min: 0.0625, max: 10_000 },
  angleDeg: { min: 0.01, max: 90 },
  straightIn: { min: 0, max: 10_000 },
  dimensionIn: { min: 0, max: 10_000 },
} as const;

const SOLVER_TOLERANCE = 1e-9;

export interface OffsetLayoutInput {
  radiusIn: number;
  angleDeg: number;
  straightIn: number;
}

export interface OffsetLayout extends OffsetLayoutInput {
  offsetIn: number;
  runIn: number;
}

export interface OffsetAngleSolution {
  angleDeg: number;
  straightIn: number;
}

export interface OffsetRadiusSolution extends OffsetAngleSolution {
  radiusIn: number;
}

function requireRange(label: string, value: number, min: number, max: number): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}.`);
  }
}

export function parseLengthInches(value: string): number | null {
  const text = String(value).trim();
  if (!text) return null;

  const mixed = text.match(/^([+-]?\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const wholeText = mixed[1];
    const whole = Number(wholeText);
    const numerator = Number(mixed[2]);
    const denominator = Number(mixed[3]);
    if (!denominator || numerator >= denominator) return null;
    const sign = wholeText.startsWith("-") ? -1 : 1;
    const result = sign * (Math.abs(whole) + numerator / denominator);
    return Number.isFinite(result) ? result : null;
  }

  const fraction = text.match(/^([+-]?)(\d+)\/(\d+)$/);
  if (fraction) {
    const numerator = Number(fraction[2]);
    const denominator = Number(fraction[3]);
    if (!denominator) return null;
    const sign = fraction[1] === "-" ? -1 : 1;
    const result = sign * (numerator / denominator);
    return Number.isFinite(result) ? result : null;
  }

  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
  const decimal = Number(text);
  return Number.isFinite(decimal) ? decimal : null;
}

function greatestCommonDivisor(left: number, right: number): number {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function roundToSixteenth(value: number): number {
  if (!Number.isFinite(value)) return value;
  return Math.round(value * 16) / 16;
}

export function formatLengthInput(value: number): string {
  if (!Number.isFinite(value)) return "";
  const roundedSixteenths = Math.round(value * 16);
  if (roundedSixteenths === 0) return "0";

  const sign = roundedSixteenths < 0 ? "-" : "";
  const abs = Math.abs(roundedSixteenths);
  const whole = Math.floor(abs / 16);
  const remainder = abs % 16;
  if (!remainder) return `${sign}${whole}`;

  const divisor = greatestCommonDivisor(remainder, 16);
  const fraction = `${remainder / divisor}/${16 / divisor}`;
  return whole ? `${sign}${whole} ${fraction}` : `${sign}${fraction}`;
}

export function formatLengthInches(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const formatted = formatLengthInput(value).replace("-", "−");
  return `${formatted} in`;
}

export const STOCK_ELBOW_ANGLES_DEG = [15, 22.5, 30, 45, 60, 90] as const;
const STOCK_ELBOW_ANGLE_TOLERANCE_DEG = 0.25;

export function isStockElbowAngle(angleDeg: number): boolean {
  if (!Number.isFinite(angleDeg)) return false;
  return STOCK_ELBOW_ANGLES_DEG.some(
    (stock) => Math.abs(angleDeg - stock) <= STOCK_ELBOW_ANGLE_TOLERANCE_DEG,
  );
}

export function calculateOffsetLayout({
  radiusIn,
  angleDeg,
  straightIn,
}: OffsetLayoutInput): OffsetLayout {
  requireRange(
    "Centerline radius",
    radiusIn,
    OFFSET_LIMITS.radiusIn.min,
    OFFSET_LIMITS.radiusIn.max,
  );
  requireRange(
    "Elbow angle",
    angleDeg,
    OFFSET_LIMITS.angleDeg.min,
    OFFSET_LIMITS.angleDeg.max,
  );
  requireRange(
    "Straight length",
    straightIn,
    OFFSET_LIMITS.straightIn.min,
    OFFSET_LIMITS.straightIn.max,
  );

  const radians = (angleDeg * Math.PI) / 180;
  return {
    radiusIn,
    angleDeg,
    straightIn,
    offsetIn:
      2 * radiusIn * (1 - Math.cos(radians)) +
      straightIn * Math.sin(radians),
    runIn:
      2 * radiusIn * Math.sin(radians) +
      straightIn * Math.cos(radians),
  };
}

function validInverseInputs(radiusOrAngle: number, runIn: number, offsetIn: number): boolean {
  return (
    Number.isFinite(radiusOrAngle) &&
    Number.isFinite(runIn) &&
    Number.isFinite(offsetIn) &&
    radiusOrAngle > 0 &&
    runIn > 0 &&
    offsetIn >= 0 &&
    runIn <= OFFSET_LIMITS.dimensionIn.max &&
    offsetIn <= OFFSET_LIMITS.dimensionIn.max
  );
}

export function solveOffsetAngle({
  radiusIn,
  runIn,
  offsetIn,
}: {
  radiusIn: number;
  runIn: number;
  offsetIn: number;
}): OffsetAngleSolution | null {
  if (
    !validInverseInputs(radiusIn, runIn, offsetIn) ||
    radiusIn < OFFSET_LIMITS.radiusIn.min ||
    radiusIn > OFFSET_LIMITS.radiusIn.max
  ) {
    return null;
  }

  const candidates: OffsetAngleSolution[] = [];
  const addCandidate = (solvedAngle: number): void => {
    if (
      candidates.some(
        (candidate) => Math.abs(candidate.angleDeg - solvedAngle) < 0.0001,
      )
    ) {
      return;
    }

    const radians = (solvedAngle * Math.PI) / 180;
    const cosine = Math.cos(radians);
    if (Math.abs(cosine) <= SOLVER_TOLERANCE) return;
    const straightIn =
      (runIn - 2 * radiusIn * Math.sin(radians)) / cosine;
    if (
      straightIn >= -0.001 &&
      straightIn <= OFFSET_LIMITS.straightIn.max
    ) {
      candidates.push({
        angleDeg: solvedAngle,
        straightIn: Math.max(0, straightIn),
      });
    }
  };

  const horizontalComponent = offsetIn - 2 * radiusIn;
  const verticalComponent = -runIn;
  const magnitude = Math.hypot(horizontalComponent, verticalComponent);
  if (magnitude > SOLVER_TOLERANCE) {
    const rawCosineTarget = (-2 * radiusIn) / magnitude;
    if (
      rawCosineTarget >= -1 - SOLVER_TOLERANCE &&
      rawCosineTarget <= 1 + SOLVER_TOLERANCE
    ) {
      const cosineTarget = Math.max(-1, Math.min(1, rawCosineTarget));
      const phase = Math.atan2(verticalComponent, horizontalComponent);
      const delta = Math.acos(cosineTarget);
      for (const direction of [-1, 1]) {
        for (let turn = -2; turn <= 2; turn += 1) {
          const radians = phase + direction * delta + turn * 2 * Math.PI;
          const angleDeg = (radians * 180) / Math.PI;
          if (
            angleDeg >= OFFSET_LIMITS.angleDeg.min - SOLVER_TOLERANCE &&
            angleDeg <= OFFSET_LIMITS.angleDeg.max + SOLVER_TOLERANCE
          ) {
            addCandidate(
              Math.max(
                OFFSET_LIMITS.angleDeg.min,
                Math.min(OFFSET_LIMITS.angleDeg.max, angleDeg),
              ),
            );
          }
        }
      }
    }
  }

  const ninetyRunTolerance = Math.max(
    SOLVER_TOLERANCE,
    Math.abs(runIn) * 1e-9,
  );
  const straightAtNinety = offsetIn - 2 * radiusIn;
  const ninetyStraightTolerance = Math.max(
    SOLVER_TOLERANCE,
    Math.abs(offsetIn) * 1e-9,
  );
  if (
    Math.abs(runIn - 2 * radiusIn) <= ninetyRunTolerance &&
    straightAtNinety >= -ninetyStraightTolerance &&
    straightAtNinety <=
      OFFSET_LIMITS.straightIn.max + ninetyStraightTolerance
  ) {
    candidates.push({
      angleDeg: 90,
      straightIn: Math.max(
        0,
        Math.min(OFFSET_LIMITS.straightIn.max, straightAtNinety),
      ),
    });
  }

  candidates.sort((left, right) => left.straightIn - right.straightIn);
  return candidates[0] ?? null;
}

export function solveOffsetRadius({
  angleDeg,
  runIn,
  offsetIn,
}: {
  angleDeg: number;
  runIn: number;
  offsetIn: number;
}): OffsetRadiusSolution | null {
  if (
    !validInverseInputs(angleDeg, runIn, offsetIn) ||
    angleDeg < OFFSET_LIMITS.angleDeg.min ||
    angleDeg > OFFSET_LIMITS.angleDeg.max
  ) {
    return null;
  }

  const radians = (angleDeg * Math.PI) / 180;
  const oneMinusCosine = 1 - Math.cos(radians);
  if (oneMinusCosine <= SOLVER_TOLERANCE) return null;

  const radiusIn =
    (runIn * Math.sin(radians) - offsetIn * Math.cos(radians)) /
    (2 * oneMinusCosine);
  const straightIn =
    (offsetIn * Math.sin(radians) - oneMinusCosine * runIn) /
    oneMinusCosine;

  const radiusBoundaryTolerance = Math.max(
    SOLVER_TOLERANCE,
    Math.abs(radiusIn) * 1e-9,
  );
  if (
    radiusIn < OFFSET_LIMITS.radiusIn.min - radiusBoundaryTolerance ||
    radiusIn > OFFSET_LIMITS.radiusIn.max + radiusBoundaryTolerance ||
    straightIn < -0.001 ||
    straightIn > OFFSET_LIMITS.straightIn.max
  ) {
    return null;
  }

  return {
    radiusIn: Math.max(
      OFFSET_LIMITS.radiusIn.min,
      Math.min(OFFSET_LIMITS.radiusIn.max, radiusIn),
    ),
    straightIn: Math.max(0, straightIn),
    angleDeg,
  };
}
