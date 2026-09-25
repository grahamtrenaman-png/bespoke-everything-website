"use client";

import { useMemo } from "react";
import { ArrowRight, Compass, Handshake, Landmark, Megaphone, Wrench, type LucideIcon } from "lucide-react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { BespokeBrandedSlide } from "@/components/studio/slide-chrome";
import {
  Glows,
  SlideHeading,
  StudioSetupDeck,
  type DeckSlide,
} from "@/components/studio/studio-setup-deck";
import { cn } from "@/lib/cn";

type SeatTone = "cofounder" | "potential" | "hire" | "discuss";

type SeatSpec = {
  id: string;
  icon: LucideIcon;
  tone: SeatTone;
  kicker: string;
  title: string;
  highlight: string;
  lede: string;
  summary: string;
  owns: string[];
  job: string[];
  good: string[];
  fits: string[];
  terms: string[];
  trigger: string;
  not: string;
};

const TONE: Record<
  SeatTone,
  { ring: string; pill: string; card: string; label: string; bar: string; badge: string }
> = {
  cofounder: {
    ring: "bg-gradient-to-br from-amber-500 to-orange-400 text-white",
    pill: "border-amber-400/40 bg-amber-500/20 text-amber-100",
    card: "border-amber-400/25 bg-amber-500/[0.07]",
    label: "text-amber-200/80",
    bar: "from-amber-400 to-orange-300",
    badge: "Co-founder",
  },
  potential: {
    ring: "bg-gradient-to-br from-sky-500 to-indigo-400 text-white",
    pill: "border-sky-400/40 bg-sky-500/20 text-sky-100",
    card: "border-sky-400/25 bg-sky-500/[0.07]",
    label: "text-sky-200/80",
    bar: "from-sky-400 to-indigo-300",
    badge: "Potential co-founder",
  },
  hire: {
    ring: "bg-gradient-to-br from-teal-500 to-emerald-500 text-white",
    pill: "border-teal-400/40 bg-teal-500/20 text-teal-100",
    card: "border-teal-400/25 bg-teal-500/[0.07]",
    label: "text-teal-200/80",
    bar: "from-teal-400 to-emerald-300",
    badge: "Hire",
  },
  discuss: {
    ring: "bg-gradient-to-br from-violet-500 to-fuchsia-400 text-white",
    pill: "border-violet-400/40 bg-violet-500/20 text-violet-100",
    card: "border-violet-400/25 bg-violet-500/[0.07]",
    label: "text-violet-200/80",
    bar: "from-violet-400 to-fuchsia-300",
    badge: "To discuss",
  },
};

const GRAHAM: SeatSpec = {
  id: "graham",
  icon: Compass,
  tone: "cofounder",
  kicker: "Co-founder · solutions and delivery · from January",
  title: "Graham.",
  highlight: "What we build, and what it costs.",
  lede: "Scopes, prices and builds. Proves the first pattern on a platform, then hands the repeat to a builder.",
  summary:
    "Graham runs solutions and delivery. He decides what the studio builds and on which platforms, scopes and prices every job, builds the first version of each pattern himself, then hires and coaches the builders who ship it again.",
  owns: [
    "The scope and the price of every build.",
    "Whether a pattern is good enough to ship again.",
    "Delivering the solutions, at least until there is a builder.",
  ],
  job: [
    "Scope and price every engagement. Fixed price, invoiced to the customer.",
    "Build the first pattern on a platform, then hand the repeat to a builder.",
    "Choose the platforms we build on, and what we will not build.",
    "Hold quality until a builder owns the line: tenant, handover, support renewal.",
    "Price with Doug, and later with the seller. Hold the scope line in the room.",
    "Build the first job himself. Hire and coach the builders once there is pipeline behind it.",
  ],
  good: [
    "The first job live inside the first quarter, on price.",
    "A pattern on Dayforce and one on UKG that a builder ships again without Graham.",
    "Fourteen builds in year one, none of them over scope without a change order.",
  ],
  fits: [
    "Creative problem solver who sits with a client, understands what is stuck, and turns it into options and a clear proposal.",
    "Technical enough to choose the right approach: extend the platform, host beside it, or build from scratch.",
    "Holds the scope line, prices it, and hands a proven pattern to a builder.",
  ],
  terms: [
    "Co-founder from January. Salary about £100k, the same figure proposed for Doug.",
    "A stake in Bespoke Everything. Size and vesting still to write down.",
  ],
  trigger: "Starts when we start, mid January. Notice may still be being worked until then.",
  not: "Not the vendor relationships. That is Doug. Not creating a market from cold. That is the seller, when the seat opens. Not implementation that belongs to FXP.",
};

