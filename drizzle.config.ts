import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { getDatabaseUrl } from "./src/db/database-url";

dotenv.config({ path: ".env" });

// `drizzle-kit generate` works offline; push/studio/migrate need the URL and will say so.
let url = "";
try {
  url = getDatabaseUrl({ direct: true });
} catch {
  // handled by the commands that need a connection
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
  verbose: true,
  strict: true,
});
