"use client";

import type { ReactNode } from "react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { cn } from "@/lib/cn";

function BespokeDeckLogo({ className }: { className?: string }) {
  return (
    <BespokeEverythingLogo
      variant="dark"
      layout="inline"
      showTagline={false}
      className={cn("text-sm", className)}
    />
  );
}

/** Frame for dark studio slides: pinned brand mark, content centred below. */
export function BespokeBrandedSlide({
  className,
  corner,
  strapline,
  children,
}: {
  className?: string;
  corner?: ReactNode;
  /** Optional strapline beneath the wordmark. Opt-in per slide; not part of the logo. */
  strapline?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden text-white", className)}>
      {corner ? <div className="absolute left-5 top-5 z-40">{corner}</div> : null}
      <div className="pointer-events-none z-20 flex shrink-0 flex-col items-center pt-6">
        <BespokeDeckLogo />
        {strapline ? (
          <div
            className="deck-rise relative mt-12 flex items-center gap-5"
            style={{ animationDelay: "0.12s" }}
          >
            <span
              aria-hidden
              className="h-px w-20 bg-gradient-to-r from-transparent via-amber-300/50 to-amber-300/90"
            />
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_2px_rgba(252,211,77,0.55)]" />
            <p className="relative px-2 text-[2.6rem] font-black italic leading-none tracking-tight">
              <span
                aria-hidden
                className="absolute inset-0 select-none px-2 text-amber-400 opacity-45 blur-xl"
              >
                {strapline}
              </span>
              <span className="relative bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {strapline}
              </span>
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_2px_rgba(252,211,77,0.55)]" />
            <span
              aria-hidden
              className="h-px w-20 bg-gradient-to-l from-transparent via-amber-300/50 to-amber-300/90"
            />
          </div>
        ) : null}
      </div>
      <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center px-12 pb-6 pt-2">
        {children}
      </div>
    </div>
  );
}
