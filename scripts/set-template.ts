import dotenv from "dotenv";
dotenv.config();

import { db } from "../src/db";
import { users, portfolioSettings } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const handle = process.argv[2] || "sarah";
  const templateId = process.argv[3] || "developer_terminal";
  const palette = process.argv[4] || "slate";

  const user = await db.query.users.findFirst({
    where: eq(users.handle, handle),
  });

  if (!user) {
    console.error(`User with handle '${handle}' not found`);
    process.exit(1);
  }

  await db
    .update(portfolioSettings)
    .set({
      templateId,
      colorPalette: palette,
      updatedAt: new Date(),
    })
    .where(eq(portfolioSettings.userId, user.id));

  console.log(`Successfully updated @${handle} to template: '${templateId}', palette: '${palette}'`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
