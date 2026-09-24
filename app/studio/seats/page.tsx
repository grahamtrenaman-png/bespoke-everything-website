import type { Metadata } from "next";
import { Suspense } from "react";

import { SeatsDeck } from "@/components/studio/seats-deck";

export const metadata: Metadata = {
  title: "The roles · Bespoke Everything",
  description:
    "Roles and responsibilities: Graham, Doug, the seller, the builder, and the part TCN plays.",
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
