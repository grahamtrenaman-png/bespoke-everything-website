"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Blocks,
  ChevronLeft,
  ChevronRight,
  Download,
  Handshake,
  Maximize2,
  Megaphone,
  Minimize2,
  Radar,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { IndicativeWatermark } from "@/components/studio/indicative-watermark";

import {
  DECK_CHROME_SAFE_BOTTOM,
  DECK_CHROME_SAFE_TOP,
  enterNativeFullscreen,
  getNativeFullscreenElement,
  leaveNativeFullscreen,
  SlideStage,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  unlockOrientation,
  useDeckBrowseLayout,
  useDeckSwipeNavigation,
  type FullscreenMode,
} from "@/components/studio/slide-stage";
import { BespokeBrandedSlide } from "@/components/studio/slide-chrome";
import { cn } from "@/lib/cn";

export type DeckSlide = {
  id: string;
  section: string;
  gradient: string;
  node: ReactNode;
};

export function Glows() {
  return (
    <>
      <div className="deck-drift pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-teal-600/15 blur-3xl" />
      <div
        className="deck-drift pointer-events-none absolute -right-40 bottom-1/5 h-[32rem] w-[32rem] rounded-full bg-amber-600/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
    </>
  );
}

export function SlideHeading({
  kicker,
  title,
  highlight,
  lede,
}: {
  kicker: string;
  title: string;
  highlight: string;
  lede?: string;
}) {
  return (
    <div className="deck-rise text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">{kicker}</p>
      <h2 className="mt-1.5 text-[2rem] font-black leading-tight tracking-tight">
        {title}{" "}
        <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
      {lede ? (
        <p className="mx-auto mt-2 max-w-3xl text-[12px] leading-relaxed text-white/65">{lede}</p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. Who runs it
// ---------------------------------------------------------------------------

type Seat = {
  icon: LucideIcon;
  seat: string;
  who: string;
  status: string;
  tone: "filled" | "proposed" | "open";
  body: string;
  measure: string;
};

const SEATS: Seat[] = [
  {
    icon: Wrench,
    seat: "Build",
    who: "Graham",
    status: "From mid January",
    tone: "filled",
    body:
      "Scopes the gap, prices it, and builds the first job himself. Owns the pattern on each platform until it is proven enough to hand to a skilled builder.",
    measure: "Two builds live by the end of Q1.",
  },
  {
    icon: Handshake,
    seat: "Vendors and accounts",
    who: "Doug",
    status: "Proposed · available January",
    tone: "proposed",
    body:
      "The vendor and account seat. Account managers refer a stuck deal to a person they trust, and Doug is that person. Available from January. The FXP timing missed, so he is free, and he wants this.",
    measure: "The person the account teams already call.",
  },
  {
    icon: Radar,
    seat: "Third seat",
    who: "Open",
    status: "Held open",
    tone: "open",
    body:
      "Held for a seller, or a production engineer, whichever the work shows we need first. A seller at the level we would want joins when the margin pays commission, or sooner if the network runs short.",
    measure: "Decided on the numbers by mid-year.",
  },
];

const SEAT_TONE: Record<Seat["tone"], { card: string; pill: string }> = {
  filled: {
    card: "border-teal-400/25 bg-teal-500/10",
    pill: "border-teal-400/40 bg-teal-500/20 text-teal-100",
  },
  proposed: {
    card: "border-amber-400/25 bg-amber-500/10",
    pill: "border-amber-400/40 bg-amber-500/20 text-amber-100",
  },
  open: {
    card: "border-white/10 bg-white/5",
    pill: "border-white/20 bg-white/10 text-white/70",
  },
};

function TeamSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto w-full max-w-5xl">
        <SlideHeading
          kicker="Who runs it"
          title="Two operating founders."
          highlight="One seat held open."
          lede="Chris and Thomas fund it and open the doors. No hunter on day one: the pipeline is warm. The sales seat is decided on the work. Full role by role detail, including TCN’s part, is in the roles deck."
        />
        <div className="relative mt-5 grid gap-6 grid-cols-3">
          <span className="pointer-events-none absolute left-[16%] right-[16%] top-[2.6rem] h-px bg-gradient-to-r from-teal-400/60 via-amber-400/50 to-white/20" />
          {SEATS.map((seat, index) => {
            const Icon = seat.icon;
            const tone = SEAT_TONE[seat.tone];
            const open = seat.tone === "open";
            return (
              <div
                key={seat.seat}
                className="deck-rise flex flex-col items-center text-center"
                style={{ animationDelay: `${0.15 + index * 0.12}s` }}
              >
                <div
                  className={cn(
                    "relative z-10 flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full ring-8 ring-neutral-950",
                    seat.tone === "filled" && "bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-2xl deck-loop-glow",
                    seat.tone === "proposed" && "bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-2xl",
                    open && "border-2 border-dashed border-white/30 bg-white/[0.03] text-white/50",
                  )}
                >
                  {open ? (
                    <span className="text-3xl font-black leading-none">?</span>
                  ) : (
                    <Icon className="h-7 w-7" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]",
                    tone.pill,
                  )}
                >
                  {seat.status}
                </span>
                <p className="mt-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  {seat.seat}
                </p>
                <h3 className="text-[22px] font-black leading-tight tracking-tight">{seat.who}</h3>
                <p className="mt-2 max-w-[19rem] text-[11px] leading-relaxed text-white/70">{seat.body}</p>
                <p className="mt-2 text-[11px] font-semibold leading-snug text-teal-200/90">{seat.measure}</p>
              </div>
            );
          })}
        </div>
        <div
          className="deck-rise mt-3.5 grid gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 grid-cols-[1fr_1fr]"
          style={{ animationDelay: "0.5s" }}
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
              What replaces a hunter in year one
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">
              Research runs overnight: who moved into which role, which programmes are in trouble. Doug
              sends the note, and only to someone who already knows him. Nothing goes out cold.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">The sales question</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">
              Managing partners and creating a market are different jobs. Doug’s seat is the first. The third
              seat is where a seller goes: once support covers a salary, or sooner if the network is under two
              builds by end of Q2.
            </p>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 5. New business
// ---------------------------------------------------------------------------

const CHANNELS: {
  icon: LucideIcon;
  title: string;
  share: string;
  bar: string;
  body: string;
  proof: string;
}[] = [
  {
    icon: Handshake,
    title: "The network",
    share: "Most of year one",
    bar: "from-teal-500 to-teal-400",
    body:
      "TCN network opportunities and project gaps across TCN companies. Chris’s Dayforce and UKG relationships. REPL alumni now running operations and HR technology at retailers and manufacturers. Every one of them has a list.",
    proof: "Warm. Priced per gap. Closes in weeks, not procurement cycles.",
  },
  {
    icon: Blocks,
    title: "The vendors",
    share: "Builds through year one",
    bar: "from-emerald-500 to-emerald-400",
    body:
      "Listed on the Dayforce partner programme, on the UKG Technology Marketplace, inside LogileONE through FXP, a RELEX solution-extension partner. A vendor account team with a gap in a deal refers it rather than losing the deal.",
    proof: "Slow to earn, then compounding. The vendor sells for us.",
  },
  {
    icon: Megaphone,
    title: "Direct",
    share: "From Q2",
    bar: "from-amber-500 to-amber-300",
    body:
      "One named offer per platform, backed by two case studies and a demonstrator app. Doug and Graham sell it with Chris in the room. No cold outbound: every note goes to someone who already knows the sender.",
    proof: "Demonstrators beat slideware. Every meeting starts with a working app.",
  },
];

function NewBusinessSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto w-full max-w-5xl">
        <SlideHeading
          kicker="How the work arrives"
          title="Three channels,"
          highlight="in the order they pay."
        />
        <div className="mt-4 grid gap-5 grid-cols-3">
          {CHANNELS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="deck-rise relative min-w-0"
                style={{ animationDelay: `${0.3 + index * 0.12}s` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg", item.bar)}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-black leading-tight tracking-tight">{item.title}</h3>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-amber-200/80">{item.share}</p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-white/72">{item.body}</p>
                <p className="mt-1.5 text-[10.5px] font-semibold leading-snug text-teal-200/90">{item.proof}</p>
              </div>
            );
          })}
        </div>
        <div
          className="deck-rise mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/[0.07] px-5 py-3"
          style={{ animationDelay: "0.55s" }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-100/80">
            How the year pays for itself · worked at the middle of the range
          </p>
          <div className="mt-2 grid gap-3 grid-cols-3">
            <div>
              <p className="text-[13px] font-black tracking-tight">What goes out</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/75">
                The studio spends nothing before January. Those months are the prep: the platforms, the
                first job, and how the studio plugs into TCN. From January, two people. Then a small
                number of skilled builders, UK or South Africa, and only once there is pipeline.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-black tracking-tight">What comes in</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/75">
                At £80k, the middle of the £40–120k range: two builds in the first half is about £160k
                invoiced. Four across the year is about £320k of build fees, before support.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-black tracking-tight">Where the overdraft sits</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/75">
                Support at 20% starts the quarter after go-live. Cash goes out ahead of that, so the
                draw peaks in the first half and the plan has it falling by Q4.
              </p>
            </div>
          </div>
        </div>
        <div
          className="deck-rise mt-3 grid gap-3 border-t border-white/10 pt-3 grid-cols-[1.1fr_1fr_1fr]"
          style={{ animationDelay: "0.7s" }}
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">How we price</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">
              Fixed-scope build, £40k to £120k by size. Annual support at 20 to 25% of the build. Licensed
              apps per tenant per year where a platform allows it. Illustrative, not a rate card.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">What good looks like</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">
              Two builds live by end of Q1. Four concurrent by Q3. A support base that covers a builder&rsquo;s
              salary by Q4. Case studies with named customers.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">What we say no to</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">
              Body-shopping. Implementation work that belongs to FXP. Building a product of our own. Anything
              a customer could configure themselves in an afternoon.
            </p>
          </div>
        </div>
      </div>
      <IndicativeWatermark />
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 6. Timeline
// ---------------------------------------------------------------------------

type Phase = {
  label: string;
  window: string;
  tone: "notice" | "year";
  items: string[];
  measure: string;
};

const NOTICE: Phase[] = [
  {
    label: "The studio",
    window: "Mid Oct → mid Jan",
    tone: "notice",
    items: [
      "Which platforms we build on, the partner routes, and what we host ourselves.",
      "One job scoped and priced, ready to sign in January. The company set up.",
    ],
    measure: "Ready to start in January.",
  },
  {
    label: "With Chris",
    window: "From the 29th",
    tone: "notice",
    items: [
      "The model: cash, headcount, when revenue lands. The builder profile and a first shortlist. Doug’s seat, and the sales seat.",
      "Graham may be working his notice. Applications, builds, proposals and customer meetings wait until we start.",
    ],
    measure: "Numbers Chris and Thomas can poke at before day one.",
  },
  {
    label: "jalipi",
    window: "In the same window",
    tone: "notice",
    items: [
      "Handed to QuickThink Cloud. Their developer hardens it. Graham keeps a stake. From January it is one more platform we extend.",
    ],
    measure: "Written down. Not the work of these months.",
  },
];

const YEAR: Phase[] = [
  {
    label: "Q1",
    window: "Jan → Mar",
    tone: "year",
    items: [
      "The one job lined up before we start, built by Graham. A second sold in January off the network.",
      "Partner applications filed on Dayforce, UKG and RELEX.",
      "Contract, support and pricing templates settled with TCN shared ops.",
    ],
    measure: "Two builds live by the end of Q1. First support line signed.",
  },
  {
    label: "Q2",
    window: "Apr → Jun",
    tone: "year",
    items: [
      "Direct channel opens with two case studies. The third seat is still open.",
      "First vendor-referred job. First Logile or Legion build live through an FXP account.",
      "First skilled builder hired, UK or South Africa, once there is pipeline behind the first job. Not on a forecast.",
    ],
    measure: "Four builds live. One vendor referral closed.",
  },
  {
    label: "Q3",
    window: "Jul → Sep",
    tone: "year",
    items: [
      "Four jobs running at once. A second skilled builder, once the support line can carry them.",
      "RELEX pilot with a Val-introduced customer.",
      "First pattern reused on a second customer without a rebuild.",
    ],
    measure: "Support base covers a builder’s salary.",
  },
  {
    label: "Q4",
    window: "Oct → Dec",
    tone: "year",
    items: [
      "Studio at four or five people. Recurring support and licensed apps on the books.",
      "Year two takes shape: the next platform, whether the margin pays for a senior seller, where the overdraft sits.",
      "Every first-year customer referenceable.",
    ],
    measure: "Overdraft drawdown falling, not rising.",
  },
];

function PhaseTrack({
  phases,
  heading,
  tone,
  delay,
}: {
  phases: Phase[];
  heading: string;
  tone: "notice" | "year";
  delay: number;
}) {
  const notice = tone === "notice";
  return (
    <div>
      <div className="flex items-center gap-3">
        <p
          className={cn(
            "shrink-0 text-[10px] font-black uppercase tracking-[0.2em]",
            notice ? "text-amber-200/80" : "text-teal-200/80",
          )}
        >
          {heading}
        </p>
        <span
          className={cn(
            "h-px flex-1 bg-gradient-to-r",
            notice ? "from-amber-400/60 to-amber-400/10" : "from-teal-400/60 to-teal-400/10",
          )}
        />
      </div>
      <div
        className="relative mt-2.5 grid gap-4"
        style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
      >
        <span
          className={cn(
            "pointer-events-none absolute left-0 right-0 top-[5px] h-px",
            notice ? "bg-amber-400/40" : "bg-teal-400/40",
          )}
        />
        {phases.map((phase, index) => (
          <div
            key={phase.label}
            className="deck-rise relative min-w-0"
            style={{ animationDelay: `${delay + index * 0.08}s` }}
          >
            <span
              className={cn(
                "absolute left-0 top-0 h-[11px] w-[11px] rounded-full ring-4 ring-neutral-950",
                notice ? "bg-amber-300" : "bg-teal-300",
              )}
            />
            <div className="pt-4">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/45">
                {phase.window}
              </p>
              <h3 className="text-[13.5px] font-black tracking-tight text-white">{phase.label}</h3>
              <ul className="mt-1.5 space-y-1">
                {phase.items.map((item) => (
                  <li key={item} className="text-[10.5px] leading-snug text-white/72">
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className={cn(
                  "mt-2 text-[10.5px] font-semibold leading-snug",
                  notice ? "text-amber-100" : "text-teal-100",
                )}
              >
                → {phase.measure}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto w-full max-w-5xl">
        <SlideHeading
          kicker="The plan"
          title="Before we start,"
          highlight="the studio, lined up."
        />
        <div className="mt-4 space-y-4">
          <PhaseTrack
            phases={NOTICE}
            heading="Before we start · mid October to mid January"
            tone="notice"
            delay={0.15}
          />
          <PhaseTrack
            phases={YEAR}
            heading="Year one · from mid January · full time"
            tone="year"
            delay={0.45}
          />
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// Slide assembly + deck shell
// ---------------------------------------------------------------------------

function deriveSections(slides: DeckSlide[]) {
  const sections: { label: string; start: number }[] = [];
  slides.forEach((slide, index) => {
    if (sections.length === 0 || sections[sections.length - 1]!.label !== slide.section) {
      sections.push({ label: slide.section, start: index });
    }
  });
  return sections;
}

function CallIdeaSlide() {
  const beats = [
    ["01", "Every project has a gap the product will not close. Until now the answer was a workaround, or a compromise the customer learned to live with."],
    ["02", "The platforms have opened up. We build the missing piece inside the system they already run, in weeks, for a fixed price."],
    ["03", "The project unblocks. The customer gets exactly what they asked for."],
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-[1.05fr_1fr] items-center gap-14">
        <div className="deck-rise">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
            For Chris
          </p>
          <h2 className="mt-4 text-[3.2rem] font-black leading-[0.98] tracking-tight">
            The customer
            <br />
            stops
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              compromising.
            </span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
            We solve the problem the software would not. The project moves, and the customer gets what
            they actually wanted.
          </p>
        </div>
        <div className="deck-rise" style={{ animationDelay: "0.2s" }}>
          <ul className="space-y-5">
            {beats.map(([n, line]) => (
              <li key={n} className="flex items-baseline gap-4">
                <span className="text-[13px] font-black tabular-nums text-teal-300/80">{n}</span>
                <span className="text-[17px] font-semibold leading-snug tracking-tight text-white/90">{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-white/10 pt-5 text-[14px] leading-relaxed text-white/60">
            Not a bench. Not a product company. A studio that solves the problem, unblocks the project,
            and gives the customer exactly what they wanted.
          </p>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

const CALL_GROUPS: { kicker: string; names: string[]; line: string; tone: string }[] = [
  {
    kicker: "Inside the product",
    names: ["Dayforce", "jalipi"],
    line: "The app is a page in what they already pay for. jalipi is QuickThink Cloud’s platform, extended for each engagement.",
    tone: "text-teal-200",
  },
  {
    kicker: "Beside it, where FXP is",
    names: ["UKG", "Logile", "Legion"],
    line: "No studio. We host the build. The support line is what keeps it alive.",
    tone: "text-emerald-200",
  },
  {
    kicker: "Later",
    names: ["RELEX", "Workday", "SAP · Oracle · ADP"],
    line: "RELEX as it opens, on a line agreed with Inference Group. Workday is HR first, outside our niche, and waits for a project. The others only when one asks.",
    tone: "text-amber-200",
  },
  {
    kicker: "From scratch",
    names: ["Spreadsheet", "App", "New solution"],
    line: "When nothing they already run will carry it. We build the thing itself: a working spreadsheet, a focused app, or a solution that stands alone.",
    tone: "text-sky-200",
  },
];

type CallWave = "First" | "Second" | "With FXP" | "When pulled" | "With QTC" | "Any platform";

const CALL_CARD_TONE: Record<CallWave, { card: string; pill: string; label: string; bar: string }> = {
  First: {
    card: "border-teal-400/25 bg-teal-500/[0.08]",
    pill: "border-teal-400/40 bg-teal-500/20 text-teal-100",
    label: "text-teal-200/80",
    bar: "from-teal-400 to-emerald-400",
  },
  "With FXP": {
    card: "border-emerald-400/25 bg-emerald-500/[0.07]",
    pill: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
    label: "text-emerald-200/80",
    bar: "from-emerald-400 to-teal-300",
  },
  Second: {
    card: "border-amber-400/25 bg-amber-500/[0.07]",
    pill: "border-amber-400/40 bg-amber-500/20 text-amber-100",
    label: "text-amber-200/80",
    bar: "from-amber-400 to-orange-300",
  },
  "When pulled": {
    card: "border-white/10 bg-white/[0.04]",
    pill: "border-white/20 bg-white/10 text-white/70",
    label: "text-white/50",
    bar: "from-white/40 to-white/10",
  },
  "With QTC": {
    card: "border-sky-400/25 bg-sky-500/[0.07]",
    pill: "border-sky-400/40 bg-sky-500/15 text-sky-100",
    label: "text-sky-200/80",
    bar: "from-sky-400 to-cyan-300",
  },
  "Any platform": {
    card: "border-fuchsia-400/25 bg-fuchsia-500/[0.06]",
    pill: "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100",
    label: "text-fuchsia-200/80",
    bar: "from-fuchsia-400 to-violet-300",
  },
};

type CallVendor = {
  vendor: string;
  wave: CallWave;
  shape: string;
  extend: string;
  door: string;
  first: string;
};

const CALL_VENDORS: CallVendor[] = [
  {
    vendor: "Dayforce",
    wave: "First",
    shape: "Inside the product",
    extend: "Dayforce Studio. Pages, workflows and logic inside the product.",
    door: "Chris. Partner programme from January.",
    first: "A gap off a live Dayforce project, in a real tenant.",
  },
  {
    vendor: "UKG Pro WFM",
    wave: "First",
    shape: "Beside the product",
    extend: "Developer Hub APIs and webhooks. No studio, so we host the app.",
    door: "Chris, and FrontlineXP’s live UKG projects.",
    first: "A named gap, fixed price. Sick pay is the shape of it.",
  },
  {
    vendor: "Logile",
    wave: "With FXP",
    shape: "Beside the product",
    extend: "REST API, sandboxes, an event framework. The app sits beside it.",
    door: "FrontlineXP, already a LogileONE partner.",
    first: "One gap off a project they are already on.",
  },
  {
    vendor: "Legion",
    wave: "With FXP",
    shape: "Beside the product",
    extend: "APIs, webhooks and the Integration Center. Extended from outside.",
    door: "FrontlineXP’s live Legion work.",
    first: "A feed, a rule, or a screen Legion will not grow.",
  },
  {
    vendor: "RELEX",
    wave: "Second",
    shape: "Opening up",
    extend: "RELEX Open: plugins for screens and logic. Still in pilot.",
    door: "Inference Group first, then Val through Chris. They may see AI for RELEX customers as theirs.",
    first: "A pilot extension, on a line Inference Group agree.",
  },
  {
    vendor: "Workday",
    wave: "When pulled",
    shape: "Inside the product · HR first",
    extend: "Extend on one tenant. Built on Workday licenses one app to many.",
    door: "No warm door today. HR first; our niche is WFM.",
    first: "A proposal when a named project asks.",
  },
  {
    vendor: "SAP · Oracle",
    wave: "When pulled",
    shape: "Mature, crowded",
    extend: "Side-by-side apps on SAP BTP. Redwood pages inside Oracle.",
    door: "A named client already on the suite.",
    first: "A proposal when a project asks. No cold entry.",
  },
  {
    vendor: "ADP",
    wave: "When pulled",
    shape: "Integrations only",
    extend: "API Central and the Marketplace. Feeds in and out, no screens.",
    door: "Payroll gaps on jobs we already have.",
    first: "The payroll feed that has to move before anything else.",
  },
  {
    vendor: "jalipi",
    wave: "With QTC",
    shape: "Partner platform",
    extend: "A platform QuickThink Cloud develop and harden. Graham keeps a stake.",
    door: "QTC. They bring the customer. We build the extension and invoice the customer.",
    first: "A bespoke extension on each engagement, delivered by us.",
  },
];

const CALL_AGNOSTIC: CallVendor = {
  vendor: "No platform",
  wave: "Any platform",
  shape: "Vendor agnostic",
  extend:
    "Problems that are not system problems. A manager’s spreadsheet, a small app, a new solution nobody sells yet, or plain consulting.",
  door: "Every project has some. Chris, FXP and the network see them first.",
  first: "Fixed price, like everything else. Often the quickest job we do.",
};

function CallAgnosticStrip({ delay }: { delay: number }) {
  const tone = CALL_CARD_TONE[CALL_AGNOSTIC.wave];
  const rows: [string, string][] = [
    ["What", CALL_AGNOSTIC.extend],
    ["Door", CALL_AGNOSTIC.door],
    ["First", CALL_AGNOSTIC.first],
  ];
  return (
    <div
      className={cn(
        "deck-rise relative grid grid-cols-[14.5rem_2fr_1fr_1fr] items-start gap-4 overflow-hidden rounded-2xl border px-3 py-2.5",
        tone.card,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[14px] font-black leading-tight tracking-tight">{CALL_AGNOSTIC.vendor}</h3>
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.15em] text-white/45">
            {CALL_AGNOSTIC.shape}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em]",
            tone.pill,
          )}
        >
          {CALL_AGNOSTIC.wave}
        </span>
      </div>
      {rows.map(([label, body]) => (
        <p key={label} className="text-[10px] leading-[1.3] text-white/78">
          <span className={cn("mr-1.5 text-[8px] font-black uppercase tracking-[0.18em]", tone.label)}>{label}</span>
          {body}
        </p>
      ))}
    </div>
  );
}

function CallVendorCard({ vendor, delay }: { vendor: CallVendor; delay: number }) {
  const tone = CALL_CARD_TONE[vendor.wave];
  const rows: [string, string][] = [
    ["Extend", vendor.extend],
    ["Door", vendor.door],
    ["First", vendor.first],
  ];
  return (
    <div
      className={cn("deck-rise relative min-w-0 overflow-hidden rounded-2xl border p-3", tone.card)}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[14px] font-black leading-tight tracking-tight">{vendor.vendor}</h3>
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/45">{vendor.shape}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em]",
            tone.pill,
          )}
        >
          {vendor.wave}
        </span>
      </div>
      <dl className="mt-1.5 space-y-0.5">
        {rows.map(([label, body]) => (
          <div key={label} className="grid grid-cols-[2.7rem_1fr] gap-2">
            <dt className={cn("pt-[1px] text-[8px] font-black uppercase tracking-[0.18em]", tone.label)}>
              {label}
            </dt>
            <dd className="text-[10px] leading-[1.3] text-white/78">{body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CallVendorsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-1 w-full max-w-6xl">
        <SlideHeading
          kicker="Each vendor · proposed"
          title="How they extend."
          highlight="How we show up."
          lede="Who opens the door, and what the first job looks like. Everything starts once we have started."
        />
        <div className="mt-3 grid grid-cols-3 gap-3">
          {CALL_VENDORS.map((vendor, index) => (
            <CallVendorCard key={vendor.vendor} vendor={vendor} delay={0.12 + index * 0.05} />
          ))}
        </div>
        <div className="mt-3">
          <CallAgnosticStrip delay={0.12 + CALL_VENDORS.length * 0.05} />
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function CallPlatformsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto w-full max-w-6xl">
        <p className="deck-rise text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
          Where we build
        </p>
        <h2 className="deck-rise mt-3 text-[2.6rem] font-black leading-tight tracking-tight">
          Nine platforms.{" "}
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
            Four ways in.
          </span>
        </h2>
        <div className="mt-8 grid grid-cols-4 gap-6">
          {CALL_GROUPS.map((group, index) => (
            <div
              key={group.kicker}
              className="deck-rise border-t border-white/15 pt-5"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <p className={cn("text-[11px] font-black uppercase tracking-[0.18em]", group.tone)}>
                {group.kicker}
              </p>
              <ul className="mt-4 space-y-1">
                {group.names.map((name) => (
                  <li key={name} className="text-[22px] font-black leading-tight tracking-tight">
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-white/60">{group.line}</p>
            </div>
          ))}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function buildCallSlides(): DeckSlide[] {
  return [
    {
      id: "call-idea",
      section: "The idea",
      gradient: "from-teal-500 via-emerald-500 to-amber-500",
      node: <CallIdeaSlide />,
    },
    {
      id: "call-platforms",
      section: "Where",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      node: <CallPlatformsSlide />,
    },
    {
      id: "call-vendors",
      section: "Vendors",
      gradient: "from-cyan-500 via-teal-500 to-amber-500",
      node: <CallVendorsSlide />,
    },
    {
      id: "call-team",
      section: "Team",
      gradient: "from-emerald-500 via-amber-500 to-orange-500",
      node: <TeamSlide />,
    },
    {
      id: "call-business",
      section: "New business",
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      node: <NewBusinessSlide />,
    },
    {
      id: "call-timeline",
      section: "Timeline",
      gradient: "from-rose-500 via-amber-500 to-teal-500",
      node: <TimelineSlide />,
    },
  ];
}

export function StudioCallDeck() {
  const slides = useMemo(() => buildCallSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}

export function StudioSetupDeck({ slides }: { slides: DeckSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState<FullscreenMode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenModeRef = useRef<FullscreenMode | null>(null);
  useEffect(() => {
    fullscreenModeRef.current = fullscreenMode;
  }, [fullscreenMode]);

  const sections = useMemo(() => deriveSections(slides), [slides]);
  const total = slides.length;
  const slide = slides[current]!;
  const { isCompactBrowse, stageMode } = useDeckBrowseLayout(isFullscreen);

  const goNext = useCallback(
    () => setCurrent((value) => Math.min(value + 1, slides.length - 1)),
    [slides.length],
  );
  const goPrev = useCallback(() => setCurrent((value) => Math.max(value - 1, 0)), []);
  const goTo = useCallback(
    (index: number) => setCurrent(Math.max(0, Math.min(index, slides.length - 1))),
    [slides.length],
  );

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    if (isFullscreen) {
      unlockOrientation();
      if (fullscreenMode === "native") {
        await leaveNativeFullscreen();
      }
      setIsFullscreen(false);
      setFullscreenMode(null);
      return;
    }

    const enteredNative = await enterNativeFullscreen(el);
    if (enteredNative) {
      setIsFullscreen(true);
      setFullscreenMode("native");
      return;
    }

    setIsFullscreen(true);
    setFullscreenMode("fallback");
  }, [fullscreenMode, isFullscreen]);

  useEffect(() => {
    if (fullscreenMode !== "fallback" && !isCompactBrowse) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [fullscreenMode, isCompactBrowse]);

  useEffect(() => {
    const onChange = () => {
      if (getNativeFullscreenElement()) {
        setIsFullscreen(true);
        setFullscreenMode("native");
        return;
      }
      if (fullscreenModeRef.current === "native") {
        unlockOrientation();
        setIsFullscreen(false);
        setFullscreenMode(null);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  useDeckSwipeNavigation(containerRef, {
    enabled: true,
    onNext: goNext,
    onPrev: goPrev,
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " ", "Spacebar"].includes(event.key)) {
        event.preventDefault();
        goNext();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Home") {
        goTo(0);
      } else if (event.key === "End") {
        goTo(slides.length - 1);
      } else if (event.key === "f" || event.key === "F") {
        void toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo, toggleFullscreen, slides.length]);

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative h-dvh min-h-dvh w-full select-none overflow-hidden bg-neutral-950 print:hidden",
          (fullscreenMode === "fallback" || isCompactBrowse) &&
            "fixed inset-0 z-50 h-dvh w-full max-h-dvh",
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-30 h-1 bg-white/10">
            <div
              className={cn("h-full bg-gradient-to-r transition-all duration-500", slide.gradient)}
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>

          <SlideStage mode={stageMode} presenting={isFullscreen} slideKey={current}>
            <div key={current} className="deck-slide-enter absolute inset-0">
              {slide.node}
            </div>
          </SlideStage>

          <Link
            href="/studio"
            className={cn(
              "absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-black/50",
              "pl-[max(0.75rem,env(safe-area-inset-left))] pt-[max(0.4rem,env(safe-area-inset-top))]",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Decks
          </Link>
          <div
            className={cn(
              "absolute right-4 top-4 z-30 flex items-center gap-2",
              DECK_CHROME_SAFE_TOP,
            )}
          >
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
              {current + 1} / {total}
            </span>
            {!isCompactBrowse ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full border border-white/20 bg-black/30 p-2 text-white/90 backdrop-blur transition hover:bg-black/50"
                aria-label="Save slides as PDF"
                title="Save as PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className={cn(
                "rounded-full border border-white/20 bg-black/30 text-white/90 backdrop-blur transition hover:bg-black/50",
                isCompactBrowse && !isFullscreen
                  ? "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold"
                  : "p-2",
              )}
              aria-label={isFullscreen ? "Exit present mode" : "Present fullscreen"}
              title={isFullscreen ? "Exit present mode" : "Present fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : isCompactBrowse ? (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  Present
                </>
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={goPrev}
            disabled={current === 0}
            aria-label="Previous slide"
            className={cn(
              "absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 disabled:pointer-events-none disabled:opacity-0",
              isCompactBrowse && "left-[max(0.75rem,env(safe-area-inset-left))]",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={current === total - 1}
            aria-label="Next slide"
            className={cn(
              "absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 disabled:pointer-events-none disabled:opacity-0",
              isCompactBrowse && "right-[max(0.75rem,env(safe-area-inset-right))]",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-4",
              DECK_CHROME_SAFE_BOTTOM,
            )}
          >
            <div
              className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/40 px-2 py-1.5 text-white shadow-lg backdrop-blur"
              data-deck-no-swipe
            >
              {sections.map((section) => {
                const active = slide.section === section.label;
                return (
                  <button
                    key={section.label}
                    type="button"
                    onClick={() => goTo(section.start)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition",
                      active
                        ? "bg-white text-neutral-900"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        {slides.map((printSlide) => (
          <div key={printSlide.id} className="break-after-page">
            <div style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}>{printSlide.node}</div>
          </div>
        ))}
      </div>
    </>
  );
}
