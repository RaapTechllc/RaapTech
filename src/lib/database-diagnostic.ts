import { SITE } from "./site";

export const DIMENSION_IDS = [
  "pricing",
  "structure",
  "connectors",
  "documentation",
] as const;

export type DimensionId = (typeof DIMENSION_IDS)[number];
export type Leak = 0 | 1 | 2;
export type Band = "tight" | "hours" | "bids" | "walking";

export type Choice = {
  value: string;
  label: string;
  leak: Leak;
};

export type Question = {
  id: string;
  dimension: DimensionId;
  prompt: string;
  choices: readonly [Choice, Choice, Choice];
};

export type Answers = Record<string, string>;

export type DimensionScore = {
  id: DimensionId;
  label: string;
  leak: number;
  maxLeak: number;
  line: string;
};

export type DiagnosticResult = {
  dimensions: DimensionScore[];
  leak: number;
  maxLeak: number;
  band: Band;
  headline: string;
  summary: string;
};

export const DIMENSION_LABELS: Record<DimensionId, string> = {
  pricing: "Pricing accuracy",
  structure: "Item structure",
  connectors: "Connector health",
  documentation: "Documentation",
};

export const QUESTIONS: readonly Question[] = [
  {
    id: "pricing-catalog",
    dimension: "pricing",
    prompt:
      "When did catalog pricing last get a real update — not a handful of items somebody happened to touch?",
    choices: [
      { value: "a", label: "This quarter", leak: 0 },
      { value: "b", label: "Sometime this year", leak: 1 },
      { value: "c", label: "A year or more, or nobody can say", leak: 2 },
    ],
  },
  {
    id: "pricing-trust",
    dimension: "pricing",
    prompt:
      "Can an estimator trust a takeoff price without opening a shadow spreadsheet?",
    choices: [
      { value: "a", label: "The database is the number", leak: 0 },
      { value: "b", label: "They still check a spreadsheet", leak: 1 },
      { value: "c", label: "The spreadsheet is the real price", leak: 2 },
    ],
  },
  {
    id: "pricing-dual-entry",
    dimension: "pricing",
    prompt: "Do you quote in one system and fabricate in another?",
    choices: [
      {
        value: "a",
        label: "Quote and fab both run through Autodesk Fabrication",
        leak: 0,
      },
      { value: "b", label: "Some jobs get dual-entered", leak: 1 },
      {
        value: "c",
        label:
          "Quote in Vulcan, Trimble, or Quote Express; fab in Autodesk Fabrication",
        leak: 2,
      },
    ],
  },
  {
    id: "structure-duplicates",
    dimension: "structure",
    prompt: "What's still sitting in the item library?",
    choices: [
      { value: "a", label: "One shop standard. Duplicates get deleted.", leak: 0 },
      { value: "b", label: "Some leftover vendor items we work around", leak: 1 },
      {
        value: "c",
        label:
          "Duplicates, old vendor catalogs, and retired shop standards mixed together",
        leak: 2,
      },
    ],
  },
  {
    id: "structure-labor",
    dimension: "structure",
    prompt:
      "Are labor tables built for this shop's machines, or still a generic template?",
    choices: [
      { value: "a", label: "Built for our machines and crew", leak: 0 },
      { value: "b", label: "Started as a template; we tweaked some", leak: 1 },
      { value: "c", label: "Still the template we bought or inherited", leak: 2 },
    ],
  },
  {
    id: "structure-specialty",
    dimension: "structure",
    prompt:
      "Insulation, lining, and specialty items — in the database, or added after the fact?",
    choices: [
      { value: "a", label: "In the database", leak: 0 },
      { value: "b", label: "Some in, some written onto the ticket", leak: 1 },
      { value: "c", label: "Almost always added after the fact", leak: 2 },
    ],
  },
  {
    id: "connectors-match",
    dimension: "connectors",
    prompt:
      "Do connectors, seams, and pressure classes match what the shop can actually make?",
    choices: [
      { value: "a", label: "They match the shop", leak: 0 },
      { value: "b", label: "Close enough; the floor fixes them", leak: 1 },
      {
        value: "c",
        label: "Tickets still call for connections we don't make",
        leak: 2,
      },
    ],
  },
  {
    id: "connectors-tickets",
    dimension: "connectors",
    prompt: "Do bad connections still show up on tickets, nest, or CAM?",
    choices: [
      { value: "a", label: "Rare", leak: 0 },
      { value: "b", label: "Often enough the shop notices", leak: 1 },
      { value: "c", label: "Every other job", leak: 2 },
    ],
  },
  {
    id: "connectors-posts",
    dimension: "connectors",
    prompt:
      "If you run more than one cutting path (plasma, waterjet, router, phenolic), do the extra machines have working posts?",
    choices: [
      {
        value: "a",
        label: "Yes, or we only run one machine and it works",
        leak: 0,
      },
      {
        value: "b",
        label: "Plasma works; the second machine is half set up",
        leak: 1,
      },
      {
        value: "c",
        label: "Only the original plasma path actually posts",
        leak: 2,
      },
    ],
  },
  {
    id: "docs-written",
    dimension: "documentation",
    prompt:
      'Is there a written "how this database is built" that someone else could follow?',
    choices: [
      {
        value: "a",
        label: "Written, and someone besides the builder has used it",
        leak: 0,
      },
      { value: "b", label: "Notes exist, but you'd still have to ask", leak: 1 },
      { value: "c", label: "It's in one person's head", leak: 2 },
    ],
  },
  {
    id: "docs-reports",
    dimension: "documentation",
    prompt:
      "Do the reports match what shop, shipping, and the customer actually need?",
    choices: [
      {
        value: "a",
        label: "Shop, shipping, and customer reports match how we work",
        leak: 0,
      },
      { value: "b", label: "We print them, then mark them up", leak: 1 },
      { value: "c", label: "Leftover from the template, or unused", leak: 2 },
    ],
  },
  {
    id: "docs-owner",
    dimension: "documentation",
    prompt: "Who maintains the database, and how often?",
    choices: [
      { value: "a", label: "Named owner, on a schedule", leak: 0 },
      { value: "b", label: "Whoever has time", leak: 1 },
      { value: "c", label: "Only when something breaks", leak: 2 },
    ],
  },
];

