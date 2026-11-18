import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description"),
  pricingType: text("pricing_type").default("fixed"), // 'fixed' | 'hourly' | 'contact'
  price: text("price"), // e.g. '$1,200' or '$75/hr'
  deliverables: text("deliverables").array().default([]),
  icon: text("icon"), // lucide icon name e.g. 'Code', 'Palette', 'Rocket'
  isFeatured: boolean("is_featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
