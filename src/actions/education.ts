"use server";

import { db } from "@/db";
import { education } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const educationSchema = z.object({
  institution: z.string().trim().min(2, "School or institution is required"),
  degree: z.string().trim().min(2, "Degree or qualification is required"),
  fieldOfStudy: z.string().trim().optional(),
  location: z.string().trim().optional(),
  startDate: z.string().trim().min(2, "Start date is required"),
  endDate: z.string().trim().optional(),
  isCurrent: z.boolean().default(false),
  grade: z.string().trim().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type EducationActionState = {
  error?: string;
  success?: boolean;
};

function parseForm(formData: FormData) {
  return educationSchema.safeParse({
    institution: (formData.get("institution") as string) || "",
    degree: (formData.get("degree") as string) || "",
    fieldOfStudy: (formData.get("fieldOfStudy") as string) || "",
    location: (formData.get("location") as string) || "",
    startDate: (formData.get("startDate") as string) || "",
    endDate: (formData.get("endDate") as string) || "",
    isCurrent: formData.get("isCurrent") === "on",
    grade: (formData.get("grade") as string) || "",
    description: (formData.get("description") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  });
}

function values(d: z.infer<typeof educationSchema>) {
  return {
    institution: d.institution,
    degree: d.degree,
    fieldOfStudy: d.fieldOfStudy || null,
    location: d.location || null,
    startDate: d.startDate,
    endDate: d.isCurrent ? "Present" : d.endDate || null,
    isCurrent: d.isCurrent,
    grade: d.grade || null,
    description: d.description || null,
    isFeatured: d.isFeatured,
  };
}

function revalidateEducation(handle: string) {
  revalidatePath("/dashboard/education");
  revalidatePath("/dashboard");
  revalidatePath(`/${handle}`);
  revalidatePath(`/${handle}/education`);
}

export async function createEducationAction(
  prevState: EducationActionState | undefined,
  formData: FormData,
): Promise<EducationActionState> {
  const user = await requireAuth();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await db.insert(education).values({ userId: user.id, ...values(parsed.data) });

  revalidateEducation(user.handle);
  redirect("/dashboard/education");
}

export async function updateEducationAction(
  id: string,
  prevState: EducationActionState | undefined,
  formData: FormData,
): Promise<EducationActionState> {
  const user = await requireAuth();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await db
    .update(education)
    .set({ ...values(parsed.data), updatedAt: new Date() })
    .where(and(eq(education.id, id), eq(education.userId, user.id)));

  revalidateEducation(user.handle);
  redirect("/dashboard/education");
}

export async function deleteEducationAction(id: string) {
  const user = await requireAuth();
  await db.delete(education).where(and(eq(education.id, id), eq(education.userId, user.id)));
  revalidateEducation(user.handle);
}

export async function toggleEducationFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();
  await db
    .update(education)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(education.id, id), eq(education.userId, user.id)));
  revalidatePath("/dashboard/education");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
