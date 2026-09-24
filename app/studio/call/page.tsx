import type { Metadata } from "next";
import { Suspense } from "react";

import { StudioCallDeck } from "@/components/studio/studio-setup-deck";

export const metadata: Metadata = {
  title: "The studio · Bespoke Everything",
  description:
    "The idea, where we build, each vendor, who runs it, how work arrives, and the year from January.",
  robots: { index: false, follow: false },
};

export default function StudioCallPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <StudioCallDeck />
    </Suspense>
  );
}
