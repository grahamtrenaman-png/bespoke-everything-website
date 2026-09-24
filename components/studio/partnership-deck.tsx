"use client";

import { useMemo } from "react";
import { Handshake, Lock, Puzzle, CircleDollarSign, type LucideIcon } from "lucide-react";

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
      "Pay Bespoke Everything for any extension work. None is anticipated after January.",
    ],
    gets: "A product they can sell, extended without hiring a studio.",
  },
  {
    role: "The studio",
    name: "Bespoke Everything",
    tone: "border-teal-400/30 bg-teal-500/[0.07]",
    does: [
      "Build the thing jalipi will not do, billed to QTC, fixed price.",
      "The same studio builds on Dayforce, UKG and the rest. jalipi is one platform.",
      "Nothing on the side. jalipi time after January is a QTC invoice, or it does not happen.",
    ],
    gets: "Paid work when QTC has a customer, and a founder who keeps a stake in the product.",
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
  { step: "02", who: "FXP", line: "Implements it. Discovery, configuration, go-live. Their fee." },
  { step: "03", who: "BE", line: "Builds the extension the product will not do. Fixed price, invoiced to QTC." },
  { step: "04", who: "QTC", line: "Hosts and supports the core. A small kickback to BE is proposed, and not agreed." },
];

const AGREED: string[] = [
  "QTC develop and harden jalipi. I keep a stake. The size of that stake is still to write down.",
  "FXP implements. Bespoke Everything does not implement jalipi.",
  "From January, jalipi time is billed by Bespoke Everything to QTC. None is anticipated.",
  "The studio’s year does not depend on jalipi. Dayforce and UKG are the work.",
];

const OPEN: string[] = [
  "The stake: how much, in what, vesting, and what happens if QTC sells jalipi.",
  "The kickback: a low single-digit share of QTC’s jalipi deals. Proposed, not agreed.",
  "Heads of terms before I join, so the handover is a document and not a conversation.",
  "Who owns an extension built for one jalipi customer, and whether it can be licensed again.",
];

const PRINCIPLES: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: "jalipi stays QTC’s platform. My stake is in that, not a second product company." },
  { icon: Puzzle, text: "Extensions are Bespoke Everything work. Always invoiced. Never on the side." },
  { icon: Handshake, text: "FXP implements. We build. QTC sells and hosts." },
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
          QuickThink Cloud develop and harden jalipi. I keep a stake. FrontlineXP implements it.
          Bespoke Everything builds the extensions and invoices QTC. TCN owns the studio, not the
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
          lede="QTC sells the platform. FXP implements it. Bespoke Everything builds the gap and bills QTC. Nobody does two of those jobs."
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
          The kickback, if agreed, is a low single-digit share of QTC’s jalipi deal. It is not in the
          studio plan as committed revenue. The extension invoice is.
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
    { when: "Now → mid Jan", line: "Hand jalipi to QTC. Their developer hardens it. Write down the stake and the kickback, or write down that the kickback waits." },
    { when: "January", line: "I join Bespoke Everything. Any jalipi hour after that is an invoice from the studio to QTC. Nothing on the side." },
    { when: "After that", line: "FXP implements jalipi as a vendor product. We extend it when QTC asks, the same way we extend Dayforce when Chris asks." },
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Before I join"
          title="A clean handover."
          highlight="Then a commercial relationship."
          lede="The three months are for this, and for reading how the other vendors extend. Not for building jalipi on the side."
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
    { id: "partner-terms", section: "Terms", gradient: "from-teal-400 via-amber-400 to-amber-300", node: <TermsSlide /> },
    { id: "partner-handover", section: "Handover", gradient: "from-amber-400 via-teal-400 to-emerald-400", node: <HandoverSlide /> },
  ];
}

export function PartnershipDeck() {
  const slides = useMemo(() => buildPartnershipSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
