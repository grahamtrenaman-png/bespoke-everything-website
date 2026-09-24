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
];
