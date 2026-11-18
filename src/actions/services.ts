"use server";

import { db } from "@/db";
import { services } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(2, "Service title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().optional(),
  pricingType: z.string().default("fixed"),
  price: z.string().optional(),
  deliverables: z.string().optional(), // Newline or comma separated
  isFeatured: z.boolean().default(false),
});

export type ServiceActionState = {
  error?: string;
  success?: boolean;
};

export async function createServiceAction(
  prevState: ServiceActionState | undefined,
  formData: FormData
): Promise<ServiceActionState> {
  const user = await requireAuth();

  const deliverablesRaw = formData.get("deliverables") as string;
  const deliverables = deliverablesRaw
    ? deliverablesRaw
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: (formData.get("fullDescription") as string) || "",
    pricingType: (formData.get("pricingType") as string) || "fixed",
    price: (formData.get("price") as string) || "",
    deliverables: deliverablesRaw,
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = serviceSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Ensure unique slug for this user
  const existing = await db.query.services.findFirst({
    where: and(eq(services.userId, user.id), eq(services.slug, parsed.data.slug)),
  });

  if (existing) {
    return { error: "You already have a service with this URL slug." };
  }

  await db.insert(services).values({
    userId: user.id,
    title: parsed.data.title,
    slug: parsed.data.slug,
    shortDescription: parsed.data.shortDescription,
    fullDescription: parsed.data.fullDescription || null,
    pricingType: parsed.data.pricingType,
    price: parsed.data.price || null,
    deliverables,
    isFeatured: parsed.data.isFeatured,
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/services`);

  redirect("/dashboard/services");
}

export async function updateServiceAction(
  id: string,
  prevState: ServiceActionState | undefined,
  formData: FormData
): Promise<ServiceActionState> {
  const user = await requireAuth();

  const deliverablesRaw = formData.get("deliverables") as string;
  const deliverables = deliverablesRaw
    ? deliverablesRaw
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: (formData.get("fullDescription") as string) || "",
    pricingType: (formData.get("pricingType") as string) || "fixed",
    price: (formData.get("price") as string) || "",
    deliverables: deliverablesRaw,
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = serviceSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Check conflict
  const conflict = await db.query.services.findFirst({
    where: and(eq(services.userId, user.id), eq(services.slug, parsed.data.slug)),
  });

  if (conflict && conflict.id !== id) {
    return { error: "Another service is already using this URL slug." };
  }

  await db
    .update(services)
    .set({
      title: parsed.data.title,
      slug: parsed.data.slug,
      shortDescription: parsed.data.shortDescription,
      fullDescription: parsed.data.fullDescription || null,
      pricingType: parsed.data.pricingType,
      price: parsed.data.price || null,
      deliverables,
      isFeatured: parsed.data.isFeatured,
      updatedAt: new Date(),
    })
    .where(and(eq(services.id, id), eq(services.userId, user.id)));

  revalidatePath("/dashboard/services");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/services`);
  revalidatePath(`/${user.handle}/services/${parsed.data.slug}`);

  redirect("/dashboard/services");
}

export async function deleteServiceAction(id: string) {
  const user = await requireAuth();

  await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.userId, user.id)));

  revalidatePath("/dashboard/services");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/services`);
}

export async function toggleServiceFeaturedAction(id: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(services)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(services.id, id), eq(services.userId, user.id)));

  revalidatePath("/dashboard/services");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
