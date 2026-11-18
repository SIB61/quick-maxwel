import { getPortfolioData } from "@/lib/portfolio-data";
import ArticleDetailPageDispatcher from "@/components/templates/subpages/article-detail-dispatcher";
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

  return <ArticleDetailPageDispatcher portfolio={portfolio} article={article} handle={handle} />;
}
