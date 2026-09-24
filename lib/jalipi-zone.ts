/**
 * The jalipi decks live in the jalipi app and are served here under /jalipi
 * (multi-zone). Shared between proxy.ts (page requests, with the site login in
 * front) and next.config.ts (static assets the deck pages reference).
 */
export const JALIPI_APP_ORIGIN = (
  process.env.JALIPI_APP_ORIGIN ?? "https://www.jalipi.com"
).replace(/\/+$/, "");

export function isJalipiDecksPath(pathname: string) {
  return pathname === "/jalipi" || pathname.startsWith("/jalipi/");
}
