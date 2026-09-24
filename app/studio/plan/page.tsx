import type { Metadata } from "next";
import { Suspense } from "react";

import { PlanDeck } from "@/components/studio/plan-deck";

export const metadata: Metadata = {
  title: "The three-year plan · Bespoke Everything",
  description:
    "How Bespoke Everything grows to a point where we sell it or double down: investment, payback, hiring, revenue by platform and market, ARR and valuation.",
  robots: { index: false, follow: false },
};

export default function PlanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <PlanDeck />
    </Suspense>
  );
}
