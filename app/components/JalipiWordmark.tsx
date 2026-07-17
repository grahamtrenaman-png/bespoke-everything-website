import type { CSSProperties } from "react";

export const JALIPI_INK = "#101d3f";
export const JALIPI_TEAL = "#14b8a6";

const GLYPHS = ["\u0237", "a", "l", "\u0131", "p", "\u0131"];
const DOTTED = new Set([0, 3, 5]);

type JalipiWordmarkProps = {
  color?: string;
  dotColor?: string;
  className?: string;
  style?: CSSProperties;
};

export default function JalipiWordmark({
  color = JALIPI_INK,
  dotColor = JALIPI_TEAL,
  className = "",
  style,
}: JalipiWordmarkProps) {
  return (
    <span
      role="img"
      aria-label="jalipi"
      className={`inline-flex select-none items-start pt-[0.06em] font-semibold leading-none tracking-[-0.01em] ${className}`}
      style={{ color, ...style }}
    >
      {GLYPHS.map((glyph, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-block"
        >
          {glyph}
          {DOTTED.has(i) ? (
            <span
              className="absolute left-1/2 top-[0.04em] h-[0.14em] w-[0.14em] -translate-x-1/2 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          ) : null}
        </span>
      ))}
    </span>
  );
}
