export default function ModularBlocks() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2">
        <div className="col-span-2 row-span-2 rounded-sm bg-black" />
        <div className="col-span-1 row-span-1 rounded-sm bg-gold/80" />
        <div className="col-span-1 row-span-2 rounded-sm border border-gold/30 bg-transparent" />
        <div className="col-span-1 row-span-1 rounded-sm bg-black/10" />
        <div className="col-span-2 row-span-1 rounded-sm bg-gold/40" />
        <div className="col-span-1 row-span-1 rounded-sm border border-black/10 bg-white" />
        <div className="col-span-2 row-span-1 rounded-sm bg-black/5" />
        <div className="col-span-1 row-span-1 rounded-sm bg-gold/60" />
        <div className="col-span-1 row-span-1 rounded-sm border border-gold/20 bg-transparent" />
      </div>
      <div className="absolute -right-4 -bottom-4 h-16 w-16 border border-gold/20" />
      <div className="absolute -top-3 -left-3 h-8 w-8 bg-gold/20" />
    </div>
  );
}
