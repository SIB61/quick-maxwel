import { TemplateId, TEMPLATES } from "@/lib/templates";
import Link from "next/link";
import { Sparkles, Eye, X, ArrowRight, Check } from "lucide-react";

interface TemplatePreviewBannerProps {
  activeTemplate: TemplateId;
  handle: string;
}

const PREVIEW_TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "developer_terminal", label: "Terminal" },
  { id: "minimal_swiss", label: "Swiss" },
  { id: "aurora_studio", label: "Aurora" },
  { id: "bento_grid", label: "Bento" },
  { id: "fancy_creative", label: "Fancy" },
  { id: "simple_professional", label: "Simple" },
];

export function TemplatePreviewBanner({
  activeTemplate,
  handle,
}: TemplatePreviewBannerProps) {
  const currentConfig = TEMPLATES[activeTemplate] || TEMPLATES.simple_professional;

  return (
    <aside
      aria-label="Template Preview Banner"
      className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-sky-500/30 shadow-2xl py-2 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Preview Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>

          <div className="flex items-center gap-1.5 font-medium text-zinc-300">
            <Eye className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span className="text-zinc-400 hidden sm:inline">Previewing:</span>
            <span className="font-bold text-white tracking-tight">
              {currentConfig.name}
            </span>
          </div>
        </div>

        {/* Center: Quick Switcher for all 6 templates */}
        <nav
          aria-label="Switch Preview Template"
          className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none"
        >
          {PREVIEW_TEMPLATES.map((t) => {
            const isActive = t.id === activeTemplate;
            return (
              <a
                key={t.id}
                href={`/${handle}?template=${t.id}`}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-black shadow-md shadow-sky-500/20 scale-105"
                    : "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800/80"
                }`}
              >
                {t.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/register?template=${activeTemplate}`}
            className="h-7 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="h-3 w-3" />
            <span>Use Template</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <a
            href={`/${handle}?exit_preview=true`}
            title="Exit template preview mode"
            className="h-7 px-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
          >
            <X className="h-3 w-3" />
            <span className="hidden sm:inline">Exit</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
