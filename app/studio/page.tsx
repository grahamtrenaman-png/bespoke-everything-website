import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import BrandGrid from "@/app/components/BrandGrid";
import { STUDIO_DECKS } from "@/lib/decks";

export const metadata: Metadata = {
  title: "Decks · Bespoke Everything",
  description: "Bespoke Everything slide decks — for Chris, Doug and the network.",
  robots: { index: false, follow: false },
};

export default function StudioMenuPage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-ink text-white">
      <BrandGrid className="brand-grid-dark" />

      <div className="section-inner relative flex flex-1 flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-4xl">
          <BespokeEverythingLogo
            variant="dark"
            layout="inline"
            showTagline={false}
            className="text-base"
          />

          <p className="eyebrow mt-10">Decks</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            For Chris, Doug and the network.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/55">
            Password-protected. Open a deck, use the arrow keys or swipe between slides, and press F
            for fullscreen.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {STUDIO_DECKS.map((deck) => (
              <Link
                key={deck.href}
                href={deck.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-gold/50 hover:bg-white/[0.07]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  {deck.kicker}
                </span>
                <h2 className="mt-3 text-xl font-bold tracking-tight">{deck.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-snug text-white/60">{deck.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition group-hover:text-white">
                  Open deck
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gold to-amber-200 opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
