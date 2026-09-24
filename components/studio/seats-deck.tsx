"use client";

import { useMemo } from "react";
import { Handshake, Megaphone, Wrench, type LucideIcon } from "lucide-react";

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
// Data
// ---------------------------------------------------------------------------

type SeatTone = "cofounder" | "potential" | "hire";

type SeatSpec = {
  id: string;
  icon: LucideIcon;
  tone: SeatTone;
  kicker: string;
  title: string;
  highlight: string;
  lede: string;
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
};

const DOUG: SeatSpec = {
  id: "doug",
  icon: Handshake,
  tone: "cofounder",
  kicker: "Seat one · co-founder · from January",
  title: "Doug.",
  highlight: "Vendors and accounts.",
  lede: "The person the account teams already call. Managing partners is the first sales job, and it is his.",
  job: [
    "Own the vendor relationships: the Dayforce partner programme, the UKG Technology Marketplace, LogileONE through FXP, and RELEX once the line with Inference Group is agreed. Get us listed, then get us referred.",
    "Be the referral. When an account manager has a stuck deal with a gap in it, Doug is the person they send it to. Warm only. Nothing goes out cold.",
    "Run the network with Chris: FXP project gap lists, REPL alumni, the retailers and manufacturers we already know.",
    "Qualify and shape the first conversation, then hand to Graham to scope and price. Stay on the account through delivery and the support renewal.",
    "The overnight research: who moved where, which programmes are in trouble. Doug sends the note, and only to someone who knows him.",
  ],
  good: [
    "Listed on Dayforce, UKG and RELEX by the end of Q1.",
    "First vendor-referred job closed in Q2.",
    "Every first-year customer referenceable, and renewing support.",
  ],
  fits: [
    "The account teams already trust him. That is the asset.",
    "Knows the Dayforce and UKG world Chris does, and the people in it.",
    "Available from January. The FXP timing missed, so he is free, and he wants this.",
  ],
  terms: [
    "Co-founder stake in Bespoke Everything, vesting over the first years.",
    "Salary set against the cash model. It is the largest line in the first half, so it is agreed with Chris and Thomas, not assumed.",
    "Based in South Africa, selling into UK accounts. Travel when a deal needs a room.",
  ],
  trigger: "Starts mid January with Graham. Nothing before either of us has joined.",
  not: "Not a hunter. Not creating a market from cold. Not delivery: FXP implements, we build.",
};

const SELLER: SeatSpec = {
  id: "seller",
  icon: Megaphone,
  tone: "potential",
  kicker: "Seat two · sales · potential co-founder",
  title: "The seller.",
  highlight: "Creating the market.",
  lede: "Managing partners and creating a market are different jobs. This is the second one, and it opens when the work says so.",
  job: [
    "Own the direct channel from Q2: one named offer per platform, backed by two case studies and a demonstrator app.",
    "Take the studio to buyers who do not know us yet: programme leads mid-implementation, operators with a gap they now feel, and the account teams Doug has not reached.",
    "Run the pipeline as a pipeline: qualified, priced, forecast. Quote fixed-scope builds with Graham, and close them.",
    "Build the repeatable sale: the offer, the proposal, the pricing, the case study library.",
    "Every meeting starts with a working app. Demonstrators beat slideware.",
  ],
  good: [
    "A forecast Chris and Thomas can rely on within two quarters of starting.",
    "Direct at a third of new work by year two.",
    "Commission paid out of margin, never out of the overdraft.",
  ],
  fits: [
    "Has sold enterprise software or services into workforce, HR or retail operations.",
    "Knows what a change request costs, and can sell a £40–120k build rather than a £2m programme.",
    "Can carry a demo alone. Comfortable in a room with Chris.",
  ],
  terms: [
    "Base plus commission on closed builds and first-year support.",
    "A co-founder stake is on the table if they join early and carry the direct channel. Otherwise a senior hire.",
    "Decided on the numbers by mid-year, with Chris and Thomas.",
  ],
  trigger:
    "Opens when the support base covers a salary, or sooner if the network has us under two builds by the end of Q2.",
  not: "Not a body-shop seller. Not cold outbound at volume. Not a replacement for Doug: the two seats sell to different people.",
};

