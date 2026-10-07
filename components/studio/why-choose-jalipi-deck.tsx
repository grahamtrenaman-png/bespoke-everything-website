"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Blocks,
  BotMessageSquare,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Copy,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe,
  History,
  Layers,
  Lock,
  Plug,
  Puzzle,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wand2,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import BespokeEverythingLogo from "@/app/components/BespokeEverythingLogo";
import { JalipiWordmark } from "@/components/studio/jalipi-wordmark";
import { PartyLogo } from "@/components/studio/party-logo";
import { BespokeBrandedSlide, JalipiBrandedSlide } from "@/components/studio/slide-chrome";
import { StudioSetupDeck, type DeckSlide } from "@/components/studio/studio-setup-deck";
import { cn } from "@/lib/cn";

const GRADIENT_TEXT =
  "bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent";

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

function Glows({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div
        className={cn(
          "deck-drift pointer-events-none absolute top-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl",
          flip ? "-right-40 bg-amber-500/12" : "-left-40 bg-teal-600/15",
        )}
      />
      <div
        className={cn(
          "deck-drift pointer-events-none absolute bottom-1/5 h-[32rem] w-[32rem] rounded-full blur-3xl",
          flip ? "-left-40 bg-teal-600/15" : "-right-40 bg-amber-500/12",
        )}
        style={{ animationDelay: "-7s" }}
      />
    </>
  );
}

function SlideHeading({
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
      <p className="text-caption font-semibold uppercase tracking-[0.35em] text-white/50">{kicker}</p>
      <h2 className="mt-1.5 text-[2rem] font-black leading-tight tracking-tight">
        {title} <span className={GRADIENT_TEXT}>{highlight}</span>
      </h2>
      {lede ? (
        <p className="mx-auto mt-1.5 max-w-3xl text-body leading-relaxed text-white/65">{lede}</p>
      ) : null}
    </div>
  );
}

function Strip({ children, delay, warm = false }: { children: ReactNode; delay: string; warm?: boolean }) {
  return (
    <div
      className={cn(
        "deck-rise rounded-2xl border px-5 py-2.5 text-center",
        warm
          ? "border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-teal-500/10 to-emerald-500/15"
          : "border-white/10 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-amber-500/10",
      )}
      style={{ animationDelay: delay }}
    >
      <p className="mx-auto max-w-4xl text-body leading-relaxed text-white/85">{children}</p>
    </div>
  );
}

function IconChip({ icon: Icon, tone = "teal" }: { icon: LucideIcon; tone?: "teal" | "amber" }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white",
        tone === "teal"
          ? "bg-gradient-to-br from-teal-500 to-emerald-500"
          : "bg-gradient-to-br from-amber-400 to-orange-500 text-neutral-950",
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

// ---------------------------------------------------------------------------
// 1. Cover
// ---------------------------------------------------------------------------

const COVER_PROMISES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Puzzle, title: "Fits how you work", body: "Configured and extended to your operation." },
  { icon: GitBranch, title: "Changes safely", body: "Branched, tested and promoted with evidence." },
  { icon: Clock, title: "Live in months", body: "Configuration and tests generated for you." },
];

