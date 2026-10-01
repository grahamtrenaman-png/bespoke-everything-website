"use client";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { JalipiWordmark } from "@/components/studio/jalipi-wordmark";
import { cn } from "@/lib/cn";

export type Party = "jalipi" | "be" | "tcn" | "fxp" | "qtc";

/** Company logos for the parties on the decks. `size` scales the mark; QTC is mark + wordmark text. */
export function PartyLogo({
  party,
  size = "md",
  className,
}: {
  party: Party;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const h = size === "sm" ? "h-4" : size === "lg" ? "h-7" : "h-5";
  // The TCN / FXP SVGs carry internal padding, so they need a taller box to read at the same size.
  const hWordmark = size === "sm" ? "h-5" : size === "lg" ? "h-9" : "h-6";
  switch (party) {
    case "jalipi":
      return (
        <JalipiWordmark
          className={cn(
            size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg",
            "text-white",
            className,
          )}
        />
      );
    case "be":
      return (
        <BespokeEverythingLogo
          variant="dark"
          layout="inline"
          showTagline={false}
          className={cn(size === "lg" ? "text-sm" : "text-caption", className)}
        />
      );
    case "tcn":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logos/tcn-white.svg" alt="TCN" className={cn(hWordmark, "w-auto", className)} />
      );
    case "fxp":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logos/frontlinexp-white.svg"
          alt="FrontlineXP"
          className={cn(hWordmark, "w-auto", className)}
        />
      );
    case "qtc":
      return (
        <span className={cn("inline-flex items-center gap-1.5", className)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/quickthink-cloud.png" alt="" className={cn(h, "w-auto")} />
          <span
            className={cn(
              "font-bold tracking-tight text-white",
              size === "sm" ? "text-caption" : size === "lg" ? "text-base" : "text-xs",
            )}
          >
            QuickThink Cloud
          </span>
        </span>
      );
  }
}
