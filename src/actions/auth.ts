"use server";

import { db } from "@/db";
import { users, portfolioSettings } from "@/db/schema";
import { createSession, destroySession, isHandleReserved } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Handle can only contain letters, numbers, hyphens and underscores"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type ActionState = {
  error?: string;
  success?: boolean;
};

export async function registerAction(prevState: ActionState | undefined, formData: FormData): Promise<ActionState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    handle: (formData.get("handle") as string)?.toLowerCase().trim(),
    password: formData.get("password") as string,
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, handle, password } = parsed.data;

  if (isHandleReserved(handle)) {
    return { error: `The handle "${handle}" is reserved by the system. Please choose another.` };
  }

  // Check existing user
  const existing = await db.query.users.findFirst({
    where: or(eq(users.email, email), eq(users.handle, handle)),
  });

  if (existing) {
    if (existing.email.toLowerCase() === email.toLowerCase()) {
      return { error: "An account with this email already exists." };
    }
    return { error: "This portfolio handle is already taken. Please pick another." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      handle,
      passwordHash,
      headline: "Software Professional & Creator",
      bio: "Welcome to my portfolio! Here you'll find my latest articles, work experiences, services, and achievements.",
    })
    .returning();

  const requestedTemplate = (formData.get("templateId") as string) || "simple_professional";
  const validTemplates = [
    "developer_terminal",
    "minimal_swiss",
    "aurora_studio",
    "bento_grid",
    "fancy_creative",
    "simple_professional",
  ];
  const templateId = validTemplates.includes(requestedTemplate) ? requestedTemplate : "simple_professional";

  // Create default portfolio settings for the new user with selected template
  await db.insert(portfolioSettings).values({
    userId: newUser.id,
    templateId,
    colorPalette: "slate",
    primaryColor: "#0f172a",
    accentColor: "#38bdf8",
    fontFamily: "sans",
    seoTitle: `${name} — Professional Portfolio`,
    seoDescription: `Portfolio and work highlights for ${name}.`,
  });

  await createSession({
    id: newUser.id,
    email: newUser.email,
    handle: newUser.handle,
    name: newUser.name,
  });

  redirect("/dashboard");
}

export async function loginAction(prevState: ActionState | undefined, formData: FormData): Promise<ActionState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email, password } = parsed.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase().trim()),
  });

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    id: user.id,
    email: user.email,
    handle: user.handle,
    name: user.name,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
