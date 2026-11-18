"use server";

import { db } from "@/db";
import { portfolioSettings } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const themeSchema = z.object({
  templateId: z.enum(["simple_professional", "fancy_creative", "bento_grid"]),
  colorPalette: z.enum(["slate", "emerald", "neon", "terracotta", "ocean"]),
  fontFamily: z.enum(["sans", "serif", "mono"]).default("sans"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type ThemeActionState = {
  error?: string;
  success?: boolean;
};

export async function updateThemeAction(
  prevState: ThemeActionState | undefined,
  formData: FormData
): Promise<ThemeActionState> {
  const user = await requireAuth();

  const rawData = {
    templateId: formData.get("templateId") as string,
    colorPalette: formData.get("colorPalette") as string,
    fontFamily: (formData.get("fontFamily") as string) || "sans",
    seoTitle: (formData.get("seoTitle") as string) || "",
    seoDescription: (formData.get("seoDescription") as string) || "",
  };

  const parsed = themeSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Check if settings row exists for user
  const existing = await db.query.portfolioSettings.findFirst({
    where: eq(portfolioSettings.userId, user.id),
  });

  if (existing) {
    await db
      .update(portfolioSettings)
      .set({
        templateId: parsed.data.templateId,
        colorPalette: parsed.data.colorPalette,
        fontFamily: parsed.data.fontFamily,
        seoTitle: parsed.data.seoTitle || null,
        seoDescription: parsed.data.seoDescription || null,
        updatedAt: new Date(),
      })
      .where(eq(portfolioSettings.userId, user.id));
  } else {
    await db.insert(portfolioSettings).values({
      userId: user.id,
      templateId: parsed.data.templateId,
      colorPalette: parsed.data.colorPalette,
      fontFamily: parsed.data.fontFamily,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
    });
  }

  revalidatePath("/dashboard/theme");
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
