"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="text-center px-6">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-error/10 mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-text-secondary max-w-md">
            An unexpected error occurred. Please try again or contact support if
            the problem persists.
          </p>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
