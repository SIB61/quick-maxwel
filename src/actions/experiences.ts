"use server";

import { db } from "@/db";
import { experiences } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Job title/role is required"),
  location: z.string().optional(),
  employmentType: z.string().default("Full-time"),
  startDate: z.string().min(2, "Start date is required"),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
  skills: z.string().optional(), // Comma-separated
  companyUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type ExperienceActionState = {
  error?: string;
  success?: boolean;
};

export async function createExperienceAction(
  prevState: ExperienceActionState | undefined,
  formData: FormData
): Promise<ExperienceActionState> {
  const user = await requireAuth();

  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw
    ? skillsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    location: (formData.get("location") as string) || "",
    employmentType: (formData.get("employmentType") as string) || "Full-time",
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || "",
    isCurrent: formData.get("isCurrent") === "on",
    description: (formData.get("description") as string) || "",
    skills: skillsRaw,
    companyUrl: (formData.get("companyUrl") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = experienceSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db.insert(experiences).values({
    userId: user.id,
    company: parsed.data.company,
    role: parsed.data.role,
    location: parsed.data.location || null,
    employmentType: parsed.data.employmentType,
    startDate: parsed.data.startDate,
    endDate: parsed.data.isCurrent ? "Present" : parsed.data.endDate || null,
    isCurrent: parsed.data.isCurrent,
    description: parsed.data.description || null,
    skills,
    companyUrl: parsed.data.companyUrl || null,
    isFeatured: parsed.data.isFeatured,
  });

  revalidatePath("/dashboard/experience");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/experience`);

  redirect("/dashboard/experience");
}

export async function updateExperienceAction(
  id: string,
  prevState: ExperienceActionState | undefined,
  formData: FormData
): Promise<ExperienceActionState> {
  const user = await requireAuth();

  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw
    ? skillsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    location: (formData.get("location") as string) || "",
    employmentType: (formData.get("employmentType") as string) || "Full-time",
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || "",
    isCurrent: formData.get("isCurrent") === "on",
    description: (formData.get("description") as string) || "",
    skills: skillsRaw,
    companyUrl: (formData.get("companyUrl") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = experienceSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db
    .update(experiences)
    .set({
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location || null,
      employmentType: parsed.data.employmentType,
      startDate: parsed.data.startDate,
      endDate: parsed.data.isCurrent ? "Present" : parsed.data.endDate || null,
      isCurrent: parsed.data.isCurrent,
      description: parsed.data.description || null,
      skills,
      companyUrl: parsed.data.companyUrl || null,
      isFeatured: parsed.data.isFeatured,
      updatedAt: new Date(),
    })
    .where(and(eq(experiences.id, id), eq(experiences.userId, user.id)));

  revalidatePath("/dashboard/experience");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/experience`);

  redirect("/dashboard/experience");
}

export async function deleteExperienceAction(id: string) {
  const user = await requireAuth();

  await db
    .delete(experiences)
    .where(and(eq(experiences.id, id), eq(experiences.userId, user.id)));

  revalidatePath("/dashboard/experience");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/experience`);
}

export async function toggleExperienceFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(experiences)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(experiences.id, id), eq(experiences.userId, user.id)));

  revalidatePath("/dashboard/experience");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
