"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "@/lib/cn";

/** Author slides to this fixed 16:9 canvas; the stage scales them to the host. */
export const STAGE_WIDTH = 1280;
export const STAGE_HEIGHT = 720;

export type SlideStageMode = "contain" | "fitWidth";

type SlideStageProps = {
  children: ReactNode;
  /**
   * `contain` — letterbox to fit (desktop / mobile / Present).
   * `fitWidth` — scale to host width and scroll vertically (legacy; unused by decks).
   */
  mode?: SlideStageMode;
  /**
   * Legacy: previously rotated the canvas in a tall Present viewport.
   * Portrait Present stays upright; this no longer affects layout.
   */
  presenting?: boolean;
  /** Bumps when the slide changes so fitWidth browse can reset scroll. */
  slideKey?: string | number;
  className?: string;
};

type StageLayout = {
  scale: number;
  rotate: boolean;
  hostWidth: number;
  hostHeight: number;
};

/**
 * Fixed 16:9 slide host with contain or fit-width scaling.
 */
export function SlideStage({
  children,
  mode = "contain",
  presenting: _presenting = false,
  slideKey,
  className,
}: SlideStageProps) {
  const [layout, setLayout] = useState<StageLayout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const scrollHostRef = useRef<HTMLDivElement | null>(null);

  const measure = useCallback(
    (host: HTMLElement) => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;

      if (mode === "fitWidth") {
        const scale = width / STAGE_WIDTH;
        setLayout({ scale, rotate: false, hostWidth: width, hostHeight: height });
        return;
      }

      // Always upright contain — never rotate into landscape for tall phones.
      const scale = Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT);
      setLayout({ scale, rotate: false, hostWidth: width, hostHeight: height });
    },
    [mode],
  );

  const hostRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      scrollHostRef.current = node;
      if (!node) return;
      measure(node);
      const observer = new ResizeObserver(() => measure(node));
      observer.observe(node);
      observerRef.current = observer;
    },
    [measure],
  );

  useEffect(() => {
    if (mode !== "fitWidth") return;
    scrollHostRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [slideKey, mode]);

  if (mode === "fitWidth") {
    const scale = layout?.scale ?? 1;
    const scaledHeight = STAGE_HEIGHT * scale;
    return (
      <div
        ref={hostRef}
        data-deck-stage-scroll
        className={cn(
          "absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-y-contain",
          className,
        )}
      >
        <div
          className="relative w-full"
          style={{
            height: layout ? scaledHeight : "100%",
            visibility: layout == null ? "hidden" : "visible",
          }}
        >
          <div
            className="relative shrink-0 origin-top-left"
            style={{
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={cn("absolute inset-0 flex items-center justify-center overflow-hidden", className)}
    >
      <div
        className="relative shrink-0 origin-center transition-transform duration-300"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `rotate(${layout?.rotate ? 90 : 0}deg) scale(${layout?.scale ?? 1})`,
          visibility: layout == null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export type FullscreenMode = "native" | "fallback";

type DocumentWithWebkit = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type ElementWithWebkit = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type OrientationWithLock = ScreenOrientation & {
  lock?: (orientation: string) => Promise<void>;
  unlock?: () => void;
};

export function getNativeFullscreenElement(): Element | null {
  if (typeof document === "undefined") return null;
  const doc = document as DocumentWithWebkit;
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export async function enterNativeFullscreen(el: HTMLElement): Promise<boolean> {
  const target = el as ElementWithWebkit;
  try {
    if (target.requestFullscreen) {
      await target.requestFullscreen();
      return Boolean(getNativeFullscreenElement());
    }
    if (target.webkitRequestFullscreen) {
      await target.webkitRequestFullscreen();
      return Boolean(getNativeFullscreenElement());
    }
  } catch {
    // Permission denied or unsupported.
  }
  return false;
}

export async function leaveNativeFullscreen(): Promise<void> {
  const doc = document as DocumentWithWebkit;
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      return;
    }
    if (doc.webkitFullscreenElement && doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
    }
  } catch {
    // ignore
  }
}

/** Best-effort landscape lock (Android Chrome in native fullscreen). */
export async function lockLandscape(): Promise<void> {
  if (typeof screen === "undefined") return;
  const orientation = screen.orientation as OrientationWithLock | undefined;
  try {
    await orientation?.lock?.("landscape");
  } catch {
    // Unsupported or not permitted.
  }
}

export function unlockOrientation(): void {
  if (typeof screen === "undefined") return;
  const orientation = screen.orientation as OrientationWithLock | undefined;
  try {
    orientation?.unlock?.();
  } catch {
    // ignore
  }
}

/** Outer frame style that turns a portrait Present viewport into landscape (legacy). */
export function portraitPresentFrameStyle(enabled: boolean): CSSProperties | undefined {
  if (!enabled) return undefined;
  return {
    width: "100dvh",
    height: "100dvw",
    transformOrigin: "top left",
    transform: "translateX(100dvw) rotate(90deg)",
  };
}

/** Stage mode — always contain so the full 16:9 slide fits the host. */
export function resolveDeckStageMode(_input: {
  isPresenting: boolean;
  isPortrait: boolean;
  isNarrow: boolean;
}): SlideStageMode {
  return "contain";
}

/**
 * Narrow portrait → compact chrome + full-bleed host.
 * Stage always uses upright contain (no landscape rotate).
 */
export function useDeckBrowseLayout(isPresenting: boolean) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const portraitQuery = window.matchMedia("(orientation: portrait)");
    const narrowQuery = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setIsPortrait(portraitQuery.matches);
      setIsNarrow(narrowQuery.matches);
    };
    update();
    portraitQuery.addEventListener("change", update);
    narrowQuery.addEventListener("change", update);
    return () => {
      portraitQuery.removeEventListener("change", update);
      narrowQuery.removeEventListener("change", update);
    };
  }, []);

  const stageMode = resolveDeckStageMode({ isPresenting, isPortrait, isNarrow });
  const isCompactBrowse = isPortrait && isNarrow;
  const rotateForPortrait = false;

  return {
    isPortrait,
    isNarrow,
    isCompactBrowse,
    stageMode,
    rotateForPortrait,
    stageFrameStyle: undefined as CSSProperties | undefined,
  };
}

