import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function FancyArticleDetail({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  return (
    <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Return to Articles */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/articles`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Container */}
      <div className="rounded-3xl p-8 sm:p-12 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative z-10 space-y-8">
        <header className="space-y-6 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: "var(--theme-accent)" }}>
              {article.excerpt}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/60 text-zinc-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Prose Body */}
        <div>
          <RichContentDisplay content={article.content} className="text-zinc-200 text-base sm:text-lg font-sans" />
        </div>

        {/* Author Colophon */}
        <footer className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {portfolio.avatarUrl && (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-12 w-12 rounded-2xl object-cover border-2 border-zinc-700 shadow-md"
              />
            )}
            <div>
              <div className="font-bold text-white text-base">{portfolio.name}</div>
              <div className="text-xs text-zinc-400">{portfolio.headline}</div>
            </div>
          </div>

          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Feedback on: ${article.title}`)}`}
            className="px-6 py-3 rounded-full text-xs font-bold text-black transition-all hover:opacity-90 flex items-center gap-2 shadow-lg"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Send Feedback to Author</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
