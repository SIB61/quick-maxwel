/**
 * Database connection string, from the environment only (there is no implicit
 * local database any more).
 *
 * - Runtime queries use DATABASE_URL (a pooled connection string is fine and
 *   recommended on serverless hosts such as Vercel).
 * - Migrations prefer DATABASE_URL_UNPOOLED (a direct connection), because they
 *   take a session-level lock and run DDL, which poolers in transaction mode
 *   don't handle well. Neon's Vercel integration sets both variables.
 */
export function getDatabaseUrl({ direct = false }: { direct?: boolean } = {}): string {
  const url = (direct && process.env.DATABASE_URL_UNPOOLED) || process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your Postgres connection string to .env (locally) or to the " +
        "project's environment variables (Vercel). See .env.example."
    );
  }
  return url;
}
