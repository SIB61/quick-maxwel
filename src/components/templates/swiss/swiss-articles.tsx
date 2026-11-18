import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function SwissArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Index Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            PUBLISHED ESSAYS
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            TOTAL: {portfolio.articles.length} WORKS
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Writings on system architecture, distributed coordination, fault tolerance, and platform design.
        </p>
      </div>

      {/* Numbered Broadsheet Articles List */}
      <div className="divide-y divide-zinc-800">
        {portfolio.articles.map((article, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });

          return (
            <Link
              key={article.id}
              href={`/${handle}/articles/${article.slug}`}
              className="group py-8 sm:py-10 block transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                  <span
                    className="font-mono text-xl sm:text-2xl font-bold shrink-0"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    {`№ ${num}`}
                  </span>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 group-hover:text-white group-hover:translate-x-1 transition-all">
                      {article.title}
                    </h2>

                    {article.excerpt && (
                      <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-3xl line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-2 pt-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                        {article.tags.map((t) => (
                          <span key={t} className="border border-zinc-800 px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    {formattedDate}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono uppercase text-zinc-400 group-hover:text-white transition-colors">
                    <span>READ ESSAY</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