const DOUG: SeatSpec = {
  id: "doug",
  icon: Handshake,
  tone: "cofounder",
  kicker: "Co-founder · vendors and accounts · from January",
  title: "Doug.",
  highlight: "The person the account teams call.",
  lede: "Managing partners is the first sales job, and it is his. Warm only. Nothing goes out cold.",
  summary:
    "Doug runs vendors and accounts. He gets the studio listed and referred on Dayforce, UKG, Logile and RELEX, works the network with Chris, takes the first conversation on every warm lead, hands it to Graham to scope, and stays on the account through delivery and the support renewal. Based in South Africa, selling into UK and South African accounts.",
  owns: [
    "The vendor programmes we are listed on.",
    "The accounts the network already knows.",
    "Sales from the warm network. Introductions that close, not just conversations.",
    "The first conversation, through to the support renewal.",
  ],
  job: [
    "Own Dayforce, UKG, Logile through FXP, and RELEX once the Inference Group line is agreed. Get us listed, then get us referred.",
    "Be the referral. A stuck deal with a gap in it comes to Doug, from someone who already knows him.",
    "Run the network with Chris: TCN project gaps, REPL alumni, the retailers and manufacturers we already know.",
    "Qualify and shape the first conversation, then hand to Graham to scope and price. Close the sale.",
    "Stay on the account through delivery and the support renewal.",
    "Send the overnight note on who moved where. Only to someone who knows him.",
    "Open South Africa accounts alongside the UK ones.",
  ],
  good: [
    "Listed on Dayforce and UKG by the end of Q1.",
    "First vendor-referred job closed in Q2, and a South African account in the year.",
    "Sales in from the warm network in Q1, not only listings and conversations.",
    "Every first-year customer referenceable, and renewing support.",
  ],
  fits: [
    "Has long-standing relationships with vendor account teams.",
    "Trusted by account managers to take a stuck deal.",
    "Sells from relationships, not from cold lists.",
    "Knows the industry, the projects, and the kinds of problems customers hit.",
  ],
  terms: [
    "Co-founder stake in Bespoke Everything, on the terms agreed when this was the ADP partnership. Vesting still to write down.",
    "Salary about £100k, agreed at the same time and carried into the cash model.",
    "Based in South Africa, selling into UK and South African accounts. Travel when a deal needs a room.",
  ],
  trigger: "Starts when we start, mid January, alongside Graham.",
  not: "Not a hunter. Not creating a market from cold. Not delivery: FXP implements, we build. Not pricing: that sits with Graham.",
};

