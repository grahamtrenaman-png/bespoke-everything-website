import { cn } from "@/lib/cn";

/** Signature accent used for the three dots. Mirrors the jalipi app's brand constant. */
export const JALIPI_TEAL = "#14b8a6";

/**
 * The wordmark is drawn with dotless stems (ȷ / ı) so the three teal accent
 * dots can float above j, l and i exactly like the brand lockup, instead of
 * fighting the font's own tittles. Ported from the jalipi app so the jalipi
 * deck can render here without the app.
 */
const GLYPHS = ["\u0237", "a", "l", "\u0131", "p", "\u0131"] as const; // ȷalıpı
const DOTTED = new Set([0, 3, 5]); // j, i, i

/**
 * Scalable, recolourable jalipi wordmark. Size it with a font-size utility
 * (e.g. `text-4xl`) and colour the letters with a text-colour utility.
 * Requires the `--font-brand` variable set in the root layout.
 */
export function JalipiWordmark({
  className,
  dotColor = JALIPI_TEAL,
}: {
  className?: string;
  dotColor?: string;
}) {
  return (
    <span
      role="img"
      aria-label="jalipi"
      className={cn(
        "inline-flex select-none items-start font-semibold tracking-[-0.01em]",
        className,
        // Must win over text-2xl / text-3xl line-heights, or the dots float in empty space above the glyphs.
        "leading-none",
      )}
      style={{ fontFamily: "var(--font-brand)" }}
    >
      {GLYPHS.map((glyph, index) => (
        <span key={index} aria-hidden className="relative inline-block">
          {glyph}
          {DOTTED.has(index) ? (
            <span
              className="absolute rounded-full"
              style={{
                backgroundColor: dotColor,
                width: "0.13em",
                height: "0.13em",
                left: "50%",
                top: "0.15em",
                transform: "translateX(-50%)",
              }}
            />
          ) : null}
        </span>
      ))}
    </span>
  );
}
