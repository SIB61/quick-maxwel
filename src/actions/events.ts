"use server";

import { db } from "@/db";
import { events } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(2, "Event title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  eventType: z.string().default("Speaking"),
  date: z.string().min(2, "Event date is required"),
  location: z.string().optional(),
  eventUrl: z.string().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type EventActionState = {
  error?: string;
  success?: boolean;
};

export async function createEventAction(
  prevState: EventActionState | undefined,
  formData: FormData
): Promise<EventActionState> {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    eventType: (formData.get("eventType") as string) || "Speaking",
    date: formData.get("date") as string,
    location: (formData.get("location") as string) || "",
    eventUrl: (formData.get("eventUrl") as string) || "",
    description: (formData.get("description") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = eventSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const existing = await db.query.events.findFirst({
    where: and(eq(events.userId, user.id), eq(events.slug, parsed.data.slug)),
  });

  if (existing) {
    return { error: "You already have an event with this URL slug." };
  }

  await db.insert(events).values({
    userId: user.id,
    title: parsed.data.title,
    slug: parsed.data.slug,
    eventType: parsed.data.eventType,
    date: parsed.data.date,
    location: parsed.data.location || null,
    eventUrl: parsed.data.eventUrl || null,
    description: parsed.data.description || null,
    isFeatured: parsed.data.isFeatured,
  });

  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/events`);

  redirect("/dashboard/events");
}

export async function updateEventAction(
  id: string,
  prevState: EventActionState | undefined,
  formData: FormData
): Promise<EventActionState> {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    eventType: (formData.get("eventType") as string) || "Speaking",
    date: formData.get("date") as string,
    location: (formData.get("location") as string) || "",
    eventUrl: (formData.get("eventUrl") as string) || "",
    description: (formData.get("description") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = eventSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const conflict = await db.query.events.findFirst({
    where: and(eq(events.userId, user.id), eq(events.slug, parsed.data.slug)),
  });

  if (conflict && conflict.id !== id) {
    return { error: "Another event is already using this URL slug." };
  }

  await db
    .update(events)
    .set({
      title: parsed.data.title,
      slug: parsed.data.slug,
      eventType: parsed.data.eventType,
      date: parsed.data.date,
      location: parsed.data.location || null,
      eventUrl: parsed.data.eventUrl || null,
      description: parsed.data.description || null,
      isFeatured: parsed.data.isFeatured,
      updatedAt: new Date(),
    })
    .where(and(eq(events.id, id), eq(events.userId, user.id)));

  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/events`);
  revalidatePath(`/${user.handle}/events/${parsed.data.slug}`);

  redirect("/dashboard/events");
}

export async function deleteEventAction(id: string) {
  const user = await requireAuth();

  await db
    .delete(events)
    .where(and(eq(events.id, id), eq(events.userId, user.id)));

  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/events`);
}

export async function toggleEventFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(events)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(events.id, id), eq(events.userId, user.id)));

  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
