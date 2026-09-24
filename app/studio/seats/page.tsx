import type { Metadata } from "next";
import { Suspense } from "react";

import { SeatsDeck } from "@/components/studio/seats-deck";

export const metadata: Metadata = {
  title: "The seats · Bespoke Everything",
  description:
    "Job specs for the three seats: Doug as co-founder on vendors and accounts, the seller, and the builder.",
  robots: { index: false, follow: false },
};

export default function SeatsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <SeatsDeck />
    </Suspense>
  );
}
