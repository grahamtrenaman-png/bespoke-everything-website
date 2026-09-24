import type { Metadata } from "next";
import { Suspense } from "react";

import { StudioSetupDeck } from "@/components/studio/studio-setup-deck";

export const metadata: Metadata = {
  title: "Setting up the studio · Bespoke Everything",
  description:
    "How Bespoke Everything gets going: platforms, FrontlineXP, who runs it, how work arrives, and year one from January.",
  robots: { index: false, follow: false },
};

export default function StudioSetupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <StudioSetupDeck />
    </Suspense>
  );
}
