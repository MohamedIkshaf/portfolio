"use client";

import dynamic from "next/dynamic";

const CursorGlow = dynamic(
  () => import("@/components/animations/cursor-glow").then((m) => m.CursorGlow),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("@/components/shared/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

const BackToTop = dynamic(
  () => import("@/components/shared/back-to-top").then((m) => m.BackToTop),
  { ssr: false }
);

export function MarketingClientWidgets() {
  return (
    <>
      <CursorGlow />
      <CommandPalette />
      <BackToTop />
    </>
  );
}
