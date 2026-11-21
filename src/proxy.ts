import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getSessionKey } from "@/lib/session-secret";

const VALID_TEMPLATES = [
  "developer_terminal",
  "minimal_swiss",
  "aurora_studio",
  "bento_grid",
  "fancy_creative",
  "simple_professional",
];

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
  if (sessionCookie) {
    try {
      await jwtVerify(sessionCookie, getSessionKey(), { algorithms: ["HS256"] });
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Auth pages (login/register) - redirect to dashboard if already logged in
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
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
