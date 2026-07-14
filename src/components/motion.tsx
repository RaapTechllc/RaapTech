"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";

function motionAllowed(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type StampProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms when parent is in view. */
  delayMs?: number;
};

/** Hard step-in, like a stamp hitting paper. SSR-visible; animates only when armed. */
export function StampReveal({
  children,
  className = "",
  delayMs = 0,
}: StampProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!motionAllowed()) return;
    // Already on screen → stamp immediately without a hide flash.
    const node = ref.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) return;
    }
    setPending(true);
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`stamp-reveal ${pending ? "stamp-pending" : ""} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/** 2px rule that draws left → right when scrolled into view. */
export function RuleDraw({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!motionAllowed()) return;
    setPending(true);
  }, []);

  return (
    <div
      ref={ref}
      className={`rule-draw ${pending ? "rule-pending" : ""} ${inView ? "is-in" : ""} ${className}`}
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
  const [n, setN] = useState(target ?? 0);

  useEffect(() => {
    if (!inView || target === null) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setN(target);
      return;
    }

    setN(0);
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
        {value}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {inView ? `${n}${suffix}` : `${target}${suffix}`}
    </div>
  );
}
