/**
 * Single source of truth for the JWT signing key, shared by the auth helpers
 * and the proxy. In production a real JWT_SECRET is mandatory; in development
 * a clearly-insecure fallback keeps local setup frictionless.
 */
const DEV_FALLBACK_SECRET = "dev-only-insecure-jwt-secret-do-not-use-in-production";

let cachedKey: Uint8Array | null = null;

export function getSessionKey(): Uint8Array {
  if (cachedKey) return cachedKey;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET environment variable must be set in production.");
    }
    console.warn("[auth] JWT_SECRET is not set; using an insecure development fallback.");
  } else if (secret.length < 32 && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
  }

  cachedKey = new TextEncoder().encode(secret || DEV_FALLBACK_SECRET);
  return cachedKey;
}
