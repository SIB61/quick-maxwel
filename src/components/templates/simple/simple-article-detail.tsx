import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SimpleArticleDetail({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 space-y-10 font-sans text-zinc-100">
      <Link
        href={`/${handle}/articles`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all articles</span>
      </Link>

      <header className="space-y-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
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

        {article.excerpt && (
          <p className="text-base text-zinc-300 leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: "var(--theme-accent)" }}>
            {article.excerpt}
          </p>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-zinc-200 text-base leading-relaxed whitespace-pre-wrap font-sans">
        {article.content}
      </div>

      <footer className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.name}
              className="h-10 w-10 rounded-full object-cover border border-zinc-700"
            />
          )}
          <div>
            <div className="text-sm font-bold text-zinc-200">{portfolio.name}</div>
            <div className="text-xs text-zinc-400">{portfolio.headline}</div>
          </div>
        </div>

        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Feedback on: ${article.title}`)}`}
          className="text-xs font-semibold hover:underline flex items-center gap-1"
          style={{ color: "var(--theme-accent)" }}
        >
          <span>Send feedback to author</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </footer>
    </article>
  );
}
