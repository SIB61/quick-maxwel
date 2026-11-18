import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getPortfolioData(handle: string) {
  const cleanHandle = handle.toLowerCase().trim();

  const user = await db.query.users.findFirst({
    where: eq(users.handle, cleanHandle),
    with: {
      settings: true,
      articles: {
        where: (articles, { eq }) => eq(articles.isPublished, true),
        orderBy: (articles, { desc }) => [desc(articles.publishedAt)],
      },
      experiences: {
        orderBy: (experiences, { asc }) => [asc(experiences.orderIndex)],
      },
      achievements: {
        orderBy: (achievements, { asc }) => [asc(achievements.orderIndex)],
      },
      services: {
        orderBy: (services, { asc }) => [asc(services.orderIndex)],
      },
      events: {
        orderBy: (events, { asc }) => [asc(events.orderIndex)],
      },
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export type PortfolioUser = Awaited<ReturnType<typeof getPortfolioData>>;
