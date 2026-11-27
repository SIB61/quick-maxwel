import { achievements, articles, education, events, experiences, projects, services } from "@/db/schema";
import { asc, desc } from "drizzle-orm";

export type OrderableKind = "experiences" | "education" | "achievements" | "projects" | "services" | "events" | "articles";
export type MoveDirection = "up" | "down" | "top" | "bottom";

// The public page for each kind (for revalidation) and its dashboard route.
export const KINDS = {
  experiences: { table: experiences, dashboard: "experience", public: "experience" },
  education: { table: education, dashboard: "education", public: "education" },
  achievements: { table: achievements, dashboard: "achievements", public: "achievements" },
  projects: { table: projects, dashboard: "projects", public: "projects" },
  services: { table: services, dashboard: "services", public: "services" },
  events: { table: events, dashboard: "events", public: "events" },
  articles: { table: articles, dashboard: "articles", public: "articles" },
} as const;

/** The one canonical order used by the dashboard, this action and the public site. */
export function orderedBy(kind: OrderableKind) {
  const t = KINDS[kind].table;
  return kind === "articles"
    ? [asc(t.orderIndex), desc(articles.publishedAt)]
    : [asc(t.orderIndex), asc((t as typeof experiences).createdAt)];
}

