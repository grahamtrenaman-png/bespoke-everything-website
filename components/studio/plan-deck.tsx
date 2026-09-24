"use client";

import { useMemo } from "react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { BespokeBrandedSlide } from "@/components/studio/slide-chrome";
import {
  Glows,
  SlideHeading,
  StudioSetupDeck,
  type DeckSlide,
} from "@/components/studio/studio-setup-deck";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// The model. Indicative, round numbers, £k. Everything on the assumptions slide.
//
// Builds are one to two weeks of work. Platform extensions at a mid £55k,
// vendor-agnostic jobs at a mid £25k. Each settled builder ships eight or nine
// a year in the model; capacity at 1.5 weeks each is about twenty.
// ---------------------------------------------------------------------------

type YearKey = "y1" | "y2" | "y3";

const YEARS: { key: YearKey; label: string }[] = [
  { key: "y1", label: "Year one" },
  { key: "y2", label: "Year two" },
  { key: "y3", label: "Year three" },
];

/** Revenue by line, £k. */
const REVENUE = {
  platform: { y1: 715, y2: 2090, y3: 3630 },
  agnostic: { y1: 300, y2: 650, y3: 1100 },
  support: { y1: 60, y2: 250, y3: 900 },
  licences: { y1: 0, y2: 50, y3: 450 },
  jalipi: { y1: 125, y2: 160, y3: 420 },
} as const;

const TOTAL = { y1: 1200, y2: 3200, y3: 6500 } as const;
const BUILDS = {
  platform: { y1: 13, y2: 38, y3: 66 },
  agnostic: { y1: 12, y2: 26, y3: 44 },
} as const;
const HEADCOUNT = { y1: 8, y2: 14, y3: 20 } as const;
// Cost base £0.9m / £2.0m / £3.9m. EBITDA £0.3m / £1.2m / £2.6m. ARR £0.2m / £0.8m / £1.8m.
// Carried as strings on the value and assumptions slides.

/** Share of the year's revenue by platform. Percentages, sum to 100. */
const BY_PLATFORM: { name: string; tone: string; y1: number; y2: number; y3: number }[] = [
  { name: "Dayforce", tone: "bg-teal-400", y1: 28, y2: 25, y3: 22 },
  { name: "UKG", tone: "bg-teal-300", y1: 24, y2: 20, y3: 16 },
  { name: "Logile · Legion", tone: "bg-emerald-400", y1: 10, y2: 10, y3: 8 },
  { name: "RELEX", tone: "bg-amber-400", y1: 3, y2: 10, y3: 14 },
  { name: "jalipi · QTC", tone: "bg-sky-400", y1: 10, y2: 5, y3: 8 },
  { name: "Workday · SAP · Oracle · ADP", tone: "bg-white/40", y1: 0, y2: 5, y3: 10 },
  { name: "Vendor agnostic", tone: "bg-fuchsia-400", y1: 25, y2: 25, y3: 22 },
];

const BY_MARKET: { name: string; y1: number; y2: number; y3: number; line: string }[] = [
  { name: "UK · the network", y1: 60, y2: 40, y3: 30, line: "TCN, FXP and REPL alumni. Warm, and where January’s builds come from." },
  { name: "UK · vendor referred", y1: 5, y2: 15, y3: 20, line: "Account teams send the gap once we are a name they can refer." },
  { name: "UK · direct", y1: 10, y2: 15, y3: 20, line: "One named offer per platform. A seller behind it from Q3 of year one." },
  { name: "South Africa", y1: 25, y2: 30, y3: 30, line: "Doug’s accounts and retailers. Delivered from the SA seats, sold in rand and in sterling." },
];

// ---------------------------------------------------------------------------
// Slides
// ---------------------------------------------------------------------------

