import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { headers, cookies } from "next/headers";
import { TEMPLATES, TemplateId, ColorPalette, FontFamily } from "./templates";

const TEMPLATE_SIGNATURE_STYLES: Record<
  TemplateId,
  { palette: ColorPalette; font: FontFamily }
> = {
  developer_terminal: { palette: "emerald", font: "mono" },
  minimal_swiss: { palette: "slate", font: "sans" },
  aurora_studio: { palette: "ocean", font: "sans" },
  bento_grid: { palette: "neon", font: "sans" },
  fancy_creative: { palette: "terracotta", font: "sans" },
  simple_professional: { palette: "slate", font: "serif" },
};

export async function getPortfolioData(handle: string, explicitTemplate?: string) {
  const cleanHandle = handle.toLowerCase().trim();

  const user = await db.query.users.findFirst({
    where: eq(users.handle, cleanHandle),
    with: {
      settings: true,
      articles: {
        where: (articles, { eq }) => eq(articles.isPublished, true),
        orderBy: (articles, { desc }) => [desc(articles.publishedAt)],
      },
      experiences: {
        orderBy: (experiences, { asc }) => [asc(experiences.orderIndex)],
      },
      achievements: {
        orderBy: (achievements, { asc }) => [asc(achievements.orderIndex)],
      },
      services: {
        orderBy: (services, { asc }) => [asc(services.orderIndex)],
      },
      events: {
        orderBy: (events, { asc }) => [asc(events.orderIndex)],
      },
    },
  });

  if (!user) {
    notFound();
  }

  // Determine if a template preview is active
  let previewTemplate = explicitTemplate;
  if (!previewTemplate) {
    try {
      const headerList = await headers();
      previewTemplate = headerList.get("x-preview-template") || undefined;
    } catch {
      // In non-request contexts
    }
  }
  if (!previewTemplate) {
    try {
      const cookieStore = await cookies();
      previewTemplate = cookieStore.get("pb_preview_template")?.value;
    } catch {
      // In non-request contexts
    }
  }

  const isPreview = Boolean(previewTemplate && previewTemplate in TEMPLATES);
  const activeTemplateId = isPreview
    ? (previewTemplate as TemplateId)
    : ((user.settings?.templateId as TemplateId) || "simple_professional");

  const signature = TEMPLATE_SIGNATURE_STYLES[activeTemplateId] || {
    palette: "slate",
    font: "sans",
  };

  return {
    ...user,
    isPreview,
    previewTemplate: isPreview ? activeTemplateId : undefined,
    settings: {
      ...(user.settings || {
        id: "default-settings",
        userId: user.id,
        primaryColor: "#0f172a",
        accentColor: "#38bdf8",
        createdAt: new Date(),
        updatedAt: new Date(),
        seoTitle: null,
        seoDescription: null,
      }),
      templateId: activeTemplateId,
      colorPalette: isPreview ? signature.palette : (user.settings?.colorPalette || signature.palette),
      fontFamily: isPreview ? signature.font : (user.settings?.fontFamily || signature.font),
    },
  };
}

export type PortfolioUser = Awaited<ReturnType<typeof getPortfolioData>>;
