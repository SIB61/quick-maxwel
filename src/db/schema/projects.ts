import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  summary: text("summary").notNull(),
  description: text("description"), // rich text HTML
  role: text("role"), // e.g. 'Lead Engineer', 'Solo Developer'
  status: text("status").default("completed").notNull(), // 'completed' | 'in_progress' | 'archived'
  timeline: text("timeline"), // e.g. '2024' or 'Jan 2024 – Present'
  coverImageUrl: text("cover_image_url"),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  techStack: text("tech_stack").array().default([]),
  highlights: text("highlights").array().default([]),
  isFeatured: boolean("is_featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  archived: "Archived",
};
