"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProfileActionState = {
  error?: string;
  success?: boolean;
};

export async function updateProfileAction(
  prevState: ProfileActionState | undefined,
  formData: FormData
): Promise<ProfileActionState> {
  const user = await requireAuth();

  const rawData = {
    name: formData.get("name") as string,
    headline: (formData.get("headline") as string) || "",
    bio: (formData.get("bio") as string) || "",
    location: (formData.get("location") as string) || "",
    avatarUrl: (formData.get("avatarUrl") as string) || "",
    github: (formData.get("github") as string) || "",
    twitter: (formData.get("twitter") as string) || "",
    linkedin: (formData.get("linkedin") as string) || "",
    website: (formData.get("website") as string) || "",
  };

  const parsed = profileSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const socialLinks = {
    ...(parsed.data.github ? { github: parsed.data.github } : {}),
    ...(parsed.data.twitter ? { twitter: parsed.data.twitter } : {}),
    ...(parsed.data.linkedin ? { linkedin: parsed.data.linkedin } : {}),
    ...(parsed.data.website ? { website: parsed.data.website } : {}),
  };

  await db
    .update(users)
    .set({
      name: parsed.data.name,
      headline: parsed.data.headline || null,
      bio: parsed.data.bio || null,
      location: parsed.data.location || null,
      avatarUrl: parsed.data.avatarUrl || null,
      socialLinks,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/articles`);
  revalidatePath(`/${user.handle}/experience`);
  revalidatePath(`/${user.handle}/achievements`);
  revalidatePath(`/${user.handle}/services`);
  revalidatePath(`/${user.handle}/events`);
  revalidatePath(`/${user.handle}/contact`);

  return { success: true };
}
