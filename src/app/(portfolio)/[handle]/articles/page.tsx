import { getPortfolioData } from "@/lib/portfolio-data";
import ArticlesPageDispatcher from "@/components/templates/subpages/articles-page-dispatcher";

export default async function ArticlesListPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <ArticlesPageDispatcher portfolio={portfolio} handle={handle} />;
}
