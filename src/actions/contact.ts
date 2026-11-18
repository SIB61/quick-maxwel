"use server";

import { db } from "@/db";
import { contacts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const contactSchema = z.object({
  handle: z.string().min(1),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactState = {
  error?: string;
  success?: boolean;
};

export async function submitContactAction(
  prevState: ContactState | undefined,
  formData: FormData
): Promise<ContactState> {
  const rawData = {
    handle: formData.get("handle") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: (formData.get("subject") as string) || "Portfolio Inquiry",
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { handle, name, email, subject, message } = parsed.data;

  // Resolve user by handle
  const user = await db.query.users.findFirst({
    where: eq(users.handle, handle.toLowerCase().trim()),
  });

  if (!user) {
    return { error: "Portfolio recipient not found." };
  }

  await db.insert(contacts).values({
    userId: user.id,
    senderName: name,
    senderEmail: email,
    subject: subject || "Portfolio Inquiry",
    message,
    isRead: false,
  });

  return { success: true };
}
