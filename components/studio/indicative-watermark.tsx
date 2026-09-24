export function IndicativeWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      <div className="w-[120%] -rotate-12 border-y-2 border-amber-200/40 bg-neutral-950/35 py-5 text-center shadow-[0_0_80px_rgba(0,0,0,0.25)]">
        <p className="text-[4.5rem] font-black uppercase leading-none tracking-[0.22em] text-amber-200/80">
          Indicative
        </p>
        <p className="mt-2 text-[15px] font-semibold uppercase tracking-[0.14em] text-white/80">
          Not calculated. Discuss with finance before planning against these figures.
        </p>
      </div>
    </div>
  );
}
