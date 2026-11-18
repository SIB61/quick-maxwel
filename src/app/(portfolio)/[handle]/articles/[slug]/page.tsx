import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const article = portfolio.articles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
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
    </article>
  );
}
