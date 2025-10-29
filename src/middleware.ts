// middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// next-intl i18n middleware
const intl = createMiddleware(routing);

// helper: scoate prefixul de locale din pathname
function splitLocale(pathname: string) {
  const first = pathname.split("/")[1];
  const hasLocale = routing.locales.includes(first as any);
  return {
    noLoc: hasLocale ? pathname.replace(`/${first}`, "") : pathname,
    loc: hasLocale ? first : routing.defaultLocale,
  };
}

export default function middleware(req: NextRequest) {
  // rulează mai întâi i18n (detectează/normalizează locale)
  const res = intl(req);
  if (res.redirected) return res;

  const { pathname } = req.nextUrl;
  const { noLoc, loc } = splitLocale(pathname);

  // tot ce e în /admin/* trece prin guard
  if (noLoc.startsWith("/admin")) {
    const hasSession = Boolean(req.cookies.get("session")?.value);

    // 1) /admin/login este accesibil public
    if (noLoc === "/admin/login") {
      // dacă are deja sesiune, du-l direct în dashboard
      if (hasSession) {
        return NextResponse.redirect(new URL(`/${loc}/admin/posts`, req.url));
      }
      return res; // permite accesul la pagina de login
    }

    // 2) orice alt /admin/* cere sesiune
    if (!hasSession) {
      return NextResponse.redirect(new URL(`/${loc}/admin/login`, req.url));
    }
  }

  return res;
}

export const config = {
  // exclude: /api, /trpc, /_next, /_vercel, fișiere statice
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
