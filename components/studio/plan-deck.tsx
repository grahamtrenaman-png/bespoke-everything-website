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
// The model. Indicative, round numbers. Everything on the assumptions slide.
// ---------------------------------------------------------------------------

type YearKey = "y1" | "y2" | "y3";

const YEARS: { key: YearKey; label: string; span: string }[] = [
  { key: "y1", label: "Year one", span: "Jan → Dec" },
  { key: "y2", label: "Year two", span: "" },
  { key: "y3", label: "Year three", span: "" },
];

/** Revenue by line, £k. Builds + support + licences + agnostic = total. */
const REVENUE = {
  builds: { y1: 320, y2: 800, y3: 1400 },
  support: { y1: 40, y2: 200, y3: 500 },
  licences: { y1: 0, y2: 100, y3: 400 },
  agnostic: { y1: 40, y2: 100, y3: 200 },
} as const;

const TOTAL = {
  y1: 400,
  y2: 1200,
  y3: 2500,
} as const;

/** Headcount at year end. ARR (£100k, £400k, £900k) and cost base (£620k, £1.05m, £1.9m) are on the value and assumptions slides. */
const HEADCOUNT = { y1: 5, y2: 9, y3: 14 } as const;

/** Where the year's revenue comes from, by platform. Percentages. */
const BY_PLATFORM: { name: string; tone: string; y1: number; y2: number; y3: number }[] = [
  { name: "Dayforce", tone: "bg-teal-400", y1: 35, y2: 30, y3: 28 },
  { name: "UKG", tone: "bg-teal-300", y1: 30, y2: 25, y3: 20 },
  { name: "Logile · Legion", tone: "bg-emerald-400", y1: 15, y2: 15, y3: 12 },
  { name: "RELEX", tone: "bg-amber-400", y1: 5, y2: 12, y3: 15 },
  { name: "jalipi · QTC", tone: "bg-sky-400", y1: 5, y2: 6, y3: 5 },
  { name: "Workday · SAP · Oracle · ADP", tone: "bg-white/40", y1: 0, y2: 6, y3: 12 },
  { name: "Vendor agnostic", tone: "bg-fuchsia-400", y1: 10, y2: 6, y3: 8 },
];

const BY_MARKET: { name: string; y1: number; y2: number; y3: number; line: string }[] = [
  { name: "UK · the network", y1: 80, y2: 55, y3: 40, line: "TCN, FXP and REPL alumni. Warm, and most of year one." },
  { name: "UK · vendor referred", y1: 5, y2: 20, y3: 25, line: "Account teams send the gap once we are a name they can refer." },
  { name: "UK · direct", y1: 10, y2: 15, y3: 20, line: "One named offer per platform. From Q2 year one, a seller behind it from year two." },
  { name: "South Africa", y1: 5, y2: 10, y3: 15, line: "Doug’s accounts, and the cheaper build seat." },
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
          From now to January, then three years from mid January. What goes in, when it comes back,
          who we hire and when, where the revenue comes from, and what the studio is worth at each year
          end. Indicative throughout. The assumptions are on one slide so they can be argued with.
        </p>
        <p
          className="deck-rise mx-auto mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40"
          style={{ animationDelay: "1.05s" }}
        >
          £0.4m · £1.2m · £2.5m. Paid back in year two.
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
    title: "Before I join",
    tone: "notice",
    lines: [
      "Hand jalipi to QTC. Read how the vendors extend.",
      "The model and the hiring plan, with Chris.",
      "Nothing spent. Nothing sold.",
    ],
    end: "Two founders ready on day one.",
  },
  {
    when: "Year one",
    title: "Prove the shape",
    tone: "year",
    lines: [
      "Graham and Doug. Two builders, hired against signed work.",
      "Four builds. Listed on Dayforce, UKG and RELEX.",
      "First support lines. Cash draw peaks mid-year.",
    ],
    end: "£0.4m revenue · 5 people · £0.1m ARR",
  },
  {
    when: "Year two",
    title: "Repeat it",
    tone: "year",
    lines: [
      "A seller on the direct channel. Vendor referrals arrive.",
      "Ten builds. First licensed app on a second tenant.",
      "Investment paid back in Q3.",
    ],
    end: "£1.2m revenue · 9 people · £0.4m ARR",
  },
  {
    when: "Year three",
    title: "Choose",
    tone: "year",
    lines: [
      "Three platform leads. Two builders each. RELEX live.",
      "Eighteen builds. Licences and support carry a third of revenue.",
      "A business someone would buy, or one worth keeping.",
    ],
    end: "£2.5m revenue · 14 people · £0.9m ARR",
  },
];

function ShapeSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="The shape of it"
          title="Prove it, repeat it,"
          highlight="then choose."
          lede="A studio that pays for itself by year two and is worth a decision by year three. The numbers are indicative and rounded."
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

type Hire = { when: string; who: string; why: string; tone: "founder" | "builder" | "seller" | "lead" };

const HIRES: Hire[] = [
  { when: "Y1 Q1", who: "Graham and Doug", why: "Two founders. Build, and vendors and accounts.", tone: "founder" },
  { when: "Y1 Q2", who: "Builder 1", why: "Against signed work. UK or South Africa.", tone: "builder" },
  { when: "Y1 Q3", who: "Builder 2", why: "Once the support line can carry them.", tone: "builder" },
  { when: "Y1 Q4", who: "Seller", why: "When support covers a salary, or the network runs short.", tone: "seller" },
  { when: "Y2 Q1", who: "Builders 3 and 4", why: "Second platform team. Dayforce and UKG each get a pair.", tone: "builder" },
  { when: "Y2 Q3", who: "Platform lead · RELEX", why: "Once the pilot is live and Inference Group have agreed the line.", tone: "lead" },
  { when: "Y2 Q4", who: "Builder 5 · ops", why: "Contracts, support desk, renewals. TCN shared ops until here.", tone: "builder" },
  { when: "Y3", who: "Five more", why: "Two leads, three builders. A second seller if direct is a third of new work.", tone: "lead" },
];

const HIRE_TONE: Record<Hire["tone"], string> = {
  founder: "border-amber-400/40 bg-amber-500/15 text-amber-100",
  builder: "border-teal-400/40 bg-teal-500/15 text-teal-100",
  seller: "border-sky-400/40 bg-sky-500/15 text-sky-100",
  lead: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
};

function PeopleSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="People"
          title="Two, then five,"
          highlight="then nine, then fourteen."
          lede="Every hire follows the work. Builders arrive against a signed job. The seller arrives when the recurring base pays a salary. Leads arrive when a platform has two builders to lead."
        />
        <div className="mt-5 grid grid-cols-[1fr_17rem] gap-5">
          <div className="deck-rise overflow-hidden rounded-2xl border border-white/10 bg-white/5" style={{ animationDelay: "0.15s" }}>
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
                  <th className="w-[13%] px-3 py-1.5">When</th>
                  <th className="w-[30%] px-3 py-1.5">Who</th>
                  <th className="px-3 py-1.5">Why then</th>
                </tr>
              </thead>
              <tbody>
                {HIRES.map((hire) => (
                  <tr key={hire.when + hire.who} className="border-t border-white/10 align-top">
                    <td className="px-3 py-1.5">
                      <span className={cn("inline-block rounded-full border px-1.5 text-[8.5px] font-bold uppercase leading-[15px] tracking-[0.12em]", HIRE_TONE[hire.tone])}>
                        {hire.when}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-[11px] font-bold leading-snug text-white">{hire.who}</td>
                    <td className="px-3 py-1.5 text-[10.5px] leading-snug text-white/75">{hire.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3">
            {YEARS.map((year, index) => (
              <div
                key={year.key}
                className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{year.label} · year end</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[30px] font-black leading-none tracking-tight text-white">{HEADCOUNT[year.key]}</span>
                  <span className="text-[11px] text-white/60">people</span>
                </div>
                <p className="mt-1 text-[10.5px] leading-snug text-white/65">
                  {year.key === "y1" && "Two founders, two builders, a seller."}
                  {year.key === "y2" && "Plus a RELEX lead, two builders, ops."}
                  {year.key === "y3" && "Three platform teams and a sales pair."}
                </p>
              </div>
            ))}
            <p className="px-1 text-[10px] leading-snug text-white/45">
              Cost per head is on the assumptions slide. South Africa seats cost roughly half a UK seat.
            </p>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function RevenueSlide() {
  const lines: { key: keyof typeof REVENUE; label: string; tone: string }[] = [
    { key: "builds", label: "Fixed-scope builds", tone: "bg-teal-400" },
    { key: "support", label: "Annual support", tone: "bg-emerald-400" },
    { key: "licences", label: "Licensed apps", tone: "bg-amber-400" },
    { key: "agnostic", label: "Vendor agnostic", tone: "bg-fuchsia-400" },
  ];
  const max = TOTAL.y3;
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Revenue"
          title="Builds pay the bills."
          highlight="Support and licences make it worth something."
          lede="Indicative, £k. Builds at a mid £80k. Support at 20 to 25% of the build, starting the quarter after go-live. Licences only where a platform allows an app to be sold to many tenants."
        />
        <div className="mt-5 grid grid-cols-[1fr_22rem] gap-5">
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-4" style={{ animationDelay: "0.15s" }}>
            <div className="grid grid-cols-3 gap-6">
              {YEARS.map((year) => (
                <div key={year.key} className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{year.label}</p>
                  <p className="mt-0.5 text-[26px] font-black leading-none tracking-tight">£{(TOTAL[year.key] / 1000).toFixed(1)}m</p>
                  <div className="mt-3 flex h-[11.5rem] flex-col-reverse overflow-hidden rounded-lg bg-white/[0.04]">
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
                          {value >= 100 ? `£${value}k` : ""}
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[10.5px] leading-snug text-white/65">
                    {year.key === "y1" && "4 builds. Support starts. Small jobs on the side."}
                    {year.key === "y2" && "10 builds. First licences. Support on 14 live builds."}
                    {year.key === "y3" && "18 builds. Licences on two platforms. Support on 30."}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-2.5">
              {lines.map((line) => (
                <span key={line.key} className="inline-flex items-center gap-1.5 text-[10px] text-white/65">
                  <span className={cn("h-2 w-2 rounded-sm", line.tone)} />
                  {line.label}
                </span>
              ))}
            </div>
          </div>
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5" style={{ animationDelay: "0.3s" }}>
            <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">By platform · share of the year</p>
            <table className="mt-2 w-full border-collapse text-left">
              <thead>
                <tr className="text-[8.5px] font-black uppercase tracking-[0.15em] text-white/40">
                  <th className="py-1 pr-2" />
                  <th className="w-10 py-1 text-right">Y1</th>
                  <th className="w-10 py-1 text-right">Y2</th>
                  <th className="w-10 py-1 text-right">Y3</th>
                </tr>
              </thead>
              <tbody>
                {BY_PLATFORM.map((row) => (
                  <tr key={row.name} className="border-t border-white/10">
                    <td className="py-1.5 pr-2 text-[10.5px] text-white/80">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-sm", row.tone)} />
                        {row.name}
                      </span>
                    </td>
                    <td className="py-1.5 text-right text-[10.5px] tabular-nums text-white/70">{row.y1 ? `${row.y1}%` : "·"}</td>
                    <td className="py-1.5 text-right text-[10.5px] tabular-nums text-white/70">{row.y2}%</td>
                    <td className="py-1.5 text-right text-[10.5px] tabular-nums text-white/70">{row.y3}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[10px] leading-snug text-white/50">
              Dayforce and UKG carry the first two years. RELEX grows once the line with Inference Group is agreed. The rest arrive when a project pulls us in.
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
          title="The network first."
          highlight="Then the vendors sell for us."
          lede="Share of each year’s new work by route. UK stays the base. South Africa grows with Doug, and it is where the cheaper build capacity sits."
        />
        <div className="mt-6 space-y-3">
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

/** Cumulative cash, £k, by half year. Negative is money in from Chris and Thomas. */
const CASH: { when: string; inOut: number; cumulative: number; note: string }[] = [
  { when: "Y1 H1", inOut: -300, cumulative: -300, note: "Two founders, first builder, no support yet." },
  { when: "Y1 H2", inOut: -50, cumulative: -350, note: "The peak. Four builds invoiced, five people." },
  { when: "Y2 H1", inOut: 100, cumulative: -250, note: "Ten builds a year. Support on fourteen." },
  { when: "Y2 H2", inOut: 250, cumulative: 0, note: "Paid back in Q3. First licences." },
  { when: "Y3 H1", inOut: 300, cumulative: 300, note: "Three platform teams." },
  { when: "Y3 H2", inOut: 300, cumulative: 600, note: "A third of revenue recurring." },
];

function CashSlide() {
  const scale = 700;
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="Cash"
          title="£350k in at the peak."
          highlight="Back in the second half of year two."
          lede="Indicative, £k, cumulative. The draw is an overdraft from Chris and Thomas rather than a round. It peaks at the end of year one and is repaid inside year two."
        />
        <div className="mt-5 grid grid-cols-[1fr_20rem] gap-5">
          <div className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-4" style={{ animationDelay: "0.15s" }}>
            <div className="grid grid-cols-6 gap-3">
              {CASH.map((point) => {
                const positive = point.cumulative >= 0;
                const height = (Math.abs(point.cumulative) / scale) * 100;
                return (
                  <div key={point.when} className="flex flex-col">
                    <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-white/45">{point.when}</p>
                    <div className="relative mt-2 h-[10rem]">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                      <div
                        className={cn(
                          "absolute inset-x-1 rounded-md",
                          positive ? "bottom-1/2 bg-gradient-to-t from-teal-500 to-emerald-400" : "top-1/2 bg-gradient-to-b from-amber-500 to-orange-400",
                        )}
                        style={{ height: `${height / 2}%` }}
                      />
                      <span
                        className={cn(
                          "absolute inset-x-0 text-center text-[11px] font-black tabular-nums",
                          positive ? "text-teal-100" : "text-amber-100",
                        )}
                        style={positive ? { bottom: `calc(50% + ${height / 2}% + 4px)` } : { top: `calc(50% + ${height / 2}% + 4px)` }}
                      >
                        {point.cumulative === 0 ? "£0" : `${point.cumulative > 0 ? "+" : "−"}£${Math.abs(point.cumulative)}k`}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] leading-snug text-white/60">{point.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Peak investment", value: "£350k", note: "End of year one. Salaries ahead of support." },
              { label: "Payback", value: "Y2 Q3", note: "Cumulative cash back to zero." },
              { label: "Cash at end of Y3", value: "+£600k", note: "After repaying the draw. Before any dividend." },
            ].map((item, index) => (
              <div
                key={item.label}
                className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{item.label}</p>
                <p className="mt-0.5 text-[26px] font-black leading-none tracking-tight">{item.value}</p>
                <p className="mt-1 text-[10.5px] leading-snug text-white/65">{item.note}</p>
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
  mrr: string;
  services: string;
  recurring: string;
  blended: string;
}[] = [
  { key: "y1", revenue: "£0.4m", arr: "£0.1m", mrr: "£8k", services: "£0.4 – 0.6m", recurring: "£0.4 – 0.6m", blended: "£0.5m" },
  { key: "y2", revenue: "£1.2m", arr: "£0.4m", mrr: "£33k", services: "£1.2 – 1.8m", recurring: "£1.6 – 2.4m", blended: "£2m" },
  { key: "y3", revenue: "£2.5m", arr: "£0.9m", mrr: "£75k", services: "£2.5 – 3.8m", recurring: "£3.6 – 5.4m", blended: "£4 – 5m" },
];

function ValueSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-6xl">
        <SlideHeading
          kicker="What it is worth"
          title="Services sell at revenue."
          highlight="Recurring sells at four to six times."
          lede="Two ways to value the same studio. A buyer pays 1 to 1.5 times revenue for a services firm, and 4 to 6 times ARR for recurring software. The licences move us from the first column to the second."
        />
        <div className="deck-rise mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5" style={{ animationDelay: "0.15s" }}>
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="text-[9.5px] font-black uppercase tracking-[0.16em] text-white/45">
                <th className="w-[15%] px-4 py-2">Year end</th>
                <th className="w-[12%] px-4 py-2">Revenue</th>
                <th className="w-[12%] px-4 py-2">ARR</th>
                <th className="w-[11%] px-4 py-2">MRR</th>
                <th className="w-[17%] px-4 py-2">As services · 1 – 1.5× rev</th>
                <th className="w-[17%] px-4 py-2">As recurring · 4 – 6× ARR</th>
                <th className="px-4 py-2">Indicative</th>
              </tr>
            </thead>
            <tbody>
              {VALUE.map((row) => {
                const year = YEARS.find((y) => y.key === row.key)!;
                return (
                  <tr key={row.key} className="border-t border-white/10">
                    <td className="px-4 py-3 text-[13px] font-black tracking-tight text-white">{year.label}</td>
                    <td className="px-4 py-3 text-[15px] font-bold tabular-nums text-white">{row.revenue}</td>
                    <td className="px-4 py-3 text-[15px] font-bold tabular-nums text-emerald-200">{row.arr}</td>
                    <td className="px-4 py-3 text-[12px] tabular-nums text-white/70">{row.mrr}</td>
                    <td className="px-4 py-3 text-[12px] tabular-nums text-white/75">{row.services}</td>
                    <td className="px-4 py-3 text-[12px] tabular-nums text-white/75">{row.recurring}</td>
                    <td className="px-4 py-3 text-[17px] font-black tabular-nums tracking-tight text-amber-200">{row.blended}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="deck-rise mt-4 grid grid-cols-3 gap-4" style={{ animationDelay: "0.35s" }}>
          {[
            { title: "Why ARR matters", body: "A build is sold once. Support and licences are sold every year. By year three a third of revenue recurs, and that is what a buyer pays a multiple for." },
            { title: "Where the licences come from", body: "Dayforce and Workday allow an app to be sold to many tenants. A pattern built once on a customer’s money becomes a product we license per tenant per year." },
            { title: "What moves the number", body: "Every point of recurring revenue is worth four times a point of build revenue. The plan trades some build margin in year two for licences in year three." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-white/45">{item.title}</p>
              <p className="mt-1 text-[10.5px] leading-snug text-white/70">{item.body}</p>
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
      "Fixed-scope build £40k to £120k. Modelled at a mid £80k.",
      "Builds a year: 4, 10, 18. Each builder pair ships six a year once settled.",
      "Support at 20 to 25% of the build, from the quarter after go-live. 90% renew.",
      "Licences from year two on Dayforce, later Workday. £15 to 30k per tenant per year.",
      "Vendor-agnostic work at roughly a tenth of revenue.",
    ],
  },
  {
    group: "Spending",
    items: [
      "Founders at a modest salary in year one, market from year two.",
      "UK builder around £90k loaded. South Africa around half that.",
      "Seller on base plus commission. Commission out of margin, not the draw.",
      "Cost base £0.62m, £1.05m, £1.9m. Gross margin on builds about 55%.",
      "TCN shared ops carry contracts, finance and HR until an ops hire in year two.",
    ],
  },
  {
    group: "Not in the model",
    items: [
      "Any jalipi revenue beyond time billed to QTC.",
      "Workday, SAP, Oracle or ADP before a project asks.",
      "A second office, or anyone hired ahead of signed work.",
      "Interest on the draw. Tax. Dividends.",
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
        <div className="mt-5 grid grid-cols-3 gap-4">
          {ASSUMPTIONS.map((group, index) => (
            <div
              key={group.group}
              className="deck-rise rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-200/80">{group.group}</p>
              <ul className="mt-2.5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[11px] leading-snug text-white/78">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-4 text-center text-[10.5px] text-white/50" style={{ animationDelay: "0.5s" }}>
          The arithmetic: revenue less cost gives the cash line. Support and licences at year end give ARR. Multiples give the value.
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
      value: "£4 – 5m",
      lines: [
        "A services studio with £0.9m recurring, three platform teams, and referenceable customers on Dayforce, UKG and RELEX.",
        "Buyers: a systems integrator wanting a build capability, a vendor wanting a partner in house, or TCN consolidating it.",
        "Founders and Chris and Thomas take the return. Doug’s stake and any seller stake vest into it.",
      ],
      good: "Clean exit in year three at a services-plus multiple.",
    },
    {
      title: "Double down",
      tone: "border-teal-400/30 bg-teal-500/[0.08]",
      label: "text-teal-200/80",
      value: "£0.9m ARR → £2m+",
      lines: [
        "Turn the licensed apps into the business. Two or three products sold per tenant on Dayforce and Workday, with builds as the front door.",
        "Reinvest year three cash. Hire product, not more builders. Take a round if the ARR growth justifies one.",
        "Aim for recurring at half of revenue by year five, and a valuation on ARR rather than revenue.",
      ],
      good: "A software company by year five, worth four to six times ARR.",
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
          lede="The plan is built so both are real choices at the end of year three. The investment is back. The studio stands up without any one of us. What is left is a decision about what to do with it."
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
