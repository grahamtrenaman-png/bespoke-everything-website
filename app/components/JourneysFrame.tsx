export default function JourneysFrame() {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-black/8 bg-white p-4"
      aria-hidden="true"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-2 w-24 rounded bg-gold/50" />
          <div className="h-2 w-8 rounded bg-black/10" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-[4/3] rounded border border-black/5 bg-off-white p-2">
            <div className="h-full rounded bg-gold/15" />
          </div>
          <div className="aspect-[4/3] rounded border border-black/5 bg-off-white p-2">
            <div className="h-full rounded bg-black/8" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-black/8" />
          <div className="h-2 w-4/5 rounded bg-black/5" />
          <div className="h-2 w-3/5 rounded bg-black/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded bg-gold/30" />
          <div className="h-6 w-16 rounded border border-black/10" />
        </div>
      </div>
    </div>
  );
}
