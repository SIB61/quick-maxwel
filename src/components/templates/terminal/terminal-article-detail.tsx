import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Hash } from "lucide-react";

export function TerminalArticleDetail({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  const lines = article.content.split("\n");

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Return to buffer list */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}/articles`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>:q! (return to articles index)</span>
        </Link>
      </div>

      {/* Vim Editor Frame */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Editor Top Bar */}
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-bold text-zinc-200">
              VIM 9.0 // {article.slug}.md [RO]
            </span>
          </div>
          <div className="text-[11px] text-zinc-500">
            {lines.length}L, {article.content.length}B
          </div>
        </div>

        {/* Article Header in Vim style */}
        <div className="p-6 border-b border-zinc-800/80 bg-zinc-900/30 space-y-3">
          <div className="flex items-center gap-2 text-zinc-500 text-xs flex-wrap">
            <span>/* METADATA */</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
            # {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed border-l-2 border-zinc-700 pl-3">
              {article.excerpt}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {article.tags.map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  :{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Line Numbered Buffer */}
        <div className="p-4 sm:p-6 space-y-1 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-4 group">
              <span className="w-8 text-right text-zinc-600 select-none text-[11px] group-hover:text-zinc-400 transition-colors shrink-0">
                {String(idx + 1).padStart(2, " ")}
              </span>
              <span className="text-zinc-300 whitespace-pre-wrap break-words flex-1">
                {line || "\u00A0"}
              </span>
            </div>
          ))}
          <div className="flex items-start gap-4 pt-2">
            <span className="w-8 text-right text-emerald-400 select-none text-[11px]">~</span>
            <span className="text-zinc-600 text-xs italic">[EOF]</span>
          </div>
        </div>

        {/* Vim Statusline Footer */}
        <div className="h-8 px-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 select-none">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-zinc-800 font-bold text-zinc-200 rounded">NORMAL</span>
            <span className="text-zinc-500">"{article.slug}.md" [readonly]</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${handle}/articles`}
              className="text-emerald-400 hover:underline font-bold"
            >
              :wq (exit)
            </Link>
            <span>100% 1,1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
