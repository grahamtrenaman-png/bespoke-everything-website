export const BESPOKE_GOLD = "#c5a059";

function BespokeMark({ ink, gold }: { ink: string; gold: string }) {
  const unit = 10;
  const gap = 4;
  const barW = 22;
  const r = 2.5;
  const rowYs = [0, unit + gap, 2 * (unit + gap)];
  const barX = 2 * (unit + gap);

  return (
    <svg
      viewBox={`0 0 ${barX + barW} ${2 * (unit + gap) + unit}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-[1.15em] w-auto"
      aria-hidden="true"
    >
      {rowYs.map((y) => (
        <g key={y}>
          <rect x={0} y={y} width={unit} height={unit} rx={r} fill={ink} />
          <rect
            x={unit + gap}
            y={y}
            width={unit}
            height={unit}
            rx={r}
            fill={ink}
          />
          <rect x={barX} y={y} width={barW} height={unit} rx={r} fill={gold} />
        </g>
      ))}
    </svg>
  );
}

type BespokeEverythingLogoProps = {
  variant?: "light" | "dark";
  showMark?: boolean;
  showWordmark?: boolean;
  showTagline?: boolean;
  layout?: "stacked" | "inline";
  className?: string;
};

export default function BespokeEverythingLogo({
  variant = "light",
  showMark = true,
  showWordmark = true,
  showTagline = true,
  layout = "stacked",
  className = "",
}: BespokeEverythingLogoProps) {
  const ink = variant === "dark" ? "#ffffff" : "#111111";
  const inline = layout === "inline";

  return (
    <span
      role="img"
      aria-label="Bespoke Everything"
      className={`inline-flex leading-none ${inline ? "flex-row items-center gap-[0.5em] text-left" : "flex-col items-center gap-[0.55em] text-center"} ${className}`}
    >
      {showMark ? <BespokeMark ink={ink} gold={BESPOKE_GOLD} /> : null}
      {showWordmark ? (
        <span
          className="text-[1em] font-bold tracking-[0.22em]"
          style={{ color: ink }}
        >
          BESPOKE EVERYTHING
        </span>
      ) : null}
      {showTagline ? (
        <span
          className="text-[0.42em] font-normal tracking-[0.28em]"
          style={{ color: BESPOKE_GOLD }}
        >
          SOFTWARE&nbsp;&nbsp;•&nbsp;&nbsp;SERVICES&nbsp;&nbsp;•&nbsp;&nbsp;SOLUTIONS
        </span>
      ) : null}
    </span>
  );
}
