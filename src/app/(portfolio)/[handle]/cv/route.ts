import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { cvFileName, getCvObject } from "@/lib/storage";

/**
 * Public CV endpoint: `/<handle>/cv` shows the PDF in the browser,
 * `/<handle>/cv?download=1` downloads it as "<Name>-CV.pdf".
 */
export async function GET(request: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const cleanHandle = handle.toLowerCase().trim();
  if (!/^[a-z0-9_-]+$/.test(cleanHandle)) {
    return new Response("Not found", { status: 404 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.handle, cleanHandle),
    columns: { name: true, cvUrl: true },
  });
  if (!user?.cvUrl) {
    return new Response("This portfolio has no CV.", { status: 404 });
  }

  const object = await getCvObject(cleanHandle);
  if (!object) {
    return new Response("This portfolio has no CV.", { status: 404 });
  }

  const download = new URL(request.url).searchParams.has("download");
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${cvFileName(user.name)}"`,
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  if (object.size) headers.set("Content-Length", String(object.size));

  return new Response(object.body, { headers });
}
