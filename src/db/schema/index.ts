import { relations } from "drizzle-orm";
import { users } from "./users";
import { portfolioSettings } from "./portfolio-settings";
import { articles } from "./articles";
import { experiences } from "./experiences";
import { achievements } from "./achievements";
import { services } from "./services";
import { projects } from "./projects";
import { events } from "./events";
import { contacts } from "./contacts";

export * from "./users";
export * from "./portfolio-settings";
export * from "./articles";
export * from "./experiences";
export * from "./achievements";
export * from "./services";
export * from "./projects";
export * from "./events";
export * from "./contacts";

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  settings: one(portfolioSettings, {
    fields: [users.id],
    references: [portfolioSettings.userId],
  }),
  articles: many(articles),
  experiences: many(experiences),
  achievements: many(achievements),
  services: many(services),
  projects: many(projects),
  events: many(events),
  contacts: many(contacts),
}));

export const portfolioSettingsRelations = relations(portfolioSettings, ({ one }) => ({
  user: one(users, {
    fields: [portfolioSettings.userId],
    references: [users.id],
  }),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  user: one(users, {
    fields: [articles.userId],
    references: [users.id],
  }),
}));

export const experiencesRelations = relations(experiences, ({ one }) => ({
  user: one(users, {
    fields: [experiences.userId],
    references: [users.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  user: one(users, {
    fields: [achievements.userId],
    references: [users.id],
  }),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  user: one(users, {
    fields: [services.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
}));
