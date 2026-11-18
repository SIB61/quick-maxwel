import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Sparkles, Clock, Calendar } from "lucide-react";

export function AuroraArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 relative text-zinc-100">
      {/* Background Aurora Flare */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)`,
        }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/10 text-xs text-zinc-300">
              <Sparkles className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
              <span>Studio Publications</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Writings &amp; Insights
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
            {portfolio.articles.length} Published Articles
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Deep architectural research, distributed systems engineering, and technology strategy by {portfolio.name}.
        </p>
      </div>

      {/* Frosted Articles Grid */}
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
              className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {/* Subtle hover top accent flare */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-zinc-500" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-950/60 border border-white/5 text-[11px]">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span>{article.readTime || "5 min read"}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-100 transition-colors leading-snug">
                  {article.title}
                </h2>

                {article.excerpt && (
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    Read Article
                  </span>
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-md"
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
