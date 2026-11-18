import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalArticlesList } from "../terminal/terminal-articles";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function ArticlesPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalArticlesList portfolio={portfolio} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 w-full">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <FileText className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
          All Articles
        </h1>
        <p className="text-sm text-zinc-400">
          Writings, engineering articles, and deep-dives by {portfolio.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.articles.map((article) => (
          <Link key={article.id} href={`/${handle}/articles/${article.slug}`}>
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-5 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {article.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                  <span className="text-[11px] text-zinc-500">{article.readTime}</span>
                </div>
                <h2 className="font-bold text-lg text-zinc-100 hover:text-emerald-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  Read article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
