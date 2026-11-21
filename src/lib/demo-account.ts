/**
 * The seeded demo account ("sarah") powers the public showcase portfolio.
 * Its credentials are public (seed script, README), so in production nobody
 * may sign in as it: logins are refused and existing sessions are ignored.
 * Set ALLOW_DEMO_LOGIN=true to override (e.g. on a private staging server).
 */
export const DEMO_USER_EMAIL = "sarah@example.com";
export const DEMO_USER_HANDLE = "sarah";

export function isDemoLoginAllowed() {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_DEMO_LOGIN === "true";
}

export function isBlockedDemoAccount(email: string | null | undefined) {
  return !isDemoLoginAllowed() && email?.toLowerCase().trim() === DEMO_USER_EMAIL;
}
