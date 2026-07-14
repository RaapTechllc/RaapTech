"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Fire once then disconnect (default true). */
  once?: boolean;
};

/**
 * Observe when an element enters the viewport. Reduced-motion users get
 * `true` immediately so pages render fully assembled.
 */
export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
): { ref: React.RefObject<T | null>; inView: boolean } {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15, once = true } =
    options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        if (once) observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
