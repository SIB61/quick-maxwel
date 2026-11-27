import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const portfolioSettings = pgTable("portfolio_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  templateId: text("template_id").notNull().default("simple_professional"), // 'simple_professional' | 'fancy_creative' | 'bento_grid'
  colorPalette: text("color_palette").notNull().default("slate"), // 'slate' | 'emerald' | 'neon' | 'terracotta' | 'ocean'
  primaryColor: text("primary_color").default("#0f172a"),
  accentColor: text("accent_color").default("#3b82f6"),
  fontFamily: text("font_family").default("sans"),
  customCss: text("custom_css"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  ogImageUrl: text("og_image_url"),
  // Comma-separated home-page section keys, e.g. "projects,experience". Null = template default.
  sectionOrder: text("section_order"),
  // Comma-separated section keys hidden from the home page.
  hiddenSections: text("hidden_sections"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type PortfolioSettings = typeof portfolioSettings.$inferSelect;
export type NewPortfolioSettings = typeof portfolioSettings.$inferInsert;
