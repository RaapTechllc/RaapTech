"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center border border-dark-border bg-dark-surface p-12">
        <div className="font-mono text-xs text-brand-orange mb-4 tracking-widest uppercase">
          Error
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          The page hit an unexpected error. Try again, or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary text-xs">
            Try Again
          </button>
          <Link href="/" className="btn-secondary text-xs">
            Back to Home
          </Link>
          <Link href="/contact#book" className="btn-secondary text-xs">
            {SITE.ctaShort}
          </Link>
        </div>
      </div>
    </div>
  );
}
