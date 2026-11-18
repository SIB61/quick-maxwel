import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, FileText, Sparkles } from "lucide-react";

export function FancyArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Ambient Radial Gradient Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Header Glassmorphic Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Curated Writings &amp; Insights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Writings &amp; Deep-Dives
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.articles.length} Essays
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Explorations in software engineering, resilient architectures, and creative technology.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.articles.map((article) => {
          const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link
              key={article.id}
              href={`/${handle}/articles/${article.slug}`}
              className="group p-7 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span>{article.readTime || "5 min"}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                  {article.title}
                </h2>

                {article.excerpt && (
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/60 space-y-3">
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    Read Story
                  </span>
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-black group-hover:translate-x-1 transition-transform shadow-md"
                    style={{ backgroundColor: "var(--theme-accent)" }}
                  >
                    <ArrowRight className="h-4 w-4" />
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