const PRICING_LINES: Record<string, string> = {
  "pricing-dual-entry":
    "Quote lives in one system, fab in another. Dual entry is how prices and items drift apart.",
  "pricing-trust":
    "Estimators don't trust the takeoff. The spreadsheet is still the real price.",
  "pricing-catalog":
    "Catalog pricing is stale. Takeoffs are walking out with last year's numbers.",
};

const STRUCTURE_LINES: Record<string, string> = {
  "structure-duplicates":
    "Duplicates and leftover vendor items are still in the library. Estimators will pick the wrong one.",
  "structure-labor":
    "Labor is still a generic template, not this shop's machines.",
  "structure-specialty":
    "Insulation, lining, and specialty get added after the fact. That's hours on every job.",
};

const CONNECTOR_LINES: Record<string, string> = {
  "connectors-match":
    "Tickets still call for connections the shop doesn't make.",
  "connectors-tickets":
    "Bad connections are still hitting tickets, nest, or CAM.",
  "connectors-posts":
    "Only the original plasma path actually posts. Extra machines are dead weight in the database.",
};

const DOCUMENTATION_LINES: Record<string, string> = {
  "docs-written":
    "How this database is built lives in one person's head. That's a retirement problem.",
  "docs-reports":
    "Reports don't match shop, shipping, or the customer. People mark them up or ignore them.",
  "docs-owner": "Nobody owns it until something breaks.",
};

const DIMENSION_LINE_MAP: Record<DimensionId, Record<string, string>> = {
  pricing: PRICING_LINES,
  structure: STRUCTURE_LINES,
  connectors: CONNECTOR_LINES,
  documentation: DOCUMENTATION_LINES,
};

const MIXED_LINES: Record<DimensionId, string> = {
  pricing: "Pricing works until it doesn't — somebody still keeps a check file.",
  structure:
    "Item structure is workable, with leftovers the shop already knows to dodge.",
  connectors:
    "Connectors mostly work, with floor fixes that shouldn't be required.",
  documentation: "Some notes exist. Maintenance is still whoever has time.",
};

const TIGHT_LINES: Record<DimensionId, string> = {
  pricing: "Pricing looks trusted. Keep the catalog current so it stays that way.",
  structure: "Item library looks like this shop, not a leftover catalog.",
  connectors:
    "Connectors, seams, and pressure classes match what you can actually run.",
  documentation:
    "Written, owned, and the reports match how the shop actually works.",
};

export function questionsFor(dimension: DimensionId): Question[] {
  return QUESTIONS.filter((question) => question.dimension === dimension);
}

export function unansweredQuestionIds(answers: Answers): string[] {
  return QUESTIONS.filter((question) => {
    const value = answers[question.id];
    return value === undefined || !question.choices.some((choice) => choice.value === value);
  }).map((question) => question.id);
}

function leakFor(question: Question, answers: Answers): Leak {
  const value = answers[question.id];
  const choice = question.choices.find((item) => item.value === value);
  if (!choice) {
    throw new RangeError(`Answer every question before scoring. Missing: ${question.id}`);
  }
  return choice.leak;
}

