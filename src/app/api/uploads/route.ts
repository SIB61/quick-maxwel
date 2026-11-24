import { getCurrentUser } from "@/lib/auth";
import { UPLOAD_FOLDERS, UPLOAD_KINDS, UploadError, uploadFile, type UploadFolder, type UploadKind } from "@/lib/storage";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "You must be signed in to upload files." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const file = formData.get("file");
  const folder = formData.get("folder");
  const kind = formData.get("kind") ?? "image";

  if (!(file instanceof File)) {
    return Response.json({ error: "No file was provided." }, { status: 400 });
  }
  if (typeof folder !== "string" || !UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
    return Response.json({ error: "Invalid upload folder." }, { status: 400 });
  }
  if (typeof kind !== "string" || !(kind in UPLOAD_KINDS)) {
    return Response.json({ error: "Invalid upload kind." }, { status: 400 });
  }

  try {
    const { url } = await uploadFile({
      file,
      userId: user.id,
      folder: folder as UploadFolder,
      kind: kind as UploadKind,
    });
    return Response.json({ url });
  } catch (err) {
    if (err instanceof UploadError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    console.error("File upload failed:", err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
