import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "./index";
import { users, portfolioSettings, articles, experiences, achievements, services, projects, events, contacts } from "./schema";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { estimateReadTime } from "../lib/rich-text";
import { inArray, or } from "drizzle-orm";
import { DEMO_PROFILES } from "./demo-data";

/**
 * Seeds one demo portfolio per profession (see src/db/demo-data). Re-running
 * replaces existing demo users (or, with --missing-only, adds only missing ones);
 * real accounts are never touched.
 */
async function seed() {
  console.log("🌱 Seeding demo portfolios...");

  // Development keeps the well-known "password123" for convenience. In production
  // the demo accounts only power the public showcase: use DEMO_USER_PASSWORD if
  // set, otherwise a random password nobody knows (login is also blocked there).
  const demoPassword =
    process.env.DEMO_USER_PASSWORD ||
    (process.env.NODE_ENV === "production" ? randomBytes(32).toString("base64url") : "password123");
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  // `--passwords-only` sets the shared demo password on existing demo accounts and
  // changes nothing else (no content is reset), e.g. after changing DEMO_USER_PASSWORD.
  if (process.argv.includes("--passwords-only")) {
    if (!process.env.DEMO_USER_PASSWORD) {
      throw new Error("Set DEMO_USER_PASSWORD in .env before using --passwords-only.");
    }
    const updated = await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(inArray(users.email, DEMO_PROFILES.map(({ account }) => account.email)))
      .returning({ handle: users.handle });
    console.log(`✓ Password updated for ${updated.length} demo account(s): ${updated.map((u) => u.handle).join(", ")}`);
    process.exit(0);
  }

  const handles = DEMO_PROFILES.map(({ account }) => account.handle);
  const emails = DEMO_PROFILES.map(({ account }) => account.email);

  // `--missing-only` adds demo users that don't exist yet and leaves existing ones
  // (and any edits made to them) untouched. By default every demo user is reset.
  const missingOnly = process.argv.includes("--missing-only");
  let skip = new Set<string>();
  if (missingOnly) {
    const existing = await db
      .select({ handle: users.handle, email: users.email })
      .from(users)
      .where(or(inArray(users.handle, handles), inArray(users.email, emails)));
    skip = new Set(existing.flatMap((u) => [u.handle, u.email]));
  } else {
    // Cascades delete each demo user's content.
    const removed = await db
      .delete(users)
      .where(or(inArray(users.handle, handles), inArray(users.email, emails)))
      .returning({ handle: users.handle });
    if (removed.length > 0) console.log(`Removed ${removed.length} existing demo user(s)`);
  }

  let created = 0;
  for (const { account, profile } of DEMO_PROFILES) {
    if (skip.has(account.handle) || skip.has(account.email)) {
      console.log(`• ${account.profession.padEnd(30)} @${account.handle} (exists, skipped)`);
      continue;
    }
    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({ ...profile.user, email: account.email, passwordHash })
        .returning({ id: users.id });
      const own = <T extends object>(rows: T[]) => rows.map((row) => ({ ...row, userId: user.id }));

      await tx.insert(portfolioSettings).values({ ...profile.settings, userId: user.id });
      if (profile.articles.length) {
        await tx
          .insert(articles)
          .values(own(profile.articles).map((a) => ({ ...a, readTime: estimateReadTime(a.content) })));
      }
      if (profile.experiences.length) await tx.insert(experiences).values(own(profile.experiences));
      if (profile.achievements.length) await tx.insert(achievements).values(own(profile.achievements));
      if (profile.services.length) await tx.insert(services).values(own(profile.services));
      if (profile.projects.length) await tx.insert(projects).values(own(profile.projects));
      if (profile.events.length) await tx.insert(events).values(own(profile.events));
      if (profile.contacts?.length) await tx.insert(contacts).values(own(profile.contacts));
    });
    created++;
    console.log(`✓ ${account.profession.padEnd(30)} @${account.handle}`);
  }

  console.log(`🎉 Seeded ${created} demo portfolio(s).`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
