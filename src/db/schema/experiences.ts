import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  employmentType: text("employment_type").default("Full-time"), // 'Full-time' | 'Contract' | 'Part-time' | 'Freelance'
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // e.g. 'Present' or '2024-05'
  isCurrent: boolean("is_current").default(false).notNull(),
  description: text("description"),
  skills: text("skills").array().default([]),
  companyUrl: text("company_url"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
