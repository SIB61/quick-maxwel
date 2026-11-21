import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getSessionKey } from "@/lib/session-secret";
import { isBlockedDemoAccount } from "@/lib/demo-account";

const VALID_TEMPLATES = [
  "developer_terminal",
  "minimal_swiss",
  "aurora_studio",
  "bento_grid",
  "fancy_creative",
  "simple_professional",
];

const VALID_PALETTES = ["slate", "emerald", "neon", "terracotta", "ocean"];
const VALID_FONTS = ["sans", "serif", "mono"];
const STUDIO_COOKIE = "pb_studio_preview";

/**
 * Theme Studio preview: `?studio=1&template=…&palette=…&font=…` renders the
 * portfolio with unsaved theme settings. The choice is remembered in a cookie
 * that is only honoured for iframe loads (Sec-Fetch-Dest: iframe), so it never
 * leaks into the owner's normal browsing tabs.
 */
function parseStudioPreview(value: string | null | undefined) {
  if (!value) return null;
  const [template, palette, font] = value.split(".");
  if (!VALID_TEMPLATES.includes(template) || !VALID_PALETTES.includes(palette) || !VALID_FONTS.includes(font)) {
    return null;
  }
  return { template, palette, font };
}

function withStudioHeaders(request: NextRequest, preview: { template: string; palette: string; font: string }) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-preview-template", preview.template);
  requestHeaders.set("x-preview-palette", preview.palette);
  requestHeaders.set("x-preview-font", preview.font);
  requestHeaders.set("x-preview-studio", "1");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionCookie = request.cookies.get("pb_session")?.value;

  // Handle exiting preview mode
  if (searchParams.get("exit_preview") === "true") {
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete("exit_preview");
    cleanUrl.searchParams.delete("template");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.delete("pb_preview_template");
    return response;
  }

  let isAuthenticated = false;
  // A session for the public demo account is invalid in production; clear it
  // so /login and /dashboard don't bounce between each other.
  let clearDemoSession = false;
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, getSessionKey(), { algorithms: ["HS256"] });
      if (isBlockedDemoAccount(typeof payload.email === "string" ? payload.email : null)) {
        clearDemoSession = true;
      } else {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }
  const withSessionCleanup = (response: NextResponse) => {
    if (clearDemoSession) response.cookies.delete("pb_session");
    return response;
  };

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return withSessionCleanup(NextResponse.redirect(loginUrl));
    }
    return NextResponse.next();
  }

  // Auth pages (login/register) - redirect to dashboard if already logged in
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return withSessionCleanup(NextResponse.next());
  }

  // Theme Studio live preview (embedded in the dashboard)
  if (searchParams.get("studio") === "1") {
    const preview = parseStudioPreview(
      `${searchParams.get("template")}.${searchParams.get("palette")}.${searchParams.get("font")}`
    );
    if (preview) {
      const response = withStudioHeaders(request, preview);
      response.cookies.set(STUDIO_COOKIE, `${preview.template}.${preview.palette}.${preview.font}`, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 12,
      });
      return response;
    }
  }
  if (request.headers.get("sec-fetch-dest") === "iframe" && !pathname.startsWith("/dashboard")) {
    const preview = parseStudioPreview(request.cookies.get(STUDIO_COOKIE)?.value);
    if (preview) return withStudioHeaders(request, preview);
  }

  // Handle template preview parameter on portfolio routes
  const templateParam = searchParams.get("template");
  if (templateParam && VALID_TEMPLATES.includes(templateParam)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-preview-template", templateParam);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set("pb_preview_template", templateParam, {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  // Forward existing preview template cookie if present
  const previewCookie = request.cookies.get("pb_preview_template")?.value;
  if (
    previewCookie &&
    VALID_TEMPLATES.includes(previewCookie) &&
    !pathname.startsWith("/dashboard") &&
    pathname !== "/"
  ) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-preview-template", previewCookie);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
