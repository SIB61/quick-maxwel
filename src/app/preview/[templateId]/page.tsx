import { db } from "@/db";
import { redirect } from "next/navigation";
import { TEMPLATES, TemplateId } from "@/lib/templates";

export default async function TemplatePreviewDirectPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;

  let demoUser = null;
  try {
    demoUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.handle, "sarah"),
    });
  } catch (e) {
    console.error(e);
  }

  if (!demoUser) {
    demoUser = await db.query.users.findFirst();
  }

  const handle = demoUser?.handle || "sarah";
  const validTemplate = templateId in TEMPLATES ? templateId : "developer_terminal";

  redirect(`/${handle}?template=${validTemplate}`);
}
