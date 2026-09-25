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

type PartyId = "qtc" | "be" | "tcn";

const PARTIES: {
  id: PartyId;
  role: string;
  name: string;
  tone: string;
  does: string[];
  gets: string;
}[] = [
  {
    id: "qtc",
    role: "The product company",
    name: "QuickThink Cloud",
    tone: "border-sky-400/30 bg-sky-500/[0.07]",
    does: [
      "Open doors into public sector for FrontlineXP and the other TCN companies.",
      "Bring products TCN can sell and implement, starting with jalipi.",
      "On jalipi: develop, harden, host, and sell the licence. They do not sit between FXP or BE and that invoice.",
    ],
    gets: "Introductions into accounts they do not sit in, and a studio that can extend what they sell.",
  },
  {
    id: "be",
    role: "The studio",
    name: "Bespoke Everything",
    tone: "border-teal-400/30 bg-teal-500/[0.07]",
    does: [
      "Build what the product will not do. Fixed price, invoiced to the customer.",
      "The same studio builds on Dayforce, UKG and the rest. jalipi is one platform among them.",
      "Nothing on the side. Product time for QTC, if any, is a separate invoice, and none is anticipated.",
    ],
    gets: "A customer invoice for the extension, and a founder who keeps a stake in jalipi.",
  },
  {
    id: "tcn",
    role: "The network",
    name: "TCN",
    tone: "border-amber-400/30 bg-amber-500/[0.07]",
    does: [
      "Fund the studio. Chris and Thomas. The £200k overdraft is the facility.",
      "Identify opportunities for jalipi and for QTC’s other products.",
      "FXP implements jalipi the way they implement any vendor.",
    ],
    gets: "A studio, public-sector doors through QTC, and product upside that sits with Graham’s stake, not in the studio’s P&L.",
  },
];

/** ~32px header marks. QTC/TCN from Atlas demo assets; BE uses the deck chrome logo mark. */
function PartyCardLogo({ party }: { party: PartyId }) {
  switch (party) {
    case "qtc":
      return (
        // Official QuickThink Cloud mark (sourced from quickthinkcloud.com via Atlas).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logos/quickthink-cloud.png"
          alt=""
          className="h-8 w-auto"
        />
      );
    case "be":
      return (
        <BespokeEverythingLogo
          variant="dark"
          layout="inline"
          showWordmark={false}
          showTagline={false}
          className="text-[28px]"
        />
      );
    case "tcn":
      return (
        // Official TCN wordmark (same asset as Atlas /demo/logos/tcn-white.svg).
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logos/tcn-white.svg" alt="" className="h-8 w-auto" />
      );
  }
}

const FLOW: { step: string; who: string; line: string }[] = [
  { step: "01", who: "QTC", line: "Brings the customer and sells jalipi as the platform." },
  { step: "02", who: "FXP", line: "Implements it and invoices the customer for the services." },
  { step: "03", who: "BE", line: "Builds the extension the product will not do. Fixed price, invoiced to the customer." },
  { step: "04", who: "QTC", line: "Hosts and supports the core. A kickback, not yet agreed, goes to whoever brought the deal." },
];

const PROPOSED: string[] = [
  "QTC and TCN work together both ways: doors for TCN companies, opportunities for QTC.",
  "QTC develop and harden jalipi. Graham keeps a stake. Size and terms are still to write down between Graham and QTC.",
  "FXP invoices the customer for implementation. Bespoke Everything invoices the customer for extensions.",
  "The studio’s year does not depend on jalipi. Dayforce and UKG are the work.",
];

const OPEN_PARTNERSHIP: string[] = [
  "The kickback: paid to the sales originator. That can be FXP, Bespoke Everything, or another TCN company. Rate not agreed.",
  "The heads of terms signed in principle before Graham starts. A draft is on the next slide.",
  "Who owns an extension built for one jalipi customer, and whether it can be licensed again.",
];