function CoverSlide() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-8 text-white">
      <div className="deck-drift pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-teal-600/20 blur-3xl" />
      <div
        className="deck-drift pointer-events-none absolute -right-40 bottom-1/5 h-[34rem] w-[34rem] rounded-full bg-amber-600/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="deck-rise absolute inset-x-0 top-7 z-20 flex flex-col items-center gap-3"
        style={{ animationDelay: "0.1s" }}
      >
        <p className="text-caption font-semibold uppercase tracking-[0.3em] text-white/40">
          Brought to you by
        </p>
        <div className="flex items-center gap-6">
          <PartyLogo party="be" size="lg" />
          <span className="h-6 w-px bg-white/20" />
          <PartyLogo party="qtc" size="lg" />
          <span className="h-6 w-px bg-white/20" />
          <PartyLogo party="fxp" size="lg" />
        </div>
      </div>
      <div className="relative flex max-w-5xl flex-col items-center text-center">
        <div className="deck-rise" style={{ animationDelay: "0.15s" }}>
          <JalipiWordmark className="text-6xl text-white" />
        </div>
        <p
          className="deck-rise mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
          style={{ animationDelay: "0.35s" }}
        >
          Why choose jalipi
        </p>
        <h1
          className="deck-rise mt-4 text-[3.1rem] font-black leading-tight tracking-tight"
          style={{ animationDelay: "0.5s" }}
        >
          Workforce management that fits you.
          <br />
          <span className={GRADIENT_TEXT}>Not the other way round.</span>
        </h1>
        <p
          className="deck-rise mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70"
          style={{ animationDelay: "0.7s" }}
        >
          The core every frontline operation needs, a studio that builds whatever makes yours
          different, and a platform that manages change the way modern software teams do.
        </p>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-3 gap-3">
          {COVER_PROMISES.map((item, index) => (
            <div
              key={item.title}
              className="deck-rise flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur"
              style={{ animationDelay: `${0.9 + index * 0.1}s` }}
            >
              <IconChip icon={item.icon} />
              <div>
                <p className="text-body font-black tracking-tight">{item.title}</p>
                <p className="mt-0.5 text-caption leading-snug text-white/65">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. The future of software
// ---------------------------------------------------------------------------

const SHIFTS: { icon: LucideIcon; was: string; now: string; jalipi: string }[] = [
  {
    icon: Layers,
    was: "One product, the same for everyone.",
    now: "A shared core, with what is yours on top.",
    jalipi: "Five layers for bespoke, from configuration to your own screens. None of them a fork.",
  },
  {
    icon: Sparkles,
    was: "Bespoke cost too much to be worth it.",
    now: "AI has collapsed the cost of building.",
    jalipi: "Extensions in days, not release cycles. Priced up front, not discovered later.",
  },
  {
    icon: Route,
    was: "The vendor's roadmap decided what you got.",
    now: "Your backlog decides.",
    jalipi: "What you need next is built for you first, and graduates into the core once others need it.",
  },
  {
    icon: Cpu,
    was: "AI bolted on as a black box.",
    now: "AI builds the software. The software stays predictable.",
    jalipi: "Rule-based engines you can inspect and test. No model in your pay run, no model bill.",
  },
];

function FutureSlide() {
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Where software is going"
          title="The industry went vanilla."
          highlight="Bespoke is back."
          lede="For twenty years, SaaS meant accepting the same product as everyone else and bending your operation around it. That was the price of software when building was expensive. It is not any more."
        />

        <div className="mt-4 grid grid-cols-4 gap-3">
          {SHIFTS.map((shift, index) => {
            const Icon = shift.icon;
            return (
              <div
                key={shift.was}
                className="deck-rise flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur"
                style={{ animationDelay: `${0.25 + index * 0.1}s` }}
              >
                <div className="flex-1 px-4 pt-3.5">
                  <IconChip icon={Icon} />
                  <p className="mt-3 text-caption font-bold uppercase tracking-[0.18em] text-white/35">Was</p>
                  <p className="mt-0.5 text-body leading-snug text-white/50 line-through decoration-white/25">
                    {shift.was}
                  </p>
                  <p className="mt-2.5 text-caption font-bold uppercase tracking-[0.18em] text-amber-300/80">Now</p>
                  <p className="mt-0.5 text-sm font-bold leading-snug text-white">{shift.now}</p>
                </div>
                <div className="mt-3 min-h-[72px] border-t border-teal-400/25 bg-teal-500/[0.07] px-4 py-3">
                  <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">In jalipi</p>
                  <p className="mt-1 text-caption leading-snug text-white/80">{shift.jalipi}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Strip delay="0.75s">
            <span className="font-bold text-white">The next generation will not be the biggest suites.</span>{" "}
            It will be the platforms that give every customer exactly what they need, and stay safe to
            change while they do it.
          </Strip>
        </div>
      </div>
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 4. Completely yours, with Bespoke Everything
// ---------------------------------------------------------------------------

const ROUTE: { icon: LucideIcon; who: string; step: string; body: string }[] = [
  {
    icon: Users,
    who: "You",
    step: "Describe it",
    body: "A premium your agreement pays, an approval your regions need, a report your board wants.",
  },
  {
    icon: Wrench,
    who: "Bespoke Everything",
    step: "The studio builds it",
    body: "As a pack for your tenant: rules, screens, workflows or integrations. Days, not a release cycle. Priced before you sign.",
  },
  {
    icon: FlaskConical,
    who: "Your tenant",
    step: "Test it on your data",
    body: "Installed on a branch, proved against your data, switched on per site, role or business unit.",
  },
  {
    icon: ShieldCheck,
    who: "Every release",
    step: "It moves with the core",
    body: "No fork, no frozen version. The core upgrades underneath; your specifics stay yours through every release.",
  },
];

type Layer = {
  level: string;
  name: string;
  body: string;
  /** Plain-language explanation for the pop-up. */
  plain: string;
  /** A concrete example a customer would recognise. */
  example: string;
  /** Why this layer is distinct from the ones around it. */
  different: string;
  /** Who normally does the work. */
  who: string;
};

const LAYERS: Layer[] = [
  {
    level: "0",
    name: "The jalipi core",
    body: "Shared by every customer. Never forked.",
    plain:
      "The core is the product itself: scheduling, time and attendance, leave, forecasting, pay evaluation and everything that holds them together. Every customer runs the same core, and it is the one part that is never changed for an individual customer. That is what lets it improve every release without breaking anyone.",
    example:
      "The engine that builds a schedule, the clock-in app on a tablet, the pay run that works out what each person is owed.",
    different:
      "The other four layers exist so that the core never has to be altered for you. In older systems, a customer's special needs were coded directly into the product, creating a private version that could not be upgraded. Here the core stays shared, and the four layers above it carry everything that is yours. That is the whole idea in one picture.",
    who: "jalipi. Shaped by what customers need, released to everyone at once.",
  },
  {
    level: "1",
    name: "Configuration",
    body: "Branchable policies, catalogues and organisation structure.",
    plain:
      "Configuration is the set of choices that make jalipi yours without changing the product itself: your sites and departments, your pay rules, your shift patterns, your approval policies, your lists of roles and skills. It is the layer most of your operation lives in, and it is written in plain language you can read and change.",
    example:
      "Overtime after 38 hours instead of 40. Sunday paid at time and a half. A new store added to the North region. A rule that shift swaps need a manager's approval within 48 hours.",
    different:
      "Every WFM system has configuration. What is different here is that it is branchable, like a document with tracked versions: you can try a change on a branch, test it against real data, see what it costs, and promote it or throw it away. It never requires a developer and it is the first place any request is answered. Only when a setting cannot express what you need do you go up a layer.",
    who: "Your own team, with Bespoke Everything or FrontlineXP alongside when you want them. Guided discovery generates most of it for you.",
  },
  {
    level: "2",
    name: "Capability packs",
    body: "Versioned packs. Even your own alternate engine, behind a stable contract.",
    plain:
      "A capability pack is a ready-made bundle of extra functionality that is installed into your tenant, like an app from an app store. It might be a new type of rule, a new workflow, or a new piece of the engine that does the heavy lifting. Each pack has a version number, so you always know what you have and can update it on your own timetable.",
    example:
      "A fatigue-management pack that enforces rest rules for drivers, a pack that handles a country's specific statutory leave, or in the extreme case your own scheduling engine, dropped in behind the same interface the standard one uses.",
    different:
      "Configuration (layer 1) adjusts what is already there. A pack adds something that was not there before. It is bigger than a setting and smaller than a fork: it plugs into fixed, published points in the core, so it keeps working when the core upgrades. And when enough customers want the same pack, it moves into the core for everyone.",
    who: "Bespoke Everything builds and maintains the pack. Installing and updating it is a click in your tenant.",
  },
  {
    level: "3",
    name: "Integrations and products",
    body: "APIs, webhooks, importers, or a separate product that plugs in.",
    plain:
      "This is how jalipi talks to the other systems you already run, and how other software can plug into it. Payroll, HR, your till system, a time clock, a reporting tool. It can also be a completely separate product that sits alongside jalipi and exchanges information with it.",
    example:
      "Approved hours going to your payroll provider every Monday, new starters arriving from your HR system automatically, or a specialist forecasting tool feeding demand into the schedule.",
    different:
      "This layer is about moving information in and out. Nothing here changes how jalipi itself behaves. Layer 2 adds capability inside jalipi; this one connects jalipi to things outside it. If the question is \"how does X get into or out of the system\", it is this layer.",
    who: "Bespoke Everything builds the connection. Standard connectors for common systems come with the product.",
  },
  {
    level: "4",
    name: "Your screens and logic",
    body: "Custom UI and calculations at declared points in the product.",
    plain:
      "Sometimes the standard screens or calculations do not fit how you work, and no setting will change that. This layer lets Bespoke Everything add a screen, a panel or a calculation of your own at specific places jalipi has set aside for exactly that purpose. Think of the slots on a phone's home screen: the phone decides where widgets can go, you decide what goes there.",
    example:
      "A manager's dashboard laid out the way your regional directors read it, or a holiday accrual that follows your own agreement rather than the standard one.",
    different:
      "This is the only layer that changes what people see and how figures are worked out inside jalipi. Layers 1 to 3 change the rules, the data coming in, or add whole features. This one changes the product's own screens and sums, but only at the points jalipi has declared safe, so it still upgrades with every release.",
    who: "Bespoke Everything builds it. You describe the screen or the calculation in your own words.",
  },
];

type ExplainItem = {
  badge: string;
  kicker: string;
  name: string;
  plain: string;
  example: string;
  who: string;
  differentLabel: string;
  different: string;
  /** Short label for the previous and next buttons. */
  nav: string;
};

function ExplainDialog({
  items,
  index,
  onClose,
  onChange,
}: {
  items: ExplainItem[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const item = items[index];
  const prev = index > 0 ? index - 1 : null;
  const next = index < items.length - 1 ? index + 1 : null;

  useEffect(() => {
    // Capture phase so the deck's own arrow-key handler does not also move the slide.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        onClose();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (next !== null) onChange(next);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (prev !== null) onChange(prev);
      } else if ([" ", "Spacebar", "PageDown", "PageUp", "Home", "End"].includes(event.key)) {
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [next, prev, onChange, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explain-dialog-title"
      className="deck-fade absolute inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-10 backdrop-blur-sm"
      style={{ animationDuration: "0.2s" }}
      onClick={onClose}
    >
      <div
        className="deck-pop relative w-full max-w-3xl rounded-3xl border border-teal-400/30 bg-neutral-900 p-7 shadow-2xl shadow-black/60"
        style={{ animationDuration: "0.25s" }}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300" />

        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-400/40 bg-teal-500/15 text-2xl font-black text-teal-300">
              {item.badge}
            </span>
            <div>
              <p className="text-caption font-bold uppercase tracking-[0.2em] text-teal-300">{item.kicker}</p>
              <h3 id="explain-dialog-title" className="mt-1 text-2xl font-black tracking-tight text-white">
                {item.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-base leading-relaxed text-white/85">{item.plain}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-amber-300">For example</p>
            <p className="mt-1.5 text-sm leading-snug text-white/75">{item.example}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-amber-300">Who does it</p>
            <p className="mt-1.5 text-sm leading-snug text-white/75">{item.who}</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-teal-400/25 bg-teal-500/[0.07] p-4">
          <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">{item.differentLabel}</p>
          <p className="mt-1.5 text-sm leading-snug text-white/80">{item.different}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={prev === null}
            onClick={() => prev !== null && onChange(prev)}
            className={cn(
              "flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-left text-sm font-semibold leading-tight text-white/80 transition hover:border-white/40 hover:text-white",
              prev === null && "invisible",
            )}
          >
            <ArrowRight className="h-4 w-4 shrink-0 rotate-180" />
            {prev !== null ? items[prev].nav : ""}
          </button>
          <p className="shrink-0 text-caption text-white/40">Esc to close · arrow keys to move</p>
          <button
            type="button"
            disabled={next === null}
            onClick={() => next !== null && onChange(next)}
            className={cn(
              "flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-left text-sm font-semibold leading-tight text-white/80 transition hover:border-white/40 hover:text-white",
              next === null && "invisible",
            )}
          >
            {next !== null ? items[next].nav : ""}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LayerDialog({
  layers,
  index,
  onClose,
  onChange,
}: {
  layers: Layer[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const items: ExplainItem[] = layers.map((layer) => ({
    badge: layer.level,
    kicker: `${layer.level === "0" ? "The foundation" : `Layer ${layer.level} of 4`} · Where bespoke plugs in`,
    name: layer.name,
    plain: layer.plain,
    example: layer.example,
    who: layer.who,
    differentLabel: "How it differs from the other layers",
    different: layer.different,
    nav: `${layer.level} · ${layer.name}`,
  }));
  return <ExplainDialog items={items} index={index} onClose={onClose} onChange={onChange} />;
}

function CustomisationSlide() {
  const [openLayer, setOpenLayer] = useState<number | null>(null);

  return (
    <BespokeBrandedSlide className="bg-neutral-950">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl">
        <SlideHeading
          kicker="Extensions without a fork"
          title="Your way of working is a requirement,"
          highlight="not a change request."
          lede="jalipi was designed from the first line to be extended. Bespoke plugs into fixed points in the shared product, the way an app survives a phone update, so it upgrades with every release. Bespoke Everything is the studio built alongside the platform to do exactly this work."
        />

        <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-4">
          <div className="grid grid-cols-2 gap-2.5">
            {ROUTE.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="deck-rise relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur"
                  style={{ animationDelay: `${0.25 + index * 0.1}s` }}
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                  <div className="flex items-center gap-2.5">
                    <IconChip icon={Icon} tone="amber" />
                    <div>
                      <p className="text-caption font-bold uppercase tracking-[0.16em] text-amber-300">
                        0{index + 1} · {step.who}
                      </p>
                      <p className="text-sm font-black tracking-tight text-white">{step.step}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-caption leading-snug text-white/70">{step.body}</p>
                </div>
              );
            })}
          </div>

          <div
            className="deck-rise rounded-2xl border border-teal-400/25 bg-teal-500/[0.05] p-3.5"
            style={{ animationDelay: "0.55s" }}
          >
            <div className="flex items-baseline justify-between">
              <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">
                Where bespoke plugs in
              </p>
              <p className="text-caption text-white/40">Click a layer to explore</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {LAYERS.map((layer, index) => (
                <button
                  key={layer.level}
                  type="button"
                  onClick={() => setOpenLayer(index)}
                  className={cn(
                    "group flex w-full items-start gap-2.5 rounded-lg border px-2.5 py-1.5 text-left transition",
                    layer.level === "0"
                      ? "border-teal-400/40 bg-teal-500/15 hover:bg-teal-500/25"
                      : "border-white/10 bg-white/[0.04] hover:border-teal-400/40 hover:bg-white/[0.08]",
                  )}
                >
                  <span className="mt-px w-4 shrink-0 text-body font-black text-teal-300">{layer.level}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-body font-bold leading-tight text-white">{layer.name}</p>
                    <p className="text-caption leading-snug text-white/60">{layer.body}</p>
                  </div>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-teal-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3.5">
          <Strip delay="0.8s" warm>
            <span className="font-bold text-white">Bespoke never gets a no.</span> It is placed in the
            layer where it cannot become a fork. And when enough customers need the same thing, it
            moves into the core for everyone.
          </Strip>
        </div>
      </div>

      {openLayer !== null ? (
        <LayerDialog
          layers={LAYERS}
          index={openLayer}
          onClose={() => setOpenLayer(null)}
          onChange={setOpenLayer}
        />
      ) : null}
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 4b. Extensions without a fork, the visual version
// ---------------------------------------------------------------------------

const PLUGS: { icon: LucideIcon; name: string }[] = [
  { icon: Wrench, name: "Premium rule" },
  { icon: ShieldCheck, name: "Approval flow" },
  { icon: FileText, name: "Board report" },
];

const RELEASES: { label: string; when: string; core: string[]; added?: string }[] = [
  { label: "Release 1", when: "Go-live", core: ["Scheduling", "Pay rules", "Time and attendance"] },
  { label: "Release 2", when: "Three months on", core: ["Scheduling", "Pay rules", "Time and attendance"], added: "Leave forecasting" },
  { label: "Release 3", when: "A year on", core: ["Scheduling", "Pay rules", "Time and attendance", "Leave forecasting"], added: "Fatigue rules" },
];

function PlugPiece({
  icon: Icon,
  name,
  muted = false,
  plug = true,
}: {
  icon: LucideIcon;
  name: string;
  muted?: boolean;
  plug?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border px-1.5 py-1.5",
        muted
          ? "border-white/15 bg-white/[0.04] text-white/40"
          : "border-amber-400/50 bg-gradient-to-br from-amber-400/25 to-orange-500/20 text-amber-50",
      )}
    >
      <Icon className={cn("h-3 w-3 shrink-0", muted ? "text-white/40" : "text-amber-300")} />
      <span className="text-caption font-bold leading-none">{name}</span>
      {plug ? (
        <span
          className={cn(
            "absolute left-1/2 top-[calc(100%-2px)] z-10 h-2.5 w-[18px] -translate-x-1/2 rounded-b-[5px] border-x border-b",
            muted ? "border-white/20 bg-neutral-700" : "border-amber-200/90 bg-amber-400",
          )}
        />
      ) : null}
    </div>
  );
}

function CustomisationVisualSlide() {
  return (
    <BespokeBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Extensions without a fork"
          title="Your pieces plug in."
          highlight="The core keeps upgrading."
          lede="Bespoke Everything builds what makes your operation different as pieces that plug into fixed points in the shared product. Every release of the core arrives underneath them, and they keep working."
        />

        <div className="mt-4 grid grid-cols-[1fr_1fr_1fr] items-stretch gap-0">
          {RELEASES.map((release, index) => (
            <div key={release.label} className="relative flex">
              {index > 0 ? (
                <div
                  className="deck-rise absolute top-1/2 -left-3 z-10 flex -translate-y-1/2 flex-col items-center"
                  style={{ animationDelay: `${0.35 + index * 0.25}s` }}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-400/40 bg-neutral-950 text-teal-300">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              ) : null}
              <div
                className={cn(
                  "deck-rise flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3",
                  index > 0 && "ml-3",
                )}
                style={{ animationDelay: `${0.2 + index * 0.25}s` }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-caption font-bold uppercase tracking-[0.18em] text-white/60">{release.label}</p>
                  <p className="text-caption text-white/40">{release.when}</p>
                </div>

                <p className="mt-2 text-caption font-semibold uppercase tracking-[0.14em] text-amber-300/80">
                  Yours
                </p>
                <div className="relative z-10 mt-1.5 grid grid-cols-3 gap-1">
                  {PLUGS.map((plug, plugIndex) => (
                    <div
                      key={plug.name}
                      className="deck-rise"
                      style={{ animationDelay: `${0.5 + index * 0.25 + plugIndex * 0.08}s` }}
                    >
                      <PlugPiece icon={plug.icon} name={plug.name} />
                    </div>
                  ))}
                </div>

                <div className="relative flex-1 rounded-xl border border-teal-400/40 bg-gradient-to-b from-teal-500/25 to-teal-600/10 px-3 pt-5 pb-3">
                  {/* sockets, same three columns as the pieces so each tab lands in its hole */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-3 gap-1">
                    {PLUGS.map((plug) => (
                      <span
                        key={plug.name}
                        className="mx-auto -mt-px h-3.5 w-7 rounded-b-md border-x border-b border-teal-300/55 bg-neutral-950 shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <JalipiWordmark className="text-base text-white" />
                    <span className="text-caption font-semibold uppercase tracking-[0.14em] text-teal-200/80">
                      Shared core
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {release.core.map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-caption text-white/75">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-300" />
                        {item}
                      </li>
                    ))}
                    {release.added ? (
                      <li
                        className="deck-rise flex items-center gap-1.5 text-caption font-bold text-white"
                        style={{ animationDelay: `${0.9 + index * 0.25}s` }}
                      >
                        <Sparkles className="h-3 w-3 shrink-0 text-emerald-300" />
                        New: {release.added}
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] items-stretch gap-3">
          <Strip delay="1.1s" warm>
            <span className="font-bold text-white">Same three pieces on every release.</span> Nothing re-built,
            nothing re-tested because the core moved. And when enough customers need the same thing, it
            moves into the core for everyone.
          </Strip>
          <div
            className="deck-rise flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="relative">
              <PlugPiece icon={Wrench} name="Welded in" muted plug={false} />
              <span className="pointer-events-none absolute -inset-1 rounded-lg border border-dashed border-rose-400/50" />
            </div>
            <p className="max-w-[12rem] text-caption leading-snug text-white/55">
              <span className="font-bold text-rose-300">A fork, for contrast.</span> Bespoke welded into
              release 1. Releases 2 and 3 never arrive.
            </p>
          </div>
        </div>
      </div>
    </BespokeBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 5. What sets it apart
// ---------------------------------------------------------------------------

const USPS: { icon: LucideIcon; kicker: string; title: string; body: string; means: string }[] = [
  {
    icon: Wand2,
    kicker: "Implementation tools",
    title: "Months of consultancy, done by the platform.",
    body: "Guided discovery asks a thorough question set for each area you are implementing. The moment discovery is complete, the platform builds the whole solution from those answers: configuration, documents, decks and tests. Instantly, automatically, with no one keying anything in.",
    means: "A programme measured in weeks, and a working solution on the day discovery ends.",
  },
  {
    icon: GitBranch,
    kicker: "Branching",
    title: "One tenant. Every market, stage and team at once.",
    body: "Markets build in parallel on their own branches, each with its own access, rules and reporting. Proof of concept, build, test and live are branches too, so what you tested is exactly what goes live. Every change is instant, auditable and reversible.",
    means: "No cutovers, no migrating configuration between environments, and no re-testing what you already signed off.",
  },
  {
    icon: Database,
    kicker: "Data sets",
    title: "Test the whole system in one place, on real data.",
    body: "Copy live into a data set in a click: people, schedules, punches and demand. Run a forecast or a pay run against it, as many times as you like, with as many copies as you need. No sandbox estate, no database copies, no refresh requests, no run limits.",
    means: "Test as much as you want. One environment to pay for, always in step with live.",
  },
  {
    icon: Puzzle,
    kicker: "Extensions without a fork",
    title: "Bespoke is encouraged, not tolerated.",
    body: "jalipi was designed from the first line to be extended. Bespoke plugs into fixed points in the shared product, the way an app survives a phone update, so it upgrades with every release. Bespoke Everything, the studio behind the platform, builds whatever makes your operation different in days, priced before you sign.",
    means: "Ask for anything. It is built for you, it stays yours, and it never holds you back.",
  },
];

function UspSlide() {
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="What sets it apart"
          title="Four things no other WFM platform"
          highlight="does like this."
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {USPS.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div
                key={usp.kicker}
                className="deck-rise flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-2.5">
                  <IconChip icon={Icon} />
                  <div>
                    <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">{usp.kicker}</p>
                    <p className="text-sm font-black leading-tight tracking-tight text-white">{usp.title}</p>
                  </div>
                </div>
                <p className="mt-2 flex-1 text-body leading-snug text-white/70">{usp.body}</p>
                <p className="mt-2 border-t border-white/10 pt-2 text-body leading-snug text-white/90">
                  <span className="font-bold text-amber-300">For you: </span>
                  {usp.means}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-3">
          <Strip delay="0.7s">
            <span className="font-bold text-white">Also worth knowing.</span> Configuration you can read and
            change yourselves, with a field-level history of who changed what and why. The reason behind every
            calculated value, on screen. No AI model in your pay run, and no per-run credit meter.
          </Strip>
        </div>
      </div>
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 6. Branching
// ---------------------------------------------------------------------------

const BRANCH_POINTS: {
  icon: LucideIcon;
  title: string;
  body: string;
  plain: string;
  example: string;
  who: string;
  different: string;
}[] = [
  {
    icon: Globe,
    title: "Markets build in parallel",
    body: "Each market works on its own branch, with its own access, rules and reporting. One team's work never disturbs another's.",
    plain:
      "A branch is a private copy of your configuration that a team can change without anyone else seeing it, and several can exist at the same time. The UK can rebuild its pay rules while France builds its own, in the same system, on the same day. Each branch has its own access and its own reporting, so one team's half-finished work never appears in the other's.",
    example:
      "The UK goes live in June. France is still building in July. Neither team waits, and neither sees the other's unfinished rules. When France is ready, its branch goes live on its own.",
    who: "Each market's own team, with access limited to its own branch. Other markets cannot see or change it until it is promoted.",
    different:
      "This is about different teams working at the same time. The next box is about the stages a single piece of work passes through. Both use branches. This one is what stops two teams overwriting each other.",
  },
  {
    icon: Route,
    title: "Stages are branches, not environments",
    body: "Proof of concept, build, test and live are branches in one tenant. Promotion moves the configuration instantly. Nothing to re-key, no cutover to plan.",
    plain:
      "A typical programme buys several copies of the system: a sandbox, a test system, a pre-production system, then live. Each copy drifts away from the others, and moving configuration between them means typing it in again and testing it again. In jalipi those stages are branches of the one tenant. Promoting a branch moves the configuration itself, straight away, so the thing you signed off is the thing that goes live.",
    example:
      "A proof of concept is a branch. It becomes the build, then the test, then live, by promotion. There is no second system to refresh, and no cutover weekend to plan.",
    who: "Your programme team moves a branch forward. Promotion is a click once the guards in the last box are satisfied, rather than a migration between systems.",
    different:
      "Parallel markets are branches that sit side by side for different teams. These are branches that mark how far one piece of work has got. The history box records what changed inside a branch. The guards decide whether a branch is allowed to become live.",
  },
  {
    icon: History,
    title: "Every change is on the record",
    body: "Field-level history in plain language: who changed what, when and why. Checkpoint and roll back at any point.",
    plain:
      "Every edit is stored as a sentence a person can read: who changed which field, when, and the reason they gave. You can mark a checkpoint, a named moment you trust, and roll the branch back to it if a later change turns out to be wrong. None of this touches live until you promote.",
    example:
      "On Tuesday the overtime threshold moves from 40 hours to 38, recorded against the person who changed it and the note \"new agreement\". On Thursday that branch is rolled back to Monday's checkpoint. Live is unchanged.",
    who: "The platform records every change itself. Anyone with access to the branch can read the history. Rolling back is a deliberate step, and it only affects that branch.",
    different:
      "The other three boxes describe where work happens and how it reaches live. This one is the record of what happened inside a branch, and the way back if it was wrong. It is the audit trail, separate from the workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Promote with guards",
    body: "Blocked if live has moved since the branch was taken, or if tests are not signed off. No silent overwrites.",
    plain:
      "Promotion is the moment a branch becomes live, and jalipi refuses it in two cases. If live has changed since the branch was taken, promoting would overwrite that newer work without anyone noticing. And if the tests for the branch have not been signed off, it is not ready. The promotion stops, and someone has to deal with the reason before it can go ahead.",
    example:
      "France finishes its rules, but yesterday the UK promoted a shared holiday policy. France's promotion is blocked until that policy is brought into the France branch and checked. A branch whose tests are unsigned is blocked in the same way, however finished it looks.",
    who: "The platform enforces the guards. A person still chooses when to promote. The guards decide whether that choice is allowed.",
    different:
      "Parallel work, stages and history all happen on branches, away from live. This is the gate between a branch and live. It is what makes the other three safe: two teams cannot overwrite each other, and configuration that has not been signed off cannot go live.",
  },
];

function PointList({
  points,
  delay = 0.4,
  onOpen,
}: {
  points: { icon: LucideIcon; title: string; body: string }[];
  delay?: number;
  onOpen?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {points.map((point, index) => {
        const Icon = point.icon;
        const className = cn(
          "deck-rise flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-left",
          onOpen && "group transition hover:border-teal-400/40 hover:bg-white/[0.08]",
        );
        const inner = (
          <>
            <IconChip icon={Icon} />
            <div className="min-w-0 flex-1">
              <p className="text-body font-bold leading-tight text-white">{point.title}</p>
              <p className="mt-0.5 text-caption leading-snug text-white/60">{point.body}</p>
            </div>
            {onOpen ? (
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-teal-300" />
            ) : null}
          </>
        );
        return onOpen ? (
          <button
            key={point.title}
            type="button"
            onClick={() => onOpen(index)}
            className={className}
            style={{ animationDelay: `${delay + index * 0.1}s` }}
          >
            {inner}
          </button>
        ) : (
          <div
            key={point.title}
            className={className}
            style={{ animationDelay: `${delay + index * 0.1}s` }}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function BranchingSlide() {
  const [openPoint, setOpenPoint] = useState<number | null>(null);
  const nodeLabel = { fill: "rgba(255,255,255,0.65)", fontSize: 11.5, textAnchor: "middle" as const };
  const explain: ExplainItem[] = BRANCH_POINTS.map((point, index) => ({
    badge: String(index + 1),
    kicker: `${index + 1} of ${BRANCH_POINTS.length} · Branching`,
    name: point.title,
    plain: point.plain,
    example: point.example,
    who: point.who,
    differentLabel: "How it differs from the other three",
    different: point.different,
    nav: point.title,
  }));
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Branching"
          title="One tenant. Every market, stage and team"
          highlight="building at once."
          lede="Branches manage change the way modern software teams do. Each market or project stage gets its own branch of the configuration, with its own access, rules and reporting. Every change is instant, fully auditable and reversible."
        />

        <div className="mt-3 grid grid-cols-[1.25fr_1fr] items-center gap-5">
          <div className="deck-rise" style={{ animationDelay: "0.25s" }}>
            <svg
              viewBox="0 0 640 258"
              className="w-full"
              role="img"
              aria-label="Two market branches leave live at the same time, are built and tested in parallel, and each promotes back to live when its tests are signed off. A third scenario branch is modelled, costed on real data and discarded without touching live"
            >
              <defs>
                <linearGradient id="whyBranchTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="whyBranchSky" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <line x1="20" y1="100" x2="620" y2="100" stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round" />
              <text x="20" y="90" fill="rgba(255,255,255,0.7)" fontSize="12" fontWeight="700" letterSpacing="2">
                LIVE
              </text>
              <circle cx="80" cy="100" r="7" fill="#0a0a0a" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />

              <path d="M 80 100 C 110 100 110 40 140 40 L 300 40 C 330 40 330 100 360 100" fill="none" stroke="url(#whyBranchTeal)" strokeWidth="3.5" strokeLinecap="round" />
              <text x="145" y="60" fill="#5eead4" fontSize="12" fontWeight="600">UK · pay and leave rules</text>
              <circle cx="210" cy="40" r="7" fill="#2dd4bf" />
              <text x="210" y="22" {...nodeLabel}>Build</text>
              <circle cx="285" cy="40" r="7" fill="#34d399" />
              <text x="285" y="22" {...nodeLabel}>Tests signed off</text>
              <circle cx="360" cy="100" r="9" fill="#fbbf24">
                <animate attributeName="r" values="9;11;9" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="374" y="122" fill="#fcd34d" fontSize="12" fontWeight="700">Promote</text>

              <path d="M 80 100 C 110 100 110 160 140 160 L 440 160 C 470 160 470 100 500 100" fill="none" stroke="url(#whyBranchSky)" strokeWidth="3.5" strokeLinecap="round" />
              <text x="145" y="148" fill="#7dd3fc" fontSize="12" fontWeight="600">France · pay and leave rules</text>
              <circle cx="240" cy="160" r="7" fill="#38bdf8" />
              <text x="240" y="186" {...nodeLabel}>Build</text>
              <circle cx="370" cy="160" r="7" fill="#34d399" />
              <text x="370" y="186" {...nodeLabel}>Tests signed off</text>
              <circle cx="500" cy="100" r="9" fill="#fbbf24">
                <animate attributeName="r" values="9;11;9" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              <text x="514" y="122" fill="#fcd34d" fontSize="12" fontWeight="700">Promote</text>

              <path d="M 80 100 C 110 100 110 226 140 226 L 470 226" fill="none" stroke="#fb7185" strokeOpacity="0.8" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="7 7" />
              <text x="145" y="214" fill="#fda4af" fontSize="12" fontWeight="600">Scenario · what if overtime starts at 38 hours</text>
              <circle cx="260" cy="226" r="7" fill="#fb7185" />
              <text x="260" y="252" {...nodeLabel}>Model</text>
              <circle cx="385" cy="226" r="7" fill="#fb7185" />
              <text x="385" y="252" {...nodeLabel}>Costed on last January</text>
              <circle cx="470" cy="226" r="9" fill="#0a0a0a" stroke="#fb7185" strokeWidth="2.5" />
              <path d="M 466 222 L 474 230 M 474 222 L 466 230" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
              <text x="484" y="230" fill="#fda4af" fontSize="12" fontWeight="700">Discarded</text>
            </svg>
            <p className="mt-1 text-center text-caption text-white/60">
              Two markets configured at the same time, in one tenant, and a scenario costed on real data then
              thrown away. Each market goes live when its own tests are signed off.{" "}
              <span className="font-semibold text-white/85">No environments, no re-keying, no cutover weekend.</span>
            </p>
          </div>

          <div>
            <p className="mb-1.5 text-right text-caption text-white/40">Click a box to explore</p>
            <PointList points={BRANCH_POINTS} onOpen={setOpenPoint} />
          </div>
        </div>
      </div>
      {openPoint !== null ? (
        <ExplainDialog
          items={explain}
          index={openPoint}
          onClose={() => setOpenPoint(null)}
          onChange={setOpenPoint}
        />
      ) : null}
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 7. Data sets
// ---------------------------------------------------------------------------

const DATASET_POINTS: {
  icon: LucideIcon;
  title: string;
  body: string;
  plain: string;
  example: string;
  who: string;
  different: string;
}[] = [
  {
    icon: Server,
    title: "One environment, not an estate",
    body: "Live, a Sandbox and a dedicated set for every test branch all sit in your one tenant. Nothing to provision, refresh or keep in step.",
    plain:
      "A typical programme pays for several copies of the system: a sandbox, a test system, a pre-production system. Each one is provisioned, refreshed and kept in step by someone. In jalipi those are data sets inside the one tenant you already have. Live is one. A Sandbox is another. Every test branch can have its own. They arrive with the tenant, and they stay in step because they are the same system.",
    example:
      "The UK test branch has its own data set from the moment the branch exists. France's branch has another. Both sit beside Live in the same tenant. Nobody raises a ticket to stand a system up.",
    who: "The platform provides them with the tenant. Your team uses them.",
    different:
      "This box is about where the data lives: one tenant, as many data sets as the work needs. The next box is how a data set is filled, by cloning Live. The third is the rule that keeps Live safe. The fourth is the answer you get once a copy exists.",
  },
  {
    icon: Copy,
    title: "Real data without database copies",
    body: "Clone from Live in a click and run a forecast, a schedule or a pay run against the copy. No DBA, no refresh request, no masking project.",
    plain:
      "A data set is filled by cloning Live. People, schedules, punches and demand come across in a click, and you can take as many copies as you need, including a copy of one particular month. You then run a real forecast, a real schedule or a real pay run against that copy. It is the operational data itself, so there is no database administrator, no refresh ticket and no project to mask personal data before anyone can look at it.",
    example:
      "Last January was the busiest month. Clone it into its own data set and run the pay engine against it. The result is what that month would have cost, on the real data, with the rules from your branch.",
    who: "Anyone with access clones it. The platform does the copy.",
    different:
      "The first box is that every data set lives in the one tenant. This one is how a data set gets its contents: a clone of Live, ready for the real engines. The protection of Live, and the decision you make after the run, are the two boxes after this.",
  },
  {
    icon: Lock,
    title: "Live is protected",
    body: "A test never writes to Live. Promotion moves rules, never operational data. The experiment stays in its own world.",
    plain:
      "A test writes only to its own data set. Live is never the place a trial forecast, schedule or pay run lands. When you promote, what moves is the configuration: the rules. People, punches and schedules stay where they are. The experiment finishes in its own world.",
    example:
      "A pay run against the copy of last January can be repeated all afternoon. Live's January is the same at the end of it. Promoting the new overtime rule afterwards changes the rule on Live and leaves January's figures where they were.",
    who: "The platform enforces the boundary. A person chooses to run a test or to promote. Test results stay in the data set they were run in.",
    different:
      "Cloning gives you a copy to work on. This box is the guarantee around that copy: a test can only write to it, and promotion carries rules rather than operational data. The last box is what you learn from the run. This one is why that learning stays out of the live operation.",
  },
  {
    icon: Gauge,
    title: "Answers before anyone is affected",
    body: "Change a pay rule on a branch, run it against last January and see the cost. Then promote it, or throw it away.",
    plain:
      "The rules live on a branch and the operational world lives in a data set, so you can ask a question of the real operation and read the answer before anyone is affected by it. Change a rule on a branch, run it against a copy of a real period, and see the cost. Then promote the rule, or throw the branch away. The people on Live finish the day on the schedules they started with.",
    example:
      "Overtime after 38 hours instead of 40. Run it against last January and read the cost line by line. If the number is acceptable, promote the rule. If it is not, discard the branch. Last January on Live is unchanged either way.",
    who: "Your own team runs it, as often as you want. The platform does the calculation on the real engines. Promoting or discarding stays your decision.",
    different:
      "The other three boxes are the machinery: one tenant, a clone of Live, and a Live that a test cannot write to. This box is the reason for them. It is the answer, a cost or a schedule or a pay result, while the live operation carries on as it was.",
  },
];

const DATASET_FLOW: { kicker: string; title: string; body: string; tone: "live" | "copy" | "run" | "result" }[] = [
  {
    kicker: "Live data set",
    title: "Your operation as it is",
    body: "People, schedules, punches, demand and pay. Protected: never written by a test.",
    tone: "live",
  },
  {
    kicker: "Clone in a click",
    title: "Copy of last January",
    body: "Your busiest real month, in its own data set. Seconds, not a change ticket.",
    tone: "copy",
  },
  {
    kicker: "Run against it",
    title: "Forecast · Schedule · Pay run",
    body: "The real engines, on the real month, with the rules from your branch.",
    tone: "run",
  },
  {
    kicker: "Result",
    title: "The cost is known before go-live",
    body: "Overtime after 38 hours instead of 40: what it would have cost, line by line.",
    tone: "result",
  },
];

const FLOW_TONES: Record<(typeof DATASET_FLOW)[number]["tone"], string> = {
  live: "border-white/20 bg-white/[0.06]",
  copy: "border-sky-400/40 bg-sky-500/10",
  run: "border-teal-400/40 bg-teal-500/10",
  result: "border-amber-400/50 bg-amber-500/10",
};

function DataSetsSlide() {
  const [openPoint, setOpenPoint] = useState<number | null>(null);
  const explain: ExplainItem[] = DATASET_POINTS.map((point, index) => ({
    badge: String(index + 1),
    kicker: `${index + 1} of ${DATASET_POINTS.length} · Data sets`,
    name: point.title,
    plain: point.plain,
    example: point.example,
    who: point.who,
    differentLabel: "How it differs from the other three",
    different: point.different,
    nav: point.title,
  }));
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Data sets"
          title="Test the whole system in one place,"
          highlight="on real data."
          lede="Branches version your rules. Data sets version your operational world. Together they replace the sandbox, UAT and pre-production estate that most programmes pay for and struggle to keep in step."
        />

        <div className="mt-3 grid grid-cols-[1.25fr_1fr] items-center gap-4">
          <div className="deck-rise grid grid-cols-2 gap-2" style={{ animationDelay: "0.25s" }}>
            {DATASET_FLOW.map((step, index) => (
              <div key={step.kicker} className={cn("flex flex-col rounded-2xl border p-3.5", FLOW_TONES[step.tone])}>
                <p
                  className={cn(
                    "text-caption font-bold uppercase tracking-[0.16em]",
                    step.tone === "result" ? "text-amber-300" : step.tone === "live" ? "text-white/50" : "text-teal-300",
                  )}
                >
                  0{index + 1} · {step.kicker}
                </p>
                <p className="mt-1.5 text-sm font-black leading-tight text-white">{step.title}</p>
                <p className="mt-1.5 text-caption leading-snug text-white/65">{step.body}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-1.5 text-right text-caption text-white/40">Click a box to explore</p>
            <PointList points={DATASET_POINTS} onOpen={setOpenPoint} />
          </div>
        </div>

        <div className="mt-3">
          <Strip delay="0.8s">
            <span className="font-bold text-white">One environment to pay for,</span> and it is always in
            step with live, because it is live, copied when you need it.
          </Strip>
        </div>
      </div>
      {openPoint !== null ? (
        <ExplainDialog
          items={explain}
          index={openPoint}
          onClose={() => setOpenPoint(null)}
          onChange={setOpenPoint}
        />
      ) : null}
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 5. Implementation tools
// ---------------------------------------------------------------------------

const PIPELINE: {
  icon: LucideIcon;
  title: string;
  body: string;
  plain: string;
  example: string;
  who: string;
  different: string;
  /** The amber end card. The others are the teal steps with an arrow after them. */
  end?: boolean;
}[] = [
  {
    icon: ClipboardList,
    title: "Guided discovery",
    body: "A clear, thorough question set for each area you are implementing, such as time and attendance, scheduling and leave. Every answer becomes a numbered requirement.",
    plain:
      "Discovery is a set of questions, scoped to the parts of jalipi you have said you are implementing. If that is time and attendance, scheduling and leave, those are the question sets you get. Within each area the questions are deliberately thorough: every piece of information is asked for, and each question carries the context the answer needs. Each answer is kept as a numbered requirement, and that requirement is what gets built.",
    example:
      "You are implementing time and attendance, scheduling and leave. Discovery opens the question set for each of those areas. Every question is specific, and it asks for the context the answer depends on, so the requirement that comes out is complete enough to build from.",
    who: "The people who know the operation: managers, payroll, HR. They work through the question sets for the areas in scope.",
    different:
      "This is the only step where a person supplies the detail, and they do it by answering the questions for the areas being implemented. Every step after it is generated from those answers. The thoroughness is what makes the later steps complete: a missing answer is missing context, and the configuration, the tests and the documents all miss it in the same way.",
  },
  {
    icon: Wand2,
    title: "Solution built instantly",
    body: "The platform turns the requirements into a working configuration branch automatically, the moment discovery is complete. Reviewed with you on screen, not keyed in from a document.",
    plain:
      "The moment the last discovery question is answered, jalipi turns those requirements into a working configuration, on its own branch. Nobody re-types the rules from a document into a separate system, so there is no gap between what was agreed and what was built. You review the result on screen and correct the answer if it came out wrong.",
    example:
      "Discovery finishes on a Thursday. The same day you are looking at your sites, pay rules and approval policies running in a branch, and a wrong Sunday rate is fixed by changing the requirement rather than raising a defect.",
    who: "The platform builds it. Your team reviews it on screen and changes the requirement if the result is not what was meant.",
    different:
      "Guided discovery captures the answers, area by area. This step turns those answers into configuration, with nothing re-typed in between. The tests and the documents are generated from the same configuration, so they describe the system you are looking at.",
  },
  {
    icon: FlaskConical,
    title: "Tests created and run",
    body: "Test scripts and data are generated from the same requirements and run against the real pay and scheduling engines.",
    plain:
      "The same requirements that built the configuration also write the tests, and those tests run against the real scheduling and pay engines. A test asks an engine to do the thing a requirement described and checks the result. If a rule pays the wrong amount, the test fails before anyone spends time checking it by hand.",
    example:
      "Requirement 14 says overtime starts after 38 hours. The generated test puts a 40-hour week through the real pay engine and checks that the two extra hours are paid as overtime. It runs as soon as the configuration exists.",
    who: "The platform writes and runs them. Your team does not write test scripts. A failure comes back attached to the requirement it came from.",
    different:
      "UAT, the next step, is people checking the system the way they will use it. This step is the automatic check that the engines do what the requirements said, and it runs first. It uses the real engines, so a pass here is a pass of the product itself.",
  },
  {
    icon: Users,
    title: "UAT in the product",
    body: "Testers get logins and a guided runner. Evidence, defects, retests and sign-off are captured in the product.",
    plain:
      "User acceptance testing happens inside jalipi, not in a spreadsheet beside it. Testers get their own logins and a guided runner that walks them through the scenarios. Evidence, defects, retests and the final sign-off are captured in the product, so the record of what was accepted is the same system that will go live.",
    example:
      "A payroll lead works through last January's busiest week, accepts three scenarios, raises one defect against a Sunday rate, and signs the pack off when the retest passes. That sign-off is what go-live looks for.",
    who: "Your own testers, usually the people who will live with the result. The platform gives them the runner and keeps the evidence. Nobody collects screenshots into a folder.",
    different:
      "The automatic tests check the engines against the requirements. This step is people confirming the result is what the operation needs, with a sign-off the platform can see. Go-live is blocked without it, which is why the evidence lives in the product rather than in an email.",
  },
  {
    icon: ShieldCheck,
    title: "Go-live on proof",
    body: "Promote to live warns, or blocks, without signed UAT.",
    plain:
      "Promotion to live checks for a signed UAT before it proceeds. Without that sign-off it warns, or it blocks. Going live is a promotion of the branch that was tested, not a separate exercise where configuration is copied into another system on the night.",
    example:
      "The branch is ready on a Friday and UAT is signed, so promotion takes that configuration live immediately. If the sign-off is missing, the promotion stops and names the reason.",
    who: "Your programme team chooses when to promote. The platform enforces the check. A date arriving is not enough on its own.",
    different:
      "The four steps before this one produce a branch, the tests and a sign-off. This is the gate that uses them. What was tested is what goes live, and it cannot go live without the proof.",
    end: true,
  },
];

const DOCS: string[] = [
  "Solution and requirements summaries generated from the configuration itself",
  "Executive decks for stakeholders, on demand",
  "Regenerated when the configuration changes, so they are never out of date",
];

function ImplementationSlide() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const explain: ExplainItem[] = PIPELINE.map((step, index) => ({
    badge: String(index + 1),
    kicker: `${index + 1} of ${PIPELINE.length} · Implementation`,
    name: step.title,
    plain: step.plain,
    example: step.example,
    who: step.who,
    differentLabel: "How it differs from the other steps",
    different: step.different,
    nav: step.title,
  }));
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Implementation tools"
          title="From discovery to live,"
          highlight="the heavy lifting is automated."
          lede="Requirements, configuration and tests are the same thing in jalipi. What is answered in discovery becomes the configuration, the configuration writes its own documents and tests, and nothing is re-keyed along the way."
        />

        <p className="mt-3 text-right text-caption text-white/40">Click a step to explore</p>
        <div className="mt-1.5 flex items-stretch gap-2">
          {PIPELINE.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className={cn("flex items-center gap-2", step.end ? "w-44 shrink-0" : "flex-1")}>
                <button
                  type="button"
                  onClick={() => setOpenStep(index)}
                  className={cn(
                    "deck-rise group h-full flex-1 transition",
                    step.end
                      ? "rounded-2xl border-2 border-amber-400/60 bg-amber-500/10 p-3.5 text-center hover:bg-amber-500/20"
                      : "rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left hover:border-teal-400/40 hover:bg-white/[0.08]",
                  )}
                  style={{ animationDelay: `${0.25 + index * 0.1}s` }}
                >
                  <Icon className={cn(step.end ? "mx-auto h-5 w-5 text-amber-300" : "h-4 w-4 text-teal-300")} />
                  <p className={cn("mt-2 text-sm font-bold leading-snug", step.end ? "text-amber-200" : "text-white")}>
                    {step.title}
                  </p>
                  <p className={cn("mt-1 text-caption leading-snug", step.end ? "text-white/65" : "text-white/60")}>
                    {step.body}
                  </p>
                </button>
                {step.end ? null : <ArrowRight className="h-4 w-4 shrink-0 text-white/30" />}
              </div>
            );
          })}
        </div>

        <div className="mt-3.5 grid grid-cols-[1.4fr_1fr] gap-3">
          <div
            className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
            style={{ animationDelay: "0.85s" }}
          >
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-white/45">
              A typical programme against jalipi
            </p>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-caption text-white/55">Typical</span>
                <div className="h-4 rounded bg-white/25" style={{ width: "100%" }} />
                <span className="w-14 shrink-0 text-right text-body font-bold text-white/60">38 wks</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-caption text-teal-300">jalipi</span>
                <div className="flex w-full items-center">
                  <div
                    className="h-4 rounded bg-gradient-to-r from-teal-400 to-emerald-400"
                    style={{ width: `${(17 / 38) * 100}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-body font-bold text-teal-300">17 wks</span>
              </div>
            </div>
            <p className="mt-1.5 text-caption text-white/50">
              A programme measured in weeks, including three weeks to build your extensions, which a typical
              programme hides inside its build.
            </p>
          </div>
          <div
            className="deck-rise space-y-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
            style={{ animationDelay: "0.95s" }}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-teal-300" />
              <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">
                Documents and decks write themselves
              </p>
            </div>
            {DOCS.map((doc) => (
              <div key={doc} className="flex items-start gap-2 text-caption leading-snug text-white/80">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openStep !== null ? (
        <ExplainDialog
          items={explain}
          index={openStep}
          onClose={() => setOpenStep(null)}
          onChange={setOpenStep}
        />
      ) : null}
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 7a. What it means for you: your time, your return, your year three
// ---------------------------------------------------------------------------

const IMPACT: { icon: LucideIcon; kicker: string; title: string; usually: string; jalipi: string }[] = [
  {
    icon: Clock,
    kicker: "Your people's time",
    title: "Weeks of workshops and UAT, not months.",
    usually:
      "Design workshops, requirement documents to review, test scripts to write, UAT to staff. All from people who already have a day job.",
    jalipi:
      "Discovery is a thorough question set for the areas you are implementing. Documents, configuration and test packs are generated from the answers. UAT is a guided runner your testers follow in the product. You bring knowledge; the platform does the paperwork.",
  },
  {
    icon: TrendingUp,
    kicker: "Return on investment",
    title: "Paying back from the first quarter.",
    usually:
      "A twelve to eighteen month programme means a year of cost before a day of benefit. The business case ages before it starts.",
    jalipi:
      "Live in weeks, with the first market and the most valuable rules first. Savings in scheduling, overtime and compliance start while a typical programme would still be in design.",
  },
  {
    icon: Wrench,
    kicker: "Maintenance",
    title: "Change is a conversation, not a project.",
    usually:
      "Every rule change after go-live is a change request, a consultant, an environment and a regression cycle. So changes pile up until they are a project.",
    jalipi:
      "Configuration still comes through guided design, so a new site, policy or market is captured the same way and generated the same way. Roll out in phases, each on its own branch, each tested on your data before it goes live.",
  },
  {
    icon: BotMessageSquare,
    kicker: "Day-to-day support",
    title: "An assistant that knows your configuration.",
    usually:
      "After the consultants leave, the knowledge leaves with them. BAU teams work from a stale document and a ticket queue.",
    jalipi:
      "The AI that built your configuration understands it. Managers and administrators can ask why a schedule or a pay result came out the way it did and how to do something in the system, in plain language. The engines stay deterministic; the AI explains.",
  },
];

function ImpactSlide() {
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="What it means for you"
          title="Less of your time."
          highlight="A faster return."
          lede="Most programmes ask the most of the people with the least time to give, then take a year to pay anything back. jalipi is built to take that load off your side, from the first workshop to year three."
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {IMPACT.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.kicker}
                className="deck-rise flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-2.5">
                  <IconChip icon={Icon} />
                  <div>
                    <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">{item.kicker}</p>
                    <p className="text-sm font-black leading-tight tracking-tight text-white">{item.title}</p>
                  </div>
                </div>
                <p className="mt-2 text-body leading-snug text-white/55">
                  <span className="font-bold text-white/70">Usually: </span>
                  {item.usually}
                </p>
                <p className="mt-2 flex-1 border-t border-white/10 pt-2 text-body leading-snug text-white/90">
                  <span className="font-bold text-amber-300">With jalipi: </span>
                  {item.jalipi}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 7. The people: built by practitioners, delivered by FrontlineXP
// ---------------------------------------------------------------------------

const LESSONS: { limit: string; answer: string }[] = [
  { limit: "Configuration built by hand", answer: "Generated from discovery" },
  { limit: "Bespoke that froze the version", answer: "Native extensions that upgrade" },
  { limit: "Whatever one system offered", answer: "The best of the leading WFM systems" },
  { limit: "Testing in spreadsheets", answer: "Test packs and UAT in the product" },
];

const DELIVERY: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: "Operator-led discovery",
    body: "How your floor really runs, not just what the policy says.",
  },
  {
    icon: FlaskConical,
    title: "Configuration review and testing",
    body: "Checked by WFM specialists and proved against your data.",
  },
  {
    icon: Users,
    title: "Go-live on the floor",
    body: "Alongside your managers and colleagues, not from a war room.",
  },
  {
    icon: ShieldCheck,
    title: "A managed service afterwards",
    body: "Accountable for the outcome, not just the cutover.",
  },
];

const ROLES: { who: ReactNode; does: string }[] = [
  {
    who: (
      <span className="inline-flex items-center gap-2.5">
        <JalipiWordmark className="text-sm text-white" />
        <span className="h-3.5 w-px bg-white/20" />
        <PartyLogo party="qtc" size="sm" />
      </span>
    ),
    does: "The platform",
  },
  {
    who: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/frontlinexp-white.svg" alt="FrontlineXP" className="h-5 w-auto" />
    ),
    does: "Implementation and managed service",
  },
  {
    who: (
      <BespokeEverythingLogo variant="dark" layout="inline" showTagline={false} className="text-caption" />
    ),
    does: "Your extensions",
  },
];

function ExpertsSlide() {
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows flip />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading
          kicker="Who is behind it"
          title="Built by WFM experts."
          highlight="Delivered by WFM experts."
          lede="jalipi was not designed from a feature list. It was designed by people who have spent their careers implementing workforce management, and it is delivered by a partner that does nothing else."
        />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            className="deck-rise rounded-2xl border border-teal-400/30 bg-teal-500/[0.06] p-4"
            style={{ animationDelay: "0.25s" }}
          >
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">
              The product · built by genuine experts
            </p>
            <p className="mt-1.5 text-body leading-snug text-white/75">
              Twenty years implementing, architecting and product-managing enterprise WFM across retail,
              hospitality, manufacturing and the public sector. Every design decision answers a limit hit
              on a real programme.
            </p>
            <div className="mt-3 space-y-1.5">
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.limit}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-caption leading-snug"
                >
                  <span className="text-white/50 line-through decoration-white/25">{lesson.limit}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-teal-300/70" />
                  <span className="font-semibold text-white">{lesson.answer}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="deck-rise rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.05] p-4"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-caption font-bold uppercase tracking-[0.18em] text-emerald-300">
                Delivery partner · the WFM expertise
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/frontlinexp-white.svg" alt="FrontlineXP" className="h-6 w-auto" />
            </div>
            <p className="mt-1.5 text-body leading-snug text-white/75">
              FrontlineXP leads the programme with you. Its founders have led workforce programmes for
              some of the largest retailers and operators in the world.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {DELIVERY.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                      <p className="text-body font-bold leading-tight text-white">{item.title}</p>
                    </div>
                    <p className="mt-1 text-caption leading-snug text-white/60">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="deck-rise mt-3.5 grid grid-cols-3 gap-3"
          style={{ animationDelay: "0.6s" }}
        >
          {ROLES.map((role) => (
            <div
              key={role.does}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2"
            >
              <span className="flex h-6 items-center">{role.who}</span>
              <span className="text-right text-caption font-semibold text-white/65">{role.does}</span>
            </div>
          ))}
        </div>
      </div>
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// 8. Why jalipi
// ---------------------------------------------------------------------------

const CORE: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarClock, label: "Forecasting, labour demand and scheduling" },
  { icon: Clock, label: "Time and attendance, on any tablet or phone" },
  { icon: Layers, label: "Leave, pay rules and contracts" },
  { icon: Gauge, label: "Labour cost control and reporting" },
  { icon: Plug, label: "APIs for payroll and HR, CSV where there is none" },
];

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Puzzle,
    title: "It fits",
    body: "Your specifics are built in, not worked around. By a studio, as native extensions.",
  },
  {
    icon: GitBranch,
    title: "It stays safe to change",
    body: "Branches, data sets and tests mean year three is as easy to change as go-live.",
  },
  {
    icon: Blocks,
    title: "It is where software is going",
    body: "A shared core, yours on top, built with AI and predictable to run.",
  },
];

const NEXT: { step: string; body: string }[] = [
  { step: "A discovery conversation", body: "How you run today and what should change. If Workforce Central or eTIME is being retired under you, you are moving anyway: move to the model, not just the next version." },
  { step: "Your data in a working tenant", body: "Your sites, roles and rules in jalipi, within two weeks." },
  { step: "A fixed proposal", body: "Licence, implementation and first extensions. Fixed before you commit." },
];

function CloseSlide() {
  return (
    <JalipiBrandedSlide className="bg-neutral-950 text-white">
      <Glows />
      <div className="relative mx-auto w-full max-w-6xl px-10">
        <SlideHeading kicker="Why jalipi" title="The core you would expect." highlight="The rest is yours." />

        <div className="mt-4 grid grid-cols-3 gap-3">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="deck-rise flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <IconChip icon={Icon} />
                <div>
                  <p className="text-sm font-black tracking-tight">{reason.title}</p>
                  <p className="mt-0.5 text-caption leading-snug text-white/70">{reason.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-[1fr_1.1fr] gap-3">
          <div
            className="deck-rise rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            style={{ animationDelay: "0.55s" }}
          >
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-white/45">
              Everything a frontline operation expects
            </p>
            <ul className="mt-2.5 space-y-2">
              {CORE.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center gap-2.5 text-body text-white/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <Icon className="h-3.5 w-3.5 shrink-0 text-white/40" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className="deck-rise rounded-2xl border border-teal-400/40 bg-gradient-to-b from-teal-500/15 to-white/5 p-4"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-caption font-bold uppercase tracking-[0.18em] text-teal-300">What happens next</p>
            <ol className="mt-2.5 space-y-2.5">
              {NEXT.map((item, index) => (
                <li key={item.step} className="flex items-start gap-3">
                  <span className="mt-px text-body font-black text-teal-300">0{index + 1}</span>
                  <div>
                    <p className="text-sm font-bold tracking-tight text-white">{item.step}</p>
                    <p className="text-caption leading-snug text-white/65">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </JalipiBrandedSlide>
  );
}

// ---------------------------------------------------------------------------
// Deck
// ---------------------------------------------------------------------------

function buildSlides(): DeckSlide[] {
  return [
    { id: "cover", section: "jalipi", gradient: "from-teal-500 via-emerald-500 to-amber-500", node: <CoverSlide /> },
    { id: "future", section: "Where software is going", gradient: "from-teal-500 via-emerald-500 to-cyan-500", node: <FutureSlide /> },
    { id: "usps", section: "What sets it apart", gradient: "from-teal-500 via-emerald-500 to-amber-500", node: <UspSlide /> },
    { id: "implementation", section: "Implementation tools", gradient: "from-emerald-500 via-teal-500 to-amber-500", node: <ImplementationSlide /> },
    { id: "branching", section: "Branching", gradient: "from-teal-500 via-sky-500 to-emerald-500", node: <BranchingSlide /> },
    { id: "data-sets", section: "Data sets", gradient: "from-sky-500 via-teal-500 to-amber-400", node: <DataSetsSlide /> },
    { id: "extensions", section: "Extensions", gradient: "from-amber-500 via-orange-500 to-amber-300", node: <CustomisationSlide /> },
    { id: "extensions-visual", section: "Extensions", gradient: "from-amber-500 via-orange-500 to-amber-300", node: <CustomisationVisualSlide /> },
    { id: "impact", section: "What it means for you", gradient: "from-emerald-500 via-teal-500 to-sky-500", node: <ImpactSlide /> },
    { id: "people", section: "Who is behind it", gradient: "from-teal-500 via-emerald-500 to-amber-400", node: <ExpertsSlide /> },
    { id: "close", section: "Why jalipi", gradient: "from-rose-500 via-amber-500 to-teal-500", node: <CloseSlide /> },
  ];
}

export function WhyChooseJalipiDeck() {
  const slides = useMemo(() => buildSlides(), []);
  return <StudioSetupDeck slides={slides} />;
}
