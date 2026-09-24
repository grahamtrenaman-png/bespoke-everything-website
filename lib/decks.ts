export type DeckEntry = {
  href: string;
  kicker: string;
  title: string;
  body: string;
};

/**
 * Decks shared with Chris, Doug and the wider TCN circle.
 * Add new decks here; each needs a matching route under /studio/*.
 */
export const STUDIO_DECKS: DeckEntry[] = [
  {
    href: "/studio/setup",
    kicker: "For TCN · the studio",
    title: "Setting up the studio.",
    body: "How Bespoke Everything gets going: the platforms we build on, how it plugs into FrontlineXP, who runs it, how work arrives, and year one from January. Eleven slides.",
  },
  {
    href: "/studio/call",
    kicker: "For TCN · short version",
    title: "The studio in four slides.",
    body: "The idea, where we build, each vendor and how we show up, and how the studio runs. The talk-track version of the deck above.",
  },
  {
    href: "/studio/seats",
    kicker: "For TCN · the seats",
    title: "Three seats. Three job specs.",
    body: "Doug as co-founder on vendors and accounts, the seller who may become a co-founder, and the skilled builder. The job, what good looks like, who fits, and the terms we propose.",
  },
  {
    href: "/studio/plan",
    kicker: "For TCN · the plan",
    title: "Four years to a choice.",
    body: "Now to January, then four years. One job lined up before I join, twenty people by year four, a £200k overdraft barely used, and a studio worth £10 to 15m at the end. Indicative.",
  },
  {
    href: "/studio/partnership",
    kicker: "For QTC and TCN",
    title: "The partnership.",
    body: "QuickThink Cloud, Bespoke Everything and TCN on jalipi. Who does what, how a deal is invoiced, the stake and the kickback still to agree, and the handover before January.",
  },
];
