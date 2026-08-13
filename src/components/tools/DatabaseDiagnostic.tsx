"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  DIMENSION_IDS,
  DIMENSION_LABELS,
  QUESTIONS,
  diagnosticMailtoHref,
  questionsFor,
  scoreDiagnostic,
  unansweredQuestionIds,
  type Answers,
  type DiagnosticResult,
} from "@/lib/database-diagnostic";
import { useRevealOnSuccess } from "@/lib/useRevealOnSuccess";

const choiceClass =
  "flex cursor-pointer items-start gap-3 border-2 border-ink bg-paper p-3 text-left text-sm leading-snug text-ink transition-colors has-[:checked]:bg-ink has-[:checked]:text-paper";

export default function DatabaseDiagnostic() {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref: resultsRef, reveal: revealResults } = useRevealOnSuccess<HTMLElement>();

  const remaining = unansweredQuestionIds(answers).length;

  const liveResult = useMemo(() => {
    if (remaining > 0) return null;
    try {
      return scoreDiagnostic(answers);
    } catch {
      return null;
    }
  }, [answers, remaining]);

  function choose(questionId: string, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setError(null);
  }

  function score(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const next = scoreDiagnostic(answers);
      setResult(next);
      setError(null);
      revealResults();
    } catch (caught) {
      setResult(null);
      setError(
        caught instanceof Error
          ? caught.message
          : "Answer every question before scoring.",
      );
    }
  }

  const shown = result ?? liveResult;

  return (
    <div className="border-2 border-ink bg-paper">
      <form noValidate onSubmit={score}>
        {DIMENSION_IDS.map((dimension) => (
          <section
            key={dimension}
            className="border-b-2 border-ink p-6"
            aria-labelledby={`dimension-${dimension}`}
          >
            <h2
              id={`dimension-${dimension}`}
              className="font-display text-2xl font-bold text-ink"
            >
              {DIMENSION_LABELS[dimension]}
            </h2>
            <ol className="mt-6 space-y-8">
              {questionsFor(dimension).map((question) => {
                const selected = answers[question.id];
                const number =
                  QUESTIONS.findIndex((item) => item.id === question.id) + 1;
                return (
                  <li key={question.id}>
                    <fieldset>
                      <legend className="font-mono text-xs font-bold uppercase tracking-label text-ink">
                        {String(number).padStart(2, "0")} / {question.prompt}
                      </legend>
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {question.choices.map((choice) => (
                          <label key={choice.value} className={choiceClass}>
                            <input
                              className="mt-1 shrink-0 accent-black"
                              type="radio"
                              name={question.id}
                              value={choice.value}
                              checked={selected === choice.value}
                              onChange={() => choose(question.id, choice.value)}
                            />
                            <span>{choice.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <button className="btn-primary" type="submit">
            Score the database
          </button>
          <p className="font-mono text-xs uppercase tracking-label text-gray-2">
            {remaining === 0
              ? "All 12 answered. Scores stay in this browser."
              : `${remaining} question${remaining === 1 ? "" : "s"} left.`}
          </p>
        </div>
      </form>

      {error && (
        <p
          role="alert"
          className="mx-6 mb-6 border-2 border-ink bg-gray-4 p-3 font-mono text-sm text-ink"
        >
          {error}
        </p>
      )}

      <section
        ref={resultsRef}
        tabIndex={-1}
        aria-live="polite"
        aria-label="Results"
        className="scroll-mt-24 border-t-2 border-ink p-6 outline-none"
      >
        {!shown && (
          <p className="font-mono text-sm text-gray-2">
            Answer the twelve questions. Worse answers raise the leak score —
            hours and bids walking out of the database.
          </p>
        )}
        {shown && (
          <div>
            <p className="font-mono text-xs uppercase tracking-label text-gray-2">
              Self-score · leak {shown.leak} / {shown.maxLeak}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              {shown.headline}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-1">
              {shown.summary}
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {shown.dimensions.map((dimension) => (
                <div key={dimension.id} className="border-2 border-ink p-4">
                  <dt className="font-mono text-xs uppercase tracking-label text-gray-2">
                    {dimension.label} · {dimension.leak}/{dimension.maxLeak}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">
                    {dimension.line}
                  </dd>
                </div>
              ))}
            </dl>
            <a href={diagnosticMailtoHref(shown)} className="btn-secondary mt-8">
              Email these results to Tim
            </a>
            <p className="mt-4 max-w-3xl font-mono text-xs uppercase leading-relaxed tracking-label text-gray-2">
              Optional. Opens your email app with the scores. No account. Nothing
              is stored on the server. Answers never leave this browser unless
              you send them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
