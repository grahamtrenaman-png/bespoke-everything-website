import type { Metadata } from "next";
import { Suspense } from "react";

import { StudioCallDeck } from "@/components/studio/studio-setup-deck";

export const metadata: Metadata = {
  title: "The studio · short version · Bespoke Everything",
  description:
    "Four slides: the idea, where we build, each vendor, and how the studio runs.",
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