const SWIPE_THRESHOLD_PX = 50;

function isSwipeBlockedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest("[data-deck-modal], [data-deck-no-swipe]")) return true;
  let node: Element | null = target;
  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        node.scrollHeight > node.clientHeight + 1
      ) {
        // Allow horizontal swipe only when the gesture isn't starting in a
        // nested scroller that isn't the stage itself.
        if (!node.hasAttribute("data-deck-stage-scroll")) return true;
      }
    }
    node = node.parentElement;
  }
  return false;
}

/** Horizontal swipe → prev/next. Skips when a modal or nested scroller owns the gesture. */
export function useDeckSwipeNavigation(
  containerRef: RefObject<HTMLElement | null>,
  options: {
    enabled?: boolean;
    onNext: () => void;
    onPrev: () => void;
  },
) {
  const { enabled = true, onNext, onPrev } = options;
  const startRef = useRef<{ x: number; y: number; blocked: boolean } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      startRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        blocked: isSwipeBlockedTarget(event.target),
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = startRef.current;
      startRef.current = null;
      if (!start || start.blocked) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(dx) < Math.abs(dy)) return; // vertical scroll / browse
      if (dx < 0) onNext();
      else onPrev();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerRef, enabled, onNext, onPrev]);
}

/** Safe-area padding classes for deck chrome on notched phones. */
export const DECK_CHROME_SAFE_TOP =
  "pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))]";
export const DECK_CHROME_SAFE_BOTTOM =
  "pb-[max(1rem,env(safe-area-inset-bottom))] px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]";
