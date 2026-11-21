import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { UploadError, deleteCv, uploadCv } from "@/lib/storage";

function revalidateCvPaths(handle: string) {
  revalidatePath("/dashboard/profile");
  revalidatePath(`/${handle}`, "layout");
}

/** Uploads (or replaces) the signed-in user's CV at `<handle>/cv` in the bucket. */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "You must be signed in to upload a CV." }, { status: 401 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: "No file was provided." }, { status: 400 });
  }

  try {
    const { url } = await uploadCv({ file, handle: user.handle, name: user.name });
    await db.update(users).set({ cvUrl: url, updatedAt: new Date() }).where(eq(users.id, user.id));
    revalidateCvPaths(user.handle);
    return Response.json({ url, uploadedAt: Date.now() });
  } catch (err) {
    if (err instanceof UploadError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    console.error("CV upload failed:", err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}

/** Removes the signed-in user's CV from the bucket and their profile. */
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }

  try {
    await deleteCv(user.handle);
    await db.update(users).set({ cvUrl: null, updatedAt: new Date() }).where(eq(users.id, user.id));
    revalidateCvPaths(user.handle);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("CV delete failed:", err);
    return Response.json({ error: "Could not remove the CV. Please try again." }, { status: 500 });
  }
}
