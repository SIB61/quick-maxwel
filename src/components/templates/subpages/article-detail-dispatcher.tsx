import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalArticleDetail } from "../terminal/terminal-article-detail";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPageDispatcher({
  portfolio,
  article,
  handle,
}: {
  portfolio: PortfolioUser;
  article: NonNullable<PortfolioUser["articles"][number]>;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <article className="max-w-3xl mx-auto px-6 py-10 space-y-8 w-full">
      <Link
        href={`/${handle}/articles`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1 transition-colors"
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

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-sans">
        {article.content}
      </div>

      <footer className="pt-8 border-t border-zinc-800 flex items-center justify-between">
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
          className="text-xs font-medium hover:underline"
          style={{ color: "var(--theme-accent)" }}
        >
          Send feedback →
        </Link>
      </footer>
    </article>
  );
}
