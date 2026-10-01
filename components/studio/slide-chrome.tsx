"use client";

import type { ReactNode } from "react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { JalipiWordmark } from "@/components/studio/jalipi-wordmark";
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
  strapline?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden text-white", className)}>
      {corner ? <div className="absolute left-5 top-5 z-40">{corner}</div> : null}
      <div className="pointer-events-none z-20 flex shrink-0 flex-col items-center pt-6">
        <BespokeDeckLogo />
        {strapline ? (
          <p
            className="deck-rise mt-10 max-w-4xl text-center text-[1.65rem] font-black leading-tight tracking-tight"
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

/** Frame for jalipi product slides: pinned jalipi wordmark, content centred below. Mirrors the jalipi app. */
export function JalipiBrandedSlide({
  className,
  contentClassName,
  corner,
  children,
}: {
  className?: string;
  /** Override the content band (e.g. justify-start for dense slides that would ride under the mark). */
  contentClassName?: string;
  corner?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {corner ? <div className="absolute left-5 top-5 z-40">{corner}</div> : null}
      <div className="pointer-events-none z-20 flex shrink-0 justify-center pb-1 pt-6 sm:pt-7">
        <JalipiWordmark className="text-2xl text-white sm:text-3xl" />
      </div>
      <div
        className={cn(
          // Clip overflow so dense, vertically-centred content cannot paint under the mark.
          "relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
