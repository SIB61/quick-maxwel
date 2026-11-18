import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalArticleDetail } from "../terminal/terminal-article-detail";
import { SwissArticleDetail } from "../swiss/swiss-article-detail";
import { AuroraArticleDetail } from "../aurora/aurora-article-detail";
import { BentoArticleDetail } from "../bento/bento-article-detail";
import { FancyArticleDetail } from "../fancy/fancy-article-detail";
import { SimpleArticleDetail } from "../simple/simple-article-detail";

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
  if (templateId === "minimal_swiss") {
    return <SwissArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleArticleDetail portfolio={portfolio} article={article} handle={handle} />;
  }

  return <SimpleArticleDetail portfolio={portfolio} article={article} handle={handle} />;
}
