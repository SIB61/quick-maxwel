import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSessionKey } from "./session-secret";

const COOKIE_NAME = "pb_session";
const SESSION_EXPIRATION = "7d";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  handle: string;
  name: string;
  [key: string]: unknown;
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRATION)
    .sign(getSessionKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(user: { id: string; email: string; handle: string; name: string }) {
  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    handle: user.handle,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.userId) return null;

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.userId),
      with: {
        settings: true,
      },
    });
    return user || null;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Reserved handles that cannot be registered by users
export const RESERVED_HANDLES = new Set([
  "admin",
  "dashboard",
  "login",
  "register",
  "logout",
  "auth",
  "api",
  "settings",
  "public",
  "static",
  "assets",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export function isHandleReserved(handle: string): boolean {
  return RESERVED_HANDLES.has(handle.toLowerCase().trim());
}
