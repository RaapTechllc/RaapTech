"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type StampProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms when parent is in view. */
  delayMs?: number;
};

/** Hard step-in, like a stamp hitting paper. No floaty fades. */
export function StampReveal({
  children,
  className = "",
  delayMs = 0,
}: StampProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`stamp-reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/** 2px rule that draws left → right when scrolled into view. */
export function RuleDraw({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rule-draw ${inView ? "is-in" : ""} ${className}`}
      aria-hidden
    />
  );
}

type OdometerProps = {
  value: string;
  className?: string;
};

/**
 * Tick numeric prefixes in discrete steps. Non-numeric labels (e.g. "Daily")
 * render as-is once in view.
 */
export function OdometerStat({ value, className = "" }: OdometerProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const [n, setN] = useState(target === null ? 0 : 0);

  useEffect(() => {
    if (!inView || target === null) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setN(target);
      return;
    }

    const steps = Math.min(target, 20);
    const step = Math.max(1, Math.ceil(target / steps));
    let current = 0;
    const id = window.setInterval(() => {
      current = Math.min(target, current + step);
      setN(current);
      if (current >= target) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [inView, target]);

  if (target === null) {
    return (
      <div ref={ref} className={className}>
        {inView ? value : "\u00A0"}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {inView ? `${n}${suffix}` : "\u00A0"}
    </div>
  );
}