const BUILDER: SeatSpec = {
  id: "builder",
  icon: Wrench,
  tone: "hire",
  kicker: "Seat three · skilled builder · hire",
  title: "The builder.",
  highlight: "Against signed work.",
  lede: "Hired once a job is signed to pay for them, not on a forecast. UK or South Africa. The first in Q2, the second when the support line can carry them.",
  job: [
    "Build fixed-scope extensions on someone else’s platform: inside Dayforce through Studio; beside UKG, Logile and Legion through their APIs; RELEX as it opens.",
    "Take a pattern Graham has proven and ship it again on a new customer, in weeks, without a rebuild.",
    "Own the support line for what they build. On a hosted app, that line is what keeps it alive.",
    "Work senior and end to end, AI-assisted: scope with the customer, data and integration, the screens, the tenant, the handover.",
    "Write it down so the next builder can pick it up.",
  ],
  good: [
    "First build live within a quarter of starting.",
    "A pattern reused on a second customer without a rebuild.",
    "Support closed inside the SLA, and the customer renewing.",
  ],
  fits: [
    "A senior full-stack engineer who has built inside or beside an enterprise SaaS product. APIs, auth, data, a modern web stack.",
    "Uses AI tooling to ship faster, not to avoid understanding what they shipped.",
    "Has sat with a customer. Workforce management, HR tech, Dayforce or UKG a bonus, not a requirement.",
  ],
  terms: [
    "Permanent, UK or South Africa, salary set to the market where they sit.",
    "A small bonus on support renewals for what they built.",
    "Not a co-founder seat. A hire, on a clear path to leading a platform.",
  ],
  trigger: "First hire in Q2 against signed work. Second in Q3, once the support line can carry them.",
  not: "Not a bench. Not a contractor on a day rate. Not implementation work that belongs to FXP.",
};

const SEATS = [DOUG, SELLER, BUILDER];

// ---------------------------------------------------------------------------
// Slides
// ---------------------------------------------------------------------------

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
            The seats · for Chris and Thomas
          </p>
        </div>
        <h1
          className="deck-rise mt-8 text-5xl font-black leading-tight tracking-tight"
          style={{ animationDelay: "0.55s" }}
        >
          Three seats.{" "}
          <span className="bg-gradient-to-r from-amber-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
            One filled now, two on triggers.
          </span>
        </h1>
        <p
          className="deck-rise mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65"
          style={{ animationDelay: "0.85s" }}
        >
          Doug as co-founder on vendors and accounts from January. A seller when the numbers say so,
          with a co-founder stake if they come early. A builder against signed work. For each: the job,
          what good looks like, who fits, and the terms we propose.
        </p>
        <p
          className="deck-rise mx-auto mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40"
          style={{ animationDelay: "1.05s" }}
        >
          Graham scopes, prices and builds. Chris and Thomas invest.
        </p>
      </div>
    </div>
  );
}

const OVERVIEW: {
  spec: SeatSpec;
  seat: string;
  who: string;
  fills: string;
  shape: string;
}[] = [
  {
    spec: DOUG,
    seat: "Vendors and accounts",
    who: "Doug",
    fills: "From January, alongside Graham.",
    shape: "Co-founder stake plus salary, set on the cash model.",
  },
  {
    spec: SELLER,
    seat: "Sales · direct channel",
    who: "Open",
    fills: "When support covers a salary, or the network is under two builds by end of Q2.",
    shape: "Base plus commission. Stake if they join early and carry direct.",
  },
  {
    spec: BUILDER,
    seat: "Build",
    who: "Open",
    fills: "Q2 against signed work. A second in Q3 once support carries them.",
    shape: "Salary, UK or South Africa. Renewal bonus. Not a co-founder seat.",
  },
];

function SeatsOverviewSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-6 w-full max-w-5xl">
        <SlideHeading
          kicker="The seats"
          title="Who sits where,"
          highlight="and what fills each seat."
          lede="One co-founder now. One seat that becomes a co-founder if the work pulls it forward. One hire that only exists once a customer has paid for it."
        />
        <div className="mt-5 grid grid-cols-3 gap-4">
          {OVERVIEW.map((row, index) => {
            const tone = TONE[row.spec.tone];
            const Icon = row.spec.icon;
            return (
              <div
                key={row.spec.id}
                className={cn("deck-rise relative overflow-hidden rounded-2xl border p-5", tone.card)}
                style={{ animationDelay: `${0.15 + index * 0.12}s` }}
              >
                <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
                <div className="flex items-center gap-3">
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-full", tone.ring)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{row.seat}</p>
                    <h3 className="text-[22px] font-black leading-tight tracking-tight">{row.who}</h3>
                  </div>
                </div>
                <span
                  className={cn(
                    "mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]",
                    tone.pill,
                  )}
                >
                  {tone.badge}
                </span>
                <dl className="mt-3 space-y-2.5">
                  <div>
                    <dt className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>Fills</dt>
                    <dd className="mt-0.5 text-[11px] leading-snug text-white/80">{row.fills}</dd>
                  </div>
                  <div>
                    <dt className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>Shape of the deal</dt>
                    <dd className="mt-0.5 text-[11px] leading-snug text-white/80">{row.shape}</dd>
                  </div>
                  <div>
                    <dt className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>Good looks like</dt>
                    <dd className="mt-0.5 text-[11px] leading-snug text-white/80">{row.spec.good[0]}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
        <p
          className="deck-rise mt-4 text-center text-[11px] leading-snug text-white/55"
          style={{ animationDelay: "0.55s" }}
        >
          Doug and the seller sell to different people: partners and the network first, then a market
          we create. The builder exists only when there is a signed job to pay for them.
        </p>
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
      <ul className="mt-1.5 space-y-1.5">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2 text-[10.5px] leading-[1.4] text-white/80">
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
  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows />
      <div className="relative mx-auto mb-auto mt-5 w-full max-w-6xl">
        <SlideHeading kicker={spec.kicker} title={spec.title} highlight={spec.highlight} lede={spec.lede} />
        <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
          <div
            className={cn("deck-rise relative overflow-hidden rounded-2xl border px-5 py-4", tone.card)}
            style={{ animationDelay: "0.15s" }}
          >
            <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r", tone.bar)} />
            <div className="flex items-center gap-3">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", tone.ring)}>
                <Icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]",
                  tone.pill,
                )}
              >
                {tone.badge}
              </span>
            </div>
            <div className="mt-3">
              <SpecList label="The job" items={spec.job} tone={spec.tone} numbered />
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <SpecList label="What good looks like" items={spec.good} tone={spec.tone} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5"
              style={{ animationDelay: "0.3s" }}
            >
              <SpecList label="Who fits" items={spec.fits} tone={spec.tone} />
            </div>
            <div
              className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5"
              style={{ animationDelay: "0.4s" }}
            >
              <SpecList label="Terms, proposed" items={spec.terms} tone={spec.tone} />
            </div>
            <div
              className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3"
              style={{ animationDelay: "0.5s" }}
            >
              <p className={cn("text-[9.5px] font-black uppercase tracking-[0.2em]", tone.label)}>When</p>
              <p className="mt-1 text-[10.5px] leading-[1.4] text-white/80">{spec.trigger}</p>
              <p className="mt-2 text-[9.5px] font-black uppercase tracking-[0.2em] text-white/35">Not</p>
              <p className="mt-1 text-[10.5px] leading-[1.4] text-white/60">{spec.not}</p>
            </div>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// Deck
// ---------------------------------------------------------------------------

function buildSeatsSlides(): DeckSlide[] {
  return [
    {
      id: "seats-title",
      section: "Open",
      gradient: "from-amber-500 via-sky-500 to-teal-500",
      node: <SeatsTitleSlide />,
    },
    {
      id: "seats-overview",
      section: "The seats",
      gradient: "from-amber-500 via-sky-500 to-teal-500",
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
            : "from-teal-500 via-emerald-500 to-teal-300",
      node: <SeatSpecSlide spec={spec} />,
    })),
  ];
}

export function SeatsDeck() {
  const slides = useMemo(() => buildSeatsSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
