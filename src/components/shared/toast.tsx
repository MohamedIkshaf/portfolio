"use client";

import { Toaster as SonnerToaster } from "sonner";

export function ToastProvider() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--color-surface-50, #ffffff)",
          color: "var(--color-text-primary, #0f172a)",
          border: "1px solid var(--color-border-subtle, #e2e8f0)",
          borderRadius: "1rem",
        },
      }}
    />
  );
}
