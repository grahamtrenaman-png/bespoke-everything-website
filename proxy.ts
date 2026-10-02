import { NextResponse, type NextRequest } from "next/server";
import { isValidPreviewSession, PREVIEW_COOKIE } from "@/lib/preview-auth";
import { isJalipiDecksPath, JALIPI_APP_ORIGIN } from "@/lib/jalipi-zone";
import { safeReturnPath } from "@/lib/return-path";

const PUBLIC_PATHS = new Set([
  "/login",
  "/robots.txt",
  "/icon.svg",
  "/apple-icon.svg",
]);

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname) || pathname === "/oldbs" || pathname.startsWith("/oldbs/") || pathname.startsWith("/api/oldbs")) {
    return true;
  }

  return (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image")
  );
}

/**
 * `/jalipi/*` is a zone served by the jalipi app (Atlas-Platform,
 * `app/jalipi/*`). Same URL on both sides; only the origin changes. The site
 * login above still applies, and the shared key tells jalipi the request came
 * through here rather than straight to www.jalipi.com.
 */
function rewriteToJalipiZone(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = new URL(`${pathname}${search}`, JALIPI_APP_ORIGIN);
  const headers = new Headers(request.headers);
  headers.delete("cookie"); // the be_preview session is this site's business, not jalipi's
  const shareKey = process.env.JALIPI_DECKS_SHARE_KEY?.trim();
  if (shareKey) headers.set("x-jalipi-decks-key", shareKey);
  return NextResponse.rewrite(target, { request: { headers } });
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = await isValidPreviewSession(
    request.cookies.get(PREVIEW_COOKIE)?.value,
  );

  if (pathname === "/login" && hasSession) {
    const next = safeReturnPath(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(next, request.url));
  }

  if (!isPublicPath(pathname) && !hasSession) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(login);
  }

  const response = isJalipiDecksPath(pathname)
    ? rewriteToJalipiZone(request)
    : NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
