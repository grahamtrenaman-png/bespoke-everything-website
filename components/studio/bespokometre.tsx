"use client";

import { useId, type ReactNode } from "react";
import { Flame, History } from "lucide-react";

import { BespokeBrandedSlide } from "@/components/studio/slide-chrome";
import {
  ERAS,
  Y_RANGE,
  Y_TOP,
  buildSmoothPath,
  xFor,
  yFor,
  type Era,
} from "@/components/studio/eras";
import { cn } from "@/lib/cn";

export function TimelineSlide({
  eyebrow = "Twenty years of WFM",
  closing = (
    <>
      Off-the-shelf meant compromise. Custom meant slow and expensive. So we built workarounds —
      until we built a real alternative.
    </>
  ),
  closingEmphasis = <>That&rsquo;s jalipi.</>,
  eras = ERAS,
}: {
  eyebrow?: string;
  closing?: ReactNode;
  closingEmphasis?: ReactNode;
  eras?: Era[];
} = {}) {
  const gradientId = useId().replace(/:/g, "");
  const lineGradientId = `deck-bespoke-line-${gradientId}`;
  const fillGradientId = `deck-bespoke-fill-${gradientId}`;
  const count = eras.length;
  const points = eras.map((era, index) => ({
    x: xFor(index, count),
    y: yFor(era.bespoke),
  }));
  const linePath = buildSmoothPath(points);
  const areaPath = `${linePath} L ${xFor(count - 1, count)} 100 L ${xFor(0, count)} 100 Z`;
  const columns = { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };

  return (
    <BespokeBrandedSlide className="bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="mx-auto w-full max-w-5xl">
        <div className="deck-rise text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            <History className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            The industry went vanilla.{" "}
            <span className="bg-gradient-to-r from-amber-400 via-slate-300 to-emerald-400 bg-clip-text text-transparent">
              Bespoke is back.
            </span>
          </h2>
        </div>

        <div className="deck-rise mt-8 overflow-x-auto pb-1" style={{ animationDelay: "0.2s" }}>
          <div className="mx-auto min-w-[640px] max-w-4xl">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/25 to-emerald-500/25 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                Bespokometre
              </span>
            </div>
            <div className="relative h-64">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id={lineGradientId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="45%" stopColor="#94a3b8" />
                    <stop offset="72%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {eras.map((era, index) => {
                  const x = xFor(index, count);
                  return (
                    <line
                      key={era.label}
                      x1={x}
                      y1={Y_TOP - 4}
                      x2={x}
                      y2={Y_TOP + Y_RANGE + 4}
                      stroke="#ffffff"
                      strokeOpacity="0.08"
                      strokeWidth="0.15"
                    />
                  );
                })}
                <path
                  className="deck-fade"
                  style={{ animationDelay: "0.3s" }}
                  d={areaPath}
                  fill={`url(#${fillGradientId})`}
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke={`url(#${lineGradientId})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="absolute inset-0 grid" style={columns}>
                {eras.map((era, index) => {
                  const popDelay = 0.5 + (index / (count - 1)) * 1.2;
                  const dotTop = `${yFor(era.bespoke)}%`;
                  return era.brand ? (
                    <div key={era.label} className="relative">
                      <div
                        className="deck-pop absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ top: dotTop, animationDelay: "1.75s" }}
                      >
                        <span className="relative flex h-4 w-4 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                          <span className="relative h-4 w-4 rounded-full border-2 border-neutral-900 bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={era.label} className="relative">
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ top: dotTop }}
                      >
                        <span
                          className="deck-pop block h-3.5 w-3.5 rounded-full border-2 border-neutral-900 shadow"
                          style={{ backgroundColor: era.dot, animationDelay: `${popDelay}s` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 grid" style={columns}>
              {eras.map((era) => (
                <div key={era.label} className="flex flex-col items-center px-1 text-center">
                  <span
                    className={cn(
                      "text-sm font-bold leading-tight",
                      era.brand ? "text-emerald-300" : "text-white/90",
                    )}
                  >
                    {era.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-white/40">
                    {era.year || "\u00A0"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          className="deck-rise mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-white/70"
          style={{ animationDelay: "0.4s" }}
        >
          {closing}
        </p>
        <p
          className="deck-rise mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-relaxed text-white/90"
          style={{ animationDelay: "0.55s" }}
        >
          {closingEmphasis}
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}
