import { NextResponse, type NextRequest } from "next/server";
import { isValidPreviewSession, PREVIEW_COOKIE } from "@/lib/preview-auth";

const PUBLIC_PATHS = new Set([
  "/login",
  "/robots.txt",
  "/icon.svg",
  "/apple-icon.svg",
]);

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) {
    return true;
  }

  return (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = await isValidPreviewSession(
    request.cookies.get(PREVIEW_COOKIE)?.value,
  );

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath(pathname) && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
