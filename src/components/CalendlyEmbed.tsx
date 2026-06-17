"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

export default function CalendlyEmbed() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget border border-dark-border bg-dark-surface"
      data-url={SITE.calendlyUrl}
      style={{ minWidth: "320px", height: "720px" }}
    />
  );
}
