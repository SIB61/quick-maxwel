import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const education = pgTable("education", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  institution: text("institution").notNull(), // school, university, bootcamp…
  degree: text("degree").notNull(), // e.g. 'BSc', 'MSc', 'Certificate'
  fieldOfStudy: text("field_of_study"), // e.g. 'Computer Science'
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // e.g. 'Present' or '2024-05'
  isCurrent: boolean("is_current").default(false).notNull(),
  grade: text("grade"), // e.g. '3.9 GPA', 'First Class Honours'
  description: text("description"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