function TitleSlide() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <div className="deck-drift pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-teal-600/20 blur-3xl" />
      <div
        className="deck-drift pointer-events-none absolute -right-40 bottom-1/5 h-[34rem] w-[34rem] rounded-full bg-amber-600/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
      <div className="relative max-w-4xl px-8 text-center">
        <div className="deck-rise flex flex-col items-center gap-3" style={{ animationDelay: "0.2s" }}>
          <BespokeEverythingLogo variant="dark" showTagline={false} className="text-lg" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
            The three-year plan · for Chris and Thomas
          </p>
        </div>
        <h1
          className="deck-rise mt-8 text-5xl font-black leading-tight tracking-tight"
          style={{ animationDelay: "0.55s" }}
        >
          Three years to a choice.{" "}
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
            Sell it, or double down.
          </span>
        </h1>
        <p
          className="deck-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65"
          style={{ animationDelay: "0.85s" }}
        >
          Revenue from January. Twenty people by the end of year three. A studio worth ten to fifteen
          million at the end of it, built on a £200k overdraft that is never fully drawn. Who we hire and
          when, where the money comes from, and what it is worth at each year end. Indicative
          throughout. The assumptions are on one slide so they can be argued with.
        </p>
        <p
          className="deck-rise mx-auto mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40"
          style={{ animationDelay: "1.05s" }}
        >
          £1.2m · £3.2m · £6.5m. Paid back inside year one.
        </p>
      </div>
    </div>
  );
}

const SHAPE: {
  when: string;
  title: string;
  tone: "notice" | "year";
  lines: string[];
  end: string;
}[] = [
  {
    when: "Now → mid Jan",
    title: "Line it up",
    tone: "notice",
    lines: [
      "Hand jalipi to QTC. Agree the kickback in principle.",
      "The first four builds scoped and priced, ready to sign in January.",
      "Tenants, registrations, the model. About £25k spent.",
    ],
    end: "Two founders, four jobs, day one.",
  },
  {
    when: "Year one",
    title: "Sell from day one",
    tone: "year",
    lines: [
      "Graham and Doug at £100k. First SA builder in February.",
      "25 builds. Listed on Dayforce, UKG and RELEX. Seller joins Q3.",
      "Draw peaks at £165k in Q1. Back to zero by Q4.",
    ],
    end: "£1.2m revenue · 8 people · £0.2m ARR",
  },
  {
    when: "Year two",
    title: "Repeat it",
    tone: "year",
    lines: [
      "Two builder pairs per lead platform. RELEX live.",
      "64 builds. First licensed app on a second tenant.",
      "£1.2m EBITDA. South Africa a third of the work.",
    ],
    end: "£3.2m revenue · 14 people · £0.8m ARR",
  },
  {
    when: "Year three",
    title: "Choose",
    tone: "year",
    lines: [
      "Twenty people across UK and SA. A product lead on the licensed apps.",
      "110 builds. Support and licences at £1.8m recurring.",
      "A business someone would buy for £10 to 15m, or one worth keeping.",
    ],
    end: "£6.5m revenue · 20 people · £1.8m ARR",
  },
];

function ShapeSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="The shape of it"
          title="Sell from day one, repeat it,"
          highlight="then choose."
          lede="A studio that pays its way inside year one and is worth a decision by year three. The numbers are indicative and rounded."
        />
        <div className="relative mt-6 grid grid-cols-4 gap-4">
          <span className="pointer-events-none absolute left-[12%] right-[12%] top-[0.55rem] h-px bg-gradient-to-r from-amber-400/60 via-teal-400/60 to-emerald-400/60" />
          {SHAPE.map((phase, index) => {
            const notice = phase.tone === "notice";
            return (
              <div
                key={phase.title}
                className="deck-rise flex flex-col"
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}
              >
                <span
                  className={cn(
                    "relative z-10 h-[1.1rem] w-[1.1rem] rounded-full ring-8 ring-neutral-950",
                    notice ? "bg-amber-400" : "bg-teal-400",
                  )}
                />
                <p
                  className={cn(
                    "mt-3 text-[10px] font-black uppercase tracking-[0.2em]",
                    notice ? "text-amber-200/80" : "text-teal-200/80",
                  )}
                >
                  {phase.when}
                </p>
                <h3 className="mt-1 text-[22px] font-black leading-tight tracking-tight">{phase.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {phase.lines.map((line) => (
                    <li key={line} className="flex gap-2 text-[11px] leading-snug text-white/75">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className={cn(
                    "mt-4 rounded-xl border px-3 py-2 text-[11px] font-semibold leading-snug",
                    notice
                      ? "border-amber-400/25 bg-amber-500/10 text-amber-100"
                      : "border-teal-400/25 bg-teal-500/10 text-teal-100",
                  )}
                >
                  {phase.end}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

type Hire = { when: string; who: string; cost: string; why: string; tone: "founder" | "uk" | "sa" | "ops" };

const HIRES: Hire[] = [
  { when: "Y1 Q1", who: "Graham and Doug", cost: "£100k each", why: "Co-founders. Build, and vendors and accounts. Selling from January.", tone: "founder" },
  { when: "Y1 Q1", who: "Builder 1 · SA", cost: "£65k", why: "February, against the first signed builds.", tone: "sa" },
  { when: "Y1 Q2", who: "Builder 2 · UK", cost: "£90k", why: "Dayforce Studio work inside the product.", tone: "uk" },
  { when: "Y1 Q3", who: "Seller · potential co-founder", cost: "£100k", why: "The direct channel. Same terms as the founders if they take the stake.", tone: "founder" },
  { when: "Y1 Q3 – Q4", who: "Builders 3 and 4 · SA. Support desk · SA", cost: "£65k · £65k · £45k", why: "Two more SA seats and a support desk for the live builds.", tone: "sa" },
  { when: "Y2", who: "Builders 5 to 8 · UK 2, SA 2. Sales support · SA", cost: "£90k · £65k · £45k", why: "A pair per lead platform. One UK seat leads RELEX.", tone: "uk" },
  { when: "Y3", who: "Builders 9 to 13 · UK 3, SA 2. Product lead · UK. Ops", cost: "£90k · £65k · £60k", why: "Workday and the second platform. A product lead for the licensed apps.", tone: "ops" },
];

const HIRE_TONE: Record<Hire["tone"], string> = {
  founder: "border-amber-400/40 bg-amber-500/15 text-amber-100",
  uk: "border-teal-400/40 bg-teal-500/15 text-teal-100",
  sa: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
  ops: "border-sky-400/40 bg-sky-500/15 text-sky-100",
};

function PeopleSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="People"
          title="Two, then eight,"
          highlight="then fourteen, then twenty."
          lede="Every hire follows the work. Builders arrive against a signed job. South Africa carries more of the seats because a builder there costs £65k against £90k in the UK, and the work is there too."
        />
        <div className="mt-4 grid grid-cols-[1fr_16rem] gap-4">
          <div className="deck-rise overflow-hidden rounded-2xl border border-white/10 bg-white/5" style={{ animationDelay: "0.15s" }}>
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
                  <th className="w-[13%] px-3 py-1">When</th>
                  <th className="w-[36%] px-3 py-1">Who</th>
                  <th className="w-[17%] px-3 py-1">Cost each</th>
                  <th className="px-3 py-1">Why then</th>
                </tr>
              </thead>
              <tbody>
                {HIRES.map((hire) => (
                  <tr key={hire.when + hire.who} className="border-t border-white/10 align-top">
                    <td className="px-3 py-1.5">
                      <span className={cn("inline-block whitespace-nowrap rounded-full border px-1.5 text-[8.5px] font-bold uppercase leading-[15px] tracking-[0.12em]", HIRE_TONE[hire.tone])}>
                        {hire.when}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-[10.5px] font-bold leading-snug text-white">{hire.who}</td>
                    <td className="px-3 py-1.5 text-[10px] leading-snug tabular-nums text-white/70">{hire.cost}</td>
                    <td className="px-3 py-1.5 text-[10px] leading-snug text-white/75">{hire.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2.5">
            {YEARS.map((year, index) => (
              <div
                key={year.key}
                className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{year.label} · year end</p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-[28px] font-black leading-none tracking-tight text-white">{HEADCOUNT[year.key]}</span>
                  <span className="text-[11px] text-white/60">people</span>
                </div>
                <p className="mt-1 text-[10px] leading-snug text-white/65">
                  {year.key === "y1" && "3 founders · 1 UK · 3 SA · 1 support"}
                  {year.key === "y2" && "3 founders · 4 UK · 5 SA · 2 ops"}
                  {year.key === "y3" && "3 founders · 8 UK · 7 SA · 2 ops"}
                </p>
              </div>
            ))}
            <p className="px-1 text-[9.5px] leading-snug text-white/45">
              Fully loaded. Builders are hired two months before the model counts their output.
            </p>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function RevenueSlide() {
  const lines: { key: keyof typeof REVENUE; label: string; tone: string }[] = [
    { key: "platform", label: "Platform builds", tone: "bg-teal-400" },
    { key: "agnostic", label: "Vendor agnostic", tone: "bg-fuchsia-400" },
    { key: "support", label: "Annual support", tone: "bg-emerald-400" },
    { key: "licences", label: "Licensed apps", tone: "bg-amber-400" },
    { key: "jalipi", label: "jalipi · QTC", tone: "bg-sky-400" },
  ];
  const max = TOTAL.y3;
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Revenue"
          title="Builds pay the bills."
          highlight="Support, licences and jalipi make it worth something."
          lede="Indicative, £k. A build is one to two weeks of work: platform extensions at a mid £55k, vendor-agnostic jobs at a mid £25k. Support at 20 to 25% of the build. Licences where a platform lets us sell one app to many tenants."
        />
        <div className="mt-4 grid grid-cols-[1fr_21rem] gap-4">
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5" style={{ animationDelay: "0.15s" }}>
            <div className="grid grid-cols-3 gap-6">
              {YEARS.map((year) => (
                <div key={year.key} className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{year.label}</p>
                  <p className="mt-0.5 text-[26px] font-black leading-none tracking-tight">£{(TOTAL[year.key] / 1000).toFixed(1)}m</p>
                  <div className="mt-2.5 flex h-[10.5rem] flex-col-reverse overflow-hidden rounded-lg bg-white/[0.04]">
                    {lines.map((line) => {
                      const value = REVENUE[line.key][year.key];
                      if (!value) return null;
                      return (
                        <div
                          key={line.key}
                          className={cn("flex items-center justify-center text-[10px] font-bold text-neutral-950", line.tone)}
                          style={{ height: `${(value / max) * 100}%` }}
                          title={`${line.label} £${value}k`}
                        >
                          {value >= 250 ? `£${(value / 1000).toFixed(1)}m` : ""}
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[10px] leading-snug text-white/65">
                    {BUILDS.platform[year.key]} platform builds and {BUILDS.agnostic[year.key]} smaller jobs.{" "}
                    {year.key === "y1" && "Support starts in Q2. jalipi extensions from January."}
                    {year.key === "y2" && "First licences. Support on 60 live builds."}
                    {year.key === "y3" && "Licences on two platforms. Support on 170."}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-2">
              {lines.map((line) => (
                <span key={line.key} className="inline-flex items-center gap-1.5 text-[10px] text-white/65">
                  <span className={cn("h-2 w-2 rounded-sm", line.tone)} />
                  {line.label}
                </span>
              ))}
            </div>
          </div>
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.3s" }}>
            <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">By platform · share of the year</p>
            <table className="mt-1.5 w-full border-collapse text-left">
              <thead>
                <tr className="text-[8.5px] font-black uppercase tracking-[0.15em] text-white/40">
                  <th className="py-0.5 pr-2" />
                  <th className="w-10 py-0.5 text-right">Y1</th>
                  <th className="w-10 py-0.5 text-right">Y2</th>
                  <th className="w-10 py-0.5 text-right">Y3</th>
                </tr>
              </thead>
              <tbody>
                {BY_PLATFORM.map((row) => (
                  <tr key={row.name} className="border-t border-white/10">
                    <td className="py-1 pr-2 text-[10px] text-white/80">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 shrink-0 rounded-sm", row.tone)} />
                        {row.name}
                      </span>
                    </td>
                    <td className="py-1 text-right text-[10px] tabular-nums text-white/70">{row.y1 ? `${row.y1}%` : "·"}</td>
                    <td className="py-1 text-right text-[10px] tabular-nums text-white/70">{row.y2}%</td>
                    <td className="py-1 text-right text-[10px] tabular-nums text-white/70">{row.y3}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[9.5px] leading-snug text-white/50">
              A quarter of every year is vendor-agnostic: spreadsheets, small apps, consulting. jalipi is
              extensions billed to QTC plus a small kickback on their deals, not yet agreed.
            </p>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function MarketsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Markets"
          title="The UK network and South Africa first."
          highlight="Then the vendors sell for us."
          lede="Share of each year’s new work by route. Two home markets from day one: the TCN network in the UK, and Doug’s accounts in South Africa, where most of the build seats sit."
        />
        <div className="mt-5 space-y-3">
          {BY_MARKET.map((row, index) => (
            <div
              key={row.name}
              className="deck-rise grid grid-cols-[14rem_1fr_16rem] items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3"
              style={{ animationDelay: `${0.15 + index * 0.08}s` }}
            >
              <div>
                <h3 className="text-[15px] font-black leading-tight tracking-tight">{row.name}</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {YEARS.map((year) => {
                  const value = row[year.key];
                  return (
                    <div key={year.key}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/40">{year.label}</span>
                        <span className="text-[12px] font-bold tabular-nums text-white">{value}%</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-300"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10.5px] leading-snug text-white/65">{row.line}</p>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-4 text-center text-[10.5px] text-white/50" style={{ animationDelay: "0.55s" }}>
          Nothing goes out cold. Every route starts with someone who already knows the sender.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

/** Cumulative cash, £k. Negative is drawn on the Chris and Thomas overdraft, limit £200k. */
const CASH: { when: string; cumulative: number; note: string }[] = [
  { when: "Pre Jan", cumulative: -25, note: "Tenants, registrations, legal." },
  { when: "Y1 Q1", cumulative: -165, note: "The peak. Salaries and setup before the first invoices land." },
  { when: "Y1 Q2", cumulative: -140, note: "Six builds invoiced. Support starts." },
  { when: "Y1 Q3", cumulative: -30, note: "Seller and two SA builders join." },
  { when: "Y1 Q4", cumulative: 125, note: "Paid back. Eight people." },
  { when: "Y2 H1", cumulative: 450, note: "Fourteen people by mid-year." },
  { when: "Y2 H2", cumulative: 1000, note: "£1.2m EBITDA for the year." },
  { when: "Y3 H2", cumulative: 3200, note: "Before any dividend or reinvestment." },
];

function CashSlide() {
  const negScale = 200;
  const posScale = 3200;
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Cash"
          title="£165k drawn at the peak, in Q1."
          highlight="Back to zero inside year one."
          lede="Indicative, £k, cumulative. The draw is a £200k overdraft from Chris and Thomas, not a round. Revenue from January keeps it inside the limit, and it is repaid by Q4 of year one."
        />
        <div className="mt-4 grid grid-cols-[1fr_19rem] gap-4">
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5" style={{ animationDelay: "0.15s" }}>
            <div className="grid grid-cols-8 gap-2">
              {CASH.map((point) => {
                const positive = point.cumulative >= 0;
                const height = positive
                  ? (point.cumulative / posScale) * 100
                  : (Math.abs(point.cumulative) / negScale) * 100;
                return (
                  <div key={point.when} className="flex flex-col">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/45">{point.when}</p>
                    <div className="relative mt-2 h-[10rem]">
                      <span className="absolute inset-x-0 top-[62%] h-px bg-white/25" />
                      <span
                        className="absolute inset-x-0 bottom-0 h-px border-t border-dashed border-amber-400/60"
                        aria-hidden="true"
                      />
                      <div
                        className={cn(
                          "absolute inset-x-1 rounded-md",
                          positive
                            ? "bottom-[38%] bg-gradient-to-t from-teal-500 to-emerald-400"
                            : "top-[62%] bg-gradient-to-b from-amber-500 to-orange-400",
                        )}
                        style={{ height: `${(height * (positive ? 62 : 38)) / 100}%` }}
                      />
                      <span
                        className={cn(
                          "absolute inset-x-0 text-center text-[10.5px] font-black tabular-nums",
                          positive ? "text-teal-100" : "text-amber-100",
                        )}
                        style={
                          positive
                            ? { bottom: `calc(38% + ${(height * 62) / 100}% + 3px)` }
                            : { top: `calc(62% + ${(height * 38) / 100}% + 2px)` }
                        }
                      >
                        {point.cumulative >= 1000
                          ? `+£${(point.cumulative / 1000).toFixed(1)}m`
                          : `${point.cumulative > 0 ? "+" : "−"}£${Math.abs(point.cumulative)}k`}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[9.5px] leading-snug text-white/60">{point.note}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 border-t border-white/10 pt-2 text-[9.5px] text-white/45">
              <span className="mr-1.5 inline-block w-4 border-t border-dashed border-amber-400/80 align-middle" />
              The £200k overdraft limit. Positive bars are to a different scale.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Peak draw", value: "£165k", note: "Q1 of year one, against a £200k limit. £35k of headroom." },
              { label: "Payback", value: "Y1 Q4", note: "Cumulative cash back above zero before the first anniversary." },
              { label: "Cash at end of Y3", value: "+£3.2m", note: "Cumulative EBITDA less debtors. Before tax, dividends or a round." },
            ].map((item, index) => (
              <div
                key={item.label}
                className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{item.label}</p>
                <p className="mt-0.5 text-[24px] font-black leading-none tracking-tight">{item.value}</p>
                <p className="mt-1 text-[10px] leading-snug text-white/65">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

const VALUE: {
  key: YearKey;
  revenue: string;
  arr: string;
  ebitda: string;
  services: string;
  ebitdaMult: string;
  recurring: string;
  blended: string;
}[] = [
  { key: "y1", revenue: "£1.2m", arr: "£0.2m", ebitda: "£0.3m · 25%", services: "£1.8 – 2.4m", ebitdaMult: "£1.5 – 1.8m", recurring: "£1.3 – 1.8m", blended: "£1.5 – 2m" },
  { key: "y2", revenue: "£3.2m", arr: "£0.8m", ebitda: "£1.2m · 37%", services: "£4.8 – 6.4m", ebitdaMult: "£6 – 7.2m", recurring: "£4.8 – 6.4m", blended: "£5 – 7m" },
  { key: "y3", revenue: "£6.5m", arr: "£1.8m", ebitda: "£2.6m · 40%", services: "£9.8 – 13m", ebitdaMult: "£13 – 15.6m", recurring: "£10.8 – 14.4m", blended: "£10 – 15m" },
];

function ValueSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="What it is worth"
          title="Three lenses on the same studio."
          highlight="They land in the same place."
          lede="Services firms sell at 1.5 to 2 times revenue, or 5 to 6 times EBITDA. Recurring software sells at 6 to 8 times ARR. By year three all three point at £10 to 15m. The recurring line is what lets a buyer use the higher lens."
        />
        <div className="deck-rise mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5" style={{ animationDelay: "0.15s" }}>
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="text-[9px] font-black uppercase tracking-[0.15em] text-white/45">
                <th className="w-[12%] px-4 py-2">Year end</th>
                <th className="w-[10%] px-3 py-2">Revenue</th>
                <th className="w-[9%] px-3 py-2">ARR</th>
                <th className="w-[13%] px-3 py-2">EBITDA · margin</th>
                <th className="w-[15%] px-3 py-2">Services · 1.5 – 2× rev</th>
                <th className="w-[14%] px-3 py-2">EBITDA · 5 – 6×</th>
                <th className="w-[15%] px-3 py-2">Recurring · 6 – 8× ARR</th>
                <th className="px-3 py-2">Indicative</th>
              </tr>
            </thead>
            <tbody>
              {VALUE.map((row) => {
                const year = YEARS.find((y) => y.key === row.key)!;
                return (
                  <tr key={row.key} className="border-t border-white/10">
                    <td className="px-4 py-2.5 text-[12.5px] font-black tracking-tight text-white">{year.label}</td>
                    <td className="px-3 py-2.5 text-[14px] font-bold tabular-nums text-white">{row.revenue}</td>
                    <td className="px-3 py-2.5 text-[14px] font-bold tabular-nums text-emerald-200">{row.arr}</td>
                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-white/75">{row.ebitda}</td>
                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-white/75">{row.services}</td>
                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-white/75">{row.ebitdaMult}</td>
                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-white/75">{row.recurring}</td>
                    <td className="px-3 py-2.5 text-[16px] font-black tabular-nums tracking-tight text-amber-200">{row.blended}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="deck-rise mt-3.5 grid grid-cols-3 gap-4" style={{ animationDelay: "0.35s" }}>
          {[
            { title: "Why the margin is high", body: "A build is one to two weeks of work priced as a build, not a day rate. Twenty people producing £6.5m is £325k a head. The multiples assume a buyer believes that holds." },
            { title: "Why ARR matters", body: "Support, licences and the jalipi kickback are sold every year. £1.8m recurring at 6 to 8 times is the whole of the low case on its own. Without it, we are a services firm at 1.5 times." },
            { title: "The sensitivity", body: "Halve the margin and the EBITDA lens gives £6.5 to 8m. Halve the recurring and the ARR lens gives £5 to 7m. The revenue lens still gives £10m. Three lenses is the point." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
              <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{item.title}</p>
              <p className="mt-1 text-[10px] leading-snug text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

const ASSUMPTIONS: { group: string; items: string[] }[] = [
  {
    group: "Selling",
    items: [
      "A build is one to two weeks. Platform extensions £40 to 120k, modelled at a mid £55k. Vendor-agnostic jobs at a mid £25k.",
      "Builds a year: 25, 64, 110. A settled builder ships eight or nine a year in the model. Capacity at 1.5 weeks each is about twenty.",
      "Support at 20 to 25% of the build, from the quarter after go-live. 90% renew.",
      "Licences from year two on Dayforce, later Workday. £15 to 30k per tenant per year.",
      "jalipi: extensions billed to QTC, plus a 5% kickback on QTC’s jalipi deals. Not yet agreed.",
    ],
  },
  {
    group: "Spending",
    items: [
      "Two co-founders at £100k from January. A third, the seller, on the same from Q3 if they take the stake.",
      "Builders fully loaded: £90k UK, £65k South Africa. Support and ops seats £45 to 60k, in SA.",
      "Cost base £0.9m, £2.0m, £3.9m. People are under half of it; the rest is contractors for peaks, commission, marketplace fees, tenants, travel and TCN shared ops.",
      "EBITDA 25%, 37%, 40%. Debtors at 45 days.",
      "Overdraft limit £200k. Peak draw £165k in Q1 of year one.",
    ],
  },
  {
    group: "Valuing",
    items: [
      "Services: 1.5 to 2× revenue, the range for small specialist consultancies with named customers.",
      "EBITDA: 5 to 6×, the lower end of what buyers pay for a services firm of this size.",
      "Recurring: 6 to 8× ARR, below the multiple for pure software because support is in the mix.",
      "Not in the model: tax, dividends, interest on the draw, a round, or platforms before a project asks.",
    ],
  },
];

function AssumptionsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Assumptions"
          title="Every number above"
          highlight="rests on one of these."
          lede="Change one and the plan moves. That is the point of putting them on a slide."
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {ASSUMPTIONS.map((group, index) => (
            <div
              key={group.group}
              className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-200/80">{group.group}</p>
              <ul className="mt-2 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[10.5px] leading-snug text-white/78">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-3.5 text-center text-[10px] text-white/50" style={{ animationDelay: "0.5s" }}>
          The arithmetic: builds times price plus support, licences and jalipi gives revenue. Heads times cost plus the rest gives the cost base. The difference is EBITDA and, less debtors, cash. Multiples give the value.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

function ChoiceSlide() {
  const paths = [
    {
      title: "Sell it",
      tone: "border-amber-400/30 bg-amber-500/[0.08]",
      label: "text-amber-200/80",
      value: "£10 – 15m",
      lines: [
        "Twenty people, £6.5m revenue, £2.6m EBITDA, £1.8m recurring, referenceable customers on Dayforce, UKG and RELEX in two countries.",
        "Buyers: a systems integrator wanting a build capability, a vendor wanting a partner in house, a private equity roll-up, or TCN consolidating it.",
        "Founders and Chris and Thomas take the return. Doug’s stake, the seller’s stake and any builder bonus vest into it.",
      ],
      good: "A clean exit in year three at ten to fifteen million.",
    },
    {
      title: "Double down",
      tone: "border-teal-400/30 bg-teal-500/[0.08]",
      label: "text-teal-200/80",
      value: "£1.8m ARR → £5m+",
      lines: [
        "Turn the licensed apps into the business. Products sold per tenant on Dayforce and Workday, with builds as the front door and £3m of year-three cash to fund it.",
        "Hire product, not more builders. Open a third market. Take a round only if the ARR growth justifies one.",
        "Aim for recurring at half of revenue by year five, and a valuation on ARR rather than revenue.",
      ],
      good: "A software company by year five, worth 8 to 10 times ARR.",
    },
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Year three"
          title="Sell it,"
          highlight="or double down."
          lede="The plan is built so both are real choices at the end of year three. The overdraft is long repaid. The studio stands up without any one of us. What is left is a decision about what to do with it."
        />
        <div className="mt-5 grid grid-cols-2 gap-5">
          {paths.map((path, index) => (
            <div
              key={path.title}
              className={cn("deck-rise rounded-2xl border px-6 py-5", path.tone)}
              style={{ animationDelay: `${0.15 + index * 0.12}s` }}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[26px] font-black leading-tight tracking-tight">{path.title}</h3>
                <span className={cn("text-[13px] font-bold tabular-nums", path.label)}>{path.value}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {path.lines.map((line) => (
                  <li key={line} className="flex gap-2 text-[11px] leading-snug text-white/78">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn("mt-4 border-t border-white/10 pt-3 text-[11px] font-semibold", path.label)}>{path.good}</p>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-4 text-center text-[10.5px] text-white/50" style={{ animationDelay: "0.5s" }}>
          We decide at the end of year two which way to lean, so year three is spent building towards it.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// Deck
// ---------------------------------------------------------------------------

function buildPlanSlides(): DeckSlide[] {
  return [
    { id: "plan-title", section: "Open", gradient: "from-teal-500 via-emerald-500 to-amber-500", node: <TitleSlide /> },
    { id: "plan-shape", section: "Shape", gradient: "from-amber-500 via-teal-500 to-emerald-500", node: <ShapeSlide /> },
    { id: "plan-people", section: "People", gradient: "from-teal-500 via-sky-500 to-emerald-500", node: <PeopleSlide /> },
    { id: "plan-revenue", section: "Revenue", gradient: "from-teal-500 via-emerald-500 to-amber-500", node: <RevenueSlide /> },
    { id: "plan-markets", section: "Markets", gradient: "from-emerald-500 via-teal-500 to-cyan-500", node: <MarketsSlide /> },
    { id: "plan-cash", section: "Cash", gradient: "from-amber-500 via-orange-400 to-teal-500", node: <CashSlide /> },
    { id: "plan-value", section: "Value", gradient: "from-emerald-500 via-amber-400 to-amber-300", node: <ValueSlide /> },
    { id: "plan-assumptions", section: "Assumptions", gradient: "from-white/60 via-teal-400 to-emerald-400", node: <AssumptionsSlide /> },
    { id: "plan-choice", section: "The choice", gradient: "from-amber-500 via-teal-500 to-emerald-500", node: <ChoiceSlide /> },
  ];
}

export function PlanDeck() {
  const slides = useMemo(() => buildPlanSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
