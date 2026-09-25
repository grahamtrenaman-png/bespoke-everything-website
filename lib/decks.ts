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
    href: "/studio/call",
    kicker: "For TCN · the studio",
    title: "The studio.",
    body: "The idea, where we build, each vendor and how we show up, who runs it, how work arrives, and the year from January.",
  },
  {
    href: "/studio/seats",
    kicker: "For TCN · the seats",
    title: "The roles.",
    body: "Graham on solutions and delivery, Doug on vendors and accounts, the seller, the builder, and the part TCN plays. Responsibilities, what good looks like, who fits, how the roles hand off, and how the seats grow to twenty.",
  },
  {
    href: "/studio/plan",
    kicker: "For TCN · the plan",
    title: "Four years to a choice.",
    body: "Now to January, then four years. One job lined up before we start, twenty people by year four, a £200k overdraft barely used, and a studio worth £10 to 15m at the end. Indicative.",
  },
  {
    href: "/studio/partnership",
    kicker: "For QTC and TCN",
    title: "The partnership.",
    body: "A working partnership between QuickThink Cloud and TCN. Doors both ways, jalipi as the first concrete piece, who does what, what is proposed and what is still to agree, and the handover before January.",
  },
];
