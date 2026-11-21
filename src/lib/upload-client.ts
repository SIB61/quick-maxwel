/** Browser-side helper for the /api/uploads endpoint. */

export type UploadFolder = "avatars" | "articles" | "projects" | "achievements" | "misc";
export type UploadKind = "image" | "document";

export const UPLOAD_ACCEPT: Record<UploadKind, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif",
  document: "image/jpeg,image/png,image/webp,application/pdf",
};

export const UPLOAD_MAX_BYTES = 4 * 1024 * 1024;

/** Uploads a file and returns its public URL. Throws an Error with a user-facing message on failure. */
export async function uploadToStorage(file: File, folder: UploadFolder, kind: UploadKind = "image"): Promise<string> {
  if (file.size > UPLOAD_MAX_BYTES) {
    throw new Error(`"${file.name}" is too large. Maximum size is 4 MB.`);
  }

  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);
  body.append("kind", kind);

  const res = await fetch("/api/uploads", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed. Please try again.");
  }
  return data.url;
}
