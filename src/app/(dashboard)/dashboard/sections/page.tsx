import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { ListOrdered } from "lucide-react";
import { defaultSectionOrder, parseHiddenSections, resolveSectionOrder } from "@/lib/sections";
import { TEMPLATES } from "@/lib/templates";
import { SectionOrderEditor } from "./section-order-editor";

export default async function SectionsPage() {
  const user = await requireAuth();
  const templateId = user.settings?.templateId ?? "simple_professional";
  const saved = user.settings?.sectionOrder ?? null;
  const templateName = TEMPLATES[templateId as keyof typeof TEMPLATES]?.name ?? "your template";

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2.5">
          <ListOrdered className="h-7 w-7 text-sky-400" />
          <span>Home Page Layout</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Drag sections to choose what comes first on your portfolio&apos;s main page — and hide the ones you don&apos;t want to show.
        </p>
      </div>

      <SectionOrderEditor
        initial={resolveSectionOrder(saved, templateId)}
        initialHidden={parseHiddenSections(user.settings?.hiddenSections)}
        templateDefault={defaultSectionOrder(templateId)}
        templateName={templateName}
        isCustom={Boolean(saved) || Boolean(user.settings?.hiddenSections)}
        handle={user.handle}
      />
    </div>
  );
}

export const metadata: Metadata = { title: "Home page layout" };
