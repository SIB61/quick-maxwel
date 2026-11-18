import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, FileText, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function SimpleArticlesList({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <FileText className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>All Published Articles</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Technical writings, architectural retrospectives, and engineering essays by {portfolio.name}.
        </p>
      </div>

      {/* Two-column Structured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {portfolio.articles.map((article) => (
          <Link key={article.id} href={`/${handle}/articles/${article.slug}`} className="group">
            <Card className="bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {article.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                  <span className="text-[11px] text-zinc-500 font-mono">{article.readTime || "5m"}</span>
                </div>

                <h2 className="font-bold text-lg sm:text-xl text-zinc-100 group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: "var(--theme-accent)" }}>
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
