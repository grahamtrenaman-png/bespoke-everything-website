import type { Metadata } from "next";
import { Suspense } from "react";

import { PartnershipDeck } from "@/components/studio/partnership-deck";

export const metadata: Metadata = {
  title: "The partnership · QTC, Bespoke Everything and TCN",
  description:
    "How QuickThink Cloud, Bespoke Everything and TCN work together on jalipi: who does what, how a deal flows, and what is still to agree.",
  robots: { index: false, follow: false },
};

export default function PartnershipPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <PartnershipDeck />
    </Suspense>
  );
}
