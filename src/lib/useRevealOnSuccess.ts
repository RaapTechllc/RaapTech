import { useCallback, useEffect, useRef, useState } from "react";

export function useRevealOnSuccess<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [token, setToken] = useState(0);

  const reveal = useCallback(() => {
    setToken((current) => current + 1);
  }, []);

  useEffect(() => {
    if (token === 0) return;
    const node = ref.current;
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    node.focus({ preventScroll: true });
  }, [token]);

  return { ref, reveal };
}
