"use client";

import { useMemo } from "react";
import { Compass, Handshake, Landmark, Megaphone, Wrench, type LucideIcon } from "lucide-react";

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
  owns: string[];
  job: string[];
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
  kicker: "Co-founder · product and delivery · from January",
  title: "Graham.",
  highlight: "What we build, and what it costs.",
  lede: "Scopes, prices and builds. Proves the first pattern on a platform, then hands the repeat to a builder.",
  owns: [
    "The scope and the price of every build.",
    "Whether a pattern is good enough to ship again.",
    "The jalipi handover, and the stake in that product.",
  ],
  job: [
    "Scope and price every engagement. Fixed price, invoiced to the customer.",
    "Build the first pattern on a platform, then hand the repeat to a builder.",
    "Choose the platforms we build on, and what we will not build.",
    "Hold quality until a builder owns the line: tenant, handover, support renewal.",
    "Price with Doug, and later with the seller. Hold the scope line in the room.",
    "Hire and coach the builders. The first hire is against the one signed job.",
    "Hand jalipi to QTC. Keep a stake. No product work on the side.",
  ],
  terms: [
    "Co-founder from January. Salary £100k, the same figure proposed for Doug.",
    "A stake in Bespoke Everything. Size and vesting still to write down.",
    "The jalipi stake sits with Graham, not in the studio’s P&L. Size still to write down with QTC.",
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
  owns: [
    "The vendor programmes we are listed on.",
    "The accounts the network already knows.",
    "The first conversation, through to the support renewal.",
  ],
  job: [
    "Own Dayforce, UKG, Logile through FXP, and RELEX once the Inference Group line is agreed. Get us listed, then get us referred.",
    "Be the referral. A stuck deal with a gap in it comes to Doug, from someone who already knows him.",
    "Run the network with Chris: FXP project gaps, REPL alumni, the retailers and manufacturers we already know.",
    "Qualify and shape the first conversation, then hand to Graham to scope and price.",
    "Stay on the account through delivery and the support renewal.",
    "Send the overnight note on who moved where. Only to someone who knows him.",
    "Open South Africa accounts alongside the UK ones.",
  ],
  terms: [
    "Co-founder stake in Bespoke Everything. Vesting still to write down.",
    "Salary £100k, proposed against the cash model and agreed with Chris and Thomas.",
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
  owns: [
    "The direct pipeline, once it exists.",
    "One named offer per platform, and the case studies behind it.",
    "A forecast Chris and Thomas can rely on.",
  ],
  job: [
    "Take one named offer per platform to buyers who do not know us yet.",
    "Sell to programme leads mid-implementation, and to operators who now feel the gap.",
    "Reach the account teams Doug has not. Leave the partner programmes with him.",
    "Run the pipeline as a pipeline: qualified, priced, forecast.",
    "Quote fixed-scope builds with Graham, and close them.",
    "Build the repeatable sale: offer, proposal, price, case study. Every meeting starts with a working app.",
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
  lede: "Hired once a job is signed to pay for them. UK or South Africa. The first against the one job lined up before we start.",
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
  terms: [
    "Permanent. About £90k in the UK, about £65k in South Africa.",
    "A small bonus on support renewals for what they built.",
    "Not a co-founder seat. A hire, on a path to leading a platform.",
  ],
  trigger: "First hire against the signed job. Further hires only when the next job, or the support line, can carry them.",
  not: "Not a bench. Not a contractor on a day rate. Not implementation that belongs to FXP. Not pricing.",
};

const TCN: SeatSpec = {
  id: "tcn",
  icon: Landmark,
  tone: "discuss",
  kicker: "Not a seat inside the studio · to discuss",
  title: "TCN.",
  highlight: "Capital, doors, and FXP.",
  lede: "Proposed so it can be argued. Chris and Thomas fund the studio and open the doors. FXP implements. None of this is agreed as a job description yet.",
  owns: [
    "The £200k facility, and whether it is used.",
    "The Dayforce and UKG doors.",
    "FXP’s implementation, invoiced to the customer.",
  ],
  job: [
    "Provide the facility. The plan draws about £45k at the January peak, and clears it inside the first quarter.",
    "Open Dayforce and UKG. Chris in the room for the first offers.",
    "Coach the founders on price, hiring, and which accounts are worth chasing.",
    "FXP implements jalipi and the other vendors the way they implement anyone, and invoices the customer for the services.",
    "Introduce work from the network. Warm only. Every note to someone who already knows the sender.",
    "Hold the founders to the plan: cash, hires against signed work, and the choice at the end of year four.",
  ],
  terms: [
    "How hands-on Chris and Thomas are, week to week.",
    "What TCN holds if the overdraft is barely drawn.",
    "Whether other TCN companies originate work, and on what terms. Reporting: what they see, and how often.",
  ],
  trigger: "In the room now. The facility and the doors are what make January possible.",
  not: "Not delivery. Not between FXP or Bespoke Everything and the customer invoice. Not the jalipi product. That stake sits with Graham.",
};

const SEATS = [GRAHAM, DOUG, SELLER, BUILDER, TCN];

const OVERVIEW: { spec: SeatSpec; seat: string; who: string; fills: string }[] = [
  { spec: GRAHAM, seat: "Product and delivery", who: "Graham", fills: "From January. Scopes, prices, builds the first pattern." },
  { spec: DOUG, seat: "Vendors and accounts", who: "Doug", fills: "From January. The partner programmes and the network." },
  { spec: SELLER, seat: "Direct channel", who: "Open", fills: "When support covers a salary, or the network is thin by end of Q2." },
  { spec: BUILDER, seat: "Build", who: "Open", fills: "Against the signed job. Further hires only when the work pays for them." },
  { spec: TCN, seat: "Capital, doors, FXP", who: "Chris and Thomas", fills: "To discuss. The facility, the introductions, and implementation." },
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
          Graham on product and delivery. Doug on vendors and accounts. A seller when the numbers say so.
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
  const Icon = spec.icon;
  const termsLabel = spec.tone === "discuss" ? "Still to argue" : "Terms, proposed";
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-4 w-full max-w-6xl">
        <SlideHeading kicker={spec.kicker} title={spec.title} highlight={spec.highlight} lede={spec.lede} />
        <div className="mt-3 grid grid-cols-[1.45fr_1fr] gap-3">
          <div
            className={cn("deck-rise relative overflow-hidden rounded-2xl border px-4 py-3", tone.card)}
            style={{ animationDelay: "0.12s" }}
          >
            <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
            <div className="mb-2 flex items-center gap-2">
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", tone.ring)}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className={cn("rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]", tone.pill)}>
                {tone.badge}
              </span>
            </div>
            <SpecList label="Responsibilities" items={spec.job} tone={spec.tone} numbered />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.22s" }}>
              <SpecList label="Accountable for" items={spec.owns} tone={spec.tone} />
            </div>
            <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.32s" }}>
              <SpecList label={termsLabel} items={spec.terms} tone={spec.tone} />
            </div>
            <div className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3" style={{ animationDelay: "0.42s" }}>
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
  ];
}

export function SeatsDeck() {
  const slides = useMemo(() => buildSeatsSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
