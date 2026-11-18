"use server";

import { db } from "@/db";
import { achievements } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const achievementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  issuer: z.string().min(2, "Issuer is required"),
  issueDate: z.string().optional(),
  credentialUrl: z.string().optional(),
  badgeUrl: z.string().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type AchievementActionState = {
  error?: string;
  success?: boolean;
};

export async function createAchievementAction(
  prevState: AchievementActionState | undefined,
  formData: FormData
): Promise<AchievementActionState> {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issueDate: (formData.get("issueDate") as string) || "",
    credentialUrl: (formData.get("credentialUrl") as string) || "",
    badgeUrl: (formData.get("badgeUrl") as string) || "",
    description: (formData.get("description") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = achievementSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db.insert(achievements).values({
    userId: user.id,
    title: parsed.data.title,
    issuer: parsed.data.issuer,
    issueDate: parsed.data.issueDate || null,
    credentialUrl: parsed.data.credentialUrl || null,
    badgeUrl: parsed.data.badgeUrl || null,
    description: parsed.data.description || null,
    isFeatured: parsed.data.isFeatured,
  });

  revalidatePath("/dashboard/achievements");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/achievements`);

  redirect("/dashboard/achievements");
}

export async function updateAchievementAction(
  id: string,
  prevState: AchievementActionState | undefined,
  formData: FormData
): Promise<AchievementActionState> {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issueDate: (formData.get("issueDate") as string) || "",
    credentialUrl: (formData.get("credentialUrl") as string) || "",
    badgeUrl: (formData.get("badgeUrl") as string) || "",
    description: (formData.get("description") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = achievementSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db
    .update(achievements)
    .set({
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      issueDate: parsed.data.issueDate || null,
      credentialUrl: parsed.data.credentialUrl || null,
      badgeUrl: parsed.data.badgeUrl || null,
      description: parsed.data.description || null,
      isFeatured: parsed.data.isFeatured,
      updatedAt: new Date(),
    })
    .where(and(eq(achievements.id, id), eq(achievements.userId, user.id)));

  revalidatePath("/dashboard/achievements");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/achievements`);

  redirect("/dashboard/achievements");
}

export async function deleteAchievementAction(id: string) {
  const user = await requireAuth();

  await db
    .delete(achievements)
    .where(and(eq(achievements.id, id), eq(achievements.userId, user.id)));

  revalidatePath("/dashboard/achievements");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/achievements`);
}

export async function toggleAchievementFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(achievements)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(achievements.id, id), eq(achievements.userId, user.id)));

  revalidatePath("/dashboard/achievements");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
