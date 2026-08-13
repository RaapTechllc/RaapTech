import { formatLengthInches } from "./offset-calculator";
import {
  ELBOW_HANGER_DISTANCE_FT,
  HANGER_LIMITS,
  INTERSECTION_HANGER_DISTANCE_FT,
  hangerSchedule,
  type DuctShape,
} from "./hanger-data";

const STATION_TOLERANCE_FT = 1e-9;

export interface HangerEstimateInput {
  shape: DuctShape;
  sizeIn: number;
  lengthFt: number;
  elbowCount: number;
  intersectionCount: number;
}

export interface HangerEstimate {
  shape: DuctShape;
  sizeIn: number;
  lengthFt: number;
  maxSpacingFt: number;
  minRodIn: number;
  minRodLabel: string;
  regularHangerCount: number;
  extraElbowHangers: number;
  extraIntersectionHangers: number;
  estimatedHangerCount: number;
  elbowRuleFt: number;
  intersectionRuleFt: number;
}

function requireRange(label: string, value: number, min: number, max: number): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}.`);
  }
}

function requireCount(label: string, value: number): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`${label} must be a whole number.`);
  }
  requireRange(label, value, HANGER_LIMITS.count.min, HANGER_LIMITS.count.max);
}

export function regularHangerStations(lengthFt: number, spacingFt: number): number[] {
  if (lengthFt <= 0 || spacingFt <= 0) return [];

  const stations = [0];
  let at = spacingFt;
  while (at < lengthFt - STATION_TOLERANCE_FT) {
    stations.push(at);
    at += spacingFt;
  }
  const last = stations[stations.length - 1] ?? 0;
  if (last < lengthFt - STATION_TOLERANCE_FT) {
    stations.push(lengthFt);
  }
  return stations;
}

export function distributedFittingPositions(count: number, lengthFt: number): number[] {
  if (count <= 0 || lengthFt <= 0) return [];
  const positions: number[] = [];
  for (let index = 1; index <= count; index += 1) {
    positions.push((index * lengthFt) / (count + 1));
  }
  return positions;
}

function hasHangerWithin(stations: number[], position: number, distanceFt: number): boolean {
  return stations.some(
    (station) => Math.abs(station - position) <= distanceFt + STATION_TOLERANCE_FT,
  );
}

export function estimateHangerLayout(input: HangerEstimateInput): HangerEstimate {
  const schedule = hangerSchedule(input.shape, input.sizeIn);
  requireRange(
    "Run length",
    input.lengthFt,
    HANGER_LIMITS.lengthFt.min,
    HANGER_LIMITS.lengthFt.max,
  );
  requireCount("Elbow count", input.elbowCount);
  requireCount("Intersection count", input.intersectionCount);

  const stations = regularHangerStations(input.lengthFt, schedule.maxSpacingFt);
  const regularHangerCount = stations.length;

  let extraElbowHangers = 0;
  for (const position of distributedFittingPositions(input.elbowCount, input.lengthFt)) {
    if (!hasHangerWithin(stations, position, ELBOW_HANGER_DISTANCE_FT)) {
      stations.push(position);
      extraElbowHangers += 1;
    }
  }

  let extraIntersectionHangers = 0;
  for (const position of distributedFittingPositions(
    input.intersectionCount,
    input.lengthFt,
  )) {
    if (!hasHangerWithin(stations, position, INTERSECTION_HANGER_DISTANCE_FT)) {
      stations.push(position);
      extraIntersectionHangers += 1;
    }
  }

  return {
    shape: input.shape,
    sizeIn: input.sizeIn,
    lengthFt: input.lengthFt,
    maxSpacingFt: schedule.maxSpacingFt,
    minRodIn: schedule.minRodIn,
    minRodLabel: formatLengthInches(schedule.minRodIn),
    regularHangerCount,
    extraElbowHangers,
    extraIntersectionHangers,
    estimatedHangerCount: stations.length,
    elbowRuleFt: ELBOW_HANGER_DISTANCE_FT,
    intersectionRuleFt: INTERSECTION_HANGER_DISTANCE_FT,
  };
}
