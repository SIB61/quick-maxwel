import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getDatabaseUrl } from "./database-url";

// Arbitrary constant: concurrent deployments take turns instead of racing.
const MIGRATION_LOCK_ID = 727274;

async function runMigrate() {
  console.log("⏳ Running migrations...");
  // A single direct connection: the session-level lock below must stay on one connection.
  const migrationClient = postgres(getDatabaseUrl({ direct: true }), { max: 1, onnotice: () => {} });

  try {
    await migrationClient`select pg_advisory_lock(${MIGRATION_LOCK_ID})`;
    await migrate(drizzle(migrationClient), { migrationsFolder: "./src/db/migrations" });
    console.log("✓ Migrations applied successfully!");
  } finally {
    await migrationClient`select pg_advisory_unlock(${MIGRATION_LOCK_ID})`.catch(() => {});
    await migrationClient.end();
  }
  process.exit(0);
}

runMigrate().catch((err) => {
  console.error("❌ Migration error:", err);
  process.exit(1);
});
