"use server";

import { db } from "@/db";
import { articles } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  coverImageUrl: z.string().optional(),
  tags: z.string().optional(), // Comma-separated
  readTime: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type ArticleActionState = {
  error?: string;
  success?: boolean;
};

export async function createArticleAction(
  prevState: ArticleActionState | undefined,
  formData: FormData
): Promise<ArticleActionState> {
  const user = await requireAuth();

  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    excerpt: (formData.get("excerpt") as string) || "",
    content: formData.get("content") as string,
    coverImageUrl: (formData.get("coverImageUrl") as string) || "",
    tags: tagsRaw,
    readTime: (formData.get("readTime") as string) || "5 min read",
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
  };

  const parsed = articleSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Ensure unique slug for this user
  const existing = await db.query.articles.findFirst({
    where: and(eq(articles.userId, user.id), eq(articles.slug, parsed.data.slug)),
  });

  if (existing) {
    return { error: "You already have an article with this URL slug. Please choose a unique slug." };
  }

  await db.insert(articles).values({
    userId: user.id,
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    coverImageUrl: parsed.data.coverImageUrl || null,
    tags,
    readTime: parsed.data.readTime,
    isFeatured: parsed.data.isFeatured,
    isPublished: parsed.data.isPublished,
  });

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/articles`);

  redirect("/dashboard/articles");
}

export async function updateArticleAction(
  articleId: string,
  prevState: ArticleActionState | undefined,
  formData: FormData
): Promise<ArticleActionState> {
  const user = await requireAuth();

  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().trim().replace(/[\s_]+/g, "-"),
    excerpt: (formData.get("excerpt") as string) || "",
    content: formData.get("content") as string,
    coverImageUrl: (formData.get("coverImageUrl") as string) || "",
    tags: tagsRaw,
    readTime: (formData.get("readTime") as string) || "5 min read",
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
  };

  const parsed = articleSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Check slug conflict with other articles
  const conflict = await db.query.articles.findFirst({
    where: and(
      eq(articles.userId, user.id),
      eq(articles.slug, parsed.data.slug)
    ),
  });

  if (conflict && conflict.id !== articleId) {
    return { error: "Another article is already using this URL slug." };
  }

  await db
    .update(articles)
    .set({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      coverImageUrl: parsed.data.coverImageUrl || null,
      tags,
      readTime: parsed.data.readTime,
      isFeatured: parsed.data.isFeatured,
      isPublished: parsed.data.isPublished,
      updatedAt: new Date(),
    })
    .where(and(eq(articles.id, articleId), eq(articles.userId, user.id)));

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/articles`);
  revalidatePath(`/${user.handle}/articles/${parsed.data.slug}`);

  redirect("/dashboard/articles");
}

export async function deleteArticleAction(articleId: string) {
  const user = await requireAuth();

  await db
    .delete(articles)
    .where(and(eq(articles.id, articleId), eq(articles.userId, user.id)));

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/articles`);
}

export async function toggleArticleFeaturedAction(articleId: string, currentStatus: boolean) {
  const user = await requireAuth();

  await db
    .update(articles)
    .set({ isFeatured: !currentStatus })
    .where(and(eq(articles.id, articleId), eq(articles.userId, user.id)));

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");
  revalidatePath(`/${user.handle}`);
}