const SELLER: SeatSpec = {
  id: "seller",
  icon: Megaphone,
  tone: "potential",
  kicker: "Sales · direct channel · potential co-founder",
  title: "The seller.",
  highlight: "Creating the market.",
  lede: "Managing partners and creating a market are different jobs. This seat opens when the work says so.",
  summary:
    "The seller creates demand the network does not bring. They take what the first jobs have shown to buyers who have never heard of us, run a pipeline that can be forecast, quote fixed-scope builds with Graham and close them. Base plus commission, with a co-founder stake on the table if they join early and carry the direct channel.",
  owns: [
    "The direct pipeline, once it exists.",
    "The offer. It takes shape from the work, once there is something to show.",
    "A forecast Chris and Thomas can rely on.",
  ],
  job: [
    "Take that offer to buyers who do not know us yet.",
    "Sell to programme leads mid-implementation, and to operators who now feel the gap.",
    "Reach the account teams Doug has not. Leave the partner programmes with him.",
    "Run the pipeline as a pipeline: qualified, priced, forecast.",
    "Quote fixed-scope builds with Graham, and close them.",
    "Build the repeatable sale: offer, proposal and price, once the first jobs have shown what we sell.",
  ],
  good: [
    "A forecast Chris and Thomas can rely on within two quarters of starting.",
    "Direct at a third of new work by the end of year two.",
    "Commission paid out of margin, never out of the overdraft.",
  ],
  fits: [
    "Has sold services into HR, workforce or retail operations buyers.",
    "Works a warm network rather than a cold list.",
    "Comfortable selling fixed-price builds, not programmes.",
    "Can articulate the change in software that makes this possible: platforms that finally let customers get what they want without compromise.",
  ],
  terms: [
    "Base plus commission on closed builds and first-year support. Commission out of margin, never out of the overdraft.",
    "A co-founder stake is on the table if they join early and carry the direct channel. Otherwise a senior hire.",
    "The shape of that deal is decided on the numbers, with Chris and Thomas.",
  ],
  trigger: "Opens when the support base covers a salary, or sooner if the network has us under two builds by the end of Q2.",
  not: "Not a body-shop seller. Not cold outbound at volume. Not a replacement for Doug. The two seats sell to different people.",
};

const BUILDER: SeatSpec = {
  id: "builder",
  icon: Wrench,
  tone: "hire",
  kicker: "Skilled builder · hire · against signed work",
  title: "The builder.",
  highlight: "Ship the pattern again.",
  lede: "Graham builds the first job. The builder is hired once there is pipeline behind it, not on a forecast. South Africa first.",
  summary:
    "The builder ships fixed-scope extensions on other people’s platforms, taking a pattern Graham has proven and delivering it on a new customer in one to two weeks. Senior, end to end and AI-assisted: data, integration, screens, tenant, handover. They own the support line for what they built and write it down so the next builder does not start again.",
  owns: [
    "The build they are handed, through to live.",
    "The support line for what they shipped.",
    "A write-up the next builder can pick up.",
  ],
  job: [
    "Build fixed-scope extensions on someone else’s platform. Inside Dayforce through Studio. Beside UKG, Logile and Legion through their APIs. RELEX as it opens.",
    "Take a pattern Graham has proven and ship it on a new customer, in one to two weeks, without a rebuild.",
    "Work senior and end to end, AI-assisted: data, integration, screens, tenant, handover.",
    "Sit with the customer on scope. Escalate a change in scope to Graham before building it.",
    "Own support for what they built. On a hosted app, that line is what keeps it alive.",
    "Write the pattern down so the next builder does not start again.",
  ],
  good: [
    "First build live within a quarter of starting.",
    "Eight or nine builds a year once settled, at one to two weeks each.",
    "Support closed inside the SLA, and the customer renewing.",
  ],
  fits: [
    "Creative problem solver who works a scoped brief with a client, and presents options when the build hits a real-world gap.",
    "Technical enough to pick the right approach for the platform and the job.",
    "Ships from a signed scope without hand-holding, and repeats a proven pattern cleanly.",
  ],
  terms: [
    "Permanent. About £90k in the UK, about £65k in South Africa.",
    "A small bonus on support renewals for what they built.",
    "Not a co-founder seat. A hire, on a path to leading a platform.",
  ],
  trigger: "First hire once there is pipeline behind the first job, around Q2. Further hires only when the next job, or the support line, can carry them.",
  not: "Not a bench. Not a contractor on a day rate. Not implementation that belongs to FXP. Not pricing.",
};

