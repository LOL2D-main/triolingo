import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "./lib/auth-constants";

const protectedRoutes = ["/learn", "/shop", "/quests", "/leaderboard", "/courses", "/lesson", "/settings"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "").toLowerCase();

  // Neu truy cap tu ten mien rieng cua trang Download (triolingo-download.vercel.app)
  if (host.startsWith("triolingo-download")) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/download";
      return NextResponse.rewrite(url);
    }
    if (["/windows", "/android", "/apple"].includes(pathname.toLowerCase())) {
      const url = request.nextUrl.clone();
      url.pathname = `/download${pathname.toLowerCase()}`;
      return NextResponse.rewrite(url);
    }
  }

  const session = request.cookies.get(AUTH_COOKIE_NAME);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
