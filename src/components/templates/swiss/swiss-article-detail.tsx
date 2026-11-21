import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SwissArticleDetail({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  return (
    <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Return Navigation */}
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-500">
        <Link
          href={`/${handle}/articles`}
          className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>INDEX / ESSAYS</span>
        </Link>
        <span>FOLIO // ESSAY</span>
      </div>

      {/* Editorial Headline */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-zinc-500">
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>//</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight text-white">
          {article.title}
        </h1>

        {article.excerpt && (
          <p
            className="text-xl sm:text-2xl font-light leading-snug border-l-2 pl-6 py-1"
            style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}
          >
            {article.excerpt}
          </p>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-2 pt-2 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            {article.tags.map((t) => (
              <span key={t} className="border border-zinc-800 px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Editorial Content */}
      <div className="border-t border-b border-zinc-800 py-10 font-light">
        <RichContentDisplay content={article.content} className="text-zinc-200 text-base sm:text-lg" />
      </div>

      {/* Swiss Author Colophon */}
      <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-mono tracking-wider uppercase text-zinc-400">
        <div className="flex items-center gap-4">
          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.name}
              className="h-12 w-12 rounded-none border border-zinc-700 object-cover grayscale"
            />
          )}
          <div>
            <div className="font-bold text-white text-sm">{portfolio.name}</div>
            <div className="text-[11px] text-zinc-500">{portfolio.headline}</div>
          </div>
        </div>

        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Discussion: ${article.title}`)}`}
          className="border border-white px-5 py-2.5 text-white hover:bg-white hover:text-zinc-950 transition-all inline-flex items-center gap-1.5"
        >
          <span>DISPATCH FEEDBACK</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </footer>
    </article>
  );
}
