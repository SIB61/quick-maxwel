import type { StoredSocialLinks } from "../../lib/social-platforms";
import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  handle: text("handle").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  cvUrl: text("cv_url"), // public URL of the CV PDF stored at <handle>/cv
  headline: text("headline"),
  bio: text("bio"),
  location: text("location"),
  socialLinks: jsonb("social_links").$type<StoredSocialLinks>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