function lineForDimension(dimension: DimensionId, answers: Answers): string {
  const questions = questionsFor(dimension);
  const scored = questions.map((question) => ({
    question,
    leak: leakFor(question, answers),
  }));

  const worst = scored.find((item) => item.leak === 2);
  if (worst) {
    return DIMENSION_LINE_MAP[dimension][worst.question.id] ?? MIXED_LINES[dimension];
  }

  if (scored.some((item) => item.leak === 1)) {
    return MIXED_LINES[dimension];
  }

  return TIGHT_LINES[dimension];
}

export function bandForLeak(leak: number, maxLeak: number): Band {
  const ratio = maxLeak === 0 ? 0 : leak / maxLeak;
  if (ratio <= 0.25) return "tight";
  if (ratio <= 0.5) return "hours";
  if (ratio <= 0.75) return "bids";
  return "walking";
}

function overallCopy(dimensions: DimensionScore[], leak: number, maxLeak: number): {
  band: Band;
  headline: string;
  summary: string;
} {
  const band = bandForLeak(leak, maxLeak);
  const leaking = dimensions.filter((dimension) => dimension.leak >= 4);
  const ranked = [...dimensions].sort((a, b) => b.leak - a.leak);
  const loudest = ranked[0];

  if (band === "tight") {
    return {
      band,
      headline: "The database isn't the leak.",
      summary:
        "Self-score says the file isn't the main problem. The paid audit is still the way to confirm it — this checklist never opened the database.",
    };
  }

  if (band === "walking") {
    return {
      band,
      headline: "The database is a rumor. That's expensive.",
      summary:
        "Pricing, items, connectors, and docs are all compensating for each other. That's lost bids and hours the floor spends repairing tickets.",
    };
  }

  if (leaking.length >= 2) {
    const first = leaking[0]!.label;
    const second = leaking[1]!.label.toLowerCase();
    return {
      band,
      headline:
        band === "bids"
          ? "This is where you're losing bids."
          : "You're leaking hours, not just items.",
      summary: `${first} and ${second} are the loudest leaks. That's extra minutes on every takeoff and tickets the floor has to repair.`,
    };
  }

  if (loudest && loudest.leak >= 4) {
    return {
      band,
      headline:
        band === "bids"
          ? "This is where you're losing bids."
          : "You're leaking hours, not just items.",
      summary: `${loudest.label} is where you're giving away time. ${loudest.line}`,
    };
  }

  return {
    band,
    headline: "You're leaking hours, not just items.",
    summary:
      "No single area is on fire, but the mixed answers add up. That's the slow leak — extra minutes on every job.",
  };
}

export function scoreDiagnostic(answers: Answers): DiagnosticResult {
  const missing = unansweredQuestionIds(answers);
  if (missing.length > 0) {
    throw new RangeError(
      `Answer every question before scoring. ${missing.length} left.`,
    );
  }

  const dimensions: DimensionScore[] = DIMENSION_IDS.map((id) => {
    const questions = questionsFor(id);
    const leak = questions.reduce(
      (total, question) => total + leakFor(question, answers),
      0,
    );
    return {
      id,
      label: DIMENSION_LABELS[id],
      leak,
      maxLeak: questions.length * 2,
      line: lineForDimension(id, answers),
    };
  });

  const leak = dimensions.reduce((total, dimension) => total + dimension.leak, 0);
  const maxLeak = dimensions.reduce(
    (total, dimension) => total + dimension.maxLeak,
    0,
  );
  const copy = overallCopy(dimensions, leak, maxLeak);

  return {
    dimensions,
    leak,
    maxLeak,
    band: copy.band,
    headline: copy.headline,
    summary: copy.summary,
  };
}

export function allTightAnswers(): Answers {
  return Object.fromEntries(QUESTIONS.map((question) => [question.id, "a"]));
}

export function allLeakingAnswers(): Answers {
  return Object.fromEntries(QUESTIONS.map((question) => [question.id, "c"]));
}

export function diagnosticMailtoHref(result: DiagnosticResult): string {
  const dimensionLines = result.dimensions
    .map(
      (dimension) =>
        `${dimension.label}: ${dimension.leak}/${dimension.maxLeak} — ${dimension.line}`,
    )
    .join("\n");

  const body = [
    `Database diagnostic (self-score)`,
    ``,
    `Overall leak: ${result.leak} / ${result.maxLeak} — ${result.headline}`,
    result.summary,
    ``,
    dimensionLines,
    ``,
    `This is a self-score, not a database review.`,
  ].join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    "Database diagnostic self-score",
  )}&body=${encodeURIComponent(body)}`;
}
