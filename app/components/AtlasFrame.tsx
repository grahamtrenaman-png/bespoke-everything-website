export default function AtlasFrame() {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="frame-shimmer absolute inset-0" />
      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gold/60" />
          <div className="h-2 w-2 rounded-full bg-white/20" />
          <div className="h-2 w-2 rounded-full bg-white/20" />
          <div className="ml-auto h-2 w-16 rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2 rounded border border-white/5 bg-white/5 p-3">
            <div className="h-2 w-20 rounded bg-gold/40" />
            <div className="h-16 rounded bg-white/5" />
            <div className="flex gap-1">
              <div className="h-8 flex-1 rounded bg-gold/20" />
              <div className="h-8 flex-1 rounded bg-white/10" />
              <div className="h-8 flex-1 rounded bg-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-12 rounded border border-white/5 bg-white/5 p-2">
              <div className="h-1.5 w-8 rounded bg-white/20" />
              <div className="mt-2 h-4 w-full rounded bg-gold/30" />
            </div>
            <div className="h-12 rounded border border-white/5 bg-white/5 p-2">
              <div className="h-1.5 w-6 rounded bg-white/20" />
              <div className="mt-2 h-4 w-3/4 rounded bg-white/10" />
            </div>
            <div className="h-12 rounded border border-white/5 bg-white/5 p-2">
              <div className="h-1.5 w-10 rounded bg-white/20" />
              <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-2 flex-1 rounded bg-white/10" />
          <div className="h-2 flex-1 rounded bg-white/10" />
          <div className="h-2 flex-1 rounded bg-gold/20" />
          <div className="h-2 flex-1 rounded bg-white/10" />
          <div className="h-2 flex-1 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
