"use client";

import { useMemo } from "react";
import { Handshake, Lock, Puzzle, CircleDollarSign, DoorOpen, Search, type LucideIcon } from "lucide-react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { BespokeBrandedSlide } from "@/components/studio/slide-chrome";
import {
  Glows,
  SlideHeading,
  StudioSetupDeck,
  type DeckSlide,
} from "@/components/studio/studio-setup-deck";
import { cn } from "@/lib/cn";

const PARTIES: {
  role: string;
  name: string;
  tone: string;
  does: string[];
  gets: string;
}[] = [
  {
    role: "The product",
    name: "QuickThink Cloud",
    tone: "border-sky-400/30 bg-sky-500/[0.07]",
    does: [
      "Develop and harden jalipi. Host it, wrap it, carry the indemnities.",
      "Bring the engagement. Public sector is theirs to open.",
      "Sell the licence to the customer. They do not sit between FXP or BE and that invoice.",
    ],
    gets: "A product they can sell, extended without hiring a studio.",
  },
  {
    role: "The studio",
    name: "Bespoke Everything",
    tone: "border-teal-400/30 bg-teal-500/[0.07]",
    does: [
      "Build the thing jalipi will not do. Fixed price, invoiced to the customer.",
      "The same studio builds on Dayforce, UKG and the rest. jalipi is one platform.",
      "Nothing on the side. Product time for QTC, if any, is a separate invoice, and none is anticipated.",
    ],
    gets: "A customer invoice for the extension, and a founder who keeps a stake in the product.",
  },
  {
    role: "The investors",
    name: "TCN",
    tone: "border-amber-400/30 bg-amber-500/[0.07]",
    does: [
      "Fund the studio. Chris and Thomas. The £200k overdraft is the facility.",
      "Open the Dayforce and UKG doors. Coach the founders.",
      "FXP implements jalipi the way they implement any vendor.",
    ],
    gets: "A studio. The jalipi upside sits with Graham’s stake, not in the studio’s P&L.",
  },
];

const FLOW: { step: string; who: string; line: string }[] = [
  { step: "01", who: "QTC", line: "Brings the customer and sells jalipi as the platform." },
  { step: "02", who: "FXP", line: "Implements it and invoices the customer for the services." },
  { step: "03", who: "BE", line: "Builds the extension the product will not do. Fixed price, invoiced to the customer." },
  { step: "04", who: "QTC", line: "Hosts and supports the core. A kickback, not yet agreed, goes to whoever brought the deal." },
];

const AGREED: string[] = [
  "QTC develop and harden jalipi. Graham keeps a stake. The size of that stake is still to write down.",
  "FXP invoices the customer for implementation. Bespoke Everything invoices the customer for extensions.",
  "Product time for QTC, after January, would be a separate invoice. None is anticipated.",
  "The studio’s year does not depend on jalipi. Dayforce and UKG are the work.",
];

const OPEN: string[] = [
  "The stake: how much, in what, vesting, and what happens if QTC sells jalipi.",
  "The kickback: paid to the sales originator. That can be FXP, Bespoke Everything, or another TCN company. Rate not agreed.",
  "Heads of terms before Graham joins, so the handover is a document and not a conversation.",
  "Who owns an extension built for one jalipi customer, and whether it can be licensed again.",
];

const PRINCIPLES: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: "jalipi stays QTC’s platform. Graham’s stake is in that, not a second product company." },
  { icon: Puzzle, text: "Extensions are Bespoke Everything work. Always invoiced. Never on the side." },
  { icon: Handshake, text: "FXP implements. Bespoke Everything builds. QTC sells and hosts." },
  { icon: CircleDollarSign, text: "A jalipi win pays three parties in three different ways." },
];

