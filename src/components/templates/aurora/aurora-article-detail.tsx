import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function AuroraArticleDetail({
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
      {/* Background Aurora Lighting Flares */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #8b5cf6 50%, transparent 80%)`,
        }}
      />

      {/* Return to Articles */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/articles`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Frosted Reading Container */}
      <div className="rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Top Metallic Light Line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        {/* Article Header */}
        <header className="p-8 sm:p-12 border-b border-white/10 space-y-6">
          <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
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
              {article.readTime || "5 min read"}
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
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Body */}
        <div className="p-8 sm:p-12">
          <RichContentDisplay content={article.content} className="text-base sm:text-lg text-zinc-200 font-light" />
        </div>

        {/* Spatial Author Colophon */}
        <footer className="p-8 sm:p-12 border-t border-white/10 bg-zinc-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {portfolio.avatarUrl && (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-12 w-12 rounded-2xl object-cover border border-white/20 shadow-lg"
              />
            )}
            <div>
              <div className="font-bold text-white text-base">{portfolio.name}</div>
              <div className="text-xs text-zinc-400">{portfolio.headline}</div>
            </div>
          </div>

          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Discussion: ${article.title}`)}`}
            className="px-6 py-3 rounded-full text-xs font-bold text-black transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Connect with Author</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
