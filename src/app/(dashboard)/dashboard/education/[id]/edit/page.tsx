import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { education } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { updateEducationAction } from "@/actions/education";
import { EducationForm } from "../../education-form";

export const metadata: Metadata = { title: "Edit education" };

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth();
  const { id } = await params;

  const entry = await db.query.education.findFirst({
    where: and(eq(education.id, id), eq(education.userId, user.id)),
  });
  if (!entry) notFound();

  return <EducationForm action={updateEducationAction.bind(null, entry.id)} initial={entry} />;
}