const TCN: SeatSpec = {
  id: "tcn",
  icon: Landmark,
  tone: "discuss",
  kicker: "Not a seat inside the studio · to discuss",
  title: "TCN.",
  highlight: "Capital, doors, and coaching.",
  lede: "Proposed so it can be argued. Chris and Thomas fund the studio and open the doors. None of this is agreed as a job description yet.",
  summary:
    "TCN provides the facility, opens the Dayforce and UKG doors, and coaches the founders on price, hiring and accounts. Other TCN companies can bring work from their own accounts. TCN holds the founders to the plan and to the choice at the end of year four.",
  owns: [
    "The facility, and whether it is used.",
    "The Dayforce and UKG doors.",
    "Introductions from the network, warm only.",
  ],
  job: [
    "Provide the facility. The plan draws on it at the January peak, and clears it inside the first quarter.",
    "Open Dayforce and UKG. Chris in the room for the first offers.",
    "Coach the founders on price, hiring, and which accounts are worth chasing.",
    "Help Doug work out which accounts, which people, and which gaps are worth an introduction. Warm only. Every note goes to someone who already knows the sender.",
    "Hold the founders to the one-page quarterly review: cash and overdraft draw, pipeline, hires only against signed work, renewals. And to the choice at the end of year four: sell or keep.",
  ],
  good: [
    "Chris in the room for the first Dayforce and UKG offers.",
    "The overdraft cleared inside Q1 and barely touched after.",
    "A quarterly review that fits on a page: cash, pipeline, hires, renewals.",
  ],
  fits: [
    "Provides the capital, the doors and the coaching.",
    "Runs a network that produces project gaps.",
    "Patient with a studio that pays its way inside year one.",
  ],
  terms: [
    "How hands-on Chris and Thomas are, week to week.",
    "Whether other TCN companies originate work, and on what terms.",
    "Reporting: what they see, and how often.",
  ],
  trigger: "In the room now. The facility and the doors are what make January possible.",
  not: "Not delivery. Not between Bespoke Everything and the customer invoice. Not the jalipi solution. That stake sits with Graham.",
};

const SEATS = [GRAHAM, DOUG, SELLER, BUILDER, TCN];

const OVERVIEW: { spec: SeatSpec; seat: string; who: string; fills: string }[] = [
  { spec: GRAHAM, seat: "Solutions and delivery", who: "Graham", fills: "From January. Scopes, prices, builds the first pattern." },
  { spec: DOUG, seat: "Vendors and accounts", who: "Doug", fills: "From January. The partner programmes and the network." },
  { spec: SELLER, seat: "Direct channel", who: "Open", fills: "When support covers a salary, or the network is thin by end of Q2." },
  { spec: BUILDER, seat: "Build", who: "Open", fills: "Once there is pipeline behind the first job. Further hires only when the work pays for them." },
  { spec: TCN, seat: "Capital, doors, coaching", who: "Chris and Thomas", fills: "To discuss. The facility, the introductions, and how hands-on they are." },
];

function SeatsTitleSlide() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <div className="deck-drift pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-amber-600/20 blur-3xl" />
      <div
        className="deck-drift pointer-events-none absolute -right-40 bottom-1/5 h-[34rem] w-[34rem] rounded-full bg-teal-600/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
      <div className="relative max-w-4xl px-8 text-center">
        <div className="deck-rise flex flex-col items-center gap-3" style={{ animationDelay: "0.2s" }}>
          <BespokeEverythingLogo variant="dark" showTagline={false} className="text-lg" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
            The roles · for Chris and Thomas
          </p>
        </div>
        <h1
          className="deck-rise mt-8 text-5xl font-black leading-tight tracking-tight"
          style={{ animationDelay: "0.55s" }}
        >
          Who does what.{" "}
          <span className="bg-gradient-to-r from-amber-400 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Including TCN.
          </span>
        </h1>
        <p
          className="deck-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65"
          style={{ animationDelay: "0.85s" }}
        >
          Graham on solutions and delivery. Doug on vendors and accounts. A seller when the numbers say so.
          A builder against signed work. And the role TCN plays, written down so it can be discussed rather
          than assumed.
        </p>
      </div>
    </div>
  );
}

function SeatsOverviewSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-5 w-full max-w-5xl">
        <SlideHeading
          kicker="The roles"
          title="Five parts."
          highlight="Two from January."
          lede="Graham and Doug start together. The seller and the builder wait for the work. TCN is on the page so the part they play is explicit."
        />
        <div className="mt-4 space-y-2">
          {OVERVIEW.map((row, index) => {
            const tone = TONE[row.spec.tone];
            const Icon = row.spec.icon;
            return (
              <div
                key={row.spec.id}
                className={cn(
                  "deck-rise grid grid-cols-[16rem_11rem_1fr_auto] items-center gap-4 rounded-2xl border px-4 py-2.5",
                  tone.card,
                )}
                style={{ animationDelay: `${0.12 + index * 0.06}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", tone.ring)}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[13px] font-black leading-tight">{row.who}</p>
                    <p className="text-[10px] text-white/55">{row.seat}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "w-fit rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]",
                    tone.pill,
                  )}
                >
                  {tone.badge}
                </span>
                <p className="text-[12px] leading-snug text-white/75">{row.fills}</p>
                <span className={cn("h-8 w-1 rounded-full bg-gradient-to-b", tone.bar)} />
              </div>
            );
          })}
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

function SpecList({
  label,
  items,
  tone,
  numbered = false,
}: {
  label: string;
  items: string[];
  tone: SeatTone;
  numbered?: boolean;
}) {
  return (
    <div>
      <p className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", TONE[tone].label)}>{label}</p>
      <ul className="mt-1.5 space-y-1">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2 text-[11px] leading-snug text-white/80">
            {numbered ? (
              <span className="w-4 shrink-0 font-black text-white/35">{String(index + 1).padStart(2, "0")}</span>
            ) : (
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeatSpecSlide({ spec }: { spec: SeatSpec }) {
  const tone = TONE[spec.tone];
  const termsLabel = spec.tone === "discuss" ? "Still to argue" : "Terms, proposed";
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-4 w-full max-w-6xl">
        <SlideHeading kicker={spec.kicker} title={spec.title} highlight={spec.highlight} lede={spec.lede} />
        <div
          className={cn("deck-rise relative mt-3 overflow-hidden rounded-2xl border px-5 py-3", tone.card)}
          style={{ animationDelay: "0.08s" }}
        >
          <span className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", tone.bar)} />
          <p className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>The role in short</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">{spec.summary}</p>
        </div>
        <div className="mt-3 grid grid-cols-[1.5fr_1fr_1fr] gap-3">
          <div
            className={cn("deck-rise relative overflow-hidden rounded-2xl border px-4 py-3", tone.card)}
            style={{ animationDelay: "0.12s" }}
          >
            <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
            <SpecList label="Responsibilities" items={spec.job} tone={spec.tone} numbered />
            <div className="mt-3 border-t border-white/10 pt-2.5">
              <SpecList label="What good looks like" items={spec.good} tone={spec.tone} />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.22s" }}>
              <SpecList label="Accountable for" items={spec.owns} tone={spec.tone} />
            </div>
            <div className="deck-rise flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.3s" }}>
              <SpecList label={spec.tone === "discuss" ? "Who plays it" : "Who fits"} items={spec.fits} tone={spec.tone} />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.38s" }}>
              <SpecList label={termsLabel} items={spec.terms} tone={spec.tone} />
            </div>
            <div className="deck-rise flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.46s" }}>
              <p className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>When</p>
              <p className="mt-1 text-[11px] leading-snug text-white/80">{spec.trigger}</p>
              <p className="mt-2 text-[9.5px] font-black uppercase tracking-[0.2em] text-white/35">Outside the role</p>
              <p className="mt-1 text-[11px] leading-snug text-white/60">{spec.not}</p>
            </div>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

type Handoff = {
  from: string;
  to: string;
  what: string;
  tone: SeatTone;
  stage: string;
  kind: "step" | "door" | "report";
};

const HANDOFFS: Handoff[] = [
  { from: "TCN", to: "Doug", what: "A door. Chris helps Doug identify the account and makes the introduction. Doug takes the first call.", tone: "discuss", stage: "Door", kind: "step" },
  { from: "Doug", to: "Graham", what: "A qualified gap. Who the buyer is, what is stuck, and roughly when. Graham scopes and prices it.", tone: "cofounder", stage: "Scope", kind: "step" },
  { from: "Graham", to: "The builder", what: "A proven pattern and a signed scope. The builder ships it on the next customer without a rebuild.", tone: "hire", stage: "Build", kind: "step" },
  { from: "The builder", to: "Doug", what: "A live build and a support line. Doug stays on the account for the renewal.", tone: "cofounder", stage: "Renewal", kind: "step" },
  { from: "The seller", to: "Graham", what: "A priced offer to a buyer who did not know us. Graham holds the scope line while it closes.", tone: "potential", stage: "Second door", kind: "door" },
  { from: "Graham and Doug", to: "TCN", what: "One page a quarter: cash, pipeline, hires against signed work, renewals.", tone: "discuss", stage: "Reporting", kind: "report" },
];

function HandoffPair({ from, to, className }: { from: string; to: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[12px] font-black leading-tight", className)}>
      <span>{from}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/45" />
      <span>{to}</span>
    </div>
  );
}

function HandoffSlide() {
  const steps = HANDOFFS.filter((row) => row.kind === "step");
  const secondDoor = HANDOFFS.find((row) => row.kind === "door");
  const report = HANDOFFS.find((row) => row.kind === "report");
  const chainColumns = "grid-cols-[1fr_1.25rem_1fr_1.25rem_1fr_1.25rem_1fr]";
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-5 w-full max-w-5xl">
        <SlideHeading
          kicker="How the roles fit"
          title="Six handoffs."
          highlight="Each one has an owner."
          lede="A job moves from a door to a scope, to a build, to a renewal. Where it changes hands, one person passes it and one person takes it."
        />

        {secondDoor ? (
          <div className={cn("mt-4 grid items-end gap-x-2", chainColumns)}>
            <div className="deck-rise col-start-3 flex flex-col items-center" style={{ animationDelay: "0.36s" }}>
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border px-3.5 py-2.5",
                  TONE[secondDoor.tone].card,
                )}
              >
                <span className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", TONE[secondDoor.tone].bar)} />
                <span className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", TONE[secondDoor.tone].label)}>
                  {secondDoor.stage}
                </span>
                <HandoffPair from={secondDoor.from} to={secondDoor.to} className="mt-1" />
                <p className="mt-1 text-[10.5px] leading-snug text-white/70">{secondDoor.what}</p>
              </div>
              <ArrowRight className="my-0.5 h-4 w-4 rotate-90 text-white/45" />
            </div>
          </div>
        ) : null}

        <div className={cn("grid items-stretch gap-x-2", chainColumns)}>
          {steps.map((row, index) => {
            const tone = TONE[row.tone];
            return (
              <div key={`${row.from}-${row.to}`} className="contents">
                {index > 0 ? (
                  <div className="deck-rise flex items-center justify-center" style={{ animationDelay: `${0.12 + index * 0.08}s` }}>
                    <ArrowRight className="h-5 w-5 text-white/45" />
                  </div>
                ) : null}
                <div
                  className={cn("deck-rise relative overflow-hidden rounded-2xl border px-4 py-3", tone.card)}
                  style={{ animationDelay: `${0.12 + index * 0.08}s` }}
                >
                  <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
                  <div className="flex items-baseline gap-2">
                    <span className="text-[22px] font-black leading-none tabular-nums text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>{row.stage}</span>
                  </div>
                  <HandoffPair from={row.from} to={row.to} className="mt-2.5" />
                  <p className="mt-1.5 text-[11px] leading-snug text-white/75">{row.what}</p>
                </div>
              </div>
            );
          })}
        </div>

        {report ? (
          <div
            className={cn(
              "deck-rise relative mt-3 flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-2.5",
              TONE[report.tone].card,
            )}
            style={{ animationDelay: "0.52s" }}
          >
            <span className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", TONE[report.tone].bar)} />
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]",
                TONE[report.tone].pill,
              )}
            >
              {report.stage}
            </span>
            <HandoffPair from={report.from} to={report.to} className="shrink-0" />
            <span className="h-5 w-px shrink-0 bg-white/15" />
            <p className="text-[11px] leading-snug text-white/75">{report.what}</p>
          </div>
        ) : null}
      </div>
    </BespokeBrandedSlide>
  );
}

const GROWTH: { year: string; people: string; seats: string; changes: string }[] = [
  { year: "Year one", people: "4", seats: "Graham · Doug · 2 SA builders", changes: "Two founders sell and build. Graham ships the first job. The first builder once there is pipeline, the second once support carries them." },
  { year: "Year two", people: "8", seats: "+ seller · UK builder · 2 SA builders", changes: "The direct channel opens. Graham stops building day to day and holds price and pattern." },
  { year: "Year three", people: "14", seats: "+ 2 UK · 2 SA builders · support", changes: "A pair of builders per lead platform. A support role takes the live builds off the builders." },
  { year: "Year four", people: "20", seats: "+ 3 UK · 3 SA builders · solutions lead", changes: "Workday and the licensed apps. A solutions lead owns what we sell to many tenants." },
];

function GrowthSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-5 w-full max-w-5xl">
        <SlideHeading
          kicker="How the seats grow"
          title="Four to twenty."
          highlight="Every seat follows the work."
          lede="The same hire schedule as the plan. Roles change shape as the studio grows."
        />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {GROWTH.map((row, index) => (
            <div
              key={row.year}
              className="deck-rise flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              style={{ animationDelay: `${0.12 + index * 0.08}s` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{row.year}</p>
              <p className="mt-1 text-[30px] font-black leading-none tracking-tight">{row.people}</p>
              <p className="mt-2 text-[10.5px] font-semibold leading-snug text-amber-100/90">{row.seats}</p>
              <p className="mt-2 flex-1 text-[11px] leading-snug text-white/70">{row.changes}</p>
            </div>
          ))}
        </div>
        <p className="deck-rise mt-4 text-center text-[11px] leading-snug text-white/55" style={{ animationDelay: "0.5s" }}>
          Doug stays on vendors and accounts throughout. The seller, if they join early and carry direct, becomes the third co-founder.
        </p>
      </div>
    </BespokeBrandedSlide>
  );
}

function buildSeatsSlides(): DeckSlide[] {
  return [
    {
      id: "seats-title",
      section: "Open",
      gradient: "from-amber-500 via-sky-500 to-violet-500",
      node: <SeatsTitleSlide />,
    },
    {
      id: "seats-overview",
      section: "Roles",
      gradient: "from-amber-500 via-sky-500 to-violet-500",
      node: <SeatsOverviewSlide />,
    },
    ...SEATS.map((spec) => ({
      id: `seat-${spec.id}`,
      section: spec.title.replace(/\.$/, ""),
      gradient:
        spec.tone === "cofounder"
          ? "from-amber-500 via-orange-400 to-amber-300"
          : spec.tone === "potential"
            ? "from-sky-500 via-indigo-400 to-sky-300"
            : spec.tone === "hire"
              ? "from-teal-500 via-emerald-500 to-teal-300"
              : "from-violet-500 via-fuchsia-400 to-violet-300",
      node: <SeatSpecSlide spec={spec} />,
    })),
    {
      id: "seats-handoffs",
      section: "Handoffs",
      gradient: "from-amber-500 via-teal-500 to-violet-500",
      node: <HandoffSlide />,
    },
    {
      id: "seats-growth",
      section: "Growth",
      gradient: "from-teal-500 via-sky-500 to-amber-400",
      node: <GrowthSlide />,
    },
  ];
}

export function SeatsDeck() {
  const slides = useMemo(() => buildSeatsSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
