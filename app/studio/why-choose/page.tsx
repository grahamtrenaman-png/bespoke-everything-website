import type { Metadata } from "next";
import { Suspense } from "react";

import { WhyChooseJalipiDeck } from "@/components/studio/why-choose-jalipi-deck";

export const metadata: Metadata = {
  title: "Why choose jalipi",
  description:
    "Ten slides for customers: where software is going, the four things that set jalipi apart with a slide on each, what it means for your time and return, and who builds and delivers it.",
  robots: { index: false, follow: false },
};

export default function WhyChooseJalipiPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-neutral-950 text-white/60">
          Loading…
        </div>
      }
    >
      <WhyChooseJalipiDeck />
    </Suspense>
  );
}
