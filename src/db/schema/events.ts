import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  eventType: text("event_type").notNull().default("Speaking"), // 'Speaking' | 'Workshop' | 'Conference' | 'Hackathon' | 'Podcast'
  date: text("date").notNull(), // e.g. 'Oct 14, 2026'
  location: text("location"), // e.g. 'San Francisco, CA' or 'Virtual'
  eventUrl: text("event_url"),
  description: text("description"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
