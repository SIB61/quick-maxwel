import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function runMigrate() {
  console.log("⏳ Running migrations...");
  const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5434/portfolio_builder";
  const migrationClient = postgres(connectionString, { max: 1 });
  const migrationDb = drizzle(migrationClient);

  await migrate(migrationDb, { migrationsFolder: "./src/db/migrations" });
  console.log("✓ Migrations applied successfully!");
  await migrationClient.end();
  process.exit(0);
}

runMigrate().catch((err) => {
  console.error("❌ Migration error:", err);
  process.exit(1);
});
