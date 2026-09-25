export function IndicativeWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      <div className="w-[110%] -rotate-12 border-y border-amber-200/15 bg-neutral-950/12 py-3 text-center">
        <p className="text-[3rem] font-bold uppercase leading-none tracking-[0.2em] text-amber-200/45">
          Indicative
        </p>
        <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white/40">
          Not calculated. Discuss with finance before planning against these figures.
        </p>
      </div>
    </div>
  );
}
