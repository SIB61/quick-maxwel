/**
 * Database step of a deployment (`vercel-build` runs this before `next build`):
 *   1. apply pending migrations (src/db/migrations)
 *   2. add any demo portfolios that don't exist yet (never resets existing data)
 *
 * Environment switches:
 *   SKIP_DB_SETUP=true       skip everything (no database access during the build)
 *   SKIP_DEMO_SEED=true      migrate only; don't add the demo portfolios
 *   DB_SETUP_ON_PREVIEW=true also run on Vercel Preview deployments. By default previews
 *                            skip it, because they usually share the production
 *                            DATABASE_URL and a pull request must not migrate production.
 */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { spawnSync } from "node:child_process";
import path from "node:path";
import { getDatabaseUrl } from "./database-url";

const flag = (name: string) => process.env[name] === "true";

function runScript(script: string, args: string[] = []) {
  const tsx = path.join(process.cwd(), "node_modules", ".bin", "tsx");
  const result = spawnSync(tsx, [script, ...args], { stdio: "inherit", env: process.env });
  if (result.status !== 0) {
    console.error(`\n❌ ${script} failed (exit ${result.status ?? "signal " + result.signal}). Aborting the deployment.`);
    process.exit(result.status ?? 1);
  }
}

function main() {
  if (flag("SKIP_DB_SETUP")) {
    console.log("⏭  SKIP_DB_SETUP=true: skipping database migrations and seeding.");
    return;
  }
  if (process.env.VERCEL_ENV === "preview" && !flag("DB_SETUP_ON_PREVIEW")) {
    console.log("⏭  Preview deployment: skipping database setup (set DB_SETUP_ON_PREVIEW=true to run it).");
    return;
  }

  try {
    getDatabaseUrl({ direct: true });
  } catch (err) {
    console.error(`❌ ${(err as Error).message}\n   (Set SKIP_DB_SETUP=true to build without touching a database.)`);
    process.exit(1);
  }

  runScript("src/db/migrate.ts");

  if (flag("SKIP_DEMO_SEED")) {
    console.log("⏭  SKIP_DEMO_SEED=true: not adding demo portfolios.");
  } else {
    runScript("src/db/seed.ts", ["--missing-only"]);
  }
  console.log("✅ Database is ready.");
}

main();
