import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Calendar, Clock, LayoutGrid } from "lucide-react";

export function BentoArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const primaryArticle = portfolio.articles[0];
  const secondaryArticles = portfolio.articles.slice(1);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Top Header Bento Tile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/${handle}`}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Bento Overview</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Articles &amp; Writings
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300">
            {portfolio.articles.length} Writings Available
          </span>
        </div>
      </div>

      {/* Asymmetric Bento Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Primary Article: Spans 2 columns if available */}
        {primaryArticle && (
          <div className="md:col-span-2 rounded-3xl p-7 sm:p-8 bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-xl flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 flex-wrap gap-2">
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-black"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                >
                  Featured Reading
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-zinc-500" />
                    {new Date(primaryArticle.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    {primaryArticle.readTime}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:underline leading-snug">
                <Link href={`/${handle}/articles/${primaryArticle.slug}`}>
                  {primaryArticle.title}
                </Link>
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
                {primaryArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {primaryArticle.tags?.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/${handle}/articles/${primaryArticle.slug}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Read Full Essay</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Other articles */}
        {secondaryArticles.map((article) => (
          <div
            key={article.id}
            className="rounded-3xl p-6 bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-[11px] text-zinc-500">{article.readTime}</span>
              </div>

              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors leading-snug">
                <Link href={`/${handle}/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">
                {article.tags?.[0] ? `#${article.tags[0]}` : "Article"}
              </span>

              <Link
                href={`/${handle}/articles/${article.slug}`}
                className="font-semibold hover:underline flex items-center gap-1"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>Read</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