const PRINCIPLES: { icon: LucideIcon; text: string }[] = [
  { icon: Handshake, text: "The partnership is wider than jalipi. Doors one way, opportunities the other." },
  { icon: Lock, text: "jalipi stays QTC’s platform. Graham’s stake is in that, not a second product company." },
  { icon: Puzzle, text: "Extensions are Bespoke Everything work. Always invoiced. Never on the side." },
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
          A working partnership.{" "}
          <span className="bg-gradient-to-r from-sky-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            jalipi is one part of it.
          </span>
        </h1>
        <p
          className="deck-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65"
          style={{ animationDelay: "0.85s" }}
        >
          QuickThink Cloud and TCN can open doors for each other. QTC into public sector for FrontlineXP and
          the other TCN companies; TCN into accounts where jalipi, or another QTC product, fits. jalipi is the
          first concrete piece to write down: QTC harden it, Graham keeps a stake agreed with QTC, FXP
          implements, Bespoke Everything extends. This is the shape to agree before January.
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
          title="Three parties."
          highlight="One relationship."
          lede="QTC brings products and public-sector doors. TCN brings a network and a studio. jalipi is how the commercial model gets written down first."
        />
        <div className="mt-3 grid grid-cols-3 gap-4">
          {PARTIES.map((party, index) => (
            <div
              key={party.name}
              className={cn("deck-rise flex flex-col rounded-2xl border p-4", party.tone)}
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <div className="flex h-8 items-center" aria-hidden="true">
                <PartyCardLogo party={party.id} />
              </div>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{party.role}</p>
              <h3 className="mt-1 text-[20px] font-black leading-tight tracking-tight">{party.name}</h3>
              <ul className="mt-2.5 flex-1 space-y-1.5">
                {party.does.map((line) => (
                  <li key={line} className="flex gap-2 text-[11px] leading-snug text-white/78">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 border-t border-white/10 pt-2 text-[11px] font-semibold leading-snug text-white/90">
                {party.gets}
              </p>
            </div>
          ))}
        </div>
        <div className="deck-rise mt-2.5 grid grid-cols-4 gap-3" style={{ animationDelay: "0.5s" }}>
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
          kicker="The partnership"
          title="Both ways."
          highlight="Not one product."
          lede="The working relationship is introductions and opportunities in both directions. jalipi is the first place that relationship becomes a written commercial model."
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

function FlowSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="One concrete piece"
          title="A jalipi deal."
          highlight="Four steps. Three invoices."
          lede="This is how one product in the partnership is sold and paid for. QTC sells the platform. FXP invoices the customer for services. Bespoke Everything invoices the customer for the extension."
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

function TermsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Heads of terms"
          title="Four things are proposed."
          highlight="Three are not."
          lede="Enough to start the partnership and hand jalipi over cleanly. Not enough to leave the economics in a conversation."
        />
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="deck-rise rounded-2xl border border-teal-400/25 bg-teal-500/[0.07] px-5 py-4" style={{ animationDelay: "0.15s" }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-200/80">Proposed in this plan</p>
            <ul className="mt-3 space-y-2.5">
              {PROPOSED.map((line) => (
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
              {OPEN_PARTNERSHIP.map((line) => (
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

const HEADS: { n: string; head: string; lines: string[] }[] = [
  {
    n: "01",
    head: "Parties",
    lines: ["QuickThink Cloud. Graham Trenaman. Bespoke Everything, a TCN company. FrontlineXP where it implements."],
  },
  {
    n: "02",
    head: "jalipi",
    lines: [
      "QTC own, develop, harden, host and sell jalipi. Handover complete by mid January.",
      "Graham holds a stake of ___% in ___ (QTC, or a jalipi entity), vesting ___. On a sale of jalipi: ___. Agreed between Graham and QTC only; not a TCN term.",
    ],
  },
  {
    n: "03",
    head: "Extensions",
    lines: [
      "Bespoke Everything builds extensions for jalipi customers. Fixed price, invoiced to the customer.",
      "Product time for QTC is a separate invoice at £___ a day. None anticipated.",
    ],
  },
  {
    n: "04",
    head: "Implementation",
    lines: ["FXP implements jalipi as it would any vendor, and invoices the customer for the services."],
  },
  {
    n: "05",
    head: "Kickback",
    lines: [
      "QTC pay ___% of ___ (first-year licence, or ___) to the sales originator: FXP, Bespoke Everything, or another TCN company.",
      "Paid within ___ days of the customer paying QTC.",
    ],
  },
  {
    n: "06",
    head: "Extension IP",
    lines: ["An extension built for one jalipi customer is owned by ___. It may be licensed again by ___, on ___."],
  },
  {
    n: "07",
    head: "The wider relationship",
    lines: [
      "QTC introduces TCN companies into public sector accounts. TCN companies identify opportunities for jalipi and QTC’s other products.",
      "Non-exclusive. Any fee is agreed per deal.",
    ],
  },
  {
    n: "08",
    head: "Term and exit",
    lines: [
      "Reviewed annually.",
      "Graham’s stake if QTC is sold: ___ (Graham and QTC). The kickback if QTC is sold, or if Graham leaves Bespoke Everything: ___.",
    ],
  },
];

function HeadsOfTermsSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-4 w-full max-w-6xl">
        <SlideHeading
          kicker="Heads of terms"
          title="A draft."
          highlight="The blanks are the conversation."
          lede="One page, not a contract. Everything that is proposed is written in. Everything that is not has a blank, so the QTC conversation is about filling them, not about whether to write them."
        />
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {HEADS.map((clause, index) => (
            <div
              key={clause.n}
              className="deck-rise flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <span className="w-5 shrink-0 text-[11px] font-black text-amber-300/80">{clause.n}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">{clause.head}</p>
                {clause.lines.map((line) => (
                  <p key={line} className="mt-0.5 text-[10.5px] leading-snug text-white/80">
                    {line.split(/(___)/).map((part, i) =>
                      part === "___" ? (
                        <span key={i} className="mx-0.5 inline-block min-w-[2.2rem] rounded border-b border-amber-300/70 align-baseline text-amber-200">
                          &nbsp;
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      ),
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-2.5 text-center text-[10.5px] text-white/50" style={{ animationDelay: "0.55s" }}>
          Signed in principle before Graham starts. The blanks are Graham’s stake (with QTC), the kickback, the IP and the exit. Nothing else is open.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

function HandoverSlide() {
  const rows = [
    { when: "Now → mid Jan", line: "Studio prep: platforms, the first job, and how Bespoke Everything plugs into FrontlineXP. In the same window, jalipi is handed to QTC, Graham’s stake is written down with QTC, and the partnership kickback is agreed." },
    { when: "January", line: "Graham joins Bespoke Everything. Customer work is invoiced to the customer. Nothing on the side." },
    { when: "After that", line: "Doors and opportunities both ways. On jalipi, FXP implements and Bespoke Everything extends, each invoicing the customer the same way they would for any other vendor." },
  ];
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="Before Graham joins"
          title="The studio gets ready."
          highlight="The terms get written down."
          lede="The months before January are studio prep: platforms, the first job, and how it plugs into FrontlineXP. The heads of terms are written in the same window."
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
    { id: "partner-wider", section: "Wider", gradient: "from-sky-400 via-amber-400 to-teal-400", node: <WiderSlide /> },
    { id: "partner-flow", section: "jalipi", gradient: "from-teal-400 via-emerald-400 to-sky-400", node: <FlowSlide /> },
    { id: "partner-terms", section: "Terms", gradient: "from-teal-400 via-amber-400 to-amber-300", node: <TermsSlide /> },
    { id: "partner-heads", section: "Heads", gradient: "from-amber-400 via-amber-300 to-teal-400", node: <HeadsOfTermsSlide /> },
    { id: "partner-handover", section: "Handover", gradient: "from-amber-400 via-teal-400 to-emerald-400", node: <HandoverSlide /> },
  ];
}

export function PartnershipDeck() {
  const slides = useMemo(() => buildPartnershipSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
