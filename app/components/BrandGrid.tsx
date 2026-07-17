export default function BrandGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`brand-grid pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
