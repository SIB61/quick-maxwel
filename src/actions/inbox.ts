"use server";

import { db } from "@/db";
import { contacts } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markContactReadAction(contactId: string, isRead: boolean) {
  const user = await requireAuth();

  await db
    .update(contacts)
    .set({ isRead })
    .where(and(eq(contacts.id, contactId), eq(contacts.userId, user.id)));

  revalidatePath("/dashboard/inbox");
  revalidatePath("/dashboard");
}

export async function deleteContactAction(contactId: string) {
  const user = await requireAuth();

  await db
    .delete(contacts)
    .where(and(eq(contacts.id, contactId), eq(contacts.userId, user.id)));

  revalidatePath("/dashboard/inbox");
  revalidatePath("/dashboard");
}
