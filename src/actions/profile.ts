"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  MAX_SOCIAL_LINKS,
  SOCIAL_PLATFORM_MAP,
  socialHref,
  type SocialLink,
} from "@/lib/social-platforms";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
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
  };

  const parsed = profileSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const socialResult = parseSocialLinks(formData);
  if ("error" in socialResult) {
    return { error: socialResult.error };
  }
  const socialLinks = socialResult.links;

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
  revalidatePath(`/${user.handle}/projects`);
  revalidatePath(`/${user.handle}/events`);
  revalidatePath(`/${user.handle}/contact`);

  return { success: true };
}

/** Reads the ordered `socialPlatform` / `socialUrl` pairs submitted by the profile form. */
function parseSocialLinks(formData: FormData): { links: SocialLink[] } | { error: string } {
  const platforms = formData.getAll("socialPlatform").map(String);
  const urls = formData.getAll("socialUrl").map(String);
  const links: SocialLink[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < platforms.length; i++) {
    const platformId = platforms[i];
    const raw = (urls[i] ?? "").trim();
    if (!raw) continue; // empty rows are simply dropped

    const platform = SOCIAL_PLATFORM_MAP[platformId];
    if (!platform) return { error: "Unknown social platform." };
    if (seen.has(platformId)) return { error: `${platform.label} was added more than once.` };

    const href = socialHref(platformId, raw);
    if (!href) {
      return {
        error:
          platform.scheme === "mailto"
            ? "Please enter a valid email address."
            : `${platform.label} link must be a full URL starting with https://`,
      };
    }
    seen.add(platformId);
    links.push({ platform: platformId, url: platform.scheme === "mailto" ? href.replace(/^mailto:/, "") : href });
  }

  if (links.length > MAX_SOCIAL_LINKS) {
    return { error: `You can add up to ${MAX_SOCIAL_LINKS} links.` };
  }
  return { links };
}
