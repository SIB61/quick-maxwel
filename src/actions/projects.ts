"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Only allow http(s) links so stored URLs can't become `javascript:` hrefs.
const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Links must start with http:// or https://");

const projectSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  description: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(["completed", "in_progress", "archived"]).default("completed"),
  timeline: z.string().optional(),
  coverImageUrl: optionalUrl,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  isFeatured: z.boolean().default(false),
});

export type ProjectActionState = {
  error?: string;
  success?: boolean;
};

function splitList(raw: FormDataEntryValue | null, separator: RegExp) {
  if (typeof raw !== "string" || !raw) return [];
  return raw
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseProjectForm(formData: FormData) {
  const parsed = projectSchema.safeParse({
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    summary: formData.get("summary") as string,
    description: (formData.get("description") as string) || "",
    role: (formData.get("role") as string) || "",
    status: (formData.get("status") as string) || "completed",
    timeline: (formData.get("timeline") as string) || "",
    coverImageUrl: (formData.get("coverImageUrl") as string) || "",
    liveUrl: (formData.get("liveUrl") as string) || "",
    repoUrl: (formData.get("repoUrl") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message } as const;
  }

  const d = parsed.data;
  return {
    values: {
      title: d.title,
      slug: d.slug,
      summary: d.summary,
      description: d.description || null,
      role: d.role || null,
      status: d.status,
      timeline: d.timeline || null,
      coverImageUrl: d.coverImageUrl || null,
      liveUrl: d.liveUrl || null,
      repoUrl: d.repoUrl || null,
      techStack: splitList(formData.get("techStack"), /,/),
      highlights: splitList(formData.get("highlights"), /\n/),
      isFeatured: d.isFeatured,
    },
  } as const;
}

function revalidateProjectPaths(handle: string, slug?: string) {
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath(`/${handle}`);
  revalidatePath(`/${handle}/projects`);
  if (slug) revalidatePath(`/${handle}/projects/${slug}`);
}

export async function createProjectAction(
  prevState: ProjectActionState | undefined,
  formData: FormData
): Promise<ProjectActionState> {
  const user = await requireAuth();

  const result = parseProjectForm(formData);
  if ("error" in result) return { error: result.error };

  const existing = await db.query.projects.findFirst({
    where: and(eq(projects.userId, user.id), eq(projects.slug, result.values.slug)),
  });
  if (existing) {
    return { error: "You already have a project with this URL slug." };
  }

  await db.insert(projects).values({ userId: user.id, ...result.values });

  revalidateProjectPaths(user.handle, result.values.slug);
  redirect("/dashboard/projects");
}

export async function updateProjectAction(
  id: string,
  prevState: ProjectActionState | undefined,
  formData: FormData
): Promise<ProjectActionState> {
  const user = await requireAuth();

  const result = parseProjectForm(formData);
  if ("error" in result) return { error: result.error };

  const conflict = await db.query.projects.findFirst({
    where: and(eq(projects.userId, user.id), eq(projects.slug, result.values.slug)),
  });
  if (conflict && conflict.id !== id) {
    return { error: "Another project is already using this URL slug." };
  }

  await db
    .update(projects)
    .set({ ...result.values, updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)));

  revalidateProjectPaths(user.handle, result.values.slug);
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(id: string) {
  const user = await requireAuth();

  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)));

  revalidateProjectPaths(user.handle);
}

export async function toggleProjectFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(projects)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)));

  revalidateProjectPaths(user.handle);
}
