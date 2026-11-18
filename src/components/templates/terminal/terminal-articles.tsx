import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { Terminal as TerminalIcon, FileText, ArrowLeft, ArrowRight } from "lucide-react";

export function TerminalArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">ls -la ./writings/</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: ls -lh --sort=time ~/articles</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.articles.length} files listed</span>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">ls -lh --sort=time ./articles</span>
          </div>

          <div className="space-y-2">
            {portfolio.articles.map((article) => {
              const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });

              return (
                <Link
                  key={article.id}
                  href={`/${handle}/articles/${article.slug}`}
                  className="block p-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-850 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <span className="text-zinc-500 text-[11px] shrink-0 font-mono hidden sm:inline">
                        -rw-r--r-- 1 {handle}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                        {article.readTime || "5m"}
                      </span>
                      <span className="text-zinc-100 font-bold group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-zinc-400" />
                        ./{article.slug}.md
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500 shrink-0">
                      <span>{formattedDate}</span>
                      <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>

                  {article.excerpt && (
                    <p className="mt-2 text-zinc-400 text-xs pl-0 sm:pl-7 leading-relaxed line-clamp-2">
                      # {article.excerpt}
                    </p>
                  )}

                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5 pl-0 sm:pl-7 flex-wrap">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-800/70 px-2 py-0.5 rounded border border-zinc-700/50">
                          --tag={tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>total {portfolio.articles.length} items (0 directories)</span>
            <span className="text-emerald-400 font-bold">[READY]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
