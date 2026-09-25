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
          <p
            className="deck-rise mt-10 text-[2rem] font-black leading-tight tracking-tight text-amber-300"
            style={{ animationDelay: "0.12s" }}
          >
            {strapline}
          </p>
        ) : null}
      </div>
      <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center px-12 pb-6 pt-2">
        {children}
      </div>
    </div>
  );
}
