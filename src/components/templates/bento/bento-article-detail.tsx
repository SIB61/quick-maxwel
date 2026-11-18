import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, LayoutGrid, Send, Sparkles } from "lucide-react";

export function BentoArticleDetail({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Return to Articles */}
      <div>
        <Link
          href={`/${handle}/articles`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Articles Grid</span>
        </Link>
      </div>

      {/* Bento Layout Grid for Article */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Article Content Tile (Spans 2 cols) */}
        <article className="lg:col-span-2 rounded-3xl p-8 sm:p-10 bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-8">
          <header className="space-y-4 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-base text-zinc-300 leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: "var(--theme-accent)" }}>
                {article.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-invert max-w-none text-zinc-200 text-base leading-relaxed whitespace-pre-wrap font-sans">
            {article.content}
          </div>
        </article>

        {/* Side Bento Tiles (1 col) */}
        <div className="space-y-4">
          {/* Tile 1: Author Card */}
          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Written by
            </span>
            <div className="flex items-center gap-3.5">
              {portfolio.avatarUrl && (
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-zinc-700"
                />
              )}
              <div>
                <h3 className="font-bold text-white text-base">{portfolio.name}</h3>
                <p className="text-xs text-zinc-400">{portfolio.headline}</p>
              </div>
            </div>
          </div>

          {/* Tile 2: Tags & Topics */}
          {article.tags && article.tags.length > 0 && (
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-3 shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Topics &amp; Tags
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-200 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tile 3: Engage / Discussion CTA */}
          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Discussion
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Have thoughts or questions on this article? Send direct feedback to the author.
            </p>
            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Feedback on: ${article.title}`)}`}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-sm"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Feedback</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