function TitleSlide() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <div className="deck-drift pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-sky-600/20 blur-3xl" />
      <div
        className="deck-drift pointer-events-none absolute -right-40 bottom-1/5 h-[34rem] w-[34rem] rounded-full bg-amber-600/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
      <div className="relative max-w-4xl px-8 text-center">
        <div className="deck-rise flex flex-col items-center gap-3" style={{ animationDelay: "0.2s" }}>
          <BespokeEverythingLogo variant="dark" showTagline={false} className="text-lg" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
            The partnership · QTC, Bespoke Everything and TCN
          </p>
        </div>
        <h1
          className="deck-rise mt-8 text-5xl font-black leading-tight tracking-tight"
          style={{ animationDelay: "0.55s" }}
        >
          One product.{" "}
          <span className="bg-gradient-to-r from-sky-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Three ways to get paid.
          </span>
        </h1>
        <p
          className="deck-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65"
          style={{ animationDelay: "0.85s" }}
        >
          QuickThink Cloud develop and harden jalipi. Graham keeps a stake. FrontlineXP implements it.
          Bespoke Everything builds the extensions and invoices the customer. TCN owns the studio, not the
          product. This is the shape to agree before January.
        </p>
      </div>
    </div>
  );
}

function PartiesSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-5 w-full max-w-6xl">
        <SlideHeading
          kicker="Who does what"
          title="QTC gets a product."
          highlight="TCN gets a studio."
          lede="Two vehicles on purpose. jalipi is not the studio, and the studio is not a jalipi reseller."
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {PARTIES.map((party, index) => (
            <div
              key={party.name}
              className={cn("deck-rise flex flex-col rounded-2xl border p-4", party.tone)}
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{party.role}</p>
              <h3 className="mt-1 text-[20px] font-black leading-tight tracking-tight">{party.name}</h3>
              <ul className="mt-3 flex-1 space-y-1.5">
                {party.does.map((line) => (
                  <li key={line} className="flex gap-2 text-[11px] leading-snug text-white/78">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/10 pt-2 text-[11px] font-semibold leading-snug text-white/90">
                {party.gets}
              </p>
            </div>
          ))}
        </div>
        <div className="deck-rise mt-3 grid grid-cols-4 gap-3" style={{ animationDelay: "0.5s" }}>
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                <p className="text-[10.5px] leading-snug text-white/75">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function FlowSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="A jalipi deal"
          title="Four steps."
          highlight="Three invoices."
          lede="QTC sells the platform. FXP invoices the customer for services. Bespoke Everything invoices the customer for the extension. Nobody does two of those jobs."
        />
        <div className="relative mt-8 grid grid-cols-4 gap-4">
          <span className="pointer-events-none absolute left-[12%] right-[12%] top-[1.35rem] h-px bg-gradient-to-r from-sky-400/50 via-teal-400/50 to-amber-400/50" />
          {FLOW.map((item, index) => (
            <div
              key={item.step}
              className="deck-rise text-center"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <span className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-[13px] font-black ring-4 ring-neutral-950">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  {item.step}
                </span>
              </span>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-teal-200/80">{item.who}</p>
              <p className="mt-2 text-[13px] leading-snug text-white/75">{item.line}</p>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-8 text-center text-[12px] leading-relaxed text-white/55" style={{ animationDelay: "0.6s" }}>
          The kickback, if agreed, is paid to the sales originator: FXP if they found it, Bespoke Everything, or another TCN company. It is not committed revenue. The extension invoice, to the customer, is.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

function WiderSlide() {
  const sides: { icon: LucideIcon; way: string; who: string; tone: string; lines: string[] }[] = [
    {
      icon: DoorOpen,
      way: "QTC opens doors",
      who: "For the TCN companies",
      tone: "border-sky-400/25 bg-sky-500/[0.07]",
      lines: [
        "Public sector is a market QTC already sits in.",
        "They can open those doors for FrontlineXP, and for the other TCN companies.",
        "An introduction, where QTC has the relationship and a TCN company has the service.",
      ],
    },
    {
      icon: Search,
      way: "TCN finds the work",
      who: "For QTC",
      tone: "border-amber-400/25 bg-amber-500/[0.07]",
      lines: [
        "FrontlineXP, Bespoke Everything and the other TCN companies sit with customers QTC does not.",
        "They can identify opportunities for jalipi.",
        "The same conversations can surface work for QTC’s other products.",
      ],
    },
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Beyond one product"
          title="A wider relationship."
          highlight="Both ways."
          lede="jalipi is the reason to write this down. The working relationship between QTC and TCN can be larger than one platform."
        />
        <div className="mt-5 grid grid-cols-2 gap-4">
          {sides.map((side, index) => {
            const Icon = side.icon;
            return (
              <div
                key={side.way}
                className={cn("deck-rise rounded-2xl border px-5 py-4", side.tone)}
                style={{ animationDelay: `${0.15 + index * 0.12}s` }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-white/70" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{side.who}</p>
                    <h3 className="text-[18px] font-black leading-tight tracking-tight">{side.way}</h3>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {side.lines.map((line) => (
                    <li key={line} className="flex gap-2 text-[13px] leading-snug text-white/80">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="deck-rise mt-4 text-center text-[12px] leading-relaxed text-white/55" style={{ animationDelay: "0.45s" }}>
          Possible. It belongs in the same conversation as the heads of terms.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

function TermsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Heads of terms"
          title="Four things are settled."
          highlight="Four are not."
          lede="Enough to hand jalipi over cleanly. Not enough to leave the economics in a conversation."
        />
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="deck-rise rounded-2xl border border-teal-400/25 bg-teal-500/[0.07] px-5 py-4" style={{ animationDelay: "0.15s" }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-200/80">Settled in this plan</p>
            <ul className="mt-3 space-y-2.5">
              {AGREED.map((line) => (
                <li key={line} className="flex gap-2 text-[12px] leading-snug text-white/80">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-300" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="deck-rise rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] px-5 py-4" style={{ animationDelay: "0.28s" }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/80">Still to agree, with QTC</p>
            <ul className="mt-3 space-y-2.5">
              {OPEN.map((line) => (
                <li key={line} className="flex gap-2 text-[12px] leading-snug text-white/80">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function HandoverSlide() {
  const rows = [
    { when: "Now → mid Jan", line: "jalipi is handed to QTC. Their developer hardens it. The stake and the kickback are written down, or the kickback is written down as waiting." },
    { when: "January", line: "Graham joins Bespoke Everything. Customer work is invoiced to the customer. Nothing on the side." },
    { when: "After that", line: "FXP implements and invoices for services. Bespoke Everything extends and invoices the customer, the same way it invoices a Dayforce customer." },
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Before Graham joins"
          title="A clean handover."
          highlight="Then a commercial relationship."
          lede="The three months are for this, and for Graham to read how the other vendors extend. Not for building jalipi on the side."
        />
        <div className="mt-6 space-y-3">
          {rows.map((row, index) => (
            <div
              key={row.when}
              className="deck-rise grid grid-cols-[14rem_1fr] items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <p className="text-[12px] font-black uppercase tracking-[0.14em] text-white/70">{row.when}</p>
              <p className="text-[13px] leading-snug text-white/80">{row.line}</p>
            </div>
          ))}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function buildPartnershipSlides(): DeckSlide[] {
  return [
    { id: "partner-title", section: "Open", gradient: "from-sky-400 via-teal-400 to-amber-400", node: <TitleSlide /> },
    { id: "partner-parties", section: "Who", gradient: "from-sky-400 via-teal-400 to-amber-400", node: <PartiesSlide /> },
    { id: "partner-flow", section: "A deal", gradient: "from-teal-400 via-emerald-400 to-sky-400", node: <FlowSlide /> },
    { id: "partner-wider", section: "Wider", gradient: "from-sky-400 via-amber-400 to-teal-400", node: <WiderSlide /> },
    { id: "partner-terms", section: "Terms", gradient: "from-teal-400 via-amber-400 to-amber-300", node: <TermsSlide /> },
    { id: "partner-handover", section: "Handover", gradient: "from-amber-400 via-teal-400 to-emerald-400", node: <HandoverSlide /> },
  ];
}

export function PartnershipDeck() {
  const slides = useMemo(() => buildPartnershipSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
